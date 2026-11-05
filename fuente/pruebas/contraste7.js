const { chromium } = require('playwright');
const file=process.argv[2];
(async()=>{const b=await chromium.launch();
const combos=[['noche','dark'],['noche','light'],['grafito','dark'],['grafito','light'],['crema','light']];
for(const [pal,mode] of combos){
 const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
 await p.goto('file://'+file);await p.waitForTimeout(300);
 await p.evaluate(()=>{localStorage.setItem('perfiles-ingles','[{"id":"a1","name":"Prueba","avatar":{},"prefix":""}]');localStorage.setItem('perfil-activo','a1');});
 await p.evaluate(([pal,mode])=>{localStorage.setItem('ui-pal-B',pal);localStorage.setItem('ui-mode-B',mode);},[pal,mode]);
 await p.reload();await p.waitForTimeout(400);
 if(await p.isVisible('a[data-empezar]').catch(()=>false)){await p.click('a[data-empezar]');await p.waitForTimeout(400);}
 await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true)});
 const res=await p.evaluate(()=>{
  const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return {r:v[0],g:v[1],b:v[2],a:v.length>3?v[3]:1}};
  const lum=({r,g,b})=>{const f=x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
  const bgOf=el=>{let e=el;while(e){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0.9)return c;e=e.parentElement}return {r:255,g:255,b:255,a:1}};
  const out=[];const seen=new Set();
  document.querySelectorAll('body *').forEach(el=>{
    if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')return;
    const t=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');
    if(!t)return;const cs=getComputedStyle(el);if(parseFloat(cs.opacity)<0.5)return;
    const fg=parse(cs.color);const bg=bgOf(el);if(!fg)return;
    const L1=lum(fg),L2=lum(bg);const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const key=t.slice(0,30)+'|'+cs.color+'|'+bg.r+bg.g+bg.b;
    if(seen.has(key))return;seen.add(key);
    const grande=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&parseInt(cs.fontWeight)>=700);
    const min=grande?4.5:7;
    if(ratio<min)out.push({t:t.slice(0,40),r:ratio.toFixed(2),need:min,fg:cs.color,bg:`rgb(${bg.r},${bg.g},${bg.b})`,cls:(el.className&&el.className.baseVal===undefined?el.className:'').toString().slice(0,40)});
  });
  return out;});
 console.log(`== ${pal} ${mode}: ${res.length} por debajo`);
 res.slice(0,25).forEach(r=>console.log('  ',r.r+':1 (min '+r.need+')',JSON.stringify(r.t),r.fg,'sobre',r.bg,'.'+r.cls));
 await p.close();}
await b.close();})().catch(e=>console.log('EXC',e.message.slice(0,300)));
