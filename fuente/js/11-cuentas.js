// Cuentas: inicio de sesión con Google o correo (Firebase Auth). El SDK se carga solo al pulsar "Entrar".
// Sin sesión, la app sigue funcionando igual, guardando en este navegador.
import { $ } from "./01-nucleo-niveles-audio.js";
import { escHtml } from "./03-perfiles.js";

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

async function ctaAccion(fn) {
  if (ctaE().busy) return;
  ctaE().busy = true; ctaE().msg = "Conectando…"; renderCuenta();
  try { await fn(); }
  catch (e) { ctaE().msg = ctaTraducir(e); }
  finally { ctaE().busy = false; renderCuenta(); }
}

export function entrarGoogle() {
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.signInWithPopup(fb.auth, fb.provider);
  });
}

export function entrarCorreo(crear) {
  const email = ($("ctaEmail") || {}).value?.trim() || "";
  const pass = ($("ctaPass") || {}).value || "";
  if (!email) { ctaE().msg = "Escribe tu correo."; renderCuenta(); return; }
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    if (crear) await fb.authMod.createUserWithEmailAndPassword(fb.auth, email, pass);
    else await fb.authMod.signInWithEmailAndPassword(fb.auth, email, pass);
  });
}

export function salirCuenta() {
  return ctaAccion(async () => {
    const fb = await ctaCargar();
    await fb.authMod.signOut(fb.auth);
  });
}

export function renderCuenta() {
  const box = $("cuentaBox");
  if (!box) return;
  if (ctaE().user) {
    box.innerHTML = `<span class="etiq">Cuenta</span>
      <p class="d4-sub" style="margin:6px 0 12px">Sesión iniciada como <b>${escHtml(ctaE().user.email || ctaE().user.displayName || "usuario")}</b>. Tu progreso se guardará en esta cuenta.</p>
      <button class="btn secondary" type="button" id="ctaSalir">Cerrar sesión</button>
      <p class="etiq" role="status" style="margin-top:10px">${escHtml(ctaE().msg || "")}</p>`;
    $("ctaSalir").onclick = salirCuenta;
    return;
  }
  box.innerHTML = `<span class="etiq">Cuenta</span>
    <p class="d4-sub" style="margin:6px 0 12px">Entra para guardar tu progreso en tu cuenta y usarlo desde cualquier dispositivo. Sin cuenta, todo se queda en este navegador.</p>
    <button class="btn secondary" type="button" id="ctaGoogle" style="width:100%">Entrar con Google</button>
    <div style="margin-top:12px;display:grid;gap:8px">
      <label class="etiq" for="ctaEmail">Correo</label>
      <input id="ctaEmail" type="email" autocomplete="email" inputmode="email" style="font-size:16px;min-height:44px;border-radius:12px;padding:8px 12px;border:2px solid #ecd9c0;background:#fffdf8;color:inherit" />
      <label class="etiq" for="ctaPass">Contraseña</label>
      <input id="ctaPass" type="password" autocomplete="current-password" style="font-size:16px;min-height:44px;border-radius:12px;padding:8px 12px;border:2px solid #ecd9c0;background:#fffdf8;color:inherit" />
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" type="button" id="ctaEntrar">Entrar</button>
        <button class="btn secondary" type="button" id="ctaCrear">Crear cuenta</button>
      </div>
    </div>
    <p class="etiq" role="status" style="margin-top:10px">${escHtml(ctaE().msg || "")}</p>`;
  $("ctaGoogle").onclick = entrarGoogle;
  $("ctaEntrar").onclick = () => entrarCorreo(false);
  $("ctaCrear").onclick = () => entrarCorreo(true);
}

// Al abrir la app comprobamos si ya había sesión, sin cargar nada si no la hay.
export function cuentaInicializar() {
  let hayCuenta = false;
  try { hayCuenta = Object.keys(window.localStorage).some(k => k.startsWith("firebase:authUser")); } catch (e) {}
  if (hayCuenta) ctaCargar().catch(() => {});
  renderCuenta();
}
