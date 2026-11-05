const { chromium } = require('playwright');
const fs=require('fs'); const file=process.argv[2]; const D=__dirname;
const casos = {
  perfil: {app:'diseno-B-cockpit',v:1,data:{'xp-ganados':'{"a":10}','ajustes-ingles':'{"monedas":true}','progreso-ingles':'{"A1|x":{"ok":1}}','perfiles-ingles':'[]'}},
  recursos_corrupta: {app:'preparacion-ingles',version:1,data:{'xp-diario':'{"2026-11-05":40}','racha-ingles':'NO_ES_JSON','liga-amigos':'[{"name":1}]','nota|A1|x':'hola'}},
  ajeno: {hola:1},
  vacia: {app:'preparacion-ingles',version:1,data:{'racha-ingles':'NO_ES_JSON'}},
};
(async()=>{const b=await chromium.launch();
for (const [nombre,obj] of Object.entries(casos)) {
  fs.writeFileSync(D+'/c-'+nombre+'.json', JSON.stringify(obj));
  const p=await (await b.newContext()).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+file); await p.waitForTimeout(400);
  await p.click('a[data-empezar]'); await p.waitForTimeout(300);
  if(await p.isVisible('#pName')){await p.fill('#pName','Prueba');await p.click('#pCreate');await p.waitForTimeout(900);}
  if(nombre==='perfil'){
    await p.evaluate(()=>document.getElementById('pImport').click());
    await p.setInputFiles('#pImportFile',D+'/c-'+nombre+'.json');
    await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>({xp:localStorage.getItem('xp-ganados'),aj:localStorage.getItem('ajustes-ingles')}));
    console.log('perfil ->', JSON.stringify(r), '| errores:', errs.join('|')||'ninguno');
  } else {
    await p.evaluate(()=>[...document.querySelectorAll('button.tab')].find(x=>/Importar/.test(x.textContent))?.click());
    await p.setInputFiles('#backupFile',D+'/c-'+nombre+'.json');
    await p.waitForTimeout(250);
    const st=await p.evaluate(()=>document.getElementById('backupStatus').textContent);
    await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>({diario:localStorage.getItem('xp-diario'),racha:localStorage.getItem('racha-ingles'),nota:localStorage.getItem('nota|A1|x')}));
    console.log(nombre,'-> estado:',JSON.stringify(st),'| guardado:',JSON.stringify(r),'| errores:',errs.join('|')||'ninguno');
  }
}
await b.close();})().catch(e=>console.log('EXC',e.message.slice(0,200)));
