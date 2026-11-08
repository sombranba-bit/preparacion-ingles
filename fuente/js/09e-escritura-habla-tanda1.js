import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* Tanda 1 de escritura y habla (5 por nivel A1–C2). Rangos y tiempos según protocolo-escritura-habla.md */
(function () {
  const out = [
  {
    "level": "A1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe un mensaje corto a un amigo. Di dónde vives y qué te gusta hacer los fines de semana.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Frases simples en presente. Ej.: I live in Madrid. On weekends I like to play football with my friends. (Nivel A1: rango orientativo de la app (sin límite oficial confirmado))",
    "part": "Tarea 1",
    "min": 15,
    "max": 40,
    "criteria": [
      "Usa frases completas",
      "Dice dónde vives",
      "Dice una actividad de fin de semana"
    ]
  },
  {
    "level": "A1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe tres frases sobre tu familia: quién está en tu familia, dónde viven y a qué se dedican.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Ej.: I have a brother. He lives in Valencia. He is a doctor. (Nivel A1: rango orientativo de la app)",
    "part": "Tarea 2",
    "min": 15,
    "max": 40,
    "criteria": [
      "Tres frases",
      "Nombra al menos dos familiares",
      "Dice una profesión o estudio"
    ]
  },
  {
    "level": "A1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una nota a tu profesora. Di que estás enferma y que hoy no puedes ir a clase.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Ej.: Dear Ms. Smith, I am sick today. I cannot come to class. Sorry. Maria. (Nivel A1: rango orientativo de la app)",
    "part": "Tarea 3",
    "min": 15,
    "max": 40,
    "criteria": [
      "Saludo y despedida",
      "Dice que está enferma",
      "Dice que no va a clase hoy"
    ]
  },
  {
    "level": "A1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Habla de tu rutina diaria: a qué hora te levantas y qué haces después de clase.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Usa la hora (at seven o'clock) y secuencias (then, after that). (Nivel A1: tiempos orientativos de la app)",
    "part": "Parte 1",
    "prompt": "Talk about your daily routine: what time you get up and what you do after school.",
    "prep": 30,
    "talk": 60
  },
  {
    "level": "A1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Habla de tu comida favorita y de qué comes en casa.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Frases con I like / I don't like. (Nivel A1: tiempos orientativos de la app)",
    "part": "Parte 2",
    "prompt": "Talk about your favourite food and what you eat at home.",
    "prep": 20,
    "talk": 45
  },
  {
    "level": "A2",
    "type": "writing",
    "format": "essay",
    "q": "Vas de vacaciones y escribes un correo a un amigo. Invítale a ir contigo. Di adónde vais y cuándo, y haz dos preguntas.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Mínimo oficial Key: 25 palabras para correo/nota. (Cambridge Key (A2): correo/nota ≥ 25 palabras)",
    "part": "Parte 1",
    "min": 25,
    "max": 50,
    "criteria": [
      "Invitación clara",
      "Lugar y fecha",
      "Dos preguntas al amigo"
    ]
  },
  {
    "level": "A2",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una historia sobre un día que recuerdes. Incluye cuándo fue, dónde estabas, qué pasó y cómo te sentiste.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Mínimo oficial Key: 35 palabras para historia. (Cambridge Key (A2): historia ≥ 35 palabras)",
    "part": "Parte 2",
    "min": 35,
    "max": 60,
    "criteria": [
      "Cuándo y dónde",
      "Qué pasó (pasado simple)",
      "Cómo te sentiste"
    ]
  },
  {
    "level": "A2",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una nota a tu compañero de piso: el baño está sucio. Pídele que lo limpie el sábado y propón una hora.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Ej.: Could you clean the bathroom on Saturday? How about 10 o'clock? (Cambridge Key (A2): nota ≥ 25 palabras)",
    "part": "Parte 3",
    "min": 25,
    "max": 50,
    "criteria": [
      "Explica el problema",
      "Pide algo concreto",
      "Propone una hora"
    ]
  },
  {
    "level": "A2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Habla de tus aficiones y de tu tiempo libre.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Preguntas y respuestas cortas, luego amplía con because. (Cambridge Key (A2): parte 1 de habla, 3–4 min por pareja)",
    "part": "Parte 1",
    "prompt": "Talk about your hobbies and what you do in your free time.",
    "prep": 0,
    "talk": 60
  },
  {
    "level": "A2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Habla de un lugar que visitaste y te gustó. Di qué hiciste, con quién fuiste y por qué te gustó.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Pasado simple y razones con because. (Cambridge Key (A2): parte 2 de habla, 5–6 min por pareja)",
    "part": "Parte 2",
    "prompt": "Talk about a place you visited and liked. Say what you did, who you went with and why you liked it.",
    "prep": 30,
    "talk": 90
  },
  {
    "level": "B1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe un correo a un hotel. Reservaste una habitación para la semana que viene, pero necesitas cambiar la fecha. Explica el problema y pregunta qué opciones hay.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Tono formal. Ej.: I am writing to ask whether it is possible to change my booking. (Cambridge PET (B1): unas 100 palabras por tarea)",
    "part": "Tarea 1",
    "min": 90,
    "max": 120,
    "criteria": [
      "Explica el motivo del cambio",
      "Pide un cambio de fecha concreto",
      "Pregunta por las opciones"
    ]
  },
  {
    "level": "B1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una reseña de una cafetería o restaurante que conozcas bien para una web local. Describe la comida, el servicio y si lo recomiendas.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Opiniones con adjetivos y comparativos. (Cambridge PET (B1): unas 100 palabras por tarea)",
    "part": "Tarea 2",
    "min": 90,
    "max": 120,
    "criteria": [
      "Describe la comida",
      "Opina sobre el servicio",
      "Recomienda o no"
    ]
  },
  {
    "level": "B1",
    "type": "writing",
    "format": "essay",
    "q": "Escribe un ensayo: «Aprender un idioma es más fácil con una app que con un profesor». Da tu opinión y dos razones.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Conectores: however, for example, on the other hand. (Cambridge PET (B1): ensayo de unas 100 palabras)",
    "part": "Tarea 3",
    "min": 90,
    "max": 130,
    "criteria": [
      "Da una opinión clara",
      "Dos razones",
      "Un ejemplo"
    ]
  },
  {
    "level": "B1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Habla de una película que viste hace poco. Di de qué trataba y si la recomendarías.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Narrativa en pasado y opinión con I would recommend it because. (Cambridge PET (B1): monólogo de parte 2, orientativo)",
    "part": "Parte 2",
    "prompt": "Talk about a film you watched recently. Say what it was about and whether you would recommend it.",
    "prep": 30,
    "talk": 90
  },
  {
    "level": "B1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Dos sugerencias para mejorar la cantina del colegio: más comida sana y pausas de comida más largas. ¿Cuál es mejor? Decidid juntos.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Tarea colaborativa: propón, pregunta, acuerda. (Cambridge PET (B1): parte de tarea colaborativa, orientativo)",
    "part": "Parte 3",
    "prompt": "Two suggestions to improve the school canteen: more healthy food, and longer lunch breaks. Which is better? Decide together.",
    "prep": 45,
    "talk": 60
  },
  {
    "level": "B2",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una carta a una revista. Describe un problema del transporte público de tu ciudad y propón dos soluciones.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Estructura: problema, soluciones, conclusión. (Cambridge FCE (B2): 140–190 palabras)",
    "part": "Parte 1",
    "min": 140,
    "max": 190,
    "criteria": [
      "Describe el problema con ejemplos",
      "Propone dos soluciones",
      "Tono adecuado para una revista"
    ]
  },
  {
    "level": "B2",
    "type": "writing",
    "format": "essay",
    "q": "Escribe un informe para tu jefe sobre los resultados de una encuesta de teletrabajo. Presenta los hallazgos y recomendaciones.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Lenguaje formal, pasivas y frases de resultado. (Cambridge FCE (B2): 140–190 palabras)",
    "part": "Parte 2",
    "min": 140,
    "max": 190,
    "criteria": [
      "Hallazgos claros",
      "Dos o tres recomendaciones",
      "Estructura de informe (títulos o secciones)"
    ]
  },
  {
    "level": "B2",
    "type": "writing",
    "format": "essay",
    "q": "Escribe una reseña de un libro que hayas leído para un club de lectura en inglés. Resume la trama brevemente y di a quién le gustaría.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Evita contar el final. (Cambridge FCE (B2): 140–190 palabras)",
    "part": "Parte 3",
    "min": 140,
    "max": 190,
    "criteria": [
      "Resumen breve de la trama",
      "Opinión razonada",
      "A quién recomiendas el libro"
    ]
  },
  {
    "level": "B2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Compara las ventajas y desventajas de vivir en una ciudad grande.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Estructura: ventaja, desventaja, conclusión (on the one hand / on the other hand). (Cambridge FCE (B2): parte de monólogo, duración orientativa)",
    "part": "Parte 2",
    "prompt": "Talk about the advantages and disadvantages of living in a big city.",
    "prep": 60,
    "talk": 60
  },
  {
    "level": "B2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Dos trabajos: guía de montaña y programador en una oficina. Hablad de las ventajas de cada uno y decidid cuál elegiríais.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Especulación con may/might/must y comparación. (Cambridge FCE (B2): parte colaborativa, orientativo)",
    "part": "Parte 3",
    "prompt": "Two jobs: a mountain guide and a software developer in an office. Talk about the advantages of each and decide which one you would choose.",
    "prep": 45,
    "talk": 90
  },
  {
    "level": "C1",
    "type": "writing",
    "format": "essay",
    "q": "Artículo para una revista en inglés: «¿Necesitan las ciudades más zonas verdes o más vivienda?». Da tu punto de vista y apóyalo con argumentos.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Argumento matizado, no lista de ventajas. (Cambridge CAE (C1): 220–260 palabras)",
    "part": "Parte 1",
    "min": 220,
    "max": 260,
    "criteria": [
      "Punto de vista claro",
      "Dos o tres argumentos apoyados",
      "Consideras la postura contraria"
    ]
  },
  {
    "level": "C1",
    "type": "writing",
    "format": "essay",
    "q": "Propuesta para la junta de tu empresa sobre una semana laboral de cuatro días. Describe beneficios, riesgos y cómo medir el éxito.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Lenguaje de propuesta: it would be advisable, we recommend. (Cambridge CAE (C1): 220–260 palabras)",
    "part": "Parte 2",
    "min": 220,
    "max": 260,
    "criteria": [
      "Beneficios y riesgos",
      "Medidas de éxito",
      "Tono formal de propuesta"
    ]
  },
  {
    "level": "C1",
    "type": "writing",
    "format": "essay",
    "q": "Reseña de una serie documental para personas que no la han visto. Valora sus puntos fuertes y sus limitaciones.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Evaluación con adjetivos precisos y matices. (Cambridge CAE (C1): 220–260 palabras)",
    "part": "Parte 3",
    "min": 220,
    "max": 260,
    "criteria": [
      "Valoración equilibrada",
      "Ejemplos concretos",
      "Sin spoilers graves"
    ]
  },
  {
    "level": "C1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Compara dos formas de aprender una habilidad nueva: un curso presencial con profesor y una app en casa. Di cómo cada entorno afecta a la motivación.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Comparación con speculation: they might be..., which suggests... (Cambridge CAE (C1): parte de monólogo, orientativo)",
    "part": "Parte 2",
    "prompt": "Compare two ways of learning a new skill: a face-to-face course with a teacher, and an app at home. Say how each environment affects motivation.",
    "prep": 60,
    "talk": 120
  },
  {
    "level": "C1",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: ¿Crees que las redes sociales han cambiado la forma en que la gente hace amigos? Razona tu respuesta.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Opinión con matices: to some extent, on balance. (Cambridge CAE (C1): discusión, orientativo)",
    "part": "Parte 4",
    "prompt": "Do you think social media has changed the way people make friends? Give reasons.",
    "prep": 0,
    "talk": 120
  },
  {
    "level": "C2",
    "type": "writing",
    "format": "essay",
    "q": "Informe para una universidad: ¿deben tener los títulos online el mismo valor que los presenciales? Evalúa los argumentos de ambas partes y llega a una conclusión.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Rango oficial CPE parte 1: 240–280 palabras. (Cambridge CPE (C2): parte 1, 240–280 palabras)",
    "part": "Parte 1 (obligatoria)",
    "min": 240,
    "max": 280,
    "criteria": [
      "Evalúa ambas posturas",
      "Conclusión justificada",
      "Registro académico"
    ]
  },
  {
    "level": "C2",
    "type": "writing",
    "format": "essay",
    "q": "Reseña para una revista literaria de una novela sobre la memoria y la identidad. Analiza cómo crea tensión el autor y si el final es satisfactorio.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Rango oficial CPE parte 2: 280–320 palabras. (Cambridge CPE (C2): parte 2, 280–320 palabras)",
    "part": "Parte 2 (reseña)",
    "min": 280,
    "max": 320,
    "criteria": [
      "Análisis de la técnica narrativa",
      "Juicio sobre el final",
      "Ejemplos del texto"
    ]
  },
  {
    "level": "C2",
    "type": "writing",
    "format": "essay",
    "q": "Propuesta para un museo: cómo reinterpretar una colección histórica para visitantes jóvenes, y cuáles son sus límites.",
    "accepted": [
      "(redacción libre)"
    ],
    "explain": "Rango oficial CPE parte 2: 280–320 palabras. (Cambridge CPE (C2): parte 2, 280–320 palabras)",
    "part": "Parte 2 (propuesta)",
    "min": 280,
    "max": 320,
    "criteria": [
      "Propuesta concreta",
      "Limitaciones honestas",
      "Registro formal"
    ]
  },
  {
    "level": "C2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Dos propuestas para conservar tradiciones locales: un festival anual con talleres para jóvenes y un museo digital del pueblo. Compáralas, especula por qué la gente participa y decidid cuál funcionaría mejor en un pueblo pequeño.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Tarea colaborativa con negociación: I see your point, but..., would you agree that... (Cambridge CPE (C2): parte 2, 4 min incluido 1 min de fotos)",
    "part": "Parte 2",
    "prompt": "Two proposals for preserving local traditions: an annual festival with workshops for young people, and a digital village museum. Compare them, speculate on why people take part, and decide which would work best in a small town.",
    "prep": 30,
    "talk": 180
  },
  {
    "level": "C2",
    "type": "speaking",
    "format": "speak",
    "q": "Expresión oral: Algunos dicen que el arte debería ser gratuito para todos. Analiza la afirmación.",
    "accepted": [
      "(autoevaluación)"
    ],
    "explain": "Monólogo de 2 min con argumento, contraargumento y conclusión. (Cambridge CPE (C2): monólogo de 2 min por candidato)",
    "part": "Parte 3",
    "prompt": "Some say that art should be free for everyone. Discuss.",
    "prep": 60,
    "talk": 120
  }
];
  ITEMS.push(...out);
})();
