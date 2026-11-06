// Red primero; si no hay conexión, lo último guardado. Así las actualizaciones llegan solas.
const V = "r4e-v2";
const BASE = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];
// Un archivo que falle no tumba la instalación: el resto se guarda igual.
self.addEventListener("install", e => e.waitUntil(caches.open(V).then(c => Promise.all(BASE.map(u => c.add(u).catch(() => {}))))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) caches.open(V).then(c => c.put(e.request, r.clone())); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
