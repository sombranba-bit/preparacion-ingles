import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión B2, lote 1 (lectura): corrige la respuesta de dos afirmaciones verdadero/falso. Clave: nivel + texto original. */
const REVISION_B2 = [
  {"level": "B2", "q": "Según el texto: «The museum opens later on weekdays in summer.»", "cambios": {"answer": 2}},
  {"level": "B2", "q": "Según el texto: «Jack has already been awarded the scholarship.»", "cambios": {"answer": 1}},
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
