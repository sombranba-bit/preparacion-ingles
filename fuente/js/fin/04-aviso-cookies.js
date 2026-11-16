/* Aviso informativo de cookies: solo almacenamiento imprescindible, así que basta con «Entendido». */
(function(){
  var KEY = 'aviso-cookies-ok';
  function visto(){ try { return localStorage.getItem(KEY) === '1'; } catch(e){ return false; } }
  function marcar(){ try { localStorage.setItem(KEY, '1'); } catch(e){} }
  if (visto()) return;
  var box = document.createElement('div');
  box.id = 'avisoCookies';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', 'Aviso de cookies');
  box.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:1000;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:#2a1d14;color:#fff8ec;font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 -4px 16px rgba(0,0,0,.2)';
  var inner = document.createElement('div');
  inner.style.cssText = 'max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between';
  var txt = document.createElement('p');
  txt.style.cssText = 'margin:0;flex:1 1 280px';
  txt.textContent = 'Usamos solo el almacenamiento que la app necesita para funcionar (tu progreso y tu sesión). No usamos cookies de seguimiento ni publicidad. ';
  var enlace = document.createElement('a');
  enlace.href = 'privacidad.html#cookies';
  enlace.textContent = 'Política de cookies';
  enlace.style.cssText = 'color:#ffd98a;font-weight:600';
  txt.appendChild(enlace);
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Entendido';
  btn.style.cssText = 'min-height:44px;min-width:120px;padding:0 18px;border:0;border-radius:10px;background:#fff8ec;color:#2a1d14;font:600 15px system-ui,sans-serif;cursor:pointer';
  btn.onclick = function(){ marcar(); box.remove(); };
  inner.appendChild(txt);
  inner.appendChild(btn);
  box.appendChild(inner);
  document.body.appendChild(box);
})();
