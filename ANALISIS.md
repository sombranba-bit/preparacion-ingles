# Integración de la maqueta D4 en la app actual

Base: `copia-seguridad/2026-11-05_antes-de-implementar-maqueta/app/app-exámenes-inglés.html` (versión de referencia, verificada).
Principio: **se mueve el contenido, no se reescribe.** Ningún dato, enlace, audio, escrito ni texto de la original se pierde.

## 1. Inventario de la original (lo que hay que conservar)

### Motor y datos
- **3.424 ejercicios** (`ITEMS`, 8 ficheros de datos): tipos reading 160, listening 130, rephrase 111, grammar 89 y otros (writing, usage, speaking). Niveles A1 36, A2 39, B1 48, B2 47, C1 45, C2 45 (en los ficheros de datos B1..C2 con otros formatos).
- **Verificación de referencia:** `pruebas/base.json`. Debe seguir siendo idéntico.
- **Audio:** reproductor con archivo propio del usuario (no se sube), velocidades 0,75/1/1,25, −10/+10 s. Lectura en voz (`speechSynthesis`) para listening.
- **Formatos de ejercicio:** 8 formatos de importación, PDF por ejercicio, copia de seguridad (exportar, restaurar, copia automática), progreso de perfiles.

### Pantallas (por pestaña)
| Pestaña original | Contenido que hay que conservar |
| --- | --- |
| Inicio (`home`, `gamePanel`) | Estadísticas (XP, racha, monedas, rango), objetivo diario, camino de partes, logros (7 con progreso), hitos de racha (7, 14, 30, 60, 100), mascota |
| Ejercicios (`p-ejercicios`) | Modo examen (cronómetro 45/60/90 s), repaso de fallos, secciones (Expresión oral, Dictado…), estructura oficial, **4 exámenes oficiales** (Cambridge, Oxford, EOI Aragón, TOEFL) |
| Audio (`p-audio`) | Reproductor con carga de archivo, controles, velocidad, **4 fuentes oficiales** de audio con texto propio |
| Lectura libre (`p-lectura`) | 2 fuentes (Gutenberg, Standard Ebooks), **8 lecturas sugeridas por nivel** con nivel y descripción, modo lectura del pasaje |
| Recursos (`p-recursos`) | Muestras oficiales (3), **listening y expresión oral** (12 recursos con etiquetas Verificado/nivel), **formato real de cada examen** (A2 KET, B1 PET, B2 FCE, C1 CAE, C2 CPE, Oxford, TOEFL 2026, EOI B1), **otras comunidades** (Cataluña, Madrid, IELTS, Castilla y León, Galicia), nota de qué no se incluye y por qué |
| Ranking (`p-ranking`) | Liga semanal (descargar mi semana, añadir la de un amigo, reinicio los lunes), ranking personal por nivel |
| Importar (`p-importar`) | Importar JSON con ejercicios propios, borrar importados, **copia de seguridad** (descargar y restaurar) |
| Exercise / Result | Sesión de ejercicio: pista, comprobar, siguiente, anterior, saltar/revelar (ventajas, 5/3/4 monedas), repetir, PDF, resultado con reseña |
| Perfiles (`profiles`) | Varios perfiles, invitado, crear/editar/borrar, exportar/importar perfil, avatar (10 animales, colores, piel, pelo, barba, accesorios) |
| Mascota (`mascot`) | Mascota con estados de ánimo y rango (8 rangos: Novato → Nativo) |
| Portada (`landing`, `funciones`) | Página de presentación con su propio tema (`lpTheme`) |

### Textos y enlaces
- **36 enlaces externos únicos** (`https://…`). Lista completa en `enlaces-original.txt`.
- Textos legales y de honestidad: "Las marcas y logos pertenecen a sus titulares…", "Qué no incluimos y por qué", licencias de repositorios (Cataluña), fuentes comprobadas.

### Controles (ids)
- **151 ids** en el HTML, **131 usados por el JS**, y 2 creados dinámicamente (`moreBtn`, `statPop`).

### Restricciones técnicas que condicionan el diseño
- **CSP estricta** (`default-src 'self'`): no se pueden cargar fuentes de Google Fonts. D4 usaba Fredoka/Nunito; en la app se usa la pila del sistema, como ya hace la original.
- **Dos paletas y dos modos** (`noche`, `grafito` × claro/oscuro). Se conservan y se añade la paleta «Crema menta» (inspirada en D4, solo modo claro) como nueva opción del selector. Por defecto la app sigue en modo oscuro, como la original.
- **Sin servidor:** todo en un HTML. Funciona abriéndolo.

## 2. Cruce con D4 (qué aporta la maqueta y dónde encaja)

| Elemento D4 | Equivalente en la original | Decisión |
| --- | --- | --- |
| Barra inferior de 5: Inicio, Practicar, Sellos, Tienda, Perfil | Barra de 8 pestañas + hoja "Más" | **Se adopta.** Las 8 secciones se reparten en las 5 áreas (ver §3) |
| Inicio con saludo, nivel, camino de partes y monedas | Inicio (`gamePanel`) | **Se adapta** con el diseño de D4. Se mantienen todas las estadísticas |
| Practicar: ejercicio con opciones, "Comprobar/Continuar" | Sesión de ejercicio (`exercise`) | **Se adapta.** La lógica (formatos, pista, ventajas, PDF) no cambia |
| Sellos (logros) | Logros + hitos de racha | **Se adopta.** Los 7 logros y 5 hitos se conservan |
| Tienda con ofertas diarias (30 %), fin de semana (10 %) | Tienda de accesorios (`ACC_PRECIO` = 15, gratis: ninguno, gafas, gorra), solo al editar el perfil | **Nueva pestaña Tienda** que usa el motor de accesorios existente. Ofertas diarias: nuevo |
| Avatares de D4 (Pepa, Lucas…) | 10 animales con avatar propio | **No se reemplazan.** Los animales de la original son el sistema vigente |
| Marcos animados con partículas | No existe | **Nuevo** como accesorio tipo "marco", con los mismos efectos ya diseñados |
| Efectos (aura, vivo, confeti) | No existe | **Nuevo** como accesorios, con el motor de animación de D4 |
| Colores de fondo (incl. degradado) | Color del perfil (`color`) | **Se conserva** el sistema de colores de la original y se añade el degradado de D4 |
| Niveles A1–C2 como clasificación de exámenes (sin candados) | Chips de nivel (`levels`) | **Se conserva** la lógica de la original. Se adopta el diseño de D4 y el texto de cada nivel |
| Partes del examen (5 partes) | Secciones y estructura oficial | **Se conserva** la estructura real de la original |
| Repasar fallos | Repaso (`repasoBox`) | **Se conserva** |
| Simulacro (modo examen) | Modo examen (`modeToggle`) | **Se conserva** |
| Idioma de explicaciones y ejercicios (seg. control) | No existe en la original | **Nuevo** en Perfil, según tu indicación ("por defecto explicaciones en español, ejercicios en inglés"). Ver §4 |

## 3. Reparto de las 8 pestañas en las 5 áreas

| Área (barra inferior) | Contenido | Notas |
| --- | --- | --- |
| **Inicio** | Inicio original rediseñado | Igual que hoy |
| **Practicar** | Sub-pestañas: Ejercicios · Audio · Lectura · Recursos | Recursos y Lectura (las secciones más largas) quedan a un toque |
| **Sellos** | Sub-pestañas: Logros · Liga | Liga = pestaña Ranking original |
| **Tienda** | Ofertas de hoy, avatares, colores, efectos, marcos | Nueva |
| **Perfil** | Perfiles, Idioma, Importar, Copia de seguridad | Importar y Copia no se pierden (antes en "Más") |

Ningún contenido desaparece. Cambia solo el lugar donde se encuentra.

## 4. Decisiones que conviene confirmar

1. **Animales vs. avatares de D4.** Se mantienen los 10 animales de la original. Los avatares de D4 (Pepa, Lucas…) no se añaden.
2. **Monedas.** En la original se ganan con práctica y se gastan en accesorios. Las ofertas diarias de D4 se aplican a los accesorios de la tienda. ¿Quieres también los precios de D4 (marcos de 300–500) o los de la original (15)?
3. **Idioma de explicaciones/ejercicios.** Es nuevo y no existe en la original. ¿Lo implemento así (explicaciones en español, ejercicios en inglés, configurable)?
4. **Paleta por defecto.** Hecho: la crema es una opción del selector. Pendiente de decisión: ¿hacerla predeterminada en modo claro?

## 5. Verificación prevista
- **Batería de la fuente** (`pruebas/bateria-completa.sh`): volcado de 3.424 ejercicios, 15 comprobaciones de escritorio y móvil, copias de seguridad, teclado, formatos de importación, axe y contraste. La línea base de la original pasa completa (ver `base.json` y `bateria.log`).
- **Parecido de contenido** (nuevo): que cada URL, cada texto de §1 y cada id de la original aparezca en la versión nueva.
- **Revisión visual** en 390 px y 1280 px, claro y oscuro, en cada pestaña.

## 6. Resultados de la verificación

Línea base: la original es `fuente/` construida (`diseno-B-cockpit.html`, 1.137.671 bytes, igual que `app exámenes inglés.html`). El `preparacion-ingles.html` de octubre es una versión anterior y no se usa como referencia.

- **Contenido (parity.js):** 351 textos de la original; los 351 están en la nueva salvo cuatro rótulos de navegación que cambian a propósito: «Ranking» pasa a «Liga», «Más secciones» desaparece (todo queda en la barra o en las sub-pestañas), y «Lectura libre» y «Recursos» pasan a sub-pestañas (se generan al entrar en Practicar, por eso el análisis estático no las ve).
- **Enlaces:** 36 de 36 enlaces externos conservados. Los 2 enlaces internos (`#`, `#funciones`) de la original no aplican a la nueva.
- **Batería (bateria2.js):** 15 de 15. Se actualizó el selector de pestañas a la nueva navegación.
- **Volcado de ejercicios:** 3.424 ejercicios iguales a la referencia.
- **Copias de seguridad, importación de 8 formatos, teclado, nombre largo (320 y 390 px), objetivos táctiles 24 px:** sin errores.
- **Contraste (AAA 7:1):** la paleta crema tiene 2 avisos en textos verdes/marrones hardcodeados de XP y rango, heredados del estilo original. Noche y grafito tienen 5 cada una en modo claro, igual que antes.
