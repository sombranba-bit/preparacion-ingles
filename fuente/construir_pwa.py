"""Genera la carpeta pwa/ y pwa.zip a partir de ../diseno-B-cockpit.html.

Añade las etiquetas de instalación y el registro del service worker, y
recalcula los hashes de la CSP con TODOS los scripts en línea (incluido el
del registro); si no, el navegador bloquea el service worker.
"""
import base64, hashlib, os, re, zipfile
base = os.path.dirname(os.path.abspath(__file__))
raiz = os.path.normpath(os.path.join(base, ".."))
pwa = os.path.join(raiz, "pwa")
s = open(os.path.join(raiz, "diseno-B-cockpit.html"), encoding="utf-8").read()

head = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
assert s.count(head) == 1
s = s.replace(head, head + '''<meta name="theme-color" content="#0b1220">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Inglés">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.json">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
''')
assert s.count("</body>") == 1
s = s.replace("</body>", '''<script>
// Sin conexión: la app se guarda en el móvil. Solo funciona con HTTPS o localhost.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
</script>
</body>''')

# CSP: recalcular hashes con todos los scripts en línea finales
bloques = re.findall(r"<script>(.*?)</script>", s, flags=re.S)
hashes = ["'sha256-" + base64.b64encode(hashlib.sha256(b.encode("utf-8")).digest()).decode() + "'" for b in bloques]
s, n = re.subn(r"script-src 'self'[^;]*;", "script-src 'self' " + " ".join(hashes) + ";", s, count=1)
assert n == 1, "no se encontró script-src en la CSP"

os.makedirs(pwa, exist_ok=True)
index_path = os.path.join(pwa, "index.html")
anterior = open(index_path, encoding="utf-8").read() if os.path.exists(index_path) else None
open(index_path, "w", encoding="utf-8").write(s)

# Service worker: nueva versión de caché solo si la app cambió, para que los
# usuarios reciban el cambio sin subir la versión en cada construcción
sw_path = os.path.join(pwa, "sw.js")
sw = open(sw_path, encoding="utf-8").read()
m = re.search(r'const CACHE = "ingles-v(\d+)";', sw)
assert m, "no se encontró CACHE en sw.js"
nueva = int(m.group(1)) + (1 if anterior != s else 0)
sw = sw.replace(m.group(0), 'const CACHE = "ingles-v%d";' % nueva)
open(sw_path, "w", encoding="utf-8").write(sw)

ficheros = ["index.html", "manifest.json", "sw.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]
with zipfile.ZipFile(os.path.join(raiz, "pwa.zip"), "w", zipfile.ZIP_DEFLATED) as z:
    for f in ficheros:
        z.write(os.path.join(pwa, f), f)
print("pwa lista | caché ingles-v%d | scripts en línea: %d" % (nueva, len(hashes)))
