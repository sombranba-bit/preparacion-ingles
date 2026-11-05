import { mascotMount, mascotPark } from "./02-progreso-xp-racha-mascota.js";
import { index, queue, renderHome, speedIdx } from "./04-recompensas-logros-copia-auto.js";
import { renderRanking } from "./09-datos-ejercicios-4-acento-velocidad.js";
import { renderTienda, renderLogrosPanel, renderPerfilPanel } from "./10-tienda-logros-perfil.js";

/* ---------- Almacenamiento por perfil: cada perfil guarda sus datos con un prefijo propio ---------- */
export const RAW_LS = window.localStorage;
export const PROFILE_RAW_KEYS = ["perfiles-ingles", "perfil-activo"];
const PROFILE_PREFIX_RE = /^(p[a-z0-9]+|inv)\|/;
function activeProfilePrefix() {
  try {
    const list = JSON.parse(RAW_LS.getItem("perfiles-ingles") || "[]");
    const id = RAW_LS.getItem("perfil-activo");
    if (id === "invitado") return "inv|";
    const p = list.find(x => x.id === id);
    return p ? p.prefix : "";
  } catch (e) { return ""; }
}
const APP_PREFIX = activeProfilePrefix();
export const appStore = {
  _k: k => PROFILE_RAW_KEYS.includes(k) ? k : APP_PREFIX + k,
  _mine: rk => PROFILE_RAW_KEYS.includes(rk) ? false : (APP_PREFIX ? rk.startsWith(APP_PREFIX) : !PROFILE_PREFIX_RE.test(rk)),
  _keys() { const out = []; for (let i = 0; i < RAW_LS.length; i++) { const rk = RAW_LS.key(i); if (this._mine(rk)) out.push(rk.slice(APP_PREFIX.length)); } return out; },
  getItem(k) { return RAW_LS.getItem(this._k(k)); },
  setItem(k, v) { RAW_LS.setItem(this._k(k), v); },
  removeItem(k) { RAW_LS.removeItem(this._k(k)); },
  key(i) { return this._keys()[i] ?? null; },
  get length() { return this._keys().length; }
};

/* ============================================================
   CONFIGURACIÓN
   ============================================================ */
export const LEVELS = {
  A1: { desc: "Básico: frases sencillas sobre tu entorno inmediato.", color: "#247b35", dark: "#35b24c" },
  A2: { desc: "Elemental: situaciones cotidianas y rutinas.",           color: "#097957", dark: "#0db07f" },
  B1: { desc: "Intermedio: textos sobre temas conocidos y experiencias.", color: "#186db9", dark: "#4fa0e8" },
  B2: { desc: "Intermedio alto: ideas abstractas y textos complejos.",  color: "#3b5bdb", dark: "#8296e8" },
  C1: { desc: "Avanzado: lenguaje flexible y académico.",               color: "#7048e8", dark: "#a58cf1" },
  C2: { desc: "Maestría: matices, registro y precisión casi nativa.",    color: "#c72860", dark: "#e4799e" }
};
// Color del nivel como texto/acento: versión clara u oscura según el modo
export function mixHex(a, b, t) { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); }
// Niveles = gama del acento de la paleta activa: A1 es el acento; de ahí se aclara (oscuro) o se oscurece (claro)
export function levelColor(lv) {
  const root = document.documentElement, acc = (getComputedStyle(root).getPropertyValue("--accent") || "").trim();
  const base = /^#[0-9a-f]{6}$/i.test(acc) ? acc : "#0f766e", k = Object.keys(LEVELS).indexOf(lv);
  // Cada nivel gira el tono (matiz) del acento: en modo claro se oscurece, en oscuro se aclara un poco
  const [h, sat] = hexToHsl(base), dir = (h > 60 && h < 200) ? 1 : -1;
  if (k === 0) return base;
  return root.dataset.mode === "dark" ? hslToHex((h + dir * 16 * k + 360) % 360, sat * (0.95 - 0.1 * k), 0.68) : hslToHex((h + dir * 16 * k + 360) % 360, sat, 0.28);
}
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const sat = d / (1 - Math.abs(2 * l - 1));
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, sat, l];
}
function hslToHex(h, sat, l) {
  const c = (1 - Math.abs(2 * l - 1)) * sat, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return "#" + [r, g, b].map(v => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
}
export function lc(lv) { return levelColor(Object.keys(LEVELS).find(k => LEVELS[k] === lv)); }

export const SECTIONS = {
  grammar:   { name: "Gramática",     desc: "Elige la forma correcta",           icon: "pencil", color: "#7048e8", soft: "#f1ecff" },
  reading:   { name: "Lectura",       desc: "Comprensión de textos",             icon: "book", color: "#1c7ed6", soft: "#e7f2ff" },
  listening: { name: "Escucha",       desc: "Audio en la propia app",            icon: "headphones", color: "#0ca678", soft: "#e3f9f2" },
  rephrase:  { name: "Reformulación", desc: "Reescribe sin cambiar el sentido",  icon: "repeat", color: "#f76707", soft: "#fff1e6" },
  usage:     { name: "Uso del inglés", desc: "Transformación y formación de palabras", icon: "", color: "#0ca6a6", soft: "#e0f7f7" },
  writing:   { name: "Escritura",     desc: "Redacción con criterios de examen", icon: "", color: "#c2410c", soft: "#fff0e8" },
  speaking:  { name: "Expresión oral", desc: "Preparación y monólogo con tiempo", icon: "", color: "#be185d", soft: "#fde8f2" }
};

export const EXAMS = [
  { name: "Cambridge English", color: "#0b5394", flag: "<svg viewBox='0 0 60 30' aria-label='Reino Unido'><clipPath id='uk10'><path d='M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z'/></clipPath><path d='M0,0 v30 h60 v-30 z' fill='#012169'/><path d='M0,0 L60,30 M60,0 L0,30' stroke='#fff' stroke-width='6'/><path d='M0,0 L60,30 M60,0 L0,30' clip-path='url(#uk10)' stroke='#C8102E' stroke-width='4'/><path d='M30,0 v30 M0,15 h60' stroke='#fff' stroke-width='10'/><path d='M30,0 v30 M0,15 h60' stroke='#C8102E' stroke-width='6'/></svg>", levels: "A2 Key · B1 PET · B2 FCE · C1 CAE · C2 CPE", url: "https://www.cambridgeenglish.org/exams-and-tests/" },
  { name: "Oxford Test of English", color: "#002147", flag: "<svg viewBox='0 0 60 30' aria-label='Reino Unido'><clipPath id='uk11'><path d='M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z'/></clipPath><path d='M0,0 v30 h60 v-30 z' fill='#012169'/><path d='M0,0 L60,30 M60,0 L0,30' stroke='#fff' stroke-width='6'/><path d='M0,0 L60,30 M60,0 L0,30' clip-path='url(#uk11)' stroke='#C8102E' stroke-width='4'/><path d='M30,0 v30 M0,15 h60' stroke='#fff' stroke-width='10'/><path d='M30,0 v30 M0,15 h60' stroke='#C8102E' stroke-width='6'/></svg>", levels: "A2 · B1 · B2 · C1", url: "https://elt.oup.com/feature/global/oxford-test-of-english/test-takers?cc=gb&selLanguage=en" },
  { name: "EOI Aragón", color: "#c92a2a", flag: "<svg viewBox='0 0 60 40' aria-label='Aragón'><rect y='0.000' width='60' height='4.444' fill='#FFD500'/><rect y='4.444' width='60' height='4.444' fill='#DA121A'/><rect y='8.889' width='60' height='4.444' fill='#FFD500'/><rect y='13.333' width='60' height='4.444' fill='#DA121A'/><rect y='17.778' width='60' height='4.444' fill='#FFD500'/><rect y='22.222' width='60' height='4.444' fill='#DA121A'/><rect y='26.667' width='60' height='4.444' fill='#FFD500'/><rect y='31.111' width='60' height='4.444' fill='#DA121A'/><rect y='35.556' width='60' height='4.444' fill='#FFD500'/></svg>", levels: "A2 · B1 · B2 · C1 · C2", url: "https://www.aragon.es/tramitador/-/tramite/escuelas-oficiales-de-idiomas/pruebas-de-certificacion-alumnado-oficial-y-libre" },
  { name: "TOEFL iBT", color: "#c2410c", flag: "<svg viewBox='0 0 76 40' aria-label='Estados Unidos'><rect width='76' height='40' fill='#fff'/><rect y='0.00' width='76' height='3.08' fill='#B22234'/><rect y='6.15' width='76' height='3.08' fill='#B22234'/><rect y='12.31' width='76' height='3.08' fill='#B22234'/><rect y='18.46' width='76' height='3.08' fill='#B22234'/><rect y='24.62' width='76' height='3.08' fill='#B22234'/><rect y='30.77' width='76' height='3.08' fill='#B22234'/><rect y='36.92' width='76' height='3.08' fill='#B22234'/><rect width='32.4' height='21.54' fill='#3C3B6E'/><circle cx='3.20' cy='2.40' r='0.95' fill='#fff'/><circle cx='8.60' cy='2.40' r='0.95' fill='#fff'/><circle cx='14.00' cy='2.40' r='0.95' fill='#fff'/><circle cx='19.40' cy='2.40' r='0.95' fill='#fff'/><circle cx='24.80' cy='2.40' r='0.95' fill='#fff'/><circle cx='30.20' cy='2.40' r='0.95' fill='#fff'/><circle cx='5.90' cy='4.80' r='0.95' fill='#fff'/><circle cx='11.30' cy='4.80' r='0.95' fill='#fff'/><circle cx='16.70' cy='4.80' r='0.95' fill='#fff'/><circle cx='22.10' cy='4.80' r='0.95' fill='#fff'/><circle cx='27.50' cy='4.80' r='0.95' fill='#fff'/><circle cx='3.20' cy='7.20' r='0.95' fill='#fff'/><circle cx='8.60' cy='7.20' r='0.95' fill='#fff'/><circle cx='14.00' cy='7.20' r='0.95' fill='#fff'/><circle cx='19.40' cy='7.20' r='0.95' fill='#fff'/><circle cx='24.80' cy='7.20' r='0.95' fill='#fff'/><circle cx='30.20' cy='7.20' r='0.95' fill='#fff'/><circle cx='5.90' cy='9.60' r='0.95' fill='#fff'/><circle cx='11.30' cy='9.60' r='0.95' fill='#fff'/><circle cx='16.70' cy='9.60' r='0.95' fill='#fff'/><circle cx='22.10' cy='9.60' r='0.95' fill='#fff'/><circle cx='27.50' cy='9.60' r='0.95' fill='#fff'/><circle cx='3.20' cy='12.00' r='0.95' fill='#fff'/><circle cx='8.60' cy='12.00' r='0.95' fill='#fff'/><circle cx='14.00' cy='12.00' r='0.95' fill='#fff'/><circle cx='19.40' cy='12.00' r='0.95' fill='#fff'/><circle cx='24.80' cy='12.00' r='0.95' fill='#fff'/><circle cx='30.20' cy='12.00' r='0.95' fill='#fff'/><circle cx='5.90' cy='14.40' r='0.95' fill='#fff'/><circle cx='11.30' cy='14.40' r='0.95' fill='#fff'/><circle cx='16.70' cy='14.40' r='0.95' fill='#fff'/><circle cx='22.10' cy='14.40' r='0.95' fill='#fff'/><circle cx='27.50' cy='14.40' r='0.95' fill='#fff'/><circle cx='3.20' cy='16.80' r='0.95' fill='#fff'/><circle cx='8.60' cy='16.80' r='0.95' fill='#fff'/><circle cx='14.00' cy='16.80' r='0.95' fill='#fff'/><circle cx='19.40' cy='16.80' r='0.95' fill='#fff'/><circle cx='24.80' cy='16.80' r='0.95' fill='#fff'/><circle cx='30.20' cy='16.80' r='0.95' fill='#fff'/><circle cx='5.90' cy='19.20' r='0.95' fill='#fff'/><circle cx='11.30' cy='19.20' r='0.95' fill='#fff'/><circle cx='16.70' cy='19.20' r='0.95' fill='#fff'/><circle cx='22.10' cy='19.20' r='0.95' fill='#fff'/><circle cx='27.50' cy='19.20' r='0.95' fill='#fff'/><circle cx='3.20' cy='21.60' r='0.95' fill='#fff'/><circle cx='8.60' cy='21.60' r='0.95' fill='#fff'/><circle cx='14.00' cy='21.60' r='0.95' fill='#fff'/><circle cx='19.40' cy='21.60' r='0.95' fill='#fff'/><circle cx='24.80' cy='21.60' r='0.95' fill='#fff'/><circle cx='30.20' cy='21.60' r='0.95' fill='#fff'/></svg>", levels: "Académico · B2–C1", url: "https://www.ets.org/toefl/test-takers/ibt/prepare.html" }
];

/* ============================================================
   CONTENIDO (originales, en formato de examen)
   tipo: grammar | reading | listening | rephrase
   rephrase: escribe la frase completa; se aceptan las variantes listadas.
   ============================================================ */
export const ITEMS = [
  // ---------- A1 ----------
  { level:"A1", type:"grammar", q:"They ___ from Spain.", options:["am","are","is"], answer:1, explain:"Con «they» se usa «are»." },
  { level:"A1", type:"grammar", q:"There ___ two apples on the table.", options:["is","are","be"], answer:1, explain:"«Two apples» es plural: «there are»." },
  { level:"A1", type:"reading", passage:"Hi! I'm Pablo. I'm twenty years old. I study at the university in Zaragoza. I love football, but I don't like tennis.",
    q:"What does Pablo NOT like?", options:["Football","Tennis","University"], answer:1, explain:"Dice «I don't like tennis»." },
  { level:"A1", type:"reading", passage:"My sister Ana has a red bike. It is new. She rides it to school every day.",
    q:"How does Ana go to school?", options:["By bus","On her red bike","On foot"], answer:1, explain:"«She rides it to school every day»: va en su bici roja." },
  { level:"A1", type:"reading", passage:"Today is Monday. The shop opens at nine and closes at six. On Mondays, it is closed in the afternoon.",
    q:"Is the shop open on Monday afternoon?", options:["Yes, from nine to six","No, it is closed","Yes, all day"], answer:1, explain:"«On Mondays, it is closed in the afternoon»." },
  { level:"A1", type:"listening", audio:"What time is it? It's half past seven. Time for breakfast.",
    q:"What time is it?", options:["Seven o'clock","Half past seven","Eight o'clock"], answer:1, explain:"«It's half past seven»." },
  { level:"A1", type:"listening", audio:"My favourite colour is green. My brother's favourite colour is blue.",
    q:"What is the brother's favourite colour?", options:["Green","Blue","Red"], answer:1, explain:"El hermano prefiere el azul." },
  { level:"A1", type:"listening", audio:"Excuse me, where is the train station? Go straight, then turn left. It's next to the bank.",
    q:"Where is the station?", options:["Next to the bank","Next to the school","Opposite the park"], answer:0, explain:"«It's next to the bank»." },
  { level:"A1", type:"rephrase", q:"This is my book.", hint:"Empieza con: The book", accepted:["The book is mine"], explain:"«The book is mine» = este libro es mío." },
  { level:"A1", type:"rephrase", q:"Anna is older than me.", hint:"Empieza con: I am", accepted:["I am younger than Anna"], explain:"Si Anna es mayor, tú eres más joven." },
  { level:"A1", type:"rephrase", q:"The café is open on Sundays.", hint:"Empieza con: The café opens", accepted:["The café opens on Sundays","The cafe opens on Sundays"], explain:"«Opens on Sundays» = abre los domingos." },

  // ---------- A2 ----------
  { level:"A2", type:"grammar", q:"___ you ever been to Italy?", options:["Have","Did","Were"], answer:0, explain:"«Have you ever been…?» pregunta por experiencias de la vida." },
  { level:"A2", type:"reading", passage:"Sara works at a hospital in Madrid. She starts work at seven in the morning and finishes at three. In the afternoon she goes to the gym.",
    q:"What time does Sara finish work?", options:["At seven","At three","In the afternoon"], answer:1, explain:"«Finishes at three»." },
  { level:"A2", type:"reading", passage:"Last weekend, Jorge planned a trip to the mountains, but it rained all day, so he stayed at home and read a book.",
    q:"Why did Jorge stay at home?", options:["He was tired","It rained all day","He had no car"], answer:1, explain:"El texto dice que llovió todo el día." },
  { level:"A2", type:"reading", passage:"The new cinema on Calle Mayor has five screens and a café. Tickets are cheaper on Wednesdays.",
    q:"When are tickets cheaper?", options:["On Mondays","On Wednesdays","At the weekend"], answer:1, explain:"«Tickets are cheaper on Wednesdays»." },
  { level:"A2", type:"listening", audio:"Hello, this is the doctor's surgery. Your appointment has been changed to Friday at eleven. Please call us if you can't come.",
    q:"When is the new appointment?", options:["Thursday at eleven","Friday at eleven","Friday at ten"], answer:1, explain:"La cita pasa al viernes a las once." },
  { level:"A2", type:"listening", audio:"Tom: Are you coming to the party on Saturday? Anna: I'd love to, but I have to work until six. I'll come after that.",
    q:"When will Anna arrive at the party?", options:["Before six","After six","She won't come"], answer:1, explain:"Anna llegará después de las seis." },
  { level:"A2", type:"listening", audio:"Welcome to the museum. The café is on the first floor, and the toilets are next to the lift. Photos are allowed, but not with flash.",
    q:"Where are the toilets?", options:["On the first floor","Next to the lift","Next to the café"], answer:1, explain:"«The toilets are next to the lift»." },
  { level:"A2", type:"rephrase", q:"It's a pity I can't come.", hint:"Empieza con: I wish", accepted:["I wish I could come"], explain:"«I wish I could come» expresa lo mismo: lamentar no poder ir." },
  { level:"A2", type:"rephrase", q:"The last time I saw her was in 2019.", hint:"Empieza con: I haven't", accepted:["I haven't seen her since 2019","I have not seen her since 2019"], explain:"Presente perfecto con «since»." },
  { level:"A2", type:"rephrase", q:"He started learning English three years ago.", hint:"Empieza con: He has", accepted:["He has been learning English for three years"], explain:"Presente perfecto continuo con «for»." },

  // ---------- B1 ----------
  { level:"B1", type:"grammar", q:"She suggested ___ to the cinema.", options:["to go","going","go"], answer:1, explain:"«Suggest» va seguido de -ing." },
  { level:"B1", type:"grammar", q:"By the time we arrived, the film ___.", options:["already started","had already started","has already started"], answer:1, explain:"Pasado perfecto: una acción anterior a otra en el pasado." },
  { level:"B1", type:"grammar", q:"I'm used to ___ early.", options:["get up","getting up","got up"], answer:1, explain:"«Be used to» + -ing." },
  { level:"B1", type:"reading", passage:"Many people say reading before bed helps them relax. However, some experts warn that screens make it harder to fall asleep, so paper books may be a better choice.",
    q:"What do some experts recommend?", options:["Reading on a tablet","Reading paper books","Not reading at all"], answer:1, explain:"Recomiendan libros en papel frente a pantallas." },
  { level:"B1", type:"reading", passage:"The company decided to close its Madrid office because most employees now work from home. Staff who want to keep working in the city will be offered a desk in a shared space.",
    q:"Why did the company close its office?", options:["Employees work from home","The rent was too high","The city was too noisy"], answer:0, explain:"La mayoría trabaja desde casa." },
  { level:"B1", type:"reading", passage:"Although Lucas had studied hard, he failed the exam the first time. Instead of giving up, he asked his teacher for advice and retook it six months later, and passed.",
    q:"What did Lucas do after failing?", options:["He gave up studying","He asked for advice and retook it","He moved abroad"], answer:1, explain:"Pidió consejo y repitió el examen." },
  { level:"B1", type:"listening", audio:"Ladies and gentlemen, the train to Barcelona is delayed by about twenty minutes due to engineering work. We apologise for the inconvenience. The next update will be in fifteen minutes.",
    q:"How long is the train delayed?", options:["Ten minutes","About twenty minutes","Fifteen minutes"], answer:1, explain:"«Delayed by about twenty minutes». Los quince son el próximo aviso." },
  { level:"B1", type:"listening", audio:"I've decided to take the job in Valencia. The salary is better, but I'll miss my friends here. I start in March.",
    q:"What is the speaker's main worry?", options:["The salary","Missing friends","Starting in March"], answer:1, explain:"«I'll miss my friends here»." },
  { level:"B1", type:"listening", audio:"Hi Maria, it's Ben. Sorry, I can't make lunch tomorrow. Could we move it to Thursday? Let me know.",
    q:"What does Ben ask Maria?", options:["To cancel lunch","To change the day to Thursday","To meet at breakfast"], answer:1, explain:"Propone pasar la comida al jueves." },
  { level:"B1", type:"rephrase", q:"I'm sorry I didn't call you.", hint:"Empieza con: I wish", accepted:["I wish I had called you"], explain:"Lamentar algo del pasado: «I wish I had + participio»." },
  { level:"B1", type:"rephrase", q:"Because of the storm, the meeting was cancelled.", hint:"Empieza con: The storm", accepted:["The storm caused the meeting to be cancelled","The storm led to the cancellation of the meeting"], explain:"Dos formas válidas con la misma idea de causa." },
  { level:"B1", type:"rephrase", q:"Let's meet at six.", hint:"Empieza con: Shall we", accepted:["Shall we meet at six"], explain:"«Shall we…?» es una forma de sugerir." },

  // ---------- B2 ----------
  { level:"B2", type:"grammar", q:"The report ___ by the time the manager arrived.", options:["had been finished","was finished","finished"], answer:0, explain:"Pasado perfecto pasivo: acción terminada antes de otra en el pasado." },
  { level:"B2", type:"grammar", q:"I'd rather you ___ mention it to anyone.", options:["didn't","don't","won't"], answer:0, explain:"«I'd rather» + pasado simple para un deseo sobre otra persona." },
  { level:"B2", type:"grammar", q:"Not until the storm passed ___ the road.", options:["we could see","could we see","we saw"], answer:1, explain:"Inversión tras «Not until»: could we see." },
  { level:"B2", type:"reading", passage:"Tourists who visit the old town often complain about crowds in summer. Local businesses, however, argue that visitors bring essential income, and many would be reluctant to see the numbers reduced.",
    q:"What do local businesses think?", options:["Tourists should stay away","Tourism brings essential income","Summer is too crowded"], answer:1, explain:"Consideran que el turismo les aporta ingresos esenciales." },
  { level:"B2", type:"reading", passage:"The museum's new exhibition seems ambitious on paper, yet critics found the layout confusing and the explanations too brief to be useful.",
    q:"What did critics think of the exhibition?", options:["It was too ambitious","The layout and explanations were poor","It was too cheap"], answer:1, explain:"Criticaron la disposición y las explicaciones." },
  { level:"B2", type:"reading", passage:"Remote work has changed how many firms recruit. Companies now compete for talent across whole countries, which has raised salaries in some regions but widened the gap with areas where few such jobs exist.",
    q:"According to the text, remote work has:", options:["Reduced all salaries","Widened regional differences","Ended recruitment"], answer:1, explain:"Ha aumentado la brecha con regiones con pocos empleos así." },
  { level:"B2", type:"listening", audio:"Good afternoon. The bus to Huesca will leave from platform four at quarter past two, not from platform two as stated earlier.",
    q:"Which platform does the bus leave from?", options:["Platform two","Platform four","Platform fourteen"], answer:1, explain:"Se corrige el andén anterior: sale del cuatro." },
  { level:"B2", type:"listening", audio:"I can't believe the rent has gone up again. At this rate, we'll have to move further out of the city.",
    q:"What is the speaker's attitude?", options:["Happy","Frustrated","Indifferent"], answer:1, explain:"La queja y «I can't believe» muestran frustración." },
  { level:"B2", type:"listening", audio:"Our survey shows that nearly two-thirds of respondents prefer flexible hours, although only a third of companies currently offer them.",
    q:"What proportion of companies offer flexible hours?", options:["Two-thirds","About a third","Nearly all"], answer:1, explain:"Solo un tercio de las empresas los ofrece." },
  { level:"B2", type:"rephrase", q:"The noise prevented me from sleeping.", hint:"Empieza con: The noise", accepted:["The noise kept me from sleeping","The noise stopped me from sleeping"], explain:"«Keep/stop someone from + -ing»." },
  { level:"B2", type:"rephrase", q:"Despite the rain, the match went ahead.", hint:"Empieza con: Even though it", accepted:["Even though it was raining, the match went ahead","Even though it rained, the match went ahead","Although it was raining, the match went ahead","Although it rained, the match went ahead"], explain:"«Despite» + sustantivo → «even though / although» + oración." },
  { level:"B2", type:"rephrase", q:"I regret not studying harder.", hint:"Empieza con: I wish", accepted:["I wish I had studied harder"], explain:"Lamentar un pasado: «I wish I had + participio»." },

  // ---------- C1 ----------
  { level:"C1", type:"grammar", q:"Had she ___ earlier, she would have caught the train.", options:["left","leave","leaving"], answer:0, explain:"Condicional de tercer tipo con inversión: Had + sujeto + participio." },
  { level:"C1", type:"grammar", q:"Rather than ___ the problem, they chose to ignore it.", options:["address","addressing","to address"], answer:1, explain:"«Rather than» + -ing." },
  { level:"C1", type:"grammar", q:"It's high time the government ___ action.", options:["took","takes","will take"], answer:0, explain:"«It's high time» + pasado simple para urgencia." },
  { level:"C1", type:"reading", passage:"The archive's director argues that digitisation, while useful, should not be mistaken for preservation. A scanned document may survive, but its context, its paper and its marginal notes are often lost.",
    q:"What is the director's main argument?", options:["Digitisation is useless","Digitisation is not the same as preservation","Archives should close"], answer:1, explain:"Escanear no equivale a conservar." },
  { level:"C1", type:"reading", passage:"Critics of the policy claim it merely shifts the burden onto the most vulnerable, while its supporters insist that the alternative would have been far more costly.",
    q:"Supporters of the policy believe that:", options:["It has no costs","The alternative would have cost more","Critics are right"], answer:1, explain:"Los defensores dicen que la alternativa habría sido más cara." },
  { level:"C1", type:"reading", passage:"Her novel defies easy categorisation: it reads like a thriller, yet its concerns are almost philosophical.",
    q:"The novel is best described as:", options:["A straightforward thriller","A mix of thriller and philosophy","A children's story"], answer:1, explain:"Combina intriga con preocupaciones filosóficas." },
  { level:"C1", type:"listening", audio:"Unfortunately, the sample was contaminated, so the results should be treated with caution until the experiment is repeated.",
    q:"Why should the results be treated with caution?", options:["The sample was contaminated","The experiment was too short","The results were negative"], answer:0, explain:"La muestra estaba contaminada." },
  { level:"C1", type:"listening", audio:"Frankly, I'd rather hear bad news from you than read it in a press release.",
    q:"What does the speaker prefer?", options:["Press releases","Direct news from a person","No news at all"], answer:1, explain:"Prefiere que se lo digan directamente." },
  { level:"C1", type:"listening", audio:"The council has postponed the decision, citing the need for further consultation with residents.",
    q:"Why was the decision postponed?", options:["Lack of money","More consultation with residents is needed","The mayor resigned"], answer:1, explain:"Se necesita más consulta con los vecinos." },
  { level:"C1", type:"rephrase", q:"Only after the audit did the managers realise the error.", hint:"Empieza con: It was not until", accepted:["It was not until the audit that the managers realised the error","It was not until the audit that the managers realized the error"], explain:"«It was not until… that» equivale a «only after…»." },
  { level:"C1", type:"rephrase", q:"Although the plan seemed risky, it succeeded.", hint:"Empieza con: Despite", accepted:["Despite the plan seeming risky, it succeeded","Despite appearing risky, the plan succeeded","Despite seeming risky, the plan succeeded","Despite the risky appearance of the plan, it succeeded"], explain:"«Despite» + -ing o sustantivo." },
  { level:"C1", type:"rephrase", q:"I'm not certain whether she will accept the offer.", hint:"Empieza con: It is", accepted:["It is unclear whether she will accept the offer","It is not clear whether she will accept the offer"], explain:"«It is unclear whether…» expresa la misma duda." },

  // ---------- C2 ----------
  { level:"C2", type:"grammar", q:"Little ___ that the decision would have such far-reaching consequences.", options:["we realised","did we realise","realised we"], answer:1, explain:"«Little» al inicio exige inversión: did we realise." },
  { level:"C2", type:"grammar", q:"She speaks as though she ___ the whole project herself.", options:["designed","had designed","would design"], answer:1, explain:"«As though» + pasado perfecto para algo irreal en el pasado." },
  { level:"C2", type:"grammar", q:"Such was the ___ of the argument that nobody noticed the time.", options:["intensity","intensely","intense"], answer:0, explain:"«Such was the + sustantivo» para intensidad." },
  { level:"C2", type:"reading", passage:"A good translator does not merely substitute words. She must reconstruct the intention behind a sentence, which sometimes means abandoning literal fidelity altogether.",
    q:"According to the passage, a good translator should:", options:["Translate word for word","Reconstruct the intention behind a sentence","Avoid changing any sentence"], answer:1, explain:"Reconstruir la intención." },
  { level:"C2", type:"reading", passage:"Whether the reform will prove a triumph or a blunder depends less on its design than on the implementation, which remains conspicuously vague.",
    q:"The reform's success depends mainly on:", options:["Its design","Its implementation","Public opinion"], answer:1, explain:"Depende más de la ejecución, todavía vaga." },
  { level:"C2", type:"reading", passage:"The painter's late works, once dismissed as chaotic, are now read as deliberate experiments with the limits of perception.",
    q:"How are the late works now regarded?", options:["As chaotic and careless","As deliberate experiments","As copies of earlier work"], answer:1, explain:"Se leen como experimentos deliberados." },
  { level:"C2", type:"listening", audio:"I suppose you could call it a calculated risk, though I'd argue the odds were rather more favourable than the critics admit.",
    q:"How does the speaker view the risk?", options:["Reckless","Calculated and reasonable","Impossible to judge"], answer:1, explain:"Lo considera un riesgo calculado y razonable." },
  { level:"C2", type:"listening", audio:"The witness hesitated, then conceded that she had not, in fact, seen the vehicle at all.",
    q:"What did the witness admit?", options:["She saw the vehicle","She had not seen the vehicle","She was unsure of the time"], answer:1, explain:"Admite que no vio el vehículo." },
  { level:"C2", type:"listening", audio:"Put simply, the problem isn't a shortage of ideas but a surplus of committees.",
    q:"What is the real problem according to the speaker?", options:["A lack of ideas","Too many committees","Too few committees"], answer:1, explain:"El exceso de comités, no la falta de ideas." },
  { level:"C2", type:"rephrase", q:"Despite his evident fatigue, he continued to argue his case with remarkable composure.", hint:"Empieza con: Even though he was", accepted:["Even though he was evidently exhausted, he continued to argue his case with remarkable composure","Although he was evidently exhausted, he continued to argue his case with remarkable composure","Even though he was clearly exhausted, he continued to argue his case calmly","Although he was clearly exhausted, he continued to argue his case calmly"], explain:"Hay varias formas válidas con el mismo sentido." },
  { level:"C2", type:"rephrase", q:"The students rushed out the moment the bell rang.", hint:"Empieza con: No sooner", accepted:["No sooner had the bell rung than the students rushed out","No sooner did the bell ring than the students rushed out"], explain:"«No sooner… than» con inversión." },
  { level:"C2", type:"rephrase", q:"He hadn't the faintest idea what she was talking about.", hint:"Empieza con: He had no", accepted:["He had no idea what she was talking about","He had no inkling what she was talking about"], explain:"«Had no idea» y «had no inkling» son equivalentes." }
];

/* ============================================================
   ESTADO
   El estado de la sesión (preguntas, índice, respuestas, temporizador)
   está en 04-recompensas-logros-copia-auto.js: es el único que lo escribe.
   ============================================================ */
export let currentLevel = "A1";
export const SPEEDS = [0.75, 1, 1.25], SPEED_LBL = ["0,75×", "1×", "1,25×"];
export const setPlayLabel = t => { const b = $("playBtn"); if (b) b.innerHTML = t; };

export const $ = id => document.getElementById(id);
/* Iconos propios: trazo único, rejilla 24, esquinas redondeadas (sustituyen a los emojis) */
const ICO_P = {
  flame: '<path d="M12 3c.6 3.2 4.4 5.2 4.4 9.2A4.4 4.4 0 0 1 12 16.6a4.4 4.4 0 0 1-4.4-4.4c0-2 1-3.2 2-4.3.2 1.5.9 2.4 1.9 2.8C11.3 7.6 11.5 5.6 12 3z"/>',
  shield: '<path d="M12 3l7 2.8v5.4c0 4.4-3 7.9-7 9.8-4-1.9-7-5.4-7-9.8V5.8z"/>',
  coin: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0z"/><path d="M8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 12v4M9 20h6M10 16h4v4h-4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  bolt: '<path d="M13 3L5.5 13.5H12L11 21l7.5-10.5H12z"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M12 9v11M4 13h16M12 9c-1.5-3.5-5-4-5-1.6S12 9 12 9zM12 9c1.5-3.5 5-4 5-1.6S12 9 12 9z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  book: '<path d="M4 5.5c2-1 4.5-1 8 .5 3.5-1.5 6-1.5 8-.5v13c-2-1-4.5-1-8 .5-3.5-1.5-6-1.5-8-.5zM12 6v13.5"/>',
  headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v5H4zM20 14h-3v5h3z"/>',
  pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  repeat: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  warn: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.01"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>'
};
export function ico(n, s = 20) { return `<svg class="ico" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO_P[n] || ""}</svg>`; }
export const PAUSA_LBL = ico("pause", 16) + " Pausa", PLAY_LBL = ico("play", 16) + " Reproducir";
/* Forma base de cada insignia: figura geométrica propia + icono interior; bloqueada = gris */
export const BADGE = {
  "primer-ejercicio": { shape: "circle", tone: "#0f9d8a", g: "check" },
  "primer-objetivo": { shape: "hex", tone: "#4263eb", g: "target" },
  "escudo": { shape: "shield", tone: "#7048e8", g: "shield" },
  "racha-7": { shape: "square", tone: "#e8590c", g: "flame" },
  "racha-30": { shape: "pent", tone: "#c2255c", g: "bolt" },
  "rango": { shape: "star", tone: "#d69a10", g: "trophy" },
  "compra": { shape: "diamond", tone: "#2f9e44", g: "gift" }
};
function polyPts(n, r, start) { const o = []; for (let k = 0; k < n; k++) { const a = (start + 360 * k / n) * Math.PI / 180; o.push((32 + r * Math.cos(a)).toFixed(1) + "," + (32 + r * Math.sin(a)).toFixed(1)); } return o.join(" "); }
function shapeEl(kind, r, fill) {
  if (kind === "circle") return `<circle cx="32" cy="32" r="${r}" fill="${fill}"/>`;
  if (kind === "square") return `<rect x="${32 - r}" y="${32 - r}" width="${2 * r}" height="${2 * r}" rx="${(r * 0.3).toFixed(1)}" fill="${fill}"/>`;
  if (kind === "hex") return `<polygon points="${polyPts(6, r, -90)}" fill="${fill}"/>`;
  if (kind === "pent") return `<polygon points="${polyPts(5, r, -90)}" fill="${fill}"/>`;
  if (kind === "diamond") return `<polygon points="${polyPts(4, r * 1.1, -90)}" fill="${fill}"/>`;
  if (kind === "star") return `<polygon points="${polyPts(10, r, -90).split(" ").map((p, i) => { const [x, y] = p.split(",").map(Number); const k = (i % 2) ? 0.46 : 1; return ((32 + (x - 32) * k).toFixed(1)) + "," + ((32 + (y - 32) * k).toFixed(1)); }).join(" ")}" fill="${fill}"/>`;
  if (kind === "shield") return `<polygon points="32,${(32 - r).toFixed(1)} ${(32 + r * 0.85).toFixed(1)},${(32 - r * 0.7).toFixed(1)} ${(32 + r * 0.85).toFixed(1)},${(32 + r * 0.2).toFixed(1)} 32,${(32 + r).toFixed(1)} ${(32 - r * 0.85).toFixed(1)},${(32 + r * 0.2).toFixed(1)} ${(32 - r * 0.85).toFixed(1)},${(32 - r * 0.7).toFixed(1)}" fill="${fill}"/>`;
  return "";
}
export function badgeSvg(id, locked, size = 56, frac = null) {
  const b = BADGE[id] || { shape: "circle", tone: "#1c7ed6", g: "sparkle" };
  const tone = locked ? mixHex(b.tone, "#2a3141", 0.5) : b.tone, inner = locked ? mixHex(tone, "#000000", 0.3) : mixHex(b.tone, "#000000", 0.22);
  const rim = locked ? mixHex(tone, "#ffffff", 0.25) : mixHex(b.tone, "#ffffff", 0.35), glyph = locked ? "#e6ebf5" : "#ffffff";
  return `<svg class="badge${locked ? " locked" : ""}" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${shapeEl(b.shape, 27, rim)}${shapeEl(b.shape, 24, tone)}${shapeEl(b.shape, 19, inner)}<g transform="translate(14 14) scale(1.5)" fill="none" stroke="${glyph}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO_P[b.g] || ""}</g></svg>`;
}
export function medalSvg(n) {
  const tone = ["#d9a441", "#9aa3b2", "#b87333"][n - 1] || "#9aa3b2", inner = mixHex(tone, "#000000", 0.2);
  return `<svg class="badge" viewBox="0 0 64 64" width="22" height="22" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="${tone}"/><circle cx="32" cy="32" r="18" fill="${inner}"/><text x="32" y="40" text-anchor="middle" font-size="22" font-weight="800" fill="#ffffff" font-family="system-ui,sans-serif">${n}</text></svg>`;
}
$("lecturaBtn").onclick = () => { const on = $("passage").classList.toggle("modo-lectura"); $("lecturaBtn").textContent = on ? "Modo normal" : "Modo lectura"; };
/* ---------- Navegación: barra inferior de 5 áreas con sub-pestañas ---------- */
// Cada área agrupa las secciones de antes. Ninguna sección se pierde: todas siguen en su panel.
const PANELS = { practica: "home", ejercicios: "p-ejercicios", audio: "p-audio", lectura: "p-lectura", recursos: "p-recursos", logros: "p-logros", ranking: "p-ranking", tienda: "p-tienda", perfil: "p-perfil", importar: "p-importar" };
const AREAS = [
  { k: "practica", label: "Inicio", subs: null, ico: '<path d="M3 11l9-7 9 7v9H3z"/><path d="M10 20v-5h4v5"/>' },
  { k: "ejercicios", label: "Practicar", ico: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>', subs: [["ejercicios", "Ejercicios"], ["audio", "Audio"], ["lectura", "Lectura libre"], ["recursos", "Recursos"]] },
  { k: "logros", label: "Sellos", ico: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 21l5-3 5 3-1.5-7"/>', subs: [["logros", "Logros"], ["ranking", "Liga"]] },
  { k: "tienda", label: "Tienda", ico: '<path d="M5 8h14l-1 12.5H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>', subs: null },
  { k: "perfil", label: "Perfil", ico: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>', subs: [["perfil", "Perfil"], ["importar", "Importar y copia"]] }
];
let activeTab = "practica";
// Área a la que pertenece una pestaña interna
const areaDe = k => AREAS.find(a => a.k === k || (a.subs && a.subs.some(s => s[0] === k))) || AREAS[0];
let practicarAccion = null;
export function setPracticarAccion(f) { practicarAccion = f; }
export function renderTabs() {
  const box = $("bnav");
  if (!box) return;
  const area = areaDe(activeTab);
  box.innerHTML = AREAS.map(a => `<button type="button" data-area="${a.k}" class="${a === area ? "on" : ""}" aria-current="${a === area ? "page" : "false"}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a.ico}</svg>${a.label}</button>`).join("");
  box.querySelectorAll("button").forEach(b => b.onclick = () => {
    const a = AREAS.find(x => x.k === b.dataset.area);
    if (a.k === "ejercicios" && practicarAccion) return practicarAccion();   // Practicar abre el ejercicio, como en la maqueta
    showTab(a.subs ? a.subs[0][0] : a.k);
  });
  const sub = $("subtabs");
  if (sub) {
    const subs = area.subs;
    sub.innerHTML = subs ? subs.map(([k, label]) => `<button type="button" class="subtab" data-k="${k}" aria-pressed="${k === activeTab}">${label}</button>`).join("") : "";
    sub.classList.toggle("hidden", !subs);
    sub.querySelectorAll(".subtab").forEach(b => b.onclick = () => showTab(b.dataset.k));
  }
}
export function showTab(k) {
  activeTab = k;
  mascotPark();
  ["exercise","result"].forEach(s => $(s).classList.add("hidden"));
  $("bnav").classList.remove("hidden");
  Object.values(PANELS).forEach(p => $(p).classList.toggle("hidden", p !== PANELS[k]));
  renderTabs();
  if (k === "ranking") renderRanking();
  if (k === "logros") renderLogrosPanel();
  if (k === "tienda") renderTienda();
  if (k === "perfil") renderPerfilPanel();
  mascotMount();
}
export function show(id) {
  if (id === "home") { showTab(activeTab); return; }
  $("bnav").classList.add("hidden");
  Object.values(PANELS).forEach(p => $(p).classList.add("hidden"));
  ["exercise","result"].forEach(s => $(s).classList.toggle("hidden", s !== id));
  mascotMount();
}
export const shuffle = a => a.map(v => [Math.random(), v]).sort((x,y) => x[0]-y[0]).map(x => x[1]);

/* ============================================================
   AUDIO
   ============================================================ */
// Audio propio del usuario (archivo cargado en esta sesión, no se guarda ni se sube)
export const userAudio = {};
export let userEl = null;
let ttsPaused = false;
export function itemKey() { const it = queue[index]; return it ? currentLevel + "|" + it.q : ""; }
export function playUserAudio() {
  if (userEl) userEl.pause();
  userEl = new Audio(userAudio[itemKey()]);
  $("audioStatus").textContent = "Reproduciendo tu audio…";
  userEl.playbackRate = SPEEDS[speedIdx];
  userEl.onended = () => { $("audioStatus").textContent = ""; $("audioBar").classList.remove("playing"); setPlayLabel("▶ Escuchar"); };
  userEl.play();
  setPlayLabel(PAUSA_LBL);
}

export function speak(text, item = {}) {
  if (userAudio[itemKey()]) { playUserAudio(); return; }
  if (!("speechSynthesis" in window)) { $("audioStatus").textContent = "Tu navegador no admite audio."; return; }
  speechSynthesis.cancel(); ttsPaused = false;
  const u = new SpeechSynthesisUtterance(text);
  const lang = item.accent || "en-GB";
  const voices = speechSynthesis.getVoices();
  const exact = voices.find(v => v.lang === lang);
  const en = exact || voices.find(v => v.lang && v.lang.startsWith("en"));
  u.lang = lang;
  if (en) u.voice = en;
  u.rate = (item.rate || 0.95) * SPEEDS[speedIdx];
  if (!exact && item.accent) $("audioStatus").textContent = "Tu equipo no tiene esta voz; se usa otra inglesa.";
  u.onstart = () => { $("audioStatus").textContent = "Reproduciendo con " + (en ? en.name : "la voz del sistema") + "…"; $("audioBar").classList.add("playing"); setPlayLabel(PAUSA_LBL); };
  u.onend = () => { $("audioStatus").textContent = ""; $("audioBar").classList.remove("playing"); setPlayLabel("▶ Escuchar"); };
  speechSynthesis.speak(u);
}
export function stopAudio() {
  $("audioBar").classList.remove("playing");
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  ttsPaused = false;
  if (userEl) userEl.pause();
  setPlayLabel("▶ Escuchar");
}
/* Escuchar / pausar / reanudar el audio de la pregunta actual */
export function togglePlay(item) {
  if (userAudio[itemKey()]) {
    if (userEl && !userEl.ended && userEl.currentTime > 0) {
      if (userEl.paused) { userEl.play(); setPlayLabel(PAUSA_LBL); $("audioBar").classList.add("playing"); }
      else { userEl.pause(); setPlayLabel("▶ Reanudar"); $("audioBar").classList.remove("playing"); }
    } else playUserAudio();
    return;
  }
  if (!("speechSynthesis" in window)) return;
  if (ttsPaused) {
    // Algunos navegadores no reanudan tras pausar: si no suena, se vuelve a leer desde el principio
    ttsPaused = false;
    speechSynthesis.resume();
    setPlayLabel(PAUSA_LBL); $("audioBar").classList.add("playing");
    setTimeout(() => { if (!ttsPaused && (speechSynthesis.paused || !speechSynthesis.speaking)) speak(item.audio, item); }, 250);
  } else if (speechSynthesis.speaking) {
    ttsPaused = true;
    speechSynthesis.pause();
    setPlayLabel("▶ Reanudar"); $("audioBar").classList.remove("playing");
  } else speak(item.audio, item);
}

/* ============================================================
   INICIO
   ============================================================ */
function inkFor(hex) {
  const lum = h => { const n = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]; };
  const L = lum(hex), dark = lum("#0b0a1f");
  return (1.05 / (L + 0.05)) >= ((L + 0.05) / (dark + 0.05)) ? "#ffffff" : "#0b0a1f";
}
export function renderLevels() {
  document.documentElement.style.setProperty("--lvl-color", lc(LEVELS[currentLevel]));
  const lvc = levelColor(currentLevel);
  document.documentElement.style.setProperty("--grad", `linear-gradient(135deg, ${lvc}, color-mix(in srgb, ${lvc} 55%, #ffffff))`);
  document.documentElement.style.setProperty("--ink", ["A1", "A2"].includes(currentLevel) ? "#0b0a1f" : "#ffffff");
  document.documentElement.style.setProperty("--pill-ink", inkFor(lc(LEVELS[currentLevel])));
  const box = $("levels");
  box.innerHTML = "";
  Object.keys(LEVELS).forEach(lv => {
    const b = document.createElement("button");
    b.className = "lvl";
    b.textContent = lv;
    b.style.setProperty("--own", lc(LEVELS[lv]));
    const c = levelColor(lv);
    const sel = currentLevel === lv;
    b.style.color = sel ? inkFor(c) : c;
    b.style.background = sel ? c : "var(--surface)";
    b.style.borderColor = sel ? "#fff" : "transparent";
    b.style.boxShadow = sel ? "0 0 0 2px #fff" : "0 2px 6px rgba(0,0,0,.2)";
    b.setAttribute("aria-pressed", sel ? "true" : "false");
    b.onclick = () => { currentLevel = lv; renderLevels(); renderHome(); };
    box.appendChild(b);
  });
}


const PART_SVG = {
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  arrows: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  match: '<rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M10 7h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  checklist: '<path d="M9 7h11M9 12h11M9 17h11"/><path d="M3.5 7l1.5 1.5 2.5-2.5M3.5 17l1.5 1.5 2.5-2.5"/>',
  blank: '<path d="M3 7h6M15 7h6M3 13h4M8 13h9M3 19h10"/><rect x="10" y="4.5" width="4" height="5" rx="1" stroke-dasharray="2 1.5"/>',
  book: '<path d="M3 5.5C5 4.5 8 4.5 12 6.5c4-2 7-2 9-1v13c-2-1-5-1-9 1-4-2-7-2-9-1z"/><path d="M12 6.5v13"/>',
  letters: '<text x="12" y="17" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" stroke="none" font-family="Segoe UI,Arial,sans-serif">Aa</text>'
};
const SEC_ICON = { grammar: "checklist", reading: "book", listening: "headphones", rephrase: "arrows", usage: "letters", writing: "pen", speaking: "mic" };
export function secIcon(k) { return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PART_SVG[SEC_ICON[k]]}</svg>`; }
export function partIcon(p) {
  const t = p.toLowerCase();
  const k = t.includes("transform") ? "arrows"
    : t.includes("formación") ? "letters"
    : t.includes("emparej") ? "match"
    : t.includes("listening") ? "headphones"
    : t.includes("opción múltiple") ? "checklist"
    : (t.includes("cloze") || t.includes("abierto") || t.includes("use of english")) ? "blank"
    : t.includes("reading") ? "book" : "checklist";
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PART_SVG[k]}</svg>`;
}

