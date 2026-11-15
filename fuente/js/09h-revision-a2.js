import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión A2, lote 1 (gramática): correcciones de preguntas. Clave: nivel + texto original. */
const REVISION_A2 = [
  {"level": "A2", "q": "He asked me ___ the way to the station.", "cambios": {"q": "He asked me ___ the station was.", "options": ["where", "what", "who"]}},
  {"level": "A2", "q": "They ___ to the shop when it closed.", "cambios": {"options": ["were going", "has gone", "goes"]}},
  {"level": "A2", "q": "You ___ wear a coat today. It's warm outside.", "cambios": {"options": ["don't need to", "mustn't", "didn't need to"]}},
  {"level": "A2", "q": "You ___ go to bed so late on school nights.", "cambios": {"options": ["shouldn't", "didn't need to", "couldn't"]}},
  {"level": "A2", "q": "You ___ bring a pen. We have plenty.", "cambios": {"options": ["don't need to", "couldn't", "didn't need to"]}},
  {"level": "A2", "q": "We must ___ the bus. It leaves in five minutes.", "cambios": {"agregar": ["take"]}},
  {"level": "A2", "q": "Could you ___ me the salt, please?", "cambios": {"agregar": ["give"]}},
  {"level": "A2", "q": "Let's meet ___ the cinema.", "cambios": {"agregar": ["in", "outside"]}},
  {"level": "A2", "q": "You must ___ your homework before you go out.", "cambios": {"agregar": ["do"]}},
  {"level": "A2", "q": "Please ___ the door when you leave.", "cambios": {"agregar": ["shut"]}},
  {"level": "A2", "q": "The hotel was ___ than we thought, so we stayed longer.", "cambios": {"agregar": ["better"]}},
  {"level": "A2", "q": "You ___ smoke here. It's not allowed.", "cambios": {"agregar": ["can't"]}},
  {"level": "A2", "q": "I had a sandwich, ___ I wasn't very hungry.", "cambios": {"agregar": ["though"]}},
  {"level": "A2", "q": "You ___ be so noisy. The baby is sleeping.", "cambios": {"agregar": ["mustn't"]}},
  {"level": "A2", "q": "Can you ___ this word for me? I don't understand it.", "cambios": {"agregar": ["translate"]}},
  {"level": "A2", "q": "I usually ___ breakfast with my family.", "cambios": {"agregar": ["eat"]}},
  {"level": "A2", "q": "Rewrite: 'He doesn't have much money.' → 'He doesn't have ___ money.'", "cambios": {"quitar": ["many"]}},
];

for (const r of REVISION_A2) {
  const { agregar, quitar, ...resto } = r.cambios;
  for (const lista of [ITEMS, EXTRA_ITEMS]) {
    lista.filter(x => x.level === r.level && x.q === r.q).forEach(it => {
      Object.assign(it, resto);
      (agregar || []).forEach(a => { if (!it.accepted.includes(a)) it.accepted.push(a); });
      if (quitar) it.accepted = it.accepted.filter(a => !quitar.includes(a));
    });
  }
}
