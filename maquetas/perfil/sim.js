(function(){
  var root=document.documentElement;
  var toastEl=document.getElementById('toast');
  function toast(t){ if(!toastEl) return; toastEl.textContent=t; toastEl.classList.add('on'); clearTimeout(toastEl._t); toastEl._t=setTimeout(function(){toastEl.classList.remove('on');},1800); }
  // Segmented controls: one pressed per group
  document.querySelectorAll('.seg').forEach(function(g){
    g.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      if(g.dataset.theme!==undefined){ root.dataset.theme=b.dataset.v; }
      if(g.dataset.lang) toast('Idioma: '+b.textContent);
    });
  });
  // Color swatches
  document.querySelectorAll('.sw').forEach(function(g){
    g.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      var c=b.dataset.c; document.querySelectorAll('[data-hero]').forEach(function(h){h.style.background=c;});
      toast('Color de fondo cambiado');
    });
  });
  // Avatars: unlocked select, locked show cost
  document.querySelectorAll('.avs').forEach(function(g){
    g.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      if(b.classList.contains('lock')){ toast('Bloqueado: cuesta '+b.dataset.cost+' monedas'); return; }
      g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      document.querySelectorAll('[data-hero-emoji]').forEach(function(h){h.textContent=b.dataset.e;});
      document.querySelectorAll('[data-hero-name]').forEach(function(h){h.textContent=b.dataset.n;});
      toast('Personaje: '+b.dataset.n);
    });
  });
  // Danger: open inline confirm, never destructive here
  document.querySelectorAll('[data-danger]').forEach(function(b){
    b.addEventListener('click',function(){ var box=document.getElementById(b.dataset.danger); if(box) box.classList.add('open'); });
  });
  document.querySelectorAll('[data-cancel]').forEach(function(b){
    b.addEventListener('click',function(){ b.closest('.confirm').classList.remove('open'); });
  });
  document.querySelectorAll('[data-ok]').forEach(function(b){
    b.addEventListener('click',function(){ b.closest('.confirm').classList.remove('open'); toast('Demo: aquí se borraría (no hace nada en la maqueta)'); });
  });
  document.querySelectorAll('[data-toast]').forEach(function(b){
    b.addEventListener('click',function(){ toast(b.dataset.toast); });
  });
  // Tabs (M3) and accordion (M1)
  document.querySelectorAll('[role=tablist]').forEach(function(tl){
    tl.addEventListener('click',function(e){ var b=e.target.closest('[role=tab]'); if(!b) return;
      tl.querySelectorAll('[role=tab]').forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false');});
      document.querySelectorAll('[data-panel]').forEach(function(p){ p.classList.toggle('hide', p.dataset.panel!==b.dataset.tab); });
    });
  });
  document.querySelectorAll('[data-acc]').forEach(function(b){
    b.addEventListener('click',function(){ var p=document.getElementById(b.dataset.acc); var open=p.classList.toggle('hide')===false; b.setAttribute('aria-expanded',open?'true':'false'); });
  });
})();
