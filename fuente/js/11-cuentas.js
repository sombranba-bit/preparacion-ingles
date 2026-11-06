// Cuentas: inicio de sesión con Google o correo (Firebase Auth). El SDK se carga solo al pulsar "Entrar".
// Sin sesión, la app sigue funcionando igual, guardando en este navegador.
import { $ } from "./01-nucleo-niveles-audio.js";
import { escHtml, getProfiles, profileOpenForm } from "./03-perfiles.js";

const CTA_VERSION = "11.0.2";
const CTA_BASE = "https://cdn.jsdelivr.net/npm/firebase@" + CTA_VERSION;
const CTA_CONFIG = {
  apiKey: "AIzaSyDQuzx_qnyN8hEhY0BEzUQZxJ10h35QESY",
  authDomain: "preparacion-examenes-de-ingles.web.app",
  projectId: "preparacion-examenes-de-ingles",
  storageBucket: "preparacion-examenes-de-ingles.firebasestorage.app",
  messagingSenderId: "27081435513",
  appId: "1:27081435513:web:ba2781e266c30fc744e7a8"
};

const ctaE = () => window.ctaEstado || (window.ctaEstado = { fb: null, user: null, msg: "", busy: false });

function ctaImportar(url) { return import(/* ya cargado por la CSP */ url); }

function ctaCargar() {
  if (!ctaE().fbP) ctaE().fbP = ctaCargarSdk().catch(e => { ctaE().fbP = null; throw e; });   // una sola carga aunque se llame varias veces
  return ctaE().fbP;
}

async function ctaCargarSdk() {
  if (ctaE().fb) return ctaE().fb;
  const appPromesa = ctaImportar(CTA_BASE + "/app/+esm");
  const authPromesa = ctaImportar(CTA_BASE + "/auth/+esm");
  const [appMod, authMod] = await Promise.all([appPromesa, authPromesa]);
  const app = appMod.initializeApp(CTA_CONFIG, "ready4exam");
  const auth = authMod.getAuth(app);
  ctaE().fb = { auth, authMod, provider: new authMod.GoogleAuthProvider(), app };
  authMod.setPersistence(auth, authMod.indexedDBLocalPersistence).catch(() => {});   // la sesión sobrevive a cerrar la app instalada
  authMod.onAuthStateChanged(auth, u => {
    ctaE().user = u; ctaE().msg = ""; renderCuenta(); document.dispatchEvent(new Event("cuenta-cambio"));
    // sesión ya iniciada al abrir la página: entrar directo a la app, sin quedarse en la portada
    let entro = false; try { entro = !!sessionStorage.getItem("entro"); } catch (e) {}
    if (u && !entro) ctaTrasEntrar();
  });
  return ctaE().fb;
}

function ctaTraducir(e) {
  const c = (e && e.code) || "";
  const t = {
    "auth/invalid-email": "Ese correo no es válido.",
    "auth/missing-password": "Escribe una contraseña.",
    "auth/weak-password": "La contraseña necesita al menos 6 caracteres.",
    "auth/email-already-in-use": "Ya existe una cuenta con ese correo. Pulsa Entrar.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/wrong-password": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "Correo o contraseña incorrectos.",
    "auth/popup-closed-by-user": "Has cerrado la ventana de Google antes de terminar.",
    "auth/unauthorized-domain": "Este dominio no está autorizado en Firebase. Revisa Dominios autorizados.",
    "auth/network-request-failed": "Sin conexión. Inténtalo de nuevo cuando tengas red."
  };
  return t[c] || "No se pudo iniciar sesión. Inténtalo otra vez.";
}

// Tras entrar o registrarse por primera vez: cerrar la portada y pedir crear el perfil si no hay ninguno.
function ctaTrasEntrar() {
  const port = document.getElementById("landing");
  if (port) { port.classList.add("lp-off"); document.body.classList.remove("lp-open"); }
  try { sessionStorage.setItem("entro", "1"); } catch (e) {}
  if (getProfiles().length === 0) profileOpenForm(true);
}

async function ctaAccion(fn) {
  if (ctaE().busy) return;
  ctaE().busy = true; ctaE().msg = "Conectando…"; renderCuenta();
  try { await fn(); if (ctaE().user) ctaTrasEntrar(); }
  catch (e) { ctaE().msg = ctaTraducir(e); }
  finally { ctaE().busy = false; renderCuenta(); }
}

// Edad mínima para tener cuenta (LOPDGDD art. 7): declaración de la propia persona, sin guardar nada
const edadOk = () => {
  const ok = !!$("ctaEdad")?.checked;
  if (!ok) { ctaE().msg = "Confirma que tienes 14 años o más para crear o entrar en una cuenta."; renderCuenta(); }
  return ok;
};

export function entrarGoogle() {
  if (!edadOk()) return;
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    // En la app instalada (pantalla completa) la ventana emergente no funciona: se usa redirección
    if (matchMedia("(display-mode: standalone)").matches || navigator.standalone) return fb.authMod.signInWithRedirect(fb.auth, fb.provider);
    const r = await fb.authMod.signInWithPopup(fb.auth, fb.provider);
    ctaE().user = r.user;
  });
}

export function entrarCorreo(crear) {
  const email = ($("ctaEmail") || {}).value?.trim() || "";
  const pass = ($("ctaPass") || {}).value || "";
  const recuerda = $("ctaRecuerda") ? $("ctaRecuerda").checked : true;
  if (!email) { ctaE().msg = "Escribe tu correo."; renderCuenta(); return; }
  if (!edadOk()) return;
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.setPersistence(fb.auth, recuerda ? fb.authMod.browserLocalPersistence : fb.authMod.browserSessionPersistence);
    const r = crear ? await fb.authMod.createUserWithEmailAndPassword(fb.auth, email, pass) : await fb.authMod.signInWithEmailAndPassword(fb.auth, email, pass);
    ctaE().user = r.user;
  });
}

// Envía el enlace para cambiar la contraseña (lo gestiona Firebase Auth)
export function entrarRecuperar() {
  const email = ($("ctaEmail") || {}).value?.trim() || "";
  if (!email) { ctaE().msg = "Escribe tu correo y vuelve a pulsar «¿Olvidaste la contraseña?»."; renderCuenta(); return; }
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.sendPasswordResetEmail(fb.auth, email);
    ctaE().msg = "Te hemos enviado un enlace para cambiar la contraseña a " + email + ".";
  });
}

export function salirCuenta() {
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.signOut(fb.auth);
    // sin cuenta se vuelve a ser invitado (solo A1) y se muestra la portada
    try { window.localStorage.setItem("modo-invitado", "1"); } catch (e) {}
    ctaE().user = null;
    document.querySelector("[data-inicio]")?.click();
  });
}

const CTA_GOOGLE = '<svg class="cta-ico" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>';
const CTA_MAIL = '<svg class="cta-ico" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="#0a5c4d"/><path d="M3.5 7.5l8.5 6 8.5-6" stroke="#fffdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function ctaSetModo(m) { ctaE().modo = m === "crear" ? "crear" : "entrar"; }

export function renderCuenta() {
  const box = $("cuentaBox");
  if (!box) return;   // el formulario vive en la portada (pantalla de inicio)
  const crear = ctaE().modo === "crear";
  if (ctaE().user) {
    box.innerHTML = `<p class="d4-sub" style="margin:0">Sesión iniciada como <b>${escHtml(ctaE().user.email || ctaE().user.displayName || "usuario")}</b>.</p><button class="btn" type="button" id="ctaContinuar" style="margin-top:12px">Continuar</button>`;
    $("ctaContinuar").onclick = () => ctaTrasEntrar();
    return;
  }
  const msg = ctaE().msg ? `<p class="etiq" role="status" style="margin:0">${escHtml(ctaE().msg)}</p>` : "";
  ctaCargar().catch(() => {});   // precarga el SDK: así la ventana de Google se abre al pulsar, sin bloqueo del navegador
  const prevEmail = ($("ctaEmail") || {}).value || "";   // no se pierde el correo al volver a pintar
  const edad = !!$("ctaEdad")?.checked;                 // se conserva al volver a pintar el bloque
  const recuerda = $("ctaRecuerda") ? $("ctaRecuerda").checked : true;
  const titulo = $("lpTitulo"); if (titulo) titulo.textContent = crear ? "Crea tu cuenta" : "Entrar en Ready4Exam";
  document.querySelectorAll("[data-cuenta=entrar],[data-cuenta=crear]").forEach(b => b.setAttribute("aria-selected", String((b.dataset.cuenta === "crear") === crear)));
  box.innerHTML = `${msg}
    <label class="cta-campo">Correo
      <input id="ctaEmail" type="email" autocomplete="email" inputmode="email" placeholder="nombre@correo.com" value="${escHtml(prevEmail)}" />
    </label>
    <label class="cta-campo">Contraseña
      <span class="cta-pw"><input id="ctaPass" type="password" autocomplete="${crear ? "new-password" : "current-password"}" /><button type="button" id="ctaVer" aria-pressed="false">Ver</button></span>
    </label>
    <div class="cta-fila" id="ctaFilaEntrar" ${crear ? "hidden" : ""}>
      <label class="cta-chk"><input id="ctaRecuerda" type="checkbox" ${recuerda ? "checked" : ""}> Mantener la sesión</label>
      <button type="button" class="cta-enlace" id="ctaOlvido">¿Olvidaste la contraseña?</button>
    </div>
    <label class="cta-chk"><input id="ctaEdad" type="checkbox" ${edad ? "checked" : ""}> <span>Tengo 14 años o más. Si tienes menos, pide a tu madre, padre o tutor que cree la cuenta.</span></label>
    <button class="btn" type="button" id="ctaEnviar">${crear ? "Crear cuenta" : "Entrar"}</button>
    <div class="cta-sep"><span>o</span></div>
    <button class="cta-opcion" type="button" id="ctaGoogle">${CTA_GOOGLE}<span>${crear ? "Registrarme con Google" : "Entrar con Google"}</span></button>`;
  $("ctaGoogle").onclick = entrarGoogle;
  $("ctaVer").onclick = () => {
    const p = $("ctaPass"), v = p.type === "password";
    p.type = v ? "text" : "password"; $("ctaVer").textContent = v ? "Ocultar" : "Ver"; $("ctaVer").setAttribute("aria-pressed", String(v));
  };
  $("ctaOlvido").onclick = entrarRecuperar;
  $("ctaEnviar").onclick = () => entrarCorreo(crear);
}

// Al abrir la app comprobamos si ya había sesión, sin cargar nada si no la hay.
export function cuentaInicializar() {
  let hayCuenta = false;
  try { hayCuenta = Object.keys(window.localStorage).some(k => k.startsWith("firebase:authUser")); } catch (e) {}
  if (hayCuenta) ctaCargar().catch(() => {});
  renderCuenta();
}

// Acceso para la nube (12-nube.js): usuario actual, SDK de Firestore y la app de Firebase
export const ctaUsuario = () => ctaE().user;
export const ctaImportarUrl = ruta => ctaImportar(CTA_BASE + ruta);
export const ctaFbApp = () => ctaCargar();
