import { LEVELS, currentLevel, ico, lc, renderLevels } from "../01-nucleo-niveles-audio.js";
import { ajustesGet, ajustesSet, renderHome } from "../04-recompensas-logros-copia-auto.js";
(function(){
  var PALS = {"noche": ["Noche turquesa", "#5eead4"], "crema": ["Crema menta", "#0b5f4f"], "grafito": ["Grafito ámbar", "#fbbf24"]};
  var SOLO_CLARO = ["noche", "crema"];
  var root = document.documentElement, KP = 'ui-pal-B', KM = 'ui-mode-B';
  function gs(k,d){ try { return localStorage.getItem(k) || d; } catch(e){ return d; } }
  function ss(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  var pal = gs(KP, root.dataset.pal), mode = gs(KM, root.dataset.mode);
  if (!PALS[pal]) pal = root.dataset.pal;
  if (mode !== 'dark' && mode !== 'light') mode = root.dataset.mode;
  if (mode === 'dark' && SOLO_CLARO.indexOf(pal) >= 0) pal = 'grafito';
  root.dataset.pal = pal; root.dataset.mode = mode; try { renderLevels(); renderHome(); } catch(e){}
  var bar = document.createElement('details'); bar.id = 'themeBar';
  var bsum = document.createElement('summary'); bsum.textContent = 'Modo y paleta'; bar.appendChild(bsum);
  var mb = document.createElement('button'); mb.id = 'modoBtn';
  function paintMode(){ mb.innerHTML = root.dataset.mode === 'dark' ? ico('sun', 16) + ' Modo claro' : ico('moon', 16) + ' Modo oscuro'; }
  mb.onclick = function(){ root.dataset.mode = root.dataset.mode === 'dark' ? 'light' : 'dark'; if (root.dataset.mode === 'light') root.dataset.pal = gs('ui-pal-light', 'noche'); ss(KM, root.dataset.mode); paint(); try { renderLevels(); renderHome(); var hc=document.getElementById('heroCard'); if(hc) hc.style.setProperty('--lvl-color', lc(LEVELS[currentLevel])); var ex=document.getElementById('exercise'); if(ex) ex.style.setProperty('--lvl-color', lc(LEVELS[currentLevel])); } catch(e){} };
  var l = document.createElement('div'); l.className = 'theme-lbl'; l.textContent = 'Modo'; bar.appendChild(l);
  bar.appendChild(mb);
  var ab = document.createElement('button');
  function paintAj(){ ab.innerHTML = ico('coin', 16) + (ajustesGet().monedas === false ? ' Mostrar +1 al acertar: no' : ' Mostrar +1 al acertar: sí'); }
  ab.onclick = function(){ var a = ajustesGet(); a.monedas = a.monedas === false; ajustesSet(a); paintAj(); };
  paintAj(); bar.appendChild(ab);

  var l = document.createElement('div'); l.className = 'theme-lbl'; l.textContent = 'Paleta'; bar.appendChild(l);
  var pbs = [];
  Object.keys(PALS).forEach(function(id){
    var b = document.createElement('button'); b.dataset.p = id; b.style.setProperty('--pc', PALS[id][1]);
    b.innerHTML = '<span class="dot" style="background:' + PALS[id][1] + '"></span>' + PALS[id][0];
    b.onclick = function(){ root.dataset.pal = id; ss(KP, id); try { renderLevels(); renderHome(); } catch(e){} paint(); };
    pbs.push(b); bar.appendChild(b);
  });
  function paint(){
    if (root.dataset.mode === 'dark' && SOLO_CLARO.indexOf(root.dataset.pal) >= 0) { root.dataset.pal = 'grafito'; ss(KP, 'grafito'); try { renderLevels(); renderHome(); } catch(e){} }
    if (root.dataset.mode === 'light') ss('ui-pal-light', root.dataset.pal);
    paintMode();
    pbs.forEach(function(b){ var oculta = SOLO_CLARO.indexOf(b.dataset.p) >= 0 && root.dataset.mode === 'dark'; b.style.display = oculta ? 'none' : ''; b.hidden = oculta; b.setAttribute('aria-pressed', b.dataset.p === root.dataset.pal ? 'true' : 'false'); });
  }
  paint();
  bar.open = innerWidth > 820;
  document.getElementById('p-perfil').appendChild(bar);
})();
