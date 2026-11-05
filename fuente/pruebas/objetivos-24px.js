const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w, tab] of [[390, 'Inicio'], [768, 'Recursos'], [390, 'Recursos']]) {
    const p = await (await b.newContext({ viewport: { width: w, height: 844 } })).newPage();
    await p.goto('file://' + (process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html')); await p.waitForTimeout(300);
    await p.evaluate(() => { sessionStorage.setItem('entro', '1'); });
    if (await p.isVisible('a[data-empezar]').catch(() => false)) { await p.click('a[data-empezar]'); await p.waitForTimeout(300); }
    if (await p.isVisible('#pName').catch(() => false)) { await p.fill('#pName', 'Prueba'); await p.click('#pCreate'); await p.waitForTimeout(600); }
    await p.evaluate(tt => [...document.querySelectorAll('button.tab')].find(x => x.textContent.includes(tt))?.click(), tab); await p.waitForTimeout(250);
    const r = await p.evaluate(() => [...document.querySelectorAll('button, a[href], input, select, [role=button]')]
      .filter(e => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && Math.min(r.width, r.height) < 24; })
      .map(e => ({ tag: e.tagName, cls: e.className.toString().slice(0, 50), id: e.id, txt: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) })));
    console.log(w, tab, JSON.stringify(r.slice(0, 12)));
  }
  await b.close();
})();
