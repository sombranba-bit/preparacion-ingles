const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://' + (process.env.HTML || '/mnt/attach/outputs/diseno-B-cockpit.html'));await p.waitForTimeout(400);
await p.click('a[data-empezar]');await p.waitForTimeout(300);
if(await p.isVisible('#pName').catch(()=>false)){await p.fill('#pName','Prueba');await p.click('#pCreate');await p.waitForTimeout(800);}
if(await p.isVisible('a[data-empezar]').catch(()=>false)){await p.click('a[data-empezar]');await p.waitForTimeout(400);}
const foco=[];
for(let i=0;i<14;i++){await p.keyboard.press('Tab');foco.push(await p.evaluate(()=>{const e=document.activeElement;const cs=getComputedStyle(e);return {t:(e.innerText||e.getAttribute('aria-label')||e.tagName).trim().slice(0,22), vis: cs.outlineStyle!=='none' || cs.boxShadow!=='none'}}));}
console.log('teclado:', foco.map(f=>f.t+(f.vis?'✓':'✗')).join(' | '));
const anim=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);return e?getComputedStyle(e).animationIterationCount:'-'};return {mascota:q('.mascot-btn'), progreso:getComputedStyle(document.querySelector('.progress>div')||document.body,'::after').animationName, lvl:getComputedStyle(document.querySelector('.lvl[aria-pressed="true"]')||document.body,'::after').animationName}});
console.log('bucles restantes:', JSON.stringify(anim));
console.log('errores JS:', errs.join('|')||'ninguno');
await b.close();})();
