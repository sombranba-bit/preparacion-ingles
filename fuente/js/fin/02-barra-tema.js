import { LEVELS, currentLevel, ico, lc, renderLevels } from "../01-nucleo-niveles-audio.js";
import { ajustesGet, ajustesSet, renderHome } from "../04-recompensas-logros-copia-auto.js";
(function(){
  var root = document.documentElement, KM = 'ui-mode-B';
  function gs(k,d){ try { return localStorage.getItem(k) || d; } catch(e){ return d; } }
  function ss(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  var mode = gs(KM, root.dataset.mode);
  if (mode !== 'dark' && mode !== 'light') mode = root.dataset.mode;
  root.dataset.mode = mode; try { renderLevels(); renderHome(); } catch(e){}
  var bar = document.createElement('details'); bar.id = 'themeBar';
  var bsum = document.createElement('summary'); bsum.textContent = 'Modo'; bar.appendChild(bsum);
  var mb = document.createElement('button'); mb.id = 'modoBtn';
  function paintMode(){ mb.innerHTML = root.dataset.mode === 'dark' ? ico('sun', 16) + ' Modo claro' : ico('moon', 16) + ' Modo oscuro'; }
  mb.onclick = function(){ root.dataset.mode = root.dataset.mode === 'dark' ? 'light' : 'dark'; ss(KM, root.dataset.mode); paint(); try { renderLevels(); renderHome(); var hc=document.getElementById('heroCard'); if(hc) hc.style.setProperty('--lvl-color', lc(LEVELS[currentLevel])); var ex=document.getElementById('exercise'); if(ex) ex.style.setProperty('--lvl-color', lc(LEVELS[currentLevel])); } catch(e){} };
  var l = document.createElement('div'); l.className = 'theme-lbl'; l.textContent = 'Modo'; bar.appendChild(l);
  bar.appendChild(mb);
  var ab = document.createElement('button');
  function paintAj(){ ab.innerHTML = ico('coin', 16) + (ajustesGet().monedas === false ? ' Mostrar +1 al acertar: no' : ' Mostrar +1 al acertar: sí'); }
  ab.onclick = function(){ var a = ajustesGet(); a.monedas = a.monedas === false; ajustesSet(a); paintAj(); };
  paintAj(); bar.appendChild(ab);

  function paint(){ paintMode(); }
  paint();
  bar.open = innerWidth > 820;
  document.querySelector('#p-perfil .perfil-der').appendChild(bar);
})();
