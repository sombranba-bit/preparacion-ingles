import { $, RAW_LS } from "./01-nucleo-niveles-audio.js";

/* ============================================================
   VOZ NATURAL: descarga del modelo (~86 MB) con pantalla propia
   - Alta de perfil: pantalla completa en móvil y tarjeta en escritorio.
   - Usuario con perfil que aún no decidió: hoja inferior al iniciar sesión.
   Se puede pausar, reanudar (con Range) y saltar; saltar avisa de que la voz será menos natural.
   ============================================================ */
const VOZ_URL = "https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main/onnx/model_q8f16.onnx";
const VOZ_TAM = 86 * 1048576;   // estimación; se corrige con Content-Length
const VOZ_CACHE = "voz-natural-v1";
let vozCtl = null;       // { partes, recibidos, total, velocidad, activa, ac }
let vozModo = "", vozAlCerrar = null;

const vozLeer = () => { try { return JSON.parse(RAW_LS.getItem("voz-natural") || "{}"); } catch (e) { return {}; } };
const vozGuardar = o => { try { RAW_LS.setItem("voz-natural", JSON.stringify(o)); } catch (e) { /* sin almacenamiento: se pregunta otra vez */ } };
const vozDecidida = () => !!vozLeer().estado;

/* Llamada desde el alta: si aún no hay decisión, enseña la pantalla y luego sigue */
function vozAltaThen(seguir) {
  if (vozDecidida()) seguir();
  else vozAbrir("alta", seguir);
}
/* Llamada al arrancar: perfil activo sin decisión sobre la voz → hoja inferior */
function vozHojaSiPendiente() {
  const id = RAW_LS.getItem("perfil-activo");
  if (id && id !== "invitado" && !vozDecidida()) vozAbrir("hoja", null);
}

function vozMontar() {
  const div = document.createElement("div");
  div.innerHTML = `
<div class="voz-ov" id="vozOv" role="dialog" aria-modal="true" aria-labelledby="vozT" hidden>
  <div class="voz-card">
    <aside class="voz-pasos" id="vozPasos">
      <ol>
        <li class="ok"><span aria-hidden="true">✓</span> Cuenta creada</li>
        <li class="ok"><span aria-hidden="true">✓</span> Perfil y nivel</li>
        <li class="now" aria-current="step"><span aria-hidden="true">3</span> Voz natural</li>
      </ol>
    </aside>
    <div class="voz-main">
      <p class="voz-est" id="vozEst"></p>
      <h2 id="vozT">Voz natural en descarga</h2>
      <div class="voz-anillo" aria-hidden="true"><svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" class="voz-anillo-base"/><circle id="vozAnilloRel" cx="80" cy="80" r="70" class="voz-anillo-trazo" stroke-dasharray="439.8" stroke-dashoffset="439.8"/></svg><span id="vozAnilloTxt"></span></div>
      <p class="voz-txt">Se descarga una sola vez y queda guardada en este equipo. Puedes seguir practicando mientras tanto.</p>
      <div class="voz-bar" role="progressbar" aria-label="Progreso de la descarga" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="vozRel"></div></div>
      <p class="voz-dat" id="vozDat"></p>
      <div class="voz-acc">
        <button type="button" class="voz-b1" id="vozGo"></button>
        <button type="button" class="voz-b2" id="vozContinuar">Continuar</button>
        <button type="button" class="voz-b2" id="vozCerrar">Seguir practicando</button>
        <button type="button" class="voz-link" id="vozSaltar">Saltar por ahora</button>
      </div>
      <div class="voz-aviso" id="vozAviso" role="status" hidden>
        <strong>La escucha sonará menos natural</strong>
        Usaremos la voz de este dispositivo. Puedes descargar la voz natural más tarde desde Ajustes.
      </div>
    </div>
  </div>
</div>
<button type="button" class="voz-barra" id="vozBarra" hidden aria-label="Ver progreso de la descarga">
  <span id="vozBarraTxt"></span><span class="voz-barra-bar" aria-hidden="true"><span id="vozBarraRel"></span></span>
</button>`;
  document.body.append(...div.children);
  $("vozGo").onclick = vozBoton;
  $("vozContinuar").onclick = () => vozSalir(true);
  $("vozCerrar").onclick = () => vozMinimizar();
  $("vozSaltar").onclick = vozSaltar;
  $("vozBarra").onclick = () => vozAbrir("hoja", vozAlCerrar);
}

function vozAbrir(modo, alCerrar) {
  if (!$("vozOv")) vozMontar();
  vozModo = modo;
  if (alCerrar !== undefined && alCerrar !== null) vozAlCerrar = alCerrar;
  $("vozOv").className = "voz-ov " + modo;
  $("vozOv").hidden = false;
  $("vozBarra").hidden = true;
  $("vozPasos").style.display = modo === "alta" ? "" : "none";
  $("vozContinuar").style.display = modo === "alta" ? "" : "none";
  $("vozCerrar").style.display = modo === "hoja" ? "" : "none";
  vozPintar();
}

function vozMinimizar() {
  if (vozLeer().estado === "descargada") { vozSalir(false); return; }
  $("vozOv").hidden = true;
  $("vozBarra").hidden = false;
  vozPintar();
}

/* Cierra la pantalla. Si la descarga terminó o se decidió, sigue con el alta si hay algo pendiente */
function vozSalir(seguir) {
  $("vozOv").hidden = true;
  $("vozBarra").hidden = true;
  const f = seguir ? vozAlCerrar : null;
  vozAlCerrar = null;
  if (f) f();
}

function vozBoton() {
  const hecha = vozLeer().estado === "descargada";
  if (hecha) { vozSalir(true); return; }
  if (vozCtl && vozCtl.activa) { vozPausar(); return; }
  vozDescargar();
}

function vozPausar() {
  if (!vozCtl) return;
  vozCtl.activa = false;
  if (vozCtl.ac) vozCtl.ac.abort();
  vozPintar();
}

function vozSaltar() {
  vozPausar();
  vozGuardar({ estado: "saltada" });
  vozPintarAjustes();
  if (vozModo === "hoja") { vozSalir(false); return; }
  $("vozAviso").hidden = false;
  vozPintar();
}

async function vozDescargar() {
  if (!vozCtl) vozCtl = { partes: [], recibidos: 0, total: VOZ_TAM, velocidad: 0, activa: false, ac: null };
  const c = vozCtl;
  c.activa = true;
  c.ac = new AbortController();
  $("vozEst").textContent = "";
  vozPintar();
  let r;
  try {
    r = await fetch(VOZ_URL, { headers: c.recibidos ? { Range: "bytes=" + c.recibidos + "-" } : {}, signal: c.ac.signal });
  } catch (e) { if (c.activa) vozFallo(); return; }
  if (!r.ok) { vozFallo(); return; }
  if (r.status === 200 && c.recibidos) { c.partes = []; c.recibidos = 0; }   // el servidor no aceptó Range: empieza de cero
  if (r.status === 200) { const len = +r.headers.get("Content-Length"); if (len) c.total = len; }
  let t0 = performance.now(), b0 = c.recibidos;
  try {
    const lector = r.body.getReader();
    for (;;) {
      const { done, value } = await lector.read();
      if (done) break;
      c.partes.push(value);
      c.recibidos += value.length;
      const ahora = performance.now();
      if (ahora - t0 > 500) {
        const v = (c.recibidos - b0) / ((ahora - t0) / 1000);
        c.velocidad = c.velocidad ? 0.7 * c.velocidad + 0.3 * v : v;
        t0 = ahora; b0 = c.recibidos;
      }
      vozPintar();
    }
  } catch (e) { if (c.activa) vozFallo(); return; }
  if (c.activa && c.recibidos >= c.total) await vozTerminar();
}

async function vozTerminar() {
  const c = vozCtl;
  try {
    const cache = await caches.open(VOZ_CACHE);
    await cache.put(VOZ_URL, new Response(new Blob(c.partes, { type: "application/octet-stream" })));
    c.partes = [];
    c.activa = false;
    vozCtl = null;
    vozGuardar({ estado: "descargada", total: c.total });
    vozPintar();
    vozPintarAjustes();
  } catch (e) { vozFallo(); }
}

function vozFallo() {
  if (vozCtl) vozCtl.activa = false;
  $("vozEst").textContent = "No se pudo descargar. Revisa la conexión y vuelve a intentarlo.";
  vozPintar();
}

const vozTiempo = seg => seg >= 60
  ? Math.floor(seg / 60) + " min " + Math.round(seg % 60) + " s restantes"
  : Math.round(seg) + " s restantes";

function vozPintar() {
  if (!$("vozOv")) return;
  const c = vozCtl, est = vozLeer();
  const hecha = est.estado === "descargada", saltada = est.estado === "saltada";
  const tot = c ? c.total : (est.total || VOZ_TAM), rec = hecha ? tot : (c ? c.recibidos : 0);
  const pct = Math.min(100, Math.floor(rec / tot * 100));
  const corre = !!(c && c.activa), enPausa = !corre && rec > 0 && !hecha;
  const mb = Math.round(tot / 1048576);
  let rest = "calculando el tiempo…";
  if (hecha) rest = "completada";
  else if (corre && c.velocidad > 1000) rest = vozTiempo((tot - rec) / c.velocidad);
  else if (enPausa) rest = "en pausa";
  if (!$("vozEst").textContent.startsWith("No se pudo")) {
    $("vozEst").textContent = "Paso 3 de 3 · " + (hecha ? "lista" : corre ? "descargando" : enPausa ? "en pausa" : "lista para descargar");
  }
  $("vozRel").style.width = pct + "%";
  $("vozAnilloRel").style.strokeDashoffset = 439.8 * (1 - pct / 100);
  $("vozAnilloTxt").textContent = pct + " %";
  $("vozOv").querySelector('[role="progressbar"]').setAttribute("aria-valuenow", pct);
  $("vozDat").textContent = pct + " % · " + Math.floor(rec / 1048576) + " de " + mb + " MB · " + rest;
  $("vozGo").textContent = hecha ? "Empezar a practicar" : corre ? "Pausar" : rec > 0 ? "Reanudar" : "Descargar ahora";
  $("vozContinuar").disabled = !(hecha || saltada);
  $("vozBarraTxt").textContent = hecha ? "Voz natural lista" : (corre ? "Descargando voz natural · " : "Descarga en pausa · ") + pct + " %";
  $("vozBarraRel").style.width = pct + "%";
}

/* Ajustes: estado de la voz y acceso para descargarla cuando se quiera (también tras haber saltado) */
function vozPintarAjustes() {
  const el = document.getElementById("vozAjustes");
  if (!el) return;
  const e = vozLeer();
  const txt = e.estado === "descargada" ? "Voz natural descargada y guardada en este equipo."
    : e.estado === "saltada" ? "Ahora se usa la voz de este dispositivo. Puedes descargar la voz natural cuando quieras."
    : "Todavía no has descargado la voz natural.";
  el.innerHTML = '<h3 class="voz-aj-h">Voz natural</h3><p class="voz-aj-p">' + txt + '</p>'
    + (e.estado === "descargada" ? "" : '<button type="button" class="voz-b1 voz-aj-btn" id="vozAjusteBtn">Descargar voz natural</button>');
  const b = document.getElementById("vozAjusteBtn");
  if (b) b.onclick = () => vozAbrir("hoja", null);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", vozPintarAjustes);
else vozPintarAjustes();
