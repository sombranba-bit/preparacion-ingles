import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";
import { $, PAUSA_LBL, PLAY_LBL } from "./01-nucleo-niveles-audio.js";

/* ---------- Reproductor de audio propio ---------- */
$("playerFile").onchange = e => {
  const f = e.target.files[0];
  if (!f) return;
  const a = $("player");
  a.src = URL.createObjectURL(f);
  $("playerName").textContent = f.name;
  a.play().catch(() => {});
};
const plFmt = s => { if (!isFinite(s) || s < 0) s = 0; const m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ":" + (r < 10 ? "0" : "") + r; };
function plUpdate() {
  const a = $("player"), d = a.duration;
  $("plSeek").max = isFinite(d) ? d : 0;
  $("plSeek").value = a.currentTime || 0;
  $("plTime").textContent = plFmt(a.currentTime) + " / " + plFmt(d);
}
function plState(playing) {
  $("plBar").classList.toggle("playing", playing);
  $("plPlay").innerHTML = playing ? PAUSA_LBL : PLAY_LBL;
}
["timeupdate", "loadedmetadata", "durationchange", "seeked"].forEach(ev => $("player").addEventListener(ev, plUpdate));
$("player").addEventListener("play", () => plState(true));
$("player").addEventListener("pause", () => plState(false));
$("player").addEventListener("ended", () => plState(false));
$("plPlay").onclick = () => {
  const a = $("player");
  if (!a.getAttribute("src")) { $("playerFile").click(); return; }
  if (a.paused) a.play().catch(() => {}); else a.pause();
};
$("plSeek").oninput = e => { $("player").currentTime = +e.target.value; };
$("back10").onclick = () => { const a = $("player"); a.currentTime = Math.max(0, a.currentTime - 10); };
$("fwd10").onclick = () => { const a = $("player"); a.currentTime = Math.min(a.duration || Infinity, a.currentTime + 10); };
$("rateSel").onchange = e => { $("player").playbackRate = parseFloat(e.target.value); };

/* Comprueba qué voces inglesas tiene el equipo y lo muestra en la pestaña Audio. */
function showVoices() {
  const el = $("voiceInfo");
  if (!el) return;
  if (!("speechSynthesis" in window)) { el.textContent = "Este navegador no admite lectura de audio: los ejercicios de escucha no sonarán."; return; }
  const list = speechSynthesis.getVoices().filter(v => v.lang && v.lang.startsWith("en"));
  if (!list.length) { el.textContent = "Este equipo no tiene voces en inglés. Instala una voz inglesa en el sistema para escuchar los audios de escucha."; return; }
  const gb = list.find(v => v.lang === "en-GB"), us = list.find(v => v.lang === "en-US");
  el.textContent = `Voces inglesas detectadas: ${list.length}. Británica: ${gb ? "sí" : "no"} · Estadounidense: ${us ? "sí" : "no"}.` + (gb ? "" : " Sin voz británica, los audios británicos usarán otra voz inglesa.");
}
if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = showVoices;
showVoices();

/* Ejercicios A1 originales. Tareas sencillas de gramática, lectura, escucha y reformulación. */
(function () {
  var out = [], LV = "A1";
  function G(q, o, a, e) { out.push({ level: LV, type: "grammar", q: q, options: o, answer: a, explain: e }); }
  function R(pass, q, o, a, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, options: o, answer: a, explain: e }); }
  function L(audio, q, o, a, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, options: o, answer: a, explain: e }); }
  function LT(audio, q, acc, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, accepted: acc, explain: e }); }
  function T(q, hint, acc, e) { out.push({ level: LV, type: "rephrase", q: q, hint: hint, accepted: acc, explain: e }); }

  // Gramática
  G("I ___ a teacher.", ["am","is","are"], 0, "Con «I» se usa «am».");
  G("She ___ from Italy.", ["am","is","are"], 1, "Con «she» se usa «is».");
  G("We ___ students.", ["am","is","are"], 2, "Con «we» se usa «are».");
  G("They ___ at home now.", ["is","are","am"], 1, "Con «they» se usa «are».");
  G("My brother ___ football on Sundays.", ["play","plays","playing"], 1, "Tercera persona: -s.");
  G("I ___ coffee every morning.", ["drink","drinks","drinking"], 0, "Con «I» no lleva -s.");
  G("___ you like tea?", ["Do","Does","Are"], 0, "Preguntas con «do» para «you».");
  G("She ___ like pizza.", ["don't","doesn't","isn't"], 1, "Negativa en tercera persona: doesn't.");
  G("There ___ a book on the table.", ["is","are","have"], 0, "«There is» con singular.");
  G("There ___ three chairs in the room.", ["is","are","has"], 1, "«There are» con plural.");
  G("I can ___ English.", ["speak","speaks","speaking"], 0, "«Can» + infinitivo sin «to».");
  G("He ___ swim.", ["can","cans","to can"], 0, "«Can» no cambia con la persona.");
  G("This is ___ bag.", ["my","me","I"], 0, "Posesivo antes del sustantivo.");
  G("___ name is Maria.", ["My","Me","I"], 0, "Adjetivo posesivo.");
  G("We live ___ London.", ["in","on","at"], 0, "Ciudades: «in».");
  G("The class starts ___ nine o'clock.", ["in","at","on"], 1, "Horas: «at».");
  G("The party is ___ Saturday.", ["in","at","on"], 2, "Días de la semana: «on».");
  G("I have ___ apple.", ["a","an","the"], 1, "Delante de vocal: «an».");
  G("___ banana is yellow.", ["A","An","The"], 0, "Consonante: «a».");
  G("What ___ your name?", ["is","are","do"], 0, "«What is» + singular.");
  G("Where ___ you from?", ["are","is","do"], 0, "Con «you» se usa «are».");
  G("How old ___ she?", ["is","are","am"], 0, "Con «she» se usa «is».");
  G("I ___ got two sisters.", ["have","has","am"], 0, "«Have got» con «I».");
  G("He ___ got a new car.", ["have","has","is"], 1, "«Has got» con tercera persona.");
  G("Look! It ___ raining.", ["is","does","has"], 0, "Presente continuo: «is» + -ing.");
  G("We ___ watching TV now.", ["am","is","are"], 2, "Presente continuo con «we».");
  G("___ is the bus stop?", ["Where","When","Who"], 0, "«Where» pregunta por el lugar.");
  G("___ does the shop open?", ["What time","Where","Who"], 0, "«What time» pregunta por la hora.");
  G("___ are you?", ["Who","How","Where"], 1, "«How are you?» = ¿Cómo estás?");
  G("Tom and Anna ___ friends.", ["is","am","are"], 2, "Dos personas: «are».");
  G("I ___ like football.", ["don't","doesn't","isn't"], 0, "Negativa con «I»: don't.");
  G("She ___ work on Sundays.", ["doesn't","don't","isn't"], 0, "Tercera persona: doesn't.");
  G("They ___ hungry.", ["isn't","aren't","don't"], 1, "Con «they» el verbo «to be» en negativa es «aren't».");
  G("___ the cat black?", ["Is","Are","Do"], 0, "Pregunta con «is» para un singular.");
  G("What colour ___ your bag?", ["is","are","does"], 0, "Pregunta con «is» para un singular.");
  G("He ___ breakfast at eight.", ["has","have","is"], 0, "«Has» para hábitos con tercera persona.");

  // Lectura
  R("Hi! I'm Lucas. I'm ten years old. I live in Valencia with my mum and my dog.", "How old is Lucas?", ["Ten","Twenty","Eleven"], 0, "Tiene diez años.");
  R("Ana gets up at seven. She has breakfast, then she goes to school by bus.", "What does Ana do after breakfast?", ["She walks to school","She goes to school by bus","She stays at home"], 1, "Va en autobús.");
  R("Our shop is open from Monday to Saturday. It is closed on Sundays.", "When is the shop closed?", ["On Sundays","On Mondays","On Saturdays"], 0, "Cerrada los domingos.");
  R("My favourite food is pasta. I don't like fish.", "What doesn't the writer like?", ["Pasta","Fish","Bread"], 1, "No le gusta el pescado.");
  R("It is hot today. Let's go to the beach!", "Where do they want to go?", ["To the park","To the beach","To school"], 1, "Quieren ir a la playa.");
  R("Sam has a blue bike. It is very fast.", "What colour is Sam's bike?", ["Red","Blue","Green"], 1, "La bici es azul.");
  R("The library opens at nine. You can borrow books for two weeks.", "How long can you keep a book?", ["One week","Two weeks","One month"], 1, "Dos semanas.");
  R("My family and I have a big garden. We grow tomatoes and carrots.", "What do they grow?", ["Apples and pears","Tomatoes and carrots","Flowers only"], 1, "Tomates y zanahorias.");
  R("Hello, my name is Ines. I work in a hospital. I am a nurse.", "What is Ines's job?", ["Doctor","Teacher","Nurse"], 2, "Es enfermera.");
  R("Today is Friday. Tomorrow is the weekend, and I am going to visit my grandma.", "Where is the writer going tomorrow?", ["To school","To visit her grandma","To work"], 1, "Visitará a su abuela.");
  R("The train to Madrid leaves at half past ten. Please arrive ten minutes early.", "What time does the train leave?", ["10:00","10:30","10:10"], 1, "Sale a las 10:30.");
  R("Tom likes sport. He plays tennis on Mondays and swims on Wednesdays.", "When does Tom swim?", ["Mondays","Wednesdays","Sundays"], 1, "Nada los miércoles.");
  R("Welcome to our café! We have coffee, tea, and cakes. Everything is cheap.", "What can you buy at the café?", ["Cars","Coffee and cakes","Books"], 1, "Café y pasteles.");
  R("My house has three bedrooms, a kitchen and a small garden.", "How many bedrooms are there?", ["Two","Three","Four"], 1, "Tres dormitorios.");
  R("Maria is tall and has long brown hair. She wears glasses.", "What does Maria wear?", ["A hat","Glasses","A scarf"], 1, "Lleva gafas.");
  R("Please turn off the lights when you leave the room.", "What should you do before you leave?", ["Turn off the lights","Close the windows","Call someone"], 0, "Apagar las luces.");
  R("I have a cat called Milo. He is black and white and he sleeps all day.", "What is the cat called?", ["Milo","Max","Mia"], 0, "Se llama Milo.");
  R("It is cold in winter, so we wear warm coats and hats.", "What do people wear in winter?", ["Shorts","Warm coats","Swimming costumes"], 1, "Abrigos calientes.");
  R("Hi, Paul! Are you free on Saturday? Let's play football at four.", "When do they want to play?", ["Saturday at four","Sunday at two","Friday at six"], 0, "Sábado a las cuatro.");
  R("The bank is next to the post office, opposite the park.", "Where is the bank?", ["Next to the post office","Next to the school","Behind the park"], 0, "Al lado de la oficina de correos.");
  R("My sister is a teacher. She works at a primary school in town.", "Where does the sister work?", ["In a hospital","At a primary school","In an office"], 1, "En un colegio de primaria.");
  R("Dear Anna, thank you for the lovely present. See you soon! Love, Carla.", "Who wrote the message?", ["Anna","Carla","Ana's mum"], 1, "La escribe Carla.");
  R("Breakfast is at eight. Lunch is at two. Dinner is at nine in the evening.", "When is lunch?", ["At eight","At two","At nine"], 1, "La comida es a las dos.");
  R("Our class has twenty students. Ten are girls and ten are boys.", "How many boys are in the class?", ["Ten","Twenty","Five"], 0, "Diez chicos.");
  R("Please wait here. The doctor will see you in a few minutes.", "What should you do?", ["Go home","Wait","Leave a message"], 1, "Esperar.");

  // Escucha (opción múltiple)
  L("Hello! This is Carla. I'm at the supermarket. Can you buy some milk for me?", "What does Carla ask for?", ["Milk","Bread","Water"], 0, "Pide leche.");
  L("Good morning. The shop opens at nine today.", "When does the shop open?", ["At eight","At nine","At ten"], 1, "Abre a las nueve.");
  L("My name is Jorge. I am from Spain and I like music.", "Where is Jorge from?", ["Spain","Italy","France"], 0, "Es de España.");
  L("It's ten o'clock. Time for school!", "What time does the speaker say it is?", ["Nine","Ten","Eleven"], 1, "Son las diez.");
  L("I have two brothers and one sister.", "How many sisters does the speaker have?", ["None","One","Two"], 1, "Tiene una hermana.");
  L("The dog is under the table.", "Where is the dog?", ["On the table","Under the table","In the garden"], 1, "Debajo de la mesa.");
  L("Can you help me with my bag, please?", "What does the speaker want?", ["Help with a bag","A new bag","A taxi"], 0, "Pide ayuda con la bolsa.");
  L("Today is Tuesday. It is sunny.", "What is the weather like?", ["Rainy","Sunny","Snowy"], 1, "Hace sol.");
  L("I like red apples but I don't like green apples.", "What apples does the speaker like?", ["Red","Green","Yellow"], 0, "Le gustan las rojas.");
  L("Excuse me, where is the toilet? It's next to the stairs.", "Where is the toilet?", ["Next to the stairs","In the garden","Upstairs only"], 0, "Al lado de las escaleras.");
  L("She is my best friend. We play together after school.", "When do they play?", ["In the morning","After school","At night"], 1, "Después del colegio.");
  L("My birthday is in May.", "When is the speaker's birthday?", ["In March","In May","In June"], 1, "Es en mayo.");
  L("Two coffees and one tea, please.", "How many coffees are ordered?", ["One","Two","Three"], 1, "Dos cafés.");
  L("The bus is at the corner of the street.", "Where is the bus?", ["At the corner","In the park","At the station"], 0, "En la esquina.");
  L("Good night, Mum. See you in the morning.", "Who is the speaker talking to?", ["A friend","Mum","A teacher"], 1, "A su madre.");
  L("Let's meet at the cinema at six o'clock.", "What time is the meeting?", ["Six","Seven","Eight"], 0, "A las seis.");

  // Escucha (respuesta escrita)
  LT("My phone number is nine one six, four two zero, five five five.", "Write the first three numbers of the phone number.", ["916","nine one six","9 1 6"], "Los tres primeros números.");
  LT("I'm twenty-five years old.", "The speaker is ___ years old.", ["25","twenty-five","twenty five"], "Edad.");
  LT("The book is on the second shelf.", "The book is on the ___ shelf.", ["second","2nd"], "Estante.");
  LT("I usually eat rice on Mondays.", "The speaker eats ___ on Mondays.", ["rice"], "Comida.");
  LT("My brother's name is David.", "The brother's name is ___.", ["David"], "Nombre.");
  LT("The shop is on Green Street.", "The shop is on ___ Street.", ["Green"], "Calle.");

  // Reformulación / rellenar palabras
  T("This is my bag.", "Empieza con: It", ["It is my bag","It's my bag"], "«It's» = «it is».");
  T("She is not at home.", "Empieza con: She isn't", ["She isn't at home","She is not at home"], "Forma corta con «isn't».");
  T("I like cats.", "Empieza con: I love", ["I love cats","I really like cats"], "Sinónimo sencillo.");
  T("The book is big.", "Empieza con: The book is not", ["The book is not small","The book isn't small"], "Antónimo con «not».");
  T("We don't have a car.", "Empieza con: We haven't", ["We haven't got a car","We haven't got a car."], "«Haven't got» = don't have.");
  T("It is cold today.", "Empieza con: Today it", ["Today it is cold","Today it's cold"], "Cambio de orden.");
  T("He can't swim.", "Empieza con: He isn't able", ["He isn't able to swim","He is not able to swim"], "«Be able to» = can.");
  T("My house is near the park.", "Empieza con: The park is", ["The park is near my house","The park is near the house"], "Cambio de sujeto.");
  T("I'm from Spain.", "Empieza con: I come", ["I come from Spain"], "«Come from» = ser de.");
  T("We have lunch at one.", "Empieza con: Lunch", ["Lunch is at one","Lunch is at one o'clock"], "Lunch is at...");
  T("I am tired.", "Empieza con: I feel", ["I feel tired"], "«Feel» = sentirse.");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios A2 originales con la estructura de tareas del examen KET (Cambridge A2 Key). */
(function () {
  var out = [], LV = "A2";
  function G(part, q, o, a, e) { out.push({ level: LV, type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { out.push({ level: LV, type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var RW = "KET · Reading y Writing";
  var LS = "KET · Listening";

  // Gramática (opción múltiple)
  G(RW, "She ___ to London last year.", ["went","goes","has gone"], 0, "Pasado simple con «last year».");
  T(RW, "___ you ever been to Rome?", "Escribe la palabra que falta.", ["Have"], "Experiencias de vida: presente perfecto.");
  G(RW, "I haven't seen him ___ Monday.", ["since","for","from"], 0, "«Since» con un momento concreto.");
  T(RW, "It's been raining ___ three days.", "Escribe la palabra que falta.", ["for"], "«For» con una duración.");
  T(RW, "The bag is ___ than the other one.", "Escribe la palabra que falta.", ["bigger"], "Comparativo corto: bigger.");
  G(RW, "This is the ___ film I have ever seen.", ["best","better","good"], 0, "Superlativo irregular: best.");
  T(RW, "I'm going to ___ a new laptop next week.", "Escribe la palabra que falta.", ["buy"], "«Going to» + infinitivo.");
  T(RW, "If it ___ sunny, we will go to the beach.", "Escribe la palabra que falta.", ["is"], "Condicional 1: presente tras «if».");
  G(RW, "You ___ eat so much sugar. It isn't healthy.", ["shouldn't","should","must"], 0, "Consejo negativo: shouldn't.");
  T(RW, "Could you ___ me the way to the station?", "Escribe la palabra que falta.", ["show"], "«Show» + persona + cosa.");
  G(RW, "Tom ___ his homework before dinner.", ["has finished","finished","is finish"], 0, "Presente perfecto con resultado actual.");
  G(RW, "My sister is ___ than me.", ["older","elder than","oldest"], 0, "Comparativo: older than.");
  T(RW, "I'll call you when I ___ home.", "Escribe la palabra que falta.", ["get"], "Presente tras «when» con sentido de futuro.");
  T(RW, "There aren't ___ eggs in the fridge.", "Escribe la palabra que falta.", ["any"], "«Any» en negativas.");
  G(RW, "Would you like ___ coffee?", ["some","any","a"], 0, "«Some» en ofertas.");
  T(RW, "She is ___ at maths than her brother.", "Escribe la palabra que falta.", ["better"], "Comparativo irregular de «good».");
  T(RW, "We ___ to the cinema last night.", "Escribe la palabra que falta.", ["went"], "Pasado simple irregular.");
  G(RW, "He ___ the window when it started to rain.", ["was closing","closed","has closed"], 0, "Pasado continuo con acción interrumpida.");
  G(RW, "I'd like to ___ a ticket to Paris, please.", ["book","buy a","reserve to"], 0, "«Book» se usa para reservas.");
  G(RW, "Please ___ your shoes before you come in.", ["take off","take in","put up"], 0, "«Take off» = quitarse.");
  G(RW, "The shop ___ on Sundays.", ["is closed","closes","is close"], 0, "Pasiva o presente con sentido de estado.");
  T(RW, "I'm looking ___ my keys.", "Escribe la palabra que falta.", ["for"], "«Look for» = buscar.");
  G(RW, "They ___ working here since 2019.", ["have been","are","were"], 0, "Presente perfecto continuo con «since».");
  G(RW, "She ___ a shower every morning.", ["has","is having","have"], 0, "«Have a shower».");
  T(RW, "We must ___ the bus. It leaves in five minutes.", "Escribe la palabra que falta.", ["catch"], "«Catch» = coger a tiempo.");

  // Reading & Writing: textos
  R(RW, "Dear Joe, sorry I'm late for the party. My train was delayed by an hour. See you soon, Kate.", "Why is Kate late?", ["She missed the party","Her train was delayed","She is at home"], 1, "Retraso del tren.");
  R(RW, "Notice: The pool will be closed on Friday for cleaning. It will reopen on Saturday at 8 a.m.", "When does the pool reopen?", ["Friday","Saturday at 8 a.m.","Monday"], 1, "Reabre el sábado a las 8.");
  R(RW, "Last summer we visited my grandparents in the north. We swam in the sea every day and ate lots of fish.", "What did they do every day?", ["They walked in the mountains","They swam in the sea","They visited museums"], 1, "Nadaban en el mar.");
  R(RW, "The new sports centre has a gym, two swimming pools and a café. It opens at seven every morning.", "What time does the sports centre open?", ["At six","At seven","At nine"], 1, "Abre a las siete.");
  R(RW, "Hi Ben, can we meet on Thursday instead of Wednesday? I have a dentist appointment on Wednesday.", "Why does the writer want to change the day?", ["She is on holiday","She has a dentist appointment","She is ill"], 1, "Tiene cita con el dentista el miércoles.");
  RT(RW, "Tom is a keen cyclist. Every Sunday he rides 40 kilometres with his friends in the countryside.", "How far does Tom ride on Sundays?", ["40 kilometres"], "40 kilómetros.");
  R(RW, "Our hotel is near the beach. Breakfast is included in the price, and the staff are very friendly.", "What is included in the price?", ["Lunch","Breakfast","Dinner"], 1, "Incluye el desayuno.");
  RT(RW, "Anna wants to learn to play the guitar. She is taking lessons every Tuesday after school.", "When does Anna have guitar lessons?", ["On Tuesdays"], "Los martes.");
  R(RW, "The museum is free for children under 12. Adults pay five pounds to enter.", "How much do adults pay?", ["Nothing","Five pounds","Twelve pounds"], 1, "Cinco libras.");
  RT(RW, "Carlos has worked as a waiter for three years. He would like to become a chef one day.", "What does Carlos want to become?", ["A chef"], "Quiere ser chef.");
  R(RW, "Don't forget: the library will close early today at four o'clock because of a staff meeting.", "Why does the library close early?", ["It is raining","There is a staff meeting","It is a holiday"], 1, "Reunión del personal.");
  R(RW, "Emma loves painting. She has painted the walls of her bedroom bright yellow.", "What colour is Emma's bedroom?", ["Blue","Yellow","White"], 1, "Amarillo.");
  R(RW, "Please leave your umbrellas at the entrance. You can collect them when you leave the building.", "What should visitors do with their umbrellas?", ["Take them inside","Leave them at the entrance","Put them in a bag"], 1, "Dejarlos en la entrada.");
  RT(RW, "Dear Mum, I've arrived safely in London. The hotel is small but clean. Love, Sara.", "Where is Sara?", ["In London"], "En Londres.");

  // Listening (opción múltiple)
  L(LS, "Man: Which film do you want to see? Woman: The one with the comedy, at half past six.", "What film does the woman want?", ["A comedy","A horror film","A documentary"], 0, "Una comedia.");
  L(LS, "Woman: Where did you go on holiday? Man: We went to Portugal. The beaches were beautiful.", "Where did the man go?", ["Spain","Portugal","France"], 1, "A Portugal.");
  L(LS, "Good afternoon. Flight 405 to Berlin will leave from gate 12 at three thirty.", "What gate is the Berlin flight?", ["Gate 2","Gate 12","Gate 21"], 1, "Puerta 12.");
  L(LS, "Man: Shall we have pizza tonight? Woman: I'd rather have pasta, but pizza is fine.", "What would the woman prefer?", ["Pizza","Pasta","Salad"], 1, "Prefiere pasta.");
  L(LS, "Woman: How long does the bus take? Man: About twenty minutes, if the traffic is not bad.", "How long does the bus take?", ["Ten minutes","About twenty minutes","An hour"], 1, "Unos veinte minutos.");
  L(LS, "Girl: Can I have a bike for my birthday? Dad: We'll see. You need to be more careful with your toys first.", "What does the dad think?", ["He will buy a bike","He is not sure yet","He does not like bikes"], 1, "Todavía no lo sabe.");
  L(LS, "Man: I've lost my wallet. Woman: Did you check your coat pocket? Man: Yes, it's there! Thanks.", "Where was the wallet?", ["In the car","In his coat pocket","At the shop"], 1, "En el bolsillo del abrigo.");
  L(LS, "Woman: The class starts at nine on Monday, not on Tuesday. Please don't be late.", "When does the class start?", ["Monday at nine","Tuesday at nine","Monday at ten"], 0, "Lunes a las nueve.");
  L(LS, "Man: Do you play any sports? Woman: Yes, I swim twice a week and I play tennis at weekends.", "How often does the woman swim?", ["Once a week","Twice a week","Every day"], 1, "Dos veces por semana.");
  L(LS, "Boy: Mum, what's for dinner? Mum: Chicken and rice. It'll be ready in ten minutes.", "When will dinner be ready?", ["In ten minutes","In an hour","Now"], 0, "En diez minutos.");

  // Listening (respuesta escrita: rellenar huecos)
  LT(LS, "Tickets for the play cost twelve pounds for adults and six pounds for children.", "Children's tickets cost ___ pounds.", ["6","six"], "Precio infantil.");
  LT(LS, "The meeting room is on the second floor, opposite the kitchen.", "The meeting room is on the ___ floor.", ["second","2nd"], "Planta.");
  LT(LS, "My train leaves at quarter past eight, so I need to get up at seven.", "The train leaves at ___ past eight.", ["quarter","a quarter","15","fifteen"], "Hora.");
  LT(LS, "We're going to visit our cousins in Edinburgh next month.", "They are going to visit their cousins in ___.", ["Edinburgh"], "Ciudad.");
  LT(LS, "Please call the hotel to confirm your room number, which is two hundred and four.", "The room number is ___.", ["204","two hundred and four","two hundred four"], "Número de habitación.");

  // Reformulación y rellenar huecos (Writing / transformación)
  T(RW, "My car is older than your car.", "Empieza con: Your car", ["Your car is newer than mine","Your car is newer than my car"], "Comparativo de «new».");
  T(RW, "I haven't been to the cinema for a month.", "Empieza con: The last time", ["The last time I went to the cinema was a month ago"], "Frase equivalente con «last time».");
  T(RW, "Please don't smoke in the building.", "Empieza con: You mustn't", ["You mustn't smoke in the building"], "Prohibición con «mustn't».");
  T(RW, "It's a long way to the station, so let's take a taxi.", "Empieza con: Because", ["Because it's a long way to the station, let's take a taxi","Because it is a long way to the station, let's take a taxi"], "Causa con «because».");
  T(RW, "She is the youngest in the family.", "Empieza con: Nobody", ["Nobody in the family is younger than her"], "Superlativo equivalente.");
  T(RW, "Do you want to go swimming on Saturday?", "Empieza con: Would you", ["Would you like to go swimming on Saturday"], "Oferta con «would you like».");
  T(RW, "I can't play the piano.", "Empieza con: I'm not", ["I'm not able to play the piano","I am not able to play the piano"], "«Be able to».");
  T(RW, "The bakery is next to the bank.", "Empieza con: The bank is", ["The bank is next to the bakery","The bank is beside the bakery","The bank is next to the bakery."], "Cambio de sujeto.");
  T(RW, "Let's go to the park after school.", "Empieza con: Why don't we", ["Why don't we go to the park after school"], "Sugerencia.");
  T(RW, "He started learning English in 2015.", "Empieza con: He has", ["He has been learning English since 2015","He has been learning English since two thousand and fifteen"], "Presente perfecto continuo.");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios B2 originales con la estructura de tareas del examen FCE (Cambridge B2 First). */
(function () {
  var out = [], LV = "B2";
  function G(part, q, o, a, e) { out.push({ level: LV, type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { out.push({ level: LV, type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var UE1 = "FCE · Use of English P1 (cloze, 4 opciones)";
  var UE5 = "FCE · Use of English P5 (opción múltiple)";
  var WF = "FCE · Use of English P3 (formación de palabras)";
  var KW = "FCE · Use of English P4 (transformaciones)";
  var OC = "FCE · Use of English P2 (cloze abierto)";
  var RD = "FCE · Reading P7 (emparejamiento)";
  var LI = "FCE · Listening P1 (opción múltiple)";
  var LG = "FCE · Listening P2 (rellenar huecos)";

  T(UE1, "I wish I ___ more time to finish the project.", "Escribe la palabra que falta.", ["had"], "«Wish» + pasado para lo presente.");
  G(UE1, "The manager insisted ___ the report before Friday.", ["on finishing","to finish","finishing","that finish"], 0, "«Insist on» + -ing.");
  G(UE1, "Had we known about the delay, we ___ earlier.", ["would have left","would leave","left","had left"], 0, "Condicional 3 con inversión.");
  G(UE1, "She is not used ___ in front of large audiences.", ["to speaking","to speak","speaking","speak"], 0, "«Be used to» + -ing.");
  G(UE1, "By this time next year, they ___ the new office.", ["will have finished","will finish","finish","would finish"], 0, "Futuro perfecto con marcador de tiempo.");
  G(UE1, "No sooner ___ the door than the phone rang.", ["had I closed","I had closed","did I close","I closed"], 0, "«No sooner» con inversión en pasado perfecto.");
  G(UE1, "He denied ___ the money, but the evidence was clear.", ["taking","to take","having taken to","take"], 0, "«Deny» + -ing.");
  T(UE1, "The road was closed, ___ we had to take a detour.", "Escribe la palabra que falta.", ["so"], "Conector de consecuencia.");
  T(UE1, "It's high time you ___ a decision.", "Escribe la palabra que falta.", ["made"], "«It's high time» + pasado.");
  G(UE1, "Scarcely ___ the meeting started when the fire alarm went off.", ["had","did","was","has"], 0, "«Scarcely… when» con inversión.");
  T(UE5, "Despite ___ exhausted, she kept working.", "Escribe la palabra que falta.", ["being"], "«Despite» + -ing.");
  G(UE5, "The results were ___ than we expected.", ["far better","much more good","a lot gooder","far best"], 0, "«Far better»: refuerzo del comparativo.");
  G(UE5, "We ___ the film before, so we didn't go.", ["had already seen","already saw","have already see","saw already"], 0, "Pasado perfecto para acción anterior.");
  G(UE5, "The company ___ a new product next year.", ["is due to launch","is launching at last","due launch","has due to launch"], 0, "«Be due to» = estar previsto.");
  G(UE5, "The teacher suggested ___ the essay again.", ["rewriting","to rewrite","rewrote","rewrites"], 0, "«Suggest» + -ing.");

  T(WF, "Her ___ to the project was essential. (CONTRIBUTE)", "Sustantivo derivado de CONTRIBUTE", ["contribution"], "«Contribution».");
  T(WF, "The new law has had a ___ effect on small businesses. (NEGATE)", "Adjetivo derivado de NEGATE", ["negative"], "«Negative».");
  T(WF, "The ___ of the bridge took three years. (COMPLETE)", "Sustantivo derivado de COMPLETE", ["completion"], "«Completion».");
  T(WF, "He spoke with great ___. (CONFIDE)", "Sustantivo derivado de CONFIDE", ["confidence"], "«Confidence».");
  T(WF, "The ___ of the painting surprised the critics. (ORIGIN)", "Sustantivo; el origen de la obra", ["originality"], "«Originality».");
  T(WF, "It was ___ that nobody noticed the error. (SURPRISE)", "Adverbio derivado de SURPRISE", ["surprisingly"], "«Surprisingly».");

  T(OC, "The company ___ to expand into Asia next year.", "Una palabra: forma de «plan»", ["plans","intends","hopes","expects"], "Verbo de intención.");
  T(OC, "I'd rather stay at home ___ go out in this weather.", "Una palabra de comparación", ["than"], "«Rather… than».");
  T(OC, "She has ___ worked harder than anyone else in the team.", "Un adverbio de frecuencia", ["never"], "«Never» con presente perfecto.");

  T(KW, "The film was so boring that we left early.", "Empieza con: The film was such", ["The film was such a boring one that we left early","The film was such boring that we left early"], "«Such… that».");
  T(KW, "They didn't expect the price to rise.", "Empieza con: The price", ["The price was not expected to rise","The price wasn't expected to rise"], "Pasiva con «expected».");
  T(KW, "I'm sure she'll pass the exam.", "Empieza con: She is", ["She is certain to pass the exam","She is bound to pass the exam","She is sure to pass the exam"], "«Be sure/certain/bound to».");
  T(KW, "Doing sport regularly is good for your health.", "Empieza con: Regular", ["Regular sport is good for your health","Regular sport is good for health"], "Sustituir la oración de gerundio por un adjetivo.");
  T(KW, "Nobody has ever complained about the service.", "Empieza con: The service has", ["The service has never been complained about","The service has never been criticised"], "Pasiva con «complain about».");

  R(RD, "Five short texts about travel: A. The coastal train is the cheapest way to see the sea, but it runs only twice a day. B. Our walking tours last three hours and include a local lunch. C. Ferries leave from the old port every hour in summer. D. Camping near the lake costs very little, though facilities are basic. E. The airport bus takes forty minutes to reach the city centre.", "Which text mentions a meal?", ["A","B","D"], 1, "El texto B incluye almuerzo.");
  RT(RD, "Five descriptions of cafés: A. Quiet place for reading, no music. B. Live jazz every Friday evening. C. Vegan menu and organic coffee. D. Children welcome, with a play area. E. Open 24 hours, ideal after the cinema.", "Which café is open all night?", ["E"], "El texto E abre las 24 horas.");

  L(LI, "Woman: The new library opens on Monday. Man: Really? I thought it was next year. Woman: No, they moved the date forward after the building was finished early.", "Why did the library open early?", ["The building was finished early","The city asked for it","There was a holiday"], 0, "El edificio terminó antes.");
  L(LI, "Man: I'm thinking of changing my job. Woman: What's stopping you? Man: Mostly the salary. The new company offers less, but the hours are much better.", "What is the man's main concern?", ["The distance to work","The salary","The colleagues"], 1, "Le preocupa el salario.");
  L(LI, "Presenter: Tonight we look at the rise in bicycle use. Experts say new cycle lanes have encouraged many people to leave their cars at home.", "What has caused more people to cycle?", ["Cheaper bikes","New cycle lanes","Better weather"], 1, "Los nuevos carriles bici.");
  L(LI, "Woman: Did you enjoy the concert? Man: Partly. The music was wonderful, but the sound system was terrible and we couldn't hear the singer.", "What was the man's complaint?", ["The music was bad","The sound was poor","The tickets were expensive"], 1, "El sonido era malo.");
  LT(LG, "Speaker: The festival will take place in the old town. Tickets go on sale in March, and you can buy them online or at the main square.", "Tickets can be bought online or at the ___.", ["main square","square"], "Lugar de venta.");
  LT(LG, "The research team needed three years to collect the data from fifty different schools.", "The team collected data from ___ schools.", ["fifty","50"], "Número de centros.");

  T(RD, "The problem was not solved until the following spring.", "Empieza con: It was not until", ["It was not until the following spring that the problem was solved","It was not until the next spring that the problem was solved"], "Énfasis con «it was not until».");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios C1 originales con la estructura de tareas del examen CAE (Cambridge C1 Advanced). */
(function () {
  var out = [], LV = "C1";
  function G(part, q, o, a, e) { out.push({ level: LV, type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { out.push({ level: LV, type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var CL = "CAE · Use of English P1 (cloze, 4 opciones)";
  var OC = "CAE · Use of English P2 (cloze abierto)";
  var WF = "CAE · Use of English P3 (formación de palabras)";
  var KW = "CAE · Use of English P4 (transformaciones)";
  var MC = "CAE · Use of English P5 (opción múltiple)";
  var RD = "CAE · Reading P6-P8 (emparejamiento)";
  var LI = "CAE · Listening P1 (opción múltiple)";
  var LG = "CAE · Listening P2 (rellenar huecos)";

  T(CL, "Not ___ the warnings, the team went ahead with the launch.", "Escribe la palabra que falta.", ["heeding"], "«Not heeding»: participio de sentido causal.");
  T(CL, "The minister's resignation came as no ___ to the press.", "Escribe la palabra que falta.", ["surprise"], "Colocación: «come as a surprise».");
  G(CL, "The results were ___ inconclusive that no decision was made.", ["so","such","too","very"], 0, "«So + adjetivo + that».");
  T(CL, "She ___ to have been living abroad for years.", "Escribe la palabra que falta.", ["appears"], "Presente simple de «appear» + «to».");
  T(CL, "Were it not ___ for the storm, we would have arrived on time.", "Escribe la palabra que falta.", ["for"], "«Were it not for» = si no fuera por.");
  G(CL, "He is ___ to lose his temper when things go wrong.", ["prone","apt","likely","liable"], 0, "«Prone to» con algo negativo.");
  G(CL, "They have ___ their differences and now work well together.", ["set aside","set off","set up","set in"], 0, "«Set aside» = dejar de lado.");
  G(CL, "The plan ___ fail because nobody checked the figures.", ["was bound to","was about to","was going","was due"], 0, "«Bound to» = seguro que.");
  T(OC, "Nobody expected the project to succeed, ___ it did.", "Escribe la palabra que falta.", ["but"], "Conector adversativo.");
  G(OC, "The report was ___ by three independent experts.", ["reviewed","revised","revisited","reviewing"], 0, "Pasiva: «reviewed by».");
  T(OC, "I'd rather you ___ mention this to anyone yet.", "Escribe la palabra que falta.", ["didn't"], "«I'd rather» + pasado simple.");
  G(MC, "The author's argument is weakened by ___ of evidence.", ["a lack","a deficiency","a shortage","a loss"], 0, "«A lack of» + sustantivo.");
  T(MC, "Long before the meeting ___, the decision had already been taken.", "Escribe la palabra que falta.", ["began"], "Pasado perfecto para acción anterior.");
  G(MC, "Under no ___ should the data be shared without permission.", ["circumstances","conditions","situations","contexts"], 0, "«Under no circumstances» = bajo ningún concepto.");
  T(MC, "The film was ___ with awards, despite its low budget.", "Escribe la palabra que falta.", ["laden"], "«Laden with» = cargado de.");

  T(WF, "The ___ of the new policy has been widely criticised. (IMPLEMENT)", "Sustantivo derivado de IMPLEMENT", ["implementation"], "«Implementation».");
  T(WF, "His ___ to the question was evasive. (RESPOND)", "Sustantivo derivado de RESPOND", ["response"], "«Response».");
  T(WF, "The scientist is ___ respected in her field. (WIDE)", "Adverbio derivado de WIDE", ["widely"], "«Widely».");
  T(WF, "The ___ between the two parties broke down. (NEGOTIATE)", "Sustantivo derivado de NEGOTIATE", ["negotiations"], "«Negotiations».");
  T(WF, "The team showed great ___ under pressure. (RESIST)", "Sustantivo derivado de RESIST", ["resilience","resistance"], "«Resilience» o «resistance» según el contexto.");
  T(WF, "It was an ___ decision to withdraw. (AVOID)", "Adjetivo derivado de AVOID", ["unavoidable"], "«Unavoidable».");

  T(KW, "I regret not telling her the truth earlier.", "Empieza con: I wish", ["I wish I had told her the truth earlier"], "«Wish» + pasado perfecto.");
  T(KW, "The company is not likely to change its mind.", "Empieza con: The company is unlikely", ["The company is unlikely to change its mind"], "«Unlikely» = poco probable.");
  T(KW, "We didn't realise the danger until it was too late.", "Empieza con: It was not until", ["It was not until it was too late that we realised the danger","It was only when it was too late that we realised the danger"], "Enfatización con «it was not until».");
  T(KW, "Although he was tired, he finished the marathon.", "Empieza con: Despite", ["Despite being tired, he finished the marathon","Despite his tiredness, he finished the marathon"], "«Despite» + -ing o sustantivo.");

  R(RD, "Text A: The archive preserves letters written by soldiers. Text B: The museum's new wing focuses on the history of printing. Text C: The library now offers free online access to rare maps. Text D: The gallery displays works from local artists who rarely exhibit. Text E: The collection will be sold to a private buyer next year.", "Which text describes something that may be lost to the public?", ["A","C","E"], 2, "El texto E indica que la colección se venderá a un comprador privado.");
  RT(RD, "Text A: Most readers skip the introduction, yet it often contains the key argument. Text B: Writers should avoid long sentences, but short ones can be just as tiring. Text C: Dictionaries show only common meanings, so context is essential. Text D: Good editors cut unnecessary words without changing the voice of the author.", "Which text gives advice about editing?", ["D"], "El texto D habla de editar sin cambiar la voz del autor.");

  R("CAE · Reading P5 (opción múltiple)", "The so-called 'slow food' movement began as a protest against fast-food chains. Its supporters argue that eating well means knowing where food comes from, but critics claim the movement is elitist, since its products are often expensive.", "What is the main criticism of the movement?", ["It is too cheap","Its products are often expensive","It encourages fast food"], 1, "Los productos suelen ser caros.");
  R("CAE · Reading P5 (opción múltiple)", "Economists disagree about the effects of the new tax. Some believe it will reduce spending, while others argue that it will simply shift consumption to cheaper goods rather than reduce it overall.", "What do some economists argue?", ["Spending will fall","Consumption will move to cheaper goods","Taxes will rise"], 1, "Consumo a bienes más baratos.");

  L(LI, "Presenter: Scientists have found that people who sleep for less than six hours show measurably slower reactions, even when they feel fully awake.", "What do scientists say about people who sleep little?", ["They feel tired","Their reactions are slower","They are less intelligent"], 1, "Reacciones más lentas.");
  L(LI, "Woman: I was sceptical at first, but the course has genuinely changed how I approach my work. Man: In what way? Woman: I'm more confident about delegating now.", "How has the woman changed?", ["She works less","She delegates more confidently","She has changed jobs"], 1, "Delega con más confianza.");
  L(LI, "Man: The council says the bridge will be safe by spring, but residents are unconvinced given the delays so far.", "How do residents feel about the council's promise?", ["They are confident","They doubt it","They are indifferent"], 1, "Dudan.");
  LT(LG, "The company announced that its profits had fallen by nearly a third in the last quarter, mainly because of rising energy costs.", "Profits fell by nearly a ___ in the last quarter.", ["third"], "Proporción.");
  LT(LG, "Our research suggests that the average commute has increased by eleven minutes since the pandemic.", "The average commute has increased by ___ minutes.", ["eleven","11"], "Cifra.");

  T(MC, "The new proposal is unlikely to be accepted by the board.", "Empieza con: The board", ["The board is unlikely to accept the new proposal","The board is not likely to accept the new proposal"], "Cambio de sujeto y forma.");
  T(RD, "Rarely have I read such an impressive debut novel.", "Empieza con: I have", ["I have rarely read such an impressive debut novel"], "Reordenación con «rarely».");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios C2 originales con la estructura de tareas del examen CPE (Cambridge C2 Proficiency). */
(function () {
  var out = [], LV = "C2";
  function G(part, q, o, a, e) { out.push({ level: LV, type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { out.push({ level: LV, type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { out.push({ level: LV, type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { out.push({ level: LV, type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var CL = "CPE · Reading and Use of English P1 (cloze, 4 opciones)";
  var WF = "CPE · Reading and Use of English P3 (formación de palabras)";
  var KW = "CPE · Reading and Use of English P4 (transformaciones)";
  var MC = "CPE · Reading and Use of English P5 (opción múltiple)";
  var RD = "CPE · Reading and Use of English P6-P7 (emparejamiento)";
  var LI = "CPE · Listening P1 (opción múltiple)";
  var LG = "CPE · Listening P2 (rellenar huecos)";

  G(CL, "Hardly ___ the room when the lights went out.", ["had she entered","she had entered","did she enter","she entered"], 0, "«Hardly… when» con inversión.");
  T(CL, "The committee ___ its decision until all the evidence was in.", "Escribe la palabra que falta.", ["withheld"], "«Withhold» = retener.");
  G(CL, "His ___ for detail impressed the examiners.", ["meticulousness","meticulously","meticulous","meticulate"], 0, "Sustantivo derivado de «meticulous».");
  T(CL, "Nothing ___ her from achieving her goal.", "Escribe la palabra que falta.", ["deterred"], "«Deter» = disuadir.");
  G(CL, "The theory has ___ been tested in real conditions.", ["already","still","yet","ever"], 0, "«Already» en afirmativa: ya se ha probado.");
  T(CL, "The bridge is ___ to collapse if repairs are delayed.", "Escribe la palabra que falta.", ["liable"], "«Liable to» con riesgo.");
  T(CL, "They were ___ with a generous offer from a rival company.", "Escribe la palabra que falta.", ["approached"], "«Approach» = acercarse con una propuesta.");
  G(CL, "He ___ the blame onto his assistant.", ["shifted","moved","transferred","pushed"], 0, "«Shift the blame» = echar la culpa.");
  G(MC, "The discovery ___ our understanding of the disease.", ["has transformed","transforms","transformed","has been transforming"], 0, "Presente perfecto con efecto actual.");
  G(MC, "Not only ___ the deadline, but they also exceeded the budget.", ["did they miss","they missed","they did miss","missed they"], 0, "«Not only» con inversión.");
  T(MC, "The speech was ___ in its simplicity and elegance.", "Escribe la palabra que falta.", ["remarkable"], "Adjetivo tras «was».");
  T(MC, "The rules are ___ enforced, which explains the confusion.", "Escribe la palabra que falta.", ["inconsistently"], "Adverbio que modifica a «enforced».");

  T(WF, "The ___ of the evidence was questioned by the jury. (RELIABLE)", "Sustantivo derivado de RELIABLE", ["reliability"], "«Reliability».");
  T(WF, "She showed remarkable ___ in the face of criticism. (COMPOSE)", "Sustantivo derivado de COMPOSE", ["composure"], "«Composure».");
  T(WF, "The ___ of the reform remains uncertain. (OUTCOME / EFFECT)", "Sustantivo: resultado final", ["outcome"], "«Outcome».");
  T(WF, "It was an ___ mistake for a professional. (FORGIVE)", "Adjetivo derivado de FORGIVE", ["unforgivable"], "«Unforgivable».");
  T(WF, "The ___ of the argument was lost in its complexity. (FORCE)", "Sustantivo: fuerza o contundencia", ["force"], "«Force».");

  T(KW, "I'm certain they will reject the proposal.", "Empieza con: They are", ["They are bound to reject the proposal","They are sure to reject the proposal"], "«Bound to» / «sure to».");
  T(KW, "The committee did not approve the plan until last year.", "Empieza con: It was not", ["It was not until last year that the committee approved the plan"], "Énfasis con «it was not until».");
  T(KW, "Despite having studied hard, she failed the test.", "Empieza con: In spite", ["In spite of having studied hard, she failed the test","In spite of her hard study, she failed the test"], "«In spite of» + -ing o sustantivo.");

  R(RD, "Paragraph A: Many believe that the decline of local newspapers has weakened public debate, yet others point out that online platforms have given more people a voice. Paragraph B: Investigative journalism is expensive, and few outlets can afford to fund long-term reporting. Paragraph C: Readers increasingly demand instant updates, which pressures journalists to publish before verifying facts.", "Which paragraph describes a problem caused by the cost of reporting?", ["A","B","C"], 1, "El párrafo B habla del coste del periodismo de investigación.");
  RT(RD, "Paragraph A: Gardening is a therapy many underestimate. Paragraph B: Urban planners now include allotments in new housing estates because residents ask for them. Paragraph C: Regular contact with soil is said to improve mood, though research is still limited.", "Which paragraph mentions a limit in the research?", ["C"], "El párrafo C dice que la investigación es limitada.");

  R("CPE · Reading and Use of English P5 (opción múltiple)", "The novel's apparent simplicity conceals a layered structure. Each chapter revisits the same event from the perspective of a different narrator, so that the reader is gradually forced to question which account, if any, is trustworthy.", "What effect does the structure have on the reader?", ["It makes the story easy to follow","It makes the reader doubt the narrators","It shows that the event is unimportant"], 1, "Obliga a cuestionar qué narrador es fiable.");

  L(LI, "Man: I suppose the proposal has its merits, but I can't help feeling it's been rushed. Woman: Rushed? It has been under discussion for two years. Man: Perhaps, but the final draft appeared only last week.", "What is the man's main objection?", ["The proposal is too expensive","The final draft came out too late","The proposal has been discussed for too long"], 1, "El borrador final apareció la semana pasada.");
  L(LI, "Woman: The data is compelling, but I'm not convinced the sample is representative. Man: Fair enough, though the methodology was reviewed by three independent teams.", "What doubt does the woman express?", ["The results are too recent","The sample may not be representative","The reviewers were not qualified"], 1, "La muestra puede no ser representativa.");
  LT(LG, "The author describes her childhood in a small fishing village, where the sea shaped almost every aspect of daily life.", "The author grew up in a small ___ village.", ["fishing"], "Tipo de pueblo.");

  T(MC, "Although the proposal seemed promising, it failed to gain support.", "Empieza con: Despite", ["Despite the proposal seeming promising, it failed to gain support","Despite seeming promising, the proposal failed to gain support","Despite appearing promising, the proposal failed to gain support"], "«Despite» + -ing.");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios adicionales originales para A2, B2, C1 y C2, con la estructura de tareas de KET, FCE, CAE y CPE. */
(function () {
  var out = [], LV = "";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }

  /* ---------- A2 (KET) ---------- */
  LV = "A2";
  var A_RW = "KET · Reading y Writing", A_LS = "KET · Listening";
  G(A_RW, "There aren't ___ biscuits left.", ["any", "some", "much"], 0, "Negativa con plural contable: «any».");
  T(A_RW, "He is ___ than his brother.", "Escribe la palabra que falta.", ["taller"], "Comparativo de adjetivo corto.");
  G(A_RW, "I'm going to visit my grandmother ___ Sunday.", ["on", "in", "at"], 0, "Los días de la semana llevan «on».");
  T(A_RW, "Could you ___ me the salt, please?", "Escribe la palabra que falta.", ["pass"], "«Pass» + objeto + persona.");
  G(A_RW, "She ___ her homework yet.", ["hasn't finished", "didn't finish", "doesn't finish"], 0, "«Yet» va con presente perfecto en negativa.");
  T(A_RW, "Let's meet ___ the cinema.", "Escribe la palabra que falta.", ["at"], "«At the cinema» para lugares de ocio.");
  G(A_RW, "This is ___ interesting book I've ever read.", ["the most", "most", "the more"], 0, "Superlativo con «the most».");
  R(A_RW, "Hi Tom, sorry I missed your call. I'm at the dentist until 12. Can we meet for lunch at one instead? Call me when you finish. Anna", "When can Anna meet Tom?", ["At noon", "At one o'clock", "Tomorrow"], 1, "Propone la una para comer.");
  R(A_RW, "Lost property: a black umbrella was found on the number 5 bus on Monday. Please come to the office on Station Road between 9 and 5 to collect it.", "Where should the owner go?", ["To the bus station", "To the office on Station Road", "To the number 5 bus"], 1, "Debe ir a la oficina de Station Road.");
  R(A_RW, "The swimming pool is closed on Sundays for cleaning. It opens at 7 a.m. on other days and closes at 9 p.m.", "When is the pool closed?", ["On Sundays", "At 7 p.m.", "Every evening"], 0, "Cierra los domingos.");
  R(A_RW, "Maria works in a hospital. She starts at six in the morning and finishes at two in the afternoon. She likes the early hours because she has the evenings free.", "Why does Maria like her job?", ["She works in the evening", "She has free evenings", "She works near her house"], 1, "Le gustan las tardes libres.");
  R(A_RW, "Notice: The school trip to the museum has been moved to Friday because of the weather. Students should bring a packed lunch and a notebook.", "What must students bring?", ["A camera and a map", "A packed lunch and a notebook", "Money for the museum"], 1, "Deben traer comida y cuaderno.");
  R(A_RW, "Thank you for choosing our hotel. Breakfast is served from 7 to 10 a.m. in the restaurant on the ground floor. Wi-Fi is free in all rooms.", "Where is breakfast served?", ["In the bedrooms", "In the restaurant downstairs", "In the garden"], 1, "El desayuno está en el restaurante de la planta baja.");
  L(A_LS, "Man: Excuse me, where is the post office? Woman: Go straight on, then turn left at the bank. It's opposite the supermarket.", "Where is the post office?", ["Opposite the supermarket", "Behind the bank", "Next to the station"], 0, "Está enfrente del supermercado.");
  L(A_LS, "Woman: What time does the film start? Man: At quarter past eight. We should leave at half past seven to get tickets.", "When should they leave?", ["At 7:15", "At 7:30", "At 8:15"], 1, "Salen a las 7:30.");
  L(A_LS, "Man: I'd like to book a table for four people on Saturday evening. Woman: Certainly. What time would you prefer? Man: Around seven, if possible.", "What time does the man want?", ["Around 6", "Around 7", "Around 8"], 1, "Quiere sobre las siete.");
  L(A_LS, "Woman: Is your sister coming to the party? Man: She'd love to, but she has to work until late on Friday.", "Why can't the sister come?", ["She is ill", "She has to work", "She is on holiday"], 1, "Tiene que trabajar.");
  LT(A_LS, "Man: The shop opens at nine and closes at six, but on Sundays it closes at two.", "On Sundays the shop closes at ___.", ["two", "2"], "Horario del domingo.");
  T(A_RW, "The film was more boring than I thought.", "Empieza con: The film was not", ["The film was not as interesting as I thought", "The film was not as exciting as I thought"], "Negación de comparativo.");
  T(A_RW, "Tom is taller than Peter.", "Empieza con: Peter is not", ["Peter is not as tall as Tom", "Peter isn't as tall as Tom"], "Comparativo inverso.");
  T(A_RW, "It's a very long way from here to the airport.", "Empieza con: The airport is", ["The airport is a long way from here", "The airport is far from here"], "Sinónimo de distancia.");
  T(A_RW, "She began learning English five years ago.", "Empieza con: She has", ["She has been learning English for five years"], "Presente perfecto continuo con «for».");

  /* ---------- B2 (FCE) ---------- */
  LV = "B2";
  var B_UE1 = "FCE · Use of English P1 (cloze, 4 opciones)", B_UE5 = "FCE · Use of English P5 (opción múltiple)";
  var B_KW = "FCE · Use of English P4 (transformaciones)", B_RD = "FCE · Reading P5 (opción múltiple)";
  var B_LI = "FCE · Listening P1 (opción múltiple)";
  G(B_UE1, "I'd rather you ___ smoke in the house.", ["didn't", "don't", "won't"], 0, "«I'd rather» + pasado simple.");
  G(B_UE1, "By the time we arrived, the film ___.", ["had already started", "already started", "has already started"], 0, "Pasado perfecto para una acción anterior.");
  T(B_UE1, "She suggested ___ a taxi.", "Escribe la palabra que falta.", ["taking"], "«Suggest» + -ing.");
  T(B_UE1, "The window needs ___.", "Escribe la palabra que falta.", ["cleaning"], "«Need» + -ing con sentido pasivo.");
  G(B_UE1, "If I ___ you, I would apologise.", ["were", "was", "am"], 0, "Condicional 2 con «were».");
  T(B_UE1, "He is ___ to the noise of the traffic now.", "Escribe la palabra que falta.", ["used"], "«Be used to» + sustantivo.");
  G(B_UE1, "Hardly ___ down when the bell rang.", ["had we sat", "we had sat", "did we sit"], 0, "«Hardly… when» con inversión.");
  G(B_UE1, "The children were ___ tired to go to the park.", ["too", "enough", "such"], 0, "«Too + adjetivo + to».");
  G(B_UE1, "She ___ her keys, so she couldn't get in.", ["had lost", "lost", "has lost"], 0, "Pasado perfecto de una acción previa.");
  T(B_UE1, "I wish I ___ speak French.", "Escribe la palabra que falta.", ["could"], "«I wish I could» para deseos presentes.");
  G(B_UE5, "Make sure you ___ the lights before you leave.", ["turn off", "turn on", "turn up"], 0, "«Turn off» = apagar.");
  G(B_UE5, "The results ___ announced next week.", ["are to be", "are being", "have been"], 0, "«Be to be» = estar previsto.");
  T(B_UE5, "Despite ___ late, we still got a table.", "Escribe la palabra que falta.", ["arriving"], "«Despite» + -ing.");
  G(B_UE5, "He insisted on ___ the bill.", ["paying", "to pay", "pay"], 0, "«Insist on» + -ing.");
  G(B_UE5, "Let me ___ my coat, then we can go.", ["put on", "put in", "put up"], 0, "«Put on» = ponerse una prenda.");
  T(B_UE5, "She works as ___ engineer in a large company.", "Escribe la palabra que falta.", ["an"], "Artículo ante vocal.");
  R(B_RD, "Sam used to hate running. Last year he joined a local club, and now he runs three times a week. He says the people there make it fun.", "What changed Sam's attitude to running?", ["A new job", "Joining a club", "A doctor's advice"], 1, "Se apuntó a un club.");
  R(B_RD, "The library has announced longer opening hours. From next month it will open on Sundays as well as weekdays, although it will close an hour earlier on Saturdays.", "What is the main change?", ["It will close earlier every day", "It will open on Sundays", "It will become a café"], 1, "Abrirá los domingos.");
  R(B_RD, "Many people think that learning a language is only about grammar. In fact, the most effective way to improve is to talk with native speakers as often as possible.", "What does the writer recommend?", ["Studying grammar books only", "Speaking with native speakers", "Watching films without subtitles"], 1, "Hablar con nativos.");
  R(B_RD, "Our hotel offers a free airport shuttle, but it must be booked at least 24 hours in advance. The shuttle leaves every two hours.", "What must guests do to use the shuttle?", ["Pay at the airport", "Book a day ahead", "Arrive two hours early"], 1, "Hay que reservarlo con 24 horas.");
  R(B_RD, "The town council wants to build a new cycle lane along the river. Some residents are worried that it will reduce parking spaces, but the council says only a few will be lost.", "What are some residents worried about?", ["Noise from the river", "Losing parking spaces", "High taxes"], 1, "Temen perder aparcamiento.");
  RT(B_RD, "Dear customer, your order has been delayed because of a problem at our warehouse. It will now arrive on Thursday instead of Tuesday. We apologise for the inconvenience.", "When will the order arrive?", ["Thursday"], "Llegará el jueves.");
  R(B_RD, "Ellen is a nurse who works night shifts. Although she finds the hours tiring, she says the team is friendly and the patients are grateful.", "How does Ellen feel about her job?", ["She dislikes her colleagues", "The hours are tiring but she is happy with the team", "She wants to leave the hospital"], 1, "Le cansan los turnos pero está contenta.");
  R(B_RD, "Electric scooters can now be rented in most big cities. Riders download an app, find a scooter on the street and pay by the minute.", "How do people pay for scooters?", ["By the day", "By the minute", "With cash at the station"], 1, "Se paga por minuto.");
  R(B_RD, "The museum's new exhibition about the sea includes ship models, old maps and a short film. Entry is free for children under twelve.", "Who gets free entry?", ["Everyone on Sundays", "Children under twelve", "Students with a card"], 1, "Entrada gratuita para menores de doce.");
  R(B_RD, "Jake wanted to buy a bicycle, but he didn't have enough money. He decided to save for three months and bought a second-hand one.", "Why did Jake buy a second-hand bicycle?", ["He won a competition", "He didn't have much money", "He didn't like new bikes"], 1, "No tenía suficiente dinero.");
  R(B_RD, "The café on the corner is closed for repairs until the end of the month. Customers can get their coffee from the bakery next door in the meantime.", "Where can customers get coffee?", ["At the bakery next door", "At the corner café", "At the train station"], 0, "En la panadería de al lado.");
  R(B_RD, "Dear Mr Lee, thank you for your application. Unfortunately, we have decided to offer the position to another candidate. We wish you success in your job search.", "What is the purpose of the letter?", ["To invite Mr Lee to an interview", "To say he did not get the job", "To offer him a new position"], 1, "Le comunican que no ha sido seleccionado.");
  L(B_LI, "Woman: Sorry I'm late. The traffic was terrible. Man: That's OK, I've only just arrived myself.", "Why was the woman late?", ["The bus was early", "There was heavy traffic", "She forgot the time"], 1, "Tráfico muy denso.");
  L(B_LI, "Man: Would you like tea or coffee? Woman: A cup of tea, please, with no sugar.", "What does the woman want?", ["Coffee with sugar", "Tea without sugar", "Tea with milk and sugar"], 1, "Té sin azúcar.");
  L(B_LI, "Presenter: The concert has been moved from Saturday to Sunday because the singer is ill. Tickets will remain valid.", "What has changed?", ["The ticket price", "The day of the concert", "The venue"], 1, "Se cambia de sábado a domingo.");
  L(B_LI, "Woman: I've decided to study medicine. Man: That's a big decision. Woman: I know, but I've always wanted to help people.", "What has the woman decided?", ["To travel abroad", "To study medicine", "To change her job"], 1, "Va a estudiar medicina.");
  L(B_LI, "Man: The meeting starts at ten, not eleven. Please make sure everyone knows before tomorrow.", "When does the meeting start?", ["At nine", "At ten", "At eleven"], 1, "A las diez.");
  L(B_LI, "Woman: Do you know where the nearest chemist is? Man: Yes, it's two streets away, next to the bakery.", "Where is the chemist?", ["Next to the bakery", "Opposite the station", "Beside the school"], 0, "Junto a la panadería.");
  L(B_LI, "Man: The printer isn't working again. Woman: Try turning it off and on. That usually fixes it.", "What does the woman suggest?", ["Buying a new printer", "Restarting the printer", "Calling an engineer"], 1, "Reiniciarla.");
  L(B_LI, "Presenter: Experts say the number of people working from home has fallen, as more companies ask staff to return to the office.", "What is the trend?", ["More people work from home", "Fewer people work from home", "Companies are closing offices"], 1, "Cada vez menos teletrabajo.");
  LT(B_LI, "Woman: The course lasts six weeks and takes place every Tuesday evening.", "The course takes place on ___ evenings.", ["tuesday", "tuesdays"], "Día del curso.");
  LT(B_LI, "The research team studied 300 volunteers over a period of ten years.", "The team studied ___ volunteers.", ["300", "three hundred"], "Número de voluntarios.");
  L(B_LI, "Man: I'm not sure about the new software. It looks good, but it takes ages to learn.", "What is the man's concern?", ["The price", "It is hard to learn", "It is not available"], 1, "Tarda mucho en aprenderse.");
  L(B_LI, "Woman: We should book the hotel early in the summer, because prices rise quickly.", "Why should they book early?", ["Rooms are cheaper", "Prices go up quickly", "The hotel closes soon"], 1, "Los precios suben rápido.");
  T(B_KW, "I wish I had seen the exhibition.", "Empieza con: It's a pity", ["It's a pity I didn't see the exhibition", "It is a pity that I did not see the exhibition"], "Deseo sobre el pasado.");
  T(B_KW, "He is certain to win the race.", "Empieza con: He is bound", ["He is bound to win the race", "He is sure to win the race"], "«Bound to» / «sure to».");
  T(B_KW, "Although it was cold, they went swimming.", "Empieza con: Despite", ["Despite the cold, they went swimming", "Despite it being cold, they went swimming"], "«Despite» + sustantivo o -ing.");
  T(B_KW, "She managed to finish the report on time.", "Empieza con: She succeeded", ["She succeeded in finishing the report on time"], "«Succeed in» + -ing.");
  T(B_KW, "You should have told me earlier.", "Empieza con: I wish you", ["I wish you had told me earlier"], "Deseo sobre el pasado.");
  T(B_KW, "People say that the director is very strict.", "Empieza con: The director is said", ["The director is said to be very strict"], "Pasiva impersonal con «said to».");
  T(B_KW, "It isn't necessary for you to bring a laptop.", "Empieza con: You don't", ["You don't need to bring a laptop", "You do not need to bring a laptop"], "«Need» en negativa.");
  T(B_KW, "Our flight was delayed, so we missed the meeting.", "Empieza con: Because", ["Because our flight was delayed, we missed the meeting"], "Conector de causa.");
  T(B_KW, "Nobody told me about the change.", "Empieza con: I was", ["I was not told about the change"], "Pasiva en negativa.");
  T(B_KW, "I started my job in 2019 and I still work there.", "Empieza con: I have", ["I have worked there since 2019", "I have been working there since 2019"], "Presente perfecto con «since».");

  /* ---------- C1 (CAE) ---------- */
  LV = "C1";
  var C_CL = "CAE · Use of English P1 (cloze, 4 opciones)", C_KW = "CAE · Use of English P4 (transformaciones)";
  var C_RD = "CAE · Reading P5 (opción múltiple)", C_LI = "CAE · Listening P1 (opción múltiple)";
  G(C_CL, "Not until the last minute ___ the report.", ["did she finish", "she finished", "she had finished"], 0, "«Not until» con inversión.");
  T(C_CL, "The manager, ___ by the results, approved the new budget.", "Escribe la palabra que falta.", ["impressed"], "Participio con valor pasivo.");
  G(C_CL, "They ___ the contract by the time the deadline passed.", ["had signed", "signed", "have signed"], 0, "Pasado perfecto con marcador temporal.");
  G(C_CL, "I'd have gone to the concert if I ___ been ill.", ["hadn't", "wasn't", "haven't"], 0, "Condicional 3.");
  T(C_CL, "The committee will ___ a decision next month.", "Escribe la palabra que falta.", ["reach"], "Colocación: «reach a decision».");
  G(C_CL, "It's no ___ complaining; the decision is final.", ["use", "good", "point"], 0, "«It's no use» + -ing.");
  T(C_CL, "Her essay was ___ well-structured that it won a prize.", "Escribe la palabra que falta.", ["so"], "«So + adjetivo + that».");
  T(C_CL, "The plan was ___ on the assumption that prices would stay low.", "Escribe la palabra que falta.", ["based"], "«Based on».");
  G(C_CL, "He is ___ to speak his mind, even when it is unpopular.", ["inclined", "able", "used"], 0, "«Be inclined to».");
  T(C_CL, "Scarcely had the play begun ___ the fire alarm went off.", "Escribe la palabra que falta.", ["when"], "«Scarcely… when».");
  T(C_CL, "Despite ___ the odds, the team won the cup.", "Escribe la palabra que falta.", ["defying"], "«Despite» + -ing.");
  G(C_CL, "She has a tendency ___ jump to conclusions.", ["to", "for", "at"], 0, "«Tendency to».");
  T(C_CL, "The mayor was ___ to comment on the scandal.", "Escribe la palabra que falta.", ["reluctant"], "«Reluctant to» = poco dispuesto a.");
  G(C_CL, "___ the rain, the match went ahead.", ["Regardless of", "Owing to", "Although"], 0, "«Regardless of» = a pesar de.");
  G(C_CL, "Had I known about the delay, I ___ the train.", ["would have caught", "would catch", "caught"], 0, "Condicional 3 con inversión.");
  G(C_CL, "The painting ___ displayed in the gallery since 1990.", ["has been", "was", "had been"], 0, "Presente perfecto pasivo con «since».");
  R(C_RD, "Urban gardens are often described as a luxury, but in dense cities they serve a practical purpose: they reduce flooding by absorbing rainwater and cool the air during heatwaves.", "According to the text, urban gardens are useful because they", ["are expensive to maintain", "help manage rainwater and temperature", "attract tourists"], 1, "Absorben lluvia y enfrían el aire.");
  R(C_RD, "The author argues that early exposure to music does not guarantee later talent. Instead, he suggests that persistence and a supportive environment matter more.", "What does the author suggest is more important than early exposure?", ["Natural ability", "Persistence and support", "Expensive lessons"], 1, "Persistencia y entorno.");
  R(C_RD, "Although the company's share price has risen sharply, analysts warn that its debts remain high and that the rise may not last.", "What do analysts think about the rise?", ["It will certainly continue", "It may not be sustainable", "It is caused by high debts"], 1, "Puede no mantenerse.");
  R(C_RD, "Historians have long assumed that the letters were written by a single author. A recent analysis of the handwriting, however, suggests that at least three people were involved.", "What did the recent analysis reveal?", ["The letters were forged", "More than one person wrote them", "The author was a famous poet"], 1, "Varias manos.");
  R(C_RD, "The novel is told through the eyes of a child who misunderstands the adults around her. The reader, therefore, must work out what is really happening.", "What effect does the narrator have on the reader?", ["The reader is told everything directly", "The reader must interpret events", "The reader is bored"], 1, "El lector debe interpretar.");
  R(C_RD, "Critics praised the film's cinematography but found the plot predictable. Many viewers, however, appreciated its quiet, unhurried pace.", "What did some viewers like?", ["The fast plot", "The slow, calm pace", "The soundtrack"], 1, "Les gustó el ritmo pausado.");
  R(C_RD, "Medical researchers have found that a short walk after meals can help regulate blood sugar. The effect, they note, is strongest in people who sit for most of the day.", "Who benefits most from the walk?", ["Athletes", "People who sit most of the day", "Children"], 1, "Quienes están sentados mucho tiempo.");
  R(C_RD, "The proposal would ban cars from the city centre on weekends. Supporters say it will reduce pollution; opponents argue that shops will lose customers.", "What do opponents worry about?", ["Pollution levels", "Shops losing customers", "Parking fees"], 1, "Pérdida de clientes en tiendas.");
  R(C_RD, "The festival has grown from a small local event into an international gathering attracting musicians from over thirty countries.", "What has happened to the festival?", ["It has closed", "It has become international", "It has moved abroad"], 1, "Se ha internacionalizado.");
  R(C_RD, "Despite warnings from engineers, the bridge was opened ahead of schedule. Within a year, cracks had appeared in several of its supports.", "What does the text suggest?", ["The engineers were wrong", "The bridge was opened too early", "The cracks were caused by storms"], 1, "Se abrió demasiado pronto.");
  R(C_RD, "Many languages borrow words from one another. English, for instance, has absorbed thousands of terms from French, largely after the Norman conquest.", "According to the text, English borrowed many words from French because of", ["trade with France", "the Norman conquest", "a royal marriage"], 1, "Tras la conquista normanda.");
  R(C_RD, "The committee has not yet decided whether to fund the project. Members are waiting for a report on its long-term costs.", "What are the members waiting for?", ["A vote", "A report on costs", "A new director"], 1, "Un informe de costes.");
  R(C_RD, "Reviewers agreed that the restaurant's service was attentive, yet several complained that the food arrived cold.", "What was the main complaint?", ["Poor service", "Cold food", "High prices"], 1, "La comida llegaba fría.");
  R(C_RD, "The museum's director insists that the collection will remain free to the public, despite financial pressure from the council.", "What is the director's position?", ["The collection will be sold", "The collection will stay free", "Entry will become expensive"], 1, "Seguirá gratuita.");
  L(C_LI, "Presenter: Researchers have discovered that people who take regular breaks during work report higher levels of concentration.", "What did researchers find?", ["Breaks reduce concentration", "Regular breaks improve concentration", "Work is less tiring at night"], 1, "Las pausas mejoran la concentración.");
  L(C_LI, "Woman: I'd always assumed the project would be finished on time, but the delays have been unavoidable.", "How does the woman feel about the delays?", ["Surprised", "Resigned", "Angry"], 1, "Las acepta como inevitables.");
  L(C_LI, "Man: The proposal sounds sensible in theory, but I doubt it will survive contact with reality.", "What is the man's attitude?", ["Confident", "Sceptical", "Enthusiastic"], 1, "Duda de su viabilidad.");
  L(C_LI, "Woman: Ever since they changed the timetable, the buses have been packed, and fewer people are willing to wait.", "What is the problem?", ["Buses are too slow", "Buses are overcrowded", "Buses are too cheap"], 1, "Autobuses llenos.");
  L(C_LI, "Man: I'm inclined to accept the offer, although the salary is lower than I'd hoped.", "What is the man inclined to do?", ["Reject the offer", "Accept the offer", "Ask for a raise"], 1, "Tiende a aceptar.");
  L(C_LI, "Presenter: The exhibition, which had been expected to draw large crowds, has attracted fewer visitors than the organisers anticipated.", "How did the exhibition perform?", ["Better than expected", "Worse than expected", "As expected"], 1, "Menos visitantes de lo previsto.");
  L(C_LI, "Woman: The report says the town's population will double within two decades, which will put enormous pressure on housing.", "What is the report's main concern?", ["Schools", "Housing", "Transport"], 1, "Presión sobre la vivienda.");
  L(C_LI, "Man: Honestly, I thought the lecture would be dull, but the speaker made the subject surprisingly engaging.", "How did the man find the lecture?", ["Dull", "Surprisingly interesting", "Too long"], 1, "Le resultó interesante.");
  LT(C_LI, "Presenter: The new laboratory will employ around two hundred scientists once it is fully operational.", "The laboratory will employ about ___ scientists.", ["200", "two hundred"], "Cifra de empleados.");
  LT(C_LI, "Woman: The rent has increased by nearly a fifth since last year, so many families have had to move further out of the city.", "The rent has increased by nearly a ___.", ["fifth"], "Proporción del aumento.");
  L(C_LI, "Man: I'm afraid the results won't be published until the audit is complete.", "When will the results be published?", ["Immediately", "After the audit", "Next year"], 1, "Tras la auditoría.");
  L(C_LI, "Woman: Had we known how difficult the route would be, we would have chosen a different one.", "What do the speakers regret?", ["Choosing this route", "Being late", "Leaving early"], 0, "Lamentan la ruta elegida.");
  T(C_KW, "It's unlikely that he will accept the offer.", "Empieza con: He is", ["He is unlikely to accept the offer"], "«Unlikely to».");
  T(C_KW, "Only when she read the letter did she understand what had happened.", "Empieza con: It was", ["It was only when she read the letter that she understood what had happened"], "Enfatización con «it was only when».");
  T(C_KW, "The team didn't expect to win, but they did.", "Empieza con: Much to", ["Much to the team's surprise, they won", "Much to everyone's surprise, the team won"], "«Much to» = para sorpresa de.");
  T(C_KW, "He regrets not studying harder at school.", "Empieza con: He wishes", ["He wishes he had studied harder at school"], "Deseo sobre el pasado.");
  T(C_KW, "Had she not missed the bus, she would have arrived on time.", "Empieza con: If she", ["If she had not missed the bus, she would have arrived on time", "If she hadn't missed the bus, she would have arrived on time"], "Condicional 3 sin inversión.");
  T(C_KW, "The company is likely to announce job cuts next month.", "Empieza con: It is likely", ["It is likely that the company will announce job cuts next month"], "Sujeto anticipatorio «it».");
  T(C_KW, "Nobody has informed her about the problem.", "Empieza con: She has not", ["She has not been informed about the problem"], "Pasiva en presente perfecto.");
  T(C_KW, "No matter how hard he tried, he couldn't convince the jury.", "Empieza con: Despite", ["Despite trying hard, he couldn't convince the jury", "Despite how hard he tried, he couldn't convince the jury"], "«Despite» + -ing.");
  T(C_KW, "Prices have been rising steadily since the summer.", "Empieza con: Prices have", ["Prices have been going up steadily since the summer", "Prices have been rising steadily since summer"], "Sinónimo de «rising».");
  T(C_KW, "Our team seldom loses a match at home.", "Empieza con: Our team", ["Our team rarely loses a match at home"], "Sinónimo de «seldom».");

  /* ---------- C2 (CPE) ---------- */
  LV = "C2";
  var D_CL = "CPE · Reading and Use of English P1 (cloze, 4 opciones)", D_KW = "CPE · Reading and Use of English P4 (transformaciones)";
  var D_RD = "CPE · Reading and Use of English P5 (opción múltiple)", D_LI = "CPE · Listening P1 (opción múltiple)";
  G(D_CL, "Little ___ that the meeting would be cancelled.", ["did we suspect", "we suspected", "we did suspect"], 0, "«Little» con inversión.");
  G(D_CL, "The speech was ___ in its eloquence and clarity.", ["unparalleled", "unparalleling", "unparallelled"], 0, "Adjetivo: «sin igual».");
  T(D_CL, "I'd sooner walk home ___ take that bus.", "Escribe la palabra que falta.", ["than"], "«Would sooner… than».");
  G(D_CL, "No sooner ___ the door than the argument began.", ["had he opened", "he had opened", "did he open"], 0, "«No sooner» con inversión.");
  G(D_CL, "The report was ___, and no one questioned its findings.", ["thoroughly researched", "thorough researched", "researched thorough"], 0, "Adverbio + participio.");
  T(D_CL, "She ___ never been so frightened in her life.", "Escribe la palabra que falta.", ["had"], "Pasado perfecto con «never».");
  G(D_CL, "Were it ___ for the funding, the project would have collapsed.", ["not", "no", "nothing"], 0, "«Were it not for».");
  T(D_CL, "He is ___ to apologise, even when he is wrong.", "Escribe la palabra que falta.", ["loath"], "«Loath to» = reacio a.");
  G(D_CL, "The evidence ___ to be unreliable.", ["appears to be", "appears being", "appearing to"], 0, "«Appear to be».");
  T(D_CL, "They ___ to have reached a compromise, though nobody is certain.", "Escribe la palabra que falta.", ["seem"], "«Seem to have» + participio.");
  G(D_CL, "Not ___ she apologised did her colleagues forgive her.", ["until", "since", "before"], 0, "«Not until» con inversión.");
  G(D_CL, "She ___ with the full weight of responsibility.", ["was left to cope", "was left coping", "was left cope"], 0, "«Be left to» + infinitivo.");
  G(D_CL, "The principle was ___ accepted that no vote was required.", ["so widely", "such widely", "too widely"], 0, "«So widely… that».");
  G(D_CL, "___ of the scandal, the minister resigned.", ["In the wake", "Within the wake", "On the wake"], 0, "«In the wake of» = a raíz de.");
  T(D_CL, "The contract ___ be signed by both parties to be valid.", "Escribe la palabra que falta.", ["must"], "Obligación necesaria para la validez.");
  G(D_CL, "Her ___ to the question was so evasive that everyone noticed.", ["response", "responsive", "responsively"], 0, "Sustantivo.");
  T(D_CL, "It is high ___ that the government reconsidered its position.", "Escribe la palabra que falta.", ["time"], "«It's high time that».");
  T(D_CL, "The results, ___ we had hoped, were inconclusive.", "Escribe la palabra que falta.", ["as"], "«As we had hoped».");
  G(D_CL, "Under no ___ should confidential files be left unattended.", ["circumstances", "conditions", "situations"], 0, "«Under no circumstances».");
  T(D_CL, "He ___ to the decision reluctantly, but he accepted it in the end.", "Escribe la palabra que falta.", ["assented"], "«Assent to» = consentir.");
  R(D_RD, "The essay's central claim is that memory is not a recording but a reconstruction. Each time we recall an event, we subtly rewrite it.", "According to the essay, each time we remember something", ["we record it exactly", "we rewrite it slightly", "we forget it"], 1, "La reescribimos ligeramente.");
  R(D_RD, "A cautious approach to the new vaccine seems sensible, yet the author suspects that scepticism has at times been used to justify inaction.", "What does the author suspect?", ["Vaccines are dangerous", "Scepticism has sometimes excused inaction", "The vaccine is ineffective"], 1, "La duda sirve de excusa.");
  RT(D_RD, "Her performance was technically flawless, but critics felt it lacked the emotional depth that made earlier productions memorable.", "What did critics think was missing?", ["Emotional depth"], "Profundidad emocional.");
  R(D_RD, "The author writes with a dry wit that undercuts even her most solemn observations, which makes the book both funny and unsettling.", "How would you describe the book?", ["Humorous and disturbing", "Simple and dull", "Serious and factual"], 0, "Cómica e inquietante.");
  R(D_RD, "The firm's apparent success masks a structure in which a handful of executives control almost every decision.", "What does the passage imply about the firm?", ["Decisions are shared widely", "Power is concentrated", "It has no executives"], 1, "El poder está concentrado.");
  R(D_RD, "Archaeologists had assumed the settlement was abandoned in the fifth century. Fresh excavations, however, uncovered coins dating from two centuries later.", "What did the excavations show?", ["The settlement was abandoned earlier", "The settlement lasted longer than thought", "The coins were forgeries"], 1, "Duró más de lo creído.");
  R(D_RD, "The proposal, though ambitious, has been criticised for relying on assumptions that have never been tested in practice.", "What is the main criticism?", ["It is too cheap", "Its assumptions are untested", "It is too modest"], 1, "Supuestos sin probar.");
  R(D_RD, "Translators must balance fidelity to the original with the need for readability; a rendering that is faithful yet clumsy serves nobody.", "What does the writer believe a translator must do?", ["Ignore the original", "Balance faithfulness and readability", "Translate word for word"], 1, "Equilibrio entre fidelidad y legibilidad.");
  R(D_RD, "Rather than dismissing the rumours outright, the editor chose to investigate them, a decision that eventually led to a major exposé.", "What did the editor do?", ["Ignored the rumours", "Investigated them", "Published them at once"], 1, "Investigó los rumores.");
  R(D_RD, "Critics have long complained that the museum privileges Western art. Its new wing, which features works from across the Global South, is a belated attempt to address this imbalance.", "What is the new wing's purpose?", ["To sell Western art", "To address an imbalance", "To close the museum"], 1, "Corregir un desequilibrio.");
  R(D_RD, "Although the treaty was hailed as a breakthrough, its signatories have since been accused of ignoring several of its key provisions.", "What has happened since the treaty?", ["It was cancelled", "Signatories are accused of ignoring provisions", "It was fully implemented"], 1, "Acusados de incumplirlo.");
  R(D_RD, "The scientist's hypothesis was initially rejected by her peers, but decades later it became the foundation of a new field.", "What happened to the hypothesis?", ["It was disproved", "It later became foundational", "It was forgotten"], 1, "Acabó siendo la base de un campo.");
  R(D_RD, "Economic historians debate whether the reforms of the 1830s genuinely improved living standards, since the gains were unevenly distributed.", "What is the debate about?", ["Whether the reforms existed", "Whether living standards improved", "Who designed the reforms"], 1, "Si mejoró el nivel de vida.");
  RT(D_RD, "The poem's apparent simplicity conceals a dense network of allusions, many of which only a careful reader will recognise.", "What does the poem's surface suggest?", ["Simplicity"], "Parece sencillo pero no lo es.");
  R(D_RD, "Parents who over-protect their children may inadvertently deprive them of the chance to develop resilience, a trait researchers consider essential.", "What may over-protection deprive children of?", ["Money", "Resilience", "Friends"], 1, "Resiliencia.");
  R(D_RD, "Far from being a passive recipient of news, the modern reader is expected to evaluate sources, cross-check claims and draw independent conclusions.", "According to the passage, modern readers should", ["accept news as given", "evaluate sources critically", "avoid reading news"], 1, "Evaluar fuentes.");
  L(D_LI, "Presenter: The ministry's latest figures suggest unemployment has fallen, although critics point out that many new jobs are part-time.", "What do critics point out?", ["Unemployment has risen", "Many new jobs are part-time", "The figures are unreliable"], 1, "Muchos empleos son a tiempo parcial.");
  L(D_LI, "Man: I find it hard to believe she'd leave the project at this stage, unless something had seriously gone wrong.", "What does the man suggest?", ["She left by choice", "Something serious must have happened", "She is on holiday"], 1, "Algo grave debió de pasar.");
  L(D_LI, "Woman: The minutes confirm that the decision was taken unanimously, which surprised even those who had opposed the plan.", "How was the decision taken?", ["By a narrow majority", "Unanimously", "By the chairman alone"], 1, "Por unanimidad.");
  L(D_LI, "Man: Your argument is persuasive, though I'd question the sample size; a few dozen cases hardly constitute evidence.", "What does the man question?", ["The argument's logic", "The sample size", "The author's motives"], 1, "Duda del tamaño de la muestra.");
  L(D_LI, "Woman: Had the contractors been more candid about the costs at the outset, the council might have reconsidered.", "What does the woman imply?", ["The contractors were honest", "The contractors concealed the costs", "The council rejected the bid"], 1, "Ocultaron los costes.");
  L(D_LI, "Presenter: The orchestra's move to a smaller venue was controversial, but its director maintains it was financially unavoidable.", "Why did the orchestra move?", ["For artistic reasons", "For financial reasons", "Because of a dispute"], 1, "Por motivos económicos.");
  L(D_LI, "Man: I'd be wary of his promises; he has a habit of saying what people want to hear.", "What is the man's opinion of him?", ["He is trustworthy", "He is untrustworthy", "He is shy"], 1, "No es de fiar.");
  L(D_LI, "Woman: The results were released late, which has fuelled speculation that something was being hidden.", "Why is there speculation?", ["The results were released late", "The results are very high", "The laboratory closed"], 0, "Por la demora.");
  L(D_LI, "Man: The evidence is circumstantial at best, so the jury may well return a verdict of not guilty.", "What does the man think about the evidence?", ["It is conclusive", "It is circumstantial", "It is missing"], 1, "Es indirecto.");
  L(D_LI, "Woman: I'd rather we postpone the launch than release a product that isn't ready.", "What does the woman prefer?", ["To launch now", "To postpone the launch", "To cancel the product"], 1, "Aplazar el lanzamiento.");
  L(D_LI, "Presenter: Campaigners argue that the new law will do little to protect tenants, since landlords can still evict them with minimal notice.", "What do campaigners say about the law?", ["It protects tenants fully", "It does little to protect tenants", "It has been repealed"], 1, "Protege poco.");
  LT(D_LI, "Man: The lecture was rescheduled three times, so I doubt more than a handful of students will attend the final session.", "The lecture was rescheduled ___ times.", ["three", "3"], "Número de cambios.");
  LT(D_LI, "Woman: We've sold just over four hundred copies of the book, far below the publisher's expectations.", "The book sold just over ___ copies.", ["four hundred", "400"], "Cifra de ventas.");
  LT(D_LI, "Presenter: The bridge, which took six years to build, will be closed for repairs next spring.", "The bridge took ___ years to build.", ["six", "6"], "Duración de la obra.");
  T(D_KW, "It's unlikely that the plan will succeed.", "Empieza con: The plan is", ["The plan is unlikely to succeed"], "«Unlikely to».");
  T(D_KW, "I doubt whether she will accept the invitation.", "Empieza con: She is", ["She is unlikely to accept the invitation"], "Sinónimo de «doubt».");
  T(D_KW, "Nobody had anticipated the scale of the problem.", "Empieza con: The scale", ["The scale of the problem had not been anticipated", "The scale of the problem was not anticipated"], "Pasiva en pasado perfecto.");
  T(D_KW, "Although he was exhausted, he continued working.", "Empieza con: Exhausted", ["Exhausted as he was, he continued working", "Exhausted though he was, he continued working"], "Inversión con adjetivo.");
  T(D_KW, "He was too proud to admit his mistake.", "Empieza con: So", ["He was so proud that he could not admit his mistake", "He was so proud that he couldn't admit his mistake"], "«So… that».");
  T(D_KW, "The company will probably increase its prices next year.", "Empieza con: The company is", ["The company is likely to increase its prices next year"], "«Likely to».");
  T(D_KW, "I'm not sure whether she knows the truth.", "Empieza con: I'm not certain", ["I'm not certain whether she knows the truth", "I am not certain whether she knows the truth"], "Sinónimo de «sure».");
  T(D_KW, "Had I realised earlier, I would have acted differently.", "Empieza con: If I", ["If I had realised earlier, I would have acted differently"], "Condicional 3 sin inversión.");
  T(D_KW, "The conference was cancelled because of the storm.", "Empieza con: Owing to", ["Owing to the storm, the conference was cancelled", "Because of the storm, the conference was cancelled"], "Conector de causa.");
  T(D_KW, "They rarely if ever complain about the food.", "Empieza con: Seldom", ["Seldom do they complain about the food"], "Inversión tras «seldom».");
  T(D_KW, "The report, which was lengthy, was ignored by the board.", "Empieza con: Despite", ["Despite its length, the report was ignored by the board", "Despite being lengthy, the report was ignored by the board"], "«Despite» + sustantivo o -ing.");

  EXTRA_ITEMS.push(...out);
})();

/* Escucha adicional: respuestas explícitas y respuestas que hay que deducir del contexto o formular con tus palabras. */
(function () {
  var out = [];
  function M(level, audio, q, o, a, inference, e, accent, rate) { out.push({ level: level, type: "listening", audio: audio, q: q, options: o, answer: a, inference: inference, accent: accent, rate: rate, explain: "Escucha: " + e, part: "Escucha con deducción (" + level + ")" }); }
  function TY(level, audio, q, acc, inference, e, accent, rate) { out.push({ level: level, type: "listening", audio: audio, q: q, accepted: acc, inference: inference, accent: accent, rate: rate, explain: "Escucha: " + e, part: "Escucha con deducción (" + level + ")" }); }

  /* A1 */
  M("A1", "Man: Can we go to the park? Woman: It's raining now, so let's wait until it stops.", "Why don't they go to the park yet?", ["Because it is raining", "Because the park is closed", "Because she is tired"], 0, true, "Ella dice que llueve, así que esperan.", "en-GB", 0.78);
  TY("A1", "Man: Sorry, I'm late again. The bus didn't come.", "Why is the man apologising? (escribe tu respuesta en inglés)", ["being late", "he is late", "for being late", "because he is late", "arriving late", "for arriving late"], true, "Se disculpa por llegar tarde; el autobús no vino.", "en-US", 0.78);
  M("A1", "Woman: The shop opens at nine tomorrow, not at eight.", "What time does the shop open tomorrow?", ["8:00", "9:00", "10:00"], 1, false, "Dice explícitamente «nine».", "en-AU", 0.8);
  TY("A1", "Woman: I'm hungry. Let's go to that Italian restaurant.", "Where do they want to go? (escribe en inglés)", ["the italian restaurant", "an italian restaurant", "to the italian restaurant", "to an italian restaurant", "italian restaurant"], false, "Mencionan el restaurante italiano.", "en-GB", 0.8);

  /* A2 */
  M("A2", "Man: I've got a lot of exams next week, and I haven't even started revising.", "How does the man probably feel?", ["Relaxed", "Worried", "Bored"], 1, true, "Tiene muchos exámenes y no ha empezado a repasar.", "en-GB", 0.86);
  TY("A2", "Woman: I'd like to change my flight. The one on Tuesday is too early for me.", "Why does she want to change her flight? (escribe tu respuesta)", ["the flight is too early", "it is too early", "because it is too early", "its too early for her", "the flight is too early for her", "because the flight is too early", "it's too early"], true, "El vuelo del martes le resulta demasiado temprano.", "en-IE", 0.86);
  M("A2", "Presenter: Tickets for the match cost ten pounds for adults and five pounds for children.", "How much do children pay?", ["Ten pounds", "Five pounds", "Free"], 1, false, "Dice «five pounds» para niños.", "en-US", 0.86);
  M("A2", "Woman: The restaurant was fully booked, so we ended up eating at the café next door.", "What happened to their original plan?", ["They ate at the café because the restaurant was full", "They cancelled dinner", "They ate at home"], 0, true, "No había mesa en el restaurante, así que comieron en el café.", "en-AU", 0.86);

  /* B1 */
  M("B1", "Man: I suppose the course is useful, but I can't see how it applies to my job.", "What is the man's attitude to the course?", ["Enthusiastic", "Doubtful", "Angry"], 1, true, "Admite utilidad pero no ve la aplicación: duda.", "en-GB", 0.95);
  TY("B1", "Woman: The project has run over budget, and two team members have left.", "What problems has the project had? (escribe tu respuesta en inglés)", ["it went over budget and people left", "it is over budget and two members left", "the budget was exceeded and two people left", "it has run over budget and two members left", "over budget and staff left", "it went over budget and lost two members", "it ran over budget and two people left"], false, "Sobrecoste y dos bajas en el equipo.", "en-IN", 0.95);
  M("B1", "Presenter: The museum will be closed on Monday for maintenance but will reopen on Tuesday at nine.", "When does the museum reopen?", ["Monday", "Tuesday at nine", "Tuesday at ten"], 1, false, "Reabre el martes a las nueve.", "en-US", 0.95);
  M("B1", "Woman: Honestly, I didn't expect him to turn up, after the way he behaved last time.", "What does the woman imply about him?", ["He always arrives early", "She was surprised he came", "He never comes"], 1, true, "Esperaba que no viniera por su comportamiento anterior.", "en-GB", 0.95);

  /* B2 */
  M("B2", "Man: The figures look impressive, but they only cover the first quarter, when sales are always strongest.", "What is the man implying?", ["The figures are misleading", "Sales are increasing", "The figures are wrong"], 0, true, "Las cifras solo cubren el trimestre más fuerte: engañan.", "en-AU", 1.0);
  TY("B2", "Woman: Had we started the campaign a month earlier, we might have reached a much wider audience.", "What does she regret? (escribe tu respuesta en inglés)", ["starting the campaign late", "not starting the campaign earlier", "they started too late", "the campaign started late", "they did not start a month earlier", "not starting earlier", "starting late"], true, "Lamenta haber empezado la campaña tarde.", "en-IE", 1.0);
  M("B2", "Presenter: The new bridge will open to cyclists next Monday and to cars a week later.", "When will cars be allowed on the bridge?", ["Next Monday", "A week after Monday", "Immediately"], 1, false, "Coches una semana después del lunes.", "en-GB", 1.0);
  M("B2", "Man: I'll believe it when I see the results; they've promised improvements before.", "What is the man's view?", ["He is convinced", "He is sceptical", "He is excited"], 1, true, "Exige pruebas porque ya prometieron cosas antes.", "en-IN", 1.0);

  /* C1 */
  M("C1", "Woman: The minister insists the reform is a success, but most of the people who were consulted seem to disagree.", "What does the woman suggest?", ["The reform is popular", "The minister's view is not shared by most consulted people", "The consultation was cancelled"], 1, true, "La mayoría consultada no comparte la opinión del ministro.", "en-GB", 1.06);
  TY("C1", "Man: The company promised to reduce waste, yet its latest report shows an increase in packaging.", "What is the contradiction? (escribe tu respuesta en inglés)", ["they promised less waste but packaging increased", "they promised to reduce waste but packaging went up", "waste increased although they promised to reduce it", "packaging rose despite the promise to cut waste", "they said they would reduce waste but packaging increased", "the report shows more packaging than they promised to reduce"], false, "Prometen reducir residuos y aumentan los envases.", "en-US", 1.06);
  M("C1", "Presenter: Applications close on the fifteenth of March, and interviews will take place in April.", "When do applications close?", ["15 March", "15 April", "In April"], 0, false, "Cierran el 15 de marzo.", "en-AU", 1.06);
  M("C1", "Woman: I wouldn't rely on his advice this time; he's been wrong about everything so far.", "What is the woman's opinion?", ["She trusts his advice", "She does not trust his advice", "She has not heard his advice"], 1, true, "Desconfía porque siempre se ha equivocado.", "en-IE", 1.06);

  /* C2 */
  M("C2", "Man: The committee's response was, shall we say, rather guarded, which tells you more than any statement would.", "What does the man imply?", ["The committee was openly supportive", "The committee's reply hides something", "The committee had no opinion"], 1, true, "La respuesta cauta sugiere que oculta algo.", "en-GB", 1.12);
  TY("C2", "Woman: He never admits fault, but this time he went as far as apologising publicly, which speaks volumes.", "What does the speaker find remarkable? (escribe tu respuesta en inglés)", ["he apologised publicly", "that he publicly apologised", "he admitted fault in public", "his public apology", "he publicly apologised for once", "he apologised in public", "the public apology"], true, "Que se disculpe públicamente, algo inusual en él.", "en-AU", 1.12);
  M("C2", "Presenter: The ruling takes effect from the first of July, although the appeal process may extend the deadline.", "From what date does the ruling take effect?", ["1 June", "1 July", "The appeal date"], 1, false, "Desde el 1 de julio.", "en-IN", 1.12);
  M("C2", "Woman: Her silence throughout the meeting was more damaging than any objection she could have raised.", "What is implied about her silence?", ["It helped her position", "It damaged her own position", "It was accidental"], 1, true, "Su silencio le perjudicó más que una objeción.", "en-GB", 1.12);

  EXTRA_ITEMS.push(...out);
})();

/* Lectura y escucha ampliadas para B2, C1 y C2: pasajes más largos, varias preguntas por texto. */
(function () {
  var out = [];
  function R(level, part, pass, q, o, a, e) { out.push({ level: level, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(level, part, audio, q, o, a, e) { out.push({ level: level, type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }

  /* ---------- B2 · lectura (FCE P5-P7) ---------- */
  var B_RD = "FCE · Reading P5 (opción múltiple)", B_LI = "FCE · Listening P1 (opción múltiple)";
  var p1 = "When the old warehouse on Harbour Street closed, most people expected it to be demolished. Instead, a group of neighbours asked the council for permission to turn the empty lot into a garden. Two years later, the site grows vegetables, hosts a weekly market and serves as a meeting place for families who had rarely spoken before. Not everyone was convinced at first. Some worried that the project would attract litter, while others doubted that volunteers would keep it going. Organisers admit that the early months were hard, but they say the regular visitors have become its best advocates.";
  R("B2", B_RD, p1, "What did most people expect to happen to the warehouse?", ["It would become a garden", "It would be knocked down", "It would be turned into flats"], 1, "«Demolished» = derribado.");
  R("B2", B_RD, p1, "What is the writer's point about the project's critics?", ["Their doubts have proved correct", "Their concerns were understandable but have not been borne out", "They supported the project from the start"], 1, "Las dudas iniciales no se confirmaron.");
  var p2 = "The director's latest film is not for those who want a tidy story. It moves between three timelines without warning, and it leaves several threads unresolved. Yet the performances are so controlled that it is hard to look away. The lead actor, in particular, communicates more through silence than most actors manage with pages of dialogue. Viewers who expect an explanation at the end will be disappointed; those who accept ambiguity may find the film lingers in their minds for days.";
  R("B2", B_RD, p2, "According to the review, what might disappoint some viewers?", ["The acting", "The lack of an explanation at the end", "The length of the film"], 1, "El final no explica nada.");
  R("B2", B_RD, p2, "What is the reviewer's overall view?", ["The film is flawed but memorable", "The film is a failure", "The film is too simple"], 0, "Reconoce defectos pero la valora como algo que perdura.");
  var p3 = "Dear all, following the trial of flexible working hours in the finance team, we have decided to extend the scheme to the rest of the company from March. Staff may choose start times between seven and ten in the morning, provided they complete a full working day. Managers will review arrangements after three months. Although the trial was successful overall, several people reported that meetings scheduled early in the morning were difficult to attend, so please avoid booking them before half past nine.";
  R("B2", B_RD, p3, "From when will the scheme apply to the whole company?", ["March", "January", "After three months"], 0, "Desde marzo.");
  R("B2", B_RD, p3, "Why does the writer ask people to avoid early meetings?", ["They are unpopular with managers", "Some staff found them hard to attend", "The trial was cancelled"], 1, "Eran difíciles de asistir.");
  var p4 = "Honeybees communicate the location of food through a dance that encodes both direction and distance. For decades this was accepted without question. Recent experiments, however, suggest that bees watching the dance may rely on scent and memory as much as on the dance itself. The researchers do not claim the dance is meaningless; rather, they argue that it is one part of a more complicated system of information sharing, one that scientists have only begun to map.";
  R("B2", B_RD, p4, "What do recent experiments suggest?", ["The dance is useless", "Bees also use scent and memory", "Bees cannot find food"], 1, "Olor y memoria también importan.");
  R("B2", B_RD, p4, "What is the researchers' position?", ["The dance has been fully explained", "The dance is one part of a complex system", "The dance was a mistake"], 1, "Es una pieza de un sistema más complejo.");
  var p5 = "I started the cello at forty, which my teacher said was either brave or foolish, depending on how long I intended to keep going. The first year was humbling. My fingers ached, and my bow sounded like a door in need of oil. What kept me going was not talent, which I clearly lacked, but a small weekly habit: I played the same eight bars every morning before work. Gradually, the bars became phrases, and then pieces. I am still not good, but I no longer dread the practice room.";
  R("B2", B_RD, p5, "Why did the writer keep practising?", ["Because she had natural talent", "Because of a daily habit", "Because her teacher demanded it"], 1, "Un hábito diario, no talento.");
  R("B2", B_RD, p5, "What does 'I no longer dread the practice room' suggest?", ["She has given up", "Her attitude has improved despite her limits", "She has become a professional"], 1, "Ha mejorado su actitud aunque siga sin ser buena.");
  var p6 = "Commuters faced long delays on Thursday as drivers on the city's underground network stopped work for twelve hours. The union says the strike was a last resort after talks over pay broke down. The transport company argues that its latest offer is generous and that industrial action will only push back planned improvements to the service. Passengers were advised to allow extra time and to consider cycling or walking where possible.";
  R("B2", B_RD, p6, "What caused the strike?", ["Talks over pay broke down", "A new timetable", "Damage to the trains"], 0, "Las negociaciones salariales fracasaron.");
  R("B2", B_RD, p6, "What is the company's view of the strike?", ["It will speed up improvements", "It will delay planned improvements", "It was caused by the company"], 1, "Retrasará las mejoras previstas.");

  /* ---------- B2 · escucha ---------- */
  L("B2", B_LI, "Presenter: Welcome to the programme. This week we're looking at the growing popularity of repair cafés. Volunteers gather once a month to fix everything from toasters to laptops, and organisers say the main aim is not saving money but changing how people think about possessions. Several participants admitted they had come along to learn a skill, and stayed because they enjoyed the company.", "What is the main aim of repair cafés, according to organisers?", ["To save money", "To change how people think about possessions", "To train professional repairers"], 1, "Cambiar la forma de pensar sobre las posesiones.");
  L("B2", B_LI, "Presenter: Welcome to the programme. This week we're looking at the growing popularity of repair cafés. Volunteers gather once a month to fix everything from toasters to laptops, and organisers say the main aim is not saving money but changing how people think about possessions. Several participants admitted they had come along to learn a skill, and stayed because they enjoyed the company.", "Why did several participants stay?", ["They enjoyed the company", "They needed their items fixed", "They were paid to attend"], 0, "Disfrutaban de la compañía.");
  L("B2", B_LI, "Woman: I'd always assumed the new train line would be a disaster for the village. The construction was noisy, the traffic diverted through our lanes for months, and the shop nearly closed. But now that it's running, I'm surprised how many people have moved here for the commute. Property prices have gone up, the school has more pupils, and the shop is busier than ever. I'm not sure I'd call it a disaster now.", "What was the woman's original view of the line?", ["It would be a disaster", "It would be excellent", "It would have no effect"], 0, "Pensaba que sería un desastre.");
  L("B2", B_LI, "Woman: I'd always assumed the new train line would be a disaster for the village. The construction was noisy, the traffic diverted through our lanes for months, and the shop nearly closed. But now that it's running, I'm surprised how many people have moved here for the commute. Property prices have gone up, the school has more pupils, and the shop is busier than ever. I'm not sure I'd call it a disaster now.", "How has her opinion changed?", ["She now thinks it was a mistake", "She is less certain it was a disaster", "She has moved away"], 1, "Ya no está segura de que fuera un desastre.");
  L("B2", B_LI, "Man: Our research suggests that people remember a speaker's last sentence far better than what came before it. We tested this with a series of short talks, and found that audiences rated presentations higher when they ended with a clear, concrete statement, even when the body of the talk was weaker. The lesson for presenters is obvious, though rarely followed: plan the ending as carefully as the opening.", "What did the researchers find about endings?", ["They are forgotten quickly", "Clear endings led to higher ratings", "Endings have no effect"], 1, "Los finales claros puntúan más.");
  L("B2", B_LI, "Man: Our research suggests that people remember a speaker's last sentence far better than what came before it. We tested this with a series of short talks, and found that audiences rated presentations higher when they ended with a clear, concrete statement, even when the body of the talk was weaker. The lesson for presenters is obvious, though rarely followed: plan the ending as carefully as the opening.", "What advice does the speaker give?", ["Ignore the ending", "Plan the ending as carefully as the opening", "Make talks longer"], 1, "Planificar el final tanto como el inicio.");
  L("B2", B_LI, "Woman: The museum has decided to rotate its paintings more often, which means some visitors will be disappointed to find their favourite works missing. The director argues that this protects the paintings from light damage and gives more of the collection a chance to be seen. Critics, however, think the decision is really about attendance: a changing display gives people a reason to come back.", "Why does the director want to rotate the paintings?", ["To protect them from light damage", "To reduce costs", "To attract new artists"], 0, "Proteger las obras de la luz.");
  L("B2", B_LI, "Woman: The museum has decided to rotate its paintings more often, which means some visitors will be disappointed to find their favourite works missing. The director argues that this protects the paintings from light damage and gives more of the collection a chance to be seen. Critics, however, think the decision is really about attendance: a changing display gives people a reason to come back.", "What do critics believe the real motive is?", ["To reduce costs", "To encourage repeat visits", "To sell paintings"], 1, "Atraer visitas repetidas.");

  /* ---------- C1 · lectura (CAE P5-P8) ---------- */
  var C_RD = "CAE · Reading P5 (opción múltiple)", C_LI = "CAE · Listening P1 (opción múltiple)";
  var c1 = "Cities that prioritise cars tend to produce a predictable pattern: wide roads, scattered shops and long commutes. Planners who question this model often find themselves at odds with residents who regard the car as a symbol of freedom. Yet where pedestrian zones have been introduced, many businesses have reported increased footfall, and residents have reported fewer injuries and cleaner air. The obstacle, it seems, is less technical than psychological: people tend to resist change until they have experienced it.";
  R("C1", C_RD, c1, "According to the passage, what has happened where pedestrian zones were introduced?", ["Shops have closed", "Business has increased and conditions have improved", "Traffic has become worse"], 1, "Más clientes y mejores condiciones.");
  R("C1", C_RD, c1, "What does the writer think is the main obstacle to change?", ["Cost", "Psychological resistance", "A lack of planners"], 1, "La resistencia psicológica.");
  var c2 = "The museum's decision to return a set of bronzes to their country of origin was presented as a gesture of goodwill. Critics, however, noticed that the agreement was signed only after years of public pressure and that the objects will be loaned back for exhibitions. Whether this amounts to restitution or to a clever form of reputation management is a question on which reasonable people disagree.";
  R("C1", C_RD, c2, "Why do critics doubt the museum's motives?", ["The agreement was signed quickly", "It came only after pressure, and the objects will be loaned back", "The bronzes were never valuable"], 1, "Firmado bajo presión y con préstamos de vuelta.");
  R("C1", C_RD, c2, "What is the writer's stance?", ["The museum acted in bad faith", "The question is genuinely contested", "The museum was entirely justified"], 1, "Presenta el debate sin cerrarlo.");
  var c3 = "A study of 3,000 workers found that those who reported high autonomy were not, as might be expected, the most satisfied. Satisfaction peaked among employees who had considerable autonomy but also clear feedback from supervisors. Freedom without guidance, the researchers suggest, can produce anxiety rather than contentment, a finding that complicates the popular case for removing management structures altogether.";
  R("C1", C_RD, c3, "Which group was the most satisfied?", ["Those with total autonomy", "Those with autonomy and clear feedback", "Those with close supervision only"], 1, "Autonomía con retroalimentación clara.");
  R("C1", C_RD, c3, "What do the findings imply about removing management?", ["It would clearly improve satisfaction", "It may not be as beneficial as often claimed", "It has no effect at all"], 1, "Eliminar la gestión puede no ayudar tanto.");
  var c4 = "Her novels are often praised for their lyrical prose, but this praise can obscure their structural daring. The fragmented chronology of her second book, which at first seems careless, is in fact carefully calibrated to mirror the protagonist's fractured memory. Readers who skim for plot may conclude that the book is loosely constructed; those who attend to its architecture discover a precision that few contemporaries achieve.";
  R("C1", C_RD, c4, "According to the critic, why might readers underestimate the novel?", ["It is poorly written", "They focus only on plot", "It is too short"], 1, "Se fijan solo en la trama.");
  R("C1", C_RD, c4, "What is the purpose of the fragmented chronology?", ["To confuse the reader for no reason", "To reflect the protagonist's memory", "To shorten the book"], 1, "Refleja la memoria fragmentada del personaje.");
  var c5 = "The government's plan to cut emissions relies heavily on private investment, a strategy that has worked elsewhere but only where the regulatory framework is stable. Investors, the report notes, tend to withdraw when policy shifts unpredictably, and the country's record over the past decade is hardly reassuring. The authors therefore recommend a binding timetable, even though this would limit the government's room for manoeuvre.";
  R("C1", C_RD, c5, "What do investors tend to do when policy is unpredictable?", ["Invest more", "Withdraw", "Demand lower taxes"], 1, "Se retiran.");
  R("C1", C_RD, c5, "What trade-off do the authors accept?", ["Lower emissions in exchange for higher taxes", "Less flexibility for the government in exchange for a clear timetable", "Private investment in exchange for public spending"], 1, "Menos margen a cambio de un calendario claro.");
  var c6 = "The modern tomato, now a staple of Mediterranean cooking, was for centuries regarded with suspicion in much of Europe. Its close relation to the deadly nightshade led many to assume it was poisonous, and wealthy households preferred it as a decorative plant. Only when hunger and demand grew in the eighteenth century did its culinary value become widely recognised, a shift that the author attributes less to taste than to necessity.";
  R("C1", C_RD, c6, "Why were tomatoes initially distrusted?", ["They were too expensive", "They were thought to be related to a poisonous plant", "They were illegal"], 1, "Se creía emparentado con una planta venenosa.");
  R("C1", C_RD, c6, "What, according to the author, made tomatoes popular?", ["Changing tastes alone", "Necessity, as hunger and demand grew", "A government campaign"], 1, "La necesidad, no el gusto.");

  /* ---------- C1 · escucha ---------- */
  L("C1", C_LI, "Presenter: Linguists have long debated whether children acquire grammar through exposure alone or whether some structure is innate. A new study of toddlers raised in bilingual households suggests that the answer may lie in between. The children showed sensitivity to grammatical patterns before they could produce them, which points to a learning process that is neither purely innate nor purely imitative.", "What did the study of toddlers show?", ["They produced grammar early", "They were sensitive to patterns before producing them", "They learned nothing from exposure"], 1, "Sensibilidad antes que producción.");
  L("C1", C_LI, "Presenter: Linguists have long debated whether children acquire grammar through exposure alone or whether some structure is innate. A new study of toddlers raised in bilingual households suggests that the answer may lie in between. The children showed sensitivity to grammatical patterns before they could produce them, which points to a learning process that is neither purely innate nor purely imitative.", "What conclusion does the presenter draw?", ["Grammar is entirely innate", "Learning is neither purely innate nor purely imitative", "Bilingual children learn more slowly"], 1, "Un punto intermedio.");
  L("C1", C_LI, "Man: I'd been dreading the redundancy meeting for weeks, so when they offered me a transfer instead, I felt a mixture of relief and suspicion. Relief, obviously, because I'd be keeping my income. Suspicion because the new role was in a department that everyone knew was about to be cut. I've decided to accept, but I'll be keeping my CV up to date just in case.", "What was the man's first reaction to the offer?", ["Relief and suspicion", "Anger", "Indifference"], 0, "Alivio y desconfianza.");
  L("C1", C_LI, "Man: I'd been dreading the redundancy meeting for weeks, so when they offered me a transfer instead, I felt a mixture of relief and suspicion. Relief, obviously, because I'd be keeping my income. Suspicion because the new role was in a department that everyone knew was about to be cut. I've decided to accept, but I'll be keeping my CV up to date just in case.", "What does the man imply about his decision?", ["He trusts the company completely", "He is accepting, but remains cautious", "He has already found another job"], 1, "Acepta pero con cautela.");
  L("C1", C_LI, "Woman: The city council claims that the new bike lanes have reduced accidents by a third. The figures are accurate, but they cover only the first six months, a period when cyclists were unusually cautious because the lanes were new and the publicity was intense. Whether the improvement will last is a question the council has not yet answered.", "What do the figures cover?", ["Twelve months", "The first six months", "Five years"], 1, "Solo seis meses.");
  L("C1", C_LI, "Woman: The city council claims that the new bike lanes have reduced accidents by a third. The figures are accurate, but they cover only the first six months, a period when cyclists were unusually cautious because the lanes were new and the publicity was intense. Whether the improvement will last is a question the council has not yet answered.", "What doubt does the speaker raise?", ["The lanes are unsafe", "The improvement may not last", "The figures are false"], 1, "Si la mejora durará.");
  L("C1", C_LI, "Man: The debate about the new vaccine has become rather heated, and I think both sides are partly right. The supporters are correct that the trial data are strong. The critics are correct that the trial was short. What's missing is a sensible conversation about what we can and can't know yet, and that conversation rarely happens in public.", "What do the critics argue?", ["The trial was short", "The data are strong", "The vaccine is cheap"], 0, "El ensayo fue corto.");
  L("C1", C_LI, "Man: The debate about the new vaccine has become rather heated, and I think both sides are partly right. The supporters are correct that the trial data are strong. The critics are correct that the trial was short. What's missing is a sensible conversation about what we can and can't know yet, and that conversation rarely happens in public.", "What does the speaker think is missing?", ["Funding", "A sensible discussion about what is still unknown", "More trials"], 1, "Una conversación sensata sobre lo que no se sabe.");

  /* ---------- C2 · lectura (CPE P5-P7) ---------- */
  var D_RD = "CPE · Reading and Use of English P5 (opción múltiple)";
  var D_LI = "CPE · Listening P1 (opción múltiple)";
  var d1 = "The claim that languages with fewer speakers are inherently simpler has circulated for decades, yet the evidence is thin. Analyses of grammars from small communities frequently reveal intricate systems of evidentiality and verb agreement that outstrip those of major world languages. Complexity, in other words, is not a function of population size. What varies is where a language's complexity is located, not whether it exists at all.";
  R("C2", D_RD, d1, "What does the writer say about the claim that small-population languages are simpler?", ["It is strongly supported by evidence", "The evidence for it is weak", "It has been proven"], 1, "La evidencia es escasa.");
  R("C2", D_RD, d1, "What is the central point of the passage?", ["Complexity depends on where it appears, not on speaker numbers", "Large languages are always more complex", "Small languages should be preserved"], 0, "La complejidad no depende del número de hablantes.");
  var d2 = "Strikes in the mining towns of the nineteenth century are often portrayed as spontaneous outbursts of anger. The archival record, however, reveals months of quiet organisation: collections for families of injured workers, secret meetings in chapels, and the careful recruitment of trusted foremen. What appears from outside as sudden rebellion was, for those involved, the culmination of patient and largely invisible preparation.";
  R("C2", D_RD, d2, "How are strikes often portrayed?", ["As planned for years", "As spontaneous outbursts", "As government plots"], 1, "Como estallidos espontáneos.");
  R("C2", D_RD, d2, "What do the archives reveal?", ["Strikes were unplanned", "Long, quiet preparation", "Workers had no organisation"], 1, "Preparación larga y discreta.");
  var d3 = "To translate a joke is to betray it, or so the saying goes, and the translator who attempts a literal rendering usually discovers why. The pun dissolves, the rhythm collapses, and what remains is a grammatically correct statement with no humour in it. The skilled translator therefore accepts a kind of controlled infidelity, replacing the original wit with a different wit that lands in the target language.";
  R("C2", D_RD, d3, "What usually happens when a joke is translated literally?", ["It becomes funnier", "The humour disappears", "It becomes longer"], 1, "Desaparece el humor.");
  R("C2", D_RD, d3, "What does the writer recommend?", ["Avoid translating humour", "Replace the original wit with new wit in the target language", "Translate every word exactly"], 1, "Sustituir el ingenio por otro que funcione en la lengua de llegada.");
  var d4 = "Heatwaves are no longer experienced evenly across cities. Neighbourhoods with dense concrete, few trees and older housing can run several degrees warmer than leafy districts only a few kilometres away. Public health officials have begun mapping these differences, and the results show that the hottest areas are often also those where residents have the least capacity to adapt, through air conditioning or time off work.";
  R("C2", D_RD, d4, "Which areas are hottest?", ["Leafy districts", "Neighbourhoods with dense concrete and few trees", "Areas near the coast"], 1, "Barrios de hormigón y pocos árboles.");
  R("C2", D_RD, d4, "Why are these residents particularly vulnerable?", ["They live far from hospitals", "They have less capacity to adapt", "They refuse to leave their homes"], 1, "Menos recursos para adaptarse.");
  var d5 = "My grandmother spoke three languages and mastered none of them completely; she moved between them the way other people change coats. As a child I found this embarrassing. Only later did I understand that her fluency was measured not in grammatical perfection but in the ability to be understood, which she possessed in every room she entered.";
  R("C2", D_RD, d5, "How did the writer feel about her grandmother's language use as a child?", ["Proud", "Embarrassed", "Indifferent"], 1, "Le avergonzaba de niña.");
  R("C2", D_RD, d5, "What does the writer come to realise about her grandmother's fluency?", ["It was perfect in grammar", "It lay in being understood", "It was limited to one language"], 1, "Estaba en hacerse entender.");
  var d6 = "Central banks often insist that their independence is essential to credibility, and the historical record broadly supports this view. Yet independence is not a licence to ignore public consequences. When a bank's policies fall unevenly on different regions or income groups, the legitimacy of the institution can erode even if its formal mandate remains intact, a risk that many policymakers prefer not to discuss.";
  R("C2", D_RD, d6, "What do central banks insist on?", ["Public consultation", "Independence as essential to credibility", "Lower interest rates"], 1, "La independencia como garantía de credibilidad.");
  R("C2", D_RD, d6, "What risk does the writer highlight?", ["Policies may be unpopular with banks", "Uneven effects can erode legitimacy even when the mandate is intact", "Independence will be removed"], 1, "La legitimidad puede erosionarse aunque el mandato siga intacto.");

  /* ---------- C2 · escucha ---------- */
  L("C2", D_LI, "Presenter: Historians of science often describe discoveries as moments of sudden insight. Yet the notebooks of several Nobel laureates reveal a different story: long periods of apparent failure, abandoned approaches, and a gradual narrowing of possibilities. The 'eureka' moment, it turns out, is usually the last step in a process that has been quietly underway for years.", "What do the notebooks reveal?", ["Sudden insight", "Long periods of apparent failure", "Careless work"], 1, "Largos periodos de aparente fracaso.");
  L("C2", D_LI, "Presenter: Historians of science often describe discoveries as moments of sudden insight. Yet the notebooks of several Nobel laureates reveal a different story: long periods of apparent failure, abandoned approaches, and a gradual narrowing of possibilities. The 'eureka' moment, it turns out, is usually the last step in a process that has been quietly underway for years.", "What does the presenter conclude about 'eureka' moments?", ["They happen by chance", "They are the end of a long process", "They never happen"], 1, "Son el último paso de un proceso largo.");
  L("C2", D_LI, "Woman: The minister's speech was, I thought, a masterclass in saying nothing with great conviction. He acknowledged the concerns, praised the consultation, and promised a review, all without committing to a single change. The journalists who had hoped for a clear announcement were left with little more than a memorable turn of phrase.", "What did the journalists hope for?", ["A review", "A clear announcement", "A resignation"], 1, "Un anuncio claro.");
  L("C2", D_LI, "Woman: The minister's speech was, I thought, a masterclass in saying nothing with great conviction. He acknowledged the concerns, praised the consultation, and promised a review, all without committing to a single change. The journalists who had hoped for a clear announcement were left with little more than a memorable turn of phrase.", "What is the woman's attitude to the speech?", ["Admiring", "Critical", "Neutral"], 1, "Lo critica con ironía.");
  L("C2", D_LI, "Man: The orchestra's new conductor has divided opinion. Traditionalists object that his interpretations of familiar works are too idiosyncratic, while younger audiences, who had never heard the pieces played that way, describe them as a revelation. The orchestra's ticket sales have risen markedly since his arrival, which the board is quick to attribute to him.", "Why do traditionalists object?", ["The conductor is too young", "His interpretations are too idiosyncratic", "The tickets are too expensive"], 1, "Interpretaciones demasiado personales.");
  L("C2", D_LI, "Man: The orchestra's new conductor has divided opinion. Traditionalists object that his interpretations of familiar works are too idiosyncratic, while younger audiences, who had never heard the pieces played that way, describe them as a revelation. The orchestra's ticket sales have risen markedly since his arrival, which the board is quick to attribute to him.", "What does the speaker suggest about the board's attribution?", ["It is clearly correct", "It may be self-serving", "It is unfounded"], 1, "Puede ser interesada.");
  L("C2", D_LI, "Woman: I never expected to enjoy the poetry course, but the tutor had a knack for showing us why a particular line worked. We spent an entire session on a single comma, and by the end I understood that punctuation was not decoration but a kind of instruction to the reader's breath.", "What surprised the woman about the course?", ["She enjoyed it", "It was too short", "It was expensive"], 0, "Le gustó.");
  L("C2", D_LI, "Woman: I never expected to enjoy the poetry course, but the tutor had a knack for showing us why a particular line worked. We spent an entire session on a single comma, and by the end I understood that punctuation was not decoration but a kind of instruction to the reader's breath.", "What did she learn from the session on a comma?", ["Punctuation is decoration", "Punctuation tells the reader how to breathe", "Commas should be avoided"], 1, "La puntuación marca el ritmo de la respiración.");

  EXTRA_ITEMS.push(...out);
})();

/* Más ejercicios originales para todos los niveles (gramática, reformulación, lectura y escucha). */
(function () {
  var out = [], LV = "";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }

  /* A1 */
  LV = "A1";
  var a1g = "A1 · Gramática y transformación", a1r = "A1 · Lectura", a1l = "A1 · Escucha";
  T(a1g, "She ___ a teacher.", "Escribe la palabra que falta.", ["is"], "Tercera persona del verbo «be».");
  G(a1g, "They ___ my friends.", ["are", "is", "am"], 0, "Plural con «be».");
  T(a1g, "We ___ football on Sundays.", "Escribe la palabra que falta.", ["play"], "Plural: sin -s.");
  G(a1g, "___ is your name?", ["What", "Where", "Who"], 0, "Pregunta por el nombre: «What».");
  T(a1g, "Every day my brother ___ to school.", "Escribe la palabra que falta.", ["goes"], "Tercera persona con -es.");
  T(a1g, "There ___ two books on the table.", "Escribe la palabra que falta.", ["are"], "Plural con «there are».");
  T(a1g, "This is not my bag.", "Empieza con: The bag", ["The bag is not mine", "The bag isn't mine"], "«Mine» = mío.");
  T(a1g, "He can swim very well.", "Empieza con: He is good", ["He is good at swimming"], "«Be good at» + -ing.");
  T(a1g, "We have a dog.", "Empieza con: We own", ["We own a dog"], "«Own» = tener en propiedad.");
  T(a1g, "The day is cold. (Empieza con «Today»)", "Today ...", ["today is a cold day"], "Sustantivo con adjetivo.");
  R(a1r, "Hello! My name is Lucy. I live in London with my mum, my dad and my cat. I like painting and I go to art class on Fridays.", "Who does Lucy live with?", ["Her mum, dad and cat", "Her friends", "Her grandmother"], 0, "Vive con mamá, papá y gato.");
  RT(a1r, "Hello! My name is Lucy. I live in London with my mum, my dad and my cat. I like painting and I go to art class on Fridays.", "When does Lucy go to art class?", ["On Fridays"], "Los viernes.");
  LT(a1l, "Woman: The bus leaves at half past eight.", "The bus leaves at ___ past eight.", ["half"], "Media hora.");
  LT(a1l, "Man: I'm seven years old and my sister is four.", "How old is the sister?", ["4", "four"], "Cuatro años.");

  /* A2 */
  LV = "A2";
  var a2g = "KET · Reading y Writing", a2l = "KET · Listening";
  G(a2g, "He ___ to the gym three times a week.", ["goes", "go", "going"], 0, "Tercera persona con -es.");
  G(a2g, "I'm looking forward ___ you soon.", ["to seeing", "to see", "seeing"], 0, "«Look forward to» + -ing.");
  T(a2g, "She was born ___ 1995.", "Escribe la palabra que falta.", ["in"], "Años con «in».");
  T(a2g, "How much ___ this jacket?", "Escribe la palabra que falta.", ["is"], "«How much is…?» para precios.");
  G(a2g, "We ___ at the moment; please call later.", ["are cooking", "cook", "cooked"], 0, "Presente continuo para algo en curso.");
  G(a2g, "If you ___ hungry, there is some bread.", ["are", "will be", "were"], 0, "Oración condicional sencilla.");
  T(a2g, "I don't have much time.", "Empieza con: I'm", ["I'm short of time", "I am short of time"], "«Be short of» = andar escaso de.");
  T(a2g, "The shop is closed on Sundays.", "Empieza con: The shop doesn't", ["The shop doesn't open on Sundays"], "Negación equivalente.");
  T(a2g, "He is younger than me.", "Empieza con: I am", ["I am older than him", "I am older than he is"], "Comparativo inverso.");
  T(a2g, "Can you tell me the time?", "Empieza con: Do you", ["Do you know what time it is"], "Pregunta más cortés.");
  R(a2g, "Sam's bus was late this morning, so he missed the first lesson. His teacher was not angry because she had also been stuck in traffic.", "Why did Sam miss the first lesson?", ["His bus was late", "He was ill", "He forgot the lesson"], 0, "El autobús llegó tarde.");
  R(a2g, "Sam's bus was late this morning, so he missed the first lesson. His teacher was not angry because she had also been stuck in traffic.", "How did the teacher feel?", ["Angry", "Not angry", "Sad"], 1, "No se enfadó.");
  LT(a2l, "Woman: The concert starts at eight, but the doors open at seven.", "The doors open at ___.", ["seven", "7"], "Hora de apertura.");
  LT(a2l, "Man: My flight leaves from gate twelve, not gate two.", "Which gate does the flight leave from?", ["twelve", "12", "gate twelve", "gate 12"], "Puerta correcta.");

  /* B1 */
  LV = "B1";
  var b1g = "PET · Use of English", b1t = "PET · Use of English P4 (transformaciones)", b1r = "PET · Reading P3 (texto largo, 4 opciones)", b1l = "PET · Listening P1 (3 opciones)";
  T(b1g, "I've been waiting here ___ two hours.", "Escribe la palabra que falta.", ["for"], "Duración con «for».");
  G(b1g, "The letter ___ yesterday by my neighbour.", ["was delivered", "delivered", "has delivered"], 0, "Pasiva en pasado simple.");
  G(b1g, "If I had more money, I ___ a new car.", ["would buy", "will buy", "bought"], 0, "Condicional 2.");
  G(b1g, "She asked me ___ I was happy.", ["that", "whether", "what"], 1, "Pregunta indirecta con «whether».");
  T(b1g, "He suggested ___ the film after dinner.", "Escribe la palabra que falta.", ["watching"], "«Suggest» + -ing.");
  G(b1g, "The more you practise, ___ you become.", ["the better", "better", "the best"], 0, "Estructura «the more… the better».");
  T(b1t, "It's a pity we didn't win the match.", "Empieza con: I wish", ["I wish we had won the match"], "Deseo sobre el pasado.");
  T(b1t, "Although she studied hard, she didn't pass.", "Empieza con: Despite", ["Despite studying hard, she didn't pass", "Despite her hard study, she didn't pass"], "«Despite» + -ing o sustantivo.");
  T(b1t, "Nobody could have predicted the result.", "Empieza con: The result", ["The result could not have been predicted", "The result couldn't have been predicted"], "Pasiva con modal perfecto.");
  T(b1t, "They started the project two years ago.", "Empieza con: They have", ["They have been working on the project for two years"], "Presente perfecto continuo.");
  R(b1r, "Last summer, Mark decided to learn to surf. At first he fell off the board every few minutes, and his friends laughed at him. However, he kept going to the beach every morning. By September he could stand up on the waves, and he now teaches his younger brother.", "What did Mark do every morning?", ["Went to the beach", "Taught his brother", "Laughed at his friends"], 0, "Iba a la playa cada mañana.");
  R(b1r, "Last summer, Mark decided to learn to surf. At first he fell off the board every few minutes, and his friends laughed at him. However, he kept going to the beach every morning. By September he could stand up on the waves, and he now teaches his younger brother.", "What is the result of his effort?", ["He can surf and teaches his brother", "He gave up surfing", "He moved to another town"], 0, "Ya surfea y enseña a su hermano.");
  L(b1l, "Woman: Sorry, the library is closed today for painting. It will open again on Monday.", "When will the library open again?", ["Today", "Monday", "Next week"], 1, "El lunes.");
  L(b1l, "Man: I'd rather take the train than drive, because I can read on the way.", "Why does the man prefer the train?", ["It is cheaper", "He can read", "It is faster"], 1, "Puede leer por el camino.");

  /* B2 */
  LV = "B2";
  var b2g = "FCE · Use of English P1 (cloze, 4 opciones)", b2t = "FCE · Use of English P4 (transformaciones)", b2r = "FCE · Reading P5 (opción múltiple)", b2l = "FCE · Listening P1 (opción múltiple)";
  G(b2g, "Not only ___ late, but he also forgot the tickets.", ["was he", "he was", "did he"], 0, "Inversión tras «not only».");
  G(b2g, "I'd have phoned you if I ___ your number.", ["had had", "have had", "would have"], 0, "Condicional 3 con «had had».");
  T(b2g, "The meeting, ___ was held on Monday, was very productive.", "Escribe la palabra que falta.", ["which"], "Relativo para cosas.");
  G(b2g, "She is considering ___ abroad to work.", ["moving", "to move", "move"], 0, "«Consider» + -ing.");
  G(b2g, "By next June, I ___ here for ten years.", ["will have worked", "will work", "have worked"], 0, "Futuro perfecto con duración.");
  T(b2g, "I'm used to ___ up early.", "Escribe la palabra que falta.", ["getting"], "«Be used to» + -ing.");
  T(b2t, "I'm sure he forgot to lock the door.", "Empieza con: He must", ["He must have forgotten to lock the door"], "Deducción sobre el pasado.");
  T(b2t, "Our team lost because the referee was unfair.", "Empieza con: Because of", ["Because of the unfair referee, the team lost"], "«Because of» + sustantivo.");
  T(b2t, "The exam was not as hard as I expected.", "Empieza con: The exam was easier", ["The exam was easier than I expected"], "Comparativo equivalente.");
  T(b2t, "She rarely misses a class.", "Empieza con: She hardly", ["She hardly ever misses a class"], "«Hardly ever» = casi nunca.");
  R(b2r, "Dear Ana, I'm writing to say thank you for the lovely weekend. The mountain walk was tougher than I expected, but the views were worth every step. I've already told my sister about the little café at the top, and she wants to go next month.", "What is the writer's main purpose?", ["To complain about a trip", "To thank Ana for a weekend", "To invite Ana to a café"], 1, "Dar las gracias.");
  R(b2r, "Dear Ana, I'm writing to say thank you for the lovely weekend. The mountain walk was tougher than I expected, but the views were worth every step. I've already told my sister about the little café at the top, and she wants to go next month.", "What will the writer's sister do?", ["Visit the café next month", "Cancel the walk", "Write to Ana"], 0, "Quiere ir al café el mes que viene.");
  LT(b2l, "Presenter: The workshop has been moved from room four to room nine because of the noise from the building works.", "The workshop is now in room ___.", ["nine", "9"], "Aula nueva.");
  LT(b2l, "Woman: I've decided I'm not going to renew my gym membership; I simply haven't been going.", "Why won't she renew her gym membership? (escribe tu respuesta)", ["she hasn't been going", "she has not been going", "she doesn't go", "she has not been going to the gym", "she does not go", "she isn't going"], "No va al gimnasio.");

  /* C1 */
  LV = "C1";
  var c1g = "CAE · Use of English P1 (cloze, 4 opciones)", c1t = "CAE · Use of English P4 (transformaciones)", c1r = "CAE · Reading P5 (opción múltiple)", c1l = "CAE · Listening P1 (opción múltiple)";
  G(c1g, "Hardly ___ the phone down when it rang again.", ["had she put", "she had put", "did she put"], 0, "«Hardly… when» con inversión.");
  T(c1g, "The plan, ___ ambitious it seemed, was approved.", "Escribe la palabra que falta.", ["however"], "«However + adjetivo».");
  G(c1g, "I'd rather you ___ tell anyone about this yet.", ["didn't", "don't", "wouldn't"], 0, "«I'd rather» + pasado simple.");
  T(c1g, "The jury ___ its verdict after three hours.", "Escribe la palabra que falta.", ["reached"], "Colocación: «reach a verdict».");
  G(c1g, "She ___ to the conference, but she was too busy.", ["was supposed to go", "should be going", "is to went"], 0, "«Be supposed to» = se suponía que.");
  G(c1g, "Had he ___ the warning, he would have stayed safe.", ["heeded", "heeding", "heeds"], 0, "Inversión condicional 3.");
  T(c1t, "I really didn't expect to win the prize.", "Empieza con: Little", ["Little did I expect to win the prize"], "Inversión con «little».");
  T(c1t, "He's very unlikely to change his mind.", "Empieza con: It is", ["It is highly unlikely that he will change his mind", "It's highly unlikely that he will change his mind"], "Sujeto anticipatorio «it».");
  T(c1t, "The bridge collapsed because of the flood.", "Empieza con: The flood", ["The flood caused the bridge to collapse", "The flood caused the collapse of the bridge"], "Causa con «cause».");
  T(c1t, "Very few people attended the lecture.", "Empieza con: Few", ["Few people attended the lecture"], "«Few» = pocos.");
  R(c1r, "Critics of the new transport scheme argue that its benefits have been overstated. While journey times have fallen on the main routes, fares have risen sharply and several minor routes have been cut entirely, leaving some villages more isolated than before.", "What is the critics' main argument?", ["The scheme has been oversold", "The scheme is too cheap", "The routes have been extended"], 0, "Sus beneficios se han exagerado.");
  R(c1r, "Critics of the new transport scheme argue that its benefits have been overstated. While journey times have fallen on the main routes, fares have risen sharply and several minor routes have been cut entirely, leaving some villages more isolated than before.", "According to the passage, what has happened to some villages?", ["They have become more isolated", "They have gained new routes", "They have been connected to the main line"], 0, "Están más aislados.");
  L(c1l, "Man: Honestly, I was expecting the exhibition to be a waste of time, but the interactive displays were unexpectedly good.", "How did the man find the exhibition?", ["Better than he expected", "Worse than he expected", "Exactly as he expected"], 0, "Mejor de lo esperado.");
  L(c1l, "Woman: The council says the new park will open in spring, although the contractors have warned that delays are likely.", "What do the contractors warn?", ["The park will open early", "There may be delays", "The park is cancelled"], 1, "Posibles retrasos.");

  /* C2 */
  LV = "C2";
  var c2g = "CPE · Reading and Use of English P1 (cloze, 4 opciones)", c2t = "CPE · Reading and Use of English P4 (transformaciones)", c2r = "CPE · Reading and Use of English P5 (opción múltiple)", c2l = "CPE · Listening P1 (opción múltiple)";
  T(c2g, "Such ___ the scale of the disaster that aid arrived late.", "Escribe la palabra que falta.", ["was"], "«Such was…» con inversión.");
  T(c2g, "Were it not ___ your help, we would have failed badly.", "Escribe la palabra que falta.", ["for"], "«Were it not for».");
  G(c2g, "I can't help ___ at his arrogance.", ["wondering", "to wonder", "wonder"], 0, "«Can't help» + -ing.");
  T(c2g, "The painting, ___ by a local artist, is now worth a fortune.", "Escribe la palabra que falta.", ["painted"], "Participio con valor pasivo.");
  T(c2g, "Not ___ she was tired did she complain.", "Escribe la palabra que falta.", ["once"], "«Not once» con inversión.");
  G(c2g, "He is ___ to be the next director.", ["bound", "tied", "keen"], 0, "«Bound to» = seguro que.");
  T(c2t, "There's no way she was involved.", "Empieza con: She could", ["She could not have been involved", "She could not possibly have been involved"], "Deducción negativa.");
  T(c2t, "The committee chose not to reveal the findings.", "Empieza con: The findings", ["The findings were not revealed by the committee", "The findings were withheld by the committee"], "Pasiva con «withhold».");
  T(c2t, "He failed to notice the mistake until it was too late.", "Empieza con: It was not", ["It was not until it was too late that he noticed the mistake", "It was only when it was too late that he noticed the mistake"], "Enfatización con «it was not until».");
  T(c2t, "The sudden storm forced us to cancel the trip.", "Empieza con: The sudden storm", ["The sudden storm made us cancel the trip"], "Sinónimo de «force».");
  R(c2r, "The novel's narrator is consistently unreliable, yet the author never signals this openly. Readers must piece together the truth from contradictions, omissions and small inconsistencies, a process that many find rewarding and some find exasperating.", "What is said about the narrator?", ["Reliable and honest", "Consistently unreliable without obvious signals", "Absent from the story"], 1, "Poco fiable y sin señales claras.");
  R(c2r, "The novel's narrator is consistently unreliable, yet the author never signals this openly. Readers must piece together the truth from contradictions, omissions and small inconsistencies, a process that many find rewarding and some find exasperating.", "How do some readers react?", ["They find it rewarding and some exasperating", "They find it dull", "They stop reading immediately"], 0, "Algunos lo disfrutan y otros se exasperan.");
  L(c2l, "Presenter: The company's chief executive has announced a policy change, though the detail has been deliberately left vague until the board meets.", "Why is the policy's detail unclear?", ["The board has not yet met", "The policy was cancelled", "The chief executive forgot it"], 0, "Se detallará cuando se reúna la junta.");
  L(c2l, "Woman: I'd hardly call the result a victory, since the margin was so narrow and most voters stayed at home.", "What does the woman think about the result?", ["It was a clear victory", "It was not a real victory", "It was a draw"], 1, "No la considera una victoria real.");

  EXTRA_ITEMS.push(...out);
})();

