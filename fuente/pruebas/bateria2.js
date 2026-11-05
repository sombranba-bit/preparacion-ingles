const { chromium } = require('playwright');
const fs = require('fs');
const file = process.argv[2];
const out = [];
const ok = (n, c, d='') => out.push((c ? 'OK   ' : 'FAIL ') + n + (d ? ' — ' + d : ''));
const safe = async (n, fn) => { try { return await fn(); } catch (e) { ok(n, false, e.message.split('\n')[0].slice(0,140)); return null; } };
(async () => {
  const b = await chromium.launch();
  for (const [label, vp] of [['escritorio', {width:1280,height:800}], ['movil', {width:390,height:844}]]) {
    const ctx = await b.newContext({ viewport: vp, acceptDownloads: true });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('console', m => { if (m.type()==='error' && !/Failed to load resource/.test(m.text())) errs.push(m.text().slice(0,160)); });
    await p.goto('file://' + file); await p.waitForTimeout(500);
    await safe('pulsar Empezar', async () => { await p.click('a[data-empezar]', {timeout:3000}); await p.waitForTimeout(400); });
    await safe('crear perfil', async () => { if (await p.isVisible('#pName')) { await p.fill('#pName','Prueba'); await p.click('#pCreate'); await p.waitForTimeout(900); } });
    if (await p.isVisible('a[data-empezar]').catch(()=>false)) await safe('reentrar', async () => { await p.click('a[data-empezar]'); await p.waitForTimeout(500); });
    ok(`[${label}] sin scroll horizontal`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    const tabs = await p.$$eval('#bnav button, #subtabs .subtab', els => els.map(e => e.textContent.trim()));
    ok(`[${label}] pestañas: ${tabs.length}`, tabs.length >= 5, tabs.join(', '));
    for (const t of tabs) {
      await safe(`abrir ${t}`, () => p.evaluate(tt => [...document.querySelectorAll('#bnav button, #subtabs .subtab')].find(x => x.textContent.trim()===tt)?.click(), t));
      await p.waitForTimeout(120);
    }
    ok(`[${label}] recorrer pestañas sin error`, errs.length===0, errs.join(' | '));
    await safe('ir a Ejercicios', () => p.evaluate(() => [...document.querySelectorAll('#bnav button, #subtabs .subtab')].find(x => /Ejercicios/.test(x.textContent))?.click()));
    await p.waitForTimeout(200);
    await safe('nivel B1', () => p.evaluate(() => [...document.querySelectorAll('button.lvl')].find(x => /B1/.test(x.textContent))?.click()));
    await safe('sección', () => p.evaluate(() => { const c=document.querySelector('#sectionGrid button, #sectionGrid a'); c&&c.click(); }));
    await p.waitForSelector('#options .option, #options .fmt-btn, #options input, #options textarea', { timeout: 3000 }).catch(()=>{});
    const nOpt = await p.$$eval('#options .option, #options .fmt-btn, #options input, #options textarea', e=>e.length);
    ok(`[${label}] opciones visibles: ${nOpt}`, nOpt>0);
    if (nOpt) {
      await safe('elegir opción', () => p.evaluate(() => document.querySelector('#options .option').click()));
      await safe('comprobar', () => p.evaluate(() => { const b=document.getElementById('checkBtn'); if(b&&!b.disabled) b.click(); }));
      await p.waitForTimeout(300);
      await safe('siguiente', () => p.evaluate(() => { const b=document.getElementById('nextBtn'); if(b&&!b.disabled) b.click(); }));
      await p.waitForTimeout(200);
    }
    await safe('modo claro/oscuro', async () => {
      const antes = await p.evaluate(() => document.documentElement.dataset.mode);
      await p.evaluate(() => { const d=document.querySelector('details'); if(d) d.open=true; });
      await p.evaluate(() => document.getElementById('modoBtn').click());
      await p.waitForTimeout(200);
      const des = await p.evaluate(() => document.documentElement.dataset.mode);
      ok(`[${label}] alternar modo ${antes}→${des}`, antes!==des);
    });
    ok(`[${label}] sin errores de JavaScript en el recorrido`, errs.length===0, errs.join(' | '));
    await ctx.close();
  }
  const ctx = await b.newContext({ acceptDownloads: true });
  const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e=>errs.push(e.message));
  await p.goto('file://' + file); await p.waitForTimeout(400);
  await safe('perfil copias', async () => { await p.click('a[data-empezar]'); await p.waitForTimeout(400); if (await p.isVisible('#pName')) { await p.fill('#pName','Prueba'); await p.click('#pCreate'); await p.waitForTimeout(900); } });
  await safe('exportar', async () => {
    await p.evaluate(() => document.getElementById('pExport').click()); // abre perfil
  });
  const dlPromise = p.waitForEvent('download', {timeout:4000}).catch(()=>null);
  await safe('click exportar', () => p.evaluate(() => { const e=document.getElementById('pExport'); e && e.click(); }));
  const dl = await dlPromise;
  ok('exportar progreso descarga fichero', !!dl, dl ? dl.suggestedFilename() : 'sin descarga');
  if (dl) { const fp = __dirname + '/export.json'; await dl.saveAs(fp); const j = JSON.parse(fs.readFileSync(fp,'utf8'));
    ok('formato copia Perfil = diseno-B-cockpit', j.app==='diseno-B-cockpit', j.app); }
  ok('sin errores en copias', errs.length===0, errs.join(' | '));
  console.log(out.join('\n'));
  await b.close();
})().catch(e => { console.log('EXCEPCION', e.message.slice(0,300)); process.exit(1); });
