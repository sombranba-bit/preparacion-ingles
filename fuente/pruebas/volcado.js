const { chromium } = require('playwright');
const [,, file, out] = process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+file);await p.waitForTimeout(600);
const j=await p.evaluate(()=>JSON.stringify(ITEMS));
require('fs').writeFileSync(out,j);
console.log(out.split('/').pop(), 'items:', JSON.parse(j).length, 'errores:', errs.join('|')||'ninguno');
await b.close();})();
