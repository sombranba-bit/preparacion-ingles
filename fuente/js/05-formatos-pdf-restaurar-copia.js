import { celebrarAcierto } from "./10-tienda-logros-perfil.js";
import {
  $,
  ITEMS,
  LEVELS,
  PROFILE_RAW_KEYS,
  SECTIONS,
  appStore,
  currentLevel,
  ico,
  itemKey,
  levelColor,
  mixHex,
  playUserAudio,
  show,
  speak,
  stopAudio,
  userAudio,
} from "./01-nucleo-niveles-audio.js";
import {
  DAILY_GOAL,
  LV_PTS,
  SR_CLASS,
  addXp,
  essayExtra,
  listenStart,
  mascotSay,
  rankInfo,
  repeatScore,
  speakExtra,
  speechMetrics,
  dayKey,
  srsRecord,
  streakInfo,
  todayXp,
  touchStreak,
  xpTotal,
} from "./02-progreso-xp-racha-mascota.js";
import { escHtml } from "./03-perfiles.js";
import { celebrarEvento } from "./10b-efectos-pixel.js";
import {
  addCoins,
  advRedo,
  advRender,
  advReveal,
  advSkip,
  answered,
  avanzarIndice,
  checkLogros,
  currentSection,
  examMode,
  index,
  lastItems,
  onGoalMet,
  queue,
  renderHome,
  renderItem,
  results,
  rewards,
  runQueue,
  saveRewards,
  selectedOption,
  sessXp,
  setRespondida,
  stopTimer,
  sumarXpSesion,
} from "./04-recompensas-logros-copia-auto.js";
import { loadHist } from "./09-datos-ejercicios-4-acento-velocidad.js";

/* ---------- Formatos nuevos: ordenar, emparejar, completar huecos ---------- */
export let fmt = null;
export const nrm = s => s.toLowerCase().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();
export function shuffleArr(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fmt_order(item, opts) {
  fmt = { picked: [], pool: shuffleArr(item.words.map((w, i) => ({ w, i }))) };
  const draw = () => {
    opts.innerHTML = "";
    const line = document.createElement("div"); line.className = "fmt-line";
    if (!fmt.picked.length) { const h = document.createElement("span"); h.className = "fmt-hint"; h.textContent = "Toca las palabras en orden"; line.appendChild(h); }
    fmt.picked.forEach((c, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "fmt-btn"; b.textContent = c.w;
      b.onclick = () => { if (answered) return; fmt.picked.splice(k, 1); fmt.pool.push(c); draw(); };
      line.appendChild(b);
    });
    opts.appendChild(line);
    const row = document.createElement("div"); row.className = "fmt-row";
    fmt.pool.forEach((c, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "fmt-btn"; b.textContent = c.w;
      b.onclick = () => { if (answered) return; fmt.pool.splice(k, 1); fmt.picked.push(c); draw(); };
      row.appendChild(b);
    });
    opts.appendChild(row);
  };
  draw();
}
function fmt_match(item, opts) {
  const order = shuffleArr(item.pairs.map((p, i) => i));
  fmt = { links: {}, sel: null, order };
  const draw = () => {
    opts.innerHTML = "";
    const grid = document.createElement("div"); grid.className = "fmt-grid";
    const L = document.createElement("div"); L.className = "fmt-col";
    const R = document.createElement("div"); R.className = "fmt-col";
    item.pairs.forEach((p, i) => {
      const b = document.createElement("button"); b.type = "button";
      b.className = "fmt-btn" + (fmt.sel === i ? " sel" : "") + (fmt.links[i] !== undefined ? " linked" : "");
      b.textContent = (fmt.links[i] !== undefined ? "" : "") + p[0];
      b.onclick = () => { if (answered) return; if (fmt.links[i] !== undefined) { delete fmt.links[i]; fmt.sel = null; } else fmt.sel = fmt.sel === i ? null : i; draw(); };
      L.appendChild(b);
    });
    order.forEach((pi, slot) => {
      const b = document.createElement("button"); b.type = "button";
      const used = Object.keys(fmt.links).some(k => fmt.links[k] === slot);
      b.className = "fmt-btn" + (used ? " linked" : "");
      b.textContent = String.fromCharCode(65 + slot) + ". " + item.pairs[pi][1];
      b.onclick = () => { if (answered || fmt.sel === null) return; Object.keys(fmt.links).forEach(k => { if (fmt.links[k] === slot) delete fmt.links[k]; }); fmt.links[fmt.sel] = slot; fmt.sel = null; draw(); };
      R.appendChild(b);
    });
    grid.appendChild(L); grid.appendChild(R); opts.appendChild(grid);
  };
  draw();
}
function fmt_cloze(item, opts) {
  fmt = {};
  item.gaps.forEach((g, k) => {
    const wrap = document.createElement("label"); wrap.className = "fmt-gap";
    wrap.innerHTML = `<span>(${k + 1})</span>`;
    const inp = document.createElement("input"); inp.className = "answer"; inp.placeholder = "Escribe tu respuesta"; inp.autocomplete = "off";
    inp.onkeydown = e => { if (e.key === "Enter") check(); };
    wrap.appendChild(inp); opts.appendChild(wrap);
  });
  setTimeout(() => { const f = opts.querySelector("input"); if (f) f.focus(); }, 50);
}
function fmt_keyword(item, opts) {
  fmt = {};
  const box = document.createElement("div"); box.className = "fmt-kw";
  box.innerHTML = (item.kw ? `<span class="fmt-chip">${escHtml(item.kw)}</span>` : "") +
    `<p class="fmt-sent">${escHtml(item.pre)} <input class="answer fmt-kwin" autocomplete="off" placeholder="Tu respuesta"> ${escHtml(item.post)}</p>`;
  opts.appendChild(box);
  const inp = box.querySelector("input");
  inp.onkeydown = e => { if (e.key === "Enter") check(); };
  setTimeout(() => inp.focus(), 50);
}
function fmt_gapped(item, opts) {
  fmt = {};
  const fr = document.createElement("div"); fr.className = "fmt-frags";
  fr.innerHTML = `<p class="fmt-hint">Fragmentos</p>` + Object.keys(item.frags).map(l => `<p class="fmt-frag"><b>${escHtml(l)}</b> ${escHtml(item.frags[l])}</p>`).join("");
  opts.appendChild(fr);
  item.paras.forEach((p, k) => {
    const para = document.createElement("p"); para.className = "fmt-para"; para.textContent = p; opts.appendChild(para);
    if (k < item.paras.length - 1) {
      const wrap = document.createElement("div"); wrap.className = "fmt-gap";
      wrap.innerHTML = `<span>(${k + 1})</span><select class="answer fmt-sel"><option value="">Elige fragmento</option>` + Object.keys(item.frags).map(l => `<option value="${escHtml(l)}">${escHtml(l)}</option>`).join("") + `</select>`;
      opts.appendChild(wrap);
    }
  });
}
function fmt_partword(item, opts) {
  fmt = {};
  let html = "", gi = 0;
  item.segments.forEach(seg => {
    if (typeof seg === "string") html += escHtml(seg);
    else { html += `<b>${escHtml(seg.pre)}</b><input class="answer fmt-pw" autocomplete="off" placeholder="…"> `; gi++; }
  });
  const line = document.createElement("p"); line.className = "fmt-sent"; line.innerHTML = html;
  opts.appendChild(line);
  line.querySelectorAll("input").forEach(inp => { inp.onkeydown = e => { if (e.key === "Enter") check(); }; });
  setTimeout(() => { const f = line.querySelector("input"); if (f) f.focus(); }, 50);
}
function fmt_essay(item, opts) {
  fmt = {};
  if (item.source) { const sb = document.createElement("div"); sb.className = "fmt-kw"; sb.innerHTML = `<p class="fmt-hint">Texto fuente</p><p class="fmt-para" style="margin:0">${escHtml(item.source)}</p>`; opts.appendChild(sb); }
  const crit = document.createElement("ul"); crit.className = "fmt-crit";
  crit.innerHTML = item.criteria.map(c => `<li><label><input type="checkbox" class="fmt-chk"> ${escHtml(c)}</label></li>`).join("");
  const ta = document.createElement("textarea"); ta.className = "answer fmt-essay"; ta.placeholder = "Escribe tu texto aquí";
  const cnt = document.createElement("p"); cnt.className = "fmt-hint";
  const upd = () => { cnt.textContent = `${wc(ta.value)} palabras · extensión orientativa: ${item.min}–${item.max}`; };
  ta.oninput = upd; upd();
  opts.appendChild(crit); opts.appendChild(ta); opts.appendChild(cnt);
  setTimeout(() => ta.focus(), 50);
}
function fmt_speak(item, opts) {
  fmt = { self: null, timer: null };
  const card = document.createElement("div"); card.className = "fmt-kw";
  card.innerHTML = `${item.source ? `<p class="fmt-para" style="margin:0">${escHtml(item.source)}</p>` : ""}<p class="fmt-hint" id="spkInfo">${item.prep ? `Tienes ${item.prep} s para preparar y ${item.talk} s para hablar.` : "Escucha y repite."}</p><div class="actions" id="spkActs" style="justify-content:center"></div>`;
  opts.appendChild(card);
  const info = card.querySelector("#spkInfo"), acts = card.querySelector("#spkActs");
  const selfOnly = () => {
    info.textContent = "Autoevaluación: ¿lo has repetido bien?";
    acts.innerHTML = `<button type="button" class="btn secondary" data-s="0">No lo he cumplido</button><button type="button" class="btn secondary" data-s="1">Lo he cumplido</button>`;
    acts.querySelectorAll("button").forEach(b => b.onclick = () => { fmt.self = b.dataset.s === "1"; acts.querySelectorAll("button").forEach(x => x.classList.toggle("sel", x === b)); });
  };
  if (!item.prep) {
    const lst = document.createElement("button"); lst.type = "button"; lst.className = "btn secondary"; lst.textContent = "Escuchar";
    lst.onclick = () => speak(item.audio, item);
    acts.appendChild(lst);
    if (SR_CLASS) {
      const rb = document.createElement("button"); rb.type = "button"; rb.className = "btn secondary"; rb.textContent = "Grabar mi repetición";
      let rec = null;
      rb.onclick = () => {
        if (rec) { rec.stop(); return; }
        rec = listenStart(said => {
          rec = null;
          const score = repeatScore(item.audio, said);
          fmt.metrics = { ...speechMetrics(said, 0), score };
          info.textContent = said ? `Has dicho: "${said}". Coincidencia con la frase: ${score}%.` : "No se ha reconocido nada. Puedes autoevaluarte.";
          fmt.self = !!said && score >= 80;
          selfOnly();
          acts.querySelector(`[data-s="${fmt.self ? 1 : 0}"]`).classList.add("sel");
        });
        if (rec) rb.textContent = "Parar"; else rb.disabled = true;
      };
      acts.appendChild(rb);
    }
    const done = document.createElement("button"); done.type = "button"; done.className = "btn"; done.textContent = "Ya lo he repetido";
    done.onclick = selfOnly; acts.appendChild(done);
    return;
  }
  acts.innerHTML = `<button type="button" class="btn secondary" id="spkStart">Empezar preparación</button>`;
  const countdown = (sec, label, done) => {
    let left = sec; info.textContent = `${label}: ${left} s`;
    fmt.timer = setInterval(() => { left--; if (left <= 0) { clearInterval(fmt.timer); done(); } else info.textContent = `${label}: ${left} s`; }, 1000);
  };
  const selfCheck = () => {
    info.textContent = "Autoevaluación: ¿has cubierto lo que pedía la tarea?";
    acts.innerHTML = `<button type="button" class="btn secondary" data-s="0">No lo he cumplido</button><button type="button" class="btn secondary" data-s="1">Lo he cumplido</button>`;
    acts.querySelectorAll("button").forEach(b => b.onclick = () => {
      fmt.self = b.dataset.s === "1";
      acts.querySelectorAll("button").forEach(x => x.classList.toggle("sel", x === b));
    });
  };
  const metricsLine = document.createElement("p"); metricsLine.className = "fmt-hint"; card.appendChild(metricsLine);
  const startTalk = () => {
    acts.innerHTML = "";
    const rec = listenStart(said => {
      fmt.metrics = speechMetrics(said, item.talk);
      metricsLine.textContent = said ? `Has hablado ${fmt.metrics.words} palabras (${fmt.metrics.wpm} por minuto), con ${fmt.metrics.fillers} muletillas. Transcripción: "${said}"` : "No se ha reconocido audio: la autoevaluación sigue disponible.";
    });
    countdown(item.talk, "Hablando", () => { if (rec) rec.stop(); selfCheck(); });
  };
  acts.querySelector("#spkStart").onclick = e => {
    e.target.disabled = true;
    countdown(item.prep, "Preparación", () => { acts.innerHTML = `<button type="button" class="btn" id="spkTalk">Empezar a hablar</button>`; acts.querySelector("#spkTalk").onclick = startTalk; });
  };
}
const FORMATOS = { order: fmt_order, match: fmt_match, cloze: fmt_cloze, keyword: fmt_keyword, gapped: fmt_gapped, partword: fmt_partword, essay: fmt_essay, speak: fmt_speak };
export function renderFormat(item, opts, inputWrap) {
  opts.classList.remove("hidden"); inputWrap.classList.add("hidden"); opts.innerHTML = "";
  const pinta = FORMATOS[item.format];
  if (pinta) pinta(item, opts);
}
function wc(s) { return s.trim() ? s.trim().split(/\s+/).length : 0; }
function evalFormat(item) {
  if (item.format === "partword") {
    const inps = [...document.querySelectorAll("#options .fmt-pw")];
    if (!inps.length || inps.some(i => !i.value.trim())) return null;
    const gaps = item.segments.filter(s => typeof s !== "string");
    return { correct: gaps.every((g, k) => nrm(g.pre + inps[k].value.trim()) === nrm(g.ans)), msg: "Palabras: " + gaps.map(g => g.ans).join(", "), given: inps.map(i => i.value.trim()).join(", ") };
  }
  if (item.format === "keyword") {
    const v = (document.querySelector("#options .fmt-kwin") || {}).value || "";
    if (!v.trim()) return null;
    return { correct: item.accepted.some(a => nrm(a) === nrm(v)), msg: "Respuesta: " + item.accepted[0], given: v.trim() };
  }
  if (item.format === "gapped") {
    const sels = [...document.querySelectorAll("#options .fmt-sel")].map(s => s.value);
    if (!sels.length || sels.some(v => !v)) return null;
    return { correct: item.answers.every((a, k) => sels[k] === a), msg: "Orden correcto: " + item.answers.join(", "), given: sels.join(", ") };
  }
  if (item.format === "essay") {
    const txt = (document.querySelector("#options .fmt-essay") || {}).value || "";
    const n = wc(txt);
    if (!n) return null;
    return { correct: n >= item.min && n <= item.max, msg: `Tu texto tiene ${n} palabras; la extensión orientativa es ${item.min}–${item.max}. Compara con los criterios`, given: txt.trim(), extra: essayExtra(txt) };
  }
  if (item.format === "speak") {
    if (fmt.self === null) return null;
    return { correct: fmt.self, msg: "Autoevaluación: " + (fmt.self ? "tarea cubierta" : "tarea no cubierta"), given: "(respuesta hablada)", extra: fmt.metrics ? speakExtra(fmt.metrics) : undefined };
  }
  if (item.format === "order") {
    if (fmt.picked.length !== item.words.length) return null;
    const given = fmt.picked.map(c => c.w).join(" ");
    return { correct: item.accepted.some(a => nrm(a) === nrm(given)), msg: "Orden correcto: " + item.accepted[0], given };
  }
  if (item.format === "match") {
    if (Object.keys(fmt.links).length < item.pairs.length) return null;
    const ok = item.pairs.every((p, i) => fmt.links[i] !== undefined && fmt.order[fmt.links[i]] === i);
    return { correct: ok, msg: "Parejas correctas: " + item.pairs.map(p => p[0] + " = " + p[1]).join("; "), given: item.pairs.map((p, i) => p[0] + " = " + item.pairs[fmt.order[fmt.links[i]] ?? 0][1]).join("; ") };
  }
  if (item.format === "cloze") {
    const vals = [...document.querySelectorAll("#options input")].map(x => x.value.trim());
    if (vals.length !== item.gaps.length || vals.some(v => !v)) return null;
    const ok = item.gaps.every((g, k) => g.some(a => nrm(a) === nrm(vals[k])));
    return { correct: ok, msg: "Respuestas: " + item.gaps.map(g => g[0]).join(" | "), given: vals.join(" | ") };
  }
  return null;
}

// Devuelve {correct, msg} o null si no hay respuesta todavía
function evaluate() {
  const item = queue[index];
  if (item.format) return evalFormat(item);
  if (item.options) {
    if (selectedOption === null) return null;
    return { correct: selectedOption === item.answer, msg: "Respuesta: " + item.options[item.answer] };
  }
  const given = $("answerInput").value.trim();
  if (!given) return null;
  const norm = s => s.toLowerCase().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();
  const ok = item.accepted.some(a => norm(a) === norm(given));
  return { correct: ok, msg: "Respuestas válidas: " + item.accepted.join(" / "), given };
}

/* Monedas por tiempo: 20 minutos seguidos (pausas de hasta 3 min) dan +3; máximo 2 veces al día */
let tiempoActivo = 0, tiempoUlt = 0, tiempoPagado = false;
function premioTiempo() {
  const ahora = Date.now();
  // Cada pausa cuenta como máximo 3 min (leer una explicación no corta el tiempo); más de 30 min sin responder empieza de cero
  if (!tiempoUlt || ahora - tiempoUlt > 30 * 60000) { tiempoActivo = 0; tiempoPagado = false; }
  if (tiempoUlt) tiempoActivo += Math.min(ahora - tiempoUlt, 3 * 60000);
  tiempoUlt = ahora;
  if (tiempoPagado || tiempoActivo < 20 * 60000) return;
  tiempoPagado = true;
  const r = rewards(), hoy = dayKey(new Date());
  if (r.tiempoDia !== hoy) { r.tiempoDia = hoy; r.tiempoN = 0; }
  if (r.tiempoN >= 2) return;
  r.tiempoN++; saveRewards(r); addCoins(3);
}

/* Animaciones: celebración a pantalla completa, "+XP" flotante y cuenta del resultado */
export function celebrate(title, sub, emoji) {
  document.querySelectorAll(".celebrate").forEach(e => e.remove());
  const cols = ["var(--accent)", "var(--lvl-color,var(--accent))", "#fbbf24", "#f472b6", "#60a5fa", "#34d399"];
  let confetti = "";
  for (let i = 0; i < 36; i++) confetti += `<span class="cel-p" style="left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${(Math.random() * 0.8).toFixed(2)}s;animation-duration:${(1.8 + Math.random() * 1.2).toFixed(2)}s"></span>`;
  const el = document.createElement("div");
  el.className = "celebrate";
  el.innerHTML = `<div class="cel-layer">${confetti}</div><div class="cel-card"><div class="cel-emoji">${emoji}</div><strong>${title}</strong><span>${sub}</span></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2900);
}
export function floatGain(txt) {
  const r = $("options").getBoundingClientRect();
  const el = document.createElement("div");
  el.className = "fx-float"; el.innerHTML = txt;
  el.style.left = (r.left + r.width / 2) + "px"; el.style.top = Math.max(12, r.top + 8) + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
function countUp(el, to, total) {
  const t0 = performance.now(), dur = 700;
  const step = now => {
    const k = Math.min(1, (now - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
    el.textContent = `${v} / ${total}`;
    if (k < 1) requestAnimationFrame(step);
  };
  el.textContent = `0 / ${total}`;
  requestAnimationFrame(step);
}

export function check() {
  if (answered) return;
  const r = evaluate();
  if (!r) {   // sin respuesta: avisar en lugar de no hacer nada
    const fb = $("feedback");
    fb.className = "feedback";
    fb.innerHTML = queue[index].format ? "Completa el ejercicio antes de comprobar." : queue[index].options ? "Elige una opción antes de comprobar." : "Escribe una respuesta antes de comprobar.";
    fb.classList.remove("hidden");
    if (!queue[index].options && !queue[index].format) $("answerInput").focus();
    return;
  }
  setRespondida();
  const item = queue[index];
  if (!examMode) srsRecord(itemKey(), r.correct);
  results[index] = { correct: r.correct, q: item.q, given: r.given ?? (selectedOption !== null ? item.options[selectedOption] : ""), correctText: item.options ? item.options[item.answer] : item.accepted[0] };
  const dBefore = streakInfo().days, rBefore = rankInfo(xpTotal()).name;
  touchStreak();
  if (!examMode) premioTiempo();
  let said = false;
  if (r.correct) {
    const pts = LV_PTS[currentLevel] + (examMode ? 5 : 0), before = todayXp();
    const xb = xpTotal(); addXp(itemKey(), pts); const gained = xpTotal() - xb; sumarXpSesion(gained);
    if (gained) floatGain(`+${gained} XP`);
    if (!examMode && before < DAILY_GOAL && todayXp() >= DAILY_GOAL) {
      addCoins(5);
      if (streakInfo().days >= 3) addCoins(2);   // racha que paga: +2 cada día a partir del tercero
      const earned = onGoalMet();
      celebrarEvento("racha");
      celebrate("¡Objetivo cumplido!", "+5 monedas", ico("target", 56));
      if (earned) setTimeout(() => celebrate("¡Escudo ganado!", "Protege tu racha si un día no practicas", ico("shield", 56)), 2900);
      mascotSay(earned ? "¡Has ganado un escudo! Protege tu racha." : "", "happy", 6000, true); said = true;
    }
    else if (!examMode && rankInfo(xpTotal()).name !== rBefore) { celebrate("¡Nuevo rango!", rankInfo(xpTotal()).name, ico("trophy", 56)); mascotSay("", "happy", 6000, true); said = true; }
  }
  const dAfter = streakInfo().days;
  if (!examMode && r.correct && currentSection === "repaso") addCoins(1);   // repaso con premio
  if (!examMode && dAfter > dBefore && dAfter % 7 === 0) addCoins(20);      // cada 7 días seguidos
  if (!examMode && dAfter > dBefore && [7, 14, 30, 60, 100].includes(dAfter)) { celebrate(`¡${dAfter} días de racha!`, "Así se hace", ico("flame", 56)); }
  if (!examMode && !said && dAfter > dBefore && [7, 14, 30, 60, 100].includes(dAfter)) { mascotSay("", "happy", 6000, true); said = true; }
  if (!examMode && !said) r.correct ? mascotSay("", "happy", 4500, true) : mascotSay("", "think", 5500, true);
  if (r.correct && !examMode) celebrarAcierto();

  if (!examMode) checkLogros();
  if (examMode) { next(); return; }   // modo examen: sin corrección

  // modo práctica: mostrar feedback
  if (item.options) {
    document.querySelectorAll(".option").forEach((b, i) => {
      b.disabled = true;
      if (i === item.answer) b.classList.add("correct");
      if (i === selectedOption && !r.correct) b.classList.add("wrong");
    });
  } else {
    $("answerInput").disabled = true;
  }
  if (item.format) document.querySelectorAll("#options button, #options input, #options textarea, #options select").forEach(e => e.disabled = true);
  const fb = $("feedback");
  fb.className = "feedback " + (r.correct ? "ok" : "bad");
  const extraTxt = r.extra ? `<br><span class="muted">${escHtml(r.extra)}</span>` : "";
  fb.innerHTML = (r.correct
    ? `${ico("check", 18)} <strong>¡Correcto!</strong> ${item.explain}`
    : `${ico("x", 18)} <strong>Incorrecto.</strong> ${r.msg}. ${item.explain}`) + extraTxt;
  fb.classList.remove("hidden");
  $("checkBtn").classList.add("hidden");
  $("nextBtn").classList.remove("hidden");
  advRender();
}

export function next() {
  // En modo examen, si no se respondió la pregunta se cuenta como fallo
  if (!answered && examMode) results[index] = { correct: false, q: queue[index].q, given: "", correctText: "" };
  avanzarIndice();
  if (index >= queue.length) return finish(false);
  renderItem();
}

export function finish(timeout) {
  stopTimer(); stopAudio();
  // preguntas sin responder cuentan como fallo
  for (let i = 0; i < queue.length; i++) if (!results[i]) results[i] = { correct: false, q: queue[i].q, given: "", correctText: queue[i].options ? queue[i].options[queue[i].answer] : queue[i].accepted[0] };
  const score = results.filter(r => r.correct).length;
  const pct = Math.round((score / queue.length) * 100);
  if (!examMode) celebrarEvento("sesion");
  $("resEmoji").innerHTML = pct >= 80 ? ico("trophy", 52) : pct >= 50 ? ico("star", 52) : ico("book", 52);
  $("resLabel").textContent = examMode ? (timeout ? "Se acabó el tiempo" : "Resultado del examen") : "Tu resultado";
  $("scoreText").textContent = `${score} / ${queue.length}`;
  $("scoreMsg").textContent = pct >= 80 ? "Muy bien. Pasa al siguiente tipo de ejercicio."
    : pct >= 50 ? "Vas bien. Repite los que fallaste."
    : "Repasa las explicaciones y vuelve a intentarlo.";

  if (currentSection === "corta" && !examMode) celebrate(pct === 100 ? "¡Sesión corta perfecta!" : "¡Sesión corta completada!", `${score} de ${queue.length} bien · +${sessXp} XP`, ico("bolt", 56));
  document.querySelectorAll(".fx-float").forEach(e => e.remove());
  countUp($("scoreText"), score, queue.length);
  $("resEmoji").classList.remove("count-pop"); void $("resEmoji").offsetWidth; $("resEmoji").classList.add("count-pop");
  $("resOk").textContent = score; $("resKo").textContent = queue.length - score; $("resXp").textContent = examMode ? "—" : `+${sessXp}`;
  const perfect = !examMode && !timeout && pct === 100;
  $("resBadge").innerHTML = `${ico("trophy", 16)} Sesión perfecta`;
  $("resBadge").classList.toggle("hidden", !perfect);
  $("resGrid").innerHTML = results.map((r, i) => `<span class="res-dot ${r.correct ? "ok" : "bad"}" title="Pregunta ${i + 1}">${i + 1}</span>`).join("");
  const rv = $("review");
  rv.innerHTML = "";
  if (examMode) {
    results.forEach((r, i) => {
      const d = document.createElement("div");
      d.className = "review-item " + (r.correct ? "ok" : "bad");
      d.innerHTML = `${r.correct ? ico("check", 18) : ico("x", 18)} <strong>${i+1}.</strong> ${escHtml(queue[i].q)}` +
        (r.correct ? "" : `<br><span class="muted">Respuesta correcta: ${escHtml(r.correctText)}</span>`) +
        `<br><span class="muted">${escHtml(queue[i].explain)}</span>`;
      rv.appendChild(d);
    });
  }

  try {
    const key = "progreso-ingles";
    const data = JSON.parse(appStore.getItem(key) || "{}");
    data[`${currentLevel}-${currentSection}${examMode ? "-examen" : ""}`] = { score, total: queue.length, date: new Date().toISOString() };
    appStore.setItem(key, JSON.stringify(data));
  } catch (e) {}
  try {
    const h = loadHist();
    h.unshift({ lv: currentLevel, sec: currentSection, exam: examMode, score, total: queue.length, pct, date: Date.now() });
    appStore.setItem("historial-ingles", JSON.stringify(h.slice(0, 300)));
  } catch (e) {}
  lastSession = { lv: currentLevel, sec: SECTIONS[currentSection] ? SECTIONS[currentSection].name : currentSection, exam: examMode, score, total: queue.length, date: new Date(), items: queue.map((it, i) => ({ q: it.q, given: (results[i] && results[i].given) || "", ok: !!(results[i] && results[i].correct), correct: (results[i] && results[i].correctText) || "" })) };
  mascotSay(pct >= 80 ? "¡Enhorabuena! Ese resultado merece celebrarse." : "Repasa las explicaciones y lo verás mejor.", pct >= 80 ? "happy" : "think", 6000);
  // sesión corta: al acabar vuelve al inicio (el resumen sigue en el historial de progreso)
  if (currentSection === "corta") { renderHome(); document.querySelector("[data-inicio]")?.click(); return; }
  show("result");
}


/* ---------- PDF de repaso: generador propio (sin librerías ni internet) ---------- */
let lastSession = null;
function pdfEsc(t) { return String(t).replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[^\x00-\xff]/g, "?").replace(/[\\()]/g, m => "\\" + m).replace(/[\r\n]+/g, " "); }
function pdfWrap(t, max) {
  const words = String(t).split(/\s+/), out = []; let line = "";
  words.forEach(w => { if ((line + " " + w).trim().length > max) { if (line) out.push(line); line = w; } else line = (line + " " + w).trim(); });
  if (line || !out.length) out.push(line);
  return out;
}
function buildPdf(sess) {
  const W = 595, H = 842, M = 50, PAD = 10;
  const dark = document.documentElement.getAttribute("data-mode") === "dark";
  // color de nivel de la paleta activa; en modo oscuro se oscurece para que el texto blanco se lea
  let L = levelColor(sess.lv); if (dark) L = mixHex(L, "#000000", 0.4);
  const rgb = h => [1, 3, 5].map(i => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3)).join(" ");
  const GREEN = "#15803d", RED = "#b91c1c", INK = "#1e293b", MUTED = "#64748b", WHITE = "#ffffff";
  const pages = []; let cur = null, y = 0;
  const rect = (x, yy, w, h, col) => cur.push(`${rgb(col)} rg ${x.toFixed(1)} ${yy.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re f`);
  const text = (x, yy, t, size, bold, col) => cur.push(`${rgb(col)} rg BT /${bold ? "F2" : "F1"} ${size} Tf ${x.toFixed(1)} ${yy.toFixed(1)} Td (${pdfEsc(t)}) Tj ET`);
  const newPage = first => {
    cur = []; pages.push(cur);
    if (first) {
      rect(0, H - 118, W, 118, L);
      text(M, H - 52, "Repaso de inglés", 22, true, WHITE);
      text(M, H - 74, `${sess.exam ? "Examen" : "Ejercicio"} · Nivel ${sess.lv} · ${sess.sec} · ${sess.date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`, 10, false, WHITE);
      y = H - 118 - 24;
    } else { rect(0, H - 6, W, 6, L); y = H - M; }
  };
  newPage(true);
  // resumen
  const pct = Math.round((sess.score / sess.total) * 100), SH = 84;
  rect(M, y - SH, W - 2 * M, SH, mixHex(L, "#ffffff", 0.88));
  rect(M, y - SH, 5, SH, L);
  text(M + 20, y - 24, "Resultado", 10, false, MUTED);
  text(M + 20, y - 58, `${sess.score} / ${sess.total}`, 26, true, L);
  text(W - M - 110, y - 58, `${pct} %`, 20, true, L);
  rect(M + 20, y - 74, W - 2 * M - 40, 6, "#e2e8f0");
  rect(M + 20, y - 74, Math.max(0, (W - 2 * M - 40) * sess.score / sess.total), 6, L);
  y -= SH + 22;
  // preguntas: una tarjeta por pregunta, con color de estado
  sess.items.forEach((it, i) => {
    const qL = pdfWrap(`${i + 1}. ${it.q}`, 84), gL = pdfWrap(it.given ? `Tu respuesta: ${it.given}` : "Tu respuesta: (sin responder)", 90);
    const cL = it.ok ? [] : pdfWrap(`Respuesta correcta: ${it.correct}`, 90);
    const cardH = 20 + qL.length * 14 + gL.length * 14 + 4 + 26 + cL.length * 14 + 6;
    if (y - cardH < M + 10) newPage(false);
    const st = it.ok ? GREEN : RED;
    rect(M, y - cardH, W - 2 * M, cardH, mixHex(st, "#ffffff", 0.93));
    rect(M, y - cardH, 4, cardH, st);
    let c = y - 20;
    qL.forEach((t, k) => { text(M + PAD + 4, c, t, 10, true, INK); c -= 14; });
    gL.forEach(t => { text(M + PAD + 4, c, t, 10, false, MUTED); c -= 14; });
    c -= 4;
    const label = it.ok ? "CORRECTO" : "INCORRECTO", pw = label.length * 5.6 + 14;
    rect(M + PAD + 4, c - 16, pw, 16, st);
    text(M + PAD + 11, c - 11, label, 8, true, WHITE);
    c -= 26;
    cL.forEach(t => { text(M + PAD + 4, c, t, 10, true, GREEN); c -= 14; });
    y -= cardH + 8;
  });
  // pie de página
  const N = pages.length;
  pages.forEach((pg, i) => {
    const saved = cur; cur = pg;
    text(M, 28, `Preparación de inglés · Página ${i + 1} de ${N}`, 8, false, MUTED);
    cur = saved;
  });
  // objetos: 1 catálogo, 2 páginas, 3 y 4 fuentes, luego pares (página, contenido)
  const objs = [];
  const kids = pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ");
  objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`;
  objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  pages.forEach((pg, i) => {
    const content = pg.join("\n");
    objs[5 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`;
    objs[6 + i * 2] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });
  let out = "%PDF-1.4\n", offs = [];
  for (let n = 1; n < objs.length; n++) { offs[n] = out.length; out += `${n} 0 obj\n${objs[n]}\nendobj\n`; }
  const xref = out.length;
  out += `xref\n0 ${objs.length}\n0000000000 65535 f \n` + offs.slice(1).map(o => String(o).padStart(10, "0") + " 00000 n \n").join("") + `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: "application/pdf" });
}
function openPdfDialog() {
  if (!lastSession) return;
  $("pdfTxt").textContent = `${lastSession.items.length} preguntas, con tu respuesta y si fue correcta o incorrecta.`;
  $("pdfModal").classList.remove("hidden");
}
window.addEventListener("DOMContentLoaded", () => {
  $("pdfBtn").onclick = openPdfDialog;
  $("pdfCancel").onclick = () => $("pdfModal").classList.add("hidden");
  $("pdfOk").onclick = () => {
    if (!lastSession) return;
    const url = URL.createObjectURL(buildPdf(lastSession));
    const a = document.createElement("a");
    a.href = url; a.download = `repaso-${lastSession.lv}-${lastSession.exam ? "examen" : "ejercicio"}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("pdfModal").classList.add("hidden");
  };
});

/* ============================================================
   EVENTOS
   ============================================================ */
$("backBtn").onclick = () => {
  if (examMode && !confirm("¿Salir del examen? Se perderá el progreso de esta sesión.")) return;
  stopTimer(); stopAudio(); renderHome();
};
$("homeBtn").onclick = () => renderHome();
$("skipBtn").onclick = advSkip;
$("revealBtn").onclick = advReveal;
$("redoBtn").onclick = advRedo;
$("retryBtn").onclick = () => runQueue(shuffleArr(lastItems));   // mismas preguntas, orden nuevo

/* ---------- Ejercicios importados (solo en este navegador) ---------- */
const CUSTOM_KEY = "ejercicios-propios";
function validItem(o) {
  if (!o || !LEVELS[o.level] || !SECTIONS[o.type] || typeof o.q !== "string") return false;
  if (o.format) return validFormat(o);
  if (o.type === "rephrase") return Array.isArray(o.accepted) && o.accepted.length > 0;
  if (o.type === "listening" && !o.audio) return false;
  if ((o.type === "listening" || o.type === "reading") && !Array.isArray(o.options)) return Array.isArray(o.accepted) && o.accepted.length > 0;
  return Array.isArray(o.options) && typeof o.answer === "number" && o.answer >= 0 && o.answer < o.options.length;
}
function validFormat(o) {
  if (!Array.isArray(o.accepted) || !o.accepted.length) return false;
  if (o.format === "order") return Array.isArray(o.words) && o.words.length > 1;
  if (o.format === "match") return Array.isArray(o.pairs) && o.pairs.length > 1;
  if (o.format === "cloze") return typeof o.passage === "string" && Array.isArray(o.gaps) && o.gaps.length > 0;
  if (o.format === "keyword") return typeof o.pre === "string" && typeof o.post === "string";
  if (o.format === "gapped") return Array.isArray(o.paras) && o.paras.length > 1 && Array.isArray(o.answers) && o.answers.length === o.paras.length - 1;
  if (o.format === "essay") return Array.isArray(o.criteria) && o.criteria.length > 0 && typeof o.min === "number" && typeof o.max === "number";
  if (o.format === "speak") return true;
  if (o.format === "partword") return Array.isArray(o.segments) && o.segments.some(s => typeof s !== "string");
  return false;
}
export function loadCustom() {
  try {
    const arr = JSON.parse(appStore.getItem(CUSTOM_KEY) || "[]");
    arr.forEach(o => { if (validItem(o)) ITEMS.push(o); });
  } catch (e) {}
}

$("uploadBtn").onclick = () => $("userAudioFile").click();
$("userAudioFile").onchange = e => {
  const f = e.target.files[0];
  if (!f) return;
  userAudio[itemKey()] = URL.createObjectURL(f);
  playUserAudio();
  e.target.value = "";
};

$("importFile").onchange = async e => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const arr = JSON.parse(await f.text());
    if (!Array.isArray(arr)) throw new Error("el archivo debe contener una lista [ ... ].");
    const ok = arr.filter(validItem);
    const prev = JSON.parse(appStore.getItem(CUSTOM_KEY) || "[]");
    appStore.setItem(CUSTOM_KEY, JSON.stringify(prev.concat(ok)));
    ok.forEach(o => ITEMS.push(o));
    $("importStatus").textContent = `Importados ${ok.length} de ${arr.length} ejercicios.`;
    renderHome();
  } catch (err) {
    $("importStatus").textContent = "Error: " + err.message;
  }
  e.target.value = "";
};
/* Copia de seguridad del progreso (se guarda solo en este navegador). */
const BACKUP_SHAPES = {
  "liga-amigos": v => Array.isArray(v) && v.every(x => typeof x.name === "string" && typeof x.week === "string" && typeof x.xp === "number"),
  "progreso-ingles": v => v && typeof v === "object" && !Array.isArray(v),
  "historial-ingles": v => Array.isArray(v),
  "ejercicios-propios": v => Array.isArray(v),
  "xp-ganados": v => v && typeof v === "object" && !Array.isArray(v),
  "racha-ingles": v => v && typeof v === "object" && !Array.isArray(v),
  "xp-diario": v => v && typeof v === "object" && !Array.isArray(v),
  "recompensas-ingles": v => v && typeof v === "object" && !Array.isArray(v)
};
$("exportBtn").onclick = () => {
  try {
    const data = {};
    Object.keys(BACKUP_SHAPES).forEach(k => { const v = appStore.getItem(k); if (v !== null) data[k] = v; });
    for (let i = 0; i < appStore.length; i++) { const k = appStore.key(i); if (k.startsWith("nota|")) data[k] = appStore.getItem(k); }
    const blob = new Blob([JSON.stringify({ app: "preparacion-ingles", version: 1, data }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "copia-preparacion-ingles-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    $("backupStatus").textContent = "Copia descargada.";
  } catch (err) { $("backupStatus").textContent = "No se pudo crear la copia en este navegador."; }
};
// Importación única para los dos formatos de copia. Cada valor se valida por separado:
// uno corrupto se omite y no interrumpe el resto.
const APPS_COPIA = ["diseno-B-cockpit", "preparacion-ingles"];
export function importarCopia(texto) {
  const obj = JSON.parse(texto);
  if (!APPS_COPIA.includes(obj.app) || !obj.data || typeof obj.data !== "object") throw new Error("formato");
  let n = 0, saltados = 0;
  for (const [k, v] of Object.entries(obj.data)) {
    if (typeof v !== "string" || PROFILE_RAW_KEYS.includes(k)) { saltados++; continue; }
    try {
      if (k.startsWith("nota|")) { appStore.setItem(k, v); n++; continue; }
      if (BACKUP_SHAPES[k] && !BACKUP_SHAPES[k](JSON.parse(v))) { saltados++; continue; }
      if (!BACKUP_SHAPES[k]) JSON.parse(v);
      appStore.setItem(k, v); n++;
    } catch (err) { saltados++; }
  }
  if (n === 0) throw new Error("vacio");
  return { n, saltados };
}
$("backupFile").onchange = async e => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const r = importarCopia(await f.text());
    $("backupStatus").textContent = `Copia restaurada (${r.n} elementos${r.saltados ? `, ${r.saltados} omitidos` : ""}). Recargando…`;
    setTimeout(() => location.reload(), 900);
  } catch (err) {
    $("backupStatus").textContent = "No se pudo restaurar: el archivo no es una copia válida.";
  }
  e.target.value = "";
};
$("clearCustom").onclick = () => {
  if (confirm("¿Borrar los ejercicios importados?")) { appStore.removeItem(CUSTOM_KEY); location.reload(); }
};

