import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión C1, lote 1 (gramática): opciones de distracción que también eran correctas. Clave: nivel + texto original. */
const REVISION_C1 = [
  {"level": "C1", "q": "He is ___ to lose his temper when things go wrong.", "cambios": {"options": ["prone", "eager", "keen"]}},
  {"level": "C1", "q": "The new law will ___ into effect once it is published in the gazette.", "cambios": {"options": ["come", "become", "fall"]}},
  {"level": "C1", "q": "I'd ___ not comment on the allegations until the investigation concludes.", "cambios": {"options": ["prefer to", "prefer", "wish"]}},
  {"level": "C1", "q": "The team showed great ___ under pressure. (RESIST)", "cambios": {"quitar": ["resistance"]}},
  {"level": "C1", "q": "Neither the manager nor the staff were informed of the change.", "cambios": {"q": "Neither the manager nor the staff was informed of the change.", "accepted": ["Neither the manager nor the staff were informed of the change."]}},
];

for (const r of REVISION_C1) {
  const { agregar, quitar, ...resto } = r.cambios;
  for (const lista of [ITEMS, EXTRA_ITEMS]) {
    lista.filter(x => x.level === r.level && x.q === r.q).forEach(it => {
      Object.assign(it, resto);
      (agregar || []).forEach(a => { if (!it.accepted.includes(a)) it.accepted.push(a); });
      if (quitar) it.accepted = it.accepted.filter(a => !quitar.includes(a));
    });
  }
}
