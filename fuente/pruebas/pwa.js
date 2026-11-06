// Prueba del PWA. Uso: NODE_PATH=$(npm root -g) node fuente/pruebas/pwa.js http://localhost:8000/index.html
// Comprueba: manifiesto con iconos, icono de iPhone, service worker activo y que una respuesta de error no se guarda.
const { chromium } = require('playwright');
const url = process.argv[2];
if (!url) { console.error('Falta la URL'); process.exit(1); }
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
  const res = [];
  const ok = (n, c) => res.push((c ? 'OK   ' : 'FALLO ') + n);
  await p.goto(url); await p.waitForTimeout(1200);
  const man = await p.evaluate(async () => (await fetch('manifest.json')).json());
  ok('manifiesto en modo standalone', man.display === 'standalone');
  ok('manifiesto con icono maskable', (man.icons || []).some(i => /maskable/.test(i.purpose || '')));
  ok('icono de iPhone 180 px disponible', await p.evaluate(async () => (await fetch('apple-touch-icon.png')).ok));
  ok('service worker activo', await p.evaluate(async () => { const r = await navigator.serviceWorker.ready; return !!(r.active && r.active.state === 'activated'); }));
  await p.waitForTimeout(800);
  await p.route('**/index.html', r => r.fulfill({ status: 500, body: 'error' }));
  await p.evaluate(() => fetch('index.html').catch(() => {})); await p.waitForTimeout(500);
  const st = await p.evaluate(async () => { const c = await caches.open('r4e-v2'); const r = await c.match('index.html'); return r ? r.status : 0; });
  ok('una respuesta 500 no sustituye la copia buena', st === 200);
  await p.unroute('**/index.html');
  res.forEach(r => console.log(r));
  console.log(res.every(r => r.startsWith('OK')) ? 'PWA: ' + res.length + ' de ' + res.length + ' OK' : 'PWA: hay fallos');
  await b.close();
})();
