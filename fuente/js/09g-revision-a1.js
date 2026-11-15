import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión A1, lote 1: correcciones de preguntas de lectura y escucha. Clave: nivel + texto original. */
const REVISION_A1 = [
  {"level": "A1", "q": "At what time is the shop closed?", "cambios": {"q": "On which day is the shop closed?"}},
  {"level": "A1", "q": "Is the swimming pool open today?", "cambios": {"q": "Is the swimming pool open on Mondays?", "audio": "Man: Is the swimming pool open on Mondays? Woman: No, it's closed on Mondays."}},
  {"level": "A1", "q": "Why should the boy take his jacket?", "cambios": {"options": ["It is windy", "It is hot", "It is raining"]}},
  {"level": "A1", "q": "Where exactly is the post office?", "cambios": {"options": ["Next to the supermarket", "Next to the school", "Behind the hospital"]}},
  {"level": "A1", "q": "The shop ___ on Sundays.", "cambios": {"options": ["is closed", "closing", "close"]}},
  {"level": "A1", "q": "Dinner ___ ready at eight.", "cambios": {"q": "Dinner ___ ready at eight tomorrow.", "options": ["will be", "was", "be"]}},
];

for (const r of REVISION_A1) {
  for (const lista of [ITEMS, EXTRA_ITEMS]) {
    lista.filter(x => x.level === r.level && x.q === r.q).forEach(it => Object.assign(it, r.cambios));
  }
}
