import { ITEMS } from "./01-nucleo-niveles-audio.js";
import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Revisión B1, lote 1: lectura, gramática, reformulación y escucha. Clave: nivel + texto original. */
const REVISION_B1 = [
  {"level": "B1", "q": "Although ___ the same age, the twins are very different.", "cambios": {"options": ["they are", "are they", "being"]}},
  {"level": "B1", "q": "You ___ have told me. I would have understood.", "cambios": {"options": ["could", "wouldn't", "mustn't"]}},
  {"level": "B1", "q": "If I ___ you, I would apologise to her.", "cambios": {"options": ["were", "be", "am"]}},
  {"level": "B1", "q": "I haven't visited London for two years.", "cambios": {"q": "Rewrite: 'The last time I visited London was two years ago.'"}},
  {"level": "B1", "q": "Everyone agreed with the decision.", "cambios": {"quitar": ["agreed with"]}},
  {"level": "B1", "q": "When will the man find out?", "cambios": {"audio": "Man: I've applied for a job at the hospital. Woman: That's great! When will you find out? Man: I'll know next week."}},
  {"level": "B1", "q": "How did the team play in the second half?", "cambios": {"agregar": ["excellent", "very well", "well"]}},
  {"level": "B1", "q": "Relaciona cada texto con su título", "cambios": {"q": "Relaciona cada consejo con su tema", "pairs": [["Compara precios en varias tiendas antes de comprar.", "Cómo ahorrar en la compra"], ["Practica cada día, aunque sea diez minutos.", "Por qué aprender un idioma"], ["Lleva una copia del pasaporte y guárdala aparte.", "Consejos para viajar"]], "accepted": ["Compara precios en varias tiendas antes de comprar. = Cómo ahorrar en la compra; Practica cada día, aunque sea diez minutos. = Por qué aprender un idioma; Lleva una copia del pasaporte y guárdala aparte. = Consejos para viajar"], "explain": "Empareja cada consejo con su tema."}},
];

// Duplicado: el mismo ejercicio de cinturón aparecía dos veces.
for (const lista of [ITEMS, EXTRA_ITEMS]) {
  for (let k = lista.length - 1; k >= 0; k--) {
    const x = lista[k];
    if (x.level === "B1" && x.q === "You ___ wear a seatbelt; it is the law.") lista.splice(k, 1);
  }
}

for (const r of REVISION_B1) {
  const { agregar, quitar, ...resto } = r.cambios;
  for (const lista of [ITEMS, EXTRA_ITEMS]) {
    lista.filter(x => x.level === r.level && x.q === r.q).forEach(it => {
      Object.assign(it, resto);
      (agregar || []).forEach(a => { if (!it.accepted.includes(a)) it.accepted.push(a); });
      if (quitar) it.accepted = it.accepted.filter(a => !quitar.includes(a));
    });
  }
}
