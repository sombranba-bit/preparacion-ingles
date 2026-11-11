import { activeProfile } from "./03-perfiles.js";
// Efectos de píxel para la tienda: ráfagas y lluvias en un lienzo fijo. Dibujos propios, inspirados en la idea
// de pixelfx (patch-gg, MIT); no copian su código.
const PIXEL_COLS = ["#ff7a9c", "#ffb22e", "#8fe3ff", "#7bc96a", "#a57bff", "#ffd166"];
const PIXEL_EVENTOS = { acierto: "pixel-acierto", racha: "pixel-racha", logro: "pixel-logro", sesion: "pixel-sesion" };
const PIXEL_FORMAS = {
  corazon: ["01100110", "11111111", "11111111", "11111111", "01111110", "00111100", "00011000", "00000000"],
  trofeo: ["11111110", "11111110", "01111100", "00111000", "00010000", "00010000", "00111000", "01111100"]
};
const pixelAzar = a => a[Math.floor(Math.random() * a.length)];

// Dibuja una forma de bitmap en píxeles grandes (cada celda, un cuadrado)
function pixelForma(x, y, forma, c, celda) {
  forma.forEach((fila, j) => [...fila].forEach((v, i) => { if (v === "1") { x.fillStyle = c; x.fillRect(i * celda, j * celda, celda, celda); } }));
}

// Lienzo fijo sobre la app que se borra al terminar; respeta movimiento reducido
function pixelFx(tipo) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
  const c = document.createElement("canvas"); c.className = "fx-screen";
  c.width = W * dpr; c.height = H * dpr; c.style.width = W + "px"; c.style.height = H + "px";
  document.body.appendChild(c);
  const x = c.getContext("2d"); x.scale(dpr, dpr);
  const ps = [], dur = { acierto: 1.2, racha: 2, logro: 2.4, sesion: 2.6 }[tipo];
  // Estado inicial de cada partícula, según el tipo de efecto
  if (tipo === "acierto") for (let i = 0; i < 28; i++) { const a = Math.random() * 6.28, v = 180 + Math.random() * 260; ps.push({ x: W / 2, y: H * 0.45, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120, c: pixelAzar(PIXEL_COLS) }); }
  if (tipo === "racha") for (let i = 0; i < 14; i++) ps.push({ x: Math.random() * W, y: H + Math.random() * 120, t0: Math.random() * 0.8, c: pixelAzar(PIXEL_COLS) });
  if (tipo === "sesion") for (let i = 0; i < 70; i++) ps.push({ x: Math.random() * W, y: -Math.random() * H * 0.5, v: 160 + Math.random() * 180, t0: Math.random() * 1.2, c: pixelAzar(PIXEL_COLS) });
  const t0 = performance.now();
  const tick = now => {
    const s = (now - t0) / 1000;
    x.clearRect(0, 0, W, H);
    if (s >= dur) { c.remove(); return; }
    if (tipo === "acierto") ps.forEach(p => { const k = s; x.globalAlpha = 1 - s / dur; x.fillStyle = p.c; x.fillRect(p.x + p.vx * k - 3, p.y + p.vy * k + 300 * k * k - 3, 6, 6); });
    if (tipo === "racha") ps.forEach(p => { const k = s - p.t0; if (k < 0) return; x.globalAlpha = Math.min(1, k * 2) * (1 - Math.max(0, k - 1.4) / 0.6); x.save(); x.translate(p.x - 12, H - 240 * k * 0.9 - 40 * k * k * 0); pixelForma(x, 0, PIXEL_FORMAS.corazon, p.c, 3); x.restore(); });
    if (tipo === "logro") { const e = Math.min(1, s * 3); x.globalAlpha = Math.max(0, 1 - Math.max(0, s - 1.8) / 0.6); x.save(); x.translate(W / 2 - 32 * e, H * 0.8 - 32 * e); x.scale(e, e); pixelForma(x, 0, PIXEL_FORMAS.trofeo, "#ffd166", 8); x.restore(); }
    if (tipo === "sesion") ps.forEach(p => { const k = s - p.t0; if (k < 0) return; x.globalAlpha = 0.9; x.fillStyle = p.c; const y = p.y + p.v * k; if (y < H) x.fillRect(p.x, y, 5, 5); });
    x.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Un evento solo muestra su efecto si el avatar activo lo tiene comprado y activado
export function celebrarEvento(tipo) {
  const p = activeProfile(), f = (p && p.avatar && p.avatar.efectos) || [];
  if (f.includes(PIXEL_EVENTOS[tipo])) pixelFx(tipo);
}
