// Prueba del premio por tiempo de estudio (+3 monedas tras 20 min activos; pausas de hasta 3 min).
// Uso: node fuente/pruebas/tiempo-estudio.js [ruta a web/index.html]
const { chromium } = require('playwright');
const path = require('path');
const file = process.argv[2] || path.resolve(__dirname, '../../web/index.html');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + file);
  await p.waitForTimeout(600);
  const r = await p.evaluate(() => {
    const real = Date.now; let t = real(); Date.now = () => t;
    const out = {};
    const c0 = rewards().coins;
    premioTiempo(); for (let i = 0; i < 21; i++) { t += 60000; premioTiempo(); }
    out.seguidos = rewards().coins - c0;               // esperado 3
    const c1 = rewards().coins;
    premioTiempo(); for (let i = 0; i < 7; i++) { t += 4 * 60000; premioTiempo(); }
    out.pausasLargas = rewards().coins - c1;           // esperado 0 (ya pagado hoy con tope de 2)
    Date.now = real;
    return out;
  });
  const ok = r.seguidos === 3;
  console.log(ok ? 'OK ' : 'FAIL ', JSON.stringify(r));
  await b.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('EXCEPCION', e.message); process.exit(1); });
