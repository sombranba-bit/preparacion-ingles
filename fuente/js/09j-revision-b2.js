import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión B2, lotes 1-2 (lectura y gramática): respuestas y opciones ambiguas. Clave: nivel + texto original. */
const REVISION_B2 = [
  {"level": "B2", "q": "Según el texto: «The museum opens later on weekdays in summer.»", "cambios": {"answer": 2}},
  {"level": "B2", "q": "Según el texto: «Jack has already been awarded the scholarship.»", "cambios": {"answer": 1}},
  {"level": "B2", "q": "The report ___ by the time the manager arrived.", "cambios": {"options": ["had been finished", "finishing", "finished"]}},
  {"level": "B2", "q": "If I ___ you, I would apologise.", "cambios": {"options": ["were", "be", "am"]}},
  {"level": "B2", "q": "The old bridge ___ by the time the new road opens.", "cambios": {"options": ["will have been demolished", "demolishing", "is demolished"]}},
  {"level": "B2", "q": "The goods ___ by the time the customer complains.", "cambios": {"options": ["will have been delivered", "delivering", "have been delivered"]}},
  {"level": "B2", "q": "The new road ___ by the time the next election is held.", "cambios": {"options": ["has built", "will have been built", "building"]}},
  {"level": "B2", "q": "I ___ a lot of time on this project, so I'm glad it's finished.", "cambios": {"q": "I ___ a lot of time on this project last year."}},
  {"level": "B2", "q": "No matter how hard you try, you ___ never please everyone.", "cambios": {"options": ["will", "would", "are"]}},
  {"level": "B2", "q": "I'd prefer you ___ the decision without consulting me.", "cambios": {"options": ["not to make", "not make", "making"]}},
  {"level": "B2", "q": "Completa los huecos: Trabajo remoto", "cambios": {"accepted": ["adapts", "while", "are trying"]}},
];

for (const r of REVISION_B2) {
  const { agregar, quitar, ...resto } = r.cambios;
  for (const lista of [ITEMS, EXTRA_ITEMS]) {
    lista.filter(x => x.level === r.level && x.q === r.q).forEach(it => {
      Object.assign(it, resto);
      (agregar || []).forEach(a => { if (!it.accepted.includes(a)) it.accepted.push(a); });
      if (quitar) it.accepted = it.accepted.filter(a => !quitar.includes(a));
    });
  }
}
