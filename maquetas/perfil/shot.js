const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const f of ['M1-ajustes-en-lista','M2-cabina','M3-pestanas']) for (const w of [1280, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto('file://' + __dirname + '/' + f + '.html', { waitUntil: 'load', timeout: 15000 });
    await p.screenshot({ path: `/tmp/claude-0/-home-claude/7e1a5249-a09d-5092-a76c-483cff152172/scratchpad/${f}-${w}.png`, fullPage: true });
  }
  await b.close();
})();
