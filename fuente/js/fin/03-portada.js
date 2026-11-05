import { RAW_LS } from "../01-nucleo-niveles-audio.js";
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
  document.querySelectorAll("[data-empezar]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    cerrar();
    if (RAW_LS.getItem("perfil-activo")) return;               // ya hay perfil: entra directamente
    if (getProfiles().length === 0) profileOpenForm(true);      // primera vez: crear avatar
    else profileOpenList();                                     // hay perfiles: elegir cuál
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
