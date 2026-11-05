import { $, PROFILE_RAW_KEYS, RAW_LS, ico } from "./01-nucleo-niveles-audio.js";
import { AV, CAT, FREE_AV, GRAD, MARCO_COL, PARTICULAS, OWNED_INICIAL } from "./00-personajes-d4.js";
import { rewards } from "./04-recompensas-logros-copia-auto.js";

/* ---------- Perfiles: pantalla de bienvenida, selección y creación ---------- */
// Personajes y colores son los de la maqueta D4 (los gratis y los que se compran en la tienda)
export const P_ANIMALS = [...FREE_AV.map(a => [a.id, a.nombre]), ...CAT.filter(c => c.k === "avatar").map(c => [c.id, c.nombre])];
export const P_COLORES = [["#ffd9a8", "Arena"], ...CAT.filter(c => c.k === "color").map(c => [c.id, c.nombre])];
export const poseido = id => OWNED_INICIAL.includes(id) || (rewards().owned || []).includes(id);
export const escHtml = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export function getProfiles() { try { return JSON.parse(RAW_LS.getItem("perfiles-ingles") || "[]"); } catch (e) { return []; } }
export function saveProfiles(list) { RAW_LS.setItem("perfiles-ingles", JSON.stringify(list)); }
export function activeProfile() { const id = RAW_LS.getItem("perfil-activo"); return getProfiles().find(p => p.id === id) || null; }
let pDraft = { animal: "ardilla", color: "#ffd9a8", marco: null, efectos: [] };
let pCreando = false;   // al crear un perfil se puede elegir cualquier personaje; colores, marcos y efectos siguen con su precio
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
// Personaje del perfil: dibujo, fondo, marco y efectos de la maqueta. Lo usan perfiles, tienda, perfil y mascota.
export function avatarSvg(av, size = 64) {
  const a = av || {}, animal = AV[a.animal] ? a.animal : "ardilla";
  const bg = a.color === "grad" || (a.color || "").startsWith("#") ? a.color : "#ffd9a8";
  const m = a.marco || "", f = a.efectos || [];
  let cl = "av";
  if (f.includes("aura")) cl += " fx-aura";
  if (f.includes("vivo")) cl += " fx-vivo";
  if (m === "marco") cl += " marco-oro";
  else if (m === "arcoiris") cl += " marco-arco";
  else if (m === "sencillo") cl += " marco-simple";
  else if (m) cl += " marco-part";
  if (bg === "grad") cl += " fondo-grad";
  const fxp = [PARTICULAS[m] ? m : "", f.includes("destellos") ? "estrellas" : ""].filter(Boolean).join(" ");
  return `<span class="${cl}"${fxp ? ` data-fxp="${fxp}"` : ""} style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.3)}px;background:${bg === "grad" ? GRAD : bg};--mc:${MARCO_COL[m] || "#2a1d14"}">${AV[animal]}</span>`;
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
function pRenderForm() {
  chips($("pAnimals"), P_ANIMALS, pDraft.animal, v => { if (pCreando || poseido(v)) pDraft.animal = v; },
    it => `<span class="prof-mini">${avatarSvg({ ...pDraft, animal: it[0] }, 56)}</span>${it[1]}${pCreando || poseido(it[0]) ? "" : ` · ${ico("lock", 12)}`}`);
  chips($("pColors"), P_COLORES, pDraft.color, v => { if (poseido(v)) pDraft.color = v; },
    it => `<span class="prof-sw" style="background:${it[0] === "grad" ? GRAD : it[0]}"></span>${it[1]}${poseido(it[0]) ? "" : ` · ${ico("lock", 12)}`}`);
  $("pPreview").innerHTML = avatarSvg(pDraft, 120);
}
export function profileOpenForm(first, p) {
  pEditId = p ? p.id : null;
  pCreando = !p;
  profileSetMode(null);
  $("profConfirm").classList.add("hidden");
  pDraft = { animal: "ardilla", color: "#ffd9a8", marco: null, efectos: [], ...(p ? p.avatar : {}) };
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
  $("pBorrarTodo").onclick = () => document.dispatchEvent(new Event("borrar-datos"));
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
  else if (getProfiles().length === 0) profileOpenForm(true);   // sin perfiles: directo a crear el primero
  else if (!activeProfile()) profileOpenList();
  else profileShow(false);
}



