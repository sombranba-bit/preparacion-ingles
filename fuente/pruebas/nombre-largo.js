const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const largo = 'Supercalifragilisticoexpialidocioso'.repeat(4) + ' ' + 'x'.repeat(40);
  for (const w of [320, 390]) {
    const p = await (await b.newContext({ viewport: { width: w, height: 700 } })).newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('file://' + (process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html'));
    await p.evaluate(n => { localStorage.setItem('perfiles-ingles', JSON.stringify([{ id: 'a1', name: n, avatar: {}, prefix: '' }])); localStorage.setItem('perfil-activo', 'a1'); }, largo);
    await p.evaluate(() => sessionStorage.setItem('entro','1')); await p.reload(); await p.waitForTimeout(700);
    const r = await p.evaluate(() => ({ desborde: document.documentElement.scrollWidth - innerWidth, saludo: (document.body.innerText.match(/Bienvenid[^\n]{0,80}/) || [''])[0] }));
    console.log('nombre largo', w + 'px:', JSON.stringify(r), '| errores:', errs.join('|') || 'ninguno');
    await p.screenshot({ path: `${__dirname}/largo-${w}.png` });
  }
  await b.close();
})();
