import {
  setPracticarAccion,
  showTab,
  $,
  BADGE,
  EXAMS,
  ITEMS,
  LEVELS,
  RAW_LS,
  SECTIONS,
  SPEEDS,
  SPEED_LBL,
  appStore,
  badgeSvg,
  currentLevel,
  ico,
  lc,
  levelColor,
  partIcon,
  secIcon,
  setPlayLabel,
  show,
  shuffle,
  speak,
  togglePlay,
  userEl,
} from "./01-nucleo-niveles-audio.js";
import {
  RANKS,
  dayKey,
  daysAgo,
  lsGet,
  lsSet,
  mascotMount,
  rankInfo,
  renderGame,
  itemHecho,
  srsDue,
  streakInfo,
  xpTotal,
} from "./02-progreso-xp-racha-mascota.js";
import { activeProfile, escHtml } from "./03-perfiles.js";
import {
  celebrate,
  check,
  finish,
  floatGain,
  fmt,
  importarCopia,
  next,
  renderFormat,
  shuffleArr,
} from "./05-formatos-pdf-restaurar-copia.js";

/* Estado de la sesión: lo escribe solo este módulo; los demás lo leen. */
export let currentSection = null;
export let queue = [], index = 0, results = [], answered = false, selectedOption = null;
export let speedIdx = 1;
export let examMode = false;
let secPerQ = 60, timeLeft = 0, timerId = null;
export let sessXp = 0;
export function setRespondida() { answered = true; }
export function avanzarIndice() { index++; }
export function sumarXpSesion(n) { sessXp += n; }

/* ---------- Recompensas: monedas, escudos extra y ventajas (solo en práctica) ---------- */
const REW_KEY = "recompensas-ingles";
export const ADV = { skip: 5, reveal: 3, redo: 4 };
let advUsed = {};
export function rewards() { return Object.assign({ coins: 0, shields: 0, goalDays: 0, lastGoal: "" }, lsGet(REW_KEY, {})); }
export function saveRewards(r) { lsSet(REW_KEY, r); }
export function ajustesGet() { try { return JSON.parse(RAW_LS.getItem("ajustes-ingles") || "{}"); } catch (e) { return {}; } }
export function ajustesSet(a) { try { RAW_LS.setItem("ajustes-ingles", JSON.stringify(a)); } catch (e) {} }
export function addCoins(n) { const r = rewards(); r.coins += n; saveRewards(r); if (!$("exercise").classList.contains("hidden") && ajustesGet().monedas !== false) floatGain(`+${n} ${ico("coin", 14)}`); }
export function spendCoins(n) { const r = rewards(); if (r.coins < n) return false; r.coins -= n; saveRewards(r); return true; }
/* Escudo extra cada 7 días seguidos con el objetivo diario cumplido; máximo 2 guardados */
export function onGoalMet() {
  const r = rewards(), t = dayKey(new Date());
  if (r.lastGoal === t) return false;
  r.goalDays = r.lastGoal === daysAgo(1) ? r.goalDays + 1 : 1;
  r.lastGoal = t;
  let earned = false;
  if (r.goalDays % 7 === 0 && r.shields < 2) { r.shields += 1; earned = true; }
  saveRewards(r);
  return earned;
}
/* ---------- Logros (se calculan con los datos existentes) y tienda de accesorios del avatar ---------- */
const LOGROS = [
  { id: "primer-ejercicio", name: "Primer paso", desc: "Responde tu primer ejercicio", ok: () => xpTotal() > 0, p: () => [xpTotal() > 0 ? 1 : 0, 1] },
  { id: "primer-objetivo", name: "Objetivo cumplido", desc: "Cumple tu objetivo diario", ok: () => !!rewards().lastGoal, p: () => [rewards().lastGoal ? 1 : 0, 1] },
  { id: "escudo", name: "Escudo ganado", desc: "Cumple el objetivo 7 días seguidos", ok: () => rewards().goalDays >= 7, p: () => [rewards().goalDays || 0, 7] },
  { id: "racha-7", name: "Semana seguida", desc: "7 días de racha", ok: () => streakInfo().days >= 7, p: () => [streakInfo().days, 7] },
  { id: "racha-30", name: "Mes seguido", desc: "30 días de racha", ok: () => streakInfo().days >= 30, p: () => [streakInfo().days, 30] },
  { id: "rango", name: "Nuevo rango", desc: "Sube de rango por primera vez", ok: () => rankInfo(xpTotal()).name !== rankInfo(0).name, p: () => [xpTotal(), RANKS[1][0]] },
  { id: "compra", name: "De compras", desc: "Desbloquea un personaje, un color, un efecto o un marco", ok: () => (rewards().owned || []).length > 0, p: () => [rewards().coins || 0, 150] }
];
function logroOk(l) { try { return !!l.ok(); } catch (e) { return false; } }
function logroProg(l) { try { const [a, b] = l.p(); return [Math.max(0, Math.min(a, b)), b]; } catch (e) { return null; } }
let achOpen = false;
const ACH_VISIBLES = 3;
// Un solo manejador para "Ver todos": la lista se vuelve a pintar y el foco vuelve al botón.
document.addEventListener("click", e => {
  const b = e.target.closest ? e.target.closest(".ach-more") : null;
  if (!b) return;
  achOpen = !achOpen;
  const box = b.closest(".ach-panel");
  if (box) box.outerHTML = logrosHtml();
  const nuevo = document.querySelector(".ach-more");
  if (nuevo) nuevo.focus();
});
// Los seis sellos de la pantalla Sellos (maqueta D4): cada uno es un logro real de la app.
const SELLOS_D4 = [["primer-ejercicio", "semilla"], ["racha-7", "llama"], ["escudo", "check"], ["rango", "montana"], ["racha-30", "calendario"], ["compra", "confeti"]];
export function sellosDatos() {
  const got = rewards().logros || [];
  return SELLOS_D4.map(([id, icono]) => {
    const l = LOGROS.find(x => x.id === id), ok = got.includes(id) || logroOk(l);
    return { id, icono, nombre: l.name, desc: l.desc, ok, pr: ok ? null : logroProg(l) };
  });
}
export function logrosHtml() {
  const got = rewards().logros || [];
  const ganados = LOGROS.filter(l => got.includes(l.id) || logroOk(l)).length;
  const items = LOGROS.map((l, i) => {
    const ok = got.includes(l.id) || logroOk(l), pr = ok ? null : logroProg(l);
    const estado = ok ? `<span class="ach-state">Conseguido</span>` : pr ? `<span class="ach-state">${pr[0]} / ${pr[1]}</span>` : "";
    return `<li class="ach-item${ok ? " ok" : ""}"${i >= ACH_VISIBLES && !achOpen ? " hidden" : ""} style="--i:${LOGROS.indexOf(l)};--c:${(BADGE[l.id] || {}).tone || "#1c7ed6"}" title="${l.desc}">${badgeSvg(l.id, !ok, 44)}<span class="ach-txt"><span class="ach-name">${l.name}</span><span class="ach-desc">${l.desc}</span>${pr ? `<span class="ach-bar" aria-hidden="true"><i style="--p:${(pr[0] / pr[1]).toFixed(3)}"></i></span>` : ""}</span>${estado}</li>`;
  }).join("");
  const mas = LOGROS.length > ACH_VISIBLES ? `<button type="button" class="btn secondary ach-more" aria-expanded="${achOpen}" aria-controls="achGrid">${achOpen ? "Ver menos" : `Ver todos (${LOGROS.length})`}</button>` : "";
  return `<section class="ach-panel" aria-label="Logros"><div class="ach-head"><h3>Logros</h3><span class="ach-count">${ganados} / ${LOGROS.length}</span></div><ul class="ach-grid" id="achGrid">${items}</ul>${mas}${hitosHtml()}</section>`;
}
function hitosHtml() {
  const d = streakInfo().days;
  return `<div class="ach-streak"><span class="ach-streak-lbl">Racha</span>${[7, 14, 30, 60, 100].map(n => `<span class="ach-pill${d >= n ? " ok" : ""}" style="--i:${[7, 14, 30, 60, 100].indexOf(n)};--c:${({ 7: "#f08c00", 14: "#e8590c", 30: "#c2255c", 60: "#7048e8", 100: "#d69a10" })[n]}" title="Racha de ${n} días">${ico("flame", 13)} ${n}</span>`).join("")}</div>`;
}
export function checkLogros() {
  const r = rewards(), got = r.logros || [];
  const nuevos = LOGROS.filter(l => !got.includes(l.id) && logroOk(l));
  if (!nuevos.length) return;
  r.logros = [...got, ...nuevos.map(l => l.id)]; saveRewards(r);
  const box = document.querySelector(".ach-panel");
  if (box) box.outerHTML = logrosHtml();   // se actualiza en vivo, sin esperar a volver a la pantalla principal
  // Varios a la vez (p. ej. al estrenar la función) se muestran en una sola celebración
  const txt = nuevos.map(l => l.name).join(" · ");
  setTimeout(() => celebrate(nuevos.length === 1 ? "¡Logro: " + nuevos[0].name + "!" : `¡${nuevos.length} logros!`, nuevos.length === 1 ? nuevos[0].desc : txt, badgeSvg(nuevos[0].id, false, 72)), 3000);
}
export function advRender() {
  const r = rewards(), res = results[index];
  const locked = answered || !!advUsed[index];
  $("advBar").classList.toggle("hidden", examMode);
  $("advCoins").innerHTML = `${ico("coin", 16)} ${r.coins}`;
  $("skipBtn").innerHTML = `Saltar (${ADV.skip} ${ico("coin", 14)})`;
  $("revealBtn").innerHTML = `Revelar (${ADV.reveal} ${ico("coin", 14)})`;
  $("redoBtn").innerHTML = `Repetir (${ADV.redo} ${ico("coin", 14)})`;
  $("advHint").textContent = locked ? "" : r.coins < ADV.reveal ? `Te faltan ${ADV.reveal - r.coins} monedas para revelar.`
    : r.coins < ADV.skip ? `Te faltan ${ADV.skip - r.coins} monedas para saltar.` : `Saltar cuesta ${ADV.skip} y revelar ${ADV.reveal}.`;
  $("skipBtn").disabled = locked || r.coins < ADV.skip;
  $("revealBtn").disabled = locked || r.coins < ADV.reveal;
  $("redoBtn").classList.toggle("hidden", !(answered && res && !res.correct && !res.revealed && !res.skipped));
  $("redoBtn").disabled = r.coins < ADV.redo;
}
export function advSkip() {
  if (answered || examMode || advUsed[index] || !spendCoins(ADV.skip)) return;
  advUsed[index] = true;
  const it = queue[index];
  results[index] = { correct: false, skipped: true, q: it.q, given: "", correctText: it.options ? it.options[it.answer] : it.accepted[0] };
  answered = true;
  next();
}
export function advReveal() {
  if (answered || examMode || advUsed[index] || !spendCoins(ADV.reveal)) return;
  advUsed[index] = true;
  const it = queue[index], correctText = it.options ? it.options[it.answer] : it.accepted[0];
  answered = true;
  results[index] = { correct: false, revealed: true, q: it.q, given: "", correctText };
  if (it.options) document.querySelectorAll(".option").forEach((b, i) => { b.disabled = true; if (i === it.answer) b.classList.add("correct"); });
  else { $("answerInput").value = correctText; $("answerInput").disabled = true; }
  const fb = $("feedback");
  fb.className = "feedback";
  fb.innerHTML = `La respuesta correcta es <strong>${escHtml(correctText)}</strong>. ${escHtml(it.explain)}`;
  fb.classList.remove("hidden");
  $("checkBtn").classList.add("hidden");
  $("nextBtn").classList.remove("hidden");
  advRender();
}
export function advRedo() {
  const res = results[index];
  if (!answered || !res || res.correct || res.revealed || res.skipped || !spendCoins(ADV.redo)) return;
  renderItem();
}


let lastCoins = null;
function tweenNum(el, from, to) {
  const t0 = performance.now(), dur = 600;
  const step = now => { const k = Math.min(1, (now - t0) / dur); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
// Panel de progreso fijo en escritorio (solo lectura, mismos datos que el inicio)
export function renderDprog() {
  const box = $("dprog"); if (!box) return;
  const xp = xpTotal(), r = rankInfo(xp), s = streakInfo();
  const falta = r.nextMin ? `Faltan ${r.nextMin - xp} XP para ${r.nextName}` : "Rango máximo";
  box.innerHTML = `<div class="dprog-card"><span class="muted">Racha</span><strong>${s.days} ${s.days === 1 ? "día" : "días"}</strong></div>
    <div class="dprog-card"><span class="muted">Rango</span><strong>${r.name}</strong><span class="muted">${xp} XP · ${falta}</span></div>
    <div class="dprog-card"><span class="muted">Monedas</span><strong>${rewards().coins}</strong></div>`;
  document.dispatchEvent(new Event("dprog-liga"));   // la nube añade la tarjeta de liga
}

export function renderHome() {
  renderDprog();
  const rb = $("repasoBox");
  if (rb) {
    const n = srsDue(currentLevel).length;
    rb.innerHTML = n ? `<button class="btn repaso-btn" type="button" id="repasoBtn">Repasar ${n} ${n === 1 ? "fallo pendiente" : "fallos pendientes"} de ${currentLevel}</button>` : `<p class="muted repaso-msg">Sin repasos pendientes en ${currentLevel}. Los fallos vuelven aquí a 1, 3, 7 y 14 días.</p>`;
    if (n) $("repasoBtn").onclick = startReview;
    rb.insertAdjacentHTML("beforeend", `<button class="btn secondary repaso-btn" type="button" id="cortaBtn">Sesión corta · 5 ejercicios</button>`);
    $("cortaBtn").onclick = startCorta;
  }
  $("mascot")?.classList.remove("hidden");
  renderGame();
  $("empezarBtn").onclick = startCorta;
  const nRep = srsDue(currentLevel).length, ac = $("d4Acciones"), cm = $("d4Camino");
  ac.innerHTML = `<h3 class="d4-seccion">Repaso y simulacro</h3><div class="d4-filas">
    <button class="d4-fila" id="repasoRowBtn" type="button"${nRep ? "" : " disabled"}><span class="d4-ico" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24"><use href="#i-repaso"/></svg></span><span><b>Repasar fallos</b><small>${nRep ? nRep + " preguntas que se te resistieron" : "Sin fallos pendientes"}</small></span><span class="d4-chip">${nRep}</span></button>
    <button class="d4-fila" id="simRowBtn" type="button"><span class="d4-ico" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24"><use href="#i-simulacro"/></svg></span><span><b>Simulacro EOI</b><small>Cronómetro por pregunta, sin correcciones</small></span><span class="d4-chip">${examMode ? "Activo" : "Nuevo"}</span></button></div>`;
  if (nRep) $("repasoRowBtn").onclick = startReview;
  $("simRowBtn").onclick = () => { examMode = true; renderHome(); showTab("ejercicios"); };
  const partes = {};
  ITEMS.filter(i => i.level === currentLevel && i.part).forEach(i => {
    const q = partes[i.part] || (partes[i.part] = { n: 0, hechos: 0 });
    q.n++; if (itemHecho(i)) q.hechos++;
  });
  const lista = Object.entries(partes);
  cm.innerHTML = lista.length ? `<h3 class="d4-seccion">Tu camino</h3><div class="d4-filas">${lista.slice(0, 1).map(([p, q], i) => `<button class="d4-fila" type="button" data-part="${escHtml(p)}"><span class="d4-n" aria-hidden="true">${i + 1}</span><span><b>${escHtml(p.replace(/\s*\(.*$/, ""))}</b></span><span class="d4-chip">${Math.round(q.hechos / q.n * 100)}%</span></button>`).join("")}</div>` : "";
  cm.querySelectorAll("[data-part]").forEach(b => b.onclick = () => previaParte(b.dataset.part));
  const cn = document.querySelector(".st-coin .st-num");
  if (cn) { const c = rewards().coins; if (lastCoins !== null && c > lastCoins && !matchMedia("(prefers-reduced-motion: reduce)").matches) tweenNum(cn, lastCoins, c); lastCoins = c; }
  const lv = LEVELS[currentLevel];

  $("modeToggle").setAttribute("aria-pressed", examMode ? "true" : "false");
  $("modeToggle").textContent = examMode ? "Activado" : "Desactivado";
  $("secSel").value = String(secPerQ);

  const grid = $("sectionGrid");
  grid.innerHTML = "";
  Object.entries(SECTIONS).forEach(([key, s]) => {
    const count = ITEMS.filter(i => i.level === currentLevel && i.type === key).length;
    if (count === 0) return; // sin ejercicios en este nivel: no se muestra
    const b = document.createElement("button");
    b.className = "section-btn";
    b.style.setProperty("--sec-color", s.color);
    b.style.setProperty("--sec-soft", s.soft);
    b.innerHTML = `<div class="ico" style="color:${s.color}">${secIcon(key)}</div><strong>${s.name}</strong><span>${s.desc} · ${count} ejercicio${count===1?"":"s"}</span>`;
    b.disabled = count === 0;
    b.onclick = () => previaSeccion(key);
    grid.appendChild(b);
  });

  const pg = $("partGrid");
  const pc = levelColor(currentLevel);
  const parts = {};
  ITEMS.filter(i => i.level === currentLevel && i.part).forEach(i => { parts[i.part] = (parts[i.part] || 0) + 1; });
  pg.innerHTML = "";
  const OFICIAL = /^(Movers|KET|PET|FCE|CAE|CPE|EOI|TOEFL)\b/;
  const orden = Object.entries(parts).sort((a, b) => (OFICIAL.test(b[0]) ? 1 : 0) - (OFICIAL.test(a[0]) ? 1 : 0));
  let grupo = null;
  orden.forEach(([p, n]) => {
    const esOf = OFICIAL.test(p);
    if (esOf !== grupo) {
      grupo = esOf;
      const h = document.createElement("div");
      h.className = "part-group";
      h.innerHTML = esOf ? "Estructura oficial del examen <span>Formato real de la prueba</span>" : "Complementarios <span>Para afianzar lo visto</span>";
      pg.appendChild(h);
    }
    const b = document.createElement("button");
    b.className = "section-btn";
    b.style.setProperty("--sec-color", pc);
    b.style.setProperty("--sec-soft", `color-mix(in srgb, ${pc} 16%, var(--surface))`);
    const k = p.indexOf("(");
    b.innerHTML = `<div class="ico" style="color:${pc}">${partIcon(p)}</div><strong>${k > 0 ? p.slice(0, k) : p.replace(/^Complementario · /, "")}</strong><span>${k > 0 ? p.slice(k) : ""} · ${n} ejercicio${n === 1 ? "" : "s"}</span>`;
    b.onclick = () => previaParte(p);
    pg.appendChild(b);
  });
  if (!Object.keys(parts).length) pg.innerHTML = '<p class="muted">Este nivel no tiene partes separadas.</p>';

  const exams = $("examGrid");
  exams.innerHTML = "";
  EXAMS.forEach(e => {
    const a = document.createElement("a");
    a.className = "exam";
    a.href = e.url; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `
      <div class="exam-head">
        <span class="flag">${e.flag}</span>
      </div>
      <div><strong>${e.name}</strong><span class="levels">${e.levels}</span></div>
      <small>Web oficial →</small>`;
    exams.appendChild(a);
  });
  show("home");
}

$("modeToggle").onclick = () => { examMode = !examMode; renderHome(); };
window.addEventListener("DOMContentLoaded", () => {
$("pExport").onclick = () => {
  const data = {}; for (let i = 0; i < appStore.length; i++) { const k = appStore.key(i); data[k] = appStore.getItem(k); }
  const url = URL.createObjectURL(new Blob([JSON.stringify({ app: "diseno-B-cockpit", v: 1, data }, null, 2)], { type: "application/json" }));
  const a = document.createElement("a"); a.href = url; a.download = "progreso-ingles.json"; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
// Copia automática: una vez por semana se guarda una copia de todo el navegador (sin las copias anteriores)
function copiaAutomatica() {
  try {
    const hoy = dayKey(new Date()), ult = RAW_LS.getItem("copia-auto-fecha");
    if (ult && Date.now() - new Date(ult + "T12:00").getTime() < 7 * 86400000) return;
    const data = {};
    for (let i = 0; i < RAW_LS.length; i++) { const k = RAW_LS.key(i); if (!k.startsWith("copia-auto")) data[k] = RAW_LS.getItem(k); }
    RAW_LS.setItem("copia-auto", JSON.stringify({ app: "diseno-B-cockpit", v: 1, fecha: hoy, data }));
    RAW_LS.setItem("copia-auto-fecha", hoy);
  } catch (e) {}
}
copiaAutomatica();
$("pAutoDl").onclick = () => {
  const j = RAW_LS.getItem("copia-auto"); if (!j) return;
  const url = URL.createObjectURL(new Blob([j], { type: "application/json" }));
  const a = document.createElement("a"); a.href = url; a.download = "copia-automatica-" + (RAW_LS.getItem("copia-auto-fecha") || "") + ".json"; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$("pImport").onclick = () => $("pImportFile").click();
$("pImportFile").onchange = async e => {
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  try {
    importarCopia(await f.text());
    location.reload();
  } catch (err) {
    $("profHintTxt").textContent = "Ese archivo no es un progreso válido.";
    $("profHint").classList.remove("hidden");
  }
};
});

$("secSel").onchange = e => { secPerQ = parseInt(e.target.value, 10); };

/* ============================================================
   EJERCICIO
   ============================================================ */
// Qué es cada tipo de práctica, en lenguaje sencillo (se muestra antes de empezar)
const PREVIA_TEXTO = {
  grammar: "Frases con un hueco o con una forma incorrecta. Eliges la opción correcta y, si fallas, ves la regla.",
  reading: "Un texto corto y preguntas sobre lo que dice. Practicas entender sin traducir palabra por palabra.",
  listening: "Escuchas un audio de la app y respondes. Entrena el oído para entender a velocidad real.",
  rephrase: "Reescribes una frase con otras palabras manteniendo el sentido. Vale cualquier respuesta correcta.",
  usage: "Transformas o formas palabras (prefijos, sufijos, tiempos) para completar frases.",
  writing: "Redactas un texto corto con criterios de examen: ideas, organización y lenguaje.",
  speaking: "Preparas un monólogo con tiempo limitado, como en la parte oral del examen."
};
function previaMostrar(o) {
  const box = $("previa"), n = o.items.length, tipos = {};
  o.items.forEach(i => { tipos[i.type] = (tipos[i.type] || 0) + 1; });
  const lista = Object.entries(tipos).map(([k, c]) => `${SECTIONS[k] ? SECTIONS[k].name : k} (${c})`).join(" · ");
  const ej = o.items.find(i => typeof i.q === "string" && i.q.length < 160 && !i.audio);
  box.innerHTML = `<p class="etiq" style="margin:0">Nivel ${escHtml(currentLevel)} · ${n} ejercicio${n === 1 ? "" : "s"}</p>
    <h2 class="section-title" style="margin:6px 0">${escHtml(o.titulo)}</h2>
    <p style="margin:0 0 6px">${escHtml(o.texto)}</p>
    <p class="muted" style="margin:0 0 12px;font-size:var(--fs-sm)">Incluye: ${escHtml(lista)}</p>
    ${ej ? `<div class="previa-ej"><span class="etiq">Ejemplo</span><p style="margin:4px 0 0">${escHtml(ej.q)}</p>${ej.options ? `<ul class="previa-op">${ej.options.map(x => `<li>${escHtml(x)}</li>`).join("")}</ul>` : ""}</div>` : ""}
    <div class="actions" style="margin-top:14px"><button class="btn secondary" id="previaVolver" type="button">Volver</button><button class="btn" id="previaEmpezar" type="button">Empezar</button></div>`;
  box.hidden = false; box.scrollIntoView({ block: "start" });
  $("previaVolver").onclick = () => { box.hidden = true; };
  $("previaEmpezar").onclick = () => { box.hidden = true; o.onStart(); };
}
function previaSeccion(key) {
  const items = ITEMS.filter(i => i.level === currentLevel && i.type === key);
  previaMostrar({ titulo: SECTIONS[key].name, texto: PREVIA_TEXTO[key] || SECTIONS[key].desc, items, onStart: () => startSection(key) });
}
function previaParte(p) {
  const items = ITEMS.filter(i => i.level === currentLevel && i.part === p);
  if (!items.length) return;
  previaMostrar({ titulo: p.replace(/\s*\(.*$/, ""), texto: "Ejercicios de esta parte del nivel, en orden aleatorio. Cada respuesta se corrige al momento.", items, onStart: () => startPart(p) });
}
function startSection(type) {
  currentSection = type;
  runQueue(shuffle(ITEMS.filter(i => i.level === currentLevel && i.type === type)));
}
function startReview() {
  const byKey = {};
  ITEMS.forEach(i => { if (i.level === currentLevel) byKey[i.level + "|" + i.q] = i; });
  const items = srsDue(currentLevel).map(k => byKey[k]).filter(Boolean);
  if (!items.length) return;
  currentSection = "repaso";
  runQueue(shuffleArr(items));
}
function startCorta() {
  const pool = ITEMS.filter(i => i.level === currentLevel);
  if (pool.length < 5) return;
  window.scrollTo(0, 0);
  currentSection = "corta";
  runQueue(shuffleArr(pool).slice(0, 5));
}
function startPart(part) {
  const items = ITEMS.filter(i => i.level === currentLevel && i.part === part);
  currentSection = items[0].type;
  runQueue(shuffle(items));
}
export let lastItems = [];   // lista exacta (mismo orden) para "Repetir"
export function runQueue(items) {
  lastItems = items.slice();
  queue = items; index = 0; results = []; advUsed = {}; sessXp = 0;
  show("exercise");
  if (examMode) {
    timeLeft = queue.length * secPerQ;
    $("timer").classList.remove("hidden");
    startTimer();
  } else {
    stopTimer();
    $("timer").classList.add("hidden");
  }
  renderItem();
}

function startTimer() {
  stopTimer();
  updateTimer();
  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) { stopTimer(); finish(true); }
  }, 1000);
}
export function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
function updateTimer() {
  const m = Math.floor(timeLeft / 60), s = String(timeLeft % 60).padStart(2, "0");
  const el = $("timer");
  el.innerHTML = `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-cronometro"/></svg> ${m}:${s}`;
  el.classList.toggle("low", timeLeft <= 30);
}

export function renderItem() {
  if (fmt && fmt.timer) clearInterval(fmt.timer);
  answered = false; selectedOption = null;
  mascotMount();
  $("mascot")?.classList.toggle("hidden", examMode);
  const item = queue[index];
  const s = SECTIONS[currentSection] || { name: "Repaso" };
  const lv = LEVELS[currentLevel];
  $("exercise").style.setProperty("--lvl-color", lc(lv));
  $("pillLevel").textContent = currentLevel;
  $("secName").textContent = s.name + (examMode ? " · Examen" : "");
  $("counter").textContent = `${index+1} / ${queue.length}`;
  $("bar").style.width = `${(index / queue.length) * 100}%`;

  const pass = $("passage");
  if (item.passage) { pass.textContent = item.passage; pass.classList.remove("hidden"); }
  else pass.classList.add("hidden");
  $("lecturaBtn").classList.toggle("hidden", !item.passage);

  if (item.audio) {
    $("audioBar").classList.remove("hidden");
    $("audioStatus").textContent = "";
    const ACC = { "en-GB": "británico", "en-US": "estadounidense", "en-AU": "australiano", "en-IN": "indio", "en-IE": "irlandés" };
    const spd = item.rate < 0.85 ? "habla lenta" : item.rate > 1.05 ? "habla rápida" : "velocidad normal";
    const kind = item.inference ? "Hay que deducir la respuesta del contexto" : "La respuesta está dicha explícitamente";
    $("audioInfo").textContent = `Acento ${ACC[item.accent] || "británico"} · ${spd} · ${kind}`;
    setPlayLabel("▶ Escuchar");
    $("playBtn").onclick = () => togglePlay(item);
    $("slowBtn").textContent = SPEED_LBL[speedIdx];
    $("slowBtn").onclick = () => {
      speedIdx = (speedIdx + 1) % SPEEDS.length;
      $("slowBtn").textContent = SPEED_LBL[speedIdx];
      if (userEl) userEl.playbackRate = SPEEDS[speedIdx];
      if ("speechSynthesis" in window && (speechSynthesis.speaking || speechSynthesis.paused)) speak(item.audio, item);
    };
    $("txBtn").textContent = "Transcripción";
    $("transcript").textContent = item.audio;
    $("transcript").classList.add("hidden");
    $("txBtn").onclick = () => {
      const t = $("transcript"), hidden = t.classList.toggle("hidden");
      $("txBtn").textContent = hidden ? "Transcripción" : "Ocultar transcripción";
    };
  } else { $("audioBar").classList.add("hidden"); $("audioInfo").textContent = ""; $("transcript").classList.add("hidden"); }
  $("prevBtn").classList.toggle("hidden", examMode || index === 0);
  $("prevBtn").onclick = () => { if (index > 0) { index--; renderItem(); } };

  $("question").textContent = item.q;
  const hint = $("hintText");
  if (item.hint && !item.options) { hint.textContent = item.hint; hint.classList.remove("hidden"); }
  else hint.classList.add("hidden");

  const opts = $("options"), inputWrap = $("inputWrap");
  opts.innerHTML = "";
  if (item.format) {
    renderFormat(item, opts, inputWrap);
  } else if (item.options) {
    opts.classList.remove("hidden"); inputWrap.classList.add("hidden");
    item.options.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "option";
      b.innerHTML = `<span class="letter">${String.fromCharCode(65+i)}</span><span>${escHtml(o)}</span>`;
      b.onclick = () => selectOption(i, b);
      opts.appendChild(b);
    });
  } else {
    opts.classList.add("hidden"); inputWrap.classList.remove("hidden");
    const inp = $("answerInput");
    inp.value = ""; inp.disabled = false;
    inp.placeholder = "Escribe tu respuesta";
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
    setTimeout(() => inp.focus(), 50);
  }

  $("feedback").classList.add("hidden");
  $("checkBtn").textContent = examMode ? "Confirmar →" : "Comprobar";
  $("checkBtn").classList.remove("hidden"); $("checkBtn").disabled = false;
  $("checkBtn").onclick = check;
  $("nextBtn").classList.add("hidden");
  $("nextBtn").textContent = index === queue.length - 1 ? "Ver resultado" : "Siguiente →";
  $("nextBtn").onclick = next;

  if (item.audio) speak(item.audio, item);
  advRender();
}

function selectOption(i, btn) {
  if (answered) return;
  selectedOption = i;
  document.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}


// Practicar (barra inferior) empieza una sesión corta; la lista de tipos, partes y niveles se abre desde Inicio
setPracticarAccion(() => showTab("ejercicios"));   // la barra abre la lista con la explicación de cada práctica
