#!/bin/sh
# Sirve la app en local (el service worker solo funciona con http://localhost) y lanza la prueba del PWA.
# Uso: sh fuente/pruebas/pwa-local.sh
RAIZ=$(cd "$(dirname "$0")/../.." && pwd)
PUERTO=8127
(cd "$RAIZ" && python3 -m http.server $PUERTO >/dev/null 2>&1) &
SERV=$!
sleep 1
NODE_PATH=$(npm root -g) node "$RAIZ/fuente/pruebas/pwa.js" "http://localhost:$PUERTO/index.html"
EST=$?
kill $SERV 2>/dev/null
exit $EST
