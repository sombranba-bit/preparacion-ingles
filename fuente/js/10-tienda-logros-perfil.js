// Tienda, Sellos y Perfil (pestañas nuevas). Usan el motor existente: monedas, accesorios, perfiles y logros.
// Los marcos y efectos son accesorios nuevos del avatar: se guardan en el perfil activo y viajan con la copia de seguridad.
import { $, ico } from "./01-nucleo-niveles-audio.js";
import { rewards, saveRewards, spendCoins, accOwned, logrosHtml, ACC_PRECIO } from "./04-recompensas-logros-copia-auto.js";
import { celebrate } from "./05-formatos-pdf-restaurar-copia.js";
import { getProfiles, saveProfiles, activeProfile, avatarSvg, P_ACCS, P_ANIMALS, accList, profileOpenList, profileSetMode } from "./03-perfiles.js";
import { xpTotal, rankInfo, infoSellosHtml } from "./02-progreso-xp-racha-mascota.js";

/* ---------- Catálogo de marcos y efectos (precios de la maqueta D4) ---------- */
const T_MARCOS = [
  { k: "m-sencillo", nombre: "Marco sencillo", desc: "Borde liso", precio: 0 },
  { k: "m-hojas", nombre: "Hojas", desc: "Hojas que caen despacio", precio: 0 },
  { k: "m-dorado", nombre: "Marco dorado", desc: "Borde dorado fijo", precio: 350 },
  { k: "m-arcoiris", nombre: "Marco arcoíris", desc: "Anillo de colores que gira", precio: 500 },
  { k: "m-estrellas", nombre: "Estrellas", desc: "Estrellas que orbitan", precio: 300 },
  { k: "m-llamas", nombre: "Llamas", desc: "Brasas que suben", precio: 400 },
  { k: "m-nieve", nombre: "Nieve", desc: "Copos que caen", precio: 350 },
  { k: "m-burbujas", nombre: "Burbujas", desc: "Burbujas que suben", precio: 300 },
  { k: "m-cosmico", nombre: "Cósmico", desc: "Dos órbitas de luz", precio: 500 }
];
const T_EFECTOS = [
  { k: "e-aura", nombre: "Aura", desc: "Halo cálido que respira", precio: 250 },
  { k: "e-vivo", nombre: "Vivo", desc: "Rebote suave, como si respirara", precio: 200 }
];
const MARCO_COL = { sencillo: "#2a1d14", hojas: "#18a58a", dorado: "#ffb22e", arcoiris: "#ffd166", estrellas: "#ffd166", llamas: "#ff7a3d", nieve: "#4aa8ff", burbujas: "#5fd6ff", cosmico: "#a57bff" };
const ACC_DESC = "Accesorio para tu avatar";
const accPagados = () => P_ACCS.filter(x => x[0] !== "ninguno").map(([k, nombre]) => ({ k, nombre, desc: ACC_DESC, precio: ACC_PRECIO }));
const todosLosItems = () => [...T_MARCOS, ...T_EFECTOS, ...accPagados()];
const fdeSemana = () => { const x = new Date().getDay(); return x === 0 || x === 6; };

// Dos ofertas al día (30 %) entre lo que se puede comprar; cambian cada medianoche
export function ofertasHoy() {
  const pool = todosLosItems().filter(it => it.precio > 0), d = Math.floor(Date.now() / 864e5), n = pool.length;
  return [pool[d % n].k, pool[(d + 5) % n].k];
}
export function tiendaPrecio(it) {
  const oferta = ofertasHoy().includes(it.k) && it.precio > 0;
  let final = oferta ? Math.round(it.precio * 0.7) : it.precio;
  if (fdeSemana() && final > 0) final = Math.round(final * 0.9);
  return { base: it.precio, final, oferta };
}
function tiendaPoseido(it) {
  if (it.precio === 0) return true;
  if (it.k.startsWith("m-") || it.k.startsWith("e-")) return (rewards().owned || []).includes(it.k);
  return accOwned(it.k);
}
function tiendaPuesto(it, av) {
  if (it.k.startsWith("m-")) return av.marco === it.k;
  if (it.k.startsWith("e-")) return (av.efectos || []).includes(it.k);
  return accList(av.acc).includes(it.k);
}
const avActivo = () => { const p = activeProfile(); return p ? p.avatar : { animal: "leon", color: "#1c7ed6", acc: [] }; };

/* ---------- Marcos: envoltorio del avatar y partículas ---------- */
// Lo llama avatarSvg (03-perfiles): envuelve el avatar con su marco y sus efectos
export function marcoEnvoltorio(base, av, size) {
  const m = av.marco || "", tipo = m.startsWith("m-") ? m.slice(2) : "";
  const fx = (av.efectos || []).map(e => "fx-" + e.slice(2)).join(" ");
  const col = MARCO_COL[tipo] || "#2a1d14";
  return `<span class="fr ${tipo ? "fr-" + tipo : ""} ${fx}" data-tipo="${tipo}" style="--mc:${col};width:${size}px;height:${size}px">${base}</span>`;
}
const PARTICULAS = { hojas: 1, estrellas: 1, llamas: 1, nieve: 1, burbujas: 1, cosmico: 1 };
// Se activa cada marco de partículas cuando aparece en pantalla (y deja de dibujar al salir del DOM)
function activarMarcos(raiz) {
  const nodos = raiz.matches && raiz.matches(".fr[data-tipo]") ? [raiz] : [];
  (raiz.querySelectorAll ? raiz.querySelectorAll(".fr[data-tipo]") : []).forEach(n => nodos.push(n));
  nodos.forEach(el => {
    if (el.dataset.fx) return;
    el.dataset.fx = "1";
    if (PARTICULAS[el.dataset.tipo]) fxParticulas(el, el.dataset.tipo, "_rafF");
  });
}
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) activarMarcos(n); }))).observe(document.body, { childList: true, subtree: true });

/* ---------- Pestaña Tienda ---------- */
function filaTienda(it) {
  const av = avActivo(), p = tiendaPrecio(it), posee = tiendaPoseido(it), puesto = tiendaPuesto(it, av);
  const prev = it.k.startsWith("m-") ? avatarSvg({ ...av, marco: it.k, efectos: [] }, 52, true)
    : it.k.startsWith("e-") ? avatarSvg({ ...av, efectos: [it.k] }, 52, true)
    : avatarSvg({ ...av, acc: [it.k] }, 52, true);
  const precioHtml = p.final === 0 ? `<span class="t-precio"><span>Gratis</span></span>`
    : p.oferta ? `<span class="t-precio"><s>${p.base} ${ico("coin", 12)}</s><span>${p.final} ${ico("coin", 14)}</span></span>`
    : `<span class="t-precio"><span>${p.final} ${ico("coin", 14)}</span></span>`;
  let boton;
  if (posee) boton = `<button class="btn-mini" type="button" data-t-equipar="${it.k}">${puesto ? "Quitar" : "Ponerme"}</button>`;
  else if (rewards().coins < p.final) boton = `<button class="btn-mini tuyo" type="button" disabled>Te faltan ${p.final - rewards().coins}</button>`;
  else boton = `<button class="btn-mini" type="button" data-t-comprar="${it.k}">Comprar</button>`;
  return `<div class="t-item${posee ? " tiene" : ""}">${p.oferta ? '<span class="cartel">Oferta</span>' : ""}
    <span class="t-ico">${prev}</span>
    <span class="t-txt"><b>${it.nombre}</b><small>${it.desc}</small>${it.k.startsWith("m-") && PARTICULAS[it.k.slice(2)] ? '<span class="chip anim">Animado</span>' : ""}</span>
    <span class="t-der">${precioHtml}${boton}</span></div>`;
}
export function renderTienda() {
  const box = $("tienda-ofertas");
  if (!box) return;
  const ofertas = ofertasHoy().map(k => todosLosItems().find(x => x.k === k));
  $("tienda-saldo").innerHTML = `${ico("coin", 18)} <b>${rewards().coins}</b> monedas`;
  $("tienda-fin").textContent = "Ofertas hasta medianoche";
  $("tienda-fin-semana").textContent = fdeSemana() ? "Fin de semana: −10 % en todo" : "";
  box.innerHTML = ofertas.map(filaTienda).join("");
  $("tienda-marcos").innerHTML = T_MARCOS.map(filaTienda).join("");
  $("tienda-efectos").innerHTML = T_EFECTOS.map(filaTienda).join("");
  $("tienda-accesorios").innerHTML = accPagados().map(filaTienda).join("");
  $$t("#p-tienda [data-t-comprar]").forEach(b => b.onclick = () => tiendaComprar(b.dataset.tComprar));
  $$t("#p-tienda [data-t-equipar]").forEach(b => b.onclick = () => tiendaEquipar(b.dataset.tEquipar));
  activarMarcos($("p-tienda"));
}
const $$t = s => [...document.querySelectorAll(s)];
function tiendaMsg(t) { const m = $("tienda-msg"); if (m) m.textContent = t; }
function tiendaComprar(k) {
  const it = todosLosItems().find(x => x.k === k);
  if (!it) return;
  const p = tiendaPrecio(it);
  if (!tiendaPoseido(it)) {
    if (!spendCoins(p.final)) { tiendaMsg(`Te faltan ${p.final - rewards().coins} monedas.`); return; }
    const r = rewards(); r.owned = [...(r.owned || []), k]; saveRewards(r);
    celebrate("¡Desbloqueado!", `${it.nombre}: ya puedes ponértelo`, ico("gift", 56));
  }
  tiendaEquipar(k, true);
}
// Pone o quita un marco, efecto o accesorio al perfil activo
function tiendaEquipar(k, siempre = false) {
  const list = getProfiles(), act = activeProfile();
  const p = act && list.find(x => x.id === act.id);   // el mismo objeto que se guarda
  if (!p) { tiendaMsg("Entra en un perfil para ponerte cosas."); return; }
  const av = { ...p.avatar };
  if (k.startsWith("m-")) av.marco = av.marco === k && !siempre ? null : k;
  else if (k.startsWith("e-")) { const s = new Set(av.efectos || []); if (s.has(k) && !siempre) s.delete(k); else s.add(k); av.efectos = [...s]; }
  else { const c = accList(av.acc); av.acc = c.includes(k) && !siempre ? c.filter(x => x !== k) : [...new Set([...c, k])]; }
  p.avatar = av;
  saveProfiles(list);
  renderTienda();
  renderPerfilPanel();
}

/* ---------- Pestaña Sellos (logros, racha) ---------- */
export function renderLogrosPanel() {
  const box = $("logrosBox");
  if (box) box.innerHTML = logrosHtml();
  const info = $("logrosInfo"); if (info) info.innerHTML = infoSellosHtml();
  const sub = $("logrosSub"), cnt = box?.querySelector(".ach-count");
  if (sub && cnt) sub.textContent = `Conseguidos ${cnt.textContent}. Toca uno para ver cómo se gana.`;
}

/* ---------- Pestaña Perfil: avatar, monedas, cambiar o editar perfil ---------- */
export function renderPerfilPanel() {
  const box = $("perfilCab");
  if (!box) return;
  const p = activeProfile(), r = rankInfo(xpTotal());
  if (!p) { box.innerHTML = `<p class="muted">Aún no hay ningún perfil. Crea uno para empezar.</p>`; return; }
  box.innerHTML = `<div class="perfil-av">${avatarSvg(p.avatar, 120)}</div>
    <h2 class="perfil-nombre">${p.name}</h2>
    <p class="muted">${r.name} · ${rewards().coins} monedas</p>
    <div class="actions"><button class="btn secondary" type="button" id="perfilCambiar">Cambiar de perfil</button>
    <button class="btn secondary" type="button" id="perfilEditar">Editar perfil</button></div>`;
  $("perfilCambiar").onclick = () => profileOpenList();
  $("perfilEditar").onclick = () => { profileOpenList(); const e = $("pEdit"); if (e && !e.classList.contains("hidden")) e.click(); };
  activarMarcos(box);
  const av = p.avatar || {};
  box.insertAdjacentHTML("beforeend", `<div class="d4-avatares" role="group" aria-label="Elegir animal">${P_ANIMALS.filter(([k]) => k !== "persona").map(([k, n]) => `<button type="button" class="d4-av-op" data-animal="${k}" aria-pressed="${av.animal === k}">${avatarSvg({ ...av, animal: k, acc: [] }, 56, true)}<span>${n}</span></button>`).join("")}</div>`);
  box.querySelectorAll("[data-animal]").forEach(b => b.onclick = () => {
    const list = getProfiles(), me = list.find(x => x.id === p.id);
    if (!me) return;
    me.avatar = { ...(me.avatar || {}), animal: b.dataset.animal };
    delete me.avatar.raza;
    saveProfiles(list); renderPerfilPanel();
  });
}

/* ---------- Partículas de los marcos (mismo motor que la maqueta D4) ---------- */
function fxParticulas(el,tipo,clave){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const W=el.clientWidth||52, H=el.clientHeight||W, P=36, dpr=Math.min(devicePixelRatio||1,2);
  const CW=W+P*2, CH=H+P*2, R=W/2, EDGE=P*.6;
  const cfg={
    estrellas:{n:7,forma:'star',col:['#ffd166','#fff1b8'],orb:1},
    llamas:{n:12,forma:'drop',col:['#ff7a3d','#ffb22e','#ff4d4d'],sube:1},
    nieve:{n:14,forma:'dot',col:['#ffffff','#cfe9ff'],cae:1},
    burbujas:{n:8,forma:'ring',col:['#8fe3ff','#c9f3ff'],sube:1},
    cosmico:{n:4,forma:'dot',col:['#a57bff','#5fd6ff'],orb:1},
    hojas:{n:7,forma:'leaf',col:['#18a58a','#7bc96a'],cae:1}
  }[tipo];
  const c=document.createElement('canvas'); c.className='fxc';
  c.width=CW*dpr; c.height=CH*dpr; c.style.width=CW+'px'; c.style.height=CH+'px';
  c.style.left=(-P)+'px'; c.style.top=(-P)+'px';
  el.appendChild(c);
  const x=c.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  const nuevo=q=>{
    q.col=cfg.col[Math.floor(Math.random()*cfg.col.length)]; q.life=0;
    q.max=cfg.orb?Infinity:(120+Math.random()*60); q.s=2.6+Math.random()*2.2;
    q.rot=Math.random()*6.28; q.vr=(Math.random()-.5)*.04; q.ph=Math.random()*6.28;
    if(cfg.orb){ q.a=Math.random()*6.28; q.rad=R+8+Math.random()*P*.45; q.sp=(.008+Math.random()*.008)*(Math.random()<.5?-1:1); }
    else if(cfg.sube){ q.x=CW/2+(Math.random()-.5)*W*.7; q.y=CH-P*.5; q.vx=(Math.random()-.5)*.25; q.vy=-(.35+Math.random()*.45); }
    else { q.x=P+Math.random()*W; q.y=-P*.6; q.vx=0; q.vy=.25+Math.random()*.35; }
    return q;
  };
  const pts=[]; for(let i=0;i<cfg.n;i++){ const q=nuevo({}); if(!cfg.orb) q.life=Math.random()*q.max; pts.push(q); }
  const dibuja=(q,al)=>{
    x.save(); x.globalAlpha=al; x.translate(q.x,q.y); x.rotate(q.rot); x.fillStyle=q.col; x.strokeStyle=q.col;
    if(cfg.forma==='star'){ x.beginPath(); for(let i=0;i<8;i++){ const r=i%2?q.s*.34:q.s*1.25, t=i*Math.PI/4-Math.PI/2; x.lineTo(Math.cos(t)*r,Math.sin(t)*r); } x.closePath(); x.fill(); }
    else if(cfg.forma==='drop'){ x.beginPath(); x.moveTo(0,-q.s*1.6); x.quadraticCurveTo(q.s*1.1,0,0,q.s*.9); x.quadraticCurveTo(-q.s*1.1,0,0,-q.s*1.6); x.fill(); }
    else if(cfg.forma==='ring'){ x.lineWidth=1.2; x.beginPath(); x.arc(0,0,q.s*1.1,0,6.28); x.stroke(); }
    else if(cfg.forma==='leaf'){ x.beginPath(); x.ellipse(0,0,q.s*1.3,q.s*.7,0,0,6.28); x.fill(); }
    else { x.beginPath(); x.arc(0,0,q.s*.7,0,6.28); x.fill(); }
    x.restore();
  };
  let last=0;
  const tick=now=>{
    const k=last?Math.min((now-last)/16.67,3):1; last=now;   // movimiento por tiempo real: igual en 60 y 120 Hz
    x.clearRect(0,0,CW,CH);
    for(const q of pts){
      q.life+=k; q.rot+=q.vr*k;
      let al;
      if(cfg.orb){ q.a+=q.sp*k; q.x=CW/2+Math.cos(q.a)*q.rad; q.y=CH/2+Math.sin(q.a)*q.rad*.9; al=.6+.4*Math.sin(q.life*.06+q.rad); }
      else {
        q.x+=(q.vx+Math.sin(q.life*.05+q.ph)*.2)*k; q.y+=q.vy*k;
        al=Math.sin(Math.PI*Math.min(q.life/q.max,1));
        if(q.life>=q.max||q.y>CH+8||q.y<-P-8||q.x<-P||q.x>CW+P) nuevo(q);
      }
      // se desvanece antes de tocar el borde del lienzo: nada aparece ni se corta de golpe
      const d=Math.min(q.x,CW-q.x,q.y,CH-q.y);
      al*=Math.max(0,Math.min(1,d/EDGE));
      if(al>0.01) dibuja(q,al);
    }
    el[clave]=requestAnimationFrame(tick);
  };
  el[clave]=requestAnimationFrame(tick);
}
