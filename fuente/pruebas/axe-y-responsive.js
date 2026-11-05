const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync(__dirname + '/vendor/axe.min.js', 'utf8');
const FILE = process.argv[2] || process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html';
const OUT = __dirname;
const VPS = [['320', 320, 640], ['390', 390, 844], ['768', 768, 1024], ['1280', 1280, 800]];
const res = { vistas: {}, errores: [] };
(async () => {
  const b = await chromium.launch();
  for (const [nombre, w, h] of VPS) for (const mode of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: mode === 'dark' ? 'dark' : 'light', bypassCSP: true });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push('PAGE ' + e.message));
    p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('CONSOLE ' + m.text().slice(0, 150)); });
    const t0 = Date.now();
    await p.goto('file://' + FILE); await p.waitForLoadState('load');
    const carga = Date.now() - t0;
    const clave = nombre + '-' + mode;
    const v = { carga_ms: carga, nodos_dom: await p.evaluate(() => document.querySelectorAll('*').length),
      heap_mb: await p.evaluate(() => performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null) };
    v.desborde_landing = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.screenshot({ path: `${OUT}/${clave}-portada.png`, fullPage: false });
    if (await p.isVisible('a[data-empezar]').catch(() => false)) {
      await p.click('a[data-empezar]').catch(() => {}); await p.waitForTimeout(400);
    }
    if (await p.isVisible('#pName').catch(() => false)) {
      await p.fill('#pName', 'Prueba'); await p.click('#pCreate').catch(() => {}); await p.waitForTimeout(700);
    }
    v.tabs = {};
    const tabs = await p.$$eval('button.tab', els => els.map(e => e.textContent.trim()));
    for (let i = 0; i < tabs.length; i++) {
      await p.evaluate(i => document.querySelectorAll('button.tab')[i]?.click(), i); await p.waitForTimeout(250); // también las pestañas ocultas en móvil (van en Más)
      const r = await p.evaluate(() => {
        const sm = [...document.querySelectorAll('button, a[href], input, select, textarea, [role=button]')]
          .filter(e => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
          .filter(e => { const r = e.getBoundingClientRect(); return r.width < 44 || r.height < 44; });
        return { desborde: document.documentElement.scrollWidth - innerWidth, objetivos_menores_44: sm.length,
          ejemplo: sm.slice(0, 3).map(e => (e.textContent || e.getAttribute('aria-label') || e.id || e.className).toString().trim().slice(0, 40)) };
      });
      await p.screenshot({ path: `${OUT}/${clave}-${i}.png` });
      await p.addScriptTag({ content: AXE });
      const ax = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }); return r.violations.map(x => ({ id: x.id, impacto: x.impact, n: x.nodes.length })); });
      r.axe = ax;
      v.tabs[tabs[i]] = r;
    }
    res.errores.push(...errs.map(e => clave + ': ' + e));
    res.vistas[clave] = v;
    await ctx.close();
  }
  fs.writeFileSync(`${OUT}/resultado.json`, JSON.stringify(res, null, 1));
  await b.close();
  console.log('listo');
})().catch(e => { console.error('EXC', e.message); process.exit(1); });
