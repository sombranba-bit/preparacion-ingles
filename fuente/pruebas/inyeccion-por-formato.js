const { chromium } = require('playwright');
const M = '<img src=x onerror="1">';
const base = { level: 'A1', explain: 'e' };
const items = [
  { type: 'grammar', q: 'q' + M, options: [M, 'b'], answer: 0, explain: 'e' + M, part: 'p' + M, hint: M },
  { type: 'reading', q: 'q' + M, passage: 'p' + M, options: [M, 'b'], answer: 0, explain: 'e' + M, part: 'p' + M },
  { type: 'listening', q: 'q' + M, audio: 'a', options: [M, 'b'], answer: 1, explain: 'e' + M },
  { type: 'rephrase', q: 'q' + M, hint: M, accepted: [M], explain: 'e' + M },
  { type: 'format', format: 'order', q: 'q' + M, words: [M, 'b'], accepted: ['x'], explain: 'e' + M },
  { type: 'format', format: 'match', q: 'q' + M, pairs: [[M, 'b'], ['c', 'd']], accepted: ['x'], explain: 'e' + M },
  { type: 'format', format: 'cloze', q: 'q' + M, passage: 'x ___ ' + M, gaps: [M], accepted: [M], explain: 'e' + M },
  { type: 'format', format: 'keyword', q: 'q' + M, pre: M, post: M, kw: M, accepted: [M], explain: 'e' + M },
  { type: 'format', format: 'gapped', q: 'q' + M, paras: [M, 'b'], answers: [M], accepted: [M], explain: 'e' + M, frags: { [M]: M } },
  { type: 'format', format: 'partword', q: 'q' + M, segments: [M, 'b'], accepted: ['x'], explain: 'e' + M },
  { type: 'format', format: 'essay', q: 'q' + M, accepted: ['x'], explain: 'e' + M, hint: M, min: 1, max: 2, criteria: ['c' + M] },
  { type: 'format', format: 'speak', q: 'q' + M, accepted: ['x'], explain: 'e' + M, source: M },
];
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext()).newPage();
  await p.goto('file://' + (process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html'));
  await p.evaluate(() => { localStorage.setItem('perfiles-ingles', JSON.stringify([{ id: 'a1', name: 'Ana', avatar: {}, prefix: '' }])); localStorage.setItem('perfil-activo', 'a1'); });
  await p.reload(); await p.waitForTimeout(500);
  for (const it of items) {
    const r = await p.evaluate((it) => {
      const o = Object.assign({ level: 'A1' }, it);
      queue = [o]; index = 0; currentLevel = 'A1';
      try { renderItem(); } catch (e) { return 'ERROR ' + e.message.slice(0, 80); }
      return document.querySelectorAll('img[onerror]').length;
    }, it).catch(e => 'EVAL ' + e.message.slice(0, 60));
    console.log((it.format || it.type).padEnd(10), '->', r, 'elementos <img> inyectados');
    await p.evaluate(() => { document.querySelectorAll('img[onerror]').forEach(e => e.remove()); });
  }
  await b.close();
})();
