#!/bin/sh
# Batería completa de la app. Requiere Node 22+ y Playwright con Chromium instalado.
# Uso:  NODE_PATH=$(npm root -g) sh bateria-completa.sh
# Por defecto prueba el HTML generado en ../../diseno-B-cockpit.html; para otro: HTML=/ruta/app.html sh bateria-completa.sh
D=$(cd "$(dirname "$0")" && pwd)
F=${HTML:-$D/../../diseno-B-cockpit.html}
export HTML="$F"
cd "$D" || exit 1
echo "== build y comprobación de módulos"; (cd "$D/.." && python3 construir.py | tail -1)
echo "== volcado de 3424 ejercicios frente a referencia"; node volcado.js "$F" "$D/volcado.json" | tail -1
node -e "const a=require('$D/base.json'),b=require('$D/volcado.json');console.log('iguales a la referencia:', JSON.stringify(a)===JSON.stringify(b))"
echo "== batería de 15 comprobaciones (escritorio y móvil)"; node bateria2.js "$F" | tee "$D/bateria.log" | grep -v "^OK" ; echo "OK: $(grep -c '^OK' "$D/bateria.log") de $(grep -c '^OK\|^FAIL' "$D/bateria.log")"
echo "== copias de seguridad"; node importa4.js "$F" | tail -4
echo "== teclado"; node final-kb.js | tail -2
echo "== formulario de perfil con teclado abierto"; node teclado-perfil.js "$F"
echo "== inyección por formato (memoria)"; node inyeccion-por-formato.js | grep -v " 0 elementos" || echo "ninguna inserta marcado"
echo "== inyección por importación de archivo (8 formatos + ensayo sin criterios)"; node importa-formatos.js
echo "== nombre de perfil largo (320 y 390 px)"; node nombre-largo.js
echo "== objetivos táctiles menores de 24 px"; node objetivos-24px.js
echo "== axe y responsive en 7 pestañas × 4 anchos × 2 temas"; node axe-y-responsive.js
echo "== contraste (AAA en oscuro; en claro se esperan 4 avisos AAA)"; node contraste7.js "$F" | grep "por debajo"
