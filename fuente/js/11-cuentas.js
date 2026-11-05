// Cuentas: inicio de sesión con Google o correo (Firebase Auth). El SDK se carga solo al pulsar "Entrar".
// Sin sesión, la app sigue funcionando igual, guardando en este navegador.
import { $ } from "./01-nucleo-niveles-audio.js";
import { escHtml, getProfiles, profileOpenForm } from "./03-perfiles.js";

const CTA_VERSION = "11.0.2";
const CTA_BASE = "https://cdn.jsdelivr.net/npm/firebase@" + CTA_VERSION;
const CTA_CONFIG = {
  apiKey: "AIzaSyDQuzx_qnyN8hEhY0BEzUQZxJ10h35QESY",
  authDomain: "preparacion-examenes-de-ingles.firebaseapp.com",
  projectId: "preparacion-examenes-de-ingles",
  storageBucket: "preparacion-examenes-de-ingles.firebasestorage.app",
  messagingSenderId: "27081435513",
  appId: "1:27081435513:web:ba2781e266c30fc744e7a8"
};

const ctaE = () => window.ctaEstado || (window.ctaEstado = { fb: null, user: null, msg: "", busy: false });

function ctaImportar(url) { return import(/* ya cargado por la CSP */ url); }

async function ctaCargar() {
  if (ctaE().fb) return ctaE().fb;
  const appPromesa = ctaImportar(CTA_BASE + "/app/+esm");
  const authPromesa = ctaImportar(CTA_BASE + "/auth/+esm");
  const [appMod, authMod] = await Promise.all([appPromesa, authPromesa]);
  const app = appMod.initializeApp(CTA_CONFIG, "ready4exam");
  const auth = authMod.getAuth(app);
  ctaE().fb = { auth, authMod, provider: new authMod.GoogleAuthProvider() };
  authMod.onAuthStateChanged(auth, u => { ctaE().user = u; ctaE().msg = ""; renderCuenta(); });
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

export function entrarGoogle() {
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    const r = await fb.authMod.signInWithPopup(fb.auth, fb.provider);
    ctaE().user = r.user;
  });
}

export function entrarCorreo(crear) {
  const email = ($("ctaEmail") || {}).value?.trim() || "";
  const pass = ($("ctaPass") || {}).value || "";
  if (!email) { ctaE().msg = "Escribe tu correo."; renderCuenta(); return; }
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    const r = crear ? await fb.authMod.createUserWithEmailAndPassword(fb.auth, email, pass) : await fb.authMod.signInWithEmailAndPassword(fb.auth, email, pass);
    ctaE().user = r.user;
  });
}

export function salirCuenta() {
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.signOut(fb.auth);
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
    box.innerHTML = `<p class="d4-sub" style="margin:0">Sesión iniciada como <b>${escHtml(ctaE().user.email || ctaE().user.displayName || "usuario")}</b>.</p>`;
    return;
  }
  const msg = `<p class="etiq" role="status" style="margin:0">${escHtml(ctaE().msg || "")}</p>`;
  box.innerHTML = `<span class="etiq">${crear ? "Crear cuenta" : "Iniciar sesión"}</span>
    <button class="cta-opcion" type="button" id="ctaGoogle">${CTA_GOOGLE}<span>${crear ? "Registrarme con Google" : "Entrar con Google"}</span></button>
    <button class="cta-opcion" type="button" id="ctaCorreoAbrir" aria-expanded="false" aria-controls="ctaFormCorreo">${CTA_MAIL}<span>${crear ? "Registrarme con correo" : "Entrar con correo"}</span></button>
    <div id="ctaFormCorreo" hidden style="display:grid;gap:8px">
      <label class="etiq" for="ctaEmail">Correo</label>
      <input id="ctaEmail" type="email" autocomplete="email" inputmode="email" style="font-size:16px;min-height:44px;border-radius:12px;padding:8px 12px;border:2px solid #ecd9c0;background:#fffdf8;color:inherit" />
      <label class="etiq" for="ctaPass">Contraseña</label>
      <input id="ctaPass" type="password" autocomplete="${crear ? "new-password" : "current-password"}" style="font-size:16px;min-height:44px;border-radius:12px;padding:8px 12px;border:2px solid #ecd9c0;background:#fffdf8;color:inherit" />
      <button class="btn" type="button" id="ctaEnviar">${crear ? "Crear cuenta" : "Entrar"}</button>
    </div>
    ${msg}`;
  $("ctaGoogle").onclick = entrarGoogle;
  $("ctaCorreoAbrir").onclick = () => {
    const f = $("ctaFormCorreo"), abierto = !f.hidden;
    f.hidden = abierto; $("ctaCorreoAbrir").setAttribute("aria-expanded", String(!abierto));
    if (!abierto) $("ctaEmail").focus();
  };
  $("ctaEnviar").onclick = () => entrarCorreo(crear);
}

// Al abrir la app comprobamos si ya había sesión, sin cargar nada si no la hay.
export function cuentaInicializar() {
  let hayCuenta = false;
  try { hayCuenta = Object.keys(window.localStorage).some(k => k.startsWith("firebase:authUser")); } catch (e) {}
  if (hayCuenta) ctaCargar().catch(() => {});
  renderCuenta();
}
