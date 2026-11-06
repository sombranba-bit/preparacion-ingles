import {
  $,
  ITEMS,
  SECTIONS,
  appStore,
  levelColor,
  medalSvg,
  renderLevels,
  renderTabs,
} from "./01-nucleo-niveles-audio.js";
import { DAILY_GOAL, DAILY_KEY, dayKey, daysAgo, lsGet, lsSet } from "./02-progreso-xp-racha-mascota.js";
import { activeProfile, escHtml } from "./03-perfiles.js";
import { renderHome } from "./04-recompensas-logros-copia-auto.js";
import { loadCustom } from "./05-formatos-pdf-restaurar-copia.js";

/* Acento y velocidad por nivel: los ítems antiguos los reparten de forma automática */
{
  const RATE = { A1: 0.78, A2: 0.86, B1: 0.95, B2: 1.0, C1: 1.06, C2: 1.12 };
  const ALL = ["en-GB", "en-US", "en-AU", "en-IN", "en-IE"];
  const ACCENTS = { A1: ALL, A2: ALL, B1: ALL, B2: ALL, C1: ALL, C2: ALL };
  const INFER = /suggest|impl|attitude|feel|why|mean|probabl|opinion|concern|prefer|infer|regret|doubt|sceptic|likely|surpris|think|sound|view/i;
  const cnt = {};
  ITEMS.forEach(i => {
    if (i.type !== "listening") return;
    const L = i.level; cnt[L] = (cnt[L] || 0) + 1;
    if (!i.accent) i.accent = ACCENTS[L][cnt[L] % ACCENTS[L].length];
    if (!i.rate) i.rate = RATE[L];
    if (i.inference === undefined) i.inference = INFER.test(i.q);
  });
}
export function loadHist() {
  try { return JSON.parse(appStore.getItem("historial-ingles") || "[]"); } catch (e) { return []; }
}
const LIGA_KEY = "liga-amigos";
export function weekStartKey() { const d = new Date(), dow = (d.getDay() + 6) % 7; return dayKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow)); }
export function weekXp() { const d = lsGet(DAILY_KEY, {}), dow = (new Date().getDay() + 6) % 7; let s = 0; for (let n = 0; n <= dow; n++) s += d[daysAgo(n)] || 0; return s; }
function myName() { return (activeProfile() || {}).name || "Tú"; }
function renderXpSemana() {
  const el = $("xpSemana"); if (!el) return;
  const d = lsGet(DAILY_KEY, {}), dias = [];
  for (let n = 6; n >= 0; n--) { const k = daysAgo(n); dias.push({ xp: d[k] || 0, lbl: new Date(k + "T12:00").toLocaleDateString("es-ES", { weekday: "short" }) }); }
  const max = Math.max(DAILY_GOAL, ...dias.map(x => x.xp)), total = dias.reduce((a, x) => a + x.xp, 0);
  el.innerHTML = `<h3 class="xs-tit">XP de los últimos 7 días <span class="muted small">· ${total} XP</span></h3><div class="xs-bars">${dias.map(x => `<div class="xs-col"><span class="xs-val">${x.xp}</span><div class="xs-bar" style="height:${Math.max(4, Math.round(x.xp / max * 100))}%"></div><span class="xs-lbl">${x.lbl}</span></div>`).join("")}</div><p class="muted small" style="margin:8px 0 0">Objetivo diario: ${DAILY_GOAL} XP</p>`;
}
function renderLiga() {
  renderXpSemana();
  const wk = weekStartKey();
  const rows = [{ name: myName(), xp: weekXp(), me: true }].concat(lsGet(LIGA_KEY, []).filter(x => x.week === wk).map(x => ({ name: x.name, xp: x.xp })));
  rows.sort((a, b) => b.xp - a.xp);
  const box = $("ligaBox"), prevTop = {};
  [...box.children].forEach(el => { if (el.dataset.n) prevTop[el.dataset.n] = el.getBoundingClientRect().top; });
  box.innerHTML = rows.map((r, i) => `<div class="liga-row${r.me ? " liga-me" : ""}" data-n="${escHtml(r.name)}"><span class="pos">${i + 1}º</span><span>${escHtml(r.name)}${r.me ? " (tú)" : ""}</span><strong>${r.xp} XP</strong></div>`).join("")
    + (rows.length === 1 ? '<p class="muted" style="margin:10px 0 0">Aún no hay amigos esta semana.</p>' : "");
  [...box.children].forEach(el => {
    const p0 = prevTop[el.dataset.n];
    if (p0 === undefined) return;
    const dy = p0 - el.getBoundingClientRect().top;
    if (dy && !matchMedia("(prefers-reduced-motion: reduce)").matches) el.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }], { duration: 450, easing: "cubic-bezier(.2,.7,.2,1)" });
  });
}
$("ligaShare").onclick = () => {
  const name = myName();
  const blob = new Blob([JSON.stringify({ app: "preparacion-ingles-liga", version: 1, name, week: weekStartKey(), xp: weekXp() }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "liga-semana-" + name.replace(/\W+/g, "-") + ".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  $("ligaStatus").textContent = "Archivo descargado. Envíaselo a tus amigos para que lo añadan.";
};
$("ligaFile").onchange = async e => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const o = JSON.parse(await f.text());
    if (o.app !== "preparacion-ingles-liga" || typeof o.name !== "string" || !o.name.trim() || typeof o.week !== "string" || typeof o.xp !== "number") throw new Error("formato");
    const name = o.name.trim().slice(0, 40);
    if (o.week !== weekStartKey()) throw new Error("otra semana");
    lsSet(LIGA_KEY, lsGet(LIGA_KEY, []).filter(x => x.name !== name).concat([{ name, week: o.week, xp: Math.max(0, Math.round(o.xp)) }]));
    $("ligaStatus").textContent = `Añadido: ${name}.`;
    renderLiga();
  } catch (err) { $("ligaStatus").textContent = "Ese archivo no es una semana de liga válida de esta semana."; }
  e.target.value = "";
};

export function renderRanking() {
  document.dispatchEvent(new Event("ranking-ver"));
  renderLiga();
  const f = $("rankLevel").value;
  const all = loadHist().filter(h => f === "todos" || h.lv === f);
  const box = $("rankBox");
  if (!all.length) { box.innerHTML = '<p class="muted">Todavía no hay resultados. Termina un ejercicio y aparecerá aquí tu ranking personal.</p>'; return; }
  const sorted = [...all].sort((a, b) => b.pct - a.pct || b.date - a.date);
  const medal = [medalSvg(1), medalSvg(2), medalSvg(3)], cls = ["gold", "silver", "bronze"];
  const name = h => (SECTIONS[h.sec] ? SECTIONS[h.sec].name : h.sec === "repaso" ? "Repaso" : "") + (h.exam ? " · Examen" : "");
  const podium = sorted.slice(0, 3).map((h, i) =>
    `<div class="rank-card ${cls[i]}"><div class="medal">${medal[i]}</div><span class="rk-lv" style="background:${levelColor(h.lv)}">${h.lv}</span><strong>${name(h)}</strong><div class="rk-pct">${h.pct}%</div><span class="muted">${h.score}/${h.total} · ${new Date(h.date).toLocaleDateString("es-ES")}</span></div>`).join("");
  const rest = sorted.slice(3, 20).map((h, i) =>
    `<div class="rank-row"><span class="pos">${i + 4}º</span><span class="rk-lv" style="background:${levelColor(h.lv)}">${h.lv}</span><span>${name(h)}</span><span class="rk-bar"><i style="width:${h.pct}%"></i></span><strong>${h.pct}%</strong></div>`).join("");
  const avg = Math.round(all.reduce((s, h) => s + h.pct, 0) / all.length);
  box.innerHTML = `<div class="rank-stats"><div><strong>${all.length}</strong><span>intentos</span></div><div><strong>${avg}%</strong><span>media</span></div><div><strong>${sorted[0].pct}%</strong><span>mejor</span></div></div>` +
    `<div class="podium">${podium}</div>` + (rest ? `<h2 class="section-title">Resto de intentos</h2>${rest}` : "");
}
$("rankLevel").onchange = renderRanking;


loadCustom();
renderLevels();
renderTabs();
renderHome();
