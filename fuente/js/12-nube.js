// Cuenta en la nube: copia del progreso, liga semanal global y grupos de amigos (Firestore).
// Solo actúa con sesión iniciada. Cada persona escribe solo sus propios datos (ver reglas de Firestore).
import { RAW_LS } from "./01-nucleo-niveles-audio.js";
import { activeProfile, escHtml } from "./03-perfiles.js";
import { weekXp, weekStartKey } from "./09-datos-ejercicios-4-acento-velocidad.js";
import { ctaFbApp, ctaImportarUrl, ctaUsuario } from "./11-cuentas.js";

// Claves de este navegador que no se suben a la cuenta: ajustes del dispositivo y copias locales
const NUBE_NO_SUBIR = /^(modo-invitado|lpTheme|ui-|copia-auto|copia-antes-de-sincronizar|firebase:)/;
const nubeE = { uid: null, listo: false, ultimo: "", grupos: [], msg: "", ocupado: false, accion: false, fs: null };

// Todo el progreso de este navegador (todos los perfiles), en orden fijo para poder compararlo
function nubeInstantanea() {
  const datos = {};
  for (let i = 0; i < RAW_LS.length; i++) { const k = RAW_LS.key(i); if (!NUBE_NO_SUBIR.test(k)) datos[k] = RAW_LS.getItem(k); }
  const orden = {};
  Object.keys(datos).sort().forEach(k => { orden[k] = datos[k]; });
  return orden;
}

// Sustituye el progreso de este navegador por el de la nube
function nubeAplicar(datos) {
  for (let i = RAW_LS.length - 1; i >= 0; i--) { const k = RAW_LS.key(i); if (!NUBE_NO_SUBIR.test(k)) RAW_LS.removeItem(k); }
  Object.entries(datos).forEach(([k, v]) => RAW_LS.setItem(k, v));
}

// Firestore se carga la primera vez que hace falta
async function nubeFs() {
  if (!nubeE.fs) {
    const fb = await ctaFbApp();
    const m = await ctaImportarUrl("/firestore/+esm");
    nubeE.fs = { m, db: m.getFirestore(fb.app) };
  }
  return nubeE.fs;
}

function nubeError(e) {
  const c = (e && e.code) || "";
  if (c === "permission-denied") return "Firestore no deja hacer esto: revisa las reglas de seguridad.";
  if (c === "unavailable" || /offline/i.test((e && e.message) || "")) return "Sin conexión. Se volverá a intentar.";
  return (e && e.message) || "Algo ha fallado.";
}

// Liga semanal global: una fila por persona con su XP de esta semana y el nombre de su perfil
async function nubePublicar(f) {
  const p = activeProfile(); if (!p) return;
  const { m, db } = f, semana = weekStartKey();
  const datos = { uid: nubeE.uid, nombre: String(p.name).trim().slice(0, 40), semana, xp: Math.round(weekXp()), actualizado: m.serverTimestamp() };
  await m.setDoc(m.doc(db, "ligaSemanal", semana + "_" + nubeE.uid), datos);
  for (const g of nubeE.grupos) await m.setDoc(m.doc(db, "grupos", g, "xp", nubeE.uid), datos);
}

// Guarda el progreso en la cuenta si ha cambiado desde la última vez
async function nubeSubir() {
  if (!nubeE.uid || !nubeE.listo || nubeE.ocupado) return;
  const txt = JSON.stringify(nubeInstantanea());
  if (txt === nubeE.ultimo) return;
  nubeE.ocupado = true;
  try {
    const f = await nubeFs(), m = f.m;
    await m.setDoc(m.doc(f.db, "usuarios", nubeE.uid), { datos: txt, actualizado: m.serverTimestamp() }, { merge: true });
    nubeE.ultimo = txt;
    await nubePublicar(f);
  } catch (e) { nubeE.msg = "No se pudo guardar en la nube: " + nubeError(e); nubeRender(); }
  finally { nubeE.ocupado = false; }
}

// Al entrar con una cuenta: si no hay copia en la nube se sube lo de este navegador;
// si la hay, se usa la de la nube y lo de este navegador queda guardado como copia.
async function nubeEntrar(u) {
  nubeE.uid = u.uid; nubeE.listo = false; nubeE.ultimo = "";
  try {
    const f = await nubeFs(), m = f.m;
    const snap = await m.getDoc(m.doc(f.db, "usuarios", u.uid));
    const local = JSON.stringify(nubeInstantanea());
    if (!snap.exists()) {
      nubeE.grupos = []; nubeE.listo = true;
      await nubeSubir();
    } else {
      const d = snap.data(), nubeTxt = d.datos || "{}";
      nubeE.grupos = Array.isArray(d.grupos) ? d.grupos : [];
      const recargado = sessionStorage.getItem("nube-recarga") === nubeTxt;
      sessionStorage.removeItem("nube-recarga");
      if (nubeTxt !== local && !recargado) {
        if (local !== "{}") RAW_LS.setItem("copia-antes-de-sincronizar", local);
        nubeAplicar(JSON.parse(nubeTxt));
        sessionStorage.setItem("nube-recarga", nubeTxt);
        location.reload();
        return;
      }
      nubeE.ultimo = nubeTxt; nubeE.listo = true;
    }
  } catch (e) { nubeE.msg = "No se pudo conectar con tu cuenta: " + nubeError(e); }
  nubeRender();
}

document.addEventListener("cuenta-cambio", () => {
  const u = ctaUsuario();
  if (!u) { nubeE.uid = null; nubeE.listo = false; nubeE.grupos = []; nubeRender(); return; }
  if (u.uid !== nubeE.uid) nubeEntrar(u);
});
setInterval(() => { nubeSubir(); }, 20000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") nubeSubir(); });
document.addEventListener("ranking-ver", () => { nubeRender(); });

// Borrar todos los datos de este navegador (y la copia de la cuenta, si la hay). Se mantienen los ajustes de pantalla.
document.addEventListener("borrar-datos", () => { nubeBorrarTodo(); });
async function nubeBorrarTodo() {
  if (!confirm("¿Borrar todos los datos? Se eliminan todos los perfiles, progreso, logros, monedas y ajustes de este navegador" + (nubeE.uid ? " y la copia de tu cuenta" : "") + ". No se puede deshacer.")) return;
  try {
    if (nubeE.uid) {
      const f = await nubeFs(), m = f.m;
      await m.setDoc(m.doc(f.db, "usuarios", nubeE.uid), { datos: "{}", actualizado: m.serverTimestamp() }, { merge: true });
      nubeE.ultimo = "{}";
    }
  } catch (e) { alert("No se pudo borrar la copia de la cuenta: " + nubeError(e) + ". No se ha borrado nada."); return; }
  for (let i = RAW_LS.length - 1; i >= 0; i--) {
    const k = RAW_LS.key(i);
    if (!NUBE_NO_SUBIR.test(k) || k.startsWith("copia-antes-de-sincronizar")) RAW_LS.removeItem(k);
  }
  location.reload();
}

/* ---------- Liga y grupos ---------- */
function nubeCodigo() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // 32 caracteres: sin 0/O/1/I
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), b => letras[b % 32]).join("");
}

// Alta en un grupo: miembro + lista de grupos de la persona
async function nubeAlta(f, c, p) {
  const { m, db } = f;
  await m.setDoc(m.doc(db, "grupos", c, "miembros", nubeE.uid), { uid: nubeE.uid, nombre: String(p.name).trim().slice(0, 40), unido: m.serverTimestamp() });
  await m.setDoc(m.doc(db, "usuarios", nubeE.uid), { grupos: m.arrayUnion(c) }, { merge: true });
  nubeE.grupos = [...new Set([...nubeE.grupos, c])];
  await nubePublicar(f);
}

async function nubeUnirse(codigo) {
  const c = String(codigo || "").trim().toUpperCase();
  if (!/^[A-Z2-9]{6}$/.test(c)) throw new Error("El código tiene 6 letras o números.");
  const p = activeProfile(); if (!p) throw new Error("Crea primero un perfil.");
  const f = await nubeFs();
  if (!(await f.m.getDoc(f.m.doc(f.db, "grupos", c))).exists()) throw new Error("No existe ningún grupo con ese código.");
  await nubeAlta(f, c, p);
  return "Te has unido al grupo.";
}

async function nubeCrear(nombre) {
  const p = activeProfile(); if (!p) throw new Error("Crea primero un perfil.");
  const n = String(nombre || "").trim().slice(0, 30);
  if (!n) throw new Error("Escribe un nombre para el grupo.");
  const f = await nubeFs(), m = f.m;
  let c = null;
  for (let i = 0; i < 3 && !c; i++) { const t = nubeCodigo(); if (!(await m.getDoc(m.doc(f.db, "grupos", t))).exists()) c = t; }
  if (!c) throw new Error("No se pudo crear el código. Inténtalo otra vez.");
  await m.setDoc(m.doc(f.db, "grupos", c), { nombre: n, creador: nubeE.uid, creado: m.serverTimestamp() });
  await nubeAlta(f, c, p);
  return "Grupo creado. Código de invitación: " + c + ". Compártelo con tus amigos.";
}

// Si Firestore no responde en 15 s, se avisa en vez de dejar el botón esperando sin fin
function nubeConTiempo(p) {
  return Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error("Firestore no responde. Revisa la conexión y que las reglas estén publicadas.")), 15000))]);
}

async function nubeAccion(fn) {
  if (nubeE.accion) return;
  nubeE.accion = true; nubeE.msg = "Espera un momento…";
  nubeRender();
  try { nubeE.msg = await nubeConTiempo(fn()); } catch (e) { nubeE.msg = nubeError(e); }
  finally { nubeE.accion = false; nubeRender(); }
}

async function nubeGrupoHtml(f, c, semana) {
  const { m, db } = f;
  const g = await m.getDoc(m.doc(db, "grupos", c));
  const nombre = g.exists() ? g.data().nombre : "Grupo";
  const snap = await m.getDocs(m.query(m.collection(db, "grupos", c, "xp"), m.where("semana", "==", semana)));
  const filas = snap.docs.map(d => d.data()).sort((a, b) => b.xp - a.xp);
  const cuerpo = filas.length ? filas.map((r, i) => `<div class="liga-row${r.uid === nubeE.uid ? " liga-me" : ""}"><span class="pos">${i + 1}º</span><span>${escHtml(r.nombre)}${r.uid === nubeE.uid ? " (tú)" : ""}</span><strong>${r.xp} XP</strong></div>`).join("")
    : '<p class="muted">Nadie del grupo ha publicado esta semana todavía.</p>';
  return `<h3 class="xs-tit">${escHtml(nombre)} <span class="muted small">· código ${escHtml(c)}</span></h3>${cuerpo}`;
}

async function nubeRender() {
  const box = document.getElementById("nubeBox"); if (!box) return;
  const u = ctaUsuario();
  if (!u) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;
  box.innerHTML = '<p class="muted" role="status">Cargando tu liga…</p>';
  let liga = "", grupos = "";
  try {
    const f = await nubeFs(), m = f.m, db = f.db, semana = weekStartKey();
    const snap = await m.getDocs(m.query(m.collection(db, "ligaSemanal"), m.where("semana", "==", semana), m.limit(200)));
    const filas = snap.docs.map(d => d.data()).sort((a, b) => b.xp - a.xp);
    liga = filas.length ? filas.map((r, i) => `<div class="liga-row${r.uid === nubeE.uid ? " liga-me" : ""}"><span class="pos">${i + 1}º</span><span>${escHtml(r.nombre)}${r.uid === nubeE.uid ? " (tú)" : ""}</span><strong>${r.xp} XP</strong></div>`).join("")
      : '<p class="muted">Nadie ha publicado esta semana todavía.</p>';
    for (const c of nubeE.grupos) grupos += await nubeGrupoHtml(f, c, semana);
  } catch (e) { liga = '<p class="muted">' + escHtml(nubeError(e)) + "</p>"; }
  const sinPerfil = activeProfile() ? "" : '<p class="muted">Crea un perfil para aparecer en la liga y en los grupos.</p>';
  box.innerHTML = `
    <p class="etiq" id="nubeMsg" role="status" style="margin:0 0 10px;min-height:20px">${escHtml(nubeE.msg)}</p>
    <h3 class="xs-tit">Liga global <span class="muted small">· esta semana</span></h3>${liga}
    ${grupos ? `<div style="margin-top:14px">${grupos}</div>` : ""}
    <div class="fila"><label class="etiq" for="nubeCodigo">Unirse a un grupo con código</label>
      <input id="nubeCodigo" maxlength="6" autocapitalize="characters" autocomplete="off" spellcheck="false">
      <button class="btn secondary" id="nubeUnirse" type="button">Unirme</button></div>
    <div class="fila"><label class="etiq" for="nubeNombreGrupo">Crear un grupo de amigos</label>
      <input id="nubeNombreGrupo" maxlength="30" placeholder="Nombre del grupo" autocomplete="off">
      <button class="btn secondary" id="nubeCrear" type="button">Crear grupo</button></div>
    ${sinPerfil}`;
  // Se lee el texto antes de empezar la acción: la caja se vuelve a dibujar al empezar
  document.getElementById("nubeUnirse").onclick = () => { const v = document.getElementById("nubeCodigo").value; nubeAccion(() => nubeUnirse(v)); };
  document.getElementById("nubeCrear").onclick = () => { const v = document.getElementById("nubeNombreGrupo").value; nubeAccion(() => nubeCrear(v)); };
}
