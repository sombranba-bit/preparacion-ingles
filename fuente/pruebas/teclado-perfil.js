// Formulario de perfil con el teclado abierto: simula una ventana visible de 55% de alto
// (el iPhone reduce la ventana visual al abrir el teclado) y comprueba que "Crear perfil"
// queda dentro de esa zona y se puede pulsar.
const { chromium, devices } = require('playwright');
const HTML = process.env.HTML || process.argv[2] || '../../diseno-B-cockpit.html';
(async () => {
  const b = await chromium.launch();
  let ok = true;
  for (const dev of ['iPhone 13', 'Pixel 7']) {
    const ctx = await b.newContext({ ...devices[dev] });
    const p = await ctx.newPage(); const errores = []; p.on('pageerror', e => errores.push(e.message));
    // Sin perfiles la app abre directamente el formulario de creación (entrada sin pasar por la portada)
    await p.addInitScript(() => { try { sessionStorage.setItem('entro', '1'); } catch (e) {} });
    await p.goto('file://' + require('path').resolve(HTML)); await p.waitForTimeout(900);
    await p.evaluate(() => { document.getElementById('landing')?.classList.add('lp-off'); document.body.classList.remove('lp-open'); }); await p.waitForTimeout(300);
    await p.evaluate(() => { const el = document.getElementById('profiles'); const h = Math.round(innerHeight * 0.55); el.style.top = '0px'; el.style.height = h + 'px'; const i = document.getElementById('pName'); i.value = 'Prueba'; i.focus(); });
    await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const b = document.getElementById('pCreate'); const r = b.getBoundingClientRect();
      const zona = document.getElementById('profiles').getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const arriba = document.elementFromPoint(cx, cy);
      return { visible: r.bottom <= zona.bottom && r.top >= zona.top, pulsable: !!arriba && (arriba === b || b.contains(arriba)) };
    });
    const pasa = r.visible && r.pulsable && errores.length === 0;
    ok = ok && pasa;
    console.log(`${pasa ? 'OK  ' : 'FAIL'} [${dev}] "Crear perfil" visible con teclado y pulsable${errores.length ? ' | errores: ' + errores.join('; ') : ''}`);
    await ctx.close();
  }
  await b.close();
  process.exit(ok ? 0 : 1);
})();
