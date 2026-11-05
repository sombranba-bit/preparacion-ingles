import { $, LEVELS, appStore, currentLevel, ico } from "./01-nucleo-niveles-audio.js";
import { activeProfile, avatarSvg, escHtml } from "./03-perfiles.js";
import {
  ADV,
  addCoins,
  examMode,
  logrosHtml,
  rewards,
  saveRewards,
} from "./04-recompensas-logros-copia-auto.js";
import { nrm } from "./05-formatos-pdf-restaurar-copia.js";

/* ---------- Progreso: XP, rangos, racha, objetivo diario y mascota (solo en este navegador) ---------- */
export const LV_PTS = { A1: 10, A2: 12, B1: 15, B2: 18, C1: 22, C2: 25 };
export const RANKS = [[0, "Novato"], [100, "Aprendiz"], [300, "Intermedio"], [700, "Avanzado"], [1200, "Experto"], [2000, "Maestro"], [3000, "Bilingüe"], [4500, "Nativo"]];
export const DAILY_GOAL = 30;
const XP_KEY = "xp-ganados", STREAK_KEY = "racha-ingles", DAILY_KEY = "xp-diario";
export const dayKey = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
export const daysAgo = n => dayKey(new Date(Date.now() - n * 86400000));
export function lsGet(k, def) { try { const v = JSON.parse(appStore.getItem(k)); return v ?? def; } catch (e) { return def; } }
export function lsSet(k, v) { try { appStore.setItem(k, JSON.stringify(v)); } catch (e) {} }

/* Cada pregunta suma XP solo la primera vez que se acierta; también se anota el día para el objetivo y la comparativa */
export function addXp(key, pts) {
  const g = lsGet(XP_KEY, {});
  if (key in g) return;
  g[key] = pts;
  lsSet(XP_KEY, g);
  addCoins(1);
  const d = lsGet(DAILY_KEY, {}), t = dayKey(new Date());
  d[t] = (d[t] || 0) + pts;
  lsSet(DAILY_KEY, d);
}
export function itemHecho(it) { return (it.level + "|" + it.q) in lsGet(XP_KEY, {}); }   // acertado al menos una vez
export function xpTotal() { return Object.values(lsGet(XP_KEY, {})).reduce((a, b) => a + b, 0); }
function xpBetween(fromDays, toDays) {   // XP de los días entre hace fromDays y hace toDays (incluidos)
  const d = lsGet(DAILY_KEY, {}); let sum = 0;
  for (let n = toDays; n <= fromDays; n++) sum += d[daysAgo(n)] || 0;
  return sum;
}
export function rankInfo(xp) {
  let idx = 0;
  RANKS.forEach((r, i) => { if (xp >= r[0]) idx = i; });
  const nxt = RANKS[idx + 1];
  return { name: RANKS[idx][1], min: RANKS[idx][0], nextMin: nxt ? nxt[0] : null, nextName: nxt ? nxt[1] : null };
}

/* Racha: cualquier actividad cuenta. El escudo (uno por año) evita perder la racha si un día no se practica. Sin castigos. */
function freezeAvailable(st) { return st.freezeYear !== new Date().getFullYear(); }
export function touchStreak() {
  const today = dayKey(new Date()), st = lsGet(STREAK_KEY, { last: "", count: 0 });
  if (st.last === today) return;
  if (st.last === daysAgo(1)) st.count += 1;
  else if (st.last === daysAgo(2) && freezeAvailable(st)) { st.count += 1; st.freezeYear = new Date().getFullYear(); }
  else if (st.last === daysAgo(2) && rewards().shields > 0) { const r = rewards(); r.shields -= 1; saveRewards(r); st.count += 1; }
  else st.count = 1;
  st.last = today;
  lsSet(STREAK_KEY, st);
}
const STAT_TXT = {
  streak: () => { const s = streakInfo(), g = rewards().goalDays % 7; return s.days ? `${s.days === 1 ? "1 día seguido" : s.days + " días seguidos"}. Próximo escudo en ${7 - g} ${7 - g === 1 ? "día" : "días"} con objetivo cumplido.` : "Haz un ejercicio hoy para empezar una racha."; },
  shield: () => { const s = streakInfo(), n = (s.freezeLeft ? 1 : 0) + rewards().shields; return `Tienes ${n}. Un escudo protege tu racha un día si fallas. Máximo 2 guardados; ganas uno cada 7 días con objetivo cumplido.`; },
  coin: () => `Tienes ${rewards().coins}. Ganas 1 por cada ejercicio nuevo bien resuelto y 5 al cumplir el objetivo diario. Saltar cuesta ${ADV.skip} y revelar ${ADV.reveal}.`
};
// Bocadillo con la explicación de cada casilla de racha, escudos y monedas
function hideStatPop() { const p = $("statPop"); if (p) { p.hidden = true; p.dataset.k = ""; } }
function showStatDetail(t) {
  let pop = $("statPop");
  if (!pop) { pop = document.createElement("div"); pop.id = "statPop"; pop.setAttribute("role", "tooltip"); document.body.appendChild(pop); }
  pop.textContent = STAT_TXT[t.dataset.k]();
  pop.dataset.k = t.dataset.k; pop.hidden = false;
  const r = t.getBoundingClientRect(), w = pop.offsetWidth;
  const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 8));
  pop.style.left = left + "px"; pop.style.top = (r.bottom + 10) + "px";
  pop.style.setProperty("--ax", (r.left + r.width / 2 - left - 6) + "px");
}
// Al pasar el ratón por una casilla se abre; al salir se cierra. Pulsar también la abre.
document.addEventListener("mouseover", e => { const t = e.target.closest("#gamePanel .stat"); if (t) showStatDetail(t); });
document.addEventListener("mouseout", e => { const t = e.target.closest("#gamePanel .stat"); if (t && !t.contains(e.relatedTarget)) hideStatPop(); });
document.addEventListener("click", e => { const t = e.target.closest("#gamePanel .stat"); if (t) showStatDetail(t); else if (!e.target.closest("#statPop")) hideStatPop(); });
window.addEventListener("scroll", hideStatPop, { passive: true });
export function streakInfo() {
  const st = lsGet(STREAK_KEY, { last: "", count: 0 });
  const canFreeze = st.last === daysAgo(2) && (freezeAvailable(st) || rewards().shields > 0);
  const alive = st.last === daysAgo(0) || st.last === daysAgo(1) || canFreeze;
  return { days: alive ? st.count : 0, canFreeze, last: st.last, freezeLeft: freezeAvailable(st) };
}
function daysSinceLast() {
  const st = lsGet(STREAK_KEY, { last: "" });
  if (!st.last) return null;
  return Math.round((new Date(dayKey(new Date())) - new Date(st.last)) / 86400000);
}

/* Repaso espaciado: un fallo vuelve en 1 día; cada acierto en el repaso alarga el intervalo (3, 7 y 14 días) hasta dominarlo */
const SRS_KEY = "repaso-ingles", SRS_STEPS = [1, 3, 7, 14];
const daysFrom = n => dayKey(new Date(Date.now() + n * 86400000));
export function srsRecord(key, ok) {
  const g = lsGet(SRS_KEY, {}), e = g[key];
  if (!ok) g[key] = { box: 0, due: daysFrom(SRS_STEPS[0]) };
  else if (e && e.due <= dayKey(new Date())) {
    e.box++;
    if (e.box >= SRS_STEPS.length) delete g[key];
    else e.due = daysFrom(SRS_STEPS[e.box]);
  } else return;
  lsSet(SRS_KEY, g);
}
export function srsDue(level) {
  const g = lsGet(SRS_KEY, {}), today = dayKey(new Date());
  return Object.keys(g).filter(k => k.startsWith(level + "|") && g[k].due <= today);
}

/* Reconocimiento de voz (Chrome, Edge, Safari). Sin soporte, la práctica oral sigue con autoevaluación */
export const SR_CLASS = window.SpeechRecognition || window.webkitSpeechRecognition || null;
export function listenStart(onDone) {
  if (!SR_CLASS) return null;
  const rec = new SR_CLASS(); let text = "";
  rec.lang = "en-GB"; rec.continuous = true; rec.interimResults = false;
  rec.onresult = e => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) text += " " + e.results[i][0].transcript; };
  rec.onerror = () => {};
  rec.onend = () => onDone(text.trim());
  try { rec.start(); return rec; } catch (e) { return null; }
}
// Porcentaje de palabras de la frase original que aparecen en orden en lo dicho
export function repeatScore(ref, said) {
  const a = nrm(ref).split(" "), b = nrm(said).split(" ").filter(Boolean);
  if (!b.length || !a.length) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return Math.round(dp[a.length][b.length] / a.length * 100);
}
export function speechMetrics(said, secs) {
  const words = nrm(said).split(" ").filter(Boolean);
  return { said, words: words.length, wpm: secs ? Math.round(words.length / secs * 60) : 0, fillers: words.filter(w => ["uh", "um", "er", "erm"].includes(w)).length };
}
export function speakExtra(m) {
  return m.score !== undefined ? `Coincidencia con la frase: ${m.score}%` : `Palabras: ${m.words} · ${m.wpm} por minuto · muletillas: ${m.fillers}`;
}

/* Conectores para la redacción: solo orientativo, la autoevaluación sigue siendo la referencia */
const CONNECTORS = ["however", "moreover", "furthermore", "therefore", "because", "although", "in addition", "on the other hand", "for example", "for instance", "finally", "firstly", "secondly", "as a result", "in conclusion", "such as", "whereas"];
export function essayExtra(txt) {
  const paras = txt.split(/\n+/).filter(p => p.trim()).length;
  const conn = CONNECTORS.filter(c => new RegExp("\\b" + c + "\\b", "i").test(txt)).length;
  return `Párrafos: ${paras}. Conectores distintos: ${conn}${conn < 3 ? " (intenta usar al menos 3)" : ""}.`;
}

export function todayXp() { return lsGet(DAILY_KEY, {})[dayKey(new Date())] || 0; }
function dailyDone() { return todayXp() >= DAILY_GOAL; }

function cardClockTxt() {
  const d = new Date();
  const fecha = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const hora = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return `${fecha.charAt(0).toUpperCase()}${fecha.slice(1)} · ${hora}`;
}
setInterval(() => { const c = $("clockTxt"); if (c) c.textContent = cardClockTxt(); }, 15000);
export function infoSellosHtml() {
  const xp = xpTotal(), r = rankInfo(xp), s = streakInfo();
  const pct = r.nextMin ? Math.min(100, Math.round((xp - r.min) / (r.nextMin - r.min) * 100)) : 100;
  const rankTxt = r.nextMin ? `Faltan ${r.nextMin - xp} XP para ${r.nextName}` : "Has alcanzado el rango máximo";
  const thisWeek = xpBetween(6, 0), lastWeek = xpBetween(13, 7);
  const weekTxt = thisWeek === 0 && lastWeek === 0 ? "Aún no hay actividad esta semana."
    : lastWeek === 0 ? `Esta semana: ${thisWeek} XP`
    : thisWeek > lastWeek ? `Esta semana: ${thisWeek} XP, ¡más que la pasada (${lastWeek})!`
    : `Esta semana: ${thisWeek} XP · la semana pasada: ${lastWeek} XP`;
  const TIPS = ["Lee la explicación de cada fallo antes de seguir.", "Diez minutos al día rinden más que dos horas el fin de semana.", "Repite en voz alta lo que escuchas: entrena pronunciación y comprensión a la vez.", "Revisa los errores de ayer antes de empezar algo nuevo.", "Escuchar sin mirar el texto es el mejor examen para tu oído."];
  return `<div class="d4-rango card">
      <p class="muted small" id="clockTxt">${cardClockTxt()}</p>
      <div class="gp-head"><span>Rango <strong>${r.name}</strong> · ${xp} XP</span><span class="muted">${rankTxt}</span></div>
      <div class="xp-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Progreso hacia el siguiente rango"><div class="xp-fill" style="width:${pct}%"></div></div>
    </div>`;
}
export function renderGame() {
  const el = $("gamePanel");
  if (!el) return;
  const xp = xpTotal(), r = rankInfo(xp), s = streakInfo();
  const pct = r.nextMin ? Math.min(100, Math.round((xp - r.min) / (r.nextMin - r.min) * 100)) : 100;
  const rankTxt = r.nextMin ? `Faltan ${r.nextMin - xp} XP para ${r.nextName}` : "Has alcanzado el rango máximo";
  const today = todayXp(), goalPct = Math.min(100, Math.round(today / DAILY_GOAL * 100));
  const thisWeek = xpBetween(6, 0), lastWeek = xpBetween(13, 7);
  const weekTxt = thisWeek === 0 && lastWeek === 0 ? "Aún no hay actividad esta semana."
    : lastWeek === 0 ? `Esta semana: ${thisWeek} XP`
    : thisWeek > lastWeek ? `Esta semana: ${thisWeek} XP, ¡más que la pasada (${lastWeek})!`
    : `Esta semana: ${thisWeek} XP · la semana pasada: ${lastWeek} XP`;
  const ap = null;
  const pName = escHtml((activeProfile() || {}).name || ""), hi = pName ? `, ${pName}` : "";
  const dAway = daysSinceLast(), left = Math.max(0, DAILY_GOAL - today);
  let heroMain;
  if (xp === 0 && s.days === 0) heroMain = `¡Bienvenido${hi}! Haz un ejercicio hoy para abrir tu primera racha.`;
  else if (dailyDone()) heroMain = `¡Objetivo de hoy cumplido${hi}! Mañana sigue la racha.`;
  else if (dAway !== null && dAway >= 3) heroMain = `Hace ${dAway} días que no practicas. Un ejercicio corto te devuelve al ritmo.`;
  else if (r.nextMin && r.nextMin - xp <= 50) heroMain = `Te faltan ${r.nextMin - xp} XP para ser ${r.nextName}. Estás muy cerca.`;
  else if (s.days > 0) heroMain = `${pName ? pName + ", l" : "L"}levas ${s.days === 1 ? "1 día seguido" : s.days + " días seguidos"}. Te faltan ${left} XP para el objetivo de hoy.`;
  else heroMain = `Haz un ejercicio hoy${hi} para empezar una racha.`;
  const TIPS = ["Lee la explicación de cada fallo antes de seguir.", "Diez minutos al día rinden más que dos horas el fin de semana.", "Repite en voz alta lo que escuchas: entrena pronunciación y comprensión a la vez.", "Revisa los errores de ayer antes de empezar algo nuevo.", "Escuchar sin mirar el texto es el mejor examen para tu oído."];
  const heroTip = TIPS[Math.floor(Date.now() / 86400000) % TIPS.length];
  mascotPark();
  const hoy = new Date(), idxHoy = (hoy.getDay() + 6) % 7;   // semana de lunes a domingo
  const semana = ["L", "M", "X", "J", "V", "S", "D"].map((letra, i) => {
    const n = idxHoy - i;                                       // días atrás (negativo = día futuro)
    const hecho = n >= 0 && xpBetween(n, n) > 0;
    return `<span class="d4-dia${hecho ? " hecho" : ""}${n === 0 ? " hoy" : ""}"><i aria-hidden="true">${hecho ? "✓" : ""}</i>${letra}</span>`;
  }).join("");
  el.innerHTML = `
    <div class="d4-cab">
      <div class="d4-quien"><div class="d4-av" id="mSlotHome"></div>
        <div><p class="d4-kicker">Preparación oficial · Nivel ${currentLevel} · <button type="button" class="d4-cambio" id="cambiarNivel">Cambiar</button></p><h2 class="d4-saludo">Hola${pName ? ", " + pName : ""}</h2></div></div>
      <div class="d4-pills">
        <span class="d4-pill st-streak" data-k="streak">${ico("flame", 16)}<b class="st-num">${s.days}</b></span>
      </div>
    </div>
    <div class="d4-hero card">
      <span class="d4-chip ok">Hoy · ${today} de ${DAILY_GOAL} XP</span>
      <h2 class="d4-h">Practicar ahora</h2>
      <p class="d4-sub gh-main">${heroMain}</p>
      <div class="xp-track d4-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${DAILY_GOAL}" aria-valuenow="${today}" aria-label="Objetivo diario de XP"><div class="xp-fill" style="width:${goalPct}%"></div></div>
      <button class="d4-lip" id="empezarBtn" type="button">Empezar</button>
    </div>
    <div class="d4-semana" aria-label="Esta semana">${semana}</div>
    <div id="d4Acciones"></div>
    <div id="d4Camino"></div>
  `;
  mascotMount();
  mascotGreet();
}

/* ---------- Mascota interactiva: se coloca dentro de la vista actual ---------- */
export function mascotPark() { const m = $("mascot"), park = $("mascotPark"); if (m && park && m.parentNode !== park) park.appendChild(m); }
export function mascotMount() {
  const m = $("mascot"); if (!m) return;
  // Solo en la tarjeta de inicio; en el resto de vistas no se muestra
  let target = null;
  const vis = [...document.querySelectorAll("main > section.panel")].find(x => !x.classList.contains("hidden"));
  if (vis && vis.id === "home" && $("exercise").classList.contains("hidden") && $("result").classList.contains("hidden")) target = $("mSlotHome");
  if (target && m.parentNode !== target) target.appendChild(m);
  if (target && mascotMode !== "bust") mascotRender("bust");
}
const MOOD_ORDER = ["calm", "happy", "think", "sleepy"];
let mascotMoodIdx = 0, mascotTick = 0;
const pickOf = arr => arr[Math.floor(Math.random() * arr.length)];
function mascotAvatar() { const p = activeProfile(); return (p && p.avatar) || { animal: "leon", color: "#1c7ed6", acc: "ninguno" }; }
function mascotSetMood(mood) {
  const wrap = document.querySelector("#mascotBtn .lion");
  if (wrap) { wrap.classList.remove("mood-calm", "mood-happy", "mood-sad", "mood-think", "mood-sleepy"); wrap.classList.add("mood-" + mood); }
}
function mascotReact(mood) {
  const l = document.querySelector("#mascotBtn .lion"); if (!l) return;
  l.classList.remove("r-hop", "r-wiggle", "r-droop"); void l.offsetWidth;
  const r = { happy: "r-hop", sad: "r-droop", sleepy: "r-droop", think: "r-wiggle" }[mood];
  if (r) l.classList.add(r);
}
export function mascotSay(text, mood, ms = 4500, talk = false) {
  if (examMode || !document.querySelector("#mascotBtn .lion")) return;
  mascotSetMood(mood || "calm");
  mascotReact(mood);
}
function mascotSparkle() {
  const b = $("mascotBtn");
  if (!b || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("i"); s.className = "spark"; s.style.setProperty("--a", (i * 60) + "deg");
    b.appendChild(s); setTimeout(() => s.remove(), 800);
  }
}
export function mascotGreet() {
  const p = activeProfile(), d = daysSinceLast();
  let kind = "greet", mood = "happy";
  if (dailyDone()) { kind = "goal"; mood = "happy"; }
  else if (d !== null && d >= 3) { kind = "sad"; mood = "sad"; }
  mascotSay("", mood, 8000, false);
}
let mascotMode = "bust";
function rankTier(xp) { const i = RANKS.findIndex(r => r[1] === rankInfo(xp).name); return i <= 0 ? 0 : i === 1 ? 1 : i <= 3 ? 2 : 3; }
function mascotRender(mode) {
  mascotMode = mode;
  const btn = $("mascotBtn");
  if (!btn) return;
  btn.innerHTML = `<span class="lion mood-calm tier-${rankTier(xpTotal())}">${avatarSvg(mascotAvatar(), 56, true)}</span>`;
}
export function mascotInit() {
  mascotRender("bust");
  $("mascotBtn").onclick = () => { mascotSparkle(); mascotSay("", "happy", 4500, true); };
  // Cambia de expresión y, de vez en cuando, dice algo
  setInterval(() => {
    if (examMode || !$("mascot")) return;
    mascotTick++;
    mascotMoodIdx = (mascotMoodIdx + 1) % MOOD_ORDER.length;
    const inExercise = !$("exercise").classList.contains("hidden");
    if (mascotTick % 2 === 0 && !inExercise) mascotSay("", pickOf(MOOD_ORDER), 5000);
    else mascotSetMood(MOOD_ORDER[mascotMoodIdx]);
  }, 9000);
}

