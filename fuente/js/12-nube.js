// Cuenta en la nube: copia del progreso, liga semanal global y grupos de amigos (Firestore).
// Solo actúa con sesión iniciada. Cada persona escribe solo sus propios datos (ver reglas de Firestore).
import { RAW_LS } from "./01-nucleo-niveles-audio.js";
import { activeProfile, escHtml } from "./03-perfiles.js";
import { weekXp, weekStartKey } from "./09-datos-ejercicios-4-acento-velocidad.js";
import { ctaFbApp, ctaImportarUrl, ctaUsuario } from "./11-cuentas.js";

// Claves de este navegador que no se suben a la cuenta: ajustes del dispositivo y copias locales
const NUBE_NO_SUBIR = /^(modo-invitado|lpTheme|ui-|copia-auto|copia-antes-de-sincronizar|firebase:)/;
const nubeE = { uid: null, listo: false, ultimo: "", grupos: [], msg: "", ocupado: false, accion: false, fs: null, vista: "global", grupoVer: null };

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
  // Protección: si de pronto no queda ningún perfil y la nube tenía datos, no se sube (evita pisar la copia por un fallo)
  if (!txt.includes('"perfiles-ingles"') && nubeE.ultimo && nubeE.ultimo !== "{}") { nubeE.msg = "Copia no subida: no se encuentran tus perfiles en este navegador."; nubeRender(); return; }
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
window.addEventListener("pagehide", () => { nubeSubir(); });   // al cerrar o cambiar de app, lo último también se sube
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

/* ---------- Liga: pantalla ---------- */
function ligaFechas() {
  const ini = new Date(weekStartKey() + "T12:00"), fin = new Date(ini); fin.setDate(fin.getDate() + 6);
  const prox = new Date(ini); prox.setDate(prox.getDate() + 7); prox.setHours(0, 0, 0, 0);
  const f = d => d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  return { rango: f(ini) + " – " + f(fin), dias: Math.max(1, Math.ceil((prox - new Date()) / 86400000)) };
}
const ligaInicial = nombre => escHtml(String(nombre || "?").trim().charAt(0).toUpperCase());
function ligaPodioHtml(filas, uid) {
  const sitio = i => filas[i] ? `<div class="lp-pod lp-pod-${i + 1}${filas[i].uid === uid ? " yo" : ""}"><span class="lp-av">${ligaInicial(filas[i].nombre)}</span><b>${escHtml(filas[i].nombre)}</b><small>${filas[i].xp} XP</small><span class="lp-peana">${i + 1}</span></div>` : "";
  return [1, 0, 2].map(sitio).join("");
}
function ligaListaHtml(filas, uid, vacio) {
  if (!filas.length) return `<p class="lp-vacio">${escHtml(vacio)}</p>`;
  const max = Math.max(1, ...filas.map(r => r.xp));
  return filas.slice(3).map((r, i) => `<div class="lp-fila${r.uid === uid ? " yo" : ""}"><span class="lp-pos">${i + 4}</span><span class="lp-av sm">${ligaInicial(r.nombre)}</span><span class="lp-mid"><span class="lp-nom">${escHtml(r.nombre)}${r.uid === uid ? " <small>tú</small>" : ""}</span><span class="lp-barra"><i style="width:${Math.round(r.xp / max * 100)}%"></i></span></span><b class="lp-xp">${r.xp}</b></div>`).join("");
}

async function nubeRender() {
  const box = document.getElementById("nubeBox"); if (!box) return;
  box.hidden = false;
  const u = ctaUsuario(), fechas = ligaFechas(), miXp = Math.round(weekXp());
  const cabecera = (sub) => `<div class="lp-hero"><span class="etiq">Semana del ${fechas.rango}</span><div class="lp-num"><b>${miXp}</b><span>XP esta semana</span></div><p class="lp-sub">${sub}</p><span class="lp-dias">Se reinicia en ${fechas.dias} ${fechas.dias === 1 ? "día" : "días"}</span></div>`;
  if (!u) {
    box.innerHTML = cabecera("Aún no estás en la liga global") + '<div class="lp-aviso"><b>Juega con todo el mundo</b><p class="muted" style="margin:6px 0 0">Inicia sesión para entrar en la liga global y crear grupos con tus amigos.</p></div>';
    return;
  }
  box.innerHTML = '<p class="muted" role="status">Cargando la liga…</p>';
  let filas = [], grupos = [], grupoFilas = [], err = "";
  try {
    const f = await nubeFs(), m = f.m, db = f.db, semana = weekStartKey();
    const snap = await m.getDocs(m.query(m.collection(db, "ligaSemanal"), m.where("semana", "==", semana), m.limit(200)));
    filas = snap.docs.map(d => d.data()).sort((a, b) => b.xp - a.xp);
    if (nubeE.grupos.length) {
      grupos = await Promise.all(nubeE.grupos.map(async c => { const g = await m.getDoc(m.doc(db, "grupos", c)); return { c, nombre: g.exists() ? g.data().nombre : "Grupo" }; }));
      if (!nubeE.grupoVer || !nubeE.grupos.includes(nubeE.grupoVer)) nubeE.grupoVer = nubeE.grupos[0];
      if (nubeE.vista === "grupos") {
        const gs = await m.getDocs(m.query(m.collection(db, "grupos", nubeE.grupoVer, "xp"), m.where("semana", "==", semana)));
        grupoFilas = gs.docs.map(d => d.data()).sort((a, b) => b.xp - a.xp);
      }
    }
  } catch (e) { err = nubeError(e); }
  const yo = filas.find(r => r.uid === nubeE.uid), pos = yo ? filas.indexOf(yo) + 1 : 0;
  const esGrupos = nubeE.vista === "grupos", lista = esGrupos ? grupoFilas : filas;
  const sub = pos ? `Vas ${pos}º de ${filas.length} en la liga global` : "Aún no estás en la liga global";
  const tabs = `<div class="lp-seg" role="tablist"><button type="button" role="tab" data-v="global" aria-selected="${!esGrupos}">Global</button><button type="button" role="tab" data-v="grupos" aria-selected="${esGrupos}">Mis grupos${nubeE.grupos.length ? " (" + nubeE.grupos.length + ")" : ""}</button></div>`;
  const chips = esGrupos && grupos.length ? `<div class="lp-chips">${grupos.map(g => `<button type="button" class="lp-chip${g.c === nubeE.grupoVer ? " on" : ""}" data-g="${escHtml(g.c)}">${escHtml(g.nombre)}<small>${escHtml(g.c)}</small></button>`).join("")}</div>` : "";
  const vacio = esGrupos ? (nubeE.grupos.length ? "Nadie del grupo ha publicado esta semana todavía." : "Todavía no estás en ningún grupo. Crea uno o únete con un código.") : "Nadie ha publicado esta semana todavía.";
  const sinPerfil = activeProfile() ? "" : '<p class="muted" style="margin:0">Crea un perfil para aparecer en la liga y en los grupos.</p>';
  box.innerHTML = cabecera(sub) + tabs + chips
    + (err ? `<p class="lp-msg">${escHtml(err)}</p>` : "")
    + `<div class="lp-podio">${ligaPodioHtml(lista, nubeE.uid)}</div><div class="lp-lista">${ligaListaHtml(lista, nubeE.uid, vacio)}</div>`
    + `<details class="lp-grupos-form"${nubeE.grupos.length ? "" : " open"}><summary>Unirse o crear un grupo</summary>
        <div class="lp-form">
          <label for="nubeCodigo">Código de invitación</label>
          <div class="lp-fila-in"><input id="nubeCodigo" maxlength="6" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="ABC123"><button class="btn secondary" id="nubeUnirse" type="button">Unirme</button></div>
          <label for="nubeNombreGrupo">Crear un grupo</label>
          <div class="lp-fila-in"><input id="nubeNombreGrupo" maxlength="30" placeholder="Nombre del grupo" autocomplete="off"><button class="btn secondary" id="nubeCrear" type="button">Crear</button></div>
          ${sinPerfil}
        </div></details>`
    + `<p class="lp-msg" id="nubeMsg" role="status">${escHtml(nubeE.msg)}</p>`;
  box.querySelectorAll(".lp-seg button").forEach(b => b.onclick = () => { nubeE.vista = b.dataset.v; nubeRender(); });
  box.querySelectorAll(".lp-chip").forEach(b => b.onclick = () => { nubeE.grupoVer = b.dataset.g; nubeRender(); });
  document.getElementById("nubeUnirse").onclick = () => { const v = document.getElementById("nubeCodigo").value; nubeAccion(() => nubeUnirse(v)); };
  document.getElementById("nubeCrear").onclick = () => { const v = document.getElementById("nubeNombreGrupo").value; nubeAccion(() => nubeCrear(v)); };
}
