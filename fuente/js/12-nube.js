// Cuenta en la nube: copia del progreso, liga semanal global y grupos de amigos (Firestore).
// Solo actúa con sesión iniciada. Cada persona escribe solo sus propios datos (ver reglas de Firestore).
import { RAW_LS } from "./01-nucleo-niveles-audio.js";
import { activeProfile, escHtml } from "./03-perfiles.js";
import { weekXp, weekStartKey } from "./09-datos-ejercicios-4-acento-velocidad.js";
import { ctaFbApp, ctaImportarUrl, ctaUsuario } from "./11-cuentas.js";

// Claves de este navegador que no se suben a la cuenta: ajustes del dispositivo y copias locales
const NUBE_NO_SUBIR = /^(modo-invitado|lpTheme|ui-|copia-auto|copia-antes-de-sincronizar|firebase:)/;
const nubeE = { uid: null, listo: false, ultimo: "", grupos: [], msg: "", ocupado: false, accion: false, fs: null, vista: "global", grupoVer: null, copiaSemana: "" };

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
    await nubeCopiaSemanal(f, txt);
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
  dprogLiga = { t: 0, html: "" };   // al cambiar de sesión, la tarjeta de liga se vuelve a consultar
  document.dispatchEvent(new Event("dprog-liga"));
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

/* ---------- Copias: una al semana, aparte de la copia actual (no se sobrescriben) ---------- */
async function nubeCopiaSemanal(f, txt) {
  const m = f.m, semana = weekStartKey();
  if (nubeE.copiaSemana === semana) return;
  const ref = m.doc(f.db, "usuarios", nubeE.uid, "copias", semana);
  if (!(await m.getDoc(ref)).exists()) await m.setDoc(ref, { datos: txt, creada: m.serverTimestamp(), semana });
  nubeE.copiaSemana = semana;
}
async function nubeCopiaAhora(motivo) {
  const f = await nubeFs(), m = f.m;
  const id = motivo + "-" + Date.now();
  await m.setDoc(m.doc(f.db, "usuarios", nubeE.uid, "copias", id), { datos: JSON.stringify(nubeInstantanea()), creada: m.serverTimestamp(), semana: id });
}
async function nubeCopias() {
  const box = document.getElementById("nubeCopias"); if (!box) return;
  box.hidden = false;
  if (!nubeE.uid) { box.innerHTML = '<p class="muted" style="margin:10px 0 0">Inicia sesión para ver las copias de tu cuenta.</p>'; return; }
  box.innerHTML = '<p class="muted" style="margin:10px 0 0">Cargando copias…</p>';
  try {
    const f = await nubeFs(), m = f.m;
    const snap = await m.getDocs(m.collection(f.db, "usuarios", nubeE.uid, "copias"));
    const lista = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.creada?.seconds || 0) - (a.creada?.seconds || 0));
    box.innerHTML = '<h3 class="xs-tit" style="margin:12px 0 6px">Copias en la nube</h3>' + (lista.length
      ? lista.map(c => `<div class="lg-fila"><span></span><span></span><span class="lg-mid"><span class="lg-nom">${escHtml(c.semana)}</span><span class="muted" style="font-size:12px">${c.creada ? new Date(c.creada.seconds * 1000).toLocaleString("es-ES") : ""}</span></span><button class="btn secondary" type="button" data-copia="${escHtml(c.id)}">Restaurar</button></div>`).join("")
      : '<p class="muted">Todavía no hay copias. Se crea una cada semana al jugar.</p>');
    box.querySelectorAll("[data-copia]").forEach(b => b.onclick = () => nubeRestaurar(lista.find(c => c.id === b.dataset.copia)));
  } catch (e) { box.innerHTML = '<p class="muted">' + escHtml(nubeError(e)) + "</p>"; }
}
async function nubeRestaurar(c) {
  if (!c || !confirm("¿Restaurar la copia de " + c.semana + "? Sustituye el progreso actual de este navegador y de tu cuenta. Antes se guarda una copia del estado actual.")) return;
  try {
    await nubeCopiaAhora("antes-de-restaurar");
    const f = await nubeFs(), m = f.m;
    await m.setDoc(m.doc(f.db, "usuarios", nubeE.uid), { datos: c.datos, actualizado: m.serverTimestamp() }, { merge: true });
    RAW_LS.setItem("copia-antes-de-sincronizar", JSON.stringify(nubeInstantanea()));
    nubeAplicar(JSON.parse(c.datos));
    nubeE.ultimo = c.datos;
  } catch (e) { alert("No se pudo restaurar: " + nubeError(e)); return; }
  location.reload();
}
// Borrar la cuenta: primero los datos de la nube (cada borrado lo permite la regla de su colección), luego el usuario de Auth.
// Si Auth pide volver a entrar, lo ya borrado no vuelve y basta con repetir.
document.addEventListener("cuenta-borrar", () => { nubeBorrarCuenta(); });
async function nubeBorrarCuenta() {
  if (!nubeE.uid) { alert("No hay ninguna cuenta iniciada. Para borrar solo este navegador, usa «Borrar todos los datos»."); return; }
  if (!confirm("¿Borrar tu cuenta? Se eliminan tu cuenta, tu copia en la nube, tu fila de la liga y tu pertenencia a grupos. El progreso de este navegador se mantiene. No se puede deshacer.")) return;
  // Firebase exige una sesión reciente para borrar la cuenta: se comprueba antes de borrar nada
  const fb = await ctaFbApp(), entro = Date.parse(fb.auth.currentUser?.metadata?.lastSignInTime || "");
  if (!(Date.now() - entro < 5 * 60 * 1000)) { alert("Por seguridad, vuelve a entrar y pulsa otra vez «Borrar mi cuenta» enseguida. No se ha borrado nada."); return; }
  try {
    const f = await nubeFs(), m = f.m, db = f.db, uid = nubeE.uid;
    const copias = await m.getDocs(m.collection(db, "usuarios", uid, "copias"));
    await Promise.all(copias.docs.map(d => m.deleteDoc(d.ref)));
    const liga = await m.getDocs(m.query(m.collection(db, "ligaSemanal"), m.where("uid", "==", uid)));
    await Promise.all(liga.docs.map(d => m.deleteDoc(d.ref)));
    for (const c of nubeE.grupos) {
      await m.deleteDoc(m.doc(db, "grupos", c, "miembros", uid));
      await m.deleteDoc(m.doc(db, "grupos", c, "xp", uid));
    }
    await m.deleteDoc(m.doc(db, "usuarios", uid));
    await fb.authMod.deleteUser(fb.auth.currentUser);
  } catch (e) { alert("No se pudo borrar la cuenta: " + nubeError(e) + ". Vuelve a entrar y pulsa otra vez «Borrar mi cuenta»."); return; }
  alert("Tu cuenta se ha borrado. El progreso de este navegador sigue aquí.");
  location.reload();
}
document.addEventListener("copias-ver", () => { nubeCopias(); });

/* ---------- Liga: pantalla ---------- */
// Tarjeta de liga en el panel de escritorio: una consulta como mucho cada minuto
let dprogLiga = { t: 0, html: "" };
document.addEventListener("dprog-liga", async () => {
  const box = document.getElementById("dprog"); if (!box) return;
  const pintar = html => { box.querySelector("#dprogLiga")?.remove(); box.insertAdjacentHTML("beforeend", `<div class="dprog-card" id="dprogLiga">${html}</div>`); };
  const uid = nubeE.uid || ctaUsuario()?.uid;   // la sesión puede estar lista antes que la copia en la nube
  if (!uid) return pintar('<span class="muted">Liga semanal</span><strong>Inicia sesión</strong><span class="muted">para entrar en la liga global</span>');
  if (Date.now() - dprogLiga.t < 60000 && dprogLiga.html) return pintar(dprogLiga.html);
  pintar('<span class="muted">Liga semanal</span><span class="muted">Cargando…</span>');
  try {
    const f = await nubeFs(), m = f.m, db = f.db, semana = weekStartKey();
    const snap = await m.getDocs(m.query(m.collection(db, "ligaSemanal"), m.where("semana", "==", semana), m.orderBy("xp", "desc"), m.limit(200)));
    const filas = snap.docs.map(d => d.data()).sort((a, b) => b.xp - a.xp), i = filas.findIndex(r => r.uid === uid);
    dprogLiga = { t: Date.now(), html: i >= 0
      ? `<span class="muted">Liga semanal</span><strong>${i + 1}.º de ${filas.length}</strong><span class="muted">${filas[i].xp} XP esta semana</span>`
      : '<span class="muted">Liga semanal</span><strong>Sin puntos aún</strong><span class="muted">Haz un ejercicio para entrar</span>' };
  } catch (e) { dprogLiga = { t: 0, html: "" }; return pintar('<span class="muted">Liga semanal</span><span class="muted">No disponible ahora</span>'); }
  pintar(dprogLiga.html);
});
function ligaFechas() {
  const ini = new Date(weekStartKey() + "T12:00"), fin = new Date(ini); fin.setDate(fin.getDate() + 6);
  const prox = new Date(ini); prox.setDate(prox.getDate() + 7); prox.setHours(0, 0, 0, 0);
  const f = d => d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  return { rango: f(ini) + " – " + f(fin), dias: Math.max(1, Math.ceil((prox - new Date()) / 86400000)) };
}
const ligaInicial = nombre => escHtml(String(nombre || "?").trim().charAt(0).toUpperCase());
function ligaPodioHtml(filas, uid) {
  const sitio = i => filas[i] ? `<div class="lg-pod lg-pod-${i + 1}${filas[i].uid === uid ? " yo" : ""}"><span class="lg-av">${ligaInicial(filas[i].nombre)}</span><b>${escHtml(filas[i].nombre)}</b><small>${filas[i].xp} XP</small><span class="lg-peana">${i + 1}</span></div>` : "";
  return [1, 0, 2].map(sitio).join("");
}
function ligaListaHtml(filas, uid, vacio) {
  if (!filas.length) return `<p class="lg-vacio">${escHtml(vacio)}</p>`;
  const max = Math.max(1, ...filas.map(r => r.xp));
  return filas.slice(3).map((r, i) => `<div class="lg-fila${r.uid === uid ? " yo" : ""}"><span class="lg-pos">${i + 4}</span><span class="lg-av sm">${ligaInicial(r.nombre)}</span><span class="lg-mid"><span class="lg-nom">${escHtml(r.nombre)}${r.uid === uid ? " <small>tú</small>" : ""}</span><span class="lg-barra"><i style="width:${Math.round(r.xp / max * 100)}%"></i></span></span><b class="lg-xp">${r.xp}</b></div>`).join("");
}

async function nubeRender() {
  const box = document.getElementById("nubeBox"); if (!box) return;
  box.hidden = false;
  const u = ctaUsuario(), fechas = ligaFechas(), miXp = Math.round(weekXp());
  const cabecera = (sub) => `<div class="lg-hero"><span class="etiq">Semana del ${fechas.rango}</span><div class="lg-num"><b>${miXp}</b><span>XP esta semana</span></div><p class="lg-sub">${sub}</p><span class="lg-dias">Se reinicia en ${fechas.dias} ${fechas.dias === 1 ? "día" : "días"}</span></div>`;
  if (!u) {
    box.innerHTML = cabecera("Aún no estás en la liga global") + '<div class="lg-aviso"><b>Juega con todo el mundo</b><p class="muted" style="margin:6px 0 0">Inicia sesión para entrar en la liga global y crear grupos con tus amigos.</p></div>';
    return;
  }
  box.innerHTML = '<p class="muted" role="status">Cargando la liga…</p>';
  let filas = [], grupos = [], grupoFilas = [], err = "";
  try {
    const f = await nubeFs(), m = f.m, db = f.db, semana = weekStartKey();
    const snap = await m.getDocs(m.query(m.collection(db, "ligaSemanal"), m.where("semana", "==", semana), m.orderBy("xp", "desc"), m.limit(200)));
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
  const tabs = `<div class="lg-seg" role="tablist"><button type="button" role="tab" data-v="global" aria-selected="${!esGrupos}">Global</button><button type="button" role="tab" data-v="grupos" aria-selected="${esGrupos}">Mis grupos${nubeE.grupos.length ? " (" + nubeE.grupos.length + ")" : ""}</button></div>`;
  const chips = esGrupos && grupos.length ? `<div class="lg-chips">${grupos.map(g => `<button type="button" class="lg-chip${g.c === nubeE.grupoVer ? " on" : ""}" data-g="${escHtml(g.c)}">${escHtml(g.nombre)}<small>${escHtml(g.c)}</small></button>`).join("")}</div>` : "";
  const vacio = esGrupos ? (nubeE.grupos.length ? "Nadie del grupo ha publicado esta semana todavía." : "Todavía no estás en ningún grupo. Crea uno o únete con un código.") : "Nadie ha publicado esta semana todavía.";
  const sinPerfil = activeProfile() ? "" : '<p class="muted" style="margin:0">Crea un perfil para aparecer en la liga y en los grupos.</p>';
  box.innerHTML = cabecera(sub) + tabs + chips
    + (err ? `<p class="lg-msg">${escHtml(err)}</p>` : "")
    + (!esGrupos && filas.length >= 200 ? '<p class="lg-msg">Se muestran los 200 primeros de la semana.</p>' : "")
    + `<div class="lg-podio">${ligaPodioHtml(lista, nubeE.uid)}</div><div class="lg-lista">${ligaListaHtml(lista, nubeE.uid, vacio)}</div>`
    + `<details class="lg-grupos-form"${nubeE.grupos.length ? "" : " open"}><summary>Unirse o crear un grupo</summary>
        <div class="lg-form">
          <label for="nubeCodigo">Código de invitación</label>
          <div class="lg-fila-in"><input id="nubeCodigo" maxlength="6" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="ABC123"><button class="btn secondary" id="nubeUnirse" type="button">Unirme</button></div>
          <label for="nubeNombreGrupo">Crear un grupo</label>
          <div class="lg-fila-in"><input id="nubeNombreGrupo" maxlength="30" placeholder="Nombre del grupo" autocomplete="off"><button class="btn secondary" id="nubeCrear" type="button">Crear</button></div>
          ${sinPerfil}
        </div></details>`
    + `<p class="lg-msg" id="nubeMsg" role="status">${escHtml(nubeE.msg)}</p>`;
  box.querySelectorAll(".lg-seg button").forEach(b => b.onclick = () => { nubeE.vista = b.dataset.v; nubeRender(); });
  box.querySelectorAll(".lg-chip").forEach(b => b.onclick = () => { nubeE.grupoVer = b.dataset.g; nubeRender(); });
  document.getElementById("nubeUnirse").onclick = () => { const v = document.getElementById("nubeCodigo").value; nubeAccion(() => nubeUnirse(v)); };
  document.getElementById("nubeCrear").onclick = () => { const v = document.getElementById("nubeNombreGrupo").value; nubeAccion(() => nubeCrear(v)); };
}
