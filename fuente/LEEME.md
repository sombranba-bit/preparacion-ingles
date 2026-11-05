# Fuente de la app de exámenes de inglés

La app sale en **un único HTML** (`../diseno-B-cockpit.html`) que funciona abriéndolo
directamente, sin servidor. Este directorio es la fuente que lo genera.

## Estructura

| Parte | Qué contiene |
| --- | --- |
| `plantilla.html` | Marcado de la página, con marcadores para el CSS y el JS |
| `css/` | Estilos (`01-app.css`, `02-portada.css`) |
| `js/` | Código y datos, en módulos con `import`/`export` |
| `js/fin/` | Código que toca el marcado de la página (portada, barra de tema, mascota). Va en su sitio dentro del HTML, con un `<script>` por fichero |
| `construir.py` | Genera `../diseno-B-cockpit.html` |
| `construir_pwa.py` | Genera `../pwa/` y `../pwa.zip` |
| `comprobar_modulos.js` | Comprueba las conexiones entre módulos |

### Módulos de `js/`

Se unen en un solo script en el orden de sus nombres, igual que antes de separarlos.

| Fichero | Contenido |
| --- | --- |
| `00-datos-ejercicios-b1.js` | Datos B1 (`EXTRA_ITEMS`, la primera parte de los datos adicionales) |
| `01-nucleo-niveles-audio.js` | Lista base de ejercicios (`ITEMS`), niveles, almacenamiento por perfil, audio |
| `02-progreso-xp-racha-mascota.js` | XP, rangos, racha, repaso, voz, mascota |
| `03-perfiles.js` | Pantalla de perfiles |
| `04-recompensas-logros-copia-auto.js` | Motor de sesión (estado del examen), recompensas, logros, tienda, copia automática |
| `05-formatos-pdf-restaurar-copia.js` | Formatos de ejercicio, PDF, restaurar copias |
| `06-…` a `09-…` | Reproductor de audio y datos de ejercicios por niveles |

## Reglas al tocar el código

- **Un nombre usado en otro fichero se importa.** Si `04` necesita `xpTotal` de `02`,
  `02` lo exporta y `04` lo importa desde `./02-progreso-xp-racha-mascota.js`.
- **Solo el módulo que declara una variable la escribe.** Si otro fichero necesita cambiarla,
  se añade una función en el módulo dueño (por ejemplo `setRespondida()` en `04`).
  Las asignaciones desde fuera no son válidas en módulos ES.
- **Antes de construir:** `construir.py` ejecuta `comprobar_modulos.js` por su cuenta y no construye si hay errores de conexión. Sin Node, avisa y construye igualmente.
- **Después de construir:** ejecutar el recorrido de pruebas. Comprueba que la lista de
  ejercicios sigue siendo idéntica (3424 ítems) y que la copia de seguridad se restaura bien.

## Construir

```bash
python3 construir.py        # genera ../diseno-B-cockpit.html
python3 construir_pwa.py    # genera ../pwa/ y ../pwa.zip; sube la versión de caché solo si la app cambió
```

`construir.py` quita `import` y `export` al unir los ficheros y comprueba que no haya
nombres repetidos entre ellos, porque en un único script todos comparten el mismo ámbito.

## Pruebas (`pruebas/`)

Batería automática contra el HTML generado. Requiere Node 22+ y Playwright con Chromium.

```sh
cd pruebas
NODE_PATH=$(npm root -g) sh bateria-completa.sh
```

Por defecto prueba `../../diseno-B-cockpit.html`. Para probar otro fichero: `HTML=/ruta/app.html sh bateria-completa.sh`.

| Script | Qué comprueba |
| --- | --- |
| `bateria2.js` | 15 comprobaciones de escritorio y móvil: pestañas, recorrido, opciones, modo claro y oscuro, descargas |
| `volcado.js` + `base.json` | Los 3424 ejercicios son idénticos a la referencia |
| `importa4.js` + `c-*.json` | Copias de seguridad: perfil, recursos corruptos, copia ajena, copia vacía |
| `final-kb.js` | Navegación por teclado sin errores |
| `inyeccion-por-formato.js` | Ningún formato inserta HTML de un ejercicio en memoria |
| `importa-formatos.js` | Inyección por el input de importación en los 8 formatos; un ensayo sin `criteria` se rechaza |
| `nombre-largo.js` | Nombre de perfil sin espacios no desborda a 320 y 390 px |
| `objetivos-24px.js` | Ningún objetivo táctil mide menos de 24 px |
| `axe-y-responsive.js` | axe-core (en `vendor/`) en 7 pestañas × 4 anchos × 2 temas: sin fallos críticos ni graves, sin desbordes |
| `contraste7.js` | Contraste: en oscuro, todo por encima de AAA; en claro, 4 avisos AAA aceptados |

Las pruebas que inyectan HTML desactivan la CSP solo en el contexto de prueba (`bypassCSP`), para que axe pueda ejecutarse; la app real mantiene la CSP estricta.
