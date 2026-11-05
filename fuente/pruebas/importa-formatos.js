// Importa por el input real un JSON con un ejercicio malicioso por formato y un ensayo sin criteria.
const { chromium } = require('playwright');
const fs = require('fs');
const P = '<img src=x onerror="document.body.dataset.inj=1">';
const base = { level: 'A1', q: 'q' + P, explain: 'e', accepted: ['a'] };
const T = { order: 'writing', match: 'reading', cloze: 'reading', keyword: 'usage', gapped: 'reading', partword: 'reading', essay: 'writing', speak: 'speaking' };
const items = [
  { ...base, type: T['order'], format: 'order', words: ['a' + P, 'b'], accepted: ['a b'] },
  { ...base, type: T['match'], format: 'match', pairs: [[P, 'x'], ['y', 'z']] },
  { ...base, type: T['cloze'], format: 'cloze', passage: 'x ___ ' + P, gaps: ['a'] },
  { ...base, type: T['keyword'], format: 'keyword', pre: P, post: 'p', hint: P },
  { ...base, type: T['gapped'], format: 'gapped', paras: ['uno ' + P, 'dos'], answers: ['A'], frags: { [P]: 'frag' + P, B: 'b' } },
  { ...base, type: T['partword'], format: 'partword', segments: [P, { pre: P }] },
  { ...base, type: T['essay'], format: 'essay', min: 10, max: 20, criteria: [P, 'c2'], source: P },
  { ...base, type: T['speak'], format: 'speak', text: P },
  { ...base, type: T['essay'], format: 'essay', min: 10, max: 20 },
];
fs.writeFileSync(__dirname + '/importa-formatos.json', JSON.stringify(items));
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext()).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + (process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html'));
  await p.evaluate(() => { localStorage.setItem('perfiles-ingles', JSON.stringify([{ id: 'a1', name: 'Ana', avatar: {}, prefix: '' }])); localStorage.setItem('perfil-activo', 'a1'); });
  await p.reload(); await p.waitForTimeout(500);
  await p.setInputFiles('#importFile', __dirname + '/importa-formatos.json');
  await p.waitForTimeout(400);
  console.log('estado:', await p.textContent('#importStatus'));
  const r = await p.evaluate(() => {
    const imp = ITEMS.filter(i => i.q && String(i.q).includes('<img')).length;
    const out = {};
    const fmts = ['order','match','cloze','keyword','gapped','partword','essay','speak'];
    for (const f of fmts) {
      const it = ITEMS.filter(i => i.format === f && i.level === 'A1' && i.q && String(i.q).startsWith('q<img')).slice(-1)[0];
      if (!it) { out[f] = 'no importado'; continue; }
      document.querySelectorAll('img[src="x"]').forEach(e => e.remove());
      queue = [it]; index = 0; currentLevel = 'A1';
      try { renderItem(); const n = document.querySelectorAll('img[src="x"]').length; out[f] = n ? 'INSERTA ' + n + ' <img>' : 'ok'; }
      catch (e) { out[f] = 'ERROR ' + e.message; }
    }
    return { imp, out };
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('errores de página:', errs.join(' | ') || 'ninguno');
  await b.close();
})();
