import { RAW_LS } from "../01-nucleo-niveles-audio.js";
import { renderCuenta, ctaSetModo } from "../11-cuentas.js";
import { getProfiles, profileOpenForm, profileOpenList } from "../03-perfiles.js";
// Portada: aparece siempre al abrir. "Empezar" entra con el perfil guardado o lleva a crear el avatar.
(function () {
  const L = document.getElementById("landing"), tb = document.getElementById("lpTheme");
  // Al entrar a la app se recuerda en la pestaña: las recargas internas (crear perfil, cambiar) no vuelven a la portada
  const cerrar = () => { L.classList.add("lp-off"); document.body.classList.remove("lp-open"); try { sessionStorage.setItem("entro", "1"); } catch (e) {} };
  const abrir = () => { L.classList.remove("lp-off"); document.body.classList.add("lp-open"); window.scrollTo(0, 0); };
  let entro = false;
  try { entro = sessionStorage.getItem("entro") === "1"; } catch (e) {}
  if (entro) cerrar(); else document.body.classList.add("lp-open");
  const entrarApp = () => {
    cerrar();
    if (RAW_LS.getItem("perfil-activo")) return;               // ya hay perfil: entra directamente
    if (getProfiles().length === 0) profileOpenForm(true);      // primera vez: crear avatar
    else profileOpenList();                                     // hay perfiles: elegir cuál
  };
  // "Empezar" pregunta cómo seguir: crear cuenta, entrar o seguir como invitado (solo A1)
  document.querySelectorAll("[data-empezar]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const el = document.getElementById("lpElige");
    if (el) el.hidden = false; else entrarApp();
  }));
  document.querySelectorAll("[data-cerrar-elige]").forEach(b => b.addEventListener("click", () => { const el = document.getElementById("lpElige"); if (el) el.hidden = true; }));
  document.querySelectorAll("[data-cuenta]").forEach(b => b.addEventListener("click", () => {
    const m = b.dataset.cuenta;
    if (m === "invitado") { try { RAW_LS.setItem("modo-invitado", "1"); } catch (e) {} entrarApp(); return; }
    try { RAW_LS.removeItem("modo-invitado"); } catch (e) {}
    // crear o entrar: el formulario aparece aquí mismo, en la portada
    const caja = document.getElementById("cuentaBox");
    if (caja) { caja.hidden = false; ctaSetModo(m); renderCuenta(); caja.scrollIntoView({ block: "center" }); const em = document.getElementById("ctaEmail"); if (em) em.focus(); }
  }));
  document.querySelectorAll("[data-inicio]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); abrir(); }));
  document.addEventListener("click", e => { if (e.target.closest("#homeBtn")) abrir(); });  // botón de la app (se crea dinámicamente)
  // Modo claro/oscuro: el botón indica a qué modo cambia
  // Modo claro/oscuro: usa el mismo interruptor que la app, así paleta y modo quedan igual en todo
  const modoOscuro = () => document.documentElement.dataset.mode === "dark";
  const etiqueta = () => { tb.textContent = modoOscuro() ? "Modo claro" : "Modo oscuro"; };
  etiqueta();
  tb.addEventListener("click", () => { const m = document.getElementById("modoBtn"); if (m) m.click(); etiqueta(); });
  // Carrusel de ejemplos: cambia cada 6 s, se pausa al pasar el ratón y no se mueve si el usuario pide menos movimiento
  const slides = [...L.querySelectorAll(".lp-slide")], dots = [...L.querySelectorAll(".lp-dot")], car = L.querySelector(".lp-car");
  let idx = 0, timer = null;
  const show = i => {
    idx = (i + slides.length) % slides.length;
    slides.forEach((x, k) => x.classList.toggle("lp-on", k === idx));
    dots.forEach((d, k) => d.setAttribute("aria-current", k === idx ? "true" : "false"));
  };
  const stop = () => clearInterval(timer);
  const play = () => { stop(); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(idx + 1), 6000); };
  car.querySelector(".lp-prev").addEventListener("click", () => { show(idx - 1); play(); });
  car.querySelector(".lp-next").addEventListener("click", () => { show(idx + 1); play(); });
  dots.forEach((d, k) => d.addEventListener("click", () => { show(k); play(); }));
  car.addEventListener("mouseenter", stop);
  car.addEventListener("mouseleave", play);
  show(0); play();
})();
