import { marcoEnvoltorio } from "./10-tienda-logros-perfil.js";
import { $, PROFILE_RAW_KEYS, RAW_LS, ico, mixHex } from "./01-nucleo-niveles-audio.js";
import { ACC_PRECIO, accComprar, accOwned } from "./04-recompensas-logros-copia-auto.js";

/* ---------- Perfiles: pantalla de bienvenida, selección y creación ---------- */
const P_ANIMALS = [["leon", "León"], ["zorro", "Zorro"], ["oso", "Oso"], ["conejo", "Conejo"], ["pinguino", "Pingüino"], ["persona", "Persona"], ["zombi", "Zombi"], ["robot", "Robot"], ["bruja", "Bruja"], ["fantasma", "Fantasma"]];
const RACES = {
  leon: [["clasico", "Clásico"], ["blanco", "Blanco"], ["negro", "Negro"]],
  zorro: [["rojo", "Rojo"], ["artico", "Ártico"], ["fenec", "Fénec"]],
  oso: [["pardo", "Pardo"], ["polar", "Polar"], ["panda", "Panda"]],
  conejo: [["blanco", "Blanco"], ["gris", "Gris"], ["marron", "Castaño"]],
  pinguino: [["emperador", "Emperador"], ["rey", "Rey"], ["macarron", "Macarrón"]]
};
const P_SKINS = [["claro", "Claro"], ["medio", "Medio"], ["oscuro", "Oscuro"]];
const P_HAIRS = [["corto", "Corto"], ["largo", "Largo"], ["rizado", "Rizado"], ["moño", "Moño"], ["calvo", "Calvo"]];
const P_BEARDS = [["ninguna", "Sin barba"], ["bigote", "Bigote"], ["corta", "Corta"], ["larga", "Larga"]];
const P_HAIRCOLORS = ["#2b1d0b", "#c97a1c", "#e8e8e8", "#d6336c"];
const P_COLORS = ["#2f9e8f", "#4c6ef5", "#845ef7", "#d6457a", "#f08c00", "#40915f", "#ffffff", "none"];
export const P_ACCS = [["ninguno", "Ninguno"], ["gafas", "Gafas"], ["gafasSol", "Gafas de sol"], ["gorra", "Gorra"], ["sombrero", "Sombrero"], ["corona", "Corona"], ["diadema", "Diadema"], ["lazo", "Lazo"], ["pajarita", "Pajarita"], ["bufanda", "Bufanda"], ["pendientes", "Pendientes"], ["estrella", "Estrella"], ["auriculares", "Auriculares"]];
export function accList(v) { const arr = Array.isArray(v) ? v : (v ? [v] : []); return arr.filter(x => x && x !== "ninguno"); }
let pDraft = { animal: "leon", color: "#1c7ed6", acc: [], skin: "medio", hair: "corto", beard: "ninguna", hairColor: "#2b1d0b" };
export const escHtml = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export function getProfiles() { try { return JSON.parse(RAW_LS.getItem("perfiles-ingles") || "[]"); } catch (e) { return []; } }
export function saveProfiles(list) { RAW_LS.setItem("perfiles-ingles", JSON.stringify(list)); }
export function activeProfile() { const id = RAW_LS.getItem("perfil-activo"); return getProfiles().find(p => p.id === id) || null; }

// Avatar con su marco y efectos (si los tiene); el resto del dibujo no cambia
export function avatarSvg(av, size = 64, noBg = false) {
  const base = avatarSvgBase(av, size, noBg);
  if (!av || (!av.marco && !(av.efectos || []).length)) return base;
  return marcoEnvoltorio(base, av, size);
}
/* Avatares v2: ilustración con contorno. Mismo trazo (2 u) y misma luz en todo; el fondo es el color del perfil, tintado.
   Personas: busto + cabeza + pelo + cara. Animales: solo cabeza, con sus propias orejas, hocico y pelaje. */
const AV_OUT = "#1d2330";
function avatarSvgBase(av, size = 64, noBg = false) {
  const a = Object.assign({ animal: "leon", color: "#1c7ed6", acc: "ninguno", skin: "medio", hair: "corto", beard: "ninguna", hairColor: "#3b2508" }, av || {});
  const id = "av" + Math.random().toString(36).slice(2, 8);
  if (a.color === "none") noBg = true;
  const C = a.color === "none" ? "#4c6ef5" : a.color;
  const T = mixHex(C, "#ffffff", 0.8), M = C, K = mixHex(C, "#000000", 0.28);
  const SKIN = { claro: "#fbdcc2", medio: "#e3b088", oscuro: "#9a6440" }[a.skin] || "#e3b088";
  const H = a.hairColor, RZ = a.raza || (RACES[a.animal] ? RACES[a.animal][0][0] : "");
  const ol = `stroke='${AV_OUT}' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'`;
  const ln = `stroke='${AV_OUT}' stroke-width='1.8' stroke-linecap='round' fill='none'`;
  // Cara: ojos con brillo, cejas, mejillas suaves y sonrisa. "y" es la altura de los ojos.
  const cara = (y, sonrisa = true, x1 = 26, x2 = 38) => {
    const ojo = x => `<ellipse cx='${x}' cy='${y}' rx='1.9' ry='2.5' fill='${AV_OUT}'/><circle cx='${x + .7}' cy='${y - .9}' r='.7' fill='#ffffff'/>`;
    return `<path d='M${x1 - 2.6} ${y - 4.6} q2.6 -1.8 5.2 0' ${ln} stroke-width='1.6'/><path d='M${x2 - 2.6} ${y - 4.6} q2.6 -1.8 5.2 0' ${ln} stroke-width='1.6'/>` +
      ojo(x1) + ojo(x2) +
      `<circle cx='${x1 - 4}' cy='${y + 4.6}' r='2.6' fill='#ff8787' opacity='.35'/><circle cx='${x2 + 4}' cy='${y + 4.6}' r='2.6' fill='#ff8787' opacity='.35'/>` +
      (sonrisa ? `<path d='M28.6 ${y + 7.4} q3.4 2.8 6.8 0' ${ln}/>` : "");
  };
  const busto = `<path d='M8.5 67 C8.5 54 17 50 32 50 C47 50 55.5 54 55.5 67 Z' fill='${M}' ${ol}/>`;
  const ctx = { RZ, ol, ln, cara, busto, M, H, SKIN };
  const { back, head, front, torso } = partesAnimal(a, ctx);
  const accDef = accesoSvg(ol);
  const acc = accList(a.acc).map(k => accDef[k] || "").join("");
  const fondo = noBg ? "" : `<circle cx='32' cy='32' r='31' fill='${T}'/><circle cx='32' cy='32' r='28.6' fill='none' stroke='${M}' stroke-opacity='.45' stroke-width='1.2'/>`;
  return `<svg class='av-anim av-${a.animal}' viewBox='0 0 64 64' width='${size}' height='${size}' role='img' aria-label='Avatar'><defs><clipPath id='${id}'><circle cx='32' cy='32' r='31'/></clipPath></defs>${fondo}<g ${noBg ? "" : `clip-path='url(#${id})'`}><g class='av-back'>${back}</g>${torso || ""}<g class='av-head'>${head}${front}${acc}</g></g></svg>`;
}

function profileReload(id) { RAW_LS.setItem("perfil-activo", id); location.reload(); }
function profileDelete(p) {
  pDelId = p.id;
  profileSetMode(null);
  $("profTitle").textContent = "Eliminar perfil";
  $("profList").classList.add("hidden");
  $("profActions").classList.add("hidden");
  $("profForm").classList.add("hidden");
  $("profConfirm").classList.remove("hidden");
  $("pcText").textContent = `¿Borrar el perfil de ${p.name}? Se borrarán su progreso, racha y notas. Esta acción no se puede deshacer.`;
}
let pDelId = null;
function profileDoDelete() {
  const p = getProfiles().find(x => x.id === pDelId);
  if (!p) { profileOpenList(); return; }
  const base = ["progreso-ingles", "historial-ingles", "ejercicios-propios", "xp-ganados", "racha-ingles", "xp-diario", "recompensas-ingles"];
  const keys = [];
  for (let i = 0; i < RAW_LS.length; i++) keys.push(RAW_LS.key(i));
  keys.forEach(rk => {
    if (PROFILE_RAW_KEYS.includes(rk)) return;
    if (p.prefix === "") { if (base.includes(rk) || rk.startsWith("nota|")) RAW_LS.removeItem(rk); }
    else if (rk.startsWith(p.prefix)) RAW_LS.removeItem(rk);
  });
  saveProfiles(getProfiles().filter(x => x.id !== p.id));
  if (RAW_LS.getItem("perfil-activo") === p.id) RAW_LS.removeItem("perfil-activo");
  location.reload();
}

function guestEnter() { RAW_LS.setItem("perfil-activo", "invitado"); location.reload(); }
function profileShow(on) { $("profiles").classList.toggle("hidden", !on); }
let profMode = null;
export let pEditId = null;
export function profileSetMode(m) {
  profMode = m;
  $("profActions").classList.toggle("hidden", !!m);
  $("profHint").classList.toggle("hidden", !m);
  $("profHintTxt").textContent = m === "edit" ? "Pulsa el perfil que quieres editar." : m === "delete" ? "Pulsa el perfil que quieres eliminar." : "";
}
export function profileOpenList() {
  const list = getProfiles(), act = activeProfile();
  profileSetMode(null);
  $("profConfirm").classList.add("hidden");
  $("profTitle").textContent = "¿Quién estudia?";
  $("profList").innerHTML = "";
  $("profList").classList.remove("hidden");
  $("profActions").classList.remove("hidden");
  $("pEdit").classList.toggle("hidden", list.length === 0);
  $("pDel").classList.toggle("hidden", list.length === 0);
  $("pgManage").classList.toggle("hidden", list.length === 0);
  $("pNew").classList.remove("hidden");
  $("profForm").classList.add("hidden");
  $("pClose").classList.toggle("hidden", !act);
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "prof-card";
    card.innerHTML = `<button type="button" class="prof-pick" aria-label="Entrar como ${escHtml(p.name)}"><span class="prof-av">${avatarSvg(p.avatar, 64)}</span><strong>${escHtml(p.name)}</strong></button><button type="button" class="prof-del" aria-label="Borrar perfil de ${escHtml(p.name)}"><span class="tab-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=\"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3\"/></svg></span></button>`;
    card.querySelector(".prof-pick").onclick = () => {
      if (profMode === "edit") profileOpenForm(false, p);
      else if (profMode === "delete") profileDelete(p);
      else profileReload(p.id);
    };
    card.querySelector(".prof-del").onclick = () => profileDelete(p);
    $("profList").appendChild(card);
  });
  profileShow(true);
}
function chips(el, items, value, onPick, render) {
  el.innerHTML = "";
  items.forEach(it => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "prof-chip";
    b.setAttribute("aria-pressed", String(it[0] === value));
    b.innerHTML = render(it);
    b.onclick = () => { onPick(it[0]); pRenderForm(); };
    el.appendChild(b);
  });
}
function chipsMulti(el, items, values, onToggle, render) {
  el.innerHTML = "";
  items.forEach(it => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "prof-chip";
    b.setAttribute("aria-pressed", String(it[0] === "ninguno" ? values.length === 0 : values.includes(it[0])));
    b.innerHTML = render(it);
    b.onclick = () => { onToggle(it[0]); pRenderForm(); };
    el.appendChild(b);
  });
}
function pRenderForm() {
  chips($("pAnimals"), P_ANIMALS, pDraft.animal, v => { pDraft.animal = v; pDraft.raza = undefined; }, it => `<span class="prof-mini">${avatarSvg({ ...pDraft, animal: it[0], acc: [] }, 56, true)}</span>${it[1]}`);
  const rz = RACES[pDraft.animal];
  $("pRazaLbl").classList.toggle("hidden", !rz);
  $("pRaza").classList.toggle("hidden", !rz);
  if (rz) chips($("pRaza"), rz, pDraft.raza || rz[0][0], v => pDraft.raza = v, it => it[1]);
  const persona = pDraft.animal === "persona";
  $("pExtra").classList.toggle("hidden", !persona);
  if (persona) {
    chips($("pSkin"), P_SKINS, pDraft.skin, v => pDraft.skin = v, it => it[1]);
    chips($("pHair"), P_HAIRS, pDraft.hair, v => pDraft.hair = v, it => it[1]);
    chips($("pHairColor"), P_HAIRCOLORS.map(c => [c, c]), pDraft.hairColor, v => pDraft.hairColor = v, it => `<span class="prof-sw" style="background:${it[0]}"></span>`);
    chips($("pBeard"), P_BEARDS, pDraft.beard, v => pDraft.beard = v, it => it[1]);
  }
  chips($("pColors"), P_COLORS.map(c => [c, c]), pDraft.color, v => pDraft.color = v, it => `<span class="prof-sw" style="background:${it[0] === "none" ? "repeating-linear-gradient(45deg,transparent 0 4px,#8e9bbd 4px 6px)" : it[0]};${it[0] === "none" ? "border:1px dashed #8e9bbd" : ""}"></span>`);
  chipsMulti($("pAcc"), P_ACCS, accList(pDraft.acc), k => {
    if (!accComprar(k)) return;
    if (k === "ninguno") { pDraft.acc = []; return; }
    const cur = accList(pDraft.acc);
    pDraft.acc = cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k];
  }, it => it[1] + (accOwned(it[0]) ? "" : ` · ${ico("lock", 12)} ${ACC_PRECIO}`));
  $("pPreview").innerHTML = avatarSvg({ animal: pDraft.animal, color: pDraft.color, acc: pDraft.acc }, 120);
}
export function profileOpenForm(first, p) {
  pEditId = p ? p.id : null;
  profileSetMode(null);
  $("profConfirm").classList.add("hidden");
  pDraft = { animal: "leon", color: "#1c7ed6", skin: "medio", hair: "corto", beard: "ninguna", hairColor: "#2b1d0b", ...(p ? p.avatar : {}), acc: accList(p ? p.avatar.acc : []) };
  $("profTitle").textContent = first ? "¡Bienvenido/a! ¿Cómo te llamas?" : p ? "Editar perfil" : "Nuevo perfil";
  $("pCreate").textContent = p ? "Guardar cambios" : "Crear perfil";
  $("profList").classList.add("hidden");
  $("pNew").classList.add("hidden");
  $("profForm").classList.remove("hidden");
  $("profActions").classList.add("hidden");
  $("pClose").classList.toggle("hidden", first);
  $("pCancel").classList.toggle("hidden", first);
  $("pName").value = p ? p.name : "";
  pRenderForm();
  profileShow(true);
  setTimeout(() => $("pName").focus(), 50);
}
function profileCreate() {
  const name = $("pName").value.trim().slice(0, 20);
  if (!name) { $("pName").focus(); return; }
  const list = getProfiles();
  if (pEditId) {
    const ed = list.find(x => x.id === pEditId);
    if (ed) { ed.name = name; ed.avatar = { ...pDraft }; }
    saveProfiles(list);
    location.reload();
    return;
  }
  const id = Date.now().toString(36);
  // El primer perfil usa los datos que ya existían en el navegador
  list.push({ id, name, avatar: { ...pDraft }, prefix: list.length === 0 ? "" : "p" + id + "|" });
  saveProfiles(list);
  profileReload(id);
}
export function profilesInit() {
  $("pNew").onclick = () => profileOpenForm(false);
  $("pGuest").onclick = guestEnter;
  $("pEdit").onclick = () => profileSetMode("edit");
  $("pDel").onclick = () => profileSetMode("delete");
  $("pModeCancel").onclick = () => profileSetMode(null);
  $("pcCancel").onclick = () => profileOpenList();
  $("pcOk").onclick = profileDoDelete;
  $("pCancel").onclick = () => profileOpenList();
  $("pClose").onclick = () => profileShow(false);
  $("pCreate").onclick = profileCreate;
  $("pName").onkeydown = e => { if (e.key === "Enter") profileCreate(); };
  // Con el teclado abierto (iPhone) el modal ocupa solo la parte visible: "Crear perfil" no queda debajo
  // Solo se escribe el estilo si cambia el valor, y en el siguiente frame: así un evento no puede provocar otro en bucle (el móvil se quedaba bloqueado)
  let vvFrame = 0, vvUltimo = "";
  const ajustarTeclado = () => {
    vvFrame = 0;
    const vv = window.visualViewport, el = $("profiles");
    if (!vv || !el) return;
    const visible = !el.classList.contains("hidden");
    const valor = visible ? vv.offsetTop + "|" + vv.height : "";
    if (valor === vvUltimo) return;
    vvUltimo = valor;
    el.style.top = visible ? vv.offsetTop + "px" : "";
    el.style.height = visible ? vv.height + "px" : "";
  };
  const ajustarTecladoDiferido = () => { if (!vvFrame) vvFrame = requestAnimationFrame(ajustarTeclado); };
  if (window.visualViewport) { window.visualViewport.addEventListener("resize", ajustarTecladoDiferido); window.visualViewport.addEventListener("scroll", ajustarTecladoDiferido); }
  document.addEventListener("click", e => { if (e.target.closest("#switchBtn")) profileOpenList(); });
  if (RAW_LS.getItem("perfil-activo") === "invitado") profileShow(false);
  else if (getProfiles().length === 0 || !activeProfile()) profileOpenList();
  else profileShow(false);
}



/* Partes del cuerpo según el animal (o la persona): fondo, cabeza, delante y torso. */
function partesAnimal(a, ctx) {
  const { RZ, ol, ln, cara, busto, M, H, SKIN } = ctx;
  let back = "", head = "", front = "", torso = busto;
  switch (a.animal) {
    case "zorro": {
      const R = { rojo: ["#e0692f", "#f08a4b", "#ffffff"], artico: ["#cdd5dd", "#f4f6f8", "#ffffff"], fenec: ["#e2b56a", "#f2d394", "#fff6e0"] }[RZ] || ["#e0692f", "#f08a4b", "#ffffff"];
      torso = null;
      back = `<path d='M13.5 34 L15 8 L31 22 Z' fill='${R[0]}' ${ol}/><path d='M50.5 34 L49 8 L33 22 Z' fill='${R[0]}' ${ol}/><path d='M17 27 L17.5 15.5 L24 21.5 Z' fill='${AV_OUT}' opacity='.25'/><path d='M47 27 L46.5 15.5 L40 21.5 Z' fill='${AV_OUT}' opacity='.25'/>`;
      head = `<ellipse cx='32' cy='37' rx='17.5' ry='15.5' fill='${R[1]}' ${ol}/><path d='M14.5 41 C17 52 25 56 32 56 C39 56 47 52 49.5 41 C46 46 40 46.5 32 46.5 C24 46.5 18 46 14.5 41 Z' fill='${R[2]}' ${ol}/><ellipse cx='32' cy='44.5' rx='2.6' ry='2' fill='${AV_OUT}'/>` + cara(35, false);
      break;
    }
    case "oso": {
      const R = { pardo: ["#8f5b2e", "#a46d3d", "#e2bf98"], polar: ["#eef1f4", "#ffffff", "#dfe5eb"], panda: ["#20252c", "#ffffff", "#ffffff"] }[RZ] || ["#8f5b2e", "#a46d3d", "#e2bf98"];
      torso = null;
      back = `<circle cx='15.5' cy='21' r='6.8' fill='${R[0]}' ${ol}/><circle cx='48.5' cy='21' r='6.8' fill='${R[0]}' ${ol}/><circle cx='15.5' cy='21.4' r='3.2' fill='${R[2]}'/><circle cx='48.5' cy='21.4' r='3.2' fill='${R[2]}'/>`;
      head = `<circle cx='32' cy='37' r='19' fill='${R[1]}' ${ol}/><ellipse cx='32' cy='45' rx='9.5' ry='7' fill='${R[2]}' ${ol}/><ellipse cx='32' cy='42' rx='3.4' ry='2.4' fill='${AV_OUT}'/>` +
        (RZ === "panda" ? `<ellipse cx='24' cy='34' rx='5.6' ry='4.8' fill='${AV_OUT}'/><ellipse cx='40' cy='34' rx='5.6' ry='4.8' fill='${AV_OUT}'/><circle cx='24' cy='34' r='1.8' fill='#ffffff'/><circle cx='40' cy='34' r='1.8' fill='#ffffff'/>` : cara(34, false));
      break;
    }
    case "conejo": {
      const R = { blanco: ["#ffffff", "#ffffff"], gris: ["#b4bcc5", "#d6dce2"], marron: ["#b2683a", "#d18b5a"] }[RZ] || ["#ffffff", "#ffffff"];
      torso = null;
      back = `<ellipse cx='23.5' cy='15' rx='5.6' ry='14.5' fill='${R[0]}' ${ol}/><ellipse cx='40.5' cy='15' rx='5.6' ry='14.5' fill='${R[0]}' ${ol}/><ellipse cx='23.5' cy='16' rx='2.6' ry='9.5' fill='#ffb3c6'/><ellipse cx='40.5' cy='16' rx='2.6' ry='9.5' fill='#ffb3c6'/>`;
      head = `<circle cx='32' cy='40' r='17.5' fill='${R[1]}' ${ol}/><path d='M29.2 43.6 h5.6 l-2.8 2.8 z' fill='#e0609a' ${ol} stroke-width='1.2'/>` + cara(38, false) + `<path d='M28.5 47.5 q1.75 1.7 3.5 0 q1.75 1.7 3.5 0' ${ln}/>`;
      break;
    }
    case "leon": {
      const R = { clasico: ["#c77a22", "#e3953a", "#f8cf7e"], blanco: ["#c3cad2", "#e4e9ee", "#fff9e8"], negro: ["#3a4048", "#50565f", "#8a929c"] }[RZ] || ["#c77a22", "#e3953a", "#f8cf7e"];
      torso = null;
      let melena = "";
      for (let k = 0; k < 10; k++) { const an = k * Math.PI / 5; melena += `<circle cx='${(32 + 22.5 * Math.cos(an)).toFixed(2)}' cy='${(33 + 22.5 * Math.sin(an)).toFixed(2)}' r='7' fill='${R[0]}' ${ol}/>`; }
      back = `${melena}<circle cx='32' cy='33' r='20' fill='${R[1]}' ${ol}/>`;
      head = `<circle cx='32' cy='37' r='15.5' fill='${R[2]}' ${ol}/><path d='M29.2 42 h5.6 l-2.8 3 z' fill='#8a4b12' ${ol} stroke-width='1.2'/>` + cara(35, false) + `<path d='M28.5 46.5 q1.75 1.7 3.5 0 q1.75 1.7 3.5 0' ${ln}/>`;
      break;
    }
    case "pinguino": {
      torso = null;
      const crest = { rey: `<ellipse cx='19' cy='26' rx='3.8' ry='5.2' fill='#f59f00' ${ol}/><ellipse cx='45' cy='26' rx='3.8' ry='5.2' fill='#f59f00' ${ol}/>`, macarron: `<path d='M24 13 Q28 1 38 6 Q32 8 30 15 Z' fill='#f59f00' ${ol}/>` }[RZ] || "";
      back = `<ellipse cx='32' cy='37' rx='20' ry='24' fill='#1f2630' ${ol}/>` + crest;
      head = `<ellipse cx='32' cy='44' rx='12.5' ry='15' fill='#f7f9fb' ${ol} stroke-width='1.2'/>` +
        `<circle cx='25.8' cy='33' r='4' fill='#ffffff' ${ol} stroke-width='1.4'/><circle cx='38.2' cy='33' r='4' fill='#ffffff' ${ol} stroke-width='1.4'/><circle cx='26.6' cy='33.4' r='2' fill='${AV_OUT}'/><circle cx='39' cy='33.4' r='2' fill='${AV_OUT}'/>` +
        `<path d='M28.3 39 L35.7 39 L32 45 Z' fill='#f59f00' ${ol} stroke-width='1.4'/>`;
      front = `<ellipse cx='26.5' cy='61' rx='4.5' ry='2' fill='#f59f00' ${ol} stroke-width='1.2'/><ellipse cx='37.5' cy='61' rx='4.5' ry='2' fill='#f59f00' ${ol} stroke-width='1.2'/>`;
      break;
    }
    case "zombi": {
      const capZ = `<path d='M15.5 36 C14 19 22 15 32 15 C42 15 50 19 48.5 36 C47 28 43 24 36 25 C29 25 21 25 15.5 36 Z' fill='#3d3125' ${ol}/>`;
      head = `<path d='M10.5 35 q0 -3 0 -3' fill='none'/><ellipse cx='15.5' cy='38' rx='3.2' ry='3.6' fill='#7fb05a' ${ol} stroke-width='1.4'/><ellipse cx='48.5' cy='38' rx='3.2' ry='3.6' fill='#7fb05a' ${ol} stroke-width='1.4'/>` +
        `<ellipse cx='32' cy='37' rx='16' ry='16.5' fill='#9ccf72' ${ol}/>` +
        `<path d='M22.5 33.5 L27 38 M27 33.5 L22.5 38 M37 33.5 L41.5 38 M41.5 33.5 L37 38' stroke='${AV_OUT}' stroke-width='1.7' stroke-linecap='round'/>` +
        `<path d='M26.5 47 H37.5' stroke='${AV_OUT}' stroke-width='1.7' stroke-linecap='round'/><path d='M29 45 v4 M32 45 v4 M35 45 v4' stroke='${AV_OUT}' stroke-width='1.2'/>`;
      front = capZ;
      break;
    }
    case "robot": {
      torso = `<path d='M12 67 L14 56 Q14 52 19 52 L45 52 Q50 52 50 56 L52 67 Z' fill='${M}' ${ol}/>`;
      back = `<path d='M32 17 V8' stroke='${AV_OUT}' stroke-width='2'/><circle cx='32' cy='7' r='3.2' fill='#ff6b6b' ${ol} stroke-width='1.4'/><rect x='8.5' y='27' width='6' height='13' rx='2.4' fill='#b7c0c9' ${ol} stroke-width='1.6'/><rect x='49.5' y='27' width='6' height='13' rx='2.4' fill='#b7c0c9' ${ol} stroke-width='1.6'/>`;
      head = `<rect x='14' y='17' width='36' height='34' rx='10' fill='#dfe5eb' ${ol}/><rect x='19' y='28' width='26' height='12' rx='6' fill='${AV_OUT}'/><circle cx='25' cy='34' r='3' fill='#4dabf7'/><circle cx='39' cy='34' r='3' fill='#4dabf7'/><circle cx='26' cy='33' r='.9' fill='#ffffff'/><circle cx='40' cy='33' r='.9' fill='#ffffff'/><rect x='27' y='43' width='10' height='2.8' rx='1.4' fill='#4dabf7'/>`;
      break;
    }
    case "bruja": {
      head = `<ellipse cx='32' cy='38' rx='15.5' ry='16' fill='#b5e0ae' ${ol}/>` + cara(37, true) + `<path d='M32 39.5 l3 4.5 h-3' ${ln} stroke-width='1.4'/>`;
      front = `<ellipse cx='32' cy='22.5' rx='22' ry='4.6' fill='#2d2f48' ${ol}/><path d='M18.5 22.5 C20 14 25 6 33 2.5 C39 8 44.5 15 45.5 22.5 Z' fill='#43306e' ${ol}/><rect x='18.6' y='17.6' width='26.8' height='4.4' fill='#9d7cf5' ${ol} stroke-width='1.4'/>`;
      torso = `<path d='M8.5 67 C8.5 54 17 50 32 50 C47 50 55.5 54 55.5 67 Z' fill='${M}' ${ol}/>`;
      break;
    }
    case "fantasma": {
      torso = null;
      head = `<path d='M14 60 V32 C14 18.5 22 11 32 11 C42 11 50 18.5 50 32 V60 L44.5 54.5 L38.8 60 L32 54.5 L25.2 60 L19.5 54.5 Z' fill='#f7f9fb' ${ol}/>` +
        `<ellipse cx='25' cy='33' rx='2.6' ry='3.3' fill='${AV_OUT}'/><ellipse cx='39' cy='33' rx='2.6' ry='3.3' fill='${AV_OUT}'/><circle cx='25.9' cy='31.8' r='.9' fill='#ffffff'/><circle cx='39.9' cy='31.8' r='.9' fill='#ffffff'/><ellipse cx='32' cy='44' rx='3.2' ry='3.8' fill='${AV_OUT}'/>`;
      break;
    }
    case "persona": {
      const capCorto = `<path d='M15.5 36 C14 19 22 15 32 15 C42 15 50 19 48.5 36 C47 28 43 23.5 36 23.5 C28 23.5 20 24 15.5 36 Z' fill='${H}' ${ol}/>`;
      back = a.hair === "largo" ? `<path d='M13.5 36 C11.5 57 15.5 62 20 60 L44 60 C48.5 62 52.5 57 50.5 36 C50 21 42 13 32 13 C22 13 14 21 13.5 36 Z' fill='${H}' ${ol}/>` : "";
      head = `<ellipse cx='16' cy='37' rx='3.4' ry='3.8' fill='${SKIN}' ${ol} stroke-width='1.6'/><ellipse cx='48' cy='37' rx='3.4' ry='3.8' fill='${SKIN}' ${ol} stroke-width='1.6'/>` +
        `<ellipse cx='32' cy='36' rx='15.5' ry='16.5' fill='${SKIN}' ${ol}/>` + cara(37, true) +
        `<path d='M30.6 41.5 q1.4 1.8 2.8 0' ${ln} stroke-width='1.3'/>`;
      const hairs = {
        corto: capCorto,
        largo: capCorto,
        rizado: `<circle cx='19' cy='24' r='5.8' fill='${H}' ${ol} stroke-width='1.6'/><circle cx='26' cy='17.5' r='6' fill='${H}' ${ol} stroke-width='1.6'/><circle cx='38' cy='17.5' r='6' fill='${H}' ${ol} stroke-width='1.6'/><circle cx='45' cy='24' r='5.8' fill='${H}' ${ol} stroke-width='1.6'/><circle cx='32' cy='17' r='6.8' fill='${H}' ${ol} stroke-width='1.6'/>`,
        moño: capCorto + `<circle cx='32' cy='12.5' r='6' fill='${H}' ${ol}/>`,
        calvo: ""
      };
      front = hairs[a.hair] ?? hairs.corto;
      front += { ninguna: "", bigote: `<path d='M26.5 47.5 Q32 44.5 37.5 47.5 Q32 49 26.5 47.5 Z' fill='${H}' ${ol} stroke-width='1.4'/>`, corta: `<path d='M18.5 41 C19.5 53 27 56 32 56 C37 56 44.5 53 45.5 41 C42 46 38 47 32 47 C26 47 22 46 18.5 41 Z' fill='${H}' ${ol} stroke-width='1.6'/>`, larga: `<path d='M17.5 40 C18.5 58 26 62 32 62 C38 62 45.5 58 46.5 40 C42 46 38 47 32 47 C26 47 22 46 17.5 40 Z' fill='${H}' ${ol} stroke-width='1.6'/>` }[a.beard] ?? "";
      break;
    }
    default: {
      torso = busto;
      break;
    }
  }
  return { back, head, front, torso };
}
/* Accesorios: cada uno es un SVG que se coloca sobre el avatar. */
function accesoSvg(ol) {
  return {
    sombrero: `<ellipse cx='32' cy='19.5' rx='23' ry='5' fill='#8a5a2b' ${ol}/><path d='M20.5 18.5 C20.5 6 25.5 2.5 32 2.5 C38.5 2.5 43.5 6 43.5 18.5 Z' fill='#a86c36' ${ol}/><rect x='20.6' y='13.4' width='22.8' height='3.6' fill='#ffd43b' ${ol} stroke-width='1.2'/>`,
    gorra: `<path d='M16 27 C16 10 23.5 5 32 5 C40.5 5 48 10 48 27 Z' fill='#353b43' ${ol}/><path d='M13.5 27 Q32 31.5 50.5 27 L53 30.5 Q32 36 11 30.5 Z' fill='#1f242b' ${ol}/>`,
    corona: `<path d='M17.5 19 L19.5 5.5 L26 13.5 L32 3.5 L38 13.5 L44.5 5.5 L46.5 19 Z' fill='#ffd43b' ${ol}/><circle cx='32' cy='3.5' r='1.9' fill='#e03131' ${ol} stroke-width='1.2'/>`,
    diadema: `<path d='M13.5 28 Q32 5 50.5 28' stroke='${AV_OUT}' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M13.5 28 Q32 5 50.5 28' stroke='#ffd43b' stroke-width='2.4' fill='none' stroke-linecap='round'/>`,
    lazo: `<path d='M45 15 L35.5 9 L35.5 21 Z' fill='#f06595' ${ol} stroke-width='1.6'/><path d='M45 15 L54.5 9 L54.5 21 Z' fill='#f06595' ${ol} stroke-width='1.6'/><circle cx='45' cy='15' r='2.4' fill='#c2255c' ${ol} stroke-width='1.2'/>`,
    bufanda: `<path d='M13.5 49.5 Q32 58 50.5 49.5 L50.5 56 Q32 64.5 13.5 56 Z' fill='#e8590c' ${ol}/><path d='M39.5 55 L46 54 L47.5 63 L41 64 Z' fill='#c2410c' ${ol} stroke-width='1.6'/>`,
    pendientes: `<circle cx='15.5' cy='45' r='2.4' fill='#fcc419' ${ol} stroke-width='1.3'/><circle cx='48.5' cy='45' r='2.4' fill='#fcc419' ${ol} stroke-width='1.3'/>`,
    estrella: `<path d='M47 43.5 L48.6 47 L52.3 47.4 L49.5 49.9 L50.3 53.6 L47 51.7 L43.7 53.6 L44.5 49.9 L41.7 47.4 L45.4 47 Z' fill='#ffd43b' ${ol} stroke-width='1.3'/>`,
    gafas: `<circle cx='25.5' cy='35' r='5.6' fill='#ffffff' fill-opacity='.22' ${ol} stroke-width='1.8'/><circle cx='38.5' cy='35' r='5.6' fill='#ffffff' fill-opacity='.22' ${ol} stroke-width='1.8'/><path d='M31.1 34.8 Q32 33.4 32.9 34.8' ${ol} stroke-width='1.6' fill='none'/>`,
    gafasSol: `<rect x='19.5' y='31' width='12' height='8.5' rx='3.2' fill='${AV_OUT}' ${ol} stroke-width='1.2'/><rect x='32.5' y='31' width='12' height='8.5' rx='3.2' fill='${AV_OUT}' ${ol} stroke-width='1.2'/><path d='M31.5 34.5 h1' stroke='${AV_OUT}' stroke-width='1.8'/><path d='M22 33 l3 -1' stroke='#ffffff' stroke-opacity='.6' stroke-width='1' stroke-linecap='round'/>`,
    gafasSolo: "",
    pajarita: `<path d='M22 52 L32 56 L22 60 Z M42 52 L32 56 L42 60 Z' fill='#e03131' ${ol} stroke-width='1.4'/><circle cx='32' cy='56' r='2.2' fill='#c92a2a' ${ol} stroke-width='1.2'/>`,
    auriculares: `<path d='M12 35 Q12 11.5 32 11.5 Q52 11.5 52 35' stroke='${AV_OUT}' stroke-width='4.6' fill='none' stroke-linecap='round'/><path d='M12 35 Q12 11.5 32 11.5 Q52 11.5 52 35' stroke='#4c6ef5' stroke-width='2' fill='none' stroke-linecap='round'/><rect x='8.5' y='29.5' width='7.5' height='12' rx='3.4' fill='#4c6ef5' ${ol} stroke-width='1.6'/><rect x='48' y='29.5' width='7.5' height='12' rx='3.4' fill='#4c6ef5' ${ol} stroke-width='1.6'/>`
  };
}