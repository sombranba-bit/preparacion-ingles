// Tienda, Sellos y Perfil: catálogo, precios, personaje y efectos de la maqueta D4.
// Las monedas son las de la app (rewards); lo comprado queda en rewards().owned y el equipo en el perfil activo.
import { $, currentLevel, showTab } from "./01-nucleo-niveles-audio.js";
import { rewards, saveRewards, spendCoins, sellosDatos } from "./04-recompensas-logros-copia-auto.js";
import { celebrate } from "./05-formatos-pdf-restaurar-copia.js";
import { getProfiles, saveProfiles, activeProfile, avatarSvg, poseido, profileOpenList, escHtml } from "./03-perfiles.js";
import { AV, CAT, FREE_AV, GRAD, marcoIcono, fxParticulas, confetiFx } from "./00-personajes-d4.js";
import { infoSellosHtml, lsGet, lsSet } from "./02-progreso-xp-racha-mascota.js";
import { salirCuenta } from "./11-cuentas.js";

const COIN = `<svg class="ic ic-c" aria-hidden="true"><use href="#i-moneda"/></svg>`;
const LOCK = `<svg class="ic ic-c" aria-hidden="true"><use href="#i-candado"/></svg>`;
const $$ = s => [...document.querySelectorAll(s)];
const fdeSemana = () => { const x = new Date().getDay(); return x === 0 || x === 6; };
const fin = () => { const f = new Date(); f.setHours(24, 0, 0, 0); return f.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }); };
const MONEDAS = () => rewards().coins || 0;

// Dos ofertas al día (−30 %) entre los artículos con precio; cambian cada medianoche
export function ofertasHoy() {
  const d = Math.floor(Date.now() / 864e5), P = CAT.filter(c => c.precio > 0), n = P.length;
  return [P[d % n].id, P[(d + 5) % n].id];
}
export function tiendaPrecio(it) {
  let p = it.precio, of = ofertasHoy().includes(it.id);
  if (of) p = Math.round(p * 0.7 / 5) * 5;
  if (fdeSemana()) p = Math.round(p * 0.9 / 5) * 5;
  return { final: p, base: it.precio, oferta: of };
}

// Personaje y efectos del perfil activo (valores por defecto si el perfil es antiguo)
export function avatarActual() {
  const p = activeProfile();
  return { animal: "ardilla", color: "#ffd9a8", marco: null, efectos: [], ...((p && p.avatar) || {}) };
}
function cambiarAvatar(fn) {
  const list = getProfiles(), act = activeProfile();
  const p = act && list.find(x => x.id === act.id);   // el mismo objeto que se guarda
  if (!p) { toast("Entra en un perfil para ponerte cosas."); return false; }
  p.avatar = fn({ ...avatarActual() });
  saveProfiles(list);
  aplicarAvatares();
  return true;
}
// Repinta todo lo que muestra el personaje: mascota, perfil, tienda y lista de perfiles
export function aplicarAvatares() {
  renderTienda(); renderPerfilPanel();
  const m = $("mascotBtn"); if (m && m.querySelector(".av")) m.querySelector(".av").outerHTML = avatarSvg(avatarActual(), 56);
}

export function toast(t) {
  const e = $("toast"); if (!e) return;
  e.textContent = t; e.classList.add("on");
  clearTimeout(toast.h); toast.h = setTimeout(() => e.classList.remove("on"), 2200);
}

/* ---------- Tienda ---------- */
function icono(it) {
  if (it.k === "avatar") return `<span style="display:block;width:48px;height:48px">${AV[it.id]}</span>`;
  if (it.k === "color") return it.animado ? `<span class="sw-grad" style="background:${GRAD}"></span>` : `<span class="sw-c" style="background:${it.id}"></span>`;
  if (it.k === "marco") return `<span class="pv-marco${it.id === "arcoiris" ? " pv-arco" : ""}" ${["hojas", "estrellas", "llamas", "nieve", "burbujas", "cosmico"].includes(it.id) ? `data-p="${it.id}"` : ""} style="--mc:${({ sencillo: "#2a1d14", hojas: "#18a58a", marco: "#ffb22e", arcoiris: "#ffd166", estrellas: "#ffd166", llamas: "#ff7a3d", nieve: "#4aa8ff", burbujas: "#5fd6ff", cosmico: "#a57bff" })[it.id]}"></span>`;
  return `<span class="pv pv-${it.id}"><svg class="ic" aria-hidden="true"><use href="#i-${it.id === "destellos" ? "destello" : it.id}"/></svg></span>`;
}
function estadoBtn(it, p) {
  const av = avatarActual(), tiene = poseido(it.id);
  if (tiene) {
    if (it.k === "avatar") return av.animal === it.id ? `<button class="btn-mini tuyo" disabled>Equipado</button>` : `<button class="btn-mini tuyo" data-equip="${it.id}">Equipar</button>`;
    if (it.k === "color") return av.color === it.id ? `<button class="btn-mini tuyo" disabled>Equipado</button>` : `<button class="btn-mini tuyo" data-equip="${it.id}">Equipar</button>`;
    if (it.k === "marco") return av.marco === it.id ? `<button class="btn-mini tuyo" disabled>Equipado</button>` : `<button class="btn-mini tuyo" data-equip="${it.id}">Equipar</button>`;
    if (it.k === "efecto") return `<button class="btn-mini ${(av.efectos || []).includes(it.id) ? "tuyo" : ""}" data-toggle="${it.id}">${(av.efectos || []).includes(it.id) ? "Activo" : "Activar"}</button>`;
  }
  if (MONEDAS() < p.final) return `<button class="btn-mini tuyo" disabled>Te faltan ${p.final - MONEDAS()}</button>`;
  return `<button class="btn-mini" data-comprar="${it.id}">Comprar</button>`;
}
function fila(it) {
  const p = tiendaPrecio(it);
  const badge = (p.oferta ? `<span class="chip of">Oferta −30%</span>` : "") + (it.animado ? ` <span class="chip anim">Animado</span>` : "");
  const precioHtml = p.final === 0 ? `<span class="precio"><span>Gratis</span></span>`
    : p.final === p.base ? `<span class="precio"><span>${p.final} ${COIN}</span></span>`
    : `<span class="precio"><s>${p.base} ${COIN}</s><span>${p.final} ${COIN}</span></span>`;
  return `<div class="tienda-item">${p.oferta ? '<span class="cartel">OFERTA</span>' : ""}
    <span class="ico-t">${it.k === "marco" ? marcoIcono(it.id) : icono(it)}</span>
    <span><b class="tn" style="display:block">${it.nombre}</b><small class="td" style="display:block">${it.desc}</small><span style="display:block;margin-top:6px">${badge}</span></span>
    <span style="display:grid;justify-items:end;gap:6px">${precioHtml}${estadoBtn(it, p)}</span>
  </div>`;
}
export function renderTienda() {
  const box = $("ofertas");
  if (!box) return;
  $$(".mon").forEach(e => e.textContent = MONEDAS());
  $("ofFin").textContent = "Hasta las " + fin();
  $("ofTxt").textContent = fdeSemana() ? "Fin de semana: −10% en todo" : "Ofertas de hoy";
  box.innerHTML = ofertasHoy().map(id => fila(CAT.find(c => c.id === id))).join("");
  $("t-avatar").innerHTML = CAT.filter(c => c.k === "avatar").map(fila).join("");
  $("t-color").innerHTML = CAT.filter(c => c.k === "color").map(fila).join("");
  $("t-efecto").innerHTML = CAT.filter(c => c.k === "efecto").map(fila).join("");
  $("t-marco").innerHTML = CAT.filter(c => c.k === "marco").map(fila).join("");
  $$("#p-tienda [data-comprar]").forEach(b => b.onclick = () => pedir(b.dataset.comprar));
  $$("#p-tienda [data-equip]").forEach(b => b.onclick = () => equipar(b.dataset.equip));
  $$("#p-tienda [data-toggle]").forEach(b => b.onclick = () => alternar(b.dataset.toggle));
  $$("#tienda .pv-marco[data-p]").forEach(e => { if (!e.dataset.fx) { e.dataset.fx = "1"; fxParticulas(e, e.dataset.p, "_rafP"); } });
}
let pend = null;
$("cNo") && ($("cNo").onclick = () => confirmarCompra(false));
$("cSi") && ($("cSi").onclick = () => confirmarCompra(true));
function pedir(id) {
  const it = CAT.find(c => c.id === id), p = tiendaPrecio(it);
  pend = { it, p };
  $("cT").textContent = "¿Comprar " + it.nombre + "?";
  $("cP").textContent = "Cuesta " + p.final + " monedas. Te quedarán " + (MONEDAS() - p.final) + ".";
  $("confirma").classList.add("on");
}
function confirmarCompra(ok) {
  $("confirma").classList.remove("on");
  if (!ok || !pend) { pend = null; return; }
  const { it, p } = pend; pend = null;
  if (!spendCoins(p.final)) { toast("Te faltan monedas."); return; }
  const r = rewards(); r.owned = [...(r.owned || []), it.id]; saveRewards(r);
  toast("Comprado: " + it.nombre + ". Equípalo cuando quieras.");
  renderTienda();
}
function equipar(id) {
  const it = CAT.find(c => c.id === id);
  if (it.k === "avatar") cambiarAvatar(av => ({ ...av, animal: id }));
  else if (it.k === "color") cambiarAvatar(av => ({ ...av, color: id }));
  else if (it.k === "marco") cambiarAvatar(av => ({ ...av, marco: id }));
}
function alternar(id) {
  cambiarAvatar(av => { const s = new Set(av.efectos || []); if (s.has(id)) s.delete(id); else s.add(id); return { ...av, efectos: [...s] }; });
}

/* ---------- Efectos al acertar (los llama el corrector) ---------- */
export function celebrarAcierto() {
  const av = avatarActual(), f = av.efectos || [];
  if (f.includes("confeti")) confetiFx();
  if (f.includes("vivo")) { const h = document.querySelector("#mascotBtn .av"); if (h) { h.classList.remove("salta"); void h.offsetWidth; h.classList.add("salta"); } }
}

/* ---------- Efectos de avatar (marcos con partículas, destellos): se activan al aparecer en pantalla ---------- */
function activarFxAvatar(nodo) {
  const lista = [];
  if (nodo.matches && nodo.matches(".av[data-fxp]")) lista.push(nodo);
  if (nodo.querySelectorAll) lista.push(...nodo.querySelectorAll(".av[data-fxp]"));
  lista.forEach(el => {
    if (el.dataset.fx || !el.clientWidth) return;   // oculto: se activa cuando se muestre
    el.dataset.fx = "1";
    el.dataset.fxp.split(" ").filter(Boolean).forEach((t, i) => fxParticulas(el, t, "_raf" + t + i));
  });
}
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && activarFxAvatar(n)))).observe(document.body, { childList: true, subtree: true });
activarFxAvatar(document.body);

/* ---------- Sellos ---------- */
const PALABRAS = ["Ninguno", "Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"];
export function renderLogrosPanel() {
  const box = $("sellos");
  if (!box) return;
  const datos = sellosDatos(), ganados = datos.filter(d => d.ok).length;
  box.innerHTML = datos.map(d => {
    const estado = d.ok ? "Conseguido" : d.pr ? `${d.pr[0]} de ${d.pr[1]}` : "";
    const txt = d.ok ? `${d.nombre}: conseguido. ${d.desc}.` : `${d.nombre}: ${estado}. ${d.desc}.`;
    return `<button class="sello ${d.ok ? "got" : "off"}" data-txt="${escHtml(txt)}"><span class="ring"><svg class="ic" aria-hidden="true"><use href="#i-${d.icono}"/></svg></span><b>${d.nombre}</b><small>${estado || "Conseguido"}</small></button>`;
  }).join("");
  const cuantos = ganados === 0 ? "Ninguno conseguido" : ganados === 1 ? "Uno conseguido" : `${PALABRAS[ganados]} conseguidos`;
  $("sellosSub").textContent = `${cuantos} de ${PALABRAS[datos.length].toLowerCase()}. Toca uno para ver cómo se gana.`;
  $("msg").textContent = "";
  $$("#sellos .sello").forEach(b => b.onclick = () => { $("msg").textContent = b.dataset.txt; });
  const ri = $("rankInfo"); if (ri) ri.innerHTML = infoSellosHtml();
}

// Al entrar o salir de la cuenta, Perfil se vuelve a pintar (para mostrar o quitar "Cerrar sesión").
document.addEventListener("cuenta-cambio", () => renderPerfilPanel());

/* ---------- Perfil: personaje, color, nivel y tienda ---------- */
export function renderPerfilPanel() {
  const box = $("perfilCab");
  if (!box) return;
  const p = activeProfile(), av = avatarActual();
  const nombre = p ? p.name : "Invitado";
  box.innerHTML = `<span class="perfil-av-wrap">${avatarSvg(av, 120)}</span>
    <h1 class="perfil-nombre">${nombre}</h1>
    <p class="etiq" id="nivelPerfil"></p>
    <button class="chip" type="button" data-ir-tienda style="min-height:40px">${COIN} <b class="mon">${MONEDAS()}</b> · Ir a la tienda</button>`;
  box.querySelector("[data-ir-tienda]").onclick = () => $("bnav") && [...$("bnav").querySelectorAll("button")].find(b => b.dataset.area === "tienda")?.click();
  box.querySelector(".perfil-av-wrap .av").onclick = () => profileOpenList();
  $("nivelPerfil").textContent = "Examen " + currentLevel + " · objetivo oficial";
  const personajes = $("avatares");
  if (personajes) {
    const todos = FREE_AV.map(a => ({ id: a.id, nombre: a.nombre, precio: 0 })).concat(CAT.filter(c => c.k === "avatar"));
    personajes.innerHTML = todos.map(c => {
      const lock = !poseido(c.id);
      return `<button aria-pressed="${av.animal === c.id}" data-av="${c.id}" class="${lock ? "bloqueado" : ""}"><span class="ico-av">${AV[c.id]}</span>${c.nombre}${lock ? `<span class="lock">${c.precio} ${COIN}</span>` : ""}</button>`;
    }).join("");
    $$("#avatares [data-av]").forEach(b => b.onclick = () => {
      if (!poseido(b.dataset.av)) { toast("Cómpralo en la tienda por " + CAT.find(c => c.id === b.dataset.av).precio + " monedas"); return; }
      cambiarAvatar(a => ({ ...a, animal: b.dataset.av }));
    });
  }
  const importar = document.createElement("button"); importar.className = "chip"; importar.type = "button"; importar.style.minHeight = "40px"; importar.textContent = "Importar y copia"; importar.onclick = () => showTab("importar"); box.appendChild(importar);
  const sesion = window.ctaEstado && window.ctaEstado.user;
  if (sesion) { const sal = document.createElement("button"); sal.className = "chip"; sal.type = "button"; sal.style.minHeight = "40px"; sal.textContent = "Cerrar sesión"; sal.onclick = () => salirCuenta(); box.appendChild(sal); }
  // Borrar datos desde Perfil (mismos eventos que la lista de perfiles)
  const borrar = (texto, evento) => { const b = document.createElement("button"); b.className = "chip"; b.type = "button"; b.style.cssText = "min-height:40px;color:#b3261e"; b.textContent = texto; b.onclick = () => document.dispatchEvent(new Event(evento)); box.appendChild(b); };
  if (sesion) borrar("Borrar mi cuenta", "cuenta-borrar");
  borrar("Borrar todos los datos", "borrar-datos");
  const idiomas = [["segExpl", "idioma-expl", "es"], ["segEj", "idioma-ej", "en"]];
  idiomas.forEach(([id, key, def]) => {
    const seg = $(id);
    if (!seg) return;
    const actual = lsGet(key, def);
    seg.querySelectorAll("button").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.v === actual));
      b.onclick = () => { lsSet(key, b.dataset.v); seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); };
    });
  });
  const cols = $("cols");
  if (cols) {
    const lista = ["#ffd9a8"].concat(CAT.filter(c => c.k === "color").map(c => c.id));
    cols.innerHTML = lista.map(c => `<button class="bol ${poseido(c) ? "" : "bloqueado"}" aria-pressed="${av.color === c}" style="background:${c === "grad" ? GRAD : c}" data-c="${c}" aria-label="Color"></button>`).join("");
    $$("#cols [data-c]").forEach(b => b.onclick = () => {
      if (!poseido(b.dataset.c)) { toast("Cómpralo en la tienda"); return; }
      cambiarAvatar(a => ({ ...a, color: b.dataset.c }));
    });
  }
}
