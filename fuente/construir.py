"""Genera diseno-B-cockpit.html (un único archivo) a partir de las partes de fuente/.

Partes:
  plantilla.html   estructura (head, marcado del cuerpo) con marcadores
  css/*.css        estilos, en el orden de sus nombres
  js/*.js          código y datos principales, en el orden de sus nombres (un <script>)
  js/fin/*.js      código que toca el marcado de la página: un <script> por fichero,
                   en el mismo sitio donde estaban los scripts en línea

Antes de construir ejecuta comprobar_modulos.js (si hay Node y typescript).
Calcula el SHA-256 de cada <script> en línea y lo pone en la CSP (script-src),
para no necesitar 'unsafe-inline' en los scripts.
"""
import base64, glob, hashlib, os, re, shutil, subprocess, sys
base = os.path.dirname(os.path.abspath(__file__))

def leer(ruta):
    with open(os.path.join(base, ruta), encoding="utf-8") as f:
        return f.read()

# Los ficheros de js/ son módulos (import/export) para que cada dependencia
# quede declarada. Al construir se quitan import/export y se unen en un único
# script, en el mismo orden de antes; se comprueba que no haya nombres repetidos.
DECL = re.compile(r"^(?:export\s+)?(?:const|let|var|function\*?|class|async\s+function)\s+([A-Za-z_$][\w$]*)", re.M)
IMPORT = re.compile(r'^import\s[\s\S]*?\sfrom\s+["\'][^"\']+["\'];[ \t]*\n', re.M)
nombres = {}

def codigo_de(ficheros):
    partes = []
    for f in ficheros:
        codigo = open(f, encoding="utf-8").read()
        codigo = IMPORT.sub("", codigo)
        codigo = re.sub(r"^export\s+(?=const|let|var|function|class|async\s+function)", "", codigo, flags=re.M)
        assert not re.search(r"^\s*(import|export)\b", codigo, flags=re.M), "import/export no reconocido en " + os.path.basename(f)
        for m in DECL.finditer(codigo):
            n = m.group(1)
            assert n not in nombres, "nombre repetido: %s (%s y %s)" % (n, nombres[n], os.path.basename(f))
            nombres[n] = os.path.basename(f)
        assert "</script" not in codigo.lower(), "el código no puede contener </script>: " + os.path.basename(f)
        partes.append(codigo)
    return "".join(partes)

# Comprobación de conexiones entre módulos antes de construir
if shutil.which("node"):
    r = subprocess.run(["node", os.path.join(base, "comprobar_modulos.js")], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("No se construye: los módulos tienen errores de conexión.\n" + r.stdout + r.stderr)
    print(r.stdout.strip().splitlines()[-1])
else:
    print("aviso: sin Node no se comprueban las conexiones entre módulos")

html = leer("plantilla.html")

# Estilos: un <style> por cada fichero de css/, en su orden
for ruta in sorted(re.findall(r"<!--@css:(.+?)-->\n", html)):
    marca = "<!--@css:%s-->\n" % ruta
    assert html.count(marca) == 1, "marcador de CSS duplicado: " + ruta
    html = html.replace(marca, "<style>\n" + leer(ruta) + "</style>\n")

# Código principal: js/*.js juntos en un único <script>
marca = "<!--@js:main-->\n"
assert html.count(marca) == 1, "falta el marcador de JS"
ficheros = sorted(glob.glob(os.path.join(base, "js", "*.js")))
assert ficheros, "no hay ficheros en js/"
html = html.replace(marca, "<script>\n" + codigo_de(ficheros) + "</script>\n")

# Código de la página: js/fin/*.js, un <script> por fichero, donde estaba el marcador
marca = "<!--@js:fin-->\n"
assert html.count(marca) == 1, "falta el marcador de js/fin"
bloques_fin = "".join("<script>\n" + codigo_de([f]) + "</script>\n"
                      for f in sorted(glob.glob(os.path.join(base, "js", "fin", "*.js"))))
html = html.replace(marca, bloques_fin)

# Hashes de los scripts en línea (sin atributo src)
bloques = re.findall(r"<script>(.*?)</script>", html, flags=re.S)
assert len(bloques) == html.count("<script>"), "script en línea no reconocido"
hashes = ["'sha256-" + base64.b64encode(hashlib.sha256(b.encode("utf-8")).digest()).decode() + "'"
          for b in bloques]
marca = "__SCRIPT_HASHES__"
assert html.count(marca) == 1, "falta el marcador de CSP"
html = html.replace(marca, " ".join(hashes))

salida = os.path.join(base, "..", "app-d4.html")
with open(salida, "w", encoding="utf-8") as f:
    f.write(html)
print("construido:", os.path.normpath(salida), "| scripts en línea:", len(hashes))
