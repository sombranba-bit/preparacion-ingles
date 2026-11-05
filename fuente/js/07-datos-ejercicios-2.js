import { EXTRA_ITEMS } from "./00-datos-ejercicios-b1.js";

/* Ejercicios adicionales originales para A1 (gramática, lectura, escucha y reformulación sencilla). */
(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }
  var GR = "A1 · Gramática", RD = "A1 · Lectura", LS = "A1 · Escucha", RF = "A1 · Reformulación";

  /* ---------- Gramática ---------- */
  T(GR, "My sister ___ a doctor.", "Escribe la palabra que falta.", ["is"], "Con «my sister» (singular) va «is».");
  G(GR, "They ___ students at this school.", ["are", "is", "am"], 0, "Con «they» se usa «are».");
  T(GR, "I ___ got two brothers.", "Escribe la palabra que falta.", ["have"], "Con «I» se usa «have got».");
  T(GR, "She ___ got a blue bag.", "Escribe la palabra que falta.", ["has"], "Con «she» (tercera persona) va «has got».");
  G(GR, "___ you like coffee?", ["Do", "Does", "Are"], 0, "Preguntas en presente simple con «you»: «Do».");
  T(GR, "He ___ football on Saturdays.", "Escribe la palabra que falta.", ["plays"], "Tercera persona singular en presente simple: «plays».");
  T(GR, "We don't ___ to school on Sunday.", "Escribe la palabra que falta.", ["go"], "Después de «don't» va la forma base.");
  G(GR, "There ___ a bank near my house.", ["is", "are", "have"], 0, "«There is» con singular.");
  T(GR, "There ___ a clock on the wall.", "Escribe la palabra que falta.", ["is"], "«There is» con singular.");
  G(GR, "I can ___ English a little.", ["speak", "speaks", "to speak"], 0, "Tras un modal («can») va la forma base sin «to».");
  T(GR, "This is ___ apple. It is red.", "Escribe la palabra que falta.", ["an"], "Delante de vocal se usa «an».");
  T(GR, "Her ___ name is Laura.", "Escribe la palabra que falta.", ["first"], "Adjetivo delante del sustantivo.");
  G(GR, "The shop is ___ the bank and the park.", ["between", "among", "under"], 0, "«Between» se usa con dos referencias.");
  T(GR, "We are at home ___ the evening.", "Escribe la palabra que falta.", ["in"], "Los momentos del día llevan «in» (in the morning/evening).");
  T(GR, "My birthday is ___ June.", "Escribe la palabra que falta.", ["in"], "Los meses llevan «in».");
  G(GR, "The train leaves ___ eight o'clock.", ["at", "in", "on"], 0, "Las horas en punto llevan «at».");
  T(GR, "I ___ tea every morning.", "Escribe la palabra que falta.", ["drink"], "Presente simple con «I»: forma base.");
  G(GR, "Look! It ___ now.", ["is raining", "rains", "rain"], 0, "Presente continuo para lo que pasa ahora.");
  G(GR, "What ___ you doing right now?", ["are", "do", "is"], 0, "Presente continuo con «you»: «are».");
  T(GR, "___ is your favourite colour?", "Escribe la palabra que falta.", ["What"], "«What» pregunta por cosas y colores.");
  T(GR, "___ is that man? He is my uncle.", "Escribe la palabra que falta.", ["Who"], "«Who» pregunta por personas.");
  G(GR, "The cat is ___ the table.", ["under", "under of", "underneath to"], 0, "«Under» = debajo de; sin preposición extra.");
  G(GR, "I want ___ a sandwich.", ["to eat", "eat", "eating"], 0, "«Want» + infinitivo con «to».");
  T(GR, "Let's ___ to the cinema tonight.", "Escribe la palabra que falta.", ["go"], "«Let's» + forma base.");
  T(GR, "He ___ like fish.", "Escribe la palabra que falta.", ["doesn't"], "Negación de tercera persona: «doesn't».");
  G(GR, "Our house has ___ big garden.", ["a", "an", "the"], 0, "Consonante sonora delante: «a».");
  G(GR, "___ lunch at 1 p.m. every day.", ["I have", "I has", "I having"], 0, "Presente simple con «I have».");
  T(GR, "Mary ___ two cats and a dog.", "Escribe la palabra que falta.", ["has"], "Tercera persona: «has» para posesión.");
  G(GR, "These shoes are ___ than those.", ["cheaper", "more cheap", "cheapest"], 0, "Comparativo de adjetivo corto.");
  T(GR, "How much ___ this bag?", "Escribe la palabra que falta.", ["is"], "Precio con singular: «is».");

  /* ---------- Lectura ---------- */
  R(RD, "Hi! My name is Tom. I live in a small flat in London with my dog, Max. Every morning I walk Max in the park.",
    "Where does Tom live?", ["In a small flat in London", "In a house in the park", "With his brother"], 0, "«I live in a small flat in London».");
  R(RD, "Anna works in a café. She starts at seven o'clock and finishes at three. She likes her job because the customers are friendly.",
    "What time does Anna finish work?", ["At seven", "At three", "At eleven"], 1, "«She finishes at three».");
  R(RD, "Welcome to our supermarket! Bread is on the first floor and fruit is next to the door. Milk and cheese are in the fridge at the back.",
    "Where is the milk?", ["Next to the door", "On the first floor", "In the fridge at the back"], 2, "«Milk ... are in the fridge at the back».");
  R(RD, "Ben likes sport. On Monday he plays tennis, on Wednesday he swims and on Friday he goes running.",
    "What does Ben do on Wednesday?", ["He plays tennis", "He swims", "He goes running"], 1, "«on Wednesday he swims».");
  R(RD, "Dear Sara, thank you for the party on Saturday. It was great fun. See you next week!",
    "What is the writer thankful for?", ["The party on Saturday", "A present", "A lift home"], 0, "Agradece la fiesta: la autora fue invitada.");
  R(RD, "My favourite food is pizza. I eat it with my family on Friday nights. My dad makes the best one.",
    "Who makes the best pizza?", ["The writer", "The writer's mum", "The writer's dad"], 2, "«My dad makes the best one».");
  R(RD, "Our school trip is on Tuesday. Bring a bag, a hat and some water. The bus leaves at half past eight.",
    "What time does the bus leave?", ["At eight", "At half past eight", "At nine"], 1, "«half past eight».");
  R(RD, "Emma is ten. She has a brother called Leo who is seven. They both love drawing.",
    "How old is Leo?", ["Seven", "Ten", "Eight"], 0, "«Leo ... is seven».");
  R(RD, "Sign: Library open Monday to Friday 9 a.m. to 6 p.m. Closed on weekends.",
    "When is the library closed?", ["On Monday", "At the weekend", "At 9 a.m."], 1, "Está cerrada los fines de semana.");
  R(RD, "Tim: Is there a post office near here? Lucy: Yes, it's opposite the bakery, next to the bank.",
    "Where is the post office?", ["Next to the bakery", "Opposite the bakery", "Inside the bank"], 1, "«it's opposite the bakery».");
  R(RD, "I usually get up at seven. I have a shower, eat toast and then walk to work. It takes ten minutes.",
    "How long does the walk take?", ["Ten minutes", "Seven minutes", "One hour"], 0, "«It takes ten minutes».");
  R(RD, "The weather today is cold and windy, but tomorrow it will be sunny and warm. Take a jacket today.",
    "What should you take today?", ["A jacket", "Sunglasses", "An umbrella"], 0, "«Take a jacket today».");
  R(RD, "Juan has a new phone. It is black and very light. He bought it on the internet last week.",
    "What colour is Juan's phone?", ["White", "Black", "Blue"], 1, "«It is black».");
  R(RD, "Our flat has two bedrooms, a small kitchen and a big living room. There is a balcony with plants.",
    "What does the flat have a balcony with?", ["Plants", "A pool", "A garage"], 0, "«a balcony with plants».");
  R(RD, "Carla is from Mexico but now she lives in Madrid. She speaks Spanish and English.",
    "Where does Carla live now?", ["In Mexico", "In Madrid", "In London"], 1, "«now she lives in Madrid».");
  R(RD, "Dear Mum, I am at the hotel. The room is nice and the sea is very close. Love, Paul.",
    "Where is Paul?", ["At home", "At a hotel", "At the beach shop"], 1, "«I am at the hotel».");
  R(RD, "Menu: Soup 3 euros. Salad 4 euros. Fish 9 euros. Ice cream 2 euros.",
    "How much is the salad?", ["3 euros", "4 euros", "9 euros"], 1, "«Salad 4 euros».");
  R(RD, "Mia does not like cold weather. In winter she wears a warm coat and a scarf.",
    "What does Mia wear in winter?", ["Shorts", "A warm coat", "Sandals"], 1, "«a warm coat and a scarf».");

  /* ---------- Escucha (opción múltiple) ---------- */
  L(LS, "Man: Excuse me, what time is it? Woman: It's half past ten.",
    "What time did the woman tell the man?", ["10:30", "10:00", "11:30"], 0, "«half past ten» = 10:30.");
  L(LS, "Woman: Do you want tea or coffee? Man: Tea, please, with milk.",
    "What does the man want?", ["Coffee", "Tea with milk", "Water"], 1, "«Tea, please, with milk».");
  L(LS, "Girl: My birthday is on the twelfth of May. Boy: Really? Mine is in March.",
    "When is the girl's birthday?", ["In March", "On the twelfth of May", "In May"], 1, "Dice «the twelfth of May».");
  L(LS, "Teacher: Open your books at page twenty. Students: OK.",
    "Which page should they open?", ["Page 12", "Page 20", "Page 2"], 1, "«page twenty».");
  L(LS, "Man: How many people are coming to the party? Woman: About fifteen.",
    "How many people are coming?", ["Fifty", "Fifteen", "Five"], 1, "«About fifteen».");
  L(LS, "Woman: The bus stop is next to the school, not the shop.",
    "Where is the bus stop?", ["Next to the school", "Next to the shop", "Next to the hospital"], 0, "«next to the school».");
  L(LS, "Boy: Mum, can I go to Sam's house? Mum: Yes, but be back by six.",
    "What time must the boy be back?", ["Five", "Six", "Seven"], 1, "«back by six».");
  L(LS, "Man: I'm hungry. Woman: Me too. Let's have pasta for lunch.",
    "What do they want for lunch?", ["Pizza", "Salad", "Pasta"], 2, "«have pasta for lunch».");
  L(LS, "Woman: Hello, I'd like a ticket to Leeds, please. Man: Single or return? Woman: Return, please.",
    "What kind of ticket does she buy?", ["Single", "Return", "Student"], 1, "«Return, please».");
  L(LS, "Girl: Look at my new dog! Boy: Wow, he is so big and black!",
    "What colour is the dog?", ["Brown", "White", "Black"], 2, "«so big and black».");
  L(LS, "Man: Is the swimming pool open today? Woman: No, it's closed on Mondays.",
    "Is the swimming pool open today?", ["Yes", "No", "Only in the morning"], 1, "«No, it's closed on Mondays».");
  L(LS, "Woman: I've got a headache. I'm going to bed early tonight.",
    "What is wrong with the woman?", ["She has a headache", "She is cold", "She is hungry"], 0, "«I've got a headache».");
  L(LS, "Boy: Where's my football? Girl: It's under the bed, behind your shoes.",
    "Where is the football?", ["Under the bed", "On the table", "In the car"], 0, "«under the bed».");
  L(LS, "Man: What's the weather like? Woman: It's raining and quite cold.",
    "What weather does the woman describe?", ["Sunny", "Raining and cold", "Hot and windy"], 1, "«raining and quite cold».");
  L(LS, "Woman: Do you play any musical instruments? Man: Yes, I play the guitar.",
    "What instrument does the man play?", ["Piano", "Guitar", "Drums"], 1, "«I play the guitar».");
  L(LS, "Girl: What's your phone number? Boy: It's zero, six, five, two, four, one.",
    "What is the first number?", ["Six", "Zero", "Five"], 1, "Empieza por «zero».");
  L(LS, "Teacher: Today we are going to the museum. Please meet at the main gate at nine.",
    "Where are they going?", ["To the museum", "To the park", "To the gate"], 0, "«going to the museum».");
  L(LS, "Man: My shop is open every day except Sunday. Woman: Thanks, I'll come on Saturday.",
    "When will the woman visit the shop?", ["On Sunday", "On Saturday", "Every day"], 1, "«I'll come on Saturday».");
  L(LS, "Boy: Can you help me with my homework? Girl: Sure, after lunch.",
    "When will the girl help him?", ["Before lunch", "After lunch", "Tomorrow"], 1, "«after lunch».");
  L(LS, "Woman: Your room is very tidy today! Man: Thanks, I cleaned it this morning.",
    "When did the man clean his room?", ["Last night", "This morning", "Yesterday"], 1, "«this morning».");
  L(LS, "Girl: We have a new teacher. He is tall and he has got a big beard.",
    "What does the new teacher look like?", ["Short with glasses", "Tall with a big beard", "Young with long hair"], 1, "«tall ... big beard».");

  /* ---------- Escucha (respuesta escrita) ---------- */
  LT(LS, "Woman: What do you do on Sundays? Man: I usually visit my grandmother.",
    "Who does the man visit on Sundays? (escribe la respuesta en inglés)", ["his grandmother", "grandmother", "my grandmother", "the grandmother"],
    "Dice «my grandmother».");
  LT(LS, "Boy: Where do you study? Girl: At the university in Bristol.",
    "Which city does she study in? (escribe la respuesta)", ["bristol", "in bristol", "the city of bristol"],
    "«in Bristol».");
  LT(LS, "Man: How much is the bus ticket? Woman: It's two pounds fifty.",
    "How much is the ticket? (escribe el precio en inglés)", ["two pounds fifty", "2 pounds 50", "two pounds and fifty pence", "2.50 pounds"],
    "«two pounds fifty».");
  LT(LS, "Woman: What's your favourite animal? Boy: Dolphins. They are very clever.",
    "What is the boy's favourite animal? (escribe en inglés)", ["dolphins", "dolphin", "the dolphins"],
    "«Dolphins».");
  LT(LS, "Girl: How do you get to school? Boy: I walk, it takes me about ten minutes.",
    "How does the boy get to school? (escribe la respuesta)", ["walk", "by walking", "on foot", "he walks", "i walk"],
    "«I walk».");
  LT(LS, "Man: Which room is the toilet in? Woman: It's down the corridor, on the left.",
    "Where is the toilet? (escribe la respuesta)", ["down the corridor", "on the left", "down the corridor on the left", "in the corridor on the left"],
    "«down the corridor, on the left».");
  LT(LS, "Teacher: What day is the test? Student: On Thursday, I think.",
    "What day is the test? (escribe en inglés)", ["thursday", "on thursday"],
    "«On Thursday».");
  LT(LS, "Woman: Can I have a glass of water, please? Waiter: Of course, madam.",
    "What does the woman ask for? (escribe la respuesta)", ["a glass of water", "water", "glass of water"],
    "«a glass of water».");

  /* ---------- Reformulación (escrita) ---------- */
  T(RF, "I am not a student. (Pasa a la forma afirmativa de «be» con «I»)", "Empieza por «I»", ["i am a student", "i'm a student"], "Afirmativa: «I am a student».");
  T(RF, "She likes music. (Pasa a negativa)", "Usa «doesn't»", ["she doesn't like music", "she does not like music"], "Negativa: «doesn't» + base «like».");
  T(RF, "They play football on Sundays. (Pregunta con «Do»)", "Empieza por «Do»", ["do they play football on sundays", "do they play football on sunday"], "Pregunta: «Do they play...?».");
  T(RF, "We have a new car. (Usa «got»)", "We have got...", ["we've got a new car", "we have got a new car"], "«have got» es equivalente a «have» en A1.");
  T(RF, "My brother is tall. (Pasa a plural con «My brothers»)", "Usa «are»", ["my brothers are tall"], "Plural: «are».");
  T(RF, "It is cold today. (Pasa a pasado)", "Usa «was»", ["it was cold today", "it was cold yesterday"], "Pasado de «is»: «was».");
  T(RF, "I go to school by bus. (Pasa a pasado)", "Usa «went»", ["i went to school by bus", "i went to school on the bus", "i went to school by bus yesterday"], "Pasado de «go»: «went».");
  T(RF, "There is a pen on the desk. (Pasa a plural)", "There are...", ["there are pens on the desk", "there are two pens on the desk"], "Plural: «There are» + «pens».");
  T(RF, "He can swim. (Pasa a negativa)", "Usa «cannot» o «can't»", ["he can't swim", "he cannot swim"], "Negativa del modal: «can't».");
  T(RF, "This is my house. (Usa «mine» en lugar de «my house»)", "This house is ...", ["this house is mine", "this is mine"], "Pronombre posesivo: «mine».");
  T(RF, "She is eating an apple. (Pasa a pregunta)", "Empieza por «Is»", ["is she eating an apple"], "Pregunta en presente continuo: «Is she eating...?».");
  T(RF, "We live in Manchester. (Pasa a pasado)", "Usa «lived»", ["we lived in manchester"], "Pasado regular: «lived».");
  T(RF, "I like dogs and cats. (Usa «both»)", "I like both...", ["i like both dogs and cats", "i like both of them"], "«both ... and» o «both of them».");
  T(RF, "The shop opens at nine. (Pregunta con «When»)", "When does ...?", ["when does the shop open", "when does the shop open?"], "Pregunta: «When does the shop open?».");
  T(RF, "He is taller than me. (Usa «shorter» con «I»)", "I am ... than him", ["i am shorter than him"], "Comparativo opuesto: «shorter».");
  T(RF, "We went to the beach yesterday. (Pasa a negativa)", "Usa «didn't»", ["we didn't go to the beach yesterday", "we did not go to the beach yesterday"], "Negativa en pasado: «didn't go».");
  T(RF, "Her name is Anna. (Pregunta: «What ...?»)", "What is ...?", ["what is her name", "what's her name"], "Pregunta por el nombre: «What is her name?».");
  T(RF, "She is my friend. (Pasa a plural)", "They are my ...", ["they are my friends"], "Plural: «they are my friends».");
  T(RF, "I usually have breakfast at eight. (Usa «sometimes»)", "Sometimes ...", ["i sometimes have breakfast at eight"], "Adverbio de frecuencia: «sometimes» antes del verbo.");
  T(RF, "The book is on the table. (Usa «under» en lugar de «on»)", "Under ...", ["the book is under the table"], "«Under» = debajo.");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios adicionales originales para A2 con la estructura de tareas de KET (Reading y Writing, Listening y transformaciones). */
(function () {
  var out = [], LV = "A2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }
  var RW = "KET · Reading y Writing", LS = "KET · Listening", TR = "KET · Transformaciones";

  /* ---------- Reading y Writing: gramática en contexto ---------- */
  T(RW, "I haven't seen him ___ last summer.", "Escribe la palabra que falta.", ["since"], "«since» + punto de inicio (last summer).");
  G(RW, "She has lived here ___ five years.", ["for", "since", "during"], 0, "«for» + periodo de tiempo.");
  G(RW, "We ___ to the cinema when the phone rang.", ["were going", "went", "go"], 0, "Pasado continuo interrumpido por un pasado simple.");
  T(RW, "You must ___ your homework before you go out.", "Escribe la palabra que falta.", ["finish"], "Tras un modal («must») va la forma base.");
  T(RW, "I'd rather ___ at home tonight.", "Escribe la palabra que falta.", ["stay"], "«would rather» + forma base.");
  G(RW, "The film was ___ than I expected.", ["better", "gooder", "more good"], 0, "Comparativo irregular de «good»: «better».");
  G(RW, "He asked me ___ the way to the station.", ["where was", "where is", "where he was"], 0, "Estilo indirecto: se usa orden afirmativo en la pregunta indirecta.");
  T(RW, "If I ___ rich, I would travel the world.", "Escribe la palabra que falta.", ["were"], "Condicional 2: «were» con todos los sujetos (formal).");
  G(RW, "The letter ___ yesterday by my manager.", ["was signed", "signed", "was sign"], 0, "Pasiva en pasado: «was» + participio.");
  G(RW, "I wish I ___ more time.", ["had", "have", "would have"], 0, "«I wish» + pasado para lo que no es real.");
  T(RW, "Despite ___ tired, she went for a run.", "Escribe la palabra que falta.", ["being"], "«Despite» + -ing.");
  T(RW, "You ___ wear a seatbelt in the car. It's the law.", "Escribe la palabra que falta.", ["must"], "«Must» para obligación.");
  G(RW, "Ann is ___ student in my class.", ["a", "an", "the"], 0, "«a» delante de consonante.");
  T(RW, "The shop ___ at 9 a.m. every day.", "Escribe la palabra que falta.", ["opens"], "Presente simple tercera persona: «opens».");
  T(RW, "Neither Tom ___ his sister came to the party.", "Escribe la palabra que falta.", ["nor"], "«Neither ... nor».");
  G(RW, "I'm looking forward to ___ you again.", ["seeing", "see", "to see"], 0, "«look forward to» + -ing.");
  G(RW, "She ___ her keys. She can't get in the house.", ["has lost", "lost", "is losing"], 0, "Present perfect: resultado presente.");
  G(RW, "Could you tell me ___ ?", ["where the bank is", "where is the bank", "where the bank was"], 0, "Pregunta indirecta: orden afirmativo.");
  T(RW, "We'd better ___ now or we'll miss the bus.", "Escribe la palabra que falta.", ["leave"], "«had better» + forma base.");
  G(RW, "There isn't ___ milk in the fridge.", ["any", "some", "a"], 0, "Negativa con incontable: «any».");
  T(RW, "My sister is ___ than me at maths.", "Escribe la palabra que falta.", ["better"], "Comparativo de «good»: «better».");
  T(RW, "The children were so ___ that they went to bed early.", "Escribe la palabra que falta.", ["tired"], "Adjetivo en -ed para personas.");
  G(RW, "The meeting has been ___ until next week.", ["postponed", "postpone", "postponing"], 0, "Pasiva de present perfect: participio.");
  T(RW, "I ___ my friend at the station yesterday.", "Escribe la palabra que falta.", ["met"], "Pasado simple con marca de tiempo («yesterday»).");
  T(RW, "Please ___ the door when you leave.", "Escribe la palabra que falta.", ["close"], "Imperativo: forma base.");
  G(RW, "He's ___ famous singer in Spain.", ["a", "an", "the"], 0, "«a» delante de consonante: «a famous».");
  T(RW, "I'm not used to ___ up early.", "Escribe la palabra que falta.", ["getting"], "«be used to» + -ing.");
  G(RW, "The bus was late, ___ we missed the start of the film.", ["so", "because", "although"], 0, "«so» indica consecuencia.");
  G(RW, "She speaks English ___ than her brother.", ["more fluently", "fluenter", "more fluent"], 0, "Adverbio largo: «more fluently».");
  T(RW, "Who ___ the window? It's broken.", "Escribe la palabra que falta.", ["broke"], "Pasado simple irregular: «broke».");
  T(RW, "The hotel was ___ than we thought, so we stayed longer.", "Escribe la palabra que falta.", ["nicer"], "Comparativo de «nice»: «nicer».");

  /* ---------- Reading ---------- */
  R(RW, "Dear Jo, I'm sorry I couldn't come to your party. I had to work late. Can we meet for lunch on Friday instead? Tom",
    "Why didn't Tom go to the party?", ["He was ill", "He had to work", "He forgot"], 1, "«I had to work late».");
  R(RW, "Notice: The swimming pool will be closed next Monday for cleaning. It will open again on Tuesday at 7 a.m.",
    "When will the pool open again?", ["On Monday", "On Tuesday", "Next week on Sunday"], 1, "«open again on Tuesday».");
  R(RW, "Ella's Café is now open every weekend. We serve breakfast from 8 a.m. and our cakes are made fresh every morning.",
    "When are the cakes made?", ["Every afternoon", "Every morning", "At the weekend only"], 1, "«made fresh every morning».");
  R(RW, "Last year I started learning the guitar. At first it was difficult, but now I play every day and I can play several songs.",
    "How does the writer feel about the guitar now?", ["It is still difficult", "They play it every day", "They have given up"], 1, "Toca cada día y ya sabe varias canciones.");
  R(RW, "The museum is free on Sundays, but you need to book your ticket online before you go.",
    "What must visitors do on Sundays?", ["Pay at the door", "Book online", "Bring a guide"], 1, "«you need to book your ticket online».");
  R(RW, "Jack: Do you want to come camping with us? Sara: I'd love to, but my car is broken. Can I come by train?",
    "Why can't Sara drive?", ["She doesn't have a licence", "Her car is broken", "She is going away"], 1, "«my car is broken».");
  R(RW, "Our new gym has a pool, a sauna and classes every evening. Membership costs 25 pounds a month for students.",
    "How much do students pay?", ["25 pounds a month", "25 pounds a year", "Nothing"], 0, "«25 pounds a month for students».");
  R(RW, "Dear Mr Lee, Thank you for your letter. Unfortunately the room you wanted is not available until June.",
    "When is the room free?", ["In May", "In June", "Next week"], 1, "«not available until June».");
  R(RW, "Mark has been working at the hospital for three years. He likes the job, but he finds the night shifts tiring.",
    "What does Mark find tiring?", ["His colleagues", "The night shifts", "The job itself"], 1, "«the night shifts tiring».");
  R(RW, "Holiday tip: Pack light. Most hotels have washing machines, so you don't need many clothes.",
    "Why do you not need many clothes?", ["The weather is always warm", "Hotels have washing machines", "The shops are cheap"], 1, "«Most hotels have washing machines».");
  R(RW, "Lost dog! Small, brown and white, answers to the name Bella. Please call 0777 123456 if you see her.",
    "What should you do if you see Bella?", ["Take her home", "Call the number", "Give her food"], 1, "«Please call ... if you see her».");
  R(RW, "The new bus route goes from the station to the airport. It runs every twenty minutes during the day.",
    "How often does the bus run during the day?", ["Every ten minutes", "Every twenty minutes", "Every hour"], 1, "«every twenty minutes».");
  R(RW, "I'm writing to complain about the hotel room. The bed was uncomfortable and the bathroom was dirty.",
    "What is the writer complaining about?", ["The food", "The bed and the bathroom", "The staff"], 1, "Se queja de la cama y el baño.");
  R(RW, "Sam is good at cooking. Last weekend he made dinner for twelve people, and everyone said it was delicious.",
    "How many people did Sam cook for?", ["Two", "Ten", "Twelve"], 2, "«for twelve people».");

  /* ---------- Listening ---------- */
  L(LS, "Man: Hi, I'd like to book a table for four at eight o'clock on Saturday. Woman: I'm sorry, we're full at eight. Would nine be OK?",
    "What time is the table booked for?", ["Eight", "Nine", "Ten"], 1, "El restaurante está lleno a las ocho; ofrecen las nueve.");
  L(LS, "Woman: Excuse me, does this train go to Brighton? Man: No, you need the one on platform four.",
    "Which platform should she go to?", ["Platform one", "Platform four", "Platform fourteen"], 1, "«the one on platform four».");
  L(LS, "Girl: Mum, I'm going to Anna's house after school. Mum: All right, but you must be home before dinner.",
    "When must the girl be home?", ["After school", "Before dinner", "At midnight"], 1, "«before dinner».");
  L(LS, "Man: Our flight was cancelled, so we'll take the train instead. Woman: Good idea, it's quicker than waiting.",
    "How are they going to travel?", ["By plane", "By train", "By car"], 1, "«we'll take the train instead».");
  L(LS, "Woman: I've been studying English for two years. Man: Really? You speak it so well.",
    "How long has the woman studied English?", ["Two months", "Two years", "Twenty years"], 1, "«for two years».");
  L(LS, "Boy: Did you finish the project? Girl: Not yet. I'm going to work on it this evening.",
    "When will the girl work on the project?", ["Yesterday", "This evening", "Tomorrow morning"], 1, "«this evening».");
  L(LS, "Man: The shop closes at half past five on weekdays but at one o'clock on Saturdays.",
    "When does the shop close on Saturdays?", ["At five thirty", "At one o'clock", "At six"], 1, "«at one o'clock on Saturdays».");
  L(LS, "Woman: Which day suits you for the meeting? Man: Thursday is good, but not in the afternoon.",
    "When can the man NOT attend?", ["Thursday morning", "Thursday afternoon", "Friday"], 1, "«not in the afternoon».");
  L(LS, "Girl: I'd like a ticket for the concert, please. Man: Adult or child? Girl: One child, please.",
    "What ticket does the girl buy?", ["An adult ticket", "A child ticket", "Two tickets"], 1, "«One child, please».");
  L(LS, "Man: Have you seen my keys? Woman: They're on the kitchen table, next to your phone.",
    "Where are the keys?", ["On the kitchen table", "In the car", "Next to the TV"], 0, "«on the kitchen table».");
  L(LS, "Woman: How was your holiday? Man: Fantastic! We went to the mountains and climbed every day.",
    "What did they do on holiday?", ["Swam in the sea", "Climbed mountains", "Visited museums"], 1, "«we went to the mountains and climbed».");
  L(LS, "Boy: Are you coming to football on Sunday? Girl: I can't, I'm visiting my cousins in York.",
    "Where is the girl going on Sunday?", ["To the football", "To York", "To the cinema"], 1, "«visiting my cousins in York».");
  L(LS, "Teacher: The exam starts at ten, so please arrive at quarter past nine.",
    "What time should students arrive?", ["Ten o'clock", "Quarter past nine", "Half past nine"], 1, "«quarter past nine».");
  L(LS, "Man: This coat is very nice. How much is it? Woman: It's forty pounds, but it's on sale this week.",
    "What is the price of the coat?", ["Forty pounds", "Thirty pounds", "Fourteen pounds"], 0, "Precio: 40 libras; está en oferta.");
  L(LS, "Woman: Could you help me carry these boxes? Man: Of course. Where do you want them?",
    "What does the woman ask the man to do?", ["Open a box", "Help carry the boxes", "Buy new boxes"], 1, "«Could you help me carry these boxes?».");
  L(LS, "Girl: I'm really tired. I didn't sleep well last night. Boy: Why don't you take a nap?",
    "Why is the girl tired?", ["She played sport", "She didn't sleep well", "She worked all night"], 1, "«I didn't sleep well last night».");

  /* ---------- Listening (respuesta escrita) ---------- */
  LT(LS, "Woman: What time does the film start? Man: At twenty past seven, I think.",
    "What time does the film start? (escribe la hora en inglés)", ["twenty past seven", "7:20", "7.20", "20 past 7", "seven twenty"],
    "«twenty past seven» = 7:20.");
  LT(LS, "Man: Where did you buy that bag? Woman: In the market in the centre of town.",
    "Where did she buy the bag? (escribe la respuesta)", ["in the market", "the market", "at the market", "in the market in the centre of town", "in the centre of town"],
    "«In the market in the centre of town».");
  LT(LS, "Boy: How many brothers do you have? Girl: Two, and one sister.",
    "How many brothers does the girl have? (escribe el número)", ["two", "2"],
    "«Two» brothers.");
  LT(LS, "Woman: What's the best way to get to the museum? Man: Take the number nine bus. It's quicker than walking.",
    "Which bus should she take? (escribe el número)", ["nine", "9", "number nine", "the number nine"],
    "El autobús número nueve.");
  LT(LS, "Man: How long will the repair take? Mechanic: About three days, I'm afraid.",
    "How long will the repair take? (escribe en inglés)", ["three days", "3 days", "about three days", "about 3 days"],
    "«About three days».");

  /* ---------- Transformaciones ---------- */
  T(TR, "It isn't necessary to bring a pen. (Usa «need»)", "You ___ bring a pen", ["you don't need to bring a pen", "you do not need to bring a pen", "you needn't bring a pen"],
    "«don't need to» = no es necesario.");
  T(TR, "Shall we go to the park? (Usa «Let's»)", "Let's ...", ["let's go to the park"], "«Let's» + base sugiere lo mismo que «Shall we».");
  T(TR, "She started working here in 2019. (Usa «since»)", "She has ... 2019", ["she has worked here since 2019", "she has been working here since 2019"],
    "Present perfect + «since».");
  T(TR, "I haven't been to Paris before. (Usa «never»)", "This is ... I ... Paris", ["this is the first time i have been to paris", "this is the first time i've been to paris"],
    "«This is the first time ...».");
  T(TR, "He is too young to drive. (Usa «not old enough»)", "He is not ... to drive", ["he is not old enough to drive"],
    "«not old enough to» = demasiado joven para.");
  T(TR, "The film was so boring that I fell asleep. (Usa «such»)", "It was such ...", ["it was such a boring film that i fell asleep", "it was such a boring film that i went to sleep"],
    "«such a + adjetivo + sustantivo + that».");
  T(TR, "Tom is more intelligent than his brother. (Usa «not as ... as»)", "Tom's brother is ...", ["tom's brother is not as intelligent as tom", "tom's brother isn't as intelligent as tom"],
    "Inversión de la comparación con «not as ... as».");
  T(TR, "Don't forget to lock the door. (Usa «Remember»)", "Remember to ...", ["remember to lock the door"],
    "«Remember to» = acuérdate de hacer algo.");
  T(TR, "I'm sorry I didn't call you. (Usa «should»)", "I should have ...", ["i should have called you"],
    "«should have + participio» expresa arrepentimiento.");
  T(TR, "They can't come to the party. (Usa «unable»)", "They are ... to come", ["they are unable to come", "they're unable to come"],
    "«unable to» = no poder.");
  T(TR, "It's a pity we don't have time. (Usa «wish»)", "We wish ...", ["we wish we had time", "we wish we had more time"],
    "«wish» + pasado para lo presente.");
  T(TR, "Can you open the window? (Usa «Would you mind»)", "Would you mind ...", ["would you mind opening the window", "would you mind opening the window?"],
    "«Would you mind + -ing» para pedir favores con cortesía.");
  T(TR, "The last time I saw her was in 2015. (Usa «since»)", "I haven't ... 2015", ["i haven't seen her since 2015"],
    "«I haven't seen her since 2015».");
  T(TR, "I'd like to know where the station is. (Usa «Could you tell me»)", "Could you tell me ...", ["could you tell me where the station is"],
    "Pregunta indirecta con orden afirmativo.");
  T(TR, "Nobody told me about the meeting. (Usa «I wasn't»)", "I wasn't ... about the meeting", ["i wasn't told about the meeting", "i was not told about the meeting"],
    "Pasiva: «I wasn't told about the meeting».");
  T(TR, "You should see a doctor. (Usa «advise»)", "I advise you ...", ["i advise you to see a doctor", "i advise you to see a doctor."],
    "«advise + objeto + to + infinitivo».");


  /* ---------- Ampliación de gramática y lectura ---------- */
  G(RW, "By the time we arrived, the film ___ already ___.", ["had / started", "has / started", "started / had"], 0, "Pasado perfecto para una acción anterior a otra pasada.");
  G(RW, "I'll call you as soon as I ___ home.", ["get", "will get", "got"], 0, "En cláusulas temporales de futuro se usa presente.");
  T(RW, "You ___ smoke here. It's not allowed.", "Escribe la palabra que falta.", ["mustn't"], "«Mustn't» = prohibición.");
  T(RW, "This is the book ___ I told you about.", "Escribe la palabra que falta.", ["that"], "Relativo para cosas: «that» (o «which»).");
  G(RW, "She's the woman ___ husband is a pilot.", ["whose", "who's", "which"], 0, "Posesión en relativo: «whose».");
  T(RW, "The results ___ be announced next week.", "Escribe la palabra que falta.", ["will"], "Futuro con «will» en pasiva: «will be announced».");
  G(RW, "I've never ___ to a concert before.", ["been", "gone", "went"], 0, "Experiencia con present perfect: «been».");
  T(RW, "My dad ___ work by bike when the weather is good.", "Escribe la palabra que falta.", ["often"], "Adverbio de frecuencia delante del verbo principal.");
  T(RW, "I had a sandwich, ___ I wasn't very hungry.", "Escribe la palabra que falta.", ["although"], "«although» expresa contraste.");
  G(RW, "We ___ to the new shopping centre last Saturday.", ["went", "go", "have gone"], 0, "Marca de tiempo pasada: pasado simple.");
  G(RW, "The children ___ in the garden at the moment.", ["are playing", "play", "played"], 0, "Presente continuo: «at the moment».");
  T(RW, "I need ___ information about the course.", "Escribe la palabra que falta.", ["some"], "«Information» es incontable: «some».");
  T(RW, "The office is ___ the second floor.", "Escribe la palabra que falta.", ["on"], "«on» + piso.");
  R(RW, "Welcome to Riverside Park! The café is open from 10 a.m. until 5 p.m. Dogs are welcome, but they must be kept on a lead.",
    "What must dog owners do?", ["Keep their dogs on a lead", "Leave their dogs at home", "Pay extra for dogs"], 0, "«must be kept on a lead».");
  R(RW, "Pete hates getting up early, so he always sets two alarms. He says it's the only way he can be on time for work.",
    "Why does Pete set two alarms?", ["He likes loud noises", "He needs to be on time", "He has two jobs"], 1, "«the only way he can be on time for work».");
  L(LS, "Woman: Hello, this is the dentist. Your appointment has moved to Thursday at three. Man: Thanks, that's fine for me.",
    "Which day has the dentist appointment been moved to?", ["Tuesday at three", "Thursday at three", "Thursday at four"], 1, "«Thursday at three».");
  LT(LS, "Girl: How long is the journey to Edinburgh by train? Boy: About four hours, I think.",
    "How long is the journey? (escribe en inglés)", ["four hours", "about four hours", "4 hours", "about 4 hours"], "«About four hours».");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios adicionales originales para B1 con la estructura de tareas de PET (Reading, Writing y Listening). */
(function () {
  var out = [], LV = "B1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }
  var RW = "PET · Reading y Writing", LS = "PET · Listening", TR = "PET · Transformaciones";

  /* ---------- Gramática en contexto ---------- */
  T(RW, "I wish I ___ how to drive.", "Escribe la palabra que falta.", ["knew"], "«wish» + pasado para lo que no es real.");
  G(RW, "If you ___ earlier, you would have caught the train.", ["had left", "left", "would leave"], 0, "Condicional 3: «had + participio» en la condición.");
  G(RW, "The house ___ built in 1920.", ["was", "is", "has"], 0, "Pasiva en pasado: «was built».");
  G(RW, "She ___ to the gym three times a week since January.", ["has been going", "went", "is going"], 0, "Present perfect continuo con «since».");
  G(RW, "He told me that he ___ the film before.", ["had seen", "saw", "has seen"], 0, "Estilo indirecto: «had seen» (pasado perfecto).");
  G(RW, "You ___ take an umbrella. It isn't going to rain.", ["don't need to", "mustn't", "shouldn't have to"], 0, "Ausencia de necesidad: «don't need to».");
  G(RW, "The students ___ their essays by Friday.", ["must hand in", "must to hand in", "must handing in"], 0, "Modal + forma base.");
  G(RW, "I'm used to ___ early in the morning.", ["getting up", "get up", "got up"], 0, "«be used to» + -ing.");
  G(RW, "The sooner you start, ___ you finish.", ["the sooner", "the soonest", "sooner"], 0, "Estructura «the sooner ..., the sooner ...».");
  G(RW, "I'd like you ___ me the report tomorrow.", ["to send", "send", "sending"], 0, "«like + objeto + to + infinitivo».");
  T(RW, "Mary is ___ the person I trust most.", "Escribe la palabra que falta.", ["the"], "Superlativo con «the».");
  T(RW, "He made me ___ my room before I went out.", "Escribe la palabra que falta.", ["clean"], "«make + objeto + forma base».");
  G(RW, "The phone ___ while I was having a shower.", ["rang", "was ringing", "ring"], 0, "Pasado simple para la acción interrumpida.");
  T(RW, "Unless you hurry, you ___ miss the bus.", "Escribe la palabra que falta.", ["will"], "«Unless» = «if not»; condicional 1.");
  G(RW, "She is ___ intelligent than her sister.", ["far more", "much more than", "more than"], 0, "«far more» como intensificador del comparativo.");
  T(RW, "It's the ___ film I've ever seen.", "Escribe la palabra que falta.", ["worst"], "Superlativo irregular de «bad»: «worst».");
  G(RW, "Could you ___ me a hand with these bags?", ["give", "make", "do"], 0, "Expresión fija: «give someone a hand».");
  T(RW, "I didn't ___ the joke. Could you explain it?", "Escribe la palabra que falta.", ["get"], "«get» = entender.");
  G(RW, "We ___ dinner when the power went off.", ["were having", "had", "have had"], 0, "Pasado continuo para acción en progreso interrumpida.");
  G(RW, "He's been ___ for a new job for months.", ["looking", "look", "looked for"], 0, "«look for» = buscar; aquí con «been looking».");
  G(RW, "By next year, I ___ here for ten years.", ["will have worked", "will work", "work"], 0, "Futuro perfecto con «by next year».");
  T(RW, "She suggested ___ a taxi to the airport.", "Escribe la palabra que falta.", ["taking"], "«suggest» + -ing.");
  T(RW, "The instructions were so ___ that nobody understood them.", "Escribe la palabra que falta.", ["confusing"], "Adjetivo en -ing para cosas.");

  /* ---------- Reading ---------- */
  R(RW, "Sara has always wanted to learn to surf. Last summer she finally signed up for a course on the coast. At first she fell off the board every time, but after a week she could stand up for several seconds.",
    "What happened at the beginning of the course?", ["She stood up easily", "She kept falling off", "She gave up quickly"], 1, "«she fell off the board every time».");
  R(RW, "Dear Mrs Walker, I am writing about the course I took last term. The teacher was very helpful, but the classroom was too cold. Could you please check the heating?",
    "What is the writer's complaint?", ["The teacher was unhelpful", "The classroom was cold", "The course was too short"], 1, "«the classroom was too cold».");
  R(RW, "Our library has changed its opening hours. From now on, it will open at eight in the morning on weekdays and stay open until eight in the evening.",
    "When does the library close on weekdays now?", ["At six", "At eight", "At nine"], 1, "«stay open until eight in the evening».");
  R(RW, "Tom used to hate cooking. Then he took a class with his friend Mike, and now he makes dinner for his whole family every Sunday.",
    "How does Tom feel about cooking now?", ["He still hates it", "He enjoys it", "He only cooks with Mike"], 1, "Ahora cocina cada domingo para su familia.");
  R(RW, "Notice to all residents: The lift on the east side is out of order. Please use the stairs or the lift on the west side until further notice.",
    "What should residents do?", ["Use the west lift or the stairs", "Use the east lift", "Stay at home"], 0, "«use the stairs or the lift on the west side».");
  R(RW, "When I moved to a new city, I felt lonely. Joining a local running club helped me meet people, and now I have friends I see every weekend.",
    "How did the writer make friends?", ["By working in an office", "By joining a running club", "By travelling abroad"], 1, "«Joining a local running club helped me meet people».");
  R(RW, "The festival will take place in the park on Saturday. Food stalls open at noon, and there will be live music from three o'clock until the evening.",
    "When does the music start?", ["At noon", "At three o'clock", "In the evening"], 1, "«live music from three o'clock».");
  R(RW, "Jen was nervous before her job interview. She prepared questions in advance and practised with her sister. The interview went well.",
    "How did Jen prepare for the interview?", ["She bought a new suit", "She practised with her sister", "She did not prepare"], 1, "«practised with her sister».");
  R(RW, "Hi Anna, I'm running late. The train was delayed for twenty minutes. I'll be at the cinema by seven fifteen. Save me a seat!",
    "Why is the writer late?", ["The cinema was closed", "The train was delayed", "The writer forgot the time"], 1, "«The train was delayed for twenty minutes».");
  R(RW, "This hotel offers free breakfast, but the Wi-Fi is only available in the lobby. Guests can also use the swimming pool between six and nine in the evening.",
    "When can guests use the pool?", ["In the morning", "Between six and nine in the evening", "All day"], 1, "«between six and nine in the evening».");
  R(RW, "Last month the town council decided to plant more trees along the main street. Residents were asked to vote on the design, and most of them chose the small, flowering kind.",
    "What kind of tree did most residents choose?", ["Tall trees", "Small flowering trees", "Palm trees"], 1, "«the small, flowering kind».");

  /* ---------- Listening ---------- */
  L(LS, "Woman: Is the museum open on Mondays? Man: No, but it opens early on Tuesdays, at half past eight.",
    "When does the museum open on Tuesdays?", ["At eight", "At half past eight", "At nine"], 1, "«half past eight».");
  L(LS, "Man: I've booked a room for three nights, from Friday to Sunday. Woman: Would you like a room with a sea view?",
    "How many nights has the man booked?", ["Two", "Three", "Four"], 1, "«for three nights».");
  L(LS, "Girl: Did you enjoy the concert? Boy: It was amazing, but the seats were really uncomfortable.",
    "What did the boy dislike about the concert?", ["The music", "The seats", "The price"], 1, "«the seats were really uncomfortable».");
  L(LS, "Teacher: Please remember that the homework is due on Wednesday, not Thursday as I said before.",
    "When is the homework due?", ["Tuesday", "Wednesday", "Thursday"], 1, "«due on Wednesday, not Thursday».");
  L(LS, "Woman: I'm thinking about buying a bike. Man: Why don't you try one first? There's a shop near the station that rents them.",
    "What does the man suggest?", ["Buying a bike at the station", "Renting a bike first", "Walking to work"], 1, "«try one first ... rents them».");
  L(LS, "Man: We need more chairs for the meeting. Woman: I'll ask the caretaker to bring some from the other room.",
    "What will the woman do?", ["Buy new chairs", "Ask the caretaker for chairs", "Move the meeting"], 1, "«I'll ask the caretaker».");
  L(LS, "Girl: My train was cancelled, so I came by coach. Boy: That must have been a long journey!",
    "How did the girl travel?", ["By train", "By coach", "By car"], 1, "«I came by coach».");
  L(LS, "Woman: Shall we meet at the café or at the cinema? Man: The café is better, it's nearer to my house.",
    "Where will they meet?", ["At the café", "At the cinema", "At the man's house"], 0, "«The café is better».");
  L(LS, "Man: The printer isn't working again. Woman: Try turning it off and on. That usually works.",
    "What does the woman suggest?", ["Calling a technician", "Turning the printer off and on", "Buying a new printer"], 1, "«Try turning it off and on».");
  L(LS, "Girl: I'm going to start a course in photography next month. Boy: That sounds really interesting!",
    "When does the girl start the course?", ["This month", "Next month", "Next year"], 1, "«next month».");
  L(LS, "Woman: I'm afraid the hotel is full tonight. Man: Could you recommend another one nearby? Woman: Yes, the Grand is just across the road.",
    "Where is the other hotel?", ["Far away", "Across the road", "In the next town"], 1, "«just across the road».");
  L(LS, "Boy: Dad, can we go swimming tomorrow? Dad: We'll see. If the weather is good, we'll go in the afternoon.",
    "When might they go swimming?", ["In the morning", "In the afternoon if it's good weather", "Never"], 1, "«if the weather is good, we'll go in the afternoon».");
  L(LS, "Woman: Excuse me, where can I buy a map of the city? Man: The tourist office on Church Street sells them.",
    "Where can she buy a map?", ["At the tourist office on Church Street", "At the bus station", "In the library"], 0, "«The tourist office on Church Street sells them».");
  LT(LS, "Man: What's your job? Woman: I'm a nurse at the local hospital.",
    "What is the woman's job? (escribe la respuesta en inglés)", ["nurse", "a nurse", "she is a nurse", "she's a nurse"], "«A nurse».");
  LT(LS, "Girl: What time do you finish work? Boy: Usually at half past five, but on Fridays I leave at four.",
    "What time does the boy finish on Fridays? (escribe la respuesta)", ["four", "4", "four o'clock", "at four", "4 o'clock", "at 4"], "«at four».");
  LT(LS, "Woman: How many people work in your company? Man: About a hundred and fifty, I think.",
    "How many people work in the company? (escribe el número)", ["150", "one hundred and fifty", "a hundred and fifty", "about 150", "about one hundred and fifty"], "«About a hundred and fifty».");
  LT(LS, "Man: Where did you go on holiday? Woman: We went to Portugal, but the weather wasn't very good.",
    "Which country did she visit? (escribe en inglés)", ["portugal", "to portugal", "in portugal"], "«Portugal».");

  /* ---------- Transformaciones ---------- */
  T(TR, "It's a pity I didn't study harder. (Usa «wish»)", "I wish I ...", ["i wish i had studied harder"], "«wish» + past perfect para pesar sobre el pasado.");
  T(TR, "She is not as tall as her brother. (Usa «shorter»)", "She is ... than her brother", ["she is shorter than her brother"], "«shorter than» = más bajo que.");
  T(TR, "Nobody in the class knew the answer. (Usa «No one»)", "No one ...", ["no one in the class knew the answer", "no one in the class knew the answer."], "Sujeto negativo: «No one» + verbo afirmativo.");
  T(TR, "I'm sure he will pass the exam. (Usa «likely»)", "He is ... to pass the exam", ["he is likely to pass the exam"], "«likely to» = probable que.");
  T(TR, "The shop is too far to walk to. (Usa «so ... that»)", "The shop is so ... that ...", ["the shop is so far that we can't walk there", "the shop is so far that we cannot walk there", "the shop is so far that you can't walk there"], "«so far that» = tan lejos que.");
  T(TR, "They started the project two years ago and it's still going. (Usa present perfect continuous)", "They have ... for two years", ["they have been working on the project for two years", "they've been working on the project for two years"], "Present perfect continuo con «for».");
  T(TR, "Paul isn't allowed to park here. (Usa «mustn't»)", "Paul ... park here", ["paul mustn't park here", "paul must not park here"], "«mustn't» = prohibición.");
  T(TR, "I'm not sure whether she will come. (Usa «might»)", "She ... come", ["she might come"], "«might» = posibilidad.");
  T(TR, "He said: 'I live in London.' (Estilo indirecto)", "He said that ...", ["he said that he lived in london"], "Estilo indirecto: presente pasa a pasado.");
  T(TR, "Let's not go out tonight. (Usa «Why don't»)", "Why don't ...?", ["why don't we stay in tonight", "why don't we stay in tonight?", "why don't we not go out tonight"], "«Why don't we» + base sugiere lo mismo.");
  T(TR, "The film was so good that I watched it twice. (Usa «such»)", "It was such ...", ["it was such a good film that i watched it twice"], "«such a + adjetivo + sustantivo + that».");
  T(TR, "I haven't had a holiday for three years. (Usa «last»)", "The last time ...", ["the last time i had a holiday was three years ago", "the last time i went on holiday was three years ago"], "«The last time ... was ...».");
  T(TR, "Could you speak more slowly, please? (Usa «Would you mind»)", "Would you mind ...", ["would you mind speaking more slowly", "would you mind speaking more slowly please"], "«Would you mind + -ing».");
  T(TR, "Sam doesn't have to work on Sundays. (Usa «needn't»)", "Sam ... work on Sundays", ["sam needn't work on sundays"], "«needn't» = no hace falta.");
  T(TR, "I got here late because of the traffic. (Usa «as a result»)", "There was heavy traffic. ..., I got here late", ["as a result i got here late", "as a result, i got here late"], "«As a result» = como consecuencia.");
  T(TR, "Don't forget to bring your passport. (Usa «Remember»)", "Remember ...", ["remember to bring your passport"], "«Remember to + base» = acuérdate de hacer algo.");
  T(TR, "Last week I was ill, so I didn't go to work. (Usa «because»)", "I didn't go to work ...", ["i didn't go to work because i was ill", "i didn't go to work because i was ill."], "«because» + causa.");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios adicionales originales para B2 con la estructura de tareas de FCE (Use of English, Reading y Listening). */
(function () {
  var out = [], LV = "B2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }
  var UE = "FCE · Use of English P1 (vocabulario)", UG = "FCE · Use of English P3 (gramática)", RD = "FCE · Reading P5 (opción múltiple)", LI = "FCE · Listening P1 (opción múltiple)", TR = "FCE · Transformaciones P4";

  /* ---------- Vocabulario y gramática ---------- */
  G(UE, "The mayor ___ the plans after the public protest.", ["abandoned", "abolished", "abandoned to"], 0, "«abandon» = renunciar a un plan.");
  T(UE, "The report ___ a number of worrying trends in young people's reading habits.", "Escribe la palabra que falta.", ["highlights"], "«highlight» = destacar.");
  T(UG, "Had I ___ about the strike, I would have changed my travel plans.", "Escribe la palabra que falta.", ["known"], "Condicional 3 en forma invertida: «Had + sujeto + participio».");
  G(UG, "The company's profits have ___ steadily over the past three years.", ["risen", "raised", "rose up"], 0, "«rise» (intransitivo) → participio «risen».");
  T(UE, "She was ___ by the news that her application had been rejected.", "Escribe la palabra que falta.", ["devastated"], "Participio como adjetivo para la persona afectada.");
  G(UG, "Not only ___ the exam, but she also got the highest mark.", ["did she pass", "she passed", "passed she"], 0, "Inversión tras «Not only» en presente/pasado.");
  G(UE, "The negotiations reached a ___ after twelve hours of talks.", ["breakthrough", "breakdown", "breakaway"], 0, "«breakthrough» = avance decisivo.");
  T(UG, "I'd rather you ___ mention this to anyone yet.", "Escribe la palabra que falta.", ["didn't"], "«would rather» + sujeto distinto → pasado en la cláusula.");
  T(UE, "The stories were so ___ that the children listened in silence.", "Escribe la palabra que falta.", ["gripping"], "Adjetivo en -ing para describir la causa.");
  G(UG, "It is essential that every member ___ the form before Friday.", ["submit", "submits", "will submit"], 0, "Subjuntivo tras «essential that»: forma base.");
  T(UE, "The new law will ___ into effect next spring.", "Escribe la palabra que falta.", ["come"], "«come into effect» = entrar en vigor.");
  G(UG, "No sooner ___ her coat off than the phone rang.", ["had she taken", "she had taken", "did she take"], 0, "Inversión con «No sooner ... than».");
  T(UE, "Despite the ___ weather, the match went ahead as planned.", "Escribe la palabra que falta.", ["inclement"], "«inclement» = tiempo desapacible.");
  G(UG, "Only after the police arrived ___ the crowd begin to disperse.", ["did", "had", "was"], 0, "Inversión tras «Only after»: auxiliar «did».");
  T(UE, "The documentary ___ the causes of the economic crisis.", "Escribe la palabra que falta.", ["explores"], "«explore» = analizar a fondo.");
  G(UG, "He would have passed the test if he ___ more carefully.", ["had read", "read", "has read"], 0, "Condicional 3 con «if» + pasado perfecto.");
  G(UE, "I'm afraid the schedule is ___ at the moment, so we'll need to reschedule.", ["fully booked", "full booking", "booked full"], 0, "«fully booked» = completamente reservado.");
  G(UG, "The town ___ a major redevelopment project for several years now.", ["has been undergoing", "has undergone", "is undergo"], 0, "Present perfect continuo para una acción en curso desde el pasado.");
  G(UE, "The witness's account was ___ with the evidence collected by the police.", ["consistent", "consistency", "consist"], 0, "Adjetivo «consistent with» = coherente con.");
  G(UG, "The patient ___ to have recovered fully by next month.", ["is expected", "expects", "is expecting it"], 0, "Pasiva impersonal de expectativa: «is expected to».");
  T(UE, "The manager ___ the team's efforts with a generous bonus.", "Escribe la palabra que falta.", ["rewarded"], "«reward» + objeto directo sin preposición.");
  T(UG, "The house, ___ was built in 1890, has recently been restored.", "Escribe la palabra que falta.", ["which"], "Relativo no definitorio con cosas: «which».");
  G(UE, "The team's ___ to the competition was impressive.", ["commitment", "committal", "committed"], 0, "Sustantivo «commitment» = compromiso.");
  T(UG, "Each of the candidates ___ asked to give a short presentation.", "Escribe la palabra que falta.", ["was"], "«Each» + sujeto singular → verbo singular.");

  /* ---------- Reading ---------- */
  R(RD, "For centuries, bees were regarded as simple pests by many farmers. Only recently has research revealed how vital they are to food production: the majority of crops depend, at least partly, on pollination carried out by insects.",
    "What does the writer suggest about farmers' attitudes to bees?", ["They have always valued bees", "They used to see bees as harmful", "They have recently started keeping bees"], 1, "Antes veían a las abejas como plaga; la investigación reciente lo ha cambiado.");
  R(RD, "The museum's new exhibition is unlike anything the city has seen before. Rather than displaying objects behind glass, it invites visitors to touch, move and even rearrange the pieces.",
    "What makes the exhibition unusual?", ["It is free to enter", "Visitors can handle the exhibits", "It is held outdoors"], 1, "Permite tocar y reorganizar las piezas.");
  R(RD, "Although the novel was rejected by more than twenty publishers, its author never doubted its value. When it was finally published, it became a bestseller within months.",
    "What does the text say about the author?", ["She was unsure about the novel", "She continued to believe in her work", "She stopped writing after the rejections"], 1, "«never doubted its value».");
  R(RD, "Many people assume that remote working reduces productivity. However, a recent study of two thousand employees found that most of them completed their tasks as efficiently at home as in the office, and reported higher satisfaction.",
    "What did the study find?", ["Remote workers were less productive", "Most workers were equally efficient at home", "Employees preferred the office"], 1, "«as efficiently at home as in the office».");
  R(RD, "The village's old railway station has been converted into a community centre. Local volunteers did most of the work, and the building now hosts concerts, markets and language classes.",
    "Who carried out most of the renovation?", ["Professional builders", "Local volunteers", "The railway company"], 1, "«Local volunteers did most of the work».");
  R(RD, "Ethical fashion brands often charge more than mass-market retailers, and critics argue that they are simply targeting wealthy consumers. Supporters reply that higher prices reflect fair wages and better materials.",
    "According to supporters, why are ethical brands more expensive?", ["They target wealthy customers", "They pay fair wages and use better materials", "They have fewer shops"], 1, "«higher prices reflect fair wages and better materials».");
  R(RD, "Ancient Romans built roads that lasted for centuries. Their engineers chose routes carefully, laid several layers of stone and gravel, and designed slight curves to drain rainwater.",
    "Why were the roads curved slightly?", ["To make them more beautiful", "To drain rainwater", "To reduce the cost of building"], 1, "«designed slight curves to drain rainwater».");
  R(RD, "At first, the marathon organisers expected around five hundred runners. By the registration deadline, however, more than three thousand people had signed up, and the event had to be moved to a larger course.",
    "What happened to the marathon?", ["It was cancelled", "It attracted far more runners than expected", "Fewer people entered than planned"], 1, "«more than three thousand people had signed up».");
  R(RD, "Scientists studying sleep have found that teenagers naturally go to bed later than adults. This is not simply a matter of habit: their internal body clocks shift during adolescence, which makes early mornings particularly hard.",
    "Why do teenagers find early mornings hard?", ["They prefer staying up late", "Their body clocks change during adolescence", "Schools start too late"], 1, "«their internal body clocks shift during adolescence».");
  R(RD, "The company's decision to close its factory in the north has angered local workers, who say the town will struggle without the jobs. Management argues that the move was necessary to remain competitive.",
    "What is management's justification for the closure?", ["The factory was unsafe", "The move was needed to stay competitive", "The town asked for it"], 1, "«necessary to remain competitive».");
  R(RD, "When the author first visited the coastal village, she intended to stay only one night. Three weeks later, she was still there, having taken a job at the local bakery and made friends with most of its residents.",
    "What happened to the author's original plan?", ["She stayed longer than she intended", "She left the next morning", "She bought a house there"], 0, "Se quedó tres semanas en vez de una noche.");

  /* ---------- Listening ---------- */
  L(LI, "Man: I've been thinking about moving abroad, but my family is worried. Woman: It's a big step, but you'll adapt quickly if you're open to new experiences.",
    "What does the woman think the man should be?", ["Careful with money", "Open to new experiences", "Closer to his family"], 1, "«if you're open to new experiences».");
  L(LI, "Presenter: Our guest today has spent ten years researching the habits of urban birds. She believes that pigeons are far more intelligent than most people give them credit for.",
    "What is the guest's opinion of pigeons?", ["They are not very clever", "They are more intelligent than people think", "They are dangerous"], 1, "«far more intelligent than most people give them credit for».");
  L(LI, "Woman: I can't believe the committee rejected the proposal after all that work. Man: Well, the budget was the problem, not the ideas.",
    "What was the reason for the rejection?", ["The ideas were poor", "The budget", "The timing"], 1, "«the budget was the problem, not the ideas».");
  L(LI, "Girl: Did you know the library is going to close for renovation? Boy: Yes, but they said it would reopen next autumn, with a café included.",
    "When will the library reopen?", ["Next spring", "Next autumn", "Next winter"], 1, "«reopen next autumn».");
  L(LI, "Man: The problem with the software is that it works well on paper but crashes constantly in practice. Woman: That's what the testing team reported last month.",
    "What is the main problem with the software?", ["It is too expensive", "It crashes in practice", "It is hard to find"], 1, "«crashes constantly in practice».");
  L(LI, "Woman: I'm not sure about taking the job abroad. It pays well, but I'd miss my friends terribly. Man: Think about it for a week before you decide.",
    "What is the woman's main concern?", ["The salary", "Missing her friends", "The working hours"], 1, "«I'd miss my friends terribly».");
  L(LI, "Presenter: Tickets for the festival went on sale yesterday, but many fans found the website overwhelmed. Organisers have now opened a second booking window for next Monday.",
    "When can fans book the second batch of tickets?", ["Yesterday", "Next Monday", "Next weekend"], 1, "«a second booking window for next Monday».");
  L(LI, "Man: Honestly, I didn't expect the restaurant to be so good. The service was slow, but the food more than made up for it.",
    "What did the man think of the restaurant?", ["It was disappointing", "The food compensated for the slow service", "It was too expensive"], 1, "«the food more than made up for it».");
  L(LI, "Woman: Our research suggests that people who walk to work feel calmer in the mornings. The effect is strongest when they take a route through a park.",
    "When is the calming effect strongest?", ["When they drive", "When they walk through a park", "When they take the bus"], 1, "«strongest when they take a route through a park».");
  L(LI, "Boy: I've been practising the piano for six months, but I still can't play anything from memory. Girl: That takes time, but the fact that you're persistent is what matters.",
    "What does the girl say matters?", ["Playing from memory quickly", "Being persistent", "Having a good teacher"], 1, "«the fact that you're persistent is what matters».");
  LT(LI, "Man: How did the meeting go? Woman: Better than I expected. The client agreed to extend the contract, although they want a lower price.",
    "What did the client agree to? (escribe en inglés)", ["extend the contract", "to extend the contract", "an extension of the contract", "extending the contract"], "«to extend the contract».");
  LT(LI, "Girl: Which of the two hotels do you prefer? Boy: The one near the old town, although it is a little more expensive.",
    "Which hotel does the boy prefer? (escribe la respuesta)", ["the one near the old town", "near the old town", "the old town hotel", "the hotel near the old town"], "El hotel cerca del casco antiguo.");

  /* ---------- Transformaciones ---------- */
  T(TR, "It was a mistake to ignore their advice. (Usa «should»)", "We ... their advice", ["we should have taken their advice", "we should have listened to their advice"], "«should have + participio» expresa arrepentimiento.");
  T(TR, "The meeting was cancelled because of the storm. (Usa «called off»)", "The meeting was ... because of the storm", ["the meeting was called off because of the storm"], "«called off» = cancelar.");
  T(TR, "I'm sure she knows the answer. (Usa «must»)", "She ... the answer", ["she must know the answer"], "«must» = deducción fuerte.");
  T(TR, "Although he was tired, he finished the race. (Usa «in spite of»)", "In spite of ..., he finished the race", ["in spite of being tired he finished the race", "in spite of being tired, he finished the race", "in spite of his tiredness he finished the race"], "«In spite of» + -ing o sustantivo.");
  T(TR, "The doctor told me to rest for a week. (Usa «advised»)", "The doctor ... to rest for a week", ["the doctor advised me to rest for a week"], "«advise + objeto + to».");
  T(TR, "She has never been so surprised. (Usa «never» al principio)", "Never ...", ["never have i been so surprised", "never have i been so surprised.", "never have i been so surprised!"], "Inversión tras «Never»: «Never have I been».");
  T(TR, "They didn't finish the project on time. (Usa «failed»)", "They ... to finish the project on time", ["they failed to finish the project on time"], "«fail to» = no lograr hacer algo.");
  T(TR, "The company is no longer making cars. (Usa «ceased»)", "The company has ... making cars", ["the company has ceased making cars", "the company has ceased to make cars"], "«cease» = dejar de hacer algo.");
  T(TR, "I regret not taking the job. (Usa «wish»)", "I wish I ...", ["i wish i had taken the job"], "«wish» + past perfect para pesar sobre el pasado.");
  T(TR, "Few people realise how dangerous the road is. (Usa «aware»)", "Few people are ... how dangerous the road is", ["few people are aware of how dangerous the road is"], "«be aware of» = ser consciente de.");
  T(TR, "The lecture was so long that most students left. (Usa «such»)", "It was such ...", ["it was such a long lecture that most students left"], "«such a + adjetivo + sustantivo + that».");
  T(TR, "He is unlikely to change his mind. (Usa «chance»)", "There is ... of him changing his mind", ["there is little chance of him changing his mind", "there is little chance of him changing his mind."], "«little chance of» = poca probabilidad de.");
  T(TR, "Let me know if you need any help. (Usa «hesitate»)", "Don't ... to let me know", ["don't hesitate to let me know", "do not hesitate to let me know"], "«Don't hesitate to» = no dudes en.");
  T(TR, "Despite the rain, we enjoyed the trip. (Usa «although»)", "..., we enjoyed the trip", ["although it rained we enjoyed the trip", "although it was raining we enjoyed the trip"], "«although» + oración completa.");


  /* ---------- Ampliación ---------- */
  T(UE, "The director's ___ to the film's ending divided the critics.", "Escribe la palabra que falta.", ["decision"], "Sustantivo tras determinante: «decision».");
  G(UG, "Scarcely ___ the room when the lights went out.", ["had we entered", "we had entered", "we entered"], 0, "Inversión tras «Scarcely ... when».");
  G(UE, "The new policy is designed to ___ the number of accidents on the motorway.", ["reduce", "reduction", "reducing"], 0, "Infinitivo tras «designed to».");
  T(UG, "I'm not used to ___ so many decisions at once.", "Escribe la palabra que falta.", ["making"], "«be used to» + -ing.");
  G(UE, "The applicants were asked to ___ their references in advance.", ["provide", "provision", "provided"], 0, "Verbo «provide» con objeto directo.");
  T(UG, "It's high time the government ___ action on climate change.", "Escribe la palabra que falta.", ["took"], "«It's high time» + pasado simple.");
  T(UE, "The guide ___ us through the ruins, explaining every detail.", "Escribe la palabra que falta.", ["led"], "Pasado simple irregular de «lead».");
  G(UG, "Were it not ___ the rain, we would have gone for a walk.", ["for", "to", "at"], 0, "Expresión «were it not for» = si no fuera por.");
  T(UE, "The campaign ___ a surprising amount of support from younger voters.", "Escribe la palabra que falta.", ["attracted"], "«attract support» = atraer apoyo.");
  T(UG, "The results, ___ we received last week, were better than expected.", "Escribe la palabra que falta.", ["which"], "Relativo no definitorio con cosas: «which».");
  R(RD, "The fishing village had relied on the same small harbour for two centuries. When storms began to damage its walls, the council was forced to choose between costly repairs and a complete rebuild.",
    "What problem did the village face?", ["Its population was shrinking", "Storms were damaging the harbour", "The fish had disappeared"], 1, "«storms began to damage its walls».");
  R(RD, "Few would have predicted that a mobile game designed in a small studio would become a global phenomenon. Its success, the founders admit, was largely a matter of luck and timing.",
    "What do the founders say about the game's success?", ["It was carefully planned", "It was mostly luck and timing", "It was copied from a rival"], 1, "«largely a matter of luck and timing».");
  R(RD, "The archaeologists were cautious about their discovery. Although the coins appeared to be Roman, they wanted laboratory tests before making any public claims.",
    "Why did the archaeologists hesitate?", ["They had no interest in the coins", "They wanted tests before making claims", "The coins were fake"], 1, "«wanted laboratory tests before making any public claims».");
  L(LI, "Woman: Are you going to apply for the scholarship? Man: I'd like to, but the deadline is so close that I doubt I'll have time to prepare a decent application.",
    "Why is the man hesitating?", ["He doesn't want the money", "He doubts he has time to prepare", "He has already applied"], 1, "«I doubt I'll have time to prepare».");
  L(LI, "Presenter: The new bridge was meant to open in March, but engineers discovered a problem with the foundations, so the date has now been pushed back to the summer.",
    "When will the bridge open now?", ["In March", "In the summer", "Next year"], 1, "«pushed back to the summer».");
  L(LI, "Girl: My grandfather started painting at seventy. Boy: Really? I assumed artists began much earlier in life.",
    "What surprised the boy?", ["The grandfather's age when he began painting", "The grandfather's paintings", "The price of the paintings"], 0, "Le sorprende la edad a la que empezó.");
  LT(LI, "Man: Why did the company change its logo? Woman: They wanted to appear more modern and attract younger customers.",
    "Why did the company change its logo? (escribe en inglés)", ["to appear more modern", "to look more modern", "to seem more modern", "to attract younger customers", "to appear more modern and attract younger customers", "to look modern"],
    "Para parecer más moderna y atraer a clientes jóvenes.");
  T(TR, "Her talent is the reason she got the job. (Usa «owed»)", "She ... her talent", ["she got the job thanks to her talent", "she owes the job to her talent", "she owed the job to her talent"], "«owe ... to» = deber algo a algo.");
  T(TR, "I'm certain he didn't see us. (Usa «couldn't»)", "He ... us", ["he couldn't have seen us"], "«couldn't have + participio» = deducción negativa en pasado.");
  T(TR, "It is possible that the train is late. (Usa «may»)", "The train ... late", ["the train may be late", "the train might be late"], "«may/might» = posibilidad.");
  T(TR, "The students were too tired to concentrate. (Usa «so»)", "The students were so ... that ...", ["the students were so tired that they couldn't concentrate", "the students were so tired that they could not concentrate"], "«so + adjetivo + that».");
  T(TR, "I can't wait to see the new museum. (Usa «look forward»)", "I'm ... the new museum", ["i'm looking forward to seeing the new museum", "i am looking forward to seeing the new museum"], "«look forward to + -ing».");

  EXTRA_ITEMS.push(...out);
})();

/* Ejercicios adicionales originales para C1 (CAE) y C2 (CPE): gramática, vocabulario, lectura, escucha y transformaciones. */
(function () {
  var out = [], LV = "";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e }); }

  /* ---------- C1 (CAE) ---------- */
  LV = "C1";
  var CU = "CAE · Use of English P1 (vocabulario)", CG = "CAE · Use of English P3 (gramática)", CR = "CAE · Reading P5 (opción múltiple)", CL = "CAE · Listening P1 (opción múltiple)", CT = "CAE · Transformaciones P4";

  G(CU, "The proposal was ___ with so many conditions that nobody wanted to accept it.", ["hedged", "hedging", "hedge"], 0, "Participio en pasiva: «hedged» = llena de matices/condiciones.");
  T(CG, "Were it not for her quick thinking, the situation ___ have been far worse.", "Escribe la palabra que falta.", ["would"], "Condicional 3 con «were it not for».");
  G(CU, "The minister tried to ___ the scandal by changing the subject.", ["sidestep", "sidestep with", "sidestepped"], 0, "«sidestep» = eludir un tema.");
  T(CG, "I'd have been happier ___ I taken the other job.", "Escribe la palabra que falta.", ["had"], "«I'd have been» + «had + participio» en lugar de «if I had taken».");
  T(CU, "The company's ___ to innovation has kept it ahead of its rivals.", "Escribe la palabra que falta.", ["commitment"], "Sustantivo «commitment» en singular.");
  G(CG, "Not until the final whistle ___ the fans start to leave.", ["did", "had", "were"], 0, "Inversión tras «Not until»: auxiliar «did».");
  T(CU, "Her argument was so ___ that even her opponents had to agree.", "Escribe la palabra que falta.", ["compelling"], "Adjetivo en -ing para describir el argumento.");
  T(CG, "The data ___ to suggest a link between diet and mood.", "Escribe la palabra que falta.", ["appear"], "«data» con verbo plural en registro formal; aquí «appear».");
  G(CU, "The judge decided to ___ the defendant's request for a retrial.", ["grant", "bestow", "concede to"], 0, "«grant a request» = conceder una petición.");
  G(CG, "Had the manager listened to the warnings, the accident ___ avoided.", ["could have been", "could be", "would be"], 0, "Inversión condicional 3: «could have been avoided».");
  T(CU, "The author's style is ___ and precise, which makes the novel a pleasure to read.", "Escribe la palabra que falta.", ["lucid"], "Adjetivo «lucid» = claro y comprensible.");
  G(CG, "Scarcely had the audience taken their seats ___ the lights dimmed.", ["when", "than", "until"], 0, "«Scarcely had ... when» es la estructura correcta.");
  T(CU, "The new regulations are ___ to tighten control over financial institutions.", "Escribe la palabra que falta.", ["intended"], "«be intended to» = estar destinado a.");
  T(CG, "I'd rather you ___ the matter in private.", "Escribe la palabra que falta.", ["discussed"], "«would rather» + sujeto distinto → pasado simple.");
  G(CU, "The evidence was ___ enough to convince the jury.", ["compelling", "compellingly", "compelled"], 0, "«compelling evidence» = evidencia convincente.");
  T(CG, "She insisted that the report ___ revised before publication.", "Escribe la palabra que falta.", ["be"], "Subjuntivo tras «insist that»: «be».");
  T(CU, "The workers ___ their demands after weeks of negotiation.", "Escribe la palabra que falta.", ["moderated"], "Pasado simple: «moderated» (suavizar).");
  G(CG, "Little ___ the director know that the film would become a classic.", ["did", "had", "was"], 0, "Inversión con «Little» enfático: «Little did ... know».");
  G(CU, "The discovery ___ a new understanding of how the virus spreads.", ["has led to", "has leaded to", "has lead to"], 0, "«lead to» = conducir a; el participio es «led».");
  T(CG, "Hardly ___ the bell rung when the students rushed out.", "Escribe la palabra que falta.", ["had"], "Inversión con «Hardly ... when» en pasado perfecto.");
  G(CU, "She ___ the importance of sleep in her latest book.", ["underscores", "undermines", "overlooks"], 0, "«underscore» = subrayar, destacar.");

  R(CR, "Language change is often condemned by purists, who see new words and grammatical shifts as signs of decline. Linguists, however, point out that every generation has faced the same criticism, and that change is a normal feature of living languages.",
    "What do linguists believe about language change?", ["It signals decline", "It is a normal feature of living languages", "It should be resisted"], 1, "«change is a normal feature of living languages».");
  R(CR, "The town's recent prosperity has come at a cost. Property prices have soared, and many long-standing residents can no longer afford to live near the centre they grew up in.",
    "What is the drawback of the town's prosperity?", ["Crime has increased", "Long-standing residents are being priced out", "The schools have closed"], 1, "«can no longer afford to live near the centre».");
  R(CR, "Critics of the documentary argued that it relied too heavily on a single source. Its director responded that the interviewee had unique access to the events and that she had checked the claims independently.",
    "How did the director defend the documentary?", ["By admitting the source was weak", "By arguing the source had unique access and claims were checked", "By refusing to answer"], 1, "«unique access ... checked the claims independently».");
  R(CR, "Although the experiment appeared to confirm the hypothesis, the researchers were careful not to overstate their findings. They noted that the sample was small and that replication studies would be essential.",
    "Why were the researchers cautious?", ["The experiment had failed", "The sample was small and replication was needed", "They had received no funding"], 1, "«the sample was small ... replication studies would be essential».");
  R(CR, "For a long time, the city's canals were treated as an eyesore, and many were filled in to make room for roads. Today, the same waterways are the focus of a regeneration project that aims to restore them.",
    "How are the canals viewed today?", ["As an eyesore", "As a focus for regeneration", "As roads for traffic"], 1, "«the focus of a regeneration project».");
  R(CR, "The novelist's early work was dismissed by reviewers as overly sentimental. Decades later, however, scholars have reassessed it, and many now regard it as an important precursor to modern realism.",
    "How is the novelist's early work now regarded?", ["As sentimental", "As an important precursor to modern realism", "As forgotten"], 1, "«an important precursor to modern realism».");
  R(CR, "Commuters who switched to cycling reported lower stress levels, yet city planners warn that the benefits depend on safe infrastructure. Without protected lanes, the researchers note, many people would simply return to driving.",
    "According to the researchers, what would keep people cycling?", ["Cheaper bicycles", "Safe, protected cycle lanes", "Shorter working hours"], 1, "«Without protected lanes ... return to driving».");
  R(CR, "The company's chief executive insists that her decision to cut the workforce was painful but unavoidable. Union leaders counter that the cuts were driven by short-term profit rather than genuine necessity.",
    "What do union leaders claim about the cuts?", ["They were unavoidable", "They were driven by short-term profit", "They were agreed with the workers"], 1, "«driven by short-term profit rather than genuine necessity».");
  L(CL, "Woman: I was sceptical about the new software at first, but after a month I can't imagine working without it. Man: It does take a while to get used to it.",
    "How does the woman now feel about the software?", ["She finds it hard to use", "She can't imagine working without it", "She wants to return to the old system"], 1, "«I can't imagine working without it».");
  L(CL, "Presenter: The council's plans have been met with fierce opposition, though supporters argue that without new housing the town will stagnate.",
    "What do supporters of the plans argue?", ["The town will stagnate without new housing", "The plans will reduce housing", "The town is too large"], 0, "«without new housing the town will stagnate».");
  L(CL, "Man: Her resignation came as a complete shock, though in hindsight the warning signs were there. Woman: Yes, she'd been unhappy for months, but nobody took it seriously.",
    "What does the woman imply?", ["Nobody noticed the warning signs", "The resignation was expected by everyone", "She was happy at work"], 0, "«nobody took it seriously» implica que había señales ignoradas.");
  L(CL, "Woman: The trial has been adjourned until next spring, which means the victims will have to wait even longer for a verdict.",
    "What is the effect of the adjournment?", ["The verdict will come sooner", "The victims must wait longer", "The defendant has been released"], 1, "«will have to wait even longer for a verdict».");
  L(CL, "Man: I'm not convinced the new route will ease the traffic. Most of the congestion happens at the junction, not on the road itself.",
    "Where does most congestion happen, according to the man?", ["On the new route", "At the junction", "On the motorway"], 1, "«at the junction, not on the road itself».");
  L(CL, "Girl: The exhibition is beautifully arranged, but the labels are so small that you have to lean in to read them.",
    "What is the girl's main complaint?", ["The arrangement is poor", "The labels are hard to read", "The exhibition is too short"], 1, "«the labels are so small».");
  LT(CL, "Man: What did the board finally decide? Woman: They postponed the vote until they had reviewed the financial projections.",
    "What did the board decide? (escribe en inglés)", ["to postpone the vote", "postpone the vote", "they postponed the vote", "postponed the vote", "to postpone the vote until they had reviewed the financial projections"],
    "Aplazar la votación hasta revisar las proyecciones financieras.");
  LT(CL, "Woman: How much of the budget is going to the new library? Man: Roughly a third, although the council has not confirmed the figure.",
    "What proportion of the budget is going to the library? (escribe en inglés)", ["a third", "one third", "roughly a third", "about a third", "1/3"],
    "«Roughly a third».");
  T(CT, "The plan failed because nobody had checked the figures. (Usa «Had»)", "Had ..., the plan would have succeeded", ["had the figures been checked the plan would have succeeded", "had somebody checked the figures the plan would have succeeded"],
    "Condicional 3 invertido: «Had the figures been checked».");
  T(CT, "I regret not speaking up at the meeting. (Usa «wish»)", "I wish I ...", ["i wish i had spoken up at the meeting"], "«wish» + pasado perfecto para pesar sobre el pasado.");
  T(CT, "It is widely believed that the plan is doomed. (Usa «is widely expected»)", "The plan ...", ["the plan is widely expected to fail", "the plan is widely expected to be doomed"], "Pasiva impersonal: «is widely believed» → «is widely expected to».");
  T(CT, "She was too shy to ask for a raise. (Usa «reluctant»)", "She was ... for a raise", ["she was reluctant to ask for a raise"], "«reluctant to» = reacio a.");
  T(CT, "The government has no intention of raising taxes. (Usa «rule out»)", "The government has ... raising taxes", ["the government has ruled out raising taxes", "the government has ruled out raising taxes."], "«rule out» = descartar.");
  T(CT, "Nobody could have predicted the outcome. (Usa «foresee»)", "The outcome ... foreseen", ["the outcome could not have been foreseen", "the outcome could not be foreseen", "the outcome couldn't have been foreseen"], "Pasiva modal: «could not have been foreseen».");
  T(CT, "The speech was not as persuasive as I had hoped. (Usa «fell short»)", "The speech ... of my expectations", ["the speech fell short of my expectations"], "«fall short of» = quedarse por debajo de.");
  T(CT, "He's so talented that he can do anything. (Usa «capable»)", "He is ... anything", ["he is capable of doing anything"], "«capable of» + -ing.");
  T(CT, "They never imagined that the project would fail. (Usa «inconceivable»)", "It was ... that the project would fail", ["it was inconceivable that the project would fail"], "«inconceivable» = impensable.");
  T(CT, "Although she was exhausted, she kept working. (Usa «despite»)", "... her exhaustion, she kept working", ["despite her exhaustion she kept working", "despite being exhausted she kept working", "despite being exhausted, she kept working"], "«Despite» + sustantivo o -ing.");

  /* ---------- C2 (CPE) ---------- */
  LV = "C2";
  var DU = "CPE · Use of English P1 (vocabulario)", DG = "CPE · Use of English P3 (gramática)", DR = "CPE · Reading P3 (opción múltiple)", DL = "CPE · Listening P1 (opción múltiple)", DT = "CPE · Transformaciones P4";

  T(DU, "The minister's remarks were deliberately ___, leaving the press to speculate.", "Escribe la palabra que falta.", ["ambiguous"], "Adjetivo «ambiguous» como complemento del verbo «were».");
  T(DG, "Such was the ___ of the storm that roads were closed for days.", "Escribe la palabra que falta.", ["ferocity"], "Estructura «such was + sustantivo» enfática.");
  G(DU, "The author ___ the notion that history is inevitable.", ["repudiates", "reputes", "reposes"], 0, "«repudiate» = rechazar una idea.");
  T(DG, "Were he ___ to apologise, the dispute would have ended long ago.", "Escribe la palabra que falta.", ["willing"], "«willing to» = dispuesto a.");
  T(DU, "Her ___ of the facts left the committee with no alternative but to reject the claim.", "Escribe la palabra que falta.", ["mastery"], "Sustantivo «mastery» = dominio profundo.");
  G(DG, "The more closely one examines the evidence, ___ the conclusion seems.", ["the less certain", "less certain", "the least certain"], 0, "Estructura comparativa «the more ..., the less».");
  G(DU, "The negotiations were ___ by a series of misunderstandings.", ["bedevilled", "bedevil", "bedevilling"], 0, "Participio pasivo: «bedevilled» = atormentadas, complicadas.");
  G(DG, "It is imperative that the documents ___ before the deadline.", ["be submitted", "are submitted", "will be submitted"], 0, "Subjuntivo tras «imperative that»: «be submitted».");
  T(DU, "The scientist's ___ to the field was recognised with a prestigious award.", "Escribe la palabra que falta.", ["contribution"], "Sustantivo «contribution» = aportación.");
  G(DG, "Nowhere else ___ such a diversity of cultures.", ["does one find", "one finds", "is there found"], 0, "Inversión tras «Nowhere»: «does one find».");
  G(DU, "The judge ___ the defendant of all charges, citing lack of evidence.", ["acquitted", "absolved from", "forgave"], 0, "«acquit» = absolver en un juicio.");
  T(DG, "I'd sooner you ___ your opinion to yourself than cause an argument.", "Escribe la palabra que falta.", ["kept"], "«would sooner» + sujeto distinto → pasado simple.");
  T(DU, "Her ___ reply ignored the question entirely.", "Escribe la palabra que falta.", ["evasive"], "Adjetivo «evasive» = evasivo.");
  G(DG, "No sooner ___ the contract signed than the company announced its restructuring.", ["was", "had", "is"], 0, "Inversión con «No sooner ... than» en pasiva.");
  T(DU, "The essay was full of ___ arguments that quickly fell apart under scrutiny.", "Escribe la palabra que falta.", ["specious"], "Adjetivo «specious» = aparentemente válido pero falso.");
  G(DG, "Not only ___ the results, but he also explained the methodology.", ["did he publish", "he published", "published he"], 0, "Inversión tras «Not only».");
  T(DU, "The regulator's response was ___ at best, failing to address the core concerns.", "Escribe la palabra que falta.", ["lukewarm"], "Adjetivo «lukewarm» = tibio.");
  G(DG, "Had the board ___ its concerns earlier, the crisis could have been averted.", ["voiced", "voice", "voicing"], 0, "Condicional 3 invertido: «Had ... voiced».");
  T(DU, "The novel ___ the complexities of colonial rule with remarkable subtlety.", "Escribe la palabra que falta.", ["navigates"], "«navigate» = abordar, sortear complejidades.");
  G(DG, "The two rival parties were, ___ to their own admission, equally responsible for the deadlock.", ["according", "accordingly", "accorded"], 0, "«according to» + pronombre posesivo: «according to their own admission».");

  R(DR, "Historians have long debated whether the printing press caused the Reformation or merely accelerated it. The most persuasive recent accounts suggest that the press amplified ideas already circulating, rather than generating them from nothing.",
    "What do the most persuasive recent accounts suggest?", ["The press created the Reformation", "The press amplified existing ideas", "The press had no effect"], 1, "«amplified ideas already circulating».");
  R(DR, "Economists are divided on the merits of the proposed tax. Proponents claim it would curb speculation, while opponents warn that its benefits would be offset by reduced investment and slower growth.",
    "What do opponents of the tax warn?", ["It would curb speculation", "It would reduce investment and slow growth", "It would raise wages"], 1, "«offset by reduced investment and slower growth».");
  R(DR, "The painter's late works, once dismissed as chaotic, are now recognised for their daring use of colour. Curators argue that they anticipated abstraction by decades.",
    "How are the painter's late works now seen?", ["As chaotic", "As daring and anticipating abstraction", "As imitations"], 1, "«anticipated abstraction by decades».");
  R(DR, "Although the treaty was hailed as a breakthrough, its critics noted that enforcement mechanisms were vague. Without clear penalties, they argued, compliance would remain voluntary in practice.",
    "What weakness do critics identify in the treaty?", ["Its signatories are too few", "Its enforcement mechanisms are vague", "It was signed too late"], 1, "«enforcement mechanisms were vague».");
  R(DR, "The orchestra's conductor insists that the piece must be performed without interruption. Some musicians have privately questioned this, arguing that a brief pause would allow the audience to absorb the climax.",
    "What do some musicians suggest?", ["The piece should be shorter", "A brief pause would help the audience", "The conductor should retire"], 1, "«a brief pause would allow the audience to absorb the climax».");
  R(DR, "Archival records suggest that the village was far more prosperous in the eighteenth century than is usually assumed. Its textile workshops supplied several major cities, a fact often overlooked by later chroniclers.",
    "What do the archives reveal about the village?", ["It was poor throughout its history", "It was prosperous and supplied cities", "It had no workshops"], 1, "«textile workshops supplied several major cities».");
  R(DR, "The ethical dilemma, as the philosopher frames it, is not whether to lie but whether a partial truth can ever be morally acceptable. Her answer is a qualified yes, provided no one is materially harmed.",
    "What is the philosopher's position?", ["Lying is always wrong", "Partial truths can be acceptable if no one is harmed", "Truth should never be partial"], 1, "«a qualified yes, provided no one is materially harmed».");
  L(DL, "Man: The committee's decision was hardly surprising, given the tone of the earlier hearings. Woman: True, though I suspect the outcome was settled long before the debate began.",
    "What does the woman suggest about the decision?", ["It was a genuine surprise", "It was settled before the debate", "It was reached by vote"], 1, "«the outcome was settled long before the debate began».");
  L(DL, "Presenter: The author's latest novel has been praised for its restraint, though some reviewers feel that the restraint occasionally shades into coldness.",
    "What is the reviewers' reservation about the novel?", ["It is too emotional", "Its restraint sometimes seems cold", "It is too long"], 1, "«restraint occasionally shades into coldness».");
  L(DL, "Woman: I'm not persuaded by the argument that technology will solve the problem. Man: Perhaps not on its own, but it could certainly make a considerable difference.",
    "What is the man's view of technology?", ["It will solve the problem entirely", "It could make a considerable difference", "It is useless"], 1, "«could certainly make a considerable difference».");
  L(DL, "Man: It's an uncomfortable truth, but the company has known about the defect for years and chose not to act until the lawsuit was filed.",
    "What does the man imply about the company?", ["It acted promptly", "It delayed action until forced to", "It was unaware of the defect"], 1, "«chose not to act until the lawsuit was filed».");
  L(DL, "Woman: Her defence rested almost entirely on the testimony of a single witness, and the jury clearly found it unconvincing.",
    "Why was the defence weak?", ["It had no witnesses", "It depended on one witness the jury doubted", "The defendant pleaded guilty"], 1, "«depended on a single witness ... unconvincing».");
  LT(DL, "Man: What do you think of the proposal? Woman: Ambitious, though I'm not confident the funding will hold up under scrutiny.",
    "What is the woman's concern? (escribe en inglés)", ["the funding", "funding", "the funding won't hold up", "whether the funding will hold up under scrutiny", "the funding under scrutiny"],
    "La financiación podría no aguantar el escrutinio.");
  T(DT, "The chairman has no doubt that the merger will succeed. (Usa «confident»)", "The chairman is ... the merger will succeed", ["the chairman is confident that the merger will succeed"], "«confident that» = confiado en que.");
  T(DT, "It would have been wiser to consult the experts first. (Usa «better»)", "We ... consulted the experts first", ["we would have been better off consulting the experts first", "we would have done better to consult the experts first"], "«would have been better off + -ing» = habría sido mejor.");
  T(DT, "You must never open the file. (Usa «Under no circumstances»)", "Under no circumstances ...", ["under no circumstances should you open the file", "under no circumstances must you open the file"], "Inversión tras expresiones negativas enfáticas.");
  T(DT, "The novel's themes are not easy to grasp. (Usa «elusive»)", "The novel's themes are ...", ["the novel's themes are elusive"], "«elusive» = difícil de captar.");
  T(DT, "Had she been more careful, she wouldn't have made the error. (Usa «had it not been»)", "... she would not have made the error", ["had it not been for her carelessness she would not have made the error", "had she been more careful she would not have made the error"], "Condicional 3 con «had it not been for».");
  T(DT, "He stopped going to the gym because of his injury. (Usa «gave up»)", "He ... going to the gym after his injury", ["he gave up going to the gym after his injury", "he gave up going to the gym because of his injury"], "«give up + -ing» = dejar de hacer algo.");
  T(DT, "The scandal is unlikely to damage his reputation. (Usa «hardly»)", "The scandal will ... damage his reputation", ["the scandal will hardly damage his reputation"], "«hardly» = apenas, casi no.");
  T(DT, "Many experts doubt that the plan will work. (Usa «sceptical»)", "Many experts are ... the plan will work", ["many experts are sceptical that the plan will work", "many experts are sceptical about whether the plan will work"], "«sceptical that / about» = escéptico sobre si.");
  T(DT, "The team did everything it could, but it still lost. (Usa «despite»)", "... everything it could, the team still lost", ["despite doing everything it could the team still lost", "despite doing everything it could, the team still lost"], "«despite + -ing».");


  /* ---------- Ampliación C1 ---------- */
  LV = "C1";
  T(CU, "The rescue team worked ___ through the night, despite the freezing conditions.", "Escribe la palabra que falta.", ["tirelessly"], "Adverbio «tirelessly» modifica al verbo.");
  G(CG, "The witnesses ___ their statements before the case was dismissed.", ["had already given", "already gave", "have already given"], 0, "Pasado perfecto para acción anterior a otra pasada.");
  T(CU, "The new policy has been ___ by critics as a cosmetic change.", "Escribe la palabra que falta.", ["dismissed"], "Participio pasivo «dismissed as» = desestimado como.");
  G(CG, "Were the company to ___ its prices, sales would almost certainly fall.", ["raise", "raises", "raising"], 0, "Inversión condicional con «Were ... to» + base.");
  T(CU, "The diplomat's ___ tone helped to ease the tension in the room.", "Escribe la palabra que falta.", ["conciliatory"], "Adjetivo «conciliatory» = conciliador.");
  T(CG, "It was only after the results ___ published that the scale of the problem became clear.", "Escribe la palabra que falta.", ["were"], "«were» concuerda con «results» (plural).");
  R(CR, "Despite its modest size, the museum houses one of the largest collections of Byzantine textiles in Europe. Staff admit that the building's cramped layout makes it difficult to display more than a fraction of the holdings at any one time.",
    "What problem do the staff mention?", ["The collection is too small", "The layout limits how much can be displayed", "The textiles are damaged"], 1, "«cramped layout makes it difficult to display more».");
  R(CR, "For years, the village was known only for its annual cheese festival. Recently, however, a group of young artists has moved in, and the once-quiet streets now host studios, galleries and late-night music.",
    "What has changed in the village?", ["The cheese festival has been cancelled", "Artists have moved in and brought new activity", "Most residents have left"], 1, "«young artists has moved in ... studios, galleries».");
  R(CR, "Proponents of the reform argue that it will simplify an overly complicated system. Opponents, however, contend that simplification would come at the expense of protections for the most vulnerable.",
    "What do opponents fear?", ["That the system will be too complicated", "That vulnerable people will lose protections", "That the reform will be too expensive"], 1, "«at the expense of protections for the most vulnerable».");
  L(CL, "Woman: We've spent months on this project, and yet the client still isn't satisfied. Man: Perhaps we've been focusing on the wrong thing all along.",
    "What does the man suggest?", ["The client is right", "They have focused on the wrong thing", "The project should be cancelled"], 1, "«focusing on the wrong thing all along».");
  L(CL, "Presenter: Although unemployment has fallen, many of the new jobs are part-time and poorly paid, which has raised concerns about the quality of employment.",
    "What concern has been raised?", ["Unemployment is rising", "The new jobs are poorly paid", "Too few jobs have been created"], 1, "«poorly paid, which has raised concerns».");
  L(CL, "Man: I'd have expected the referee to step in earlier. Woman: He did eventually, but by then the damage had already been done.",
    "What does the woman mean?", ["The referee acted too early", "The referee intervened too late", "The referee never intervened"], 1, "«by then the damage had already been done».");
  LT(CL, "Woman: Why did the team withdraw from the competition? Man: Mainly because of injuries, though financial pressures played a part too.",
    "What were the main reasons? (escribe en inglés)", ["injuries", "because of injuries", "the injuries", "mainly injuries"], "Principalmente lesiones; también presiones económicas.");
  T(CT, "They didn't expect the audience to react so strongly. (Usa «taken aback»)", "The audience's strong reaction ... them", ["the audience's strong reaction took them aback", "the audience's reaction took them aback"], "«take someone aback» = sorprender.");
  T(CT, "The committee is unable to reach a decision. (Usa «deadlock»)", "The committee is ... deadlock", ["the committee is at a deadlock", "the committee is deadlocked"], "«at a deadlock» / «deadlocked» = estancado.");
  T(CT, "He no longer believes in the project. (Usa «disillusioned»)", "He has become ... with the project", ["he has become disillusioned with the project", "he is disillusioned with the project"], "«disillusioned with» = desencantado con.");
  T(CT, "The new findings contradict the earlier research. (Usa «at odds»)", "The new findings are ... with the earlier research", ["the new findings are at odds with the earlier research"], "«at odds with» = en desacuerdo con.");
  T(CT, "Few people had anticipated the change. (Usa «caught»)", "Most people were ... by the change", ["most people were caught off guard by the change", "most people were caught unaware by the change"], "«caught off guard» = pillar desprevenido.");
  T(CT, "The company is planning to expand overseas. (Usa «aim»)", "The company ... expanding overseas", ["the company aims at expanding overseas", "the company aims to expand overseas"], "«aim to» = pretender.");

  /* ---------- Ampliación C2 ---------- */
  LV = "C2";
  G(DU, "The ___ of the new evidence cast serious doubt on the original verdict.", ["emergence", "emergent", "emerge"], 0, "Sustantivo «emergence» como sujeto.");
  T(DG, "Little ___ the scientists realise how far-reaching their discovery would be.", "Escribe la palabra que falta.", ["did"], "Inversión con «Little» enfático.");
  G(DU, "The critics ___ the novel for its lack of ambition.", ["castigated", "castigate", "castigating"], 0, "Pasado simple: «castigated» (criticar duramente).");
  T(DG, "So ___ was the crowd that the police had to close the street.", "Escribe la palabra que falta.", ["dense"], "Estructura «so + adjetivo + was» enfática.");
  T(DU, "His explanation was so ___ that nobody could follow the argument.", "Escribe la palabra que falta.", ["convoluted"], "Adjetivo «convoluted» = enrevesado.");
  G(DG, "Under no circumstances ___ the password be shared with anyone outside the team.", ["should", "would", "could"], 0, "Inversión con «Under no circumstances» + «should».");
  T(DU, "The report was ___ for its meticulous attention to detail.", "Escribe la palabra que falta.", ["commended"], "Participio pasivo «commended for» = elogiado por.");
  G(DG, "Had she realised the consequences, she ___ the decision differently.", ["would have made", "would make", "made"], 0, "Condicional 3 invertido con «Had + sujeto».");
  T(DU, "The mediator ___ a compromise that satisfied neither side entirely.", "Escribe la palabra que falta.", ["brokered"], "Pasado simple: «brokered» = negociar un acuerdo.");
  G(DG, "I'd be grateful if you ___ me know your decision as soon as possible.", ["would let", "let", "will let"], 0, "Fórmula de cortesía: «would be grateful if you would let me know».");
  G(DU, "The minister ___ any responsibility for the failure of the programme.", ["disclaimed", "disclaimer", "disclaiming to"], 0, "Pasado simple: «disclaimed» = negar la responsabilidad.");
  G(DG, "The wealth of the region ___ largely to its natural resources.", ["is attributable", "attributes", "is attributed by"], 0, "Pasiva con «attributable to» = atribuible a.");
  T(DU, "The composer's later symphonies are ___ for their rhythmic complexity.", "Escribe la palabra que falta.", ["noted"], "Participio pasivo «noted for» = conocido por.");
  G(DG, "It was not until the early nineteenth century ___ the theory gained acceptance.", ["that", "when", "which"], 0, "Estructura enfática «It was not until ... that».");
  R(DR, "The inscription, carved in a dialect rarely seen elsewhere, has puzzled scholars for decades. Some argue it is a religious text, while others believe it records a legal agreement between two families.",
    "What is disputed about the inscription?", ["Its age", "Whether it is religious or legal", "Its location"], 1, "«a religious text ... a legal agreement».");
  R(DR, "Few modern critics would defend the poet's later work, which many consider repetitive and self-indulgent. Yet a number of scholars maintain that these very qualities were deliberate, a challenge to the conventions of the age.",
    "What do some scholars argue about the later work?", ["It is simply weak", "Its qualities were deliberate and challenging", "It was written by someone else"], 1, "«these very qualities were deliberate».");
  R(DR, "The company's accounts appeared sound at first glance, but a closer reading revealed that several liabilities had been moved off the balance sheet, rendering the reported profits misleading.",
    "What did a closer reading reveal?", ["The profits were understated", "Liabilities had been hidden, making profits misleading", "The company was about to expand"], 1, "«liabilities had been moved off the balance sheet».");
  L(DL, "Woman: The apology was couched in such careful language that it hardly amounted to an admission of guilt. Man: Exactly, it was calculated to placate without committing to anything.",
    "What do the speakers think of the apology?", ["It was sincere and clear", "It avoided admitting guilt", "It was rejected by the public"], 1, "«hardly amounted to an admission of guilt».");
  L(DL, "Presenter: The archaeologists' claim that the site predates the earliest known settlements remains contested, largely because the dating methods are still under review.",
    "Why is the archaeologists' claim contested?", ["The site has been destroyed", "The dating methods are still under review", "The settlements were never found"], 1, "«the dating methods are still under review».");
  L(DL, "Man: The board's reluctance to commit funds is understandable, but it risks losing the initiative to competitors who are moving faster.",
    "What is the risk the board faces?", ["Overspending", "Losing the initiative to faster competitors", "Being sued"], 1, "«risks losing the initiative to competitors».");
  L(DL, "Woman: I wouldn't describe the film as a masterpiece, but it's certainly more thoughtful than most of what's released these days.",
    "How does the woman judge the film?", ["As a masterpiece", "As more thoughtful than most films", "As disappointing"], 1, "«more thoughtful than most of what's released».");
  LT(DL, "Man: What was the main obstacle to the agreement? Woman: Neither side would concede on the question of jurisdiction.",
    "What was the main obstacle? (escribe en inglés)", ["jurisdiction", "the question of jurisdiction", "the question of jurisdiction.", "disagreement over jurisdiction", "the jurisdiction question"],
    "La jurisdicción.");
  T(DT, "It is possible that the results were manipulated. (Usa «may have»)", "The results ... manipulated", ["the results may have been manipulated", "the results might have been manipulated"], "«may have + participio» = posibilidad en pasado.");
  T(DT, "The team's success was largely due to its coach. (Usa «owed»)", "The team ... its success to its coach", ["the team owed its success to its coach", "the team owes its success to its coach"], "«owe + objeto + to» = deber algo a algo.");
  T(DT, "The lecture was far too technical for most of the audience. (Usa «beyond»)", "The lecture was ... most of the audience", ["the lecture was beyond most of the audience"], "«beyond» = fuera del alcance de.");
  T(DT, "Nobody had foreseen how quickly the crisis would spread. (Usa «foreseen» en pasiva)", "How quickly the crisis would spread ... foreseen", ["how quickly the crisis would spread had not been foreseen", "how quickly the crisis would spread was not foreseen"], "Pasiva con «had not been foreseen».");
  T(DT, "The director refused to comment on the rumours. (Usa «declined»)", "The director ... to comment on the rumours", ["the director declined to comment on the rumours"], "«decline to» = negarse a.");
  T(DT, "It would be a mistake to underestimate their determination. (Usa «underestimate»)", "We should not ... their determination", ["we should not underestimate their determination", "we must not underestimate their determination"], "Forma modal de advertencia.");
  T(DT, "Her ideas were so original that they attracted attention. (Usa «such»)", "Her ideas were ... that they attracted attention", ["her ideas were such original ideas that they attracted attention", "her ideas were so original that they attracted attention"], "Dos formas válidas: «such original ideas» o «so original».");

  EXTRA_ITEMS.push(...out);
})();
/* Pasajes más largos y originales para C1 (CAE) y C2 (CPE), con varias preguntas por texto. */
(function () {
  var out = [];
  function R(level, part, pass, q, o, a, e) { out.push({ level: level, type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  var C1 = "CAE · Reading P5 (opción múltiple)";

  /* ---------- C1 ---------- */
  var p1 = "For most of the twentieth century, the small coastal town of Merrow was known chiefly as a place to pass through. Travellers stopped briefly for fuel and sandwiches on their way to the lakes, and few lingered. That changed when a cluster of former fishing sheds on the harbour was converted into workshops by a group of furniture makers, who soon attracted others: a bookbinder, a glassblower and a small brewery. Within a decade, the town had acquired a reputation for craftsmanship that drew weekend visitors from the city. Longer-standing residents are divided about this. Some welcome the trade and the renewed pride in the high street; others point out that the rising cost of renting a flat has forced several families to leave, and that the new shops cater almost exclusively to visitors. The town council, for its part, has tried to balance these interests by requiring that a share of the harbour units remain available at affordable rents, a policy whose effectiveness remains unproven.";
  R("C1", C1, p1, "According to the passage, what originally made Merrow well known?", ["Its fishing industry", "Its role as a stopping point for travellers", "Its lakes"], 1, "Antes se la conocía sobre todo por ser un lugar de paso.");
  R("C1", C1, p1, "What is the writer's attitude to the council's housing policy?", ["Enthusiastic", "Cautious", "Hostile"], 1, "El texto dice que su eficacia «remains unproven»: actitud prudente.");

  var p2 = "The popular belief that memory works like a recording, faithfully storing experiences for later playback, has been steadily eroded by laboratory research. Psychologists studying recall have shown repeatedly that remembering is an act of reconstruction. Each time a memory is retrieved, it is subtly altered by the circumstances of the retrieval, by what the person has learned since the original event, and even by the questions they are asked. This does not make memory useless. Most of what we recall is broadly accurate, and the mechanism serves a practical purpose: it allows us to extract the meaning of events rather than to store every detail. The difficulty arises when confidence and accuracy come apart. Witnesses can feel entirely certain about details that were in fact suggested to them afterwards, and their certainty is often indistinguishable from the certainty of a correct recollection. For this reason, researchers caution that vividness should never be mistaken for reliability.";
  R("C1", C1, p2, "What does the writer say about the reconstructive nature of memory?", ["It makes memory useless", "It allows us to extract meaning from events", "It only affects children"], 1, "«it allows us to extract the meaning of events».");
  R("C1", C1, p2, "Why should vividness not be trusted as a sign of reliability?", ["Because vivid memories are always false", "Because witnesses can feel certain about suggested details", "Because researchers cannot measure it"], 1, "La certeza puede darse también sobre detalles sugeridos.");

  var p3 = "The decision to build a second airport for the region has divided opinion more sharply than any infrastructure project in a generation. Its backers present it as an inevitable response to a population that has grown faster than the existing facilities can accommodate. Without new capacity, they argue, airlines will simply redirect routes elsewhere, costing the region jobs and investment that are hard to recover. Opponents question the forecasts on which the case rests. Their own analysis suggests that demand has levelled off since the last economic downturn, and that a more modest expansion of the current terminal would meet foreseeable needs at a fraction of the cost. Both sides agree that the environmental impact would be considerable, but they disagree about whether it could be mitigated. An independent review, published last month, concluded that the forecasts were optimistic but not unreasonable, a verdict that each camp has since cited in support of its position.";
  R("C1", C1, p3, "What do opponents of the new airport argue?", ["That demand is still growing rapidly", "That demand has levelled off and expansion would be cheaper", "That the region has no need for air travel"], 1, "Su análisis indica que la demanda se ha estabilizado.");
  R("C1", C1, p3, "What did the independent review conclude?", ["The forecasts were accurate", "The forecasts were optimistic but not unreasonable", "The forecasts were deliberately false"], 1, "«optimistic but not unreasonable».");

  var p4 = "Few objects in the museum's collection provoke as much discussion as a small bronze figure of uncertain date, displayed near the entrance. Curators initially attributed it to a regional workshop of the early medieval period, a conclusion based largely on stylistic comparisons. Subsequent X-ray analysis, however, revealed that the figure had been cast over an earlier core, a technique rarely documented in that region. Some specialists now argue that the piece is a sophisticated later imitation, made to resemble an older work for a private collector. Others counter that the technique was more widespread than the surviving evidence suggests, and that absence of proof is not proof of absence. The museum has declined to revise the label, preferring to present both interpretations side by side, a decision that visitors appear to find more engaging than a definitive answer would be.";
  R("C1", C1, p4, "Why was the figure's date reconsidered?", ["A new owner came forward", "X-ray analysis revealed an unusual casting technique", "Its label was damaged"], 1, "La radiografía mostró una técnica de fundición poco documentada.");
  R("C1", C1, p4, "How has the museum chosen to handle the disagreement?", ["By revising the label to one interpretation", "By presenting both interpretations side by side", "By removing the figure"], 1, "«presenting both interpretations side by side».");

  /* ---------- C2 ---------- */
  var p5 = "The notion that language is a neutral vehicle for thought, merely clothing ideas that exist independently of it, has come under sustained challenge. Anthropologists working among communities with very different grammatical habits have observed that speakers attend to aspects of experience that others routinely ignore. Speakers of languages that require a precise indication of the source of information, for instance, tend to track evidentiality with a care that surprises outsiders. Yet the strongest version of the relativist claim, that language rigidly determines what can be thought, is difficult to sustain. Bilingual speakers can usually express the same idea in either tongue, albeit with differing emphasis, and translators routinely bridge conceptual gaps that were supposed to be insurmountable. The more defensible position, many now argue, is that language does not dictate thought so much as nudge habitual attention in particular directions, a subtle influence that is easy to overstate in either direction.";
  R("C2", "CPE · Reading P3 (opción múltiple)", p5, "What is the 'strongest version' of the relativist claim?", ["That language is a neutral vehicle", "That language rigidly determines what can be thought", "That translation is always impossible"], 1, "Afirma que la lengua determina rígidamente el pensamiento; el texto la considera difícil de sostener.");
  R("C2", "CPE · Reading P3 (opción múltiple)", p5, "What does the writer conclude about the influence of language?", ["It is strong and inescapable", "It is a subtle nudge that is easy to overstate", "It has no effect on attention"], 1, "«a subtle influence that is easy to overstate».");

  var p6 = "Historians of the Industrial Revolution have traditionally emphasised the role of invention, picturing inventors as solitary geniuses whose machines transformed production overnight. Recent scholarship has complicated this picture considerably. Many of the crucial advances were incremental, the product of countless small adjustments by artisans who knew their materials intimately and who often had no formal training. Patents, moreover, were far less significant than is commonly assumed; many innovations were freely copied, and some of the most profitable ones were kept secret rather than protected. What distinguished Britain, on this view, was not a superior supply of geniuses but a dense web of workshops, informal networks and practical know-how that allowed good ideas to be tested, refined and disseminated quickly. The celebrated inventor, in other words, was often less the source of change than its most visible beneficiary.";
  R("C2", "CPE · Reading P3 (opción múltiple)", p6, "According to recent scholarship, what distinguished Britain?", ["A supply of exceptional geniuses", "A dense web of workshops and practical know-how", "Strict patent laws"], 1, "«a dense web of workshops, informal networks and practical know-how».");
  R("C2", "CPE · Reading P3 (opción múltiple)", p6, "What does the writer suggest about celebrated inventors?", ["They were the main cause of change", "They were often more a beneficiary of change than its source", "They always worked alone"], 1, "«less the source of change than its most visible beneficiary».");

  var p7 = "Critics of the cultural institution's latest acquisition have questioned not its artistic merit, which few dispute, but the terms on which it was secured. The work was purchased through an intermediary whose role in the transaction was not disclosed to the board until after the agreement had been signed. Defenders respond that the intermediary's involvement was entirely lawful and that the board was kept informed at every stage of the negotiation. Yet the episode has prompted a broader discussion about transparency that the institution seems ill-prepared to conduct. Its published guidelines, though detailed on conservation, say remarkably little about the disclosure of intermediaries, a gap that critics argue is more revealing than any individual decision. Whether the matter will prompt reform remains to be seen, though the board has promised a review without specifying its scope.";
  R("C2", "CPE · Reading P3 (opción múltiple)", p7, "What, according to critics, is more revealing than any individual decision?", ["The artistic quality of the work", "The guidelines' silence on disclosing intermediaries", "The defenders' response"], 1, "«a gap that critics argue is more revealing than any individual decision».");
  R("C2", "CPE · Reading P3 (opción múltiple)", p7, "What is uncertain about the board's promised review?", ["Whether it will take place", "Its scope", "Who will fund it"], 1, "«without specifying its scope».");

  var p8 = "Ethicists have long debated whether the obligation to help a stranger in distress is stronger when the one who could help is nearby and the cost is trivial. Empirical studies suggest that proximity matters far more than philosophers might like to admit: people are markedly more likely to intervene when the victim is visible and the bystander is alone, and considerably less so in crowds, where each individual assumes that someone else will act. Some have concluded that moral behaviour is largely situational, a product of circumstance rather than character. This inference, however, overlooks a crucial distinction. Situational pressures may determine whether a person acts in a given moment, while character shapes which pressures they notice and how they interpret them. The lesson, then, is less that virtue is illusory than that it must be cultivated in conditions that make its exercise easier.";
  R("C2", "CPE · Reading P3 (opción múltiple)", p8, "What do studies suggest about bystander intervention?", ["Crowds make people more likely to help", "Proximity and being alone increase the likelihood of helping", "Cost is the only factor that matters"], 1, "La gente interviene más si la víctima es visible y está sola.");
  R("C2", "CPE · Reading P3 (opción múltiple)", p8, "What is the writer's main point about virtue?", ["It is an illusion", "It must be cultivated in conditions that make it easier to exercise", "It depends entirely on the situation"], 1, "«it must be cultivated in conditions that make its exercise easier».");

  EXTRA_ITEMS.push(...out);
})();
/* Ejercicios adicionales de todos los niveles (originales, con el formato de cada parte) */
(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  LV = "A1"; var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";
  T(g, "She ___ a doctor.", "Escribe la palabra que falta.", ["is"], "Tercera persona con «be»: is.");
  T(g, "We ___ at home on Sundays.", "Escribe la palabra que falta.", ["are"], "«We» va con «are».");
  G(g, "My brother ___ to school every day.", ["goes", "go", "going"], 0, "Presente simple, tercera persona: goes.");
  T(g, "I don't ___ coffee.", "Escribe la palabra que falta.", ["like"], "Tras «don't» va la forma base.");
  T(g, "___ you have a pen?", "Escribe la palabra que falta.", ["Do"], "Pregunta en presente simple con «you»: Do.");
  RT(r, "Hi, I am Lucía. I am twelve years old. I live in Valencia with my mum, my dad and my dog, Toby.", "How old is Lucía?", ["Twelve"], "Lo dice en la primera frase.");
  R(r, "Tom gets up at seven. He has a shower, eats toast and goes to work by bus.", "How does Tom go to work?", ["By car", "By bus", "On foot"], 1, "«Goes to work by bus».");
  RT(r, "The shop is open from Monday to Saturday, from 9 am to 2 pm. It is closed on Sunday.", "At what time is the shop closed?", ["On Sunday"], "«It is closed on Sunday».");
  R(r, "Sara likes music. She plays the guitar every evening and sings with her friends at weekends.", "What does Sara play?", ["The piano", "The guitar", "The drums"], 1, "«She plays the guitar».");
  R(r, "Dear Ana, I am sorry I cannot come to your party on Friday. I am visiting my grandparents. See you soon! Mark", "Why can't Mark go to the party?", ["He is ill", "He is visiting his grandparents", "He has work"], 1, "Lo explica en la carta.");
  L(l, "Man: I'd like two tickets for the cinema, please. Woman: That's eight euros.", "How much are the tickets?", ["Two euros", "Eight euros", "Ten euros"], 1, "«That's eight euros».");
  LT(l, "Girl: Mum, I'm hungry. Mother: Lunch is at one o'clock.", "What time is lunch?", ["At one"], "«At one o'clock».");
  L(l, "Boy: Do you have a brother? Girl: Yes, I have one brother. He's called Mike.", "What is her brother called?", ["Mark", "Mike", "Matt"], 1, "«He's called Mike».");
  LT(l, "Woman: It's cold today. Man: Take your coat, it's going to rain.", "What should she take?", ["A coat"], "«Take your coat».");
  T(t, "Rewrite: 'She is a teacher.' → 'She works as ___.'", "Usa «works as».", ["a teacher"], "«Works as» + profesión.");
  T(t, "Rewrite: 'It is cold.' → 'The weather is ___.'", "Un adjetivo.", ["cold"], "Adjetivo del tiempo.");
  T(t, "Rewrite: 'I have a car.' → 'I own ___.'", "Un artículo y un sustantivo.", ["a car"], "«Own» equivale a «have» aquí.");
  T(t, "Rewrite: 'He is not tall.' → 'He is ___ tall.'", "Un antónimo de «tall».", ["short"], "«Not tall» equivale a «short».");

  LV = "A2"; g = "A2 · Gramática"; r = "A2 · Lectura"; l = "A2 · Escucha"; t = "A2 · Reformulación";
  T(g, "She ___ to London last summer.", "Escribe la palabra que falta.", ["went"], "Pasado simple con «last summer».");
  G(g, "They are ___ than their cousins.", ["taller", "more tall", "tallest"], 0, "Comparativo corto: taller.");
  G(g, "If it rains, we ___ at home.", ["will stay", "stay", "would stay"], 0, "Condicional 1: «will» + base.");
  T(g, "Let's go ___ the park.", "Escribe la palabra que falta.", ["to"], "«Go to the park».");
  T(g, "I can't ___ the answer.", "Escribe la palabra que falta.", ["remember"], "Tras «can't» va la base.");
  R(r, "Last weekend Ben went camping with his friends. It rained on Saturday, so they stayed in the tent and played cards. On Sunday the sun came out and they went for a swim in the lake.", "What did they do on Saturday?", ["Went for a swim", "Played cards in the tent", "Went shopping"], 1, "«They stayed in the tent and played cards».");
  R(r, "Our new café opens at 7 am and closes at 6 pm. We serve breakfast, lunch and cakes. Dogs are welcome, but please keep them on a lead.", "Can you bring a dog?", ["Yes, if it is on a lead", "No, never", "Only at night"], 0, "«Dogs are welcome, but please keep them on a lead».");
  R(r, "Maria has worked at the hospital for ten years. She started as a nurse and is now the head of her department.", "What is Maria's job now?", ["A nurse", "The head of a department", "A doctor"], 1, "«Is now the head of her department».");
  R(r, "Please note: the library will be closed next Monday for maintenance. Books can be returned to the box at the entrance.", "What should you do with books on Monday?", ["Return them to the box at the entrance", "Keep them until Tuesday", "Leave them at home"], 0, "Lo indica el aviso.");
  R(r, "Tom hates getting up early, but he loves the morning. He goes running before work because the streets are quiet.", "Why does Tom run in the morning?", ["Because he has no work", "Because the streets are quiet", "Because he is training for a race"], 1, "«Because the streets are quiet».");
  L(l, "Man: Hi, Sarah. Are you coming to the party on Saturday? Woman: I'd love to, but I have to work until six.", "When does the party take place?", ["Friday", "Saturday", "Sunday"], 1, "«The party on Saturday».");
  LT(l, "Woman: How much is a train ticket to Bristol? Man: Twenty pounds return.", "How much does the return ticket cost?", ["Twenty pounds"], "«Twenty pounds return».");
  L(l, "Man: We're going to the beach tomorrow if the weather is nice. Woman: Let's check the forecast tonight.", "What will they do if the weather is nice?", ["Stay at home", "Go to the beach", "Check the forecast tomorrow"], 1, "«Going to the beach tomorrow».");
  L(l, "Woman: The meeting has moved from ten to eleven. Man: Thanks, I'll tell the others.", "What has changed?", ["The place", "The time", "The date"], 1, "De las diez a las once.");
  T(t, "Rewrite: 'It's a long time since I saw you.' → 'I ___ you for a long time.'", "Present perfect negativo.", ["haven't seen", "have not seen", "havent seen"], "«I haven't seen you for a long time».");
  T(t, "Rewrite: 'Sorry, I'm late.' → 'I'm sorry I ___.'", "Forma de «be».", ["am late", "'m late", "m late"], "«I'm sorry I am late».");
  T(t, "Rewrite: 'He started to work here in 2015.' → 'He has ___ here since 2015.'", "Present perfect de «work».", ["worked", "been working"], "«He has worked here since 2015».");
  T(t, "Rewrite: 'The film was not as good as the book.' → 'The book was ___ than the film.'", "Comparativo irregular de «good».", ["better"], "«Better» es el comparativo de «good».");

  LV = "B1"; g = "B1 · Gramática"; r = "B1 · Lectura"; l = "B1 · Escucha"; t = "B1 · Reformulación";
  G(g, "If I ___ rich, I would travel the world.", ["were", "had been", "will be"], 0, "Condicional 2: «were» o «was».");
  T(g, "She suggested ___ to the theatre.", "Escribe la palabra que falta.", ["going"], "«Suggest» va con -ing.");
  G(g, "The report ___ by the time the manager came.", ["had been finished", "was finished", "has finished"], 0, "Pasado perfecto pasivo.");
  T(g, "I wish I ___ more time to study.", "Escribe la palabra que falta.", ["had"], "«Wish» + pasado.");
  G(g, "He is the man ___ car was stolen.", ["whose", "which", "who"], 0, "Posesivo relativo: «whose».");
  T(g, "You ___ wear a seatbelt; it's the law.", "Escribe la palabra que falta.", ["must"], "Obligación fuerte.");
  RT(r, "Many people think that learning a language is only useful for work. However, studies show that bilingual people often find it easier to concentrate and solve problems.", "According to the text, what is an advantage of being bilingual?", ["Better concentration"], "«Find it easier to concentrate».");
  R(r, "The council has decided to close the old swimming pool. Local residents have criticised the decision, arguing that the area needs more sports facilities for young people.", "What do residents think?", ["The decision is good", "The decision is criticised", "They are happy about it"], 1, "«Have criticised the decision».");
  R(r, "Although the film received mixed reviews from critics, it was a huge success with audiences, who praised its humour and music.", "How did audiences react?", ["They disliked it", "They praised it", "They ignored it"], 1, "«Audiences praised its humour».");
  R(r, "The company plans to reduce its use of plastic by half within five years. It will start by replacing plastic bags with paper ones in all its shops.", "What will the company do first?", ["Close its shops", "Replace plastic bags with paper ones", "Hire new staff"], 1, "«It will start by replacing».");
  R(r, "Jane had never liked cooking, but after taking a course last year, she now prepares dinner for her family every evening.", "What has changed for Jane?", ["She now enjoys cooking", "She has stopped cooking", "She has moved abroad"], 0, "Deducción: ahora cocina cada noche.");
  L(l, "Woman: The train to Leeds has been cancelled because of the snow. The next one leaves at four.", "Why was the train cancelled?", ["Because of snow", "Because of a strike", "Because of a delay"], 0, "«Because of the snow».");
  L(l, "Man: I've booked a table for two at eight, but the restaurant has asked us to arrive fifteen minutes early.", "What does the restaurant ask?", ["To arrive early", "To book again", "To pay in advance"], 0, "«Arrive fifteen minutes early».");
  L(l, "Woman: I think we should take the car. The bus takes ages on Sundays.", "Why does she prefer the car?", ["It's cheaper", "The bus is slow on Sundays", "She has no money"], 1, "«The bus takes ages on Sundays».");
  L(l, "Man: The course is free, but you need to bring your own laptop and sign up before Friday.", "What must participants bring?", ["Their own laptop", "Money", "A friend"], 0, "«Bring your own laptop».");
  L(l, "Woman: Honestly, I'm not sure the new software will help. It looks complicated and the staff haven't been trained.", "What is the woman's opinion?", ["She is confident it will help", "She doubts it will help", "She wants to buy it"], 1, "Inferencia: duda de su utilidad.");
  T(t, "Rewrite: 'Don't forget to lock the door.' → 'Remember ___ the door.'", "«Remember» + infinitivo para algo pendiente.", ["to lock"], "«Remember to lock the door».");
  T(t, "Rewrite: 'I'm sure he took the money.' → 'He ___ the money.'", "Deducción en pasado: «must have» + participio.", ["must have taken"], "«He must have taken the money».");
  T(t, "Rewrite: 'It's a pity we didn't win.' → 'If only we ___.'", "«If only» con pasado perfecto.", ["had won"], "«If only we had won».");
  T(t, "Rewrite: 'She is too young to drive.' → 'She is ___ to drive.'", "«Not» + adjetivo + «enough».", ["not old enough"], "«Not old enough» equivale a «too young».");

  LV = "B2"; g = "B2 · Gramática"; r = "B2 · Lectura"; l = "B2 · Escucha"; t = "B2 · Reformulación";
  G(g, "Had I known about the traffic, I ___ earlier.", ["would have left", "would leave", "left"], 0, "Condicional 3 con inversión.");
  G(g, "The results, ___ were announced yesterday, surprised everyone.", ["which", "who", "whom"], 0, "Relativa explicativa con cosas: «which».");
  T(g, "She denied ___ the window.", "Escribe la palabra que falta.", ["breaking"], "«Deny» va con -ing.");
  G(g, "By next year, I ___ here for a decade.", ["will have worked", "will work", "work"], 0, "Futuro perfecto para duración.");
  G(g, "No sooner ___ home than the phone rang.", ["had she got", "she had got", "she got"], 0, "Inversión tras «no sooner».");
  T(g, "The package should ___ by Friday.", "Escribe la palabra que falta.", ["arrive"], "Tras «should» va la base.");
  R(r, "Researchers have found that short naps can improve memory, but longer ones may leave people feeling groggy. The ideal nap, they suggest, lasts about twenty minutes.", "What length of nap do researchers recommend?", ["Twenty minutes", "Two hours", "Five minutes"], 0, "«The ideal nap lasts about twenty minutes».");
  R(r, "The museum's new wing, which opened last month, is funded entirely by private donors. Critics argue this gives wealthy supporters too much influence over the collection.", "What is the critics' concern?", ["The wing is too small", "Donors may have too much influence", "The museum is closing"], 1, "«Too much influence over the collection».");
  R(r, "Despite the government's assurances, many small farmers remain sceptical about the new subsidies, which they claim are too complicated to apply for.", "What do many small farmers think about the subsidies?", ["They are too simple", "They are too complicated", "They are generous"], 1, "«Too complicated to apply for».");
  R(r, "Working from home has blurred the line between professional and personal life for many employees, who now find it hard to switch off after hours.", "What problem does the text describe?", ["Difficulty separating work and personal life", "Lack of internet access", "Low salaries"], 0, "«Blurred the line».");
  RT(r, "The festival attracted record crowds this year, but organisers admit that transport links were inadequate, causing long delays for visitors.", "What was the main problem?", ["Poor transport"], "«Transport links were inadequate».");
  LT(l, "Presenter: Our guest argues that cities should invest in bicycle lanes rather than new motorways, because they reduce pollution and improve public health.", "What does the guest recommend?", ["Bicycle lanes"], "«Invest in bicycle lanes».");
  L(l, "Man: I'd have applied for the job if I'd known it was going to be so flexible.", "What does the man regret?", ["Not applying for the job", "Applying for the job", "Leaving his job"], 0, "Condicional 3: no solicitó el puesto.");
  L(l, "Woman: The report isn't wrong exactly, but it leaves out the cost of maintenance, which is substantial.", "What does the woman say about the report?", ["It is completely wrong", "It is incomplete", "It is too expensive"], 1, "«Leaves out the cost of maintenance».");
  L(l, "Man: Apparently the old factory will be converted into flats, although the council hasn't confirmed it yet.", "What is the status of the plan?", ["Confirmed", "Not yet confirmed", "Cancelled"], 1, "«Hasn't confirmed it yet».");
  L(l, "Woman: Hardly anyone turned up to the workshop, which was disappointing given how much effort went into it.", "How did the woman feel about attendance?", ["Pleased", "Disappointed", "Indifferent"], 1, "«Which was disappointing».");
  T(t, "Rewrite: 'I'm not sure whether she will come.' → 'I'm not sure ___ she will come.'", "Dos palabras válidas.", ["if", "whether"], "«Not sure if» o «whether».");
  T(t, "Rewrite: 'Although it was raining, we went out.' → 'Despite ___, we went out.'", "«Despite» + sustantivo o -ing.", ["the rain", "it raining"], "«Despite the rain».");
  T(t, "Rewrite: 'The teacher explained the rule, and then we understood it.' → 'Once ___, we understood it.'", "«Once» + pasado.", ["the teacher had explained the rule", "the teacher explained the rule"], "«Once the teacher explained the rule».");

  LV = "C1"; g = "C1 · Gramática"; r = "C1 · Lectura"; l = "C1 · Escucha"; t = "C1 · Reformulación";
  G(g, "Not only ___ the exam, but she also got top marks.", ["did she pass", "she passed", "she did pass"], 0, "Inversión tras «not only».");
  G(g, "I'd rather you ___ mention it to anyone.", ["didn't", "don't", "won't"], 0, "«Would rather» + pasado.");
  T(g, "The proposal, ___ criticised by many, was eventually approved.", "Escribe la palabra que falta.", ["though"], "«Though» con participio.");
  G(g, "Scarcely ___ the room when the lights went out.", ["had we entered", "we had entered", "did we enter"], 0, "Inversión con «scarcely had».");
  T(g, "The rules ___ be applied consistently.", "Escribe la palabra que falta.", ["must"], "Obligación en voz pasiva.");
  G(g, "He is said ___ the company for ten years.", ["to have run", "to run", "having run"], 0, "«Is said to have» + participio.");
  R(r, "The author contends that the decline of local newspapers has weakened civic engagement, since fewer citizens now follow the decisions of their councils.", "According to the author, what has resulted from the decline of local newspapers?", ["Greater civic engagement", "Weaker civic engagement", "More council decisions"], 1, "«Has weakened civic engagement».");
  R(r, "Far from being a mere fashion, minimalism is presented here as a deliberate response to consumer excess and the anxieties it generates.", "How is minimalism presented?", ["As a passing trend", "As a deliberate response to excess", "As a cause of anxiety"], 1, "«A deliberate response to consumer excess».");
  R(r, "Her critics dismissed the findings as anecdotal, yet the sample, though small, was carefully selected to represent the population.", "How does the author describe the sample?", ["Random and large", "Small but carefully chosen", "Biased and unreliable"], 1, "«Small... carefully selected».");
  R(r, "The essay's ironic tone, rarely sustained for long, gives way in the final paragraph to a surprisingly earnest appeal for compassion.", "What happens in the final paragraph?", ["The irony increases", "The tone becomes sincerely appealing", "The author apologises"], 1, "«Gives way to a surprisingly earnest appeal».");
  R(r, "Historians have long debated the causes of the revolution, though most now agree that economic hardship was a catalyst rather than the sole cause.", "What do most historians now agree on?", ["Economic hardship was the only cause", "Economic hardship was a catalyst rather than the sole cause", "There was no economic cause"], 1, "«A catalyst rather than the sole cause».");
  LT(l, "Man: The committee has reviewed the evidence, but it stopped short of recommending a ban, preferring stricter labelling.", "What did the committee decide?", ["Stricter labelling"], "«Preferring stricter labelling».");
  L(l, "Woman: I wouldn't go so far as to call it a success. Attendance was respectable, but the outcomes were modest.", "What is the woman's assessment?", ["A clear success", "Modest, though respectable", "A complete failure"], 1, "«Outcomes were modest».");
  L(l, "Man: They'll have to rethink the strategy; the current one simply doesn't account for rising costs.", "Why must the strategy be reconsidered?", ["It ignores rising costs", "It is too expensive to implement", "It has already succeeded"], 0, "«Doesn't account for rising costs».");
  L(l, "Woman: Had the board acted sooner, the losses might have been contained.", "What does the speaker imply?", ["The board acted quickly enough", "The board's delay made losses worse", "The losses were unavoidable"], 1, "Condicional 3: no actuó pronto.");
  L(l, "Man: Her argument hinges on a single assumption, which, frankly, I find hard to accept.", "What does the speaker think of the argument?", ["It is entirely convincing", "It depends on a doubtful assumption", "It has no assumptions"], 1, "«Hard to accept».");
  T(t, "Rewrite: 'It is possible that he has forgotten the meeting.' → 'He ___ the meeting.'", "Posibilidad en pasado.", ["may have forgotten", "might have forgotten"], "«He may have forgotten the meeting».");
  T(t, "Rewrite: 'Nobody else had ever attempted such a difficult climb.' → 'Never ___ such a difficult climb.'", "Inversión con «never».", ["had anyone attempted"], "«Never had anyone attempted».");
  T(t, "Rewrite: 'The decision was made without consulting the staff.' → 'The staff ___ before the decision was made.'", "Voz pasiva.", ["were not consulted", "weren't consulted"], "«Were not consulted».");
  T(t, "Rewrite: 'Although the plan was risky, they approved it.' → 'Despite ___, they approved it.'", "«Despite» + sustantivo.", ["the risks", "the risk"], "«Despite the risks».");

  LV = "C2"; g = "C2 · Gramática"; r = "C2 · Lectura"; l = "C2 · Escucha"; t = "C2 · Reformulación";
  G(g, "Were it not ___ your help, we would have failed.", ["for", "of", "to"], 0, "«But for» / «were it not for».");
  T(g, "He insisted that the document ___ signed immediately.", "Escribe la palabra que falta.", ["be"], "Subjuntivo tras «insist».");
  G(g, "___ the evidence was overwhelming, the jury took three days to decide.", ["Although", "Because", "Unless"], 0, "Concesión.");
  G(g, "The data, ___ collected over a decade, reveal a clear trend.", ["having been", "being", "been"], 0, "Participio perfecto pasivo.");
  T(g, "I'd sooner ___ the truth than lie.", "Escribe la palabra que falta.", ["tell"], "«Would sooner» + base.");
  R(r, "The argument, though ostensibly about economics, is at heart a meditation on what it means to belong to a community.", "What is the argument really about?", ["Economic policy", "Belonging to a community", "International trade"], 1, "«At heart a meditation on... belong».");
  R(r, "Her prose is at once lucid and oblique: the reader is never lost, yet rarely given the comfort of a direct statement.", "How is her prose described?", ["Clear but indirect", "Confusing and dense", "Blunt and simple"], 0, "«Lucid and oblique».");
  R(r, "The committee's report, couched in the bland language of bureaucracy, nonetheless carries a damning implication about the department's conduct.", "What does the report imply?", ["The department acted properly", "The department's conduct is questionable", "The report is blank"], 1, "«A damning implication».");
  R(r, "Few critics dared challenge the novel's premise, so entrenched was the consensus that it represented a masterpiece.", "What was the critics' attitude?", ["They challenged it openly", "They were reluctant to challenge it", "They called it a failure"], 1, "«Few critics dared challenge».");
  R(r, "What begins as a whimsical tale gradually darkens, until the reader realises that the playfulness was a mask for something far more unsettling.", "How does the tale develop?", ["It becomes more cheerful", "It grows darker and more unsettling", "It ends happily"], 1, "«Gradually darkens».");
  L(l, "Woman: I'm not persuaded that the policy will achieve its aims, though I accept the intentions behind it.", "What is the speaker's position?", ["Full support", "Doubtful of results but sympathetic to aims", "Opposed to intentions"], 1, "«Not persuaded... accept the intentions».");
  L(l, "Man: Frankly, the results speak for themselves, although one might quibble over the methodology.", "What does the speaker concede?", ["The methodology is flawless", "Some methodological doubts exist", "The results are unclear"], 1, "«One might quibble over the methodology».");
  L(l, "Woman: To describe him as reluctant would be an understatement; he was positively hostile.", "How did he feel?", ["Eager", "Strongly opposed", "Mildly interested"], 1, "«Positively hostile».");
  L(l, "Man: The verdict, while technically sound, sits uneasily with the public's sense of fairness.", "What is implied about the verdict?", ["Public trusts it fully", "It may not feel fair to the public", "It was unanimous"], 1, "«Sits uneasily with».");
  L(l, "Woman: I'd hesitate to draw conclusions from a sample of twelve.", "What does she think of the sample?", ["It's large enough", "It's too small to conclude", "It's perfect"], 1, "«Hesitate to draw conclusions».");
  T(t, "Rewrite: 'It is unlikely that the deal will go ahead.' → 'The deal ___ go ahead.'", "Probabilidad con «to».", ["is unlikely to", "is not likely to"], "«Is unlikely to go ahead».");
  T(t, "Rewrite: 'He regrets not having studied harder.' → 'He wishes he ___ harder.'", "«Wish» + pasado perfecto.", ["had studied"], "«He wishes he had studied harder».");
  T(t, "Rewrite: 'She improved as she practised more.' → 'The more she practised, ___ she became.'", "Comparativo doble: «the more..., the better».", ["the better"], "«The more she practised, the better she became».");
  T(t, "Rewrite: 'Only after the meeting did I realise my mistake.' → 'It was ___ the meeting that I realised my mistake.'", "Expresión de tiempo con «not».", ["not until", "only after"], "«It was not until the meeting...».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";

  T(g, "The students ___ from Spain.", "Escribe la palabra que falta.", ["are"], "«They» va con «are».");
  G(g, "I ___ hungry now.", ["am", "is", "are"], 0, "«I» va con «am».");
  T(g, "Peter ___ English very well.", "Escribe la palabra que falta.", ["speaks"], "Tercera persona: speaks.");
  T(g, "My sister ___ her homework after dinner.", "Escribe la palabra que falta.", ["does"], "«Does» con tercera persona.");
  G(g, "We ___ go to the cinema on Fridays.", ["don't", "doesn't", "isn't"], 0, "Negativa con «we»: don't.");
  T(g, "___ is your teacher's name?", "Escribe la palabra que falta.", ["What"], "«What» pregunta por un nombre.");
  G(g, "There ___ two apples in the bowl.", ["are", "is", "be"], 0, "Plural: there are.");
  T(g, "She has ___ umbrella.", "Escribe la palabra que falta.", ["an"], "Delante de vocal se usa «an».");
  T(g, "I ___ got a new bike last week.", "Escribe la palabra que falta.", ["have"], "«I» con «have»; el verbo auxiliar del present perfect.");
  G(g, "The children are ___ in the park.", ["playing", "play", "played"], 0, "Presente continuo: playing.");
  T(g, "My father ___ TV every evening.", "Escribe la palabra que falta.", ["watches"], "Presente simple: watches.");
  T(g, "___ the window, please.", "Escribe la palabra que falta.", ["Close"], "Imperativo: forma base del verbo.");
  G(g, "He can ___ very fast.", ["run", "runs", "running"], 0, "Tras modal va la forma base.");
  T(g, "This is ___ book.", "Escribe la palabra que falta.", ["my"], "Posesivo: my.");
  G(g, "We ___ lunch at half past one.", ["have", "has", "are"], 0, "«We» con «have».");

  R(r, "My name is Ben. I have a small flat in London. It has two bedrooms, a kitchen and a living room. I like it a lot.", "How many bedrooms does Ben's flat have?", ["One", "Two", "Three"], 1, "«It has two bedrooms».");
  RT(r, "Anna wakes up at six thirty. She runs for twenty minutes and then has a cold shower.", "What does Anna do after waking up?", ["She runs"], "«She runs for twenty minutes».");
  R(r, "The bus to the beach leaves at ten. Please arrive at the bus stop at quarter to ten. Do not be late!", "What time should you arrive at the bus stop?", ["At ten", "At quarter to ten", "At nine"], 1, "«At quarter to ten».");
  R(r, "Mike has a dog called Max. Max is brown and likes to play with a red ball in the garden.", "What colour is Max?", ["Black", "White", "Brown"], 2, "«Max is brown».");
  RT(r, "Hello! My favourite food is pizza. I eat it on Saturdays with my family. My sister likes pasta more.", "What does the writer eat on Saturdays?", ["Pizza"], "«I eat it on Saturdays».");
  R(r, "Lucy works in a bakery. She starts work at seven in the morning. She finishes at two in the afternoon.", "What time does Lucy finish work?", ["At seven", "At two", "At six"], 1, "«She finishes at two».");
  RT(r, "Our school has a big library. Students can borrow books for two weeks. The library is open every day except Sunday.", "On which day is the library shut?", ["On Sunday"], "«Except Sunday».");
  R(r, "Tom is tall and thin. He has short black hair and blue eyes. He wears glasses when he reads.", "What colour are Tom's eyes?", ["Green", "Brown", "Blue"], 2, "«Blue eyes».");
  R(r, "Today it is sunny and warm. Yesterday it was cold and it rained all day. Tomorrow it will be windy.", "What was the weather like yesterday?", ["Sunny", "Cold and rainy", "Windy"], 1, "«It was cold and it rained».");
  R(r, "Maria goes shopping on Thursdays. She buys bread, milk and eggs. She pays with a card.", "How does Maria pay?", ["With cash", "With a card", "With a cheque"], 1, "«She pays with a card».");
  RT(r, "Dear Sam, thank you for the lovely gift. I love the blue scarf. See you at the weekend. Love, Clara.", "What did Sam give Clara?", ["A scarf"], "Ella dice que le encanta la bufanda.");
  R(r, "Our classroom has twenty chairs and four tables. There is a board at the front and a clock on the wall.", "How many tables are there?", ["Two", "Four", "Twenty"], 1, "«Four tables».");
  R(r, "Paul likes football. He plays on Sundays with his friends in the park near his house.", "Where does Paul play football?", ["At school", "In the park", "At home"], 1, "«In the park near his house».");
  RT(r, "The café opens at eight. It serves coffee, tea and cakes. It closes at six in the evening.", "What does the café close at?", ["Six"], "«It closes at six in the evening».");
  R(r, "Julia is from Italy, but she lives in Spain now. She speaks Italian, Spanish and a little English.", "Where does Julia live now?", ["Italy", "Spain", "England"], 1, "«She lives in Spain now».");

  L(l, "Woman: Excuse me, where is the station? Man: Go straight on and turn left at the bank.", "Where should she turn?", ["Right at the bank", "Left at the bank", "Straight on"], 1, "«Turn left at the bank».");
  L(l, "Boy: What time is it? Girl: It's quarter past three.", "What time is it according to the girl?", ["Three o'clock", "Quarter past three", "Half past three"], 1, "«Quarter past three».");
  L(l, "Man: Do you want tea or coffee? Woman: Coffee, please, with no sugar.", "What does the woman want?", ["Tea with sugar", "Coffee without sugar", "Tea without sugar"], 1, "«Coffee, please, with no sugar».");
  LT(l, "Girl: How much is this jacket? Shop assistant: It's twenty-five pounds.", "How much is the jacket?", ["Twenty-five pounds"], "«Twenty-five pounds».");
  L(l, "Mum: Where are your shoes? Son: They are under the bed.", "Where are the shoes?", ["In the car", "Under the bed", "On the table"], 1, "«Under the bed».");
  L(l, "Man: Happy birthday, Anna! Woman: Thank you! I am thirty today.", "How old is Anna today?", ["Thirteen", "Thirty", "Forty"], 1, "«I am thirty today».");
  LT(l, "Teacher: Open your books at page ten. Students: Yes, teacher.", "What page should students open?", ["Page ten"], "«Page ten».");
  L(l, "Woman: Is the bank open on Sunday? Man: No, it is closed on Sundays.", "Is the bank open on Sunday?", ["Yes", "No"], 1, "«It is closed on Sundays».");
  L(l, "Boy: I'm going to the park. Dad: Take your jacket, it's windy.", "Why should the boy take his jacket?", ["It is cold and windy", "It is hot", "It is raining"], 0, "«It's windy».");
  LT(l, "Girl: Do you like pizza? Boy: Yes, but I like pasta more.", "What does the boy like more?", ["Pasta"], "«I like pasta more».");
  L(l, "Man: Where do you work? Woman: I work in a hospital. I am a nurse.", "What is the woman's job?", ["Doctor", "Nurse", "Teacher"], 1, "«I am a nurse».");
  L(l, "Girl: Can I have a glass of water, please? Waiter: Of course. Here you are.", "What does the girl ask for?", ["A glass of water", "A cup of tea", "A piece of cake"], 0, "«A glass of water».");
  LT(l, "Mum: Are you ready? Son: Not yet. I need five more minutes.", "How much more time does the son need?", ["Five minutes"], "«Five more minutes».");
  L(l, "Man: How many brothers do you have? Girl: I have two brothers and one sister.", "How many sisters does the girl have?", ["None", "One", "Two"], 1, "«One sister».");
  LT(l, "Woman: Let's meet at the cinema at seven. Man: OK, see you there.", "What time do they meet?", ["Seven"], "«At seven».");

  T(t, "Rewrite: 'Ana is not at home.' → 'Ana is ___.'", "Lugar contrario a «at home».", ["out", "out of the house", "away"], "«Ana is out»: no está en casa.");
  T(t, "Rewrite: 'I like football and tennis.' → 'I like ___ tennis.'", "Conjunción que une dos cosas.", ["and", "and also"], "«And» une dos elementos.");
  T(t, "Rewrite: 'It is very big.' → 'It is ___.'", "Un adjetivo opuesto a «small».", ["large", "huge", "enormous"], "Sinónimos de «big».");
  T(t, "Rewrite: 'He is a student.' → 'He ___ at university.'", "Verbo de estudiar.", ["studies", "is studying"], "«He studies at university».");
  T(t, "Rewrite: 'We have lunch at one.' → 'Our lunch is ___ one.'", "Preposición de hora.", ["at", "at about"], "«At one».");
  T(t, "Rewrite: 'My bag is heavy.' → 'My bag is not ___.'", "Adjetivo contrario a «heavy».", ["light"], "Opuesto de «heavy».");
  T(t, "Rewrite: 'She can swim.' → 'She is ___ swim.'", "Capacidad: «able to».", ["able to"], "«Able to» equivale a «can».");
  T(t, "Rewrite: 'It is sunny today.' → 'Today ___ sunny.'", "Verbo «to be» en presente.", ["is", "it's"], "«Today is sunny».");
  T(t, "Rewrite: 'I eat breakfast at eight.' → 'I have breakfast ___ eight.'", "Preposición de hora.", ["at"], "«At eight».");
  T(t, "Rewrite: 'Peter is taller than me.' → 'I am ___ than Peter.'", "Comparativo contrario.", ["shorter"], "«Shorter» es el opuesto.");
  T(t, "Rewrite: 'The shop is closed.' → 'The shop is ___.'", "Estado contrario a «closed».", ["open"], "Opuesto de «closed».");
  T(t, "Rewrite: 'They are playing football.' → 'They ___ football now.'", "Presente continuo.", ["are playing"], "Presente continuo con «are».");
  T(t, "Rewrite: 'My house is near the park.' → 'The park is ___ my house.'", "Preposición de cercanía.", ["near", "close to"], "«Near» o «close to».");
  T(t, "Rewrite: 'I do not like cold weather.' → 'I ___ cold weather.'", "Verbo de gustar en positivo.", ["like", "love", "enjoy"], "Positivo de «do not like».");
  T(t, "Rewrite: 'He is my brother.' → 'He is ___ brother.'", "Posesivo de «my»: «our» o «your» según quién hable.", ["my"], "Repetir «my».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";

  T(g, "Maria ___ a red car.", "Escribe la palabra que falta.", ["has"], "Tercera persona de «have»: has.");
  T(g, "___ your parents work in a school?", "Escribe la palabra que falta.", ["Do"], "«Your parents» es plural: Do.");
  G(g, "I usually ___ to work by bike.", ["go", "goes", "going"], 0, "Presente simple con «I»: go.");
  T(g, "She is ___ at the bus stop now.", "Escribe la palabra que falta.", ["waiting"], "Presente continuo: waiting.");
  T(g, "They ___ like spicy food.", "Escribe la palabra que falta.", ["don't"], "«They» con «don't».");
  G(g, "How ___ brothers do you have?", ["many", "much", "old"], 0, "Contables: how many.");
  T(g, "This shirt is ___ than that one.", "Escribe la palabra que falta.", ["cheaper"], "Comparativo corto: cheaper.");
  G(g, "He ___ born in 1990.", ["was", "is", "were"], 0, "Pasado de «be» con «he»: was.");
  T(g, "We ___ dinner at home last night.", "Escribe la palabra que falta.", ["had"], "Pasado de «have»: had.");
  T(g, "Please ___ your hands before eating.", "Escribe la palabra que falta.", ["wash"], "Imperativo: forma base.");
  G(g, "Ben and Tom are ___ friends.", ["good", "well", "goods"], 0, "Adjetivo delante de sustantivo: good.");
  T(g, "I ___ see you tomorrow!", "Escribe la palabra que falta.", ["will"], "Futuro con «will».");
  T(g, "The shop ___ at nine every morning.", "Escribe la palabra que falta.", ["opens"], "Tercera persona: opens.");
  G(g, "There isn't ___ milk in the fridge.", ["any", "some", "a"], 0, "En negativa se usa «any».");
  G(g, "___ a good film last night?", ["Was there", "Were there", "Is there"], 0, "Pasado: «was there».");

  RT(r, "Carlos is a waiter in a small restaurant. He works five days a week. On Mondays and Tuesdays he does not work.", "How many days a week does Carlos work?", ["Five"], "«He works five days a week».");
  R(r, "Our holiday was great! We went to the beach every day and swam in the sea. The weather was hot and sunny.", "How was the weather on holiday?", ["Cold", "Rainy", "Hot and sunny"], 2, "«Hot and sunny».");
  R(r, "Sophie has a new phone. It is black and very light. She uses it to take photos of her cat.", "What does Sophie use her phone for?", ["To call her friends", "To take photos of her cat", "To play games"], 1, "«To take photos of her cat».");
  R(r, "The museum is open from ten to six. Tickets cost five euros for adults and free for children under twelve.", "How much is a ticket for a child of ten?", ["Five euros", "Free", "Ten euros"], 1, "Los menores de doce no pagan.");
  R(r, "Hi Jo! I am at the airport. My plane leaves at eleven. See you next week. Kisses, Ella.", "Where is Ella?", ["At home", "At the airport", "At school"], 1, "«I am at the airport».");
  R(r, "Lee lives on the third floor of an old building. There is no lift, so he always uses the stairs.", "How does Lee go up to his flat?", ["By lift", "By the stairs", "By car"], 1, "«He always uses the stairs».");
  R(r, "Ruth's favourite day is Saturday. She goes to the market with her mum and buys fresh fruit.", "What does Ruth do on Saturdays?", ["She goes to school", "She goes to the market", "She works"], 1, "«She goes to the market».");
  RT(r, "Dan has two sisters and one brother. The youngest sister is five years old and she loves drawing.", "What does the youngest sister like?", ["Drawing"], "«She loves drawing».");
  R(r, "Our train to Madrid is at 8:20. Please arrive at the station fifteen minutes before. Tickets are on the app.", "Where can you buy tickets?", ["At the station desk", "On the app", "On the train"], 1, "«Tickets are on the app».");
  R(r, "My uncle is a doctor in a big hospital. He works at night and sleeps during the day.", "When does the uncle sleep?", ["At night", "During the day", "All the time"], 1, "«He sleeps during the day».");
  R(r, "Nina likes animals. She has a rabbit, two fish and a parrot. The parrot can say her name.", "How many fish does Nina have?", ["One", "Two", "Three"], 1, "«Two fish».");
  RT(r, "The bakery on Oak Street sells bread, cakes and biscuits. It is closed on Mondays.", "Which day is the bakery closed?", ["Monday"], "«Closed on Mondays».");
  R(r, "Last summer Tim learned to ride a bike. At first he fell many times, but now he rides to school every day.", "How does Tim go to school now?", ["On foot", "By bus", "By bike"], 2, "«He rides to school every day».");
  R(r, "Kate is going to visit her grandmother this weekend. They will bake a cake together.", "What will Kate and her grandmother do?", ["Bake a cake", "Go to the cinema", "Play tennis"], 0, "«They will bake a cake together».");
  RT(r, "The school canteen opens at half past twelve. Lunch costs three euros and includes a drink.", "What is included in the lunch?", ["A drink"], "«Includes a drink».");

  L(l, "Woman: Hello, I'd like a room for two nights, please. Receptionist: Of course. Your room is on the second floor.", "On which floor is the room?", ["First", "Second", "Third"], 1, "«The second floor».");
  LT(l, "Boy: Can I borrow your pen? Girl: Sure, here you are.", "What does the boy want to borrow?", ["A pen"], "«Can I borrow your pen?».");
  L(l, "Man: How often do you go to the gym? Woman: Three times a week, on Monday, Wednesday and Friday.", "How many times a week does the woman go to the gym?", ["Two", "Three", "Five"], 1, "«Three times a week».");
  LT(l, "Mum: Did you brush your teeth? Son: Yes, Mum, I did it before bed.", "When did the son brush his teeth?", ["Before bed"], "«Before bed».");
  L(l, "Girl: What's your favourite colour? Boy: Green. I like the colour of the trees.", "What is the boy's favourite colour?", ["Blue", "Green", "Red"], 1, "«Green».");
  L(l, "Man: Where is the post office? Woman: It's next to the supermarket, opposite the park.", "Where exactly is the post office?", ["Opposite the park", "Next to the school", "Behind the hospital"], 0, "«Opposite the park».");
  LT(l, "Teacher: Today we have a test. You have one hour. Students: OK, teacher.", "How long is the test?", ["One hour"], "«You have one hour».");
  L(l, "Woman: Is this seat free? Man: Yes, please sit down.", "What does the man tell the woman?", ["Please sit down", "Please leave", "Please wait"], 0, "«Please sit down».");
  L(l, "Girl: Do you want some juice? Boy: No, thanks. I'm not thirsty.", "Does the boy want juice?", ["Yes", "No"], 1, "«I'm not thirsty».");
  L(l, "Man: What day is your birthday? Girl: It's on the fifteenth of June.", "Which date is the girl's birthday?", ["The fifth of June", "The fifteenth of June", "The fifteenth of July"], 1, "«The fifteenth of June».");
  L(l, "Woman: Can you help me carry the bags? Man: Of course, I'll take the heavy one.", "What will the man carry?", ["The light bag", "The heavy bag", "Nothing"], 1, "«I'll take the heavy one».");
  L(l, "Boy: The film starts at seven. Girl: Perfect, we'll be there at quarter to seven.", "What time will they arrive?", ["Seven", "Quarter to seven", "Half past six"], 1, "«Quarter to seven».");
  LT(l, "Dad: It's raining, so we'll go by car. Son: OK, can I sit at the front?", "How will they go?", ["By car"], "«We'll go by car».");
  L(l, "Man: Do you like hiking? Woman: Yes, I go walking in the mountains every summer.", "Where does the woman go walking?", ["In the city", "In the mountains", "On the beach"], 1, "«In the mountains».");
  L(l, "Girl: Excuse me, is this the bus to the centre? Driver: No, the bus to the centre is over there.", "Where is the bus to the centre?", ["Here", "Over there", "Across the road"], 1, "«Over there».");

  T(t, "Rewrite: 'I don't have a car.' → 'I ___ a car.'", "Verbo «to have» en positivo.", ["have", "do have"], "Negativo → positivo.");
  T(t, "Rewrite: 'She is tall.' → 'She is not ___.'", "Adjetivo opuesto a «tall».", ["short"], "Opuesto de «tall».");
  T(t, "Rewrite: 'They like pizza.' → 'Pizza is liked ___ them.'", "Preposición tras «liked».", ["by"], "Voz pasiva con «by».");
  T(t, "Rewrite: 'It's a big house.' → 'The house is ___.'", "Adjetivo que signifique «grande».", ["big", "large"], "Sinónimo de «big».");
  T(t, "Rewrite: 'We go to school by bus.' → 'We ___ school on the bus.'", "Verbo de viajar al colegio.", ["get to", "travel to", "go to"], "Verbo + destino.");
  T(t, "Rewrite: 'He doesn't work on Sundays.' → 'He ___ on Sundays.'", "Verbo de trabajar en positivo con «doesn't».", ["has a day off"], "Equivalente de «doesn't work».");
  T(t, "Rewrite: 'My phone is new.' → 'My phone is ___ .'", "Opuesto de «new».", ["old"], "Opuesto de «new».");
  T(t, "Rewrite: 'I have two sisters.' → 'I ___ two sisters.'", "Sinónimo de «have».", ["have got"], "«Have got» equivale a «have».");
  T(t, "Rewrite: 'Turn on the light.' → 'Please ___ the light.'", "Verbo que significa «encender».", ["switch on", "turn on"], "«Switch on» o «turn on».");
  T(t, "Rewrite: 'She is at work.' → 'She ___ work.'", "Verbo «to be» más preposición.", ["is at"], "«Is at work» = trabaja / está en el trabajo.");
  T(t, "Rewrite: 'The bag is under the chair.' → 'The chair is ___ the bag.'", "Preposición contraria a «under».", ["over", "above"], "«Over» o «above».");
  T(t, "Rewrite: 'It is a cold day.' → 'It is ___ today.'", "Adjetivo que significa lo contrario de «hot».", ["cold"], "Mismo significado.");
  T(t, "Rewrite: 'Can you help me?' → 'Could you ___ me?'", "Verbo de ayudar.", ["help"], "«Could you help me?»: más educado.");
  T(t, "Rewrite: 'I eat fish on Fridays.' → 'On Fridays, I ___ fish.'", "Verbo de comer.", ["eat"], "Mismo verbo, distinto orden.");
  T(t, "Rewrite: 'We are going to London next week.' → 'We ___ to London next week.'", "Futuro con «will».", ["will go", "are going"], "Ambas formas expresan futuro.");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";

  T(g, "Our cat ___ very fast.", "Escribe la palabra que falta.", ["runs"], "Tercera persona: runs.");
  G(g, "I ___ my keys. Can you help me find them?", ["have lost", "lost", "losing"], 0, "Present perfect con «have» + participio.");
  G(g, "___ is the capital of France?", ["What", "Who", "Where"], 0, "«What» pregunta por un nombre de cosa o lugar.");
  T(g, "We ___ visited Rome last year.", "Escribe la palabra que falta.", ["have"], "«We» con «have» en present perfect.");
  T(g, "My grandma ___ knit very well.", "Escribe la palabra que falta.", ["can"], "Modal «can» no cambia en tercera persona.");
  G(g, "The dog is ___ under the table.", ["sleeping", "sleep", "sleeps"], 0, "Presente continuo: sleeping.");
  T(g, "Let's ___ a picnic on Saturday.", "Escribe la palabra que falta.", ["have"], "«Let's» va seguido de la forma base.");
  T(g, "She ___ like to go shopping alone.", "Escribe la palabra que falta.", ["doesn't"], "Tercera persona con «doesn't».");
  G(g, "___ you ever been to Japan?", ["Have", "Has", "Did"], 0, "Experiencia con «have» en la pregunta.");
  T(g, "I need ___ sugar for the cake.", "Escribe la palabra que falta.", ["some"], "Incontables en afirmativa: some.");
  G(g, "This is the ___ building in town.", ["tallest", "taller", "tall"], 0, "Superlativo: tallest.");
  T(g, "It's ten o'clock. We ___ at school now.", "Escribe la palabra que falta.", ["are"], "«We» con «are».");
  T(g, "He ___ watching TV when I called.", "Escribe la palabra que falta.", ["was"], "Pasado continuo con «he»: was.");
  G(g, "Please, don't ___ the door.", ["close", "closes", "closing"], 0, "Imperativo negativo: don't + base.");
  T(g, "Mary and Jane ___ twins.", "Escribe la palabra que falta.", ["are"], "Plural: are.");
  T(g, "She ___ a sandwich for lunch yesterday.", "Escribe la palabra que falta.", ["ate"], "Pasado irregular de «eat»: ate.");

  R(r, "Hi, I'm Pedro. I live with my parents and my little brother. We have a big garden with apple trees.", "Who lives with Pedro?", ["His friends", "His parents and his brother", "His grandparents"], 1, "«I live with my parents and my little brother».");
  R(r, "The supermarket is open every day from eight in the morning until ten at night. On Sundays it closes at eight.", "What time does the supermarket close on Sundays?", ["Ten", "Eight", "Nine"], 1, "«On Sundays it closes at eight».");
  R(r, "Amy wants to buy a new bag. It costs twenty euros in the shop near her house, but only fifteen on the internet.", "Where is the bag cheaper?", ["In the shop", "On the internet", "They are the same"], 1, "«Only fifteen on the internet».");
  RT(r, "Our teacher is very kind. She helps us with our homework and she always smiles when we ask questions.", "How is the teacher?", ["Kind"], "«She is very kind».");
  R(r, "On rainy days Ali stays at home. He reads books, plays chess and listens to music in his room.", "What does Ali do on rainy days?", ["He goes to the park", "He reads books", "He goes swimming"], 1, "«He reads books».");
  R(r, "Last week I went to the zoo with my class. We saw lions, elephants and a big giraffe.", "What animals did they see?", ["Dogs and cats", "Lions, elephants and a giraffe", "Birds only"], 1, "Lo enumera en la frase.");
  R(r, "Please remember: the library is closed on public holidays. You can return books on the next day.", "When can you return books if the library is closed?", ["On the next day", "Never", "On the holiday"], 0, "«You can return books on the next day».");
  R(r, "Alba's birthday is in March. Every year she has a party with her best friends and a big chocolate cake.", "When is Alba's birthday?", ["In May", "In March", "In December"], 1, "«Alba's birthday is in March».");
  RT(r, "Jack is hungry. He opens the fridge and finds some cheese, a tomato and two eggs. He makes an omelette.", "What does Jack make?", ["An omelette"], "«He makes an omelette».");
  R(r, "The hotel has a pool on the roof. Guests can swim from nine until seven. Towels are free.", "Are towels free at the hotel?", ["Yes", "No"], 0, "«Towels are free».");
  RT(r, "My cousin Lina is a student at university. She studies medicine and wants to be a doctor one day.", "What does Lina study?", ["Medicine"], "«She studies medicine».");
  R(r, "Please arrive at the cinema twenty minutes before the film starts. Bags are not allowed inside.", "What is not allowed inside?", ["Tickets", "Bags", "Snacks"], 1, "«Bags are not allowed inside».");
  RT(r, "Our flat is on the fourth floor. It has a balcony with plants and a view of the river.", "What can you see from the flat?", ["The river"], "«A view of the river».");
  R(r, "At the weekend Ivan cooks for his family. Last Saturday he made soup, rice and a green salad.", "What did Ivan make last Saturday?", ["Soup, rice and a salad", "Pizza", "Cake"], 0, "Lo cita en la frase.");

  L(l, "Girl: Excuse me, how much is a coffee? Waiter: It's two euros and fifty cents.", "How much is the coffee?", ["Two euros", "Two euros fifty", "Three euros"], 1, "«Two euros and fifty cents».");
  L(l, "Man: Can you open the window, please? Woman: Sure, it's very hot here.", "Why does the woman open the window?", ["It is cold", "It is hot", "It is raining"], 1, "«It's very hot here».");
  L(l, "Boy: Where's my football? Dad: It's in the garden, next to the bike.", "Where has the football been left?", ["In the garden", "In the car", "In the kitchen"], 0, "«In the garden».");
  LT(l, "Woman: Hello, my name's Lucy. Man: Nice to meet you, Lucy. I'm Mark.", "What is the man's name?", ["Mark"], "«I'm Mark».");
  L(l, "Girl: Are you coming to the party? Boy: Yes, but I'll be late. I have football practice.", "Why will the boy be late?", ["He has football practice", "He is sick", "He has a test"], 0, "«I have football practice».");
  L(l, "Man: Do you have a car? Woman: No, I go everywhere by train.", "How does the woman travel?", ["By car", "By train", "On foot"], 1, "«By train».");
  LT(l, "Teacher: Write your name at the top of the page. Student: Like this? Teacher: Yes, that's right.", "What should the student write?", ["Their name"], "«Write your name».");
  L(l, "Woman: What's the weather like? Man: It's cloudy but it's not raining.", "Which weather is it outside?", ["Sunny", "Cloudy", "Snowing"], 1, "«It's cloudy».");
  LT(l, "Girl: Tom, what time is breakfast? Tom: At seven thirty, Mum said.", "What time is breakfast?", ["Seven thirty"], "«At seven thirty».");
  L(l, "Man: I'd like a table for four, please. Waiter: Of course. Follow me.", "How many people is the table for?", ["Two", "Four", "Six"], 1, "«A table for four».");
  L(l, "Mum: Can you carry the shopping? Girl: OK, but it's heavy!", "What does the mum ask the girl to do?", ["Cook dinner", "Carry the shopping", "Clean the kitchen"], 1, "«Can you carry the shopping?».");
  LT(l, "Boy: I like swimming, but I don't like cold water. Girl: Me too!", "What doesn't the boy like?", ["Cold water"], "«I don't like cold water».");
  L(l, "Woman: This bag is very expensive. Man: It's on sale today, so it's half price.", "What is special about the bag today?", ["It is free", "It is half price", "It is new"], 1, "«It's half price».");
  L(l, "Man: Where are you from? Girl: I'm from Mexico, but I live in Madrid now.", "Where does the girl live now?", ["In Mexico", "In Madrid", "In Lisbon"], 1, "«I live in Madrid now».");

  T(t, "Rewrite: 'It is not expensive.' → 'It is ___.'", "Adjetivo contrario a «expensive».", ["cheap", "inexpensive"], "Opuesto de «expensive».");
  T(t, "Rewrite: 'My shoes are new.' → 'My shoes are ___ .'", "Opuesto de «new».", ["old"], "Opuesto de «new».");
  T(t, "Rewrite: 'She speaks English well.' → 'She is ___ at English.'", "Adjetivo de habilidad.", ["good"], "«Good at» + materia.");
  T(t, "Rewrite: 'He never comes late.' → 'He is always ___.'", "Adverbio de frecuencia contrario.", ["on time", "punctual"], "«On time» equivale a no llegar tarde.");
  T(t, "Rewrite: 'We don't have school tomorrow.' → 'There is ___ school tomorrow.'", "Negativo: «no» + sustantivo.", ["no"], "«There is no school» = no hay colegio.");
  T(t, "Rewrite: 'The sun is very bright today.' → 'Today the sun is ___.'", "Adjetivo sinónimo de «bright».", ["shining", "strong", "brilliant"], "Adjetivo que describe la luz.");
  T(t, "Rewrite: 'I'm going to visit my aunt.' → 'I ___ my aunt.'", "Forma de decir que vas a visitar.", ["will visit", "am visiting"], "Futuro con «will» o presente continuo.");
  T(t, "Rewrite: 'We walked to school.' → 'We ___ to school.'", "Pasado de «go» con «on foot».", ["went on foot", "walked"], "Pasado de «walk».");
  T(t, "Rewrite: 'Turn right at the bridge.' → 'At the bridge, ___ right.'", "Imperativo con «go» o «turn».", ["turn", "go"], "Dar instrucciones en imperativo.");
  T(t, "Rewrite: 'There are five students in my class.' → 'My class ___ five students.'", "Verbo «have» para tener.", ["has", "has got"], "«Has» o «has got».");
  T(t, "Rewrite: 'He is a very good cook.' → 'He cooks ___.'", "Adverbio de «bien».", ["very well", "really well"], "Adverbio de «cook».");
  T(t, "Rewrite: 'I'd like a cup of tea.' → 'Can I have ___ of tea?'", "Expresión de cantidad con «cup».", ["a cup"], "«A cup of tea».");
  T(t, "Rewrite: 'It's very cold, so wear a coat.' → 'Wear a coat ___ it's cold.'", "Conjunción de causa.", ["because"], "«Because» expresa la causa.");
  T(t, "Rewrite: 'The lesson finishes at four.' → 'The lesson ___ at four.'", "Verbo que significa terminar.", ["ends"], "Sinónimo de «finishes».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";

  G(g, "The shop ___ on Sundays.", ["is closed", "closes", "close"], 0, "Pasiva o forma verbal de estado: is closed.");
  G(g, "Sam ___ football every Saturday.", ["plays", "play", "playing"], 0, "Tercera persona: plays.");
  T(g, "I ___ my teeth twice a day.", "Escribe la palabra que falta.", ["brush"], "«I» con forma base.");
  G(g, "___ is your favourite subject?", ["What", "Which", "Who"], 1, "«Which» para elegir entre opciones conocidas.");
  T(g, "We ___ to the seaside every summer.", "Escribe la palabra que falta.", ["go"], "«We» con forma base.");
  T(g, "He ___ a big family.", "Escribe la palabra que falta.", ["has"], "Tercera persona de «have»: has.");
  G(g, "I ___ my homework yet.", ["haven't finished", "didn't finish", "finish"], 0, "Negativa con «yet» en present perfect.");
  G(g, "Their house is ___ than ours.", ["bigger", "biggest", "more big"], 0, "Comparativo corto: bigger.");
  T(g, "We ___ a film at the cinema last night.", "Escribe la palabra que falta.", ["saw"], "Pasado irregular de «see»: saw.");
  T(g, "Can I ___ your phone, please?", "Escribe la palabra que falta.", ["use"], "Modal «can» + forma base.");
  G(g, "She ___ very early yesterday.", ["got up", "get up", "gets up"], 0, "Pasado irregular: got up.");
  G(g, "This exercise is ___ than the last one.", ["easier", "easyer", "more easy"], 0, "Comparativo de «easy»: easier.");
  G(g, "I ___ English for three years.", ["have studied", "studied", "study"], 0, "Duración hasta ahora: present perfect.");
  T(g, "There are ___ people in the park today.", "Escribe la palabra que falta.", ["many"], "Plural contable: many.");
  G(g, "I am not ___ of spiders.", ["afraid", "scared of", "fear"], 0, "«Afraid of» tras «am not».");
  G(g, "Dinner ___ ready at eight.", ["will be", "is", "be"], 0, "Futuro con «will be».");
  G(g, "You ___ go to school today. It's a holiday.", ["don't have to", "mustn't", "aren't"], 0, "«Don't have to» = no es necesario.");
  T(g, "Excuse me, ___ is the toilet?", "Escribe la palabra que falta.", ["where"], "«Where» pregunta por el lugar.");
  T(g, "The children ___ a song yesterday.", "Escribe la palabra que falta.", ["sang"], "Pasado de «sing»: sang.");
  G(g, "My brother is ___ than me.", ["taller", "tall", "tallest"], 0, "Comparativo: taller.");

  R(r, "Lena has a part-time job in a bookshop. She works on Saturdays and some afternoons after school.", "When does Lena work?", ["On Mondays", "On Saturdays", "Every night"], 1, "«She works on Saturdays».");
  RT(r, "The train from Valencia arrives at platform four. Please check the screen for changes.", "Where does the train arrive?", ["Platform four"], "«Platform four».");
  R(r, "Our neighbours have a small dog called Bo. Bo likes to walk in the park every morning.", "What does Bo like to do?", ["Sleep all day", "Walk in the park", "Swim in the lake"], 1, "«Bo likes to walk in the park».");
  R(r, "I love reading comics. My favourite one is about a cat who travels around the world.", "What is the writer's favourite comic about?", ["A dog", "A cat who travels", "A robot"], 1, "«A cat who travels around the world».");
  R(r, "The swimming pool is open from June to September. It closes early when it rains.", "When is the pool open?", ["All year", "From June to September", "In winter"], 1, "«From June to September».");
  R(r, "Ana wants to be a pilot. She likes flying kites and watches planes at the airport every weekend.", "What does Ana want to be?", ["A teacher", "A pilot", "A nurse"], 1, "«She wants to be a pilot».");
  R(r, "Dinner is at half past seven in our house. We always eat together and talk about our day.", "What time is dinner?", ["Half past seven", "Eight o'clock", "Six o'clock"], 0, "«At half past seven».");
  RT(r, "Our town has a castle on the hill. Tourists visit it in summer and take many photos.", "When do tourists visit the castle?", ["In summer"], "«Tourists visit it in summer».");
  R(r, "Hugo broke his arm last month. He is wearing a white plaster and cannot play football for now.", "Why can't Hugo play football?", ["He is tired", "He broke his arm", "He is on holiday"], 1, "«He broke his arm».");
  R(r, "Dear Mum, I am at Grandma's house. The weather is lovely. Love you! Anna.", "Where is Anna?", ["At school", "At Grandma's house", "At the beach"], 1, "«I am at Grandma's house».");
  R(r, "Our kitchen is small but it is very bright. There is a window above the sink and a yellow table.", "What colour is the table?", ["Blue", "Yellow", "White"], 1, "«A yellow table».");
  RT(r, "Emma has a garden with roses and tomatoes. She waters the plants every evening after work.", "When does Emma water the plants?", ["Every evening"], "«Every evening».");
  R(r, "The bus stop is next to the bakery. Buses come every fifteen minutes during the day.", "How often do buses come?", ["Every five minutes", "Every fifteen minutes", "Once a day"], 1, "«Every fifteen minutes».");
  R(r, "Omar likes to cook pasta. Yesterday he added too much salt, so the dish was not nice.", "What was wrong with the pasta?", ["It was cold", "It had too much salt", "It was burnt"], 1, "«Too much salt».");
  R(r, "Our class visited a farm last Tuesday. We fed the goats and collected eggs from the hens.", "What did the class collect?", ["Apples", "Eggs", "Milk"], 1, "«Collected eggs».");
  R(r, "Chloe is learning the piano. She practises for half an hour every day before dinner.", "How long does Chloe practise?", ["Half an hour", "Two hours", "Five minutes"], 0, "«For half an hour».");
  RT(r, "My favourite season is autumn. The leaves turn orange and red, and the weather is not too hot.", "What is the writer's favourite season?", ["Autumn"], "«My favourite season is autumn».");
  R(r, "Please wear a helmet when you ride your bike. It keeps your head safe if you fall.", "Why should you wear a helmet?", ["To look nice", "To keep your head safe", "Because it is cold"], 1, "«It keeps your head safe».");
  R(r, "Pablo finished his homework quickly, so he watched a film with his sister in the living room.", "Where did Pablo watch the film?", ["In his bedroom", "In the living room", "At the cinema"], 1, "«In the living room».");
  R(r, "Our holiday flat has two bathrooms and a big terrace. From the terrace you can see the sea.", "What can you see from the terrace?", ["The sea", "The city", "The forest"], 0, "«You can see the sea».");

  L(l, "Woman: Do you want to go out later? Man: Maybe. What time do you want to go?", "What is the man asking?", ["What time they want to go", "Where they live", "How old she is"], 0, "«What time do you want to go?».");
  LT(l, "Girl: I've got a new bike! Boy: Wow, is it red? Girl: No, it's blue.", "What colour is the new bike?", ["Blue"], "«It's blue».");
  L(l, "Man: How much time do we have? Woman: About ten minutes before the train leaves.", "How much time do they have?", ["Ten minutes", "One hour", "Two minutes"], 0, "«About ten minutes».");
  LT(l, "Mum: Did you feed the fish? Boy: Yes, I fed them this morning.", "When did the boy feed the fish?", ["This morning"], "«This morning».");
  L(l, "Girl: Let's go to the park. Boy: Good idea, it's sunny today.", "What is the weather like at the park?", ["Rainy", "Sunny", "Windy"], 1, "«It's sunny today».");
  LT(l, "Teacher: Who wants to read first? Student: I do, miss.", "Who wants to read first?", ["The student"], "«I do».");
  L(l, "Man: Is there a bank near here? Woman: Yes, it's just round the corner.", "Where exactly is the bank?", ["Round the corner", "Across the city", "Inside the station"], 0, "«Just round the corner».");
  L(l, "Boy: My sister is ten years old. Girl: My brother is ten too! We're the same age.", "How old is the girl's brother?", ["Eight", "Ten", "Twelve"], 1, "«My brother is ten too».");
  L(l, "Woman: What do you do at the weekend? Man: I play tennis with my friends.", "What does the man do at the weekend?", ["He plays tennis", "He works", "He sleeps"], 0, "«I play tennis».");
  L(l, "Girl: Is the shop open now? Man: No, it opens at nine tomorrow.", "At what time does the shop open tomorrow?", ["Now", "At nine tomorrow", "At noon"], 1, "«It opens at nine tomorrow».");
  LT(l, "Man: I'd like a coffee and a sandwich. Waiter: Ham or cheese? Man: Cheese, please.", "What sandwich does the man want?", ["Cheese"], "«Cheese, please».");
  L(l, "Boy: Can you help me with my maths? Girl: Yes, which question is it?", "What does the boy want?", ["Help with maths", "A new book", "A ride home"], 0, "«Can you help me with my maths?».");
  L(l, "Woman: How do you get to work? Man: I usually walk, it takes about twenty minutes.", "How does the man get to work?", ["By car", "On foot", "By bus"], 1, "«I usually walk».");
  LT(l, "Mum: Your bedroom is very messy! Girl: I know, Mum. I'll tidy it after lunch.", "When will the girl tidy her room?", ["After lunch"], "«After lunch».");
  L(l, "Man: Have you seen my glasses? Woman: They're on your head!", "Where are the man's glasses?", ["On his head", "On the table", "In his bag"], 0, "«They're on your head!».");
  L(l, "Girl: Which is your house? Boy: The one with the green door.", "What colour is the boy's door?", ["Blue", "Green", "White"], 1, "«The one with the green door».");
  LT(l, "Woman: Can I sit here? Man: Of course, the seat is free.", "Is the seat free?", ["Yes"], "«The seat is free».");

  T(t, "Rewrite: 'It is very cold outside.' → 'It is ___ outside.'", "Adjetivo opuesto a «hot».", ["cold", "freezing"], "Sinónimos de «cold».");
  T(t, "Rewrite: 'She is not happy.' → 'She is ___.'", "Adjetivo opuesto a «happy».", ["sad", "unhappy"], "Opuesto de «happy».");
  T(t, "Rewrite: 'I do not know the answer.' → 'I have no ___ .'", "Sustantivo que signifique «idea».", ["idea"], "«I have no idea».");
  T(t, "Rewrite: 'They are friends.' → 'They are ___ friends.'", "Adjetivo de cercanía.", ["close", "good", "best"], "«Close» o «good» friends.");
  T(t, "Rewrite: 'He gets up at seven.' → 'He ___ up at seven.'", "Phrasal verb de levantarse.", ["gets", "wakes"], "«Wakes up» o «gets up».");
  T(t, "Rewrite: 'We often go swimming.' → 'We ___ swimming.'", "Adverbio de frecuencia.", ["often go"], "Mismo significado de «often».");
  T(t, "Rewrite: 'Dinner is at eight.' → 'We eat dinner ___ eight.'", "Preposición de hora.", ["at"], "«At eight».");
  T(t, "Rewrite: 'It is a long way from here.' → 'It is ___ from here.'", "Adjetivo de distancia.", ["far"], "«Far from here».");
  T(t, "Rewrite: 'My sister is older than me.' → 'I am ___ than my sister.'", "Comparativo de «young».", ["younger"], "Opuesto de «older».");
  T(t, "Rewrite: 'The book is on the table.' → 'The table ___ the book.'", "Verbo «have» como tener algo encima.", ["has", "has got"], "Ver que el libro está encima.");
  T(t, "Rewrite: 'You should take an umbrella.' → 'You ___ take an umbrella.'", "Verbo modal de consejo.", ["ought to", "had better"], "«Ought to» = deberías.");
  T(t, "Rewrite: 'Please be quiet.' → 'Please ___ talking.'", "Verbo de dejar de hablar.", ["stop"], "«Stop talking».");
  T(t, "Rewrite: 'The shop is next to the school.' → 'The school is ___ the shop.'", "Preposición de cercanía.", ["next to", "near"], "Mismo significado.");
  T(t, "Rewrite: 'She has two dogs.' → 'She ___ two dogs.'", "Verbo «have got».", ["has got"], "«Has got» = tiene.");
  T(t, "Rewrite: 'I was tired, so I went to bed early.' → 'I was tired, ___ I went to bed early.'", "Conjunción de consecuencia.", ["so"], "«So» expresa consecuencia.");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A1 · Gramática", r = "A1 · Lectura", l = "A1 · Escucha", t = "A1 · Reformulación";

  T(g, "Liz ___ her coat in the wardrobe.", "Escribe la palabra que falta.", ["keeps"], "Tercera persona: keeps.");
  T(g, "I ___ breakfast at eight every day.", "Escribe la palabra que falta.", ["have"], "«I» con «have».");
  G(g, "Do you know ___ the station is?", ["where", "what", "who"], 0, "Interrogativa indirecta: where.");
  T(g, "Last year we ___ to Paris.", "Escribe la palabra que falta.", ["went"], "Pasado irregular de «go»: went.");
  R(r, "Our school trip was on Monday. We visited a science museum and ate lunch in the park.", "Where did they eat lunch?", ["In the museum", "In the park", "At school"], 1, "«Ate lunch in the park».");
  RT(r, "Pedro likes to write stories. He writes every night before bed and reads them to his brother.", "When does Pedro write?", ["Every night"], "«He writes every night».");
  R(r, "Sofia is ill today, so she stays in bed. Her mum brings her some soup and a glass of water.", "What does Sofia's mum bring her?", ["A cake", "Soup and water", "A book"], 1, "«Some soup and a glass of water».");
  L(l, "Man: Where is the post office? Girl: It's on Main Street, next to the chemist.", "Where can you find the post office?", ["On Main Street", "On Oak Road", "Near the park"], 0, "«On Main Street».");
  L(l, "Woman: Shall we walk or take the bus? Man: Let's take the bus, it's raining.", "How will they travel?", ["On foot", "By bus", "By taxi"], 1, "«Let's take the bus».");
  L(l, "Boy: Dad, when is the match? Dad: On Saturday at three o'clock.", "When is the match?", ["On Saturday at three", "On Sunday at noon", "On Friday at five"], 0, "«On Saturday at three o'clock».");
  T(t, "Rewrite: 'It is not difficult.' → 'It is ___.'", "Adjetivo opuesto a «difficult».", ["easy"], "Opuesto de «difficult».");
  T(t, "Rewrite: 'My room is upstairs.' → 'My room is on the ___ floor.'", "Piso superior.", ["top", "upper", "first"], "«Upper» o «top floor».");
  T(t, "Rewrite: 'I am very happy with my new bag.' → 'I am ___ with my new bag.'", "Adjetivo de satisfacción.", ["pleased", "delighted", "glad"], "Sinónimos de «happy».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A2 · Gramática", r = "A2 · Lectura", l = "A2 · Escucha", t = "A2 · Reformulación";

  G(g, "Yesterday I ___ to the dentist.", ["went", "go", "gone"], 0, "Pasado simple irregular: went.");
  T(g, "We are ___ to visit our cousins next month.", "Escribe la palabra que falta.", ["going"], "«Be going to» para planes futuros.");
  T(g, "She ___ already eaten lunch, so she isn't hungry.", "Escribe la palabra que falta.", ["has"], "Present perfect con «already».");
  G(g, "If it rains tomorrow, we ___ indoors.", ["will stay", "stay", "stayed"], 0, "Primer condicional: will + base.");
  G(g, "This book is ___ than the one I read last week.", ["more interesting", "interestinger", "most interesting"], 0, "Comparativo de adjetivo largo: more interesting.");
  G(g, "I ___ play the guitar when I was six.", ["started to", "started", "start"], 0, "Pasado simple: started to play.");
  G(g, "You ___ wear a seatbelt. It is the law.", ["must", "mustn't", "might"], 0, "Obligación con «must».");
  T(g, "He ___ swim when he was a child.", "Escribe la palabra que falta.", ["could"], "Habilidad en el pasado: could.");
  T(g, "I haven't seen my cousin ___ last summer.", "Escribe la palabra que falta.", ["since"], "«Since» + momento concreto.");
  G(g, "Mark is ___ the tallest in his class.", ["the", "a", "an"], 0, "Superlativo con «the».");
  T(g, "Would you like ___ tea or coffee?", "Escribe la palabra que falta.", ["some"], "Ofrecimientos con «some».");
  G(g, "The film was ___ than I had expected.", ["better", "good", "more good"], 0, "Comparativo irregular: better.");
  G(g, "When I got home, my sister ___ dinner.", ["was cooking", "cooked", "cooks"], 0, "Pasado continuo para acción en progreso.");
  T(g, "She asked me ___ I was going.", "Escribe la palabra que falta.", ["where"], "Pregunta indirecta con «where».");
  T(g, "You ___ be so noisy. The baby is sleeping.", "Escribe la palabra que falta.", ["shouldn't"], "Consejo negativo: shouldn't.");
  G(g, "I ___ my keys. Can you open the door?", ["have forgotten", "forgot", "forget"], 0, "Present perfect para algo olvidado ahora.");
  G(g, "There ___ a lot of people at the concert last night.", ["were", "was", "are"], 0, "Pasado de «there» con plural: were.");
  T(g, "I prefer tea ___ coffee.", "Escribe la palabra que falta.", ["to"], "«Prefer ... to».");
  T(g, "They ___ playing football when it started raining.", "Escribe la palabra que falta.", ["were"], "Pasado continuo con «they».");
  G(g, "___ you ever tried sushi?", ["Have", "Did", "Do"], 0, "Experiencia: have + participio.");
  T(g, "I'm not used ___ getting up early.", "Escribe la palabra que falta.", ["to"], "«Be used to» + gerundio.");
  G(g, "The letter ___ sent yesterday.", ["was", "is", "has"], 0, "Pasiva en pasado: was sent.");
  T(g, "Ana is ___ at maths than her brother.", "Escribe la palabra que falta.", ["better"], "Comparativo de «good»: better.");
  G(g, "Let's go to the cinema, ___?", ["shall we", "will we", "do we"], 0, "Tag question en sugerencias: shall we.");
  T(g, "He ___ to be a doctor when he grows up.", "Escribe la palabra que falta.", ["wants"], "Tercera persona: wants.");

  R(r, "Last summer Ben went to Greece with his family. They stayed in a small hotel near the sea. Ben swam every morning and he loved the food.", "Where did Ben go last summer?", ["To Spain", "To Greece", "To Italy"], 1, "«Went to Greece».");
  R(r, "Our flat is very noisy because the neighbours have a loud dog. I want to move to a quieter area next year.", "Why does the writer want to move?", ["The flat is too small", "The area is too noisy", "The rent is too high"], 1, "«The neighbours have a loud dog».");
  R(r, "The shop on the corner closed last month. People are sad because it sold the best bread in town.", "Why are people sad?", ["The shop sold bad bread", "The shop closed", "The shop is too expensive"], 1, "«The shop closed last month».");
  RT(r, "Julia wants to learn Japanese. She has been studying for six months and practises with an app every day.", "How long has Julia been studying?", ["Six months"], "«For six months».");
  R(r, "The museum was very crowded on Sunday. We waited for an hour to see the famous painting.", "How long did they wait?", ["Ten minutes", "An hour", "Two hours"], 1, "«We waited for an hour».");
  R(r, "Alex's bike was stolen last week. He reported it to the police and bought a new lock for his second bike.", "What did Alex do after the theft?", ["He bought a new car", "He reported it to the police", "He moved house"], 1, "«He reported it to the police».");
  R(r, "If you want to pass the exam, you should study a little every day. Reading in English also helps a lot.", "What does the writer advise?", ["Study a little every day", "Study only the night before", "Skip the reading"], 0, "«Study a little every day».");
  R(r, "Our team lost the match, but we played well. Next time we will train harder on Tuesdays and Thursdays.", "When will the team train harder?", ["On Mondays", "On Tuesdays and Thursdays", "Every weekend"], 1, "Lo dice al final del texto.");
  RT(r, "Maya was born in Canada but she moved to London when she was ten. She still speaks French with her grandmother.", "Where was Maya born?", ["In Canada"], "«Was born in Canada».");
  R(r, "The bus was late this morning, so I missed the first lesson. My teacher was not angry because she understood.", "Why did the writer miss the first lesson?", ["The teacher was ill", "The bus was late", "The writer was ill"], 1, "«The bus was late».");
  R(r, "Hi Sarah, I'm sorry I couldn't come to your party. I had to work late. Let's meet for coffee next Friday instead.", "What do they plan to do next Friday?", ["Go to a party", "Have coffee", "Go to work"], 1, "«Let's meet for coffee next Friday».");
  R(r, "The new library has three floors. The top floor has a quiet area for studying and a small café for breakfast.", "What is on the top floor?", ["A café only", "A quiet area for studying", "Computers only"], 1, "«A quiet area for studying».");
  RT(r, "Last weekend we went camping near a lake. The weather was great, but at night it was quite cold.", "What was the weather like at night?", ["Quite cold"], "«At night it was quite cold».");
  R(r, "Daniel works as a mechanic. He has repaired cars for ten years and he is very good at his job.", "How long has Daniel repaired cars?", ["Ten years", "Two years", "Five months"], 0, "«For ten years».");
  RT(r, "Please remember that the swimming pool will be closed next Monday for cleaning. It will open again on Tuesday.", "When will the swimming pool reopen?", ["On Tuesday"], "«It will open again on Tuesday».");
  R(r, "My grandfather used to be a teacher. He taught history for forty years and many of his students still write to him.", "What did the grandfather use to be?", ["A doctor", "A teacher", "A policeman"], 1, "«Used to be a teacher».");
  R(r, "The concert was cancelled because the singer was ill. The organisers will give a refund to everyone who bought a ticket.", "Why was the concert cancelled?", ["The tickets were sold out", "The singer was ill", "It was raining"], 1, "«The singer was ill».");
  R(r, "Emily wants to buy a flat, but the prices are very high in her city. She has decided to save more money first.", "What has Emily decided to do?", ["Buy a flat now", "Save more money first", "Move to another country"], 1, "«She has decided to save more money first».");
  R(r, "I usually cook at home, but last night we ordered pizza because nobody felt like cooking.", "Why did they order pizza?", ["They wanted pizza", "Nobody felt like cooking", "The kitchen was closed"], 1, "«Nobody felt like cooking».");
  RT(r, "The airport was busy because of the holidays. Our flight was delayed by two hours, so we ate in the terminal.", "How long was the flight delayed?", ["Two hours"], "«Delayed by two hours».");
  R(r, "Carla has been learning to drive for three months. She passed her theory test last week and feels more confident now.", "What did Carla pass last week?", ["Her driving test", "Her theory test", "Her English test"], 1, "«She passed her theory test».");

  LT(l, "Man: What did you do at the weekend? Woman: I visited my aunt in Seville. We went to the cathedral.", "Where did the woman go?", ["To Seville"], "«I visited my aunt in Seville».");
  L(l, "Girl: Are you going to the party tonight? Boy: I'm not sure. I might go if I finish my work.", "Is the boy sure he will go?", ["Yes", "No, he is not sure"], 1, "«I'm not sure. I might go».");
  L(l, "Woman: How long did it take you to get here? Man: About forty minutes by train.", "How did the man travel?", ["By car", "By train", "By bike"], 1, "«By train».");
  L(l, "Boy: Mum, can I have the car keys? Mother: Only if you come back before ten.", "What is the condition for the boy?", ["Come back before ten", "Come back after midnight", "Take his sister"], 0, "«Come back before ten».");
  L(l, "Man: I've bought a new laptop, but it's very heavy. Woman: Maybe you need a smaller one.", "What is the problem with the laptop?", ["It is too small", "It is too heavy", "It is too cheap"], 1, "«It's very heavy».");
  LT(l, "Girl: The museum is free on Sundays. Boy: Great! Let's go next Sunday.", "When will they go to the museum?", ["Next Sunday"], "«Let's go next Sunday».");
  L(l, "Woman: Did you finish the report? Man: Not yet, I'll finish it this afternoon.", "When will the man finish the report?", ["This morning", "This afternoon", "Tomorrow"], 1, "«I'll finish it this afternoon».");
  LT(l, "Teacher: Please hand in your essays on Friday. Student: Can we do them on the computer? Teacher: Yes, that's fine.", "What can the students use?", ["A computer"], "«Can we do them on the computer?».");
  L(l, "Man: The hotel is near the beach, which is really nice. Woman: And the breakfast is included, too.", "Which meal is included in the price?", ["Breakfast", "Dinner", "Parking"], 0, "«The breakfast is included».");
  L(l, "Girl: I've been waiting for twenty minutes. Boy: Sorry! The bus was late again.", "Why was the boy late?", ["The bus was late", "He forgot", "He was sleeping"], 0, "«The bus was late again».");
  L(l, "Woman: Which flat did you choose? Man: The one with the balcony, it's bigger than the other.", "Which flat did the man choose?", ["The bigger one", "The one with the balcony", "The cheaper one"], 1, "«The one with the balcony».");
  LT(l, "Man: We need milk, bread and eggs. Woman: I'll buy them on my way home from work.", "Who will buy the shopping?", ["The woman"], "«I'll buy them».");
  L(l, "Boy: Dad, I've finished my homework. Dad: Good, now you can watch TV for an hour.", "How long can the boy watch TV?", ["One hour", "Two hours", "All evening"], 0, "«For an hour».");
  LT(l, "Girl: How was your exam? Boy: Difficult, but I think I passed.", "How did the boy feel about the exam?", ["Difficult"], "«Difficult».");
  L(l, "Woman: Where are we meeting? Man: At the café near the station, at half past six.", "What time are they meeting?", ["Six o'clock", "Half past six", "Seven o'clock"], 1, "«At half past six».");
  L(l, "Man: I'm going to take a holiday in August. Woman: Lucky you! Where are you going?", "When is the man going on holiday?", ["In July", "In August", "In September"], 1, "«In August».");
  L(l, "Girl: Could you help me carry these boxes? Boy: Sure, but they look really heavy.", "What does the girl ask the boy?", ["To help her carry boxes", "To buy boxes", "To clean the room"], 0, "«Could you help me carry these boxes?».");
  LT(l, "Woman: Have you ever been to Italy? Man: Yes, twice. I loved Rome.", "How many times has the man been to Italy?", ["Twice"], "«Yes, twice».");
  L(l, "Boy: I'm going to bed. Mum: Did you brush your teeth? Boy: Yes, I did it five minutes ago.", "When did the boy brush his teeth?", ["Five minutes ago", "Yesterday", "This morning"], 0, "«Five minutes ago».");

  T(t, "Rewrite: 'It is not necessary to bring a map.' → 'You ___ bring a map.'", "Expresión de no obligación.", ["don't have to", "needn't"], "«Don't have to» = no es necesario.");
  T(t, "Rewrite: 'She started to learn English in 2019.' → 'She has ___ English since 2019.'", "Present perfect con «learn».", ["been learning", "been learning English", "learned"], "Duración con present perfect.");
  T(t, "Rewrite: 'I am sure that he will come.' → 'He ___ come.'", "Probabilidad alta: «will».", ["will definitely", "is sure to"], "«Is sure to» = seguro que vendrá.");
  T(t, "Rewrite: 'Don't forget to lock the door.' → 'Remember ___ the door.'", "Gerundio tras «remember».", ["to lock"], "«Remember to lock» = recordar hacer algo.");
  T(t, "Rewrite: 'Although it was raining, we went out.' → 'Despite ___, we went out.'", "Gerundio tras «despite».", ["the rain", "it raining"], "«Despite the rain» o «despite it raining».");
  T(t, "Rewrite: 'The car is more expensive than the bike.' → 'The bike is ___ than the car.'", "Comparativo inverso.", ["cheaper"], "Opuesto de «more expensive».");
  T(t, "Rewrite: 'He is too young to vote.' → 'He is ___ young to vote.'", "Expresión negativa de «too».", ["not old enough"], "«Not old enough to vote».");
  T(t, "Rewrite: 'I'd rather stay home tonight.' → 'I ___ stay home tonight.'", "Preferencia: «would prefer to».", ["would prefer to", "prefer to"], "Preferir equivale a «would rather».");
  T(t, "Rewrite: 'Could you tell me the time?' → 'Do you ___ what time it is?'", "Expresión de pedir información.", ["know"], "«Do you know what time it is?».");
  T(t, "Rewrite: 'They have just arrived.' → 'They ___ arrived.'", "Present perfect con «just».", ["have just"], "«Have just arrived».");
  T(t, "Rewrite: 'It is a difficult question.' → 'The question is ___ to answer.'", "Adjetivo de dificultad: «hard».", ["hard", "difficult"], "Sinónimos de «difficult».");
  T(t, "Rewrite: 'He doesn't have much money.' → 'He doesn't have ___ money.'", "Cuantificador de cantidad pequeña.", ["a lot of", "many"], "Opuesto de «not much».");
  T(t, "Rewrite: 'I would like to join the club.' → 'I'd ___ to join the club.'", "Verbo de deseo.", ["love", "like"], "«Love to» o «like to».");
  T(t, "Rewrite: 'The room is too hot.' → 'The room is ___ hot.'", "Expresión de exceso.", ["far too", "much too"], "«Far too hot» = demasiado.");
  T(t, "Rewrite: 'She didn't go because she was ill.' → 'She didn't go ___ she was ill.'", "Conjunción de causa.", ["because"], "Mismo significado.");
  T(t, "Rewrite: 'We will have lunch when the meeting finishes.' → 'We will have lunch ___ the meeting finishes.'", "Conjunción de tiempo.", ["as soon as", "after"], "«As soon as» = en cuanto.");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A2 · Gramática", r = "A2 · Lectura", l = "A2 · Escucha", t = "A2 · Reformulación";

  G(g, "I feel ___ today. I think I have a cold.", ["ill", "illy", "sick-ly"], 0, "Adjetivo «ill» para estar enfermo.");
  T(g, "The children ___ watching a film when we arrived.", "Escribe la palabra que falta.", ["were"], "Pasado continuo con plural: were.");
  T(g, "She has ___ three jobs since she moved to London.", "Escribe la palabra que falta.", ["had"], "Present perfect: had tras «has».");
  G(g, "If I ___ rich, I would travel around the world.", ["were", "was", "am"], 0, "Segundo condicional: were (forma correcta con «I»).");
  T(g, "The bridge ___ built in 1950.", "Escribe la palabra que falta.", ["was"], "Pasiva en pasado: was built.");
  G(g, "He is ___ student in this school.", ["a", "an", "the"], 0, "Artículo indefinido con consonante: a.");
  T(g, "We ___ to the new restaurant last Friday.", "Escribe la palabra que falta.", ["went"], "Pasado simple: went.");
  T(g, "My sister is ___ than me at cooking.", "Escribe la palabra que falta.", ["better"], "Comparativo de «good»: better.");
  G(g, "I'm going to ___ my room this weekend.", ["paint", "painting", "painted"], 0, "«Going to» + forma base.");
  G(g, "You ___ bring a pen. We have plenty.", ["don't need to", "mustn't", "shouldn't"], 0, "Falta de necesidad: don't need to.");
  T(g, "Could you ___ me the way to the museum?", "Escribe la palabra que falta.", ["show"], "«Show me the way» = indicar el camino.");
  T(g, "The lesson ___ at half past nine every morning.", "Escribe la palabra que falta.", ["starts"], "Tercera persona: starts.");
  G(g, "We ___ eaten sushi before, but we liked it.", ["have never", "never have", "didn't never"], 0, "Experiencia negativa: have never + participio.");
  G(g, "Mario ___ his car since Monday.", ["has been using", "is using since", "uses since"], 0, "Present perfect continuo con «since».");
  G(g, "There is ___ bread left in the bag.", ["not much", "not many", "no much"], 0, "«Not much» con incontables.");
  G(g, "If you heat ice, it ___.", ["melts", "will melt", "melted"], 0, "Hecho general: presente.");
  G(g, "I'm looking forward ___ you.", ["to seeing", "to see", "seeing"], 0, "«Look forward to» + gerundio.");
  T(g, "She would ___ a doctor if she studied hard.", "Escribe la palabra que falta.", ["be"], "Condicional: would + base.");
  G(g, "The shop ___ closed when we got there.", ["was", "is", "has been"], 0, "Pasado de «be» con «was».");
  G(g, "They ___ each other since school.", ["have known", "know", "knew"], 0, "Present perfect con «since».");
  T(g, "Both of my parents ___ teachers.", "Escribe la palabra que falta.", ["are"], "Plural con «both»: are.");
  T(g, "I wish I ___ speak French.", "Escribe la palabra que falta.", ["could"], "Deseo: wish + could.");
  G(g, "He's ___ tired to walk home.", ["too", "so", "very"], 0, "«Too» + adjetivo + «to».");

  R(r, "Carmen works at a hospital in Bilbao. She starts her shift early and often has to help new nurses.", "Where does Carmen work?", ["In a school", "In a hospital", "In a shop"], 1, "«She works at a hospital in Bilbao».");
  R(r, "The city centre is closed to cars on Sundays. People walk, cycle and enjoy concerts in the main square.", "What can people do in the main square on Sundays?", ["Drive their cars", "Enjoy concerts", "Park their bikes"], 1, "«Enjoy concerts in the main square».");
  R(r, "Last year Ravi started a small business selling handmade jewellery online. Now he sells to customers all over Europe.", "Where does Ravi sell his jewellery?", ["Only in his town", "All over Europe", "In a market"], 1, "«To customers all over Europe».");
  R(r, "Ivy has a headache and a sore throat, so she stays in bed and drinks lots of hot tea with honey.", "What does Ivy drink?", ["Cold water", "Hot tea with honey", "Orange juice"], 1, "«Hot tea with honey».");
  RT(r, "The new phone is fast and has a great camera. However, its battery does not last very long.", "What is the problem with the phone?", ["The battery"], "«Its battery does not last very long».");
  R(r, "To reduce waste, our school has started a recycling programme. Each class has a bin for paper and one for plastic.", "What does each class have?", ["A bin for paper and one for plastic", "A computer", "A garden"], 0, "«A bin for paper and one for plastic».");
  R(r, "Tom wanted to go to the concert, but the tickets were sold out. He listened to the songs online instead.", "How did Tom listen to the concert?", ["He went to the concert", "He listened online", "He watched on TV"], 1, "«He listened to the songs online».");
  R(r, "The restaurant is famous for its paella. You should book a table at least two days before, because it is very popular.", "Why should you book early?", ["The paella is cheap", "It is very popular", "It is closed"], 1, "«It is very popular».");
  R(r, "Paula is training for a marathon. She runs five kilometres three times a week and eats lots of vegetables.", "How often does Paula run?", ["Once a week", "Three times a week", "Every day"], 1, "«Three times a week».");
  R(r, "Our flight to Lisbon was cancelled because of the storm. The airline offered us a hotel for the night.", "What did the airline offer?", ["A free flight", "A hotel for the night", "A taxi"], 1, "«A hotel for the night».");
  R(r, "When I was a child, I lived in a village with my grandparents. We had chickens and a big vegetable garden.", "What did the writer have as a child?", ["A cat", "Chickens", "Horses"], 1, "«We had chickens».");
  RT(r, "The school year starts in September. Students have three terms, and the summer holidays last about two months.", "How long are the summer holidays?", ["Two months"], "«About two months».");
  R(r, "Last Friday Lucas had an interview for a job at a bank. He was nervous, but he answered all the questions well.", "How did Lucas feel at the interview?", ["Relaxed", "Nervous", "Bored"], 1, "«He was nervous».");
  R(r, "Our neighbours are building an extension on their house. The work is very noisy, so we often close our windows.", "Why do they close the windows?", ["It is cold", "The work is noisy", "It is raining"], 1, "«The work is very noisy».");
  RT(r, "Liam has been learning to cook for a year. His favourite dish is curry, and he makes it for his friends every month.", "How often does Liam make curry for friends?", ["Every month"], "«Every month».");
  R(r, "The volunteers cleaned the beach on Saturday. They collected more than fifty bags of rubbish in just three hours.", "How long did the volunteers work?", ["Three hours", "One day", "Five hours"], 0, "«In just three hours».");
  R(r, "Dear Mark, thanks for the invitation to your wedding. I'm sorry I can't come, but I will send you a present.", "What will Mark's friend do instead?", ["Come to the wedding", "Send a present", "Call him"], 1, "«I will send you a present».");
  R(r, "The library is a great place to study. It has free Wi-Fi, comfortable chairs and a café on the ground floor.", "Where is the café?", ["On the first floor", "On the ground floor", "In the basement"], 1, "«A café on the ground floor»."); 
  RT(r, "Sara moved to a new city last year. At first she felt lonely, but she joined a running club and made many friends.", "How did Sara feel at first?", ["Lonely"], "«She felt lonely».");

  L(l, "Man: Have you been to the new shopping centre? Woman: Not yet. Is it far from here?", "What does the woman ask?", ["Whether it's far", "Where the shop is", "How much it costs"], 0, "«Is it far from here?».");
  L(l, "Girl: I'm going to start a new course next month. Boy: That's great! What's it about?", "What is the girl going to do next month?", ["Start a new course", "Go on holiday", "Buy a car"], 0, "«I'm going to start a new course».");
  L(l, "Woman: The train to Barcelona leaves at nine. Man: Let's be at the station by half past eight.", "What time should they arrive at the station?", ["At eight", "At half past eight", "At nine"], 1, "«By half past eight».");
  L(l, "Boy: I can't find my phone. Girl: Did you check your jacket pocket?", "What does the girl suggest?", ["Check the jacket pocket", "Buy a new phone", "Call the police"], 0, "«Did you check your jacket pocket?».");
  L(l, "Man: How was the hotel? Woman: Very clean and the staff were really friendly.", "What did the woman say about the staff?", ["They were rude", "They were friendly", "They were busy"], 1, "«The staff were really friendly».");
  L(l, "Girl: Shall we go for a walk? Boy: I'd love to, but I have to finish this email first.", "What does the boy have to do?", ["Finish an email", "Go for a walk", "Cook dinner"], 0, "«I have to finish this email».");
  L(l, "Woman: What's the best way to get to the museum? Man: You can take the metro, it's only five minutes from the station.", "How can she get to the museum?", ["By bus", "By metro", "On foot"], 1, "«You can take the metro».");
  L(l, "Man: I've been feeling tired lately. Woman: Maybe you should go to bed earlier.", "What does the woman suggest?", ["Go to bed earlier", "Drink more coffee", "Go to the doctor"], 0, "«You should go to bed earlier».");
  L(l, "Girl: Did you enjoy the film? Boy: Yes, but it was much longer than I expected.", "What did the boy think about the film?", ["It was too short", "It was longer than expected", "He didn't see it"], 1, "«Much longer than I expected».");
  LT(l, "Woman: Could you pass me the salt, please? Man: Here you are. Do you want some pepper too?", "What does the woman ask for first?", ["Salt"], "«Could you pass me the salt?».");
  L(l, "Boy: I'm going to join the swimming team. Girl: That's a good idea. When is the first training?", "What is the boy going to join?", ["A football team", "The swimming team", "A music band"], 1, "«Join the swimming team».");
  L(l, "Man: Excuse me, does this bus go to the airport? Driver: No, you need the blue bus over there.", "Which bus should the man take?", ["The bus here", "The blue bus", "A taxi"], 1, "«You need the blue bus».");
  L(l, "Woman: Are you free on Thursday? Man: I think so, but I'll check my diary and let you know.", "What will the man do?", ["Check his diary", "Go to work", "Call a friend"], 0, "«I'll check my diary».");
  L(l, "Girl: The shop has a sale this week. Boy: Really? How much are the shoes?", "What is the boy asking about?", ["The price of the shoes", "The shop's address", "The opening time"], 0, "«How much are the shoes?».");
  L(l, "Man: This coffee is too hot. Waiter: I'm sorry, let me get you a cold drink.", "What is wrong with the coffee?", ["It is too cold", "It is too hot", "It is too sweet"], 1, "«This coffee is too hot».");
  L(l, "Woman: I'm sorry I'm late. Man: No problem, I only arrived five minutes ago.", "How long has the man been waiting?", ["Five minutes", "Twenty minutes", "An hour"], 0, "«Five minutes ago».");
  L(l, "Boy: Can I have a bigger room? Receptionist: I'm afraid all the big rooms are taken tonight.", "Why can't the boy have a bigger room?", ["The big rooms are taken", "The rooms are too expensive", "The hotel is closed"], 0, "«All the big rooms are taken».");
  L(l, "Girl: Which seat is yours? Man: Number twelve, next to the window.", "Where is the man's seat?", ["Next to the door", "Next to the window", "At the back"], 1, "«Next to the window».");
  LT(l, "Woman: I'd like to book a table for two at eight. Waiter: Certainly. What name is it, please?", "At what time is the table reserved?", ["Eight"], "«For two at eight».");
  L(l, "Man: Are you coming to the gym with me? Woman: Not today, I'm going to visit my grandmother.", "Where is the woman going today?", ["To the gym", "To visit her grandmother", "To work"], 1, "«I'm going to visit my grandmother».");
  L(l, "Boy: Do you know how to fix a bike? Girl: Yes, my dad taught me last summer.", "Who taught the girl to fix a bike?", ["Her dad", "Her teacher", "Her friend"], 0, "«My dad taught me».");

  T(t, "Rewrite: 'It is not possible to park here.' → 'You ___ park here.'", "Expresión de prohibición: «can't».", ["can't", "cannot"], "«Can't park» = no se puede aparcar.");
  T(t, "Rewrite: 'I last saw her in 2018.' → 'I ___ her since 2018.'", "Present perfect negativo con «since».", ["haven't seen"], "«Haven't seen her since 2018».");
  T(t, "Rewrite: 'She is the best player in the team.' → 'No other player in the team is ___ her.'", "Comparativo de superioridad.", ["as good as", "better than"], "Expresión de comparación.");
  T(t, "Rewrite: 'Please don't be late.' → 'Make sure you ___ late.'", "Expresión de no llegar tarde.", ["aren't late", "are not late", "are on time"], "«Make sure you're not late».");
  T(t, "Rewrite: 'He drove very fast and he had an accident.' → 'Driving very fast, he ___ an accident.'", "Pasado simple del verbo «have».", ["had"], "«He had an accident».");
  T(t, "Rewrite: 'It is a good idea to take a jacket.' → 'You ___ take a jacket.'", "Consejo con «should».", ["should"], "«Should» = consejo.");
  T(t, "Rewrite: 'We don't have enough chairs.' → 'We need ___ chairs.'", "Cuantificador: «more».", ["more"], "«More chairs» = más sillas.");
  T(t, "Rewrite: 'The shop opens at nine and closes at five.' → 'The shop is open ___ nine ___ five.'", "Preposiciones de tiempo.", ["from ... to", "from", "until"], "«From nine to five».");
  T(t, "Rewrite: 'My brother is a very good swimmer.' → 'My brother swims ___.'", "Adverbio de «bien».", ["very well", "really well"], "«Swims very well».");
  T(t, "Rewrite: 'He will be here soon.' → 'He ___ here in a few minutes.'", "Futuro con «be going to» o «will».", ["will be", "is going to be", "'ll be"], "Futuro próximo.");
  T(t, "Rewrite: 'I'm not interested in football.' → 'Football ___ me.'", "Verbo que signifique «no interesar».", ["doesn't interest"], "«Doesn't interest me» = no me interesa.");
  T(t, "Rewrite: 'Please turn off the TV before you leave.' → 'Please switch ___ the TV before you leave.'", "Phrasal verb de apagar.", ["off"], "«Switch off» = apagar.");
  T(t, "Rewrite: 'It's better to walk than to drive in the city.' → 'In the city, walking ___ than driving.'", "Comparativo de «good».", ["is better"], "«Walking is better than driving».");
  T(t, "Rewrite: 'Let's meet at the park at five.' → 'How about ___ at the park at five?'", "Sugerencia con «meeting».", ["meeting"], "«How about meeting...».");
  T(t, "Rewrite: 'You can use my car this weekend.' → 'You're welcome to ___ my car this weekend.'", "Expresión de permiso: «use».", ["use"], "«You're welcome to use».");
  T(t, "Rewrite: 'The museum is not far from the hotel.' → 'The museum is ___ the hotel.'", "Preposición de cercanía.", ["near", "close to"], "«Near» o «close to».");
  T(t, "Rewrite: 'Last year she started going to the gym.' → 'She ___ to the gym for a year.'", "Present perfect de duración.", ["has been going", "has been going to"], "Present perfect continuo.");
  T(t, "Rewrite: 'Although I was tired, I finished my work.' → 'I was tired, ___ I finished my work.'", "Conjunción de contraste.", ["but", "yet", "still"], "«But» o «yet» expresan contraste.");
  T(t, "Rewrite: 'We walked for two hours and then we rested.' → 'After ___ for two hours, we rested.'", "Gerundio tras «after».", ["walking"], "«After walking».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A2 · Gramática", r = "A2 · Lectura", l = "A2 · Escucha", t = "A2 · Reformulación";

  T(g, "When I arrived, they ___ already left.", "Escribe la palabra que falta.", ["had"], "Pasado perfecto: had + participio.");
  T(g, "She ___ to the gym three times last week.", "Escribe la palabra que falta.", ["went"], "Pasado simple irregular: went.");
  G(g, "This is ___ most beautiful beach I have ever seen.", ["the", "a", "an"], 0, "Superlativo con «the».");
  T(g, "I'm ___ of the dark, so I always leave a light on.", "Escribe la palabra que falta.", ["afraid"], "«Be afraid of».");
  G(g, "You ___ go to bed so late on school nights.", ["shouldn't", "mustn't", "couldn't"], 0, "Consejo negativo: shouldn't.");
  G(g, "The new road ___ finished next year.", ["will be", "is", "was"], 0, "Futuro pasivo: will be finished.");
  T(g, "He ___ speak three languages fluently.", "Escribe la palabra que falta.", ["can"], "Habilidad presente: can.");
  T(g, "I've ___ my homework, so I can go out.", "Escribe la palabra que falta.", ["finished"], "Present perfect: participio de «finish».");
  G(g, "She is the ___ person I know.", ["kindest", "kindness", "kinder"], 0, "Superlativo de «kind»: kindest.");
  T(g, "I don't mind ___ the washing-up tonight.", "Escribe la palabra que falta.", ["doing"], "«Mind» + gerundio.");
  T(g, "The concert ___ at eight, so don't be late.", "Escribe la palabra que falta.", ["starts"], "Presente para horarios fijos: starts.");
  G(g, "___ you like to come with us?", ["Would", "Will", "Do"], 0, "Invitación educada: would you like.");
  T(g, "We're ___ the holidays in Greece this year.", "Escribe la palabra que falta.", ["spending"], "Presente continuo para planes: spending.");
  G(g, "My father ___ in a bank for twenty years.", ["has worked", "worked", "works"], 0, "Duración hasta ahora: has worked.");
  G(g, "There is ___ water in the bottle.", ["a little", "a few", "many"], 0, "«A little» con incontables.");
  G(g, "They ___ visit us next Christmas.", ["are going to", "go to", "went to"], 0, "Plan futuro: are going to.");
  G(g, "Sam's car is ___ than mine.", ["newer", "more new", "newest"], 0, "Comparativo de «new»: newer.");
  T(g, "I ___ a new phone last month.", "Escribe la palabra que falta.", ["bought"], "Pasado de «buy»: bought.");
  T(g, "Can you ___ this word for me? I don't understand it.", "Escribe la palabra que falta.", ["explain"], "«Explain» sin objeto indirecto.");
  G(g, "He hasn't called me ___ Tuesday.", ["since", "for", "ago"], 0, "«Since» + punto en el tiempo.");
  T(g, "I'd ___ a cup of coffee, please.", "Escribe la palabra que falta.", ["like"], "«I'd like» = quisiera.");
  T(g, "The window ___ broken during the storm.", "Escribe la palabra que falta.", ["was"], "Pasiva en pasado con singular: was.");
  G(g, "We don't have ___ time to visit the museum.", ["enough", "many", "much of"], 0, "«Enough» + sustantivo.");
  T(g, "I usually ___ breakfast with my family.", "Escribe la palabra que falta.", ["have"], "Presente simple con «I»: have.");
  G(g, "Where ___ you born?", ["were", "was", "did"], 0, "Pasado de «be» con «you»: were.");

  R(r, "Tina is a waitress in a busy café. She works from eight until three and she enjoys meeting new people.", "What does Tina enjoy?", ["Cooking", "Meeting new people", "Driving"], 1, "«She enjoys meeting new people».");
  R(r, "The new cinema has five screens and comfortable seats. Tickets are cheaper on Wednesdays.", "When exactly are tickets cheaper?", ["On Mondays", "On Wednesdays", "On Sundays"], 1, "«Tickets are cheaper on Wednesdays».");
  R(r, "I started learning the guitar two years ago. At the beginning it was difficult, but now I can play my favourite songs.", "What can the writer do now?", ["Read music", "Play favourite songs", "Sing in a choir"], 1, "«Now I can play my favourite songs».");
  R(r, "Our office moved to a new building in the centre of town. Now we have a larger kitchen and a small gym on the top floor.", "What can you find on the top floor?", ["A kitchen", "A small gym", "A parking lot"], 1, "«A small gym on the top floor».");
  RT(r, "Nora bought a second-hand bike last month. It was cheap and in good condition, so she rides it to work every day.", "How does Nora get to work?", ["By bike"], "«She rides it to work every day».");
  R(r, "My friends and I went to a food festival in the park. There were stalls with food from many countries and live music.", "What was at the festival?", ["Only drinks", "Food from many countries and live music", "Sports games"], 1, "«Food from many countries and live music».");
  R(r, "The doctor told Pedro to drink more water and to walk for thirty minutes every day. He is now feeling much better.", "What did the doctor advise?", ["To drink more water and walk", "To stop working", "To take the train"], 0, "«Drink more water and walk for thirty minutes».");
  R(r, "The mountain village is very quiet. There are only a few shops, but the views of the valley are wonderful.", "What is the village like?", ["Busy and noisy", "Quiet with few shops", "Very large"], 1, "«Very quiet» y «only a few shops».");
  R(r, "On our first day in Rome we visited the Colosseum. We were amazed by how big it was and took lots of photos.", "What did they do at the Colosseum?", ["They swam", "They took lots of photos", "They went shopping"], 1, "«Took lots of photos».");
  R(r, "Mike asked his boss for a day off next Friday. His boss agreed because he had worked hard all month.", "Why did the boss agree?", ["Mike was ill", "Mike had worked hard", "It was a holiday"], 1, "«Because he had worked hard all month».");
  R(r, "The park is closed for repairs until next spring. Visitors can use the path on the other side of the lake.", "Until when is the park closed?", ["Next summer", "Next spring", "Next week"], 1, "«Closed for repairs until next spring»."); 
  R(r, "Ella lost her wallet on the bus. Luckily, the driver found it and gave it back to her at the bus station.", "Where did Ella get her wallet back?", ["At home", "At the bus station", "At the shop"], 1, "«At the bus station»."); 
  R(r, "A new study says that people who sleep at least seven hours feel happier and make fewer mistakes at work.", "What does the study say?", ["Sleep makes you tired", "Sleeping seven hours helps people feel happier", "Work is bad for sleep"], 1, "«Feel happier» con siete horas de sueño."); 
  RT(r, "Our teacher gave us a difficult test on Monday. Most of us did not pass, so we will have another one next week.", "When will the next test be?", ["Next week"], "«Another one next week».");
  R(r, "Last winter the roads were covered in snow for several days. The buses stopped running, so people walked to work.", "How did people get to work?", ["By bus", "They walked", "By train"], 1, "«People walked to work»."); 
  R(r, "The hotel offers free breakfast from seven to ten. There is also a small swimming pool on the roof.", "Where is the swimming pool?", ["In the basement", "On the roof", "Next to the restaurant"], 1, "«On the roof»."); 
  R(r, "Simon has just finished his degree in biology. He hopes to find a job in a research laboratory next year.", "What does Simon hope to do?", ["Work in a laboratory", "Open a shop", "Study medicine"], 0, "«Find a job in a research laboratory»."); 
  R(r, "The children were very excited about the trip to the zoo. They saw lions, monkeys and a giant turtle.", "What did the children see?", ["Horses", "Lions, monkeys and a giant turtle", "Penguins"], 1, "«Lions, monkeys and a giant turtle»."); 
  R(r, "When the power went out, we lit some candles and played cards. It was a fun evening, even without electricity.", "What did they do during the power cut?", ["They watched TV", "They played cards", "They went out"], 1, "«They played cards»."); 
  R(r, "My sister wants to become a vet. She volunteers at an animal shelter every Saturday to gain experience.", "Where does the sister volunteer?", ["At a hospital", "At an animal shelter", "At a school"], 1, "«At an animal shelter»."); 

  LT(l, "Man: Is the swimming pool open on Sundays? Woman: Yes, but it closes early, at five.", "When does the pool close on Sundays?", ["At five"], "«It closes early, at five».");
  L(l, "Girl: Have you ever tried Thai food? Boy: Yes, I had a curry there last year. It was spicy!", "What did the boy have?", ["A curry", "A pizza", "A salad"], 0, "«I had a curry there».");
  LT(l, "Woman: How many people are coming to the barbecue? Man: About twenty, I think.", "How many people are coming?", ["About twenty"], "«About twenty».");
  L(l, "Man: Are you going to buy a new sofa? Woman: Yes, the one in the shop window is very nice.", "Where did the woman see the sofa?", ["On the internet", "In the shop window", "At a friend's house"], 1, "«In the shop window».");
  L(l, "Girl: The plane leaves at six. Boy: We should get to the airport by four to be safe.", "What time should they arrive at the airport?", ["By four", "By six", "By five"], 0, "«By four».");
  LT(l, "Woman: Which university did you go to? Man: The one near the river. I studied chemistry there.", "What did the man study?", ["Chemistry"], "«I studied chemistry».");
  L(l, "Boy: My dog is very tired after the walk. Girl: Maybe he needs a long rest.", "What does the dog need?", ["A long rest", "A bath", "More food"], 0, "«He needs a long rest».");
  L(l, "Man: How often do you practise the piano? Girl: Every day, for about an hour.", "How long does the girl practise each day?", ["Half an hour", "An hour", "Two hours"], 1, "«About an hour»."); 
  L(l, "Woman: Did you remember to buy the milk? Man: Oh no, I forgot. I'll go back to the shop now.", "What is the man going to do?", ["Go back to the shop", "Call the shop", "Buy bread"], 0, "«I'll go back to the shop».");
  LT(l, "Girl: Is it going to be hot this weekend? Boy: I think it'll be around thirty degrees on Saturday.", "What temperature is expected on Saturday?", ["Around thirty"], "«Around thirty degrees».");
  L(l, "Man: I'd like to change my flight, please. Agent: Of course. What date would you prefer?", "What does the man want to do?", ["Cancel his flight", "Change his flight", "Buy a new ticket"], 1, "«I'd like to change my flight»."); 
  L(l, "Woman: Do you need a lift to the station? Man: Yes, please. That would be great.", "What does the man need?", ["A lift to the station", "A new bag", "A taxi number"], 0, "«Do you need a lift to the station?»."); 
  L(l, "Boy: Where did you put my book? Mum: It's on the kitchen table, next to the fruit.", "Where is the book?", ["On the kitchen table", "On the sofa", "In the bag"], 0, "«On the kitchen table»."); 
  L(l, "Girl: Can we watch a film tonight? Dad: Yes, but first you have to finish your reading.", "What must the girl do first?", ["Watch a film", "Finish her reading", "Go to bed"], 1, "«First you have to finish your reading»."); 
  L(l, "Man: What's the matter? You look worried. Woman: I lost my train ticket and I don't know what to do.", "Why is the woman worried?", ["She lost her ticket", "She missed her train", "She is ill"], 0, "«I lost my train ticket»."); 
  L(l, "Boy: Can you show me how to use this camera? Girl: Sure, first you press this button.", "What does the girl show the boy?", ["How to use the camera", "How to cook", "How to drive"], 0, "«Show me how to use this camera»."); 
  L(l, "Woman: Do you prefer walking or cycling? Man: Cycling, because it's faster and more fun.", "What does the man prefer?", ["Walking", "Cycling", "Driving"], 1, "«Cycling»."); 
  LT(l, "Man: I'm going on holiday next week. Woman: Really? Where? Man: To Portugal, to visit my cousins.", "Where is the man going?", ["To Portugal"], "«To Portugal».");
  L(l, "Girl: The library closes at eight tonight. Boy: Let's leave now, then. We don't have much time.", "What time does the library close?", ["At seven", "At eight", "At nine"], 1, "«The library closes at eight»."); 
  L(l, "Woman: Could I speak to the manager, please? Receptionist: One moment, I'll see if he is free.", "What does the woman ask for?", ["To speak to the manager", "A room", "A refund"], 0, "«Could I speak to the manager?»."); 

  T(t, "Rewrite: 'I have not been to Japan.' → 'I ___ Japan.'", "Present perfect negativo con «never».", ["have never been to", "have never visited"], "«Have never been to» = nunca he estado.");
  T(t, "Rewrite: 'She is sure that she will pass.' → 'She is ___ pass.'", "Expresión de seguridad con «to».", ["certain to", "sure to"], "«Sure to pass» = seguro que aprobará.");
  T(t, "Rewrite: 'The train was late, so we missed the meeting.' → 'Because the train was late, we ___ the meeting.'", "Verbo que significa «perder».", ["missed"], "Pasado simple de «miss».");
  T(t, "Rewrite: 'It's a pity that you can't come.' → 'I wish you ___ come.'", "Deseo presente: «could».", ["could"], "«I wish you could come».");
  T(t, "Rewrite: 'Please write your name on the form.' → 'Could you ___ the form?'", "Pedir de forma educada, verbo «sign» o «fill in».", ["fill in", "sign"], "«Fill in» = rellenar.");
  T(t, "Rewrite: 'He never arrives on time.' → 'He is always ___.'", "Adverbio contrario de «never».", ["late"], "«Always late» = siempre llega tarde.");
  T(t, "Rewrite: 'Shall I open the window?' → 'Would you like ___ the window?'", "Ofrecimiento con gerundio.", ["me to open", "me to open the window"], "«Would you like me to open...».");
  T(t, "Rewrite: 'This dress is not as expensive as that one.' → 'That dress is ___ than this one.'", "Comparativo inverso de «expensive».", ["more expensive"], "«More expensive» = más caro.");
  T(t, "Rewrite: 'I'm sorry I didn't call you.' → 'I ___ called you.'", "Lamento haber olvidado algo: «should have».", ["should have"], "«I should have called you».");
  T(t, "Rewrite: 'The bread was made by my grandmother.' → 'My grandmother ___ the bread.'", "Voz activa en pasado.", ["made"], "«My grandmother made the bread».");
  T(t, "Rewrite: 'We don't have any milk.' → 'We have ___ milk.'", "Negativo con «no»: «no milk».", ["no"], "«We have no milk».");
  T(t, "Rewrite: 'Do you know where the hospital is?' → 'Can you tell me ___ the hospital is?'", "Pregunta indirecta con «where».", ["where"], "«Can you tell me where...».");
  T(t, "Rewrite: 'It is important to sleep well.' → 'You ___ sleep well.'", "Consejo fuerte con «must».", ["must", "need to", "have to"], "«You must sleep well».");
  T(t, "Rewrite: 'I don't like hot weather.' → 'I prefer cold weather ___ hot weather.'", "Preposición de comparación.", ["to"], "«Prefer ... to».");
  T(t, "Rewrite: 'We will leave when you are ready.' → 'We will leave ___ you are ready.'", "Conjunción de tiempo.", ["as soon as", "once", "when"], "Expresión de tiempo futuro.");
  T(t, "Rewrite: 'The bus is coming soon.' → 'The bus is ___ .'", "Expresión de inminencia.", ["on its way", "about to arrive"], "«On its way» = ya viene.");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "A2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "A2 · Gramática", r = "A2 · Lectura", l = "A2 · Escucha", t = "A2 · Reformulación";

  T(g, "Last night I ___ a very strange dream.", "Escribe la palabra que falta.", ["had"], "Pasado simple de «have»: had.");
  G(g, "She ___ her coat because it was cold.", ["put on", "put off", "put up"], 0, "Phrasal verb «put on» = ponerse una prenda.");
  T(g, "He is taller ___ his father now.", "Escribe la palabra que falta.", ["than"], "«Taller than» para comparar.");
  G(g, "They ___ to the shop when it closed.", ["were going", "went", "goes"], 0, "Pasado continuo: were going.");
  G(g, "Would you mind ___ the door?", ["closing", "to close", "close"], 0, "«Would you mind» + gerundio.");
  T(g, "It ___ snowing when we left the house.", "Escribe la palabra que falta.", ["was"], "Pasado continuo con «it»: was snowing.");
  G(g, "I ___ my English since I was ten.", ["have practised", "practised", "practise"], 0, "Present perfect con «since».");
  T(g, "You don't ___ to pay for the ticket now.", "Escribe la palabra que falta.", ["have"], "«Don't have to» = no es necesario.");
  G(g, "Anna's birthday ___ on a Monday this year.", ["falls", "falling", "fell"], 0, "Tercera persona de «fall»: falls.");
  T(g, "I haven't ___ a letter for ages.", "Escribe la palabra que falta.", ["written"], "Participio de «write»: written.");
  G(g, "We ___ a lot of fun at the party last night.", ["had", "have", "were"], 0, "Pasado de «have»: had.");
  T(g, "This soup is ___ than the one from yesterday.", "Escribe la palabra que falta.", ["tastier"], "Comparativo de «tasty»: tastier.");
  RT(r, "Jake loves cooking Italian food. Every Sunday he makes pasta for his family and his grandmother always helps him.", "Who helps Jake on Sundays?", ["His grandmother"], "«His grandmother always helps him».");
  R(r, "The bakery opens at six in the morning. Its bread is famous, and many people queue before work.", "When do people queue?", ["Before work", "After dinner", "At lunchtime"], 0, "«Many people queue before work».");
  RT(r, "Our trip to Scotland was amazing. We hiked in the hills, visited old castles and saw the famous Loch Ness.", "What did they see in Scotland?", ["Loch Ness"], "«Saw the famous Loch Ness».");
  R(r, "My new flat is much bigger than my old one. It has a garden where I can grow tomatoes and herbs.", "What can the writer grow in the garden?", ["Flowers", "Tomatoes and herbs", "Apples"], 1, "«Grow tomatoes and herbs».");
  L(l, "Woman: Can I pay by card? Man: Yes, of course. Or you can pay in cash if you prefer.", "How can the woman pay?", ["By card or cash", "Only in cash", "By cheque"], 0, "«By card» o «in cash».");
  LT(l, "Boy: What do you want to do this afternoon? Girl: Let's go swimming, then we can have an ice cream.", "What do they want to do first?", ["Go swimming"], "«Let's go swimming».");
  L(l, "Man: I'm sorry, the meeting has been moved to Thursday. Woman: No problem, I'll be there.", "When is the meeting now?", ["Monday", "Thursday", "Friday"], 1, "«Moved to Thursday».");
  L(l, "Girl: Did you see the new exhibition at the gallery? Boy: Yes, the paintings were amazing.", "What did the boy think of the paintings?", ["They were boring", "They were amazing", "He didn't see them"], 1, "«The paintings were amazing».");
  T(t, "Rewrite: 'You don't need a ticket for the bus.' → 'A ticket ___ for the bus.'", "Expresión de no necesidad.", ["isn't needed", "is not needed"], "«Isn't needed» = no hace falta.");
  T(t, "Rewrite: 'Could you help me with my bag?' → 'Would you ___ help me with my bag?'", "Petición cortés con «mind».", ["mind", "mind helping"], "«Would you mind helping me».");
  T(t, "Rewrite: 'We haven't eaten since breakfast.' → 'The last time we ate was ___.'", "Expresión de tiempo: «breakfast».", ["breakfast", "at breakfast", "at breakfast time"], "Momento pasado.");
  T(t, "Rewrite: 'She is good at drawing.' → 'She is ___ drawing.'", "Adjetivo de habilidad: «talented» o «good».", ["talented at", "good at"], "«Good at» o «talented at».");
  T(t, "Rewrite: 'Let's go for a walk.' → 'Why ___ go for a walk?'", "Sugerencia con «don't».", ["don't we", "don't we?"], "«Why don't we...?».");
  T(t, "Rewrite: 'He is too busy to call you.' → 'He is ___ busy to call you.'", "Expresión de «demasiado».", ["too"], "Mismo sentido.");
  T(t, "Rewrite: 'The shop is closed on Sundays.' → 'The shop ___ on Sundays.'", "Verbo «be» con preposición o phrasal.", ["doesn't open", "does not open", "is closed"], "«Doesn't open» = no abre.");
  T(t, "Rewrite: 'Do you want a drink?' → 'Would you ___ a drink?'", "Oferta educada con «like».", ["like"], "«Would you like a drink?».");
  T(t, "Rewrite: 'I think it will rain tomorrow.' → 'It ___ rain tomorrow.'", "Probabilidad con «might».", ["might", "may", "will probably"], "Expresión de posibilidad.");
  T(t, "Rewrite: 'He hasn't finished his homework yet.' → 'He still ___ his homework.'", "Verbo «to do» en presente continuo.", ["is doing", "hasn't finished", "hasn't done"], "«Still» expresa que no ha terminado.");
  T(t, "Rewrite: 'It's expensive to live in London.' → 'Living in London ___.'", "Adjetivo de precio: «expensive».", ["is expensive", "costs a lot"], "«Is expensive» o «costs a lot».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B1 · Gramática", r = "B1 · Lectura", l = "B1 · Escucha", t = "B1 · Reformulación";

  T(g, "If I had more time, I ___ learn to play the piano.", "Escribe la palabra que falta.", ["would"], "Segundo condicional: would + base.");
  G(g, "The report ___ by the team before the deadline.", ["had been finished", "has finished", "was finishing"], 0, "Pasiva en pasado perfecto.");
  G(g, "She suggested ___ to the cinema after work.", ["going", "to go", "go"], 0, "«Suggest» + gerundio.");
  T(g, "I wish I ___ taken that job last year.", "Escribe la palabra que falta.", ["had"], "Lamento sobre el pasado: wish + past perfect.");
  G(g, "By the time we got there, the film ___.", ["had started", "started", "has started"], 0, "Pasado perfecto con «by the time».");
  T(g, "Not only ___ he late, but he also forgot the tickets.", "Escribe la palabra que falta.", ["was"], "Inversión tras «not only»: was.");
  G(g, "He is used to ___ early in the morning.", ["getting up", "get up", "got up"], 0, "«Be used to» + gerundio.");
  G(g, "The children ___ be in bed by now. It's midnight.", ["must", "can", "should"], 0, "Deducción fuerte: must be.");
  G(g, "Had I known about the traffic, I ___ earlier.", ["would have left", "left", "would leave"], 0, "Tercer condicional invertido.");
  T(g, "I'd rather you ___ tell anyone about the party.", "Escribe la palabra que falta.", ["didn't"], "«I'd rather» + pasado en subjuntivo.");
  G(g, "The more you practise, ___ you will become.", ["the better", "better", "more good"], 0, "Estructura «the more..., the better».");
  G(g, "She denied ___ the window, but we saw her do it.", ["breaking", "to break", "break"], 0, "«Deny» + gerundio.");
  G(g, "The new software is ___ than the old version.", ["far more efficient", "far more efficiently", "more far efficient"], 0, "«Far more» + adjetivo.");
  G(g, "I'm not sure what ___ next week.", ["is happening", "happens", "will happen"], 0, "Pregunta indirecta en presente continuo.");
  G(g, "If you ___ me earlier, I could have helped.", ["had told", "told", "tell"], 0, "Tercer condicional: had told.");
  T(g, "They ___ to have lived in Paris before they moved.", "Escribe la palabra que falta.", ["seem"], "«Seem to» + infinitivo perfecto.");
  T(g, "It's essential that everyone ___ on time.", "Escribe la palabra que falta.", ["arrives"], "Subjuntivo tras «essential that»: arrives.");
  G(g, "She is ___ to be promoted next month.", ["likely", "probably", "possible"], 0, "«Likely to» + infinitivo.");
  T(g, "I'd like you to ___ this letter for me.", "Escribe la palabra que falta.", ["check"], "«Like you to» + base.");
  G(g, "The town ___ by the Romans two thousand years ago.", ["was founded", "founded", "has founded"], 0, "Pasiva en pasado: was founded.");
  T(g, "Scarcely ___ I arrived when it started to rain.", "Escribe la palabra que falta.", ["had"], "Inversión con «scarcely»: had I arrived.");
  G(g, "He is ___ to speak in public, so he avoids it.", ["reluctant", "keen", "fond"], 0, "«Reluctant to» = poco dispuesto.");
  G(g, "We ___ have to wait for hours at the airport last time.", ["had to", "have to", "must"], 0, "Obligación en pasado: had to.");
  T(g, "This is the book ___ I told you about.", "Escribe la palabra que falta.", ["that"], "Relativa de objeto: that.");

  R(r, "Working from home has become popular, but many people miss the social side of the office. Some companies now offer a mix of both.", "What do some companies offer now?", ["Only office work", "A mix of home and office work", "Only home work"], 1, "«A mix of both».");
  R(r, "The council plans to build a new cycle path along the river. Residents hope it will reduce traffic in the city centre.", "Why do residents support the plan?", ["To build more roads", "To reduce traffic", "To close the river"], 1, "«Reduce traffic in the city centre».");
  R(r, "Although the film received excellent reviews, it did not do well at the box office. Critics praised the acting but felt the story was predictable.", "What did critics criticise?", ["The acting", "The predictable story", "The music"], 1, "«The story was predictable».");
  R(r, "Many students find it difficult to balance part-time work with their studies. Universities now offer more flexible timetables to help them.", "What do universities offer?", ["Free housing", "More flexible timetables", "Longer holidays"], 1, "«More flexible timetables».");
  R(r, "The company announced a significant rise in profits this year, largely due to its expansion into Asian markets.", "What caused the rise in profits?", ["New products in Europe", "Expansion into Asian markets", "Lower salaries"], 1, "«Expansion into Asian markets».");
  R(r, "Doctors recommend at least thirty minutes of moderate exercise a day. Walking, swimming and cycling are all good options.", "Which exercise is NOT mentioned?", ["Walking", "Running", "Cycling"], 1, "No se menciona correr.");
  RT(r, "Last month a storm damaged several houses along the coast. The local government has promised financial help to affected families.", "What has the government promised?", ["Financial help"], "«Promised financial help».");
  R(r, "Learning a language requires patience. Many learners give up after a few months, yet consistent practice, even for ten minutes a day, often leads to real progress.", "What helps learners progress?", ["Studying for hours once a week", "Consistent daily practice", "Watching films only"], 1, "«Consistent practice, even for ten minutes a day».");
  R(r, "The museum has reopened after a three-year renovation. Visitors can now see a new wing dedicated to modern art.", "What is new in the museum?", ["A café", "A wing for modern art", "A car park"], 1, "«A new wing dedicated to modern art».");
  R(r, "Although she was nervous, Clara gave an excellent presentation. Her colleagues congratulated her and her manager promised to recommend her for promotion.", "What did her manager promise?", ["A holiday", "To recommend her for promotion", "A pay cut"], 1, "«To recommend her for promotion».");
  R(r, "Recycling rates have increased over the last decade, but experts say we still produce too much plastic waste.", "What do experts say?", ["Recycling has stopped", "Too much plastic waste is produced", "Plastic is cheap"], 1, "«We still produce too much plastic waste».");
  R(r, "The festival attracted more visitors than expected. Organisers have now decided to extend it by two days next year.", "What will organisers do next year?", ["Cancel the festival", "Extend it by two days", "Move it abroad"], 1, "«Extend it by two days».");
  R(r, "Renting a flat in the city can be expensive, so many young people choose to share with friends or move further out.", "Why do young people share flats?", ["It is cheaper", "They like parties", "It is required"], 0, "Compartir reduce gastos.");
  R(r, "The new hospital will open its doors in autumn. It will have two hundred beds and a modern emergency unit.", "How many beds will the hospital have?", ["Two hundred", "Twenty", "Two thousand"], 0, "«Two hundred beds».");
  R(r, "After years of research, the scientists announced a new treatment that could help patients recover more quickly.", "What did the scientists announce?", ["A new treatment", "A new hospital", "A cure for colds"], 0, "«A new treatment».");

  L(l, "Woman: I've been thinking about moving abroad. Man: Really? Where would you go? Woman: Maybe Germany, I'd like to improve my German.", "Why does the woman want to move?", ["To improve her German", "For a holiday", "To find a partner"], 0, "«To improve my German».");
  L(l, "Man: The meeting was cancelled because the manager was ill. Woman: That's a shame, we had a lot to discuss.", "Why was the meeting cancelled?", ["The manager was ill", "The room was closed", "Nobody came"], 0, "«The manager was ill».");
  L(l, "Girl: I've applied for the scholarship, but I'm not sure I'll get it. Boy: Don't worry, your application was excellent.", "What does the boy think about her application?", ["It was excellent", "It was late", "It was incomplete"], 0, "«Your application was excellent».");
  L(l, "Woman: Could you explain why the train was delayed? Man: There was a problem with the signals near the station.", "What caused the delay?", ["Bad weather", "A problem with the signals", "A strike"], 1, "«A problem with the signals».");
  L(l, "Man: I think we should invest in solar panels. Woman: It's expensive at first, but it saves money in the long run.", "What does the woman say about solar panels?", ["They are cheap", "They save money in the long run", "They are dangerous"], 1, "«It saves money in the long run».");
  L(l, "Boy: Do you think the exam will be difficult? Girl: It might be, but if we revise every day, we'll be fine.", "What does the girl think they should do?", ["Revise every day", "Skip the exam", "Ask for a delay"], 0, "«If we revise every day».");
  LT(l, "Woman: The hotel staff were very helpful, although the room was a bit small. Man: I agree, but the location was perfect.", "What did the man like about the hotel?", ["The location"], "«The location was perfect».");
  L(l, "Girl: Have you heard about the new bus route? Boy: Yes, it goes straight to the university, which is really convenient.", "Why is the bus route convenient?", ["It is cheap", "It goes to the university", "It is fast"], 1, "«It goes straight to the university».");
  L(l, "Man: I'm not convinced by the new plan. Woman: Let's discuss it again tomorrow, once we've had time to think.", "What final decision do they reach?", ["Discuss it tomorrow", "Cancel the plan", "Accept the plan today"], 0, "«Let's discuss it again tomorrow».");
  L(l, "Woman: How long have you been working here? Man: Almost five years. I started just after university.", "How long has the man worked there?", ["Five years", "Two years", "Ten years"], 0, "«Almost five years».");
  LT(l, "Boy: The concert tickets are sold out. Girl: Oh no! I was really looking forward to it.", "How does the girl feel?", ["Disappointed"], "«I was really looking forward to it» implica decepción.");
  L(l, "Man: Would you mind taking a message for me? Woman: Not at all. Who should I tell?", "What does the man want the woman to do?", ["Take a message", "Make a call", "Write a letter"], 0, "«Would you mind taking a message?».");
  L(l, "Girl: My grandfather has just celebrated his ninetieth birthday. Boy: That's wonderful! What did he do to celebrate?", "What is the grandfather's age?", ["Eighty", "Ninety", "Nineteen"], 1, "«His ninetieth birthday».");
  L(l, "Woman: I've decided to change my job next year. Man: That sounds like a big step. What made you decide?", "What has the woman decided?", ["To change her job", "To move house", "To retire"], 0, "«I've decided to change my job».");
  L(l, "Boy: Did you know that the library has an online service now? Girl: Yes, I've been using it to download e-books.", "What does the girl use the online service for?", ["To download e-books", "To book rooms", "To pay fines"], 0, "«To download e-books».");
  L(l, "Man: The company will close the factory at the end of the year. Woman: That means many people will lose their jobs.", "What will happen at the end of the year?", ["The factory will close", "The company will expand", "Prices will rise"], 0, "«Close the factory».");
  L(l, "Girl: Shall we try that new restaurant tonight? Boy: I'd prefer to stay in, I'm exhausted after the week I've had.", "What does the boy prefer?", ["To stay in", "To go to the restaurant", "To go to the cinema"], 0, "«I'd prefer to stay in».");
  L(l, "Woman: Excuse me, is this seat taken? Man: No, please sit down. I'm just keeping it for my colleague, but he's not here.", "What is the man doing?", ["Keeping a seat for a colleague", "Looking for a friend", "Reading a book"], 0, "«Keeping it for my colleague».");

  T(t, "Rewrite: 'It is possible that he will be late.' → 'He ___ be late.'", "Posibilidad con verbo modal.", ["might", "may", "could"], "«Might be late».");
  T(t, "Rewrite: 'She regrets not studying harder.' → 'She wishes she ___ harder.'", "Lamento con «wish» y pasado perfecto.", ["had studied"], "«Had studied».");
  T(t, "Rewrite: 'Despite being tired, he finished the marathon.' → 'Although he ___ tired, he finished the marathon.'", "Concesión con «although».", ["was", "was very"], "«Although he was tired».");
  T(t, "Rewrite: 'The teacher said that we should not use dictionaries.' → 'The teacher told us ___ use dictionaries.'", "Prohibición indirecta con «not to».", ["not to"], "«Told us not to use».");
  T(t, "Rewrite: 'We need to finish this before Friday.' → 'This ___ be finished before Friday.'", "Pasiva con «must».", ["must", "has to", "needs to"], "Obligación en voz pasiva.");
  T(t, "Rewrite: 'It is a shame you missed the party.' → 'It is a pity that you ___ the party.'", "Lamento con pasado perfecto.", ["missed"], "Pasado simple de «miss».");
  T(t, "Rewrite: 'Unless you hurry, you will miss the bus.' → 'If you don't hurry, you ___ the bus.'", "Primer condicional negativo.", ["will miss"], "«If you don't hurry, you will miss».");
  T(t, "Rewrite: 'She is the most intelligent student in the class.' → 'No other student in the class is ___ her.'", "Comparativo de superioridad con «as ... as».", ["as intelligent as", "as clever as"], "«As intelligent as».");
  T(t, "Rewrite: 'I'm not used to driving on the left.' → 'Driving on the left ___ strange to me.'", "Expresión «is strange» o «feels».", ["feels", "seems", "is"], "Mismo sentido.");
  T(t, "Rewrite: 'He arrived late, which annoyed the teacher.' → 'His late arrival ___ the teacher.'", "Verbo que signifique «molestar».", ["annoyed", "irritated", "bothered"], "Sinónimos de «annoy».");
  T(t, "Rewrite: 'The results were better than we expected.' → 'The results ___ our expectations.'", "Verbo que signifique «superar».", ["exceeded", "surpassed"], "«Exceeded» = superó.");
  T(t, "Rewrite: 'Please don't tell anyone about this.' → 'Please keep this ___.'", "Expresión de secreto.", ["to yourself", "a secret", "secret"], "«Keep this to yourself».");
  T(t, "Rewrite: 'The meeting was postponed until next week.' → 'They ___ the meeting until next week.'", "Verbo que signifique «aplazar».", ["postponed", "put off", "delayed"], "Sinónimos de «postpone».");
  T(t, "Rewrite: 'It's not worth buying that car.' → 'That car ___ buying.'", "Expresión «not worth».", ["isn't worth", "is not worth"], "«Isn't worth buying».");
  T(t, "Rewrite: 'I'm sorry, I can't attend the meeting.' → 'I'm afraid I ___ attend the meeting.'", "Negativo con «can't».", ["can't", "won't be able to"], "Disculpa cortés.");
  T(t, "Rewrite: 'The bridge was built by the Romans.' → 'The Romans ___ the bridge.'", "Voz activa en pasado.", ["built"], "«The Romans built the bridge».");
  T(t, "Rewrite: 'She knows a lot about history.' → 'She is ___ about history.'", "Adjetivo de conocimiento.", ["knowledgeable", "well-informed", "well informed"], "Sinónimos de «knowledgeable».");
  T(t, "Rewrite: 'He was so tired that he fell asleep.' → 'He was ___ tired ___ he fell asleep.'", "Estructura «so ... that».", ["so", "that"], "«So tired that».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B1 · Gramática", r = "B1 · Lectura", l = "B1 · Escucha", t = "B1 · Reformulación";

  G(g, "I'd rather ___ at home tonight than go out.", ["stay", "to stay", "staying"], 0, "«Would rather» + base.");
  G(g, "The house ___ since 1900, but it needs repairs.", ["has stood", "stood", "stands"], 0, "Present perfect para algo que dura.");
  G(g, "She is said ___ a famous singer when she was young.", ["to have been", "to be", "being"], 0, "«Be said to have» + participio.");
  T(g, "He insisted ___ paying for the dinner.", "Escribe la palabra que falta.", ["on"], "«Insist on» + gerundio.");
  T(g, "I'm thinking of ___ my job and studying abroad.", "Escribe la palabra que falta.", ["leaving"], "«Think of» + gerundio.");
  G(g, "If only I ___ how to swim when I was younger.", ["had learnt", "learnt", "would learn"], 0, "Lamento sobre el pasado: if only + past perfect.");
  G(g, "You ___ have told me. I would have understood.", ["could", "should", "might"], 0, "Reproche con «could have» + participio.");
  G(g, "The students were made ___ the room after the test.", ["to leave", "leave", "leaving"], 0, "Pasiva de «make»: to leave.");
  T(g, "He ___ have forgotten the appointment; he's usually very reliable.", "Escribe la palabra que falta.", ["can't"], "Deducción negativa: can't have.");
  G(g, "The more I think about it, ___ I become.", ["the more confused", "more confused", "confused"], 0, "Estructura comparativa doble.");
  T(g, "The meeting has been ___ until further notice.", "Escribe la palabra que falta.", ["postponed"], "Pasiva en presente perfecto.");
  G(g, "She is ___ capable of doing the job well.", ["perfectly", "perfect", "perfection"], 0, "Adverbio delante de adjetivo.");
  T(g, "I haven't decided yet, so I'm ___ between two options.", "Escribe la palabra que falta.", ["torn"], "«Torn between» = dudar entre.");
  G(g, "Although ___ tired, they continued walking.", ["they were", "were they", "they"], 0, "Concesión con «although» + sujeto + verbo.");
  G(g, "The report, ___ was written last week, is now complete.", ["which", "who", "whom"], 0, "Relativa no definida: which.");
  T(g, "It is high time we ___ something about the problem.", "Escribe la palabra que falta.", ["did"], "«It's high time» + pasado.");
  G(g, "The sofa ___ in the living room yesterday.", ["was moved", "moved", "has moved"], 0, "Pasiva en pasado: was moved.");
  T(g, "Hardly ___ I sat down when the bell rang.", "Escribe la palabra que falta.", ["had"], "Inversión con «hardly».");
  G(g, "You're not allowed to park ___ the entrance.", ["in front of", "in front", "at front"], 0, "Preposición compuesta: in front of.");
  G(g, "She was ___ by the news that she couldn't speak.", ["so shocked", "such shocked", "shocked so"], 0, "«So» + adjetivo.");
  G(g, "I'm going to ___ up smoking next month.", ["give", "take", "put"], 0, "Phrasal verb «give up» = dejar.");
  T(g, "The bridge is ___ to be closed for repairs.", "Escribe la palabra que falta.", ["expected"], "«Be expected to» + infinitivo.");
  G(g, "We had better hurry before it gets dark.", ["leave", "to leave", "leaving"], 0, "«Had better» + base.");

  R(r, "Many people believe that reading on screens is less effective than reading on paper. However, recent research suggests the difference is smaller than expected.", "What does recent research suggest?", ["Screens are much worse", "The difference is smaller than expected", "Paper is useless"], 1, "«The difference is smaller than expected».");
  R(r, "The company's new policy allows employees to work from home two days a week. Managers say productivity has not dropped since the change.", "What have managers noticed?", ["Productivity has dropped", "Productivity has not dropped", "Employees have left"], 1, "«Productivity has not dropped».");
  R(r, "The village has been struggling since the factory closed. Young people have moved to the cities, and the school now has only twenty pupils.", "What has happened to the school?", ["It has grown", "It has only twenty pupils", "It has closed forever"], 1, "«Only twenty pupils».");
  R(r, "Eating late at night can disrupt your sleep. Experts recommend finishing dinner at least two hours before going to bed.", "What do experts recommend?", ["Eating dinner late", "Finishing dinner two hours before bed", "Skipping dinner"], 1, "«Finishing dinner at least two hours before going to bed».");
  R(r, "The author argues that cities should invest more in public transport. In her view, fewer cars would make the air cleaner and the streets safer.", "What does the author suggest?", ["Building more roads", "Investing in public transport", "Banning all buses"], 1, "«Invest more in public transport».");
  R(r, "The volunteers who helped after the flood received a certificate. Many of them said the experience had changed their view of community life.", "What did many volunteers say?", ["The work was boring", "The experience changed their view", "They wanted money"], 1, "«The experience had changed their view».");
  R(r, "Mobile phones have changed the way we communicate. Some people worry that face-to-face conversation is becoming less common, but others believe technology brings people closer together.", "What do some people worry about?", ["Phones are too cheap", "Face-to-face conversation is less common", "Phones are too slow"], 1, "«Face-to-face conversation is becoming less common».");
  RT(r, "The chef, who trained in Paris, opened her own restaurant five years ago. Since then it has received several awards for its fresh, seasonal dishes.", "What has the restaurant received?", ["Several awards"], "«Several awards».");
  R(r, "The bus company has announced that night services will be extended to weekends. The change is expected to benefit workers in the hospital district.", "Who will benefit from the change?", ["Students", "Workers in the hospital district", "Tourists"], 1, "«Workers in the hospital district».");
  R(r, "Over the past decade, online shopping has grown rapidly. Small shops have struggled, but some have survived by offering personal service and local products.", "How have some small shops survived?", ["By closing early", "By offering personal service", "By selling online only"], 1, "«Offering personal service and local products».");
  R(r, "When the new bridge opened, traffic in the town centre fell sharply. Shopkeepers were worried at first, but sales have since recovered.", "What happened to sales?", ["They fell further", "They have recovered", "They have stopped"], 1, "«Sales have since recovered».");
  R(r, "The orchestra is performing a series of concerts across Europe. Tickets for the Berlin concert sold out within hours of going on sale.", "What happened to the Berlin tickets?", ["They were free", "They sold out quickly", "They were cancelled"], 1, "«Sold out within hours».");
  R(r, "Our neighbourhood association has organised a clean-up day in the park. Volunteers are asked to bring gloves, bags and a bottle of water.", "What should volunteers bring?", ["Gloves, bags and water", "Bicycles only", "Food for a picnic"], 0, "«Bring gloves, bags and a bottle of water».");
  R(r, "The train service between the two cities has been improved. Trips now take forty minutes instead of an hour, and there are twice as many departures.", "How long does the trip take now?", ["An hour", "Forty minutes", "Two hours"], 1, "«Forty minutes instead of an hour».");
  R(r, "Doctors warn that lack of sleep can affect memory and concentration. They advise adults to aim for seven or eight hours each night.", "How many hours do doctors recommend?", ["Five or six", "Seven or eight", "Ten or twelve"], 1, "«Seven or eight hours».");
  RT(r, "The government's new plan includes free training for workers who want to change careers. Applications open next month and places are limited.", "When do applications open?", ["Next month"], "«Applications open next month».");

  L(l, "Woman: Did you hear the news about the local school? Man: Yes, it's going to receive funding for a new sports hall.", "What will the school receive?", ["Funding for a sports hall", "A new library", "A bus"], 0, "«Funding for a new sports hall».");
  L(l, "Man: I've been offered a job abroad, but I'm not sure I want to leave my family. Woman: Have you talked to them about it?", "What is the man unsure about?", ["Leaving his family", "The salary", "The language"], 0, "«I'm not sure I want to leave my family».");
  L(l, "Girl: The hotel was fully booked, so we stayed at a guesthouse. Boy: Was it comfortable? Girl: Surprisingly, yes. The owners were very kind.", "How did the girl describe the guesthouse?", ["Uncomfortable", "Comfortable and friendly", "Expensive"], 1, "«Comfortable... very kind».");
  L(l, "Woman: Have you finished the proposal? Man: Almost. I just need to check the figures before I send it to the director.", "What does the man still need to do?", ["Check the figures", "Write the introduction", "Call the director"], 0, "«I just need to check the figures».");
  L(l, "Boy: Why are you so quiet? Girl: I'm thinking about my exam results. I'm worried they won't be good enough.", "What is the girl worried about?", ["Her exam results", "Her health", "Her job"], 0, "«My exam results».");
  L(l, "Man: The new gym has a pool and a sauna. Woman: That sounds great, but I'd prefer a place closer to home.", "What does the woman prefer?", ["A gym closer to home", "A gym with a pool", "A gym with a sauna"], 0, "«A place closer to home».");
  L(l, "Woman: Do you know if the shop will be open on Easter Monday? Man: I think it'll be closed, but you can check the website.", "What is the man's advice?", ["Check the website", "Go to the shop", "Call the bank"], 0, "«You can check the website».");
  LT(l, "Girl: Our team has been playing really well this season. Boy: I know. We've won seven matches in a row now.", "How many matches has the team won in a row?", ["Seven"], "«Seven matches in a row».");
  L(l, "Man: The landlord wants to increase the rent by fifty pounds. Woman: That's a lot. Can we negotiate?", "What is the woman's advice?", ["To negotiate the rent", "To move out", "To pay more"], 0, "«Can we negotiate?».");
  L(l, "Woman: I'd love to learn to play the violin. Man: Why not start with lessons? There's a teacher near the library.", "Where is the violin teacher?", ["Near the library", "Near the station", "At the school"], 0, "«Near the library».");
  L(l, "Boy: I didn't get the job. Girl: I'm really sorry. But you did your best, and there will be other opportunities.", "How does the girl feel about the boy's situation?", ["Sorry for him", "Happy for him", "Angry with him"], 0, "«I'm really sorry».");
  L(l, "Man: The conference will take place in Lisbon this year. Woman: Excellent, I've always wanted to visit Portugal.", "Where will the conference be?", ["Lisbon", "Porto", "Madrid"], 0, "«In Lisbon».");
  L(l, "Girl: How long does the course last? Boy: Twelve weeks, with one lesson every Tuesday evening.", "How often are the lessons?", ["Every Tuesday evening", "Every Monday", "Twice a week"], 0, "«One lesson every Tuesday evening».");
  L(l, "Woman: I'm not sure this jacket suits me. Man: Actually, the colour looks really good on you.", "What does the man think about the jacket?", ["It suits her", "It is too big", "It is too expensive"], 0, "«The colour looks really good on you».");
  L(l, "Man: We've been waiting for a long time. Woman: The website says the next bus is in ten minutes.", "When is the next bus?", ["In ten minutes", "In an hour", "Now"], 0, "«In ten minutes».");
  L(l, "Girl: I've decided not to buy the car after all. Boy: Really? You seemed so keen last week.", "What has the girl decided?", ["Not to buy the car", "To buy the car", "To sell her bike"], 0, "«Not to buy the car».");
  LT(l, "Woman: Would you prefer to pay in advance or on arrival? Man: On arrival, if that's all right with you.", "When does the man want to pay?", ["On arrival"], "«On arrival».");
  L(l, "Boy: The museum has a new exhibition about dinosaurs. Girl: That sounds fascinating. Shall we go on Saturday?", "What exhibition is at the museum?", ["Dinosaurs", "Paintings", "Cars"], 0, "«A new exhibition about dinosaurs».");
  LT(l, "Man: Our flight has been delayed by three hours. Woman: That's frustrating. Let's see if we can get a later connection.", "How long has the flight been delayed?", ["Three hours"], "«Delayed by three hours».");
  L(l, "Girl: My sister is moving to Australia next year. Boy: That's a big change! Will you miss her?", "Where is the sister moving?", ["Australia", "Canada", "New Zealand"], 0, "«Moving to Australia».");

  T(t, "Rewrite: 'Please don't be late for the interview.' → 'It is vital that you ___ late for the interview.'", "Subjuntivo tras «vital that».", ["are not", "aren't"], "«It is vital that you are not late».");
  T(t, "Rewrite: 'Some people think that he is a genius.' → 'He ___ be a genius.'", "Verbo «be said» o «be considered».", ["is considered to", "is said to"], "«Is said to be» = se dice que es.");
  T(t, "Rewrite: 'I didn't know that the shop was closed.' → 'I had no idea that the shop ___.'", "Pasado perfecto con «closed».", ["was closed", "had closed"], "«Was closed» = estaba cerrada.");
  T(t, "Rewrite: 'The noise kept me awake all night.' → 'I ___ all night because of the noise.'", "Verbo «stay awake».", ["stayed awake", "was kept awake"], "«Stayed awake» o «was kept awake».");
  T(t, "Rewrite: 'It's a good idea to save some money every month.' → 'It's worth ___ some money every month.'", "Gerundio tras «worth».", ["saving"], "«Worth saving» = merece la pena ahorrar.");
  T(t, "Rewrite: 'I'm not going to attend the seminar because I'm busy.' → 'I'm ___ attend the seminar because I'm busy.'", "Expresión de no asistir.", ["not going to", "not planning to"], "Negación de intención.");
  T(t, "Rewrite: 'He was very angry, so he left the room.' → 'He was so angry ___ he left the room.'", "Conjunción de consecuencia.", ["that"], "«So angry that».");
  T(t, "Rewrite: 'People say that the film is excellent.' → 'The film ___ excellent.'", "Verbo «be said to».", ["is said to be", "is reported to be"], "«Is said to be excellent».");
  T(t, "Rewrite: 'You should have told me about the change.' → 'I wish you ___ me about the change.'", "Lamento con «wish» + pasado perfecto.", ["had told"], "«I wish you had told me».");
  T(t, "Rewrite: 'Most people enjoy the holidays.' → 'The holidays are ___ by most people.'", "Pasiva con «enjoyed».", ["enjoyed"], "«Are enjoyed by».");
  T(t, "Rewrite: 'Although the price is high, the quality is excellent.' → 'The price is high, ___ the quality is excellent.'", "Conjunción de contraste.", ["but", "yet", "although"], "«But» o «yet» en la segunda parte.");
  T(t, "Rewrite: 'I didn't feel like going out.' → 'I ___ going out.'", "Expresión «to be in the mood».", ["wasn't in the mood for", "didn't fancy"], "«Didn't fancy» = no me apetecía.");
  T(t, "Rewrite: 'The new law will take effect next month.' → 'The new law ___ next month.'", "Verbo «come into force».", ["will come into force", "comes into force"], "Frase equivalente.");
  T(t, "Rewrite: 'She managed to finish the report on time.' → 'She ___ to finish the report on time.'", "Verbo «succeed» o «manage».", ["succeeded", "managed"], "Mismo sentido.");
  T(t, "Rewrite: 'It's not important whether you win or lose.' → 'It doesn't ___ whether you win or lose.'", "Verbo «matter».", ["matter"], "«It doesn't matter».");
  T(t, "Rewrite: 'He hopes to become a pilot one day.' → 'He ___ becoming a pilot one day.'", "Verbo «aspire» o «dream».", ["aspires to", "dreams of"], "«Aspires to» o «dreams of».");
  T(t, "Rewrite: 'I'm finding it hard to understand the instructions.' → 'The instructions are ___ to understand.'", "Adjetivo «difficult».", ["hard", "difficult", "tricky"], "Sinónimos de «hard».");
  T(t, "Rewrite: 'They have decided to sell the house.' → 'The house ___ for sale.'", "Pasiva con «put».", ["has been put up", "has been put on the market"], "«Put up for sale».");
  T(t, "Rewrite: 'Even though it was raining, we went to the park.' → 'It was raining, ___ we went to the park.'", "Conjunción de contraste.", ["but", "yet", "still"], "«But» o «still».");
  T(t, "Rewrite: 'He agreed to help us with the move.' → 'He ___ to help us with the move.'", "Verbo «agree» en pasado.", ["agreed"], "«Agreed to help».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B1 · Gramática", r = "B1 · Lectura", l = "B1 · Escucha", t = "B1 · Reformulación";

  T(g, "Despite ___ hard, she didn't pass the exam.", "Escribe la palabra que falta.", ["studying"], "«Despite» + gerundio.");
  G(g, "The tickets must ___ before the show starts.", ["be bought", "buy", "bought"], 0, "Pasiva con modal: be bought.");
  G(g, "I used to ___ to school by bus when I was a child.", ["go", "going", "went"], 0, "«Used to» + base.");
  T(g, "She could ___ have got the job, but she didn't apply.", "Escribe la palabra que falta.", ["easily"], "Adverbio con «could have».");
  G(g, "There's ___ point in arguing about it now.", ["no", "not", "none"], 0, "«No point in» + gerundio.");
  T(g, "He's ___ of his sister's success.", "Escribe la palabra que falta.", ["proud"], "Adjetivo + «of»: proud of.");
  T(g, "The more people ___ the better the event will be.", "Escribe la palabra que falta.", ["attend"], "Sin concordancia tras «the more»: attend.");
  G(g, "It's not ___ to ask for help when you need it.", ["embarrassing", "embarrassed", "embarrass"], 0, "Adjetivo de sentimiento: embarrassing.");
  T(g, "I'm looking forward to ___ from you soon.", "Escribe la palabra que falta.", ["hearing"], "«Look forward to» + gerundio.");
  G(g, "The painting ___ by Picasso, according to the museum.", ["is thought to have been painted", "is thought to paint", "thought to be painted"], 0, "Pasiva impersonal con «thought to».");
  G(g, "Although ___ the same age, the twins are very different.", ["they are", "are they", "they're"], 0, "Concesión con «although» + sujeto + verbo.");
  G(g, "This is the first time I ___ abroad alone.", ["have travelled", "travelled", "travel"], 0, "Experiencia con «first time»: present perfect.");
  T(g, "The children ___ made to tidy their rooms every Saturday.", "Escribe la palabra que falta.", ["are"], "Pasiva con «made»: are made to.");
  G(g, "He was accused ___ stealing the money.", ["of", "for", "by"], 0, "«Accuse of» + gerundio.");
  G(g, "I'd have passed the exam if I ___ more.", ["had studied", "studied", "would study"], 0, "Tercer condicional con «if».");
  T(g, "You need to ___ up your mind before we book the flights.", "Escribe la palabra que falta.", ["make"], "Expresión «make up your mind».");
  G(g, "The director, ___ I spoke to yesterday, is very approachable.", ["whom", "who", "which"], 0, "Relativa de objeto: whom.");
  G(g, "There was ___ traffic on the motorway this morning.", ["so much", "many", "so many"], 0, "«So much» con incontables.");
  T(g, "Would you ___ to join us for dinner tonight?", "Escribe la palabra que falta.", ["care"], "«Would you care to» = ¿le apetece?");
  T(g, "Not until he called ___ I realise what had happened.", "Escribe la palabra que falta.", ["did"], "Inversión con «not until».");
  G(g, "She is very ___ of her appearance.", ["conscious", "consciousness", "conscience"], 0, "Adjetivo: conscious of.");
  T(g, "We've been ___ for the bus for twenty minutes.", "Escribe la palabra que falta.", ["waiting"], "Present perfect continuo con «for».");
  T(g, "I can't ___ the noise any longer.", "Escribe la palabra que falta.", ["stand"], "Expresión «can't stand» + sustantivo.");
  G(g, "The mountain ___ covered in snow all year round.", ["is", "has", "does"], 0, "Pasiva de estado: is covered.");
  G(g, "By next year, I ___ working here for ten years.", ["will have been", "will be", "have been"], 0, "Futuro perfecto continuo.");

  R(r, "The town hall has announced that the old theatre will be restored. Work is expected to begin in March and finish by the end of the year.", "When is the work expected to finish?", ["In March", "By the end of the year", "Next summer"], 1, "«Finish by the end of the year».");
  R(r, "Lucy has been working as a translator for eight years. She translates legal documents for a large firm and enjoys the challenge of finding the right words.", "What does Lucy translate?", ["Novels", "Legal documents", "Songs"], 1, "«Legal documents».");
  R(r, "Our new office is on the fifth floor. It has large windows, a kitchen, and a quiet room where employees can make phone calls.", "What is the quiet room for?", ["Eating lunch", "Making phone calls", "Meeting clients"], 1, "«A quiet room where employees can make phone calls».");
  R(r, "A recent survey found that most people want to spend more time outdoors. Many said they would walk more if their city had better parks.", "What would people do if cities had better parks?", ["They would walk more", "They would move away", "They would drive more"], 0, "«Would walk more».");
  R(r, "The language school offers evening classes for working adults. Students attend twice a week and can choose between a beginner and an advanced course.", "How often do students attend classes?", ["Once a week", "Twice a week", "Every day"], 1, "«Twice a week».");
  R(r, "Jack spent his childhood in a small fishing village. He still remembers the smell of the sea and the sound of boats returning in the morning.", "What does Jack remember?", ["The smell of the sea and boats", "The city noise", "The mountains"], 0, "«The smell of the sea and the sound of boats».");
  R(r, "Several passengers complained about the new check-in system. They said it was confusing and that staff did not explain it clearly.", "What did passengers complain about?", ["The food", "The check-in system", "The seats"], 1, "«The new check-in system».");
  RT(r, "Our community centre runs free computer courses for older people. The classes are small and the teachers are very patient.", "What kind of courses are offered?", ["Computer courses"], "«Free computer courses for older people».");
  R(r, "The farmers' market is a popular weekend destination. Visitors can buy local cheese, honey and seasonal vegetables directly from the producers.", "Who sells the products?", ["Supermarkets", "The producers", "The council"], 1, "«Directly from the producers».");
  RT(r, "The school has introduced a new reading challenge. Pupils who read ten books during the term will receive a special certificate.", "What do pupils receive for reading ten books?", ["A certificate"], "«A special certificate».");
  R(r, "Mia wanted to run a marathon, but she injured her knee in January. Her doctor advised her to rest for two months before training again.", "How long should Mia rest?", ["Two weeks", "Two months", "Six months"], 1, "«Rest for two months».");
  R(r, "The railway company apologised for the delays. It explained that heavy rain had damaged the tracks near the river.", "What caused the delays?", ["Strikes", "Heavy rain damaging the tracks", "A broken train"], 1, "«Heavy rain had damaged the tracks».");
  R(r, "Hannah uses a notebook to plan her week. She writes down deadlines, appointments and things she wants to do for fun.", "What does Hannah write in her notebook?", ["Only work tasks", "Deadlines, appointments and fun plans", "Recipes"], 1, "«Deadlines, appointments and things she wants to do for fun».");
  R(r, "Tourists are asked not to feed the birds in the square. The authorities say that bread can make the birds sick.", "Why shouldn't tourists feed the birds?", ["It is expensive", "Bread can make them sick", "The birds are dangerous"], 1, "«Bread can make the birds sick».");
  R(r, "Our team won the national quiz competition this year. The final question was about the history of the local river, which many people found difficult.", "What was the final question about?", ["Maths", "The history of the local river", "Sport"], 1, "«The history of the local river».");
  R(r, "The hotel has introduced a green policy. Towels are reused, lights switch off automatically and guests can choose not to have their rooms cleaned every day.", "What can guests choose?", ["To have their rooms cleaned daily", "Not to have their rooms cleaned daily", "To change their room"], 1, "«Choose not to have their rooms cleaned every day».");
  RT(r, "Amir is a keen photographer. He takes pictures of the streets at dawn, when the city is quiet and the light is soft.", "When does Amir take most photographs?", ["At dawn"], "«At dawn, when the city is quiet».");
  R(r, "The bakery downstairs has become very popular since it started selling gluten-free bread. Many customers come from neighbouring towns.", "Why has the bakery become popular?", ["It sells cakes", "It sells gluten-free bread", "It is open at night"], 1, "«Gluten-free bread».");
  R(r, "The new law protects tenants from sudden rent increases. Landlords must now give at least six months' notice before raising the rent.", "How much notice must landlords give?", ["One month", "Six months", "One year"], 1, "«At least six months' notice».");
  R(r, "Our trip to the mountains was cancelled at the last minute because of heavy snow. We spent the weekend at home playing board games instead.", "What did they do instead of the trip?", ["They went skiing", "They played board games at home", "They visited friends"], 1, "«Playing board games at home».");

  LT(l, "Woman: Have you ever considered studying abroad? Man: Yes, I'd love to, but I'm worried about the cost.", "What is the man worried about?", ["The cost"], "«I'm worried about the cost».");
  L(l, "Girl: The hospital has opened a new children's ward. Boy: That's great news. It must make a big difference to the families.", "What did the hospital open?", ["A new children's ward", "A new car park", "A pharmacy"], 0, "«A new children's ward».");
  L(l, "Man: I can't decide whether to take the job in Madrid or stay here. Woman: What does your heart tell you?", "What is the man struggling with?", ["Choosing between two options", "Learning Spanish", "Finding a flat"], 0, "«Whether to take the job in Madrid or stay here».");
  L(l, "Woman: The new bike lanes are finally finished. Man: Yes, now it's much safer to cycle to work.", "Why is cycling safer now?", ["There are new bike lanes", "The roads are closed", "The bikes are cheaper"], 0, "«The new bike lanes».");
  L(l, "Boy: My essay is due tomorrow and I've only written the introduction. Girl: Don't panic, we can work on it together tonight.", "What does the girl offer to do?", ["Work on the essay together", "Write the essay for him", "Ask the teacher"], 0, "«We can work on it together tonight».");
  L(l, "Man: Did the package arrive? Woman: No, the courier said it will be delivered on Thursday afternoon.", "When will the package be delivered?", ["On Thursday afternoon", "Today", "On Friday"], 0, "«Thursday afternoon».");
  L(l, "Girl: I'd like to change my appointment to a later time. Receptionist: Of course. Would four o'clock suit you?", "What time does the girl's new appointment?", ["Four o'clock", "Three o'clock", "Five o'clock"], 0, "«Would four o'clock suit you?».");
  L(l, "Woman: The festival was amazing, but the queues were really long. Man: Next year we should buy tickets online in advance.", "What is the man proposing?", ["Buy tickets online in advance", "Go on a different day", "Arrive earlier in the morning"], 0, "«Buy tickets online in advance».");
  L(l, "Boy: I've been reading about the history of the Roman Empire. Girl: That's fascinating. Which period are you most interested in?", "What has the boy been reading about?", ["The Roman Empire", "Ancient Greece", "Modern art"], 0, "«The history of the Roman Empire».");
  LT(l, "Man: The team didn't play well in the first half, but they came back strongly. Woman: Yes, the second half was excellent.", "How did the team play in the second half?", ["Excellently"], "«The second half was excellent».");
  L(l, "Woman: How is your new flat? Man: It's great, although the kitchen is quite small and the heating is noisy.", "What does the man dislike?", ["The kitchen and the heating", "The location", "The price"], 0, "«The kitchen is quite small and the heating is noisy».");
  L(l, "Girl: I think I'll sign up for the cooking class. Boy: Good idea, you're a brilliant cook already!", "What does the girl plan to do?", ["Sign up for a cooking class", "Open a restaurant", "Buy a new oven"], 0, "«I'll sign up for the cooking class».");
  L(l, "Man: How was your trip to the coast? Woman: Lovely, but the wind was so strong that we couldn't go swimming.", "Why couldn't they go swimming?", ["The wind was too strong", "The sea was closed", "They were ill"], 0, "«The wind was so strong».");
  L(l, "Woman: Our manager has asked us to finish the project by Friday. Man: That's a tight deadline, but I think we can do it.", "What is the deadline?", ["Friday", "Monday", "Next month"], 0, "«By Friday».");
  L(l, "Boy: Mum, I've lost my school bag again. Mum: Where did you last have it? Boy: I think I left it at the sports centre.", "Where did the boy last have his bag?", ["At the sports centre", "At home", "On the bus"], 0, "«I think I left it at the sports centre».");
  LT(l, "Girl: The restaurant is fully booked on Saturday. Boy: Let's try for Sunday instead, then.", "When will they go to the restaurant?", ["Sunday"], "«Let's try for Sunday».");
  L(l, "Man: I'm afraid the report won't be ready until next week. Woman: That's a problem, because the client needs it by Monday.", "When is the report ready?", ["Next week", "Monday", "Today"], 0, "«Won't be ready until next week».");
  LT(l, "Woman: Which language would you like to learn next? Man: Probably Italian, because I love the music and the food.", "Which language does the man want to learn?", ["Italian"], "«Probably Italian».");
  L(l, "Girl: The dentist says I need to come back in six months. Boy: At least it's not urgent, then.", "When does the girl need to return to the dentist?", ["In six months", "Next week", "Today"], 0, "«Come back in six months».");
  L(l, "Man: We're trying to reduce our energy bills. Woman: Turning off the lights when you leave a room is a good start.", "What is the woman proposing?", ["Turning off the lights", "Buying a new fridge", "Using more heating"], 0, "«Turning off the lights».");
  L(l, "Woman: Did you enjoy the book? Man: It was slow at the beginning, but the ending was really surprising.", "What did the man think of the ending?", ["Surprising", "Boring", "Predictable"], 0, "«The ending was really surprising».");
  LT(l, "Boy: The school trip was cancelled because of the weather. Girl: What a shame! We were all looking forward to it.", "Why was the trip cancelled?", ["The weather"], "«Because of the weather».");
  L(l, "Man: Could you recommend a good hotel near the centre? Woman: Yes, the Riverside is quiet and only a short walk from the main square.", "Where is the hotel?", ["Near the main square", "Near the airport", "Near the beach"], 0, "«A short walk from the main square».");

  T(t, "Rewrite: 'Although he was exhausted, he kept working.' → 'Despite ___ exhausted, he kept working.'", "Gerundio tras «despite».", ["being"], "«Despite being exhausted».");
  T(t, "Rewrite: 'It is necessary for you to sign the form.' → 'You ___ sign the form.'", "Obligación con «have to».", ["have to", "need to", "must"], "Obligación equivalente.");
  T(t, "Rewrite: 'She is the person who designed the building.' → 'She is the ___ designed the building.'", "Relativa reducida: «designer».", ["architect", "designer"], "«The architect who designed».");
  T(t, "Rewrite: 'We're planning to move to a bigger flat next year.' → 'We're ___ to a bigger flat next year.'", "Presente continuo con «plan».", ["moving"], "«We're moving» = planes.");
  T(t, "Rewrite: 'It was a mistake to leave the door open.' → 'We ___ the door open.'", "Reprocha con «shouldn't have».", ["shouldn't have left", "should not have left"], "«Shouldn't have left» = no debiste.");
  T(t, "Rewrite: 'The house is being painted at the moment.' → 'Workers ___ the house at the moment.'", "Presente continuo en voz activa.", ["are painting"], "«Are painting the house».");
  T(t, "Rewrite: 'He never misses a single meeting.' → 'He ___ a single meeting.'", "Verbo «miss» en voz negativa con adverbio.", ["never misses", "always attends"], "Mismo sentido.");
  T(t, "Rewrite: 'The bank has closed because of the strike.' → 'The bank is ___ due to the strike.'", "Expresión de cierre.", ["closed", "shut"], "«Closed» o «shut».");
  T(t, "Rewrite: 'I would be delighted if you could come.' → 'I would ___ come.'", "Verbo «be grateful» o «love».", ["love you to", "be delighted if you", "be happy if you"], "Cortesía.");
  T(t, "Rewrite: 'Everyone agreed with the decision.' → 'The decision was ___ by everyone.'", "Expresión «was accepted».", ["accepted", "agreed with"], "Pasiva con «agreed».");
  T(t, "Rewrite: 'The company is going to hire more staff.' → 'The company ___ more staff.'", "Verbo «recruit» o «take on».", ["will recruit", "is going to recruit", "will take on"], "Plan futuro.");
  T(t, "Rewrite: 'I have never seen such a beautiful sunset.' → 'It was ___ beautiful sunset.'", "Estructura «such a».", ["such a"], "«Such a beautiful sunset».");
  T(t, "Rewrite: 'It is likely that prices will rise next year.' → 'Prices ___ rise next year.'", "Verbo «be likely to».", ["are likely to"], "«Are likely to rise».");
  T(t, "Rewrite: 'He doesn't have much experience.' → 'He has ___ experience.'", "Cuantificador: «little».", ["little", "not much"], "«Little experience» = poca experiencia.");
  T(t, "Rewrite: 'I'll call you as soon as I arrive.' → 'I'll call you ___ I get there.'", "Conjunción de tiempo.", ["when", "once"], "«When» o «once».");
  T(t, "Rewrite: 'You don't have to pay for the parking.' → 'Parking ___ free.'", "Expresión «is free».", ["is free", "is for free"], "«Parking is free».");
  T(t, "Rewrite: 'She has been studying for five hours.' → 'She ___ for five hours.'", "Present perfect continuo.", ["has been studying"], "«Has been studying».");
  T(t, "Rewrite: 'They asked me whether I was coming.' → 'They asked ___ coming.'", "Pregunta indirecta con «if».", ["if I was", "whether I was"], "«Asked if I was coming».");
  T(t, "Rewrite: 'The students weren't allowed to use their phones.' → 'The students ___ use their phones.'", "Prohibición con «must not».", ["mustn't", "were not allowed to"], "Prohibición equivalente.");
  T(t, "Rewrite: 'The team lost the game because they were tired.' → 'The team lost the game ___ tiredness.'", "Preposición de causa.", ["because of", "due to"], "«Because of» o «due to».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B1 · Gramática", r = "B1 · Lectura", l = "B1 · Escucha", t = "B1 · Reformulación";

  G(g, "I'm not used to ___ so early on Sundays.", ["waking up", "wake up", "woke up"], 0, "«Be used to» + gerundio.");
  G(g, "If she ___ the instructions, she would have known what to do.", ["had read", "read", "would read"], 0, "Tercer condicional con «had read».");
  T(g, "He ___ have finished the book already; it's only on chapter two.", "Escribe la palabra que falta.", ["can't"], "Deducción negativa con «can't have».");
  G(g, "We agreed ___ the costs equally between us.", ["to split", "splitting", "split"], 0, "«Agree to» + infinitivo.");
  G(g, "You'd better ___ your coat, it's freezing outside.", ["take", "to take", "taking"], 0, "«Had better» + base.");
  G(g, "The results ___ announced next Tuesday.", ["will be", "are", "were"], 0, "Futuro pasivo: will be announced.");
  T(g, "The bus was so crowded ___ we had to stand.", "Escribe la palabra que falta.", ["that"], "«So ... that» de consecuencia.");
  T(g, "I was ___ to hear that the match had been cancelled.", "Escribe la palabra que falta.", ["disappointed"], "Adjetivo de sentimiento: disappointed.");
  G(g, "___ the rain, the match went ahead as planned.", ["Despite", "Although", "However"], 0, "Preposición de contraste: despite.");
  T(g, "She is ___ known for her cooking.", "Escribe la palabra que falta.", ["widely"], "Adverbio «widely» con participio.");
  T(g, "I'd rather you ___ me the truth now than later.", "Escribe la palabra que falta.", ["told"], "«I'd rather» + pasado en subjuntivo.");
  G(g, "He acts as if he ___ the owner of the company.", ["were", "is", "was"], 0, "«As if» + subjuntivo: were.");
  R(r, "The city council has decided to plant five hundred new trees along the main avenues. The project should improve air quality and make summers cooler.", "What is the main purpose of the project?", ["To build roads", "To improve air quality", "To create parking"], 1, "«Improve air quality».");
  RT(r, "Our local library has extended its opening hours. It is now open until nine in the evening on weekdays, which many students appreciate.", "Until what time is the library open on weekdays?", ["Nine"], "«Until nine in the evening».");
  R(r, "Samuel was offered a promotion, but he decided to stay in his current position. He wants more time with his young children.", "Why did Samuel refuse the promotion?", ["He didn't like the salary", "He wants more time with his children", "He was moving abroad"], 1, "«He wants more time with his young children».");
  R(r, "The concert hall will be closed for maintenance during August. Performances will continue in the park instead, weather permitting.", "Where will performances take place in August?", ["In the concert hall", "In the park", "Online"], 1, "«Performances will continue in the park».");
  R(r, "Recent studies show that bilingual children often develop better problem-solving skills. Researchers believe this is because they constantly switch between languages.", "Why do bilingual children solve problems better?", ["They study more", "They constantly switch between languages", "They have bigger brains"], 1, "«Constantly switch between languages».");
  R(r, "The rescue team reached the hikers just before nightfall. Thankfully, everyone was safe, although one of them had a minor injury to the ankle.", "What injury did one hiker have?", ["A broken arm", "A minor ankle injury", "A head wound"], 1, "«A minor injury to the ankle».");
  R(r, "Ten years ago, very few people used electric cars. Today they are common in the city, and the number of charging points has increased rapidly.", "What has increased rapidly?", ["The price of petrol", "The number of charging points", "The number of bus stops"], 1, "«The number of charging points has increased rapidly».");
  L(l, "Man: Are you going to the meeting this afternoon? Woman: I'd like to, but I'm not sure whether I can finish my report in time.", "What is the woman unsure about?", ["Finishing her report in time", "Going to the meeting", "Her salary"], 0, "«Whether I can finish my report in time».");
  L(l, "Girl: The restaurant has changed its menu. Boy: Yes, and the prices have gone up a lot, too.", "What has happened to the prices?", ["They have gone up", "They have gone down", "They have stayed the same"], 0, "«The prices have gone up a lot».");
  L(l, "Woman: Do you think we should buy a new car? Man: It depends. If we can afford the monthly payments, I think it's a good idea.", "What depends on the monthly payments?", ["Buying a new car", "Selling the old car", "Going on holiday"], 0, "«If we can afford the monthly payments».");
  L(l, "Boy: The news said there might be floods this weekend. Girl: Let's check the forecast again before we decide about the trip.", "What do they need to check?", ["The forecast", "The train times", "The hotel prices"], 0, "«Check the forecast again».");
  L(l, "Man: My doctor says I should cut down on sugar. Woman: That's a good idea. I think it would help you feel better too.", "What does the doctor advise?", ["To cut down on sugar", "To exercise more", "To sleep more"], 0, "«Cut down on sugar».");
  LT(l, "Woman: How did the job interview go? Man: I think it went well, although I was very nervous at the beginning.", "How did the man feel at the start of the interview?", ["Very nervous"], "«I was very nervous at the beginning».");
  L(l, "Girl: We need to decide where to go on holiday. Boy: What about Portugal? The weather is lovely in spring.", "When does the boy say the weather is lovely?", ["In spring", "In winter", "In summer"], 0, "«The weather is lovely in spring».");
  L(l, "Man: I'm sorry I missed your call. Woman: That's okay, I just wanted to remind you about the dinner on Friday.", "What did the woman want to remind him about?", ["The dinner on Friday", "A meeting on Monday", "His birthday"], 0, "«The dinner on Friday».");
  L(l, "Boy: Is this the right platform for the train to York? Man: I think so, but let me check the board to be sure.", "What does the man want to do?", ["Check the board", "Buy a ticket", "Call a taxi"], 0, "«Let me check the board».");
  LT(l, "Girl: Your presentation was really clear. Boy: Thanks! I practised it for hours, so I'm glad it worked.", "How long did the boy practise?", ["For hours"], "«I practised it for hours».");
  L(l, "Woman: Would you like to join the book club? Man: I'd love to, but I'm usually busy on Thursdays.", "Why can't the man join the book club on Thursdays?", ["He is usually busy", "He doesn't like books", "He has no time at all"], 0, "«I'm usually busy on Thursdays».");
  T(t, "Rewrite: 'I regret not going to university.' → 'I wish I ___ to university.'", "Lamento con «wish» + pasado perfecto.", ["had gone"], "«I wish I had gone».");
  T(t, "Rewrite: 'The hotel was not as good as I expected.' → 'The hotel was ___ than I expected.'", "Comparativo inverso de «good».", ["worse"], "«Worse than I expected».");
  T(t, "Rewrite: 'It's a pity that the shop closed last year.' → 'If only the shop ___ last year.'", "Lamento con «if only» + pasado perfecto.", ["hadn't closed", "had not closed"], "Lamento sobre el pasado.");
  T(t, "Rewrite: 'You can take the bus or the train.' → 'You can take ___ the bus or the train.'", "Correlativo: «either».", ["either"], "«Either the bus or the train».");
  T(t, "Rewrite: 'They have no time to waste.' → 'They can't ___ time.'", "Verbo «afford» con «time».", ["afford to waste"], "«Can't afford to waste time».");
  T(t, "Rewrite: 'He is nothing like his brother.' → 'He is ___ his brother at all.'", "Expresión de no parecido.", ["not like", "unlike"], "«Not like» o «unlike».");
  T(t, "Rewrite: 'Please let me know when you arrive.' → 'Please ___ me know when you arrive.'", "Expresión «keep me posted».", ["keep me posted", "let"], "«Keep me posted».");
  T(t, "Rewrite: 'It seems that the printer is broken.' → 'The printer ___ broken.'", "Verbo «appear» o «seem».", ["appears to be", "seems to be"], "«Seems to be broken».");
  T(t, "Rewrite: 'The story is so interesting that I couldn't stop reading.' → 'It is ___ interesting story that I couldn't stop reading.'", "Estructura «such an».", ["such an"], "«Such an interesting story».");
  T(t, "Rewrite: 'Although I was tired, I went to the party.' → 'Tired ___ I was, I went to the party.'", "Inversión de concesión.", ["as"], "«Tired as I was».");
  T(t, "Rewrite: 'We went to the beach even though it was cloudy.' → 'We went to the beach ___ it was cloudy.'", "Conjunción de concesión.", ["even though", "although"], "«Even though» = aunque.");
  T(t, "Rewrite: 'The car needs to be serviced.' → 'We need to ___ the car.'", "Verbo «have ... serviced».", ["have the car serviced", "get the car serviced"], "Causativo con «have».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B2 · Gramática", r = "B2 · Lectura", l = "B2 · Escucha", t = "B2 · Reformulación";

  T(g, "Had she ___ earlier, she wouldn't have missed the train.", "Escribe la palabra que falta.", ["left"], "Condicional mixto con «had» inicial: had left.");
  G(g, "The committee ___ reached a decision by the time the press arrived.", ["had", "has", "have"], 0, "Pasado perfecto con «by the time».");
  T(g, "I'd rather he ___ mention it to my parents.", "Escribe la palabra que falta.", ["didn't"], "«I'd rather» + pasado en subjuntivo.");
  G(g, "Not only ___ the exam, but she also got top marks.", ["did she pass", "she passed", "passed she"], 0, "Inversión tras «not only».");
  G(g, "The old bridge ___ by the time the new road opens.", ["will have been demolished", "will be demolished", "is demolished"], 0, "Futuro perfecto pasivo.");
  G(g, "He is believed ___ the first person to climb that peak.", ["to have been", "to be", "being"], 0, "«Be believed to have» + participio.");
  T(g, "I'm inclined ___ agree with the second proposal.", "Escribe la palabra que falta.", ["to"], "«Be inclined to» + infinitivo.");
  G(g, "Such ___ the pressure that many employees resigned.", ["was", "were", "is"], 0, "Inversión con «such» + verbo en singular.");
  T(g, "She insisted that the report ___ revised before publication.", "Escribe la palabra que falta.", ["be"], "Subjuntivo tras «insist that»: be.");
  T(g, "The data ___ suggests that the trend is reversing.", "Escribe la palabra que falta.", ["clearly"], "Adverbio que modifica al verbo.");
  G(g, "Were it not ___ for your help, we would have failed.", ["for", "to", "with"], 0, "Condicional mixto: were it not for.");
  T(g, "It is about time the government ___ action on housing.", "Escribe la palabra que falta.", ["took"], "«It's about time» + pasado.");
  G(g, "No matter how hard you try, you ___ never please everyone.", ["will", "would", "can"], 0, "Futuro con «no matter how».");
  T(g, "The company, ___ headquarters are in Berlin, has expanded rapidly.", "Escribe la palabra que falta.", ["whose"], "Relativa posesiva: whose.");
  T(g, "He has been ___ to take responsibility for the error.", "Escribe la palabra que falta.", ["encouraged"], "Pasiva con «encouraged to».");
  G(g, "The chairman spoke ___ the matter, leaving everyone confused.", ["ambiguously about", "ambiguous about", "ambiguity about"], 0, "Adverbio «ambiguously» con verbo.");
  G(g, "I would have objected, had I ___ the proposal earlier.", ["seen", "saw", "see"], 0, "Condicional mixto con participio: seen.");
  T(g, "The bill is ___ to be passed by the end of the month.", "Escribe la palabra que falta.", ["likely"], "«Likely to be» + participio.");
  T(g, "She has a ___ for languages and learns quickly.", "Escribe la palabra que falta.", ["knack"], "«Have a knack for» = tener don.");
  G(g, "Not everyone agrees, but the ___ of opinion is in favour.", ["weight", "weigh", "heavy"], 0, "«Weight of opinion» = mayoría de opinión.");
  T(g, "The researchers ___ the results before publishing them.", "Escribe la palabra que falta.", ["double-checked"], "Pasado simple de «double-check».");
  G(g, "Rarely ___ such an impressive performance.", ["have I seen", "I have seen", "I saw"], 0, "Inversión con «rarely».");
  G(g, "She made ___ to apologise after the argument.", ["amends", "amend", "amended"], 0, "Expresión «make amends».");
  T(g, "I cannot ___ the thought of him being there alone.", "Escribe la palabra que falta.", ["bear"], "Expresión «bear the thought».");
  T(g, "The new policy will come into ___ next month.", "Escribe la palabra que falta.", ["effect"], "Expresión «come into effect».");
  G(g, "He is ___ aware of the consequences of his actions.", ["fully", "full", "fullness"], 0, "Adverbio «fully aware».");
  G(g, "The team ___ on the new strategy since January.", ["has been working", "has worked", "works"], 0, "Present perfect continuo con «since».");
  T(g, "They ___ to make a decision until they had more information.", "Escribe la palabra que falta.", ["refused"], "Pasado simple de «refuse»: refused.");
  T(g, "I'm not at all ___ by his excuses.", "Escribe la palabra que falta.", ["impressed"], "Adjetivo de sentimiento: impressed.");
  G(g, "The hall was ___ with people by the time the speech began.", ["packed", "pack", "packing"], 0, "Pasiva/adjetivo «packed with».");

  R(r, "Although the new policy was designed to cut emissions, critics argue that it places an unfair burden on rural communities, which have little access to public transport.", "What do critics argue?", ["It cuts emissions too much", "It places an unfair burden on rural communities", "It has no effect at all"], 1, "«Places an unfair burden on rural communities».");
  R(r, "The archaeologists uncovered a series of pottery fragments that suggest the settlement was far more prosperous than previously assumed, trading with distant regions.", "What do the fragments suggest?", ["The settlement was poor", "The settlement was more prosperous than assumed", "The settlement was abandoned"], 1, "«Far more prosperous than previously assumed».");
  R(r, "Employee wellbeing has become a strategic priority for many firms. Companies that invest in mental health support report lower absence rates and higher loyalty.", "What do companies that invest in mental health report?", ["Higher absence rates", "Lower absence rates and higher loyalty", "Lower salaries"], 1, "«Lower absence rates and higher loyalty».");
  R(r, "The novel explores the tension between tradition and modernity in a small coastal town. Its ambiguous ending has divided critics, although most agree on the strength of its prose.", "What have most critics agreed on?", ["The plot", "The strength of its prose", "The ending"], 1, "«Most agree on the strength of its prose».");
  R(r, "Antibiotic resistance poses a growing threat to global health. Experts stress that the overuse of these drugs, both in medicine and agriculture, is a major contributing factor.", "What do experts identify as a major factor?", ["Lack of research", "Overuse of antibiotics", "High costs of treatment"], 1, "«The overuse of these drugs».");
  R(r, "Urban planners increasingly favour mixed-use developments, where homes, offices and shops coexist. Proponents argue that this reduces the need for long commutes.", "What do proponents argue mixed-use developments reduce?", ["Housing costs", "The need for long commutes", "Crime"], 1, "«Reduces the need for long commutes».");
  R(r, "The Prime Minister's speech was widely interpreted as an attempt to reassure voters, rather than a genuine announcement of new policies.", "How was the speech interpreted?", ["As a new policy", "As an attempt to reassure voters", "As a joke"], 1, "«An attempt to reassure voters».");
  R(r, "Museums are rethinking how they display artefacts. Many now use interactive technology to engage younger audiences, a shift that has sparked debate among traditionalists.", "What has sparked debate?", ["Ticket prices", "Interactive technology in museums", "Opening hours"], 1, "«A shift that has sparked debate among traditionalists».");
  R(r, "The fishing industry faces difficult choices. Quotas have been reduced to protect declining stocks, yet many coastal families depend on the income that fishing provides.", "Why is the fishing industry facing difficult choices?", ["Because of new taxes", "Because quotas protect declining stocks but families depend on fishing income", "Because boats are too expensive"], 1, "Dos aspectos en conflicto."); 
  R(r, "Language learning apps have gained millions of users, but researchers caution that they are not a substitute for regular conversation with native speakers.", "What do researchers caution about?", ["The cost of the apps", "That apps are not a substitute for conversation", "Users' privacy"], 1, "«Not a substitute for regular conversation».");
  R(r, "The company's quarterly report revealed unexpected losses in its overseas division. Analysts believe the decline is temporary, but they warn that recovery may take several years.", "How long might recovery take?", ["A few weeks", "Several years", "It will not recover"], 1, "«Recovery may take several years».");
  R(r, "Climate scientists have noted that heatwaves are becoming more frequent and intense. Cities are responding by planting trees, painting roofs white and creating cooling centres.", "How are cities responding?", ["By building more roads", "By planting trees and creating cooling centres", "By banning cars entirely"], 1, "«Planting trees, painting roofs white and creating cooling centres».");
  R(r, "The orchestra's decision to commission a new work from a young composer has been praised as bold. Critics note, however, that the premiere sold fewer tickets than usual.", "What did critics note about the premiere?", ["It was cancelled", "It sold fewer tickets than usual", "It was free"], 1, "«Sold fewer tickets than usual».");
  R(r, "Historians have long debated the causes of the revolution. Recent evidence, including private letters, suggests that economic grievances played a larger role than political ideas.", "What role do recent letters suggest economic grievances played?", ["A smaller role", "A larger role than political ideas", "No role at all"], 1, "«A larger role than political ideas».");
  R(r, "The volunteer programme has transformed the lives of many elderly residents. Through weekly visits, volunteers provide companionship and help with practical tasks such as shopping.", "What do volunteers provide?", ["Medical treatment", "Companionship and help with shopping", "Transport to hospital"], 1, "«Companionship and help with practical tasks».");
  R(r, "Digital privacy remains a contested issue. While some users accept data collection in exchange for free services, others argue that consent is rarely meaningful in practice.", "What do others argue about consent?", ["It is always meaningful", "It is rarely meaningful in practice", "It is not needed"], 1, "«Rarely meaningful in practice».");
  R(r, "The regional economy has diversified over the past decade. Tourism, renewable energy and food production now employ more people than manufacturing did in the 1990s.", "What now employs more people than manufacturing?", ["Tourism only", "Tourism, renewable energy and food production", "Mining"], 1, "Tres sectores mencionados."); 
  R(r, "Scientists have developed a battery that charges in minutes rather than hours. Its commercial release, however, depends on overcoming problems with cost and durability.", "What does the commercial release depend on?", ["Overcoming problems with cost and durability", "A government decision", "Public demand alone"], 0, "«Overcoming problems with cost and durability».");
  R(r, "The festival's organisers have banned single-use plastics across all venues. Vendors who fail to comply will face fines, though a transition period has been granted.", "What has been granted to vendors?", ["Immediate fines", "A transition period", "A tax reduction"], 1, "«A transition period has been granted».");
  R(r, "The architect argued that the building should reflect the character of the neighbourhood rather than impose a modern style. Her proposal was eventually accepted after lengthy consultations.", "What did the architect argue?", ["The building should be very modern", "It should reflect the neighbourhood's character", "It should be demolished"], 1, "«Reflect the character of the neighbourhood».");
  R(r, "A growing number of employees now negotiate flexible hours with their employers. Those who do often report better wellbeing, although some worry about career progression.", "What do some employees worry about?", ["Their wellbeing", "Their career progression", "Their salaries"], 1, "«Some worry about career progression».");
  R(r, "The theatre company has struggled since losing its main funding. To survive, it has turned to crowdfunding and has started performing in smaller venues across the region.", "How has the company tried to survive?", ["By closing down", "By crowdfunding and performing in smaller venues", "By moving abroad"], 1, "«Crowdfunding and smaller venues».");
  R(r, "The study compared the reading habits of teenagers across five countries. It found that frequent readers tended to show stronger empathy, although the researchers stressed that correlation does not prove causation.", "What did researchers stress?", ["That reading causes empathy", "That correlation does not prove causation", "That teenagers do not read"], 1, "«Correlation does not prove causation».");
  R(r, "Over the last century, the average height of adults has increased significantly in many countries. Nutrition and healthcare are generally considered the main reasons for this change.", "What are considered the main reasons for the change?", ["Genetics alone", "Nutrition and healthcare", "Climate"], 1, "«Nutrition and healthcare».");

  L(l, "Man: The proposal seems reasonable, but I'm concerned about the timeline. Woman: I share your concern. Six months may be unrealistic given the current staffing.", "What is the man concerned about?", ["The timeline", "The budget", "The staff training"], 0, "«I'm concerned about the timeline».");
  L(l, "Woman: Have you had a chance to review the contract? Man: Yes, but there's a clause about termination that I find rather unfair.", "What does the man find unfair?", ["A termination clause", "The payment terms", "The working hours"], 0, "«A clause about termination».");
  L(l, "Girl: The lecture was fascinating, although I got lost in the middle. Boy: It was quite dense, but the summary at the end helped me catch up.", "What helped the boy?", ["The summary at the end", "The slides", "A handout"], 0, "«The summary at the end».");
  L(l, "Man: I'm not convinced the new software will improve productivity. Woman: Perhaps not immediately, but it should streamline several tasks in the long run.", "What does the woman believe about the software?", ["It will streamline tasks in the long run", "It will be removed", "It is too expensive"], 0, "«Streamline several tasks in the long run».");
  L(l, "Woman: The council says the road closure will last at least two months. Man: That's going to cause serious disruption for local businesses.", "How long will the road be closed?", ["At least two months", "A week", "Permanently"], 0, "«At least two months».");
  L(l, "Boy: I've been offered a scholarship to study in Edinburgh. Girl: Congratulations! Are you going to accept it?", "What has the boy been offered?", ["A scholarship in Edinburgh", "A job in London", "A research grant"], 0, "«A scholarship to study in Edinburgh».");
  L(l, "Man: The charity relies heavily on donations from local businesses. Woman: Which is why it's so important to maintain those relationships.", "What does the charity rely on?", ["Donations from local businesses", "Government grants", "Membership fees"], 0, "«Donations from local businesses».");
  L(l, "Woman: The results were better than the committee anticipated. Man: Indeed, though we should be careful not to draw premature conclusions.", "What does the man warn about?", ["Drawing premature conclusions", "Spending too much", "Losing the data"], 0, "«Not to draw premature conclusions».");
  L(l, "Girl: The hospital is understaffed, which is putting enormous pressure on the nurses. Boy: That's why the new recruitment drive is so essential.", "What is putting pressure on the nurses?", ["The understaffing of the hospital", "The new equipment", "The night shifts"], 0, "«The hospital is understaffed».");
  L(l, "Man: I'd like to challenge the assumption that technology always makes life easier. Woman: There are certainly trade-offs, but I'd argue the benefits generally outweigh them.", "What does the woman argue?", ["The benefits generally outweigh the trade-offs", "Technology is useless", "Trade-offs are never worth it"], 0, "«The benefits generally outweigh them».");
  L(l, "Woman: The landlord has refused to carry out the repairs. Man: In that case, we should contact the housing association and ask for mediation.", "What do they plan to do?", ["Ask for mediation", "Move out immediately", "Pay for the repairs"], 0, "«Ask for mediation».");
  L(l, "Boy: Our project has been delayed twice already. Girl: I know, but the client is willing to accept a revised deadline if we keep them informed.", "What is the client willing to accept?", ["A revised deadline", "A cheaper price", "A new team"], 0, "«A revised deadline».");
  L(l, "Man: I don't think the advertisement is particularly persuasive. Woman: It may not be your target audience, though. The younger generation might respond differently.", "What does the woman suggest about the advert?", ["The advert may suit a younger audience", "The advert is excellent", "The advert should be removed"], 0, "«The younger generation might respond differently».");
  L(l, "Girl: Do you believe the government's new measures will work? Boy: Only partly. They address the symptoms but not the underlying causes.", "What does the boy say about the measures?", ["They address symptoms but not causes", "They solve everything", "They are unnecessary"], 0, "«Address the symptoms but not the underlying causes».");
  LT(l, "Woman: The exhibition has been extended until October due to popular demand. Man: That's excellent news. I've been meaning to visit for months.", "Until when has the exhibition been extended?", ["October"], "«Extended until October».");
  L(l, "Man: The negotiations have stalled over pay. Woman: Both sides seem entrenched, so a mediator may be needed.", "What is preventing an agreement?", ["Disagreement over pay", "The location of the meeting", "The date"], 0, "«The negotiations have stalled over pay».");
  L(l, "Girl: I'm thinking of switching to a part-time job to spend more time with my children. Boy: That sounds like a sensible choice, as long as you can afford it.", "Why does the girl want to change her job?", ["To spend more time with her children", "To earn more money", "To study"], 0, "«To spend more time with my children».");
  L(l, "Woman: The research team is confident about the methodology. Man: Yes, but the sample size is still quite small, which limits how far we can generalise.", "What limits the generalisation of the results?", ["The small sample size", "The methodology", "The funding"], 0, "«The sample size is still quite small».");
  L(l, "Boy: Why did the meeting run so long? Girl: The chair kept revisiting points that had already been settled.", "Why did the meeting last so long?", ["Points were revisited", "The room was too small", "There were too many guests"], 0, "«Kept revisiting points».");
  L(l, "Man: The editor wants the article shortened by a third. Woman: That will be painful, but I think the piece will be stronger for it.", "What does the editor want?", ["To shorten the article by a third", "To add more images", "To change the title"], 0, "«Shortened by a third».");
  L(l, "Woman: How do you feel about the new timetable? Man: It's a mixed bag. I like the later start, but the evening classes are a real drawback.", "What does the man dislike about the new timetable?", ["The evening classes", "The later start", "The location"], 0, "«The evening classes are a real drawback».");
  L(l, "Girl: The bank has frozen my account by mistake. Boy: That's outrageous. You should contact them immediately and demand an explanation.", "What has the bank done?", ["Frozen the girl's account", "Closed the branch", "Raised the interest rate"], 0, "«Frozen my account by mistake».");
  L(l, "Man: Have you considered whether the costs justify the benefits? Woman: We have, and on balance, I believe they do.", "What is the woman's opinion?", ["The benefits justify the costs", "The costs are too high", "She has not considered it"], 0, "«On balance, I believe they do».");
  L(l, "Woman: The audience was clearly moved by the performance. Man: Yes, the silence at the end said more than applause ever could.", "How did the audience react?", ["They were moved", "They were bored", "They were angry"], 0, "«Clearly moved».");
  L(l, "Boy: I can't believe the team dropped the contract. Girl: It was a difficult decision, but the client had changed its requirements twice.", "Why did the team drop the contract?", ["The client changed requirements twice", "The price was too low", "The team was too small"], 0, "«The client had changed its requirements twice».");

  T(t, "Rewrite: 'It was only after the inquiry that the mistake became clear.' → 'Only after the inquiry ___ the mistake.'", "Inversión con «only after».", ["did the mistake become clear", "did we realise"], "«Only after the inquiry did ... become clear».");
  T(t, "Rewrite: 'He is very likely to win the election.' → 'He ___ to win the election.'", "Expresión de probabilidad con «odds».", ["is odds-on to win", "is favourite to win", "stands a good chance of winning"], "Expresiones de probabilidad.");
  T(t, "Rewrite: 'Had we known about the delays, we would have booked a different train.' → 'If we ___ about the delays, we would have booked a different train.'", "Condicional mixto con «had known».", ["had known"], "«If we had known».");
  T(t, "Rewrite: 'It's unlikely that the project will be completed on time.' → 'The project ___ completed on time.'", "Expresión «is unlikely to».", ["is unlikely to be"], "«Is unlikely to be completed».");
  T(t, "Rewrite: 'The report was so vague that nobody understood it.' → 'The report was ___ vague that nobody understood it.'", "Estructura «so».", ["so"], "«So vague that».");
  T(t, "Rewrite: 'They refused to accept any responsibility.' → 'They ___ any responsibility.'", "Expresión «to disclaim».", ["disclaimed", "declined to accept", "washed their hands of"], "Expresiones de rechazo.");
  T(t, "Rewrite: 'The article is based on a misunderstanding.' → 'The article ___ a misunderstanding.'", "Verbo «stem from».", ["stems from", "rests on", "is based on"], "«Rests on» = se basa en.");
  T(t, "Rewrite: 'I doubt whether the plan will succeed.' → 'I ___ the plan will succeed.'", "Verbo «doubt that» o «question».", ["doubt that", "question whether"], "«Doubt that» = dudo que.");
  T(t, "Rewrite: 'In spite of the criticism, the minister kept her position.' → 'The minister ___ her position despite the criticism.'", "Verbo que signifique «mantener».", ["retained", "held on to", "maintained"], "Sinónimos de «keep».");
  T(t, "Rewrite: 'The team's performance was disappointing.' → 'The team's performance ___ to expectations.'", "Verbo que signifique «no estar a la altura».", ["fell short of", "failed to live up"], "«Fell short of expectations».");
  T(t, "Rewrite: 'We need to consider every option carefully.' → 'We need to ___ every option carefully.'", "Verbo «weigh up».", ["weigh up", "give careful thought to"], "«Weigh up» = sopesar.");
  T(t, "Rewrite: 'Their argument was based on flawed evidence.' → 'Their argument was ___ flawed evidence.'", "Preposición «on».", ["founded on", "built on", "based on"], "«Founded on» o «built on».");
  T(t, "Rewrite: 'The decision was made without consulting the staff.' → 'The decision was made ___ consultation with the staff.'", "Preposición de falta de consulta.", ["without"], "«Without consultation».");
  T(t, "Rewrite: 'He was too proud to admit that he had been wrong.' → 'He was ___ to admit his mistake.'", "Expresión «too proud».", ["too proud", "reluctant"], "«Too proud» o «reluctant».");
  T(t, "Rewrite: 'The contract will be reviewed in a year's time.' → 'The contract ___ reviewed in twelve months.'", "Pasiva futura.", ["will be"], "«Will be reviewed».");
  T(t, "Rewrite: 'She has a strong interest in environmental policy.' → 'She has a ___ for environmental policy.'", "Sustantivo que signifique «afición» o «interés».", ["keen interest", "passion"], "«Keen interest» o «passion».");
  T(t, "Rewrite: 'Hardly anyone attended the lecture.' → 'Hardly ___ attended the lecture.'", "Negativo: «hardly any».", ["any people", "anyone"], "«Hardly anyone».");
  T(t, "Rewrite: 'It is essential that every member votes.' → 'Every member ___ vote.'", "Obligación con «must».", ["must", "has to", "is required to"], "Obligación equivalente.");
  T(t, "Rewrite: 'The news came as a complete surprise.' → 'The news ___ us completely.'", "Verbo «take aback».", ["took us aback", "caught us off guard"], "«Took us aback».");
  T(t, "Rewrite: 'The results will be announced once all the votes have been counted.' → 'The results will be announced ___ the votes are counted.'", "Conjunción «once».", ["once", "as soon as"], "«Once» = una vez que.");
  T(t, "Rewrite: 'Despite the bad weather, the festival was a success.' → 'The festival was a success, ___ the bad weather.'", "Preposición de contraste.", ["despite", "in spite of"], "«In spite of» o «despite».");
  T(t, "Rewrite: 'He pretended that he did not know about the plan.' → 'He ___ he knew nothing about the plan.'", "Verbo «feign» o «make out».", ["feigned", "made out"], "Simular ignorancia.");
  T(t, "Rewrite: 'We ought to revise the policy regularly.' → 'The policy ___ be revised regularly.'", "Expresión de obligación moral.", ["ought to", "should"], "«Ought to» = debería.");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B2 · Gramática", r = "B2 · Lectura", l = "B2 · Escucha", t = "B2 · Reformulación";

  G(g, "By next summer, the engineers ___ the new bridge for five years.", ["will have been maintaining", "will maintain", "have maintained"], 0, "Futuro perfecto continuo con duración.");
  G(g, "Scarcely ___ the room when the power failed.", ["had we entered", "we had entered", "did we entered"], 0, "Inversión con «scarcely ... when».");
  T(g, "I wish I ___ more time to finish the project, honestly.", "Escribe la palabra que falta.", ["had"], "«I wish» + pasado para presente irreal.");
  G(g, "Little ___ that the decision would change everything.", ["did they realise", "they realised", "realised they"], 0, "Inversión con «little».");
  G(g, "The results ___ be confirmed before the board meets.", ["must", "must to", "must of"], 0, "Modal «must» sin «to».");
  G(g, "She is said ___ to have sold her company last year.", ["to have", "to has", "having"], 0, "Pasiva impersonal «is said to have».");
  T(g, "Not until the final whistle ___ the crowd begin to leave.", "Escribe la palabra que falta.", ["did"], "Inversión con «not until».");
  T(g, "He would rather you ___ tell anyone about the incident.", "Escribe la palabra que falta.", ["didn't"], "«Would rather» + pasado.");
  G(g, "The manager, along with her team, ___ responsible for the delay.", ["is", "are", "be"], 0, "El sujeto principal es «manager», concordancia singular.");
  G(g, "It was the first time she ___ such a difficult question.", ["had faced", "faced", "has faced"], 0, "Pasado perfecto tras «the first time».");
  T(g, "Only when the evidence was presented ___ the jury reach a verdict.", "Escribe la palabra que falta.", ["did"], "Inversión con «only when».");
  G(g, "I'd prefer you ___ the decision without consulting me.", ["not to make", "not make", "didn't make"], 0, "«I'd prefer» + infinitivo con «to».");
  G(g, "The city council ___ a new policy on waste management next week.", ["is going to announce", "is announcing to", "announces to"], 0, "Futuro próximo con «be going to».");
  G(g, "Had the warning been heeded, the accident ___ avoided.", ["could have been", "could be", "would be"], 0, "Condicional de tercer tipo con inversión.");
  T(g, "He was ___ of stealing the money, but the charges were dropped.", "Escribe la palabra que falta.", ["accused"], "Participio: «accused of».");
  G(g, "Her ___ to the cause was admirable and unwavering.", ["commitment", "commit", "committed"], 0, "Sustantivo «commitment».");
  T(g, "The report ___ in great detail the causes of the crisis.", "Escribe la palabra que falta.", ["examines"], "Presente simple tercera persona: examines.");
  G(g, "Neither the directors nor the shareholders ___ aware of the problem.", ["were", "was", "is"], 0, "«Neither ... nor» concuerda con el sujeto más próximo: shareholders (plural).");
  G(g, "I have never been ___ in a situation like this before.", ["so confused", "confusing", "confuse"], 0, "Adjetivo «confused» en estructura de intensidad.");
  T(g, "The treatment ___ to be effective, but it has serious side effects.", "Escribe la palabra que falta.", ["appears"], "«Appear» + «to be».");
  T(g, "She runs the company ___ a firm but fair hand.", "Escribe la palabra que falta.", ["with"], "Expresión «with a firm hand».");
  G(g, "Had they ___ earlier, they would have caught the train.", ["left", "leave", "leaving"], 0, "Condicional de tercer tipo con «had left».");
  G(g, "The more you practise, ___ you will become.", ["the better", "the best", "better"], 0, "Estructura comparativa «the more ... the better».");
  G(g, "The students were asked ___ their homework before the lesson.", ["to submit", "submit", "submitting"], 0, "Pasiva + «asked to».");
  T(g, "It is high time we ___ the problem seriously.", "Escribe la palabra que falta.", ["addressed"], "«It is high time» + pasado.");
  G(g, "The discovery ___ scientists' understanding of the disease.", ["has transformed", "has transformed the", "transformed"], 0, "Present perfect con efecto actual.");
  T(g, "I'm afraid I ___ no say in the matter.", "Escribe la palabra que falta.", ["have"], "Presente simple: «have no say».");
  G(g, "The bill is unlikely ___ before the summer recess.", ["to be passed", "to pass", "passing"], 0, "«Unlikely to be passed».");

  R(r, "The coastal village has long depended on fishing, but declining catches have forced many families to seek work in the nearby city. Local leaders now hope that tourism will provide a new source of income.", "Why have many families looked for work in the city?", ["Because the village is too large", "Because declining catches have reduced fishing income", "Because tourism has grown too quickly"], 1, "«Declining catches have forced many families to seek work».");
  R(r, "Researchers have found that sleep deprivation impairs memory consolidation. The effect is strongest when the lack of sleep occurs immediately after learning new material.", "When is the effect strongest?", ["When people sleep too much", "When sleep is lacking immediately after learning", "When people are exercising"], 1, "«Immediately after learning new material».");
  R(r, "The programme aims to reduce youth unemployment by combining vocational training with paid placements. Early evaluations suggest that participants are more likely to find stable jobs.", "What do early evaluations suggest?", ["Participants are less likely to work", "Participants are more likely to find stable jobs", "The programme has no effect"], 1, "«More likely to find stable jobs».");
  R(r, "The mayor's decision to pedestrianise the town centre has divided residents. Shop owners fear a drop in customers, while many families welcome the cleaner and quieter streets.", "Why are shop owners worried?", ["They fear a drop in customers", "They want to close their shops", "They dislike cleaner streets"], 0, "«Fear a drop in customers».");
  R(r, "In the nineteenth century, photography was often regarded as a mere mechanical process. Over time, artists began to explore its expressive potential, which eventually earned it a place in galleries.", "How was photography initially regarded?", ["As a sophisticated art form", "As a mere mechanical process", "As a branch of science"], 1, "«A mere mechanical process».");
  R(r, "The company has pledged to cut its carbon emissions by half within a decade. Critics, however, argue that the target relies heavily on offsetting rather than genuine reductions.", "What do critics say about the target?", ["It is too ambitious", "It relies heavily on offsetting", "It is already achieved"], 1, "«Relies heavily on offsetting».");
  R(r, "Playwrights often use silence as a dramatic device. In some productions, the absence of dialogue for several minutes conveys more tension than any speech could.", "What does silence convey in some productions?", ["Less tension than speech", "More tension than any speech", "Boredom"], 1, "«More tension than any speech could».");
  R(r, "Volunteers who participated in the community garden project reported improved mood and a stronger sense of belonging. Several participants said the project had helped them meet neighbours they would otherwise never have known.", "What did several participants say?", ["They had met neighbours through the project", "They had moved away", "They had lost friends"], 0, "«Helped them meet neighbours».");
  RT(r, "The airline has faced sharp criticism after cancelling hundreds of flights at short notice. The regulator has demanded a full explanation and may impose substantial fines.", "What might the regulator impose?", ["Substantial fines"], "«May impose substantial fines».");
  R(r, "Many linguists believe that a language dies when its last fluent speaker passes away. Others argue that a language can survive in written form, provided that communities continue to use it.", "What do others argue?", ["A language dies immediately", "A language can survive in written form", "Writing always destroys a language"], 1, "«Survive in written form».");
  R(r, "The new hospital wing was supposed to open in March, but construction delays have pushed the date back by several months. Officials blame a shortage of skilled labour.", "What do officials blame for the delay?", ["Bad weather", "A shortage of skilled labour", "Lack of funding"], 1, "«A shortage of skilled labour».");
  R(r, "Investors are increasingly looking at companies' environmental records before committing capital. Analysts say that poor sustainability performance can quickly translate into financial risk.", "What can poor sustainability performance lead to?", ["Financial risk", "Higher profits", "Greater demand"], 0, "«Quickly translate into financial risk».");
  R(r, "The local library now lends tools, musical instruments and even kitchen equipment. Its director believes that sharing resources strengthens community ties and reduces waste.", "What does the director believe sharing resources does?", ["It increases waste", "It strengthens community ties", "It is too expensive"], 1, "«Strengthens community ties and reduces waste».");
  R(r, "Although the novel was a commercial failure on its first release, it gradually found an audience through university courses. Today it is considered one of the author's most important works.", "How did the novel gradually find its audience?", ["Through television adaptations", "Through university courses", "Through a bestseller list"], 1, "«Through university courses».");
  R(r, "The government has introduced a tax on sugary drinks to tackle obesity. Supporters claim the measure has already reduced consumption, but opponents question whether it affects poorer households more heavily.", "What do opponents question?", ["Whether the tax reduces consumption", "Whether the tax affects poorer households more heavily", "Whether sugar is harmful"], 1, "«Affects poorer households more heavily».");
  R(r, "The design team presented three options for the new town square. The final choice combined the most popular features: generous seating, a water fountain and a covered market area.", "What features made it into the final design?", ["Only a car park", "Generous seating, a water fountain and a covered market", "A football pitch"], 1, "Tres elementos mencionados.");
  R(r, "Many students struggle with academic writing because they confuse summarising with analysing. Teachers recommend that students first identify an argument before supporting it with evidence.", "What do teachers recommend students do first?", ["Collect as much evidence as possible", "Identify an argument", "Write the conclusion"], 1, "«First identify an argument».");
  R(r, "The bakery's owners have expanded their menu to include vegan options. Sales have risen steadily, which they attribute to a growing demand for plant-based food in the area.", "What do the owners attribute the rise in sales to?", ["A lower price", "Growing demand for plant-based food", "A new location"], 1, "«Growing demand for plant-based food».");
  R(r, "Historians have reassessed the role of women in wartime industry. Newly discovered records show that many women held positions of considerable responsibility, not merely temporary roles.", "What do the newly discovered records show?", ["Women had no responsibility", "Many women held positions of considerable responsibility", "Women were absent from factories"], 1, "«Considerable responsibility».");
  R(r, "A recent survey found that workers who take regular breaks report higher concentration than those who work continuously. The authors caution that the survey relied on self-reported data.", "What do the authors caution about?", ["The number of workers surveyed", "The reliance on self-reported data", "The cost of the survey"], 1, "«Relied on self-reported data».");
  R(r, "The national park attracts visitors from around the world, yet its managers worry that overcrowding is damaging fragile ecosystems. They are considering a timed entry system for the busiest months.", "What are the managers considering?", ["Closing the park", "A timed entry system for the busiest months", "Charging higher prices all year"], 1, "«A timed entry system».");

  L(l, "Woman: I've been reviewing the budget, and we're over by about ten percent. Man: That's a lot. Which department is responsible for most of the overspend?", "Which department is responsible for most of the overspend?", ["It is not specified", "The marketing department", "The finance department"], 0, "No se menciona el departamento.");
  L(l, "Boy: The museum has reopened the east wing. Girl: I know, I went last weekend. The new sculpture gallery is stunning.", "Which part of the museum has reopened?", ["The east wing", "The west wing", "The café"], 0, "«The east wing».");
  L(l, "Man: We've had three complaints about the noise from the construction site. Woman: The contractor has agreed to stop work after eight in the evening.", "What has the contractor agreed to do?", ["Stop work after eight in the evening", "Hire more workers", "Pay compensation"], 0, "«Stop work after eight in the evening».");
  L(l, "Girl: I can't decide between the two job offers. Boy: Think about which one gives you more room to grow, not just the salary.", "What does the boy advise her to consider?", ["Room to grow rather than salary", "The location only", "The company's logo"], 0, "«Room to grow, not just the salary».");
  L(l, "Woman: The workshop was useful, but I'd have preferred more practical exercises. Man: I agree. There was too much theory and not enough hands-on work.", "What did the woman prefer?", ["More practical exercises", "More theory", "A shorter workshop"], 0, "«More practical exercises».");
  L(l, "Man: The train was delayed again this morning. Woman: That's the third time this week. I'm going to start taking the bus.", "What is the woman going to do?", ["Take the bus", "Walk to work", "Stay at home"], 0, "«I'm going to start taking the bus».");
  L(l, "Boy: The school has decided to extend the lunch break. Girl: That's good news. The students have been asking for it for years.", "What has the school decided?", ["To extend the lunch break", "To shorten the school day", "To close on Fridays"], 0, "«Extend the lunch break».");
  L(l, "Woman: The figures for the first quarter look promising. Man: They do, but I'd wait until we see the second quarter before celebrating.", "What does the man suggest?", ["Waiting until the second quarter", "Celebrating now", "Cutting the budget"], 0, "«Wait until we see the second quarter».");
  L(l, "Man: The hotel was much cheaper than we expected. Woman: True, but the rooms were quite small and the breakfast was disappointing.", "What did the woman dislike about the hotel?", ["The rooms and breakfast", "The price", "The location"], 0, "«Rooms quite small», «breakfast disappointing».");
  L(l, "Girl: Have you read the new report on urban air quality? Boy: Yes. It recommends reducing traffic in the city centre by at least a fifth.", "What does the report recommend?", ["Reducing city centre traffic by at least a fifth", "Building more car parks", "Banning all cars"], 0, "«Reducing traffic by at least a fifth».");
  L(l, "Woman: The team managed to finish the project a week early. Man: That's remarkable, considering how many setbacks we had in the spring.", "When did the team finish the project?", ["A week early", "On time", "A month late"], 0, "«A week early».");
  L(l, "Man: I'm worried the new policy will discourage applicants. Woman: It might, but it also makes the process fairer for everyone.", "What is the woman's view of the policy?", ["It makes the process fairer", "It discourages everyone", "It is unfair"], 0, "«Makes the process fairer».");
  L(l, "Boy: The tickets for the concert sold out in minutes. Girl: That's no surprise. The band hasn't toured here for almost ten years.", "Why were the tickets so popular?", ["The band had not toured for almost ten years", "The tickets were free", "The venue was very cheap"], 0, "«Hasn't toured here for almost ten years».");
  L(l, "Woman: The client wants to see a revised proposal by Friday. Man: That's tight, but I think we can manage if we split the work.", "When does the client want the revised proposal?", ["By Friday", "By Monday", "Next month"], 0, "«By Friday».");
  L(l, "Man: I'm surprised the committee approved the plan so quickly. Woman: They had clearly done their homework and the arguments were persuasive.", "Why was the committee convinced?", ["The arguments were persuasive", "The plan was cheap", "The chair insisted"], 0, "«The arguments were persuasive».");
  L(l, "Girl: The hiking trail was much steeper than the guidebook suggested. Boy: Yes, we should have checked the elevation before setting off.", "What did they fail to check?", ["The elevation of the trail", "The weather", "The price of the guidebook"], 0, "«Check the elevation».");
  LT(l, "Woman: The new software has cut our processing time in half. Man: That's impressive, although the training took much longer than we planned.", "What took longer than planned?", ["The training"], "«The training took much longer».");
  L(l, "Boy: Do you think the school will keep the uniform policy? Girl: Honestly, I think there will be a vote next term, and it could go either way.", "What will happen next term?", ["A vote on the uniform policy", "The uniform will be abolished", "The school will close"], 0, "«There will be a vote next term».");
  L(l, "Man: The theatre has raised ticket prices again. Woman: I know, but it's still cheaper than most other cultural venues in the city.", "What does the woman say about the theatre?", ["It is cheaper than most other venues", "It is too expensive", "It has closed"], 0, "«Still cheaper than most other cultural venues».");
  L(l, "Girl: Did you hear the lecture on climate adaptation? Boy: Yes, the speaker made a compelling case for investing in flood defences.", "What did the speaker argue for?", ["Investing in flood defences", "Reducing taxes", "Moving the city"], 0, "«Investing in flood defences».");

  T(t, "Rewrite: 'She is extremely good at negotiating.' → 'She is ___ at negotiating.'", "Adjetivo de habilidad con «adept».", ["adept", "skilled", "highly skilled", "a skilled negotiator"], "«Adept at» o «skilled at».");
  T(t, "Rewrite: 'Although he was tired, he continued working.' → 'Despite ___, he continued working.'", "Expresión «despite» + sustantivo.", ["being tired", "his tiredness", "feeling tired"], "«Despite being tired».");
  T(t, "Rewrite: 'It is not certain whether the train will arrive on time.' → 'It is ___ whether the train will arrive on time.'", "Expresión de incertidumbre.", ["uncertain", "open to question", "doubtful"], "«Uncertain» o «doubtful».");
  T(t, "Rewrite: 'The meeting was postponed because of the storm.' → 'The meeting was ___ due to the storm.'", "Verbo «put off».", ["put off", "called off", "postponed"], "«Put off» = aplazar.");
  T(t, "Rewrite: 'They worked very hard to finish the project on time.' → 'They ___ to finish the project on time.'", "Verbo «strive».", ["strove", "strived", "made every effort"], "«Strive» = esforzarse.");
  T(t, "Rewrite: 'Nobody could have predicted the outcome.' → 'The outcome ___ predicted.'", "Pasiva con «could not have».", ["could not have been"], "«Could not have been predicted».");
  T(t, "Rewrite: 'The director resigned after the scandal.' → 'The director ___ in the wake of the scandal.'", "Verbo «step down».", ["stepped down", "resigned"], "«Stepped down» o «resigned».");
  T(t, "Rewrite: 'The results were better than we had expected.' → 'The results ___ our expectations.'", "Verbo «exceed».", ["exceeded", "surpassed", "went beyond"], "«Exceeded» = superó.");
  T(t, "Rewrite: 'I am not in favour of the new plan.' → 'I am ___ the new plan.'", "Adjetivo «opposed to».", ["opposed to", "against"], "«Opposed to».");
  T(t, "Rewrite: 'He was so tired that he fell asleep at once.' → 'He was ___ tired that he fell asleep at once.'", "Estructura «so».", ["so"], "«So tired that».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var g = "B2 · Gramática", r = "B2 · Lectura", l = "B2 · Escucha", t = "B2 · Reformulación";

  G(g, "The architect insisted that the plans ___ checked again before construction began.", ["be", "are", "were"], 0, "Subjuntivo tras «insisted that»: be.");
  T(g, "No sooner ___ the phone rung than she answered it.", "Escribe la palabra que falta.", ["had"], "Inversión con «no sooner ... than»: had rung.");
  G(g, "He spoke as if he ___ the entire story from the beginning.", ["knew", "knows", "had known"], 0, "«As if» + pasado en irreal (matiz de simultaneidad).");
  T(g, "The new law, ___ was approved last year, has already been challenged in court.", "Escribe la palabra que falta.", ["which"], "Relativa no definida con «which».");
  T(g, "She is quite ___ to fail the exam without more revision.", "Escribe la palabra que falta.", ["likely"], "«Likely to» + infinitivo.");
  G(g, "I'm not sure whether they ___ the invitation or simply forgot about it.", ["declined", "declining", "declines"], 0, "Pasado simple: declined.");
  T(g, "The lecture was ___ interesting that I forgot the time.", "Escribe la palabra que falta.", ["so"], "«So» + adjetivo, «so ... that».");
  T(g, "They have ___ to cut costs without affecting quality.", "Escribe la palabra que falta.", ["managed"], "Present perfect + «managed to».");
  G(g, "There is ___ point in arguing about it now.", ["no", "not", "none"], 0, "«No point in» + gerundio.");
  G(g, "The bridge ___ closed for repairs since last Monday.", ["has been", "is", "has being"], 0, "Present perfect pasivo con «since».");
  T(g, "Were you ___ to speak at the conference, what would you say?", "Escribe la palabra que falta.", ["invited"], "Condicional de segundo tipo en pasiva.");
  G(g, "Hardly ___ the report when the manager called for a meeting.", ["had she finished", "she had finished", "she finished"], 0, "Inversión con «hardly ... when».");
  G(g, "The agreement ___ on the understanding that both sides would compromise.", ["was reached", "reached", "is reaching"], 0, "Pasiva en pasado simple.");
  G(g, "He is not ___ to the idea of working from home.", ["opposed", "opposing", "oppose"], 0, "Adjetivo «opposed to».");
  T(g, "I would have finished the book by now, ___ it not been so long.", "Escribe la palabra que falta.", ["had"], "Condicional mixto con inversión implícita de «had».");
  G(g, "The volunteers ___ over two hundred boxes of food this week.", ["have distributed", "distributed", "have distribute"], 0, "Present perfect con «this week».");
  T(g, "She ___ to the office every morning before the rest of the team.", "Escribe la palabra que falta.", ["comes"], "Presente simple habitual.");
  G(g, "Provided that everyone ___ on time, we can begin the meeting.", ["arrives", "will arrive", "arrived"], 0, "Presente tras «provided that» con sentido de futuro.");
  G(g, "The results were ___ than anyone had predicted.", ["more encouraging", "encouraginger", "most encouraging"], 0, "Comparativo: more encouraging.");
  T(g, "They are ___ to the local council about the new road.", "Escribe la palabra que falta.", ["writing"], "Presente continuo con «writing to».");
  T(g, "I don't think she is ___ to take on such a large project.", "Escribe la palabra que falta.", ["equipped"], "Participio: «equipped to».");
  G(g, "It was not until the following day ___ the truth came out.", ["that", "when", "which"], 0, "Estructura enfática «It was not until ... that».");
  G(g, "The goods ___ by the time the customer complains.", ["will have been delivered", "will be delivered", "have been delivered"], 0, "Futuro perfecto pasivo con «by the time».");
  T(g, "Her ___ of the situation was clear from the start.", "Escribe la palabra que falta.", ["understanding"], "Sustantivo «understanding» en función de sujeto.");
  G(g, "Rather than ___ the report, they simply ignored it.", ["reading", "read", "to read"], 0, "«Rather than» + gerundio.");
  T(g, "Under no circumstances ___ the documents be shared with third parties.", "Escribe la palabra que falta.", ["should"], "Inversión con «under no circumstances» + «should».");
  T(g, "The referee ___ the decision after reviewing the footage.", "Escribe la palabra que falta.", ["reversed"], "Pasado simple: reversed.");

  R(r, "The team of ecologists spent three years monitoring the population of wild salmon in the river. Their findings suggest that rising water temperatures have shortened the breeding season considerably.", "What have rising water temperatures done?", ["Lengthened the breeding season", "Shortened the breeding season", "Increased the salmon population"], 1, "«Shortened the breeding season».");
  R(r, "Although remote working was once considered a temporary measure, many companies now view it as a permanent feature of their operations. Some managers, however, still prefer to see their staff in the office.", "What do some managers still prefer?", ["Remote working only", "Seeing their staff in the office", "Fewer working hours"], 1, "«Still prefer to see their staff in the office».");
  R(r, "The city's bus network has been redesigned to reduce journey times. Planners expect that frequent, direct routes will encourage residents to abandon their cars for everyday trips.", "What do planners expect?", ["Residents will buy more cars", "Residents will abandon cars for everyday trips", "Journey times will increase"], 1, "«Abandon their cars for everyday trips».");
  R(r, "Many people assume that a healthy diet is expensive, but nutritionists argue that affordable staples such as lentils, oats and seasonal vegetables can provide all the essential nutrients.", "What do nutritionists argue?", ["Healthy food is always expensive", "Affordable staples can provide essential nutrients", "Vegetables should be avoided"], 1, "«Affordable staples can provide all the essential nutrients».");
  R(r, "The orchestra's conductor announced his retirement after thirty years. Musicians praised his ability to bring out the best in each section, though some felt his interpretations had grown too conservative.", "What did some musicians feel?", ["His interpretations were too modern", "His interpretations had grown too conservative", "He had been unfair to them"], 1, "«Had grown too conservative».");
  R(r, "The software company has released an update that removes several features users found confusing. Its developers hope the simplified design will attract new customers without alienating existing ones.", "What do the developers hope the update will do?", ["Alienate existing customers", "Attract new customers without alienating existing ones", "Remove the software entirely"], 1, "«Attract new customers without alienating existing ones».");
  R(r, "Museum curators have begun to question how colonial objects are displayed. Many now believe that labels should acknowledge the circumstances in which the objects were acquired.", "What do many curators now believe?", ["Labels should be removed", "Labels should acknowledge how objects were acquired", "Objects should be sold"], 1, "«Acknowledge the circumstances in which the objects were acquired».");
  R(r, "A study of urban gardeners found that those who grew their own vegetables consumed more of them. The researchers suggest that the experience of growing food increases people's appetite for it.", "What do the researchers suggest?", ["Gardening makes people less hungry", "Growing food increases people's appetite for it", "Vegetables are unpopular"], 1, "«Increases people's appetite for it».");
  R(r, "The fishing village hosted its first food festival this summer. Organisers were surprised by the turnout, and several local restaurants reported that their bookings had doubled.", "What did several restaurants report?", ["Their bookings had doubled", "Their bookings had fallen", "They had closed"], 0, "«Bookings had doubled».");
  R(r, "The trade union has accepted the revised pay offer, although a significant minority of members voted against it. Union leaders say the vote reflects genuine frustration over working conditions.", "What does the vote reflect, according to union leaders?", ["Support for the offer", "Frustration over working conditions", "Satisfaction with pay"], 1, "«Genuine frustration over working conditions».");
  R(r, "Architects are experimenting with buildings made from timber rather than concrete. Supporters say timber stores carbon and can be assembled quickly, while critics question its durability in extreme weather.", "What do critics question about timber buildings?", ["Their cost", "Their durability in extreme weather", "Their appearance"], 1, "«Its durability in extreme weather».");
  R(r, "The school introduced a mentoring programme in which older pupils support younger students with their reading. Teachers report that both groups have become more confident readers.", "What have teachers reported?", ["Only older pupils improved", "Both groups have become more confident readers", "The programme has been cancelled"], 1, "«Both groups have become more confident readers».");
  R(r, "The discovery of a new comet has excited astronomers, who hope to observe it for several months. Its orbit, however, is so elongated that it will be visible only briefly from Earth.", "Why will the comet be visible only briefly?", ["Its orbit is very elongated", "It is too small", "It is too close to the sun"], 0, "«Its orbit is so elongated».");
  R(r, "Many small businesses rely on social media to reach customers. Experts warn, however, that depending on a single platform can leave firms vulnerable if its algorithms change.", "What do experts warn about?", ["Using too many platforms", "Depending on a single platform", "Advertising too little"], 1, "«Depending on a single platform».");
  R(r, "The town council has approved the construction of a new footbridge across the river. Residents hope it will shorten the journey to the station, which currently requires a long detour.", "What do residents hope the footbridge will do?", ["Lengthen the journey", "Shorten the journey to the station", "Close the river"], 1, "«Shorten the journey to the station».");
  R(r, "Some psychologists argue that praise should focus on effort rather than talent. They claim that children who are praised for their effort are more willing to tackle difficult tasks.", "What do some psychologists claim?", ["Children should be praised for talent only", "Children praised for effort are more willing to tackle difficult tasks", "Praise is harmful"], 1, "«More willing to tackle difficult tasks».");
  R(r, "Coastal erosion has accelerated in recent decades, threatening homes and historic sites. Engineers are weighing whether to build sea walls or to allow the shoreline to retreat naturally.", "What are engineers weighing?", ["Whether to build sea walls or let the shoreline retreat", "Whether to move the coast", "Whether to stop fishing"], 0, "«Build sea walls or allow the shoreline to retreat».");
  R(r, "A growing number of job seekers now use online platforms to find work. While these platforms offer convenience, many applicants complain that they receive automated rejections without any feedback.", "What do many applicants complain about?", ["Too few job listings", "Automated rejections without feedback", "High fees"], 1, "«Automated rejections without any feedback».");
  R(r, "The festival committee has decided to introduce a ticket limit to prevent overcrowding. Some local traders fear the decision will reduce the income they usually earn during the event.", "What do some local traders fear?", ["Higher ticket prices", "Reduced income during the event", "More competition from other festivals"], 1, "«Reduce the income they usually earn».");
  R(r, "The lake's water quality has improved markedly since factories along its shores were required to treat their waste. Fish populations have recovered, and swimming is once again permitted.", "What has happened since the factories were required to treat waste?", ["The lake's water has worsened", "The water quality has improved markedly", "The factories closed"], 1, "«Improved markedly».");
  R(r, "Economists disagree about the effects of minimum wage increases. Some argue that they reduce employment, while others maintain that higher wages boost spending and ultimately create jobs.", "What do others maintain?", ["Higher wages reduce spending", "Higher wages boost spending and ultimately create jobs", "Minimum wages have no effect"], 1, "«Boost spending and ultimately create jobs».");

  L(l, "Man: I'm not sure we should expand the team this year. Woman: I see your point, but we're already stretched, and the workload won't decrease.", "What is the woman's view?", ["The team is already stretched", "The team should be reduced", "The workload will decrease"], 0, "«We're already stretched».");
  L(l, "Girl: The new coffee shop on the corner is always busy. Boy: It's the best place in town for a quiet morning, though the queue can be long.", "What does the boy say about the coffee shop?", ["It is good but the queue can be long", "It is always empty", "It is too expensive"], 0, "«The queue can be long».");
  L(l, "Woman: The committee has postponed its decision until next month. Man: That's frustrating, but I suppose they want more evidence first.", "When will the committee decide?", ["Next month", "Today", "Next year"], 0, "«Postponed its decision until next month».");
  L(l, "Man: How was the hiking trip? Woman: Exhausting, but the views from the top were worth every step.", "How did the woman describe the trip?", ["Exhausting but worth it", "Boring", "Dangerous"], 0, "«Exhausting, but ... worth every step».");
  L(l, "Boy: Did you manage to renew your passport? Girl: Yes, but it took longer than the website claimed, nearly six weeks.", "How long did the renewal take?", ["Nearly six weeks", "Two days", "Three months"], 0, "«Nearly six weeks».");
  L(l, "Woman: The organisers have moved the conference to a larger venue. Man: Good, because the old hall was far too small for the number of registrations.", "Why was the conference moved?", ["The old hall was too small", "The speakers cancelled", "The city had no hotels"], 0, "«The old hall was far too small».");
  L(l, "Man: I've received an offer from a company in Madrid. Woman: That's exciting. Are you going to relocate?", "What has the man received?", ["An offer from a company in Madrid", "A promotion at his current job", "A research grant"], 0, "«An offer from a company in Madrid».");
  L(l, "Girl: The café has decided to stop using single-use cups. Boy: That's a sensible move, though some customers may resist the change.", "What has the café decided?", ["To stop using single-use cups", "To close on Sundays", "To raise its prices"], 0, "«Stop using single-use cups».");
  L(l, "Woman: I think the film is much better than the reviews suggested. Man: I agree, although the second half drags a little.", "What does the man think of the second half?", ["It drags a little", "It is the best part", "It is too short"], 0, "«The second half drags a little».");
  L(l, "Boy: The council has announced new parking charges for the city centre. Girl: Yes, and many people are angry because the buses are still unreliable.", "Why are people angry?", ["The buses are still unreliable", "The parking is free", "The roads are closed"], 0, "«The buses are still unreliable».");
  L(l, "Man: The applicants were far stronger than we anticipated. Woman: Indeed. It will be difficult to choose among them.", "How does the woman feel about the applicants?", ["Choosing will be difficult", "They were weak", "They were too few"], 0, "«It will be difficult to choose».");
  LT(l, "Girl: The bus driver was very patient with the elderly passengers. Boy: That's rare these days, and it made the journey much more pleasant.", "How did the bus driver behave?", ["Patiently"], "«Very patient with the elderly passengers».");
  L(l, "Woman: We need to decide whether to hire a consultant or train our own staff. Man: Training is cheaper in the long run, but it takes time.", "What does the man say about training?", ["It is cheaper in the long run", "It is too expensive", "It is quicker"], 0, "«Cheaper in the long run, but it takes time».");
  L(l, "Boy: The school trip to the castle was cancelled because of the rain. Girl: That's a shame. The students had been looking forward to it for weeks.", "Why was the school trip cancelled?", ["Because of the rain", "Because of a strike", "Because the castle was closed"], 0, "«Because of the rain».");
  L(l, "Man: I'd love to join the choir, but my schedule is already packed. Woman: That's a pity. The rehearsals are only once a week.", "Why can't the man join the choir?", ["His schedule is already packed", "He cannot sing", "The choir is full"], 0, "«My schedule is already packed».");
  L(l, "Woman: The factory will reduce its night shifts from next month. Man: That will please the workers, although the production targets remain unchanged.", "What will the factory reduce?", ["Its night shifts", "Its production targets", "Its workforce"], 0, "«Reduce its night shifts».");
  L(l, "Girl: My brother has finally finished his thesis. Boy: Congratulations! How long did it take him?", "How long did the brother's thesis take?", ["It is not stated", "Two months", "One year"], 0, "No se indica la duración.");
  L(l, "Man: The gallery is hosting a retrospective of the painter's early work. Woman: I'd like to see it, especially the sketches from her time in Paris.", "What does the woman want to see?", ["The sketches from her time in Paris", "The late works", "The gallery building"], 0, "«The sketches from her time in Paris».");
  L(l, "Boy: The new park has a playground, a skate area and an open-air gym. Girl: It sounds perfect for families. When does it open?", "What facilities does the park have?", ["A playground, a skate area and an open-air gym", "A swimming pool and a café", "A football pitch and a lake"], 0, "Tres instalaciones mencionadas.");

  T(t, "Rewrite: 'Although the price was high, they bought the house.' → 'Despite ___, they bought the house.'", "Expresión «despite» + sustantivo o gerundio.", ["the high price", "the price being high", "how expensive it was"], "«Despite the high price».");
  T(t, "Rewrite: 'The manager was unable to attend the meeting.' → 'The manager ___ attend the meeting.'", "Verbo «fail to» o «be unable».", ["failed to", "could not"], "«Failed to attend».");
  T(t, "Rewrite: 'It is possible that the flight will be delayed.' → 'The flight ___ delayed.'", "Verbo modal de posibilidad.", ["may be", "might be", "could be"], "«May be delayed».");
  T(t, "Rewrite: 'She regrets that she did not study harder.' → 'She ___ she had studied harder.'", "Expresión «wish».", ["wishes", "wish"], "«Wishes she had studied».");
  T(t, "Rewrite: 'The new rules apply to all employees.' → 'The new rules ___ to all employees.'", "Verbo «extend» o «apply».", ["apply", "extend"], "«Apply» o «extend».");
  T(t, "Rewrite: 'They had no intention of leaving early.' → 'They had no ___ of leaving early.'", "Sustantivo «intention».", ["intention", "plans", "desire"], "«No intention» o «no plans».");
  T(t, "Rewrite: 'The company decided to close the factory permanently.' → 'The company decided to ___ the factory.'", "Verbo «shut down».", ["shut down", "close down", "permanently close"], "«Shut down».");
  T(t, "Rewrite: 'He is much more experienced than his colleagues.' → 'He is ___ than his colleagues.'", "Expresión «far more».", ["far more experienced", "considerably more experienced", "much more seasoned"], "«Far more experienced».");
  T(t, "Rewrite: 'Please make sure you lock the door when you leave.' → 'Please ___ the door is locked when you leave.'", "Verbo «ensure».", ["ensure", "make certain"], "«Ensure» o «make certain».");
  T(t, "Rewrite: 'The lecture was cancelled at the last minute.' → 'The lecture was ___ at short notice.'", "Verbo «called off».", ["called off", "cancelled"], "«Called off» o «cancelled».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "B2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "B2 · Gramática", r = "B2 · Lectura", l = "B2 · Escucha", t = "B2 · Reformulación";
  G(g, "Had I known about the strike, I ___ taken a different route.", ["would have", "will have", "had"], 0, "Condicional mixto con inversión: would have taken.");
  G(g, "The students ___ the exam when the fire alarm went off.", ["were taking", "took", "had taken"], 0, "Pasado continuo para acción en curso interrumpida.");
  G(g, "I'm going to the bank, ___ I need to deposit a cheque.", ["as", "because", "although"], 0, "Conjunción causal «as».");
  T(g, "Not a single one of the candidates ___ the test.", "Escribe la palabra que falta.", ["passed"], "Sujeto singular con «not a single».");
  R(r, "Scientists have long assumed that the brain stops producing new neurons after childhood. Recent research challenges this view, showing that neurogenesis may continue well into adulthood, although the extent remains debated.", "What does recent research challenge?", ["That neurons are produced in childhood", "The view that neurons stop being produced after childhood", "The existence of neurons"], 1, "«Challenges this view».");
  RT(r, "The hotel industry has been transformed by online booking platforms. While they have increased visibility for small guesthouses, they have also made hotels more dependent on commission-based intermediaries.", "What have online platforms made hotels more dependent on?", ["Commission-based intermediaries"], "«Commission-based intermediaries».");
  R(r, "Critics of the proposal argue that the new stadium will benefit investors rather than the local community, whose homes may be lost during construction.", "What do critics say the stadium will benefit?", ["The local community", "Investors", "The residents' homes"], 1, "«Benefit investors rather than the local community».");
  R(r, "Although the report was published months ago, its recommendations have yet to be implemented. Campaigners say the delay reflects a lack of political will rather than a lack of resources.", "What do campaigners say the delay reflects?", ["A lack of resources", "A lack of political will", "A lack of public interest"], 1, "«A lack of political will».");
  L(l, "Woman: The meeting has been moved to Thursday. Man: Thursday works for me, but I'll need to leave early.", "Why will the man leave early?", ["He needs to leave early", "He is ill", "He has no transport"], 0, "«I'll need to leave early».");
  L(l, "Boy: Are you still planning to visit your aunt in Scotland? Girl: Yes, though the trip depends on whether I can get time off work.", "What does the trip depend on?", ["Whether she can get time off work", "The weather", "The price of tickets"], 0, "«Depends on whether I can get time off work».");
  T(t, "Rewrite: 'Nobody else had ever tried such a bold approach.' → 'Never before ___ such a bold approach.'", "Inversión con «never before».", ["had anyone tried"], "«Never before had anyone tried».");
  T(t, "Rewrite: 'It is essential that you read the instructions carefully.' → 'You ___ read the instructions carefully.'", "Obligación con «must».", ["must", "have to", "need to"], "«Must» o «have to».");

  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C1 · Gramática", r = "C1 · Lectura", l = "C1 · Escucha", t = "C1 · Reformulación";
  T(g, "Had the negotiators ___ more flexible, the deal would have closed last week.", "Escribe la palabra que falta.", ["been"], "Condicional mixto con inversión: had been.");
  G(g, "She is ___ to the idea that she will never be promoted.", ["resigned", "resigning", "resign"], 0, "Adjetivo «resigned to».");
  T(g, "The minister has been ___ of failing to consult the opposition.", "Escribe la palabra que falta.", ["accused"], "Participio: «accused of».");
  G(g, "Not for one moment ___ that the plan would fail.", ["did I suspect", "I suspected", "suspected I"], 0, "Inversión con «not for one moment».");
  G(g, "The evidence, ___ was circumstantial, was enough to convict him.", ["which", "who", "whom"], 0, "Relativa no definitiva con «which».");
  T(g, "It is imperative that every student ___ the guidelines.", "Escribe la palabra que falta.", ["follow"], "Subjuntivo tras «imperative that»: follow.");
  T(g, "No sooner ___ the contract signed than the prices rose.", "Escribe la palabra que falta.", ["was"], "Inversión con «no sooner» en pasado: was.");
  G(g, "She ___ the report for three days before she finally submitted it.", ["had been revising", "revised", "has revised"], 0, "Pasado perfecto continuo con duración.");
  G(g, "The committee ___ its findings by the end of the year.", ["will have published", "will publish", "has published"], 0, "Futuro perfecto con «by».");
  G(g, "Such ___ the magnitude of the disaster that aid arrived too late.", ["was", "were", "is"], 0, "Inversión con «such» y sujeto singular.");
  T(g, "Were it ___ for the funding, the project would have been abandoned.", "Escribe la palabra que falta.", ["not"], "Condicional mixto: were it not for.");
  G(g, "The author's arguments are ___ with the evidence presented in chapter three.", ["at odds", "in odds", "odds with"], 0, "Expresión «at odds with».");
  T(g, "He ___ his reputation on a single decision that proved disastrous.", "Escribe la palabra que falta.", ["staked"], "Pasado simple de «stake»: staked.");
  G(g, "The board ___ the proposal for lack of supporting data.", ["rejected", "rejecting", "rejects"], 0, "Pasado simple con sentido de resultado.");
  G(g, "Little ___ the consequences of their actions until it was too late.", ["did they realise", "they realised", "realised they"], 0, "Inversión con «little» y pasado.");
  T(g, "The patient ___ an unexpected improvement in her condition.", "Escribe la palabra que falta.", ["showed"], "Pasado simple: showed.");
  G(g, "I would have accepted the offer, ___ the salary been higher.", ["had", "if", "were"], 0, "Condicional mixto con inversión: had.");
  T(g, "There is ___ evidence to support the claim.", "Escribe la palabra que falta.", ["little"], "«Little» con sustantivo incontable: evidence.");
  T(g, "She is widely ___ as the leading authority on medieval law.", "Escribe la palabra que falta.", ["regarded"], "Pasiva con «regarded as».");
  G(g, "The findings ___ into question the validity of the earlier study.", ["call", "calling", "called"], 0, "«Call into question» (poner en duda).");
  T(g, "The company's profits ___ sharply after the merger.", "Escribe la palabra que falta.", ["plummeted"], "Pasado simple: plummeted.");
  T(g, "Were the government to ___ the tax, consumption would rise.", "Escribe la palabra que falta.", ["cut"], "Condicional de segundo tipo con «were to».");
  G(g, "The tenant ___ the flat before the lease expired.", ["vacated", "vacating", "vacate"], 0, "Pasado simple: vacated.");
  T(g, "They ___ the matter in a closed session behind locked doors.", "Escribe la palabra que falta.", ["discussed"], "Pasado simple.");
  G(g, "The artist's later works are ___ by a sense of melancholy.", ["characterised", "characterising", "characterise"], 0, "Pasiva: characterised by.");
  T(g, "The minister ___ to resign only after intense pressure from her party.", "Escribe la palabra que falta.", ["agreed"], "Pasado simple con «agreed to».");
  T(g, "Having ___ the evidence, the jury retired to deliberate.", "Escribe la palabra que falta.", ["heard"], "Participio perfecto: having heard.");
  G(g, "The company is ___ to be taken over by a rival firm.", ["likely", "probably", "possibly"], 0, "«Likely to be» + participio.");
  G(g, "Her mistake was not ___ a lack of care but of judgement.", ["so much", "such", "too much"], 0, "Expresión «not so much ... as».");

  R(r, "Economic historians have revised the traditional account of the Industrial Revolution. Rather than a sudden transformation, they now describe a gradual process shaped by local institutions, trade networks and access to capital.", "How do historians now describe the Industrial Revolution?", ["As a sudden transformation", "As a gradual process shaped by local factors", "As a purely technological change"], 1, "«A gradual process shaped by local institutions».");
  R(r, "The judge's ruling, which overturned a decade-old precedent, has been welcomed by civil liberties groups but condemned by several legal scholars who see it as an overreach of judicial power.", "How have several legal scholars viewed the ruling?", ["As a welcome reform", "As an overreach of judicial power", "As a routine decision"], 1, "«An overreach of judicial power».");
  R(r, "Proponents of universal basic income argue that it would provide a safety net in an age of automation. Opponents, however, contend that it would discourage work and prove prohibitively expensive.", "What do opponents contend?", ["It would encourage work", "It would discourage work and be prohibitively expensive", "It would be too small to matter"], 1, "«Discourage work and prove prohibitively expensive».");
  R(r, "The archive's digitisation project has made thousands of documents accessible online. Yet scholars warn that digital copies can never fully replace the physical evidence, which conveys texture, marginalia and provenance.", "What do scholars warn digital copies cannot convey?", ["Text and dates", "Texture, marginalia and provenance", "Searchable content"], 1, "«Texture, marginalia and provenance».");
  R(r, "The regional government has been criticised for prioritising motorway expansion over rail investment. Officials counter that the motorway improvements were necessary to relieve congestion that had become acute.", "How do officials justify the motorway expansion?", ["It was cheaper than rail", "It was necessary to relieve acute congestion", "It was requested by the public"], 1, "«Relieve congestion that had become acute».");
  L(l, "Man: The results of the trial were inconclusive. Woman: Inconclusive, perhaps, but the trend in the treated group is hard to ignore.", "How does the woman describe the trial results?", ["Inconclusive but with a noticeable trend", "Completely negative", "Entirely positive"], 0, "«The trend ... is hard to ignore».");
  L(l, "Woman: The orchestra has been forced to cancel its winter season. Man: That's a blow for the city, given how much its concerts contribute to local culture.", "Why did the orchestra cancel its season?", ["Its winter season was cancelled", "Its conductor retired", "It moved to another city"], 0, "«Cancel its winter season».");
  L(l, "Boy: I'm not convinced that the reform will achieve its aims. Girl: Neither am I, though I'd rather give it a fair trial before judging.", "What does the girl want to do?", ["Give the reform a fair trial", "Abandon the reform", "Rewrite the reform"], 0, "«Give it a fair trial».");
  L(l, "Man: The council's consultation attracted only a handful of responses. Woman: That may reflect public apathy, or simply poor advertising of the process.", "What might explain the low response?", ["Public apathy or poor advertising", "Too many questions", "The consultation was in another language"], 0, "«Public apathy, or simply poor advertising».");
  L(l, "Girl: The research grant has been renewed for another three years. Boy: That's a real vote of confidence in the team's work.", "For how long has the grant been renewed?", ["Three years", "One year", "Five years"], 0, "«Another three years».");
  T(t, "Rewrite: 'He was reluctant to admit that the strategy had failed.' → 'He was ___ to admit that the strategy had failed.'", "Expresión «loath».", ["loath", "averse", "unwilling"], "«Loath» o «averse».");
  T(t, "Rewrite: 'The evidence was so compelling that the court acquitted them.' → 'The evidence was ___ compelling that the court acquitted them.'", "Estructura «so».", ["so"], "«So compelling».");
  T(t, "Rewrite: 'Their proposal was rejected because it was too costly.' → 'Their proposal was rejected on ___ grounds.'", "Adjetivo «financial».", ["financial", "cost"], "«Financial grounds».");
  T(t, "Rewrite: 'The decision will have a profound effect on the region.' → 'The decision will ___ the region profoundly.'", "Verbo «reverberate» o «impact».", ["impact", "reverberate through", "affect"], "«Impact» o «affect».");
  T(t, "Rewrite: 'In the end, the committee agreed to the changes.' → 'The committee ___ to the changes in the end.'", "Verbo «acquiesce».", ["acquiesced", "eventually agreed", "came round"], "«Acquiesced» o «eventually agreed».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C1 · Gramática", r = "C1 · Lectura", l = "C1 · Escucha", t = "C1 · Reformulación";
  T(g, "Scarcely had the audience taken their seats ___ the orchestra began to play.", "Escribe la palabra que falta.", ["when"], "«Scarcely ... when» con pasado perfecto.");
  G(g, "The new evidence ___ the previous conclusions of the inquiry.", ["calls into question", "calls in question of", "calls to question"], 0, "Expresión «call into question».");
  T(g, "Were she ___ to change her mind, the outcome would be different.", "Escribe la palabra que falta.", ["to"], "Condicional de segundo tipo con «were to».");
  G(g, "He is ___ about the notion that the market will correct itself.", ["sceptical", "skeptic", "sceptically"], 0, "Adjetivo «sceptical about».");
  T(g, "The programme has ___ its objectives in every respect.", "Escribe la palabra que falta.", ["achieved"], "Present perfect con participio.");
  G(g, "It was only after months of deliberation ___ the board reached a decision.", ["that", "when", "which"], 0, "Estructura enfática «It was only after ... that».");
  G(g, "She ___ the document twice before signing it.", ["had read", "read", "has read"], 0, "Pasado perfecto por anterioridad a «signing».");
  G(g, "Under the new regulations, companies ___ disclose their emissions annually.", ["are required to", "are required", "must to"], 0, "Pasiva «are required to» + infinitivo.");
  G(g, "The politician ___ to have misled parliament about the expenses.", ["is alleged", "alleges", "is alleging"], 0, "Pasiva «is alleged to have».");
  T(g, "Had the engineers ___ the warning signs, the collapse could have been prevented.", "Escribe la palabra que falta.", ["heeded"], "Condicional mixto con participio: heeded.");
  T(g, "The results ___ the hypothesis, although further testing is needed.", "Escribe la palabra que falta.", ["support"], "Presente simple con sujeto plural.");
  G(g, "I'm inclined to think that the decision was ___.", ["premature", "prematurely", "prematurity"], 0, "Adjetivo tras «was»: premature.");
  T(g, "The company has been ___ for its poor handling of the complaint.", "Escribe la palabra que falta.", ["criticised"], "Pasiva con «criticised for».");
  T(g, "What ___ most impressed the judges was the clarity of the argument.", "Escribe la palabra que falta.", ["most"], "Estructura «what most impressed».");
  G(g, "The town has ___ grown in population since the new factory opened.", ["steadily", "steady", "steadiness"], 0, "Adverbio «steadily» antes de participio.");
  T(g, "Neither the prosecution ___ the defence had anticipated the verdict.", "Escribe la palabra que falta.", ["nor"], "Correlativo «neither ... nor».");
  G(g, "She is widely ___ to be the most talented designer of her generation.", ["believed", "believing", "belief"], 0, "Pasiva «is believed to be».");
  T(g, "The chairman has ___ an urgent review of the accounts.", "Escribe la palabra que falta.", ["ordered"], "Present perfect con «ordered».");
  T(g, "It is ___ to the staff that the policy will change.", "Escribe la palabra que falta.", ["unclear"], "Adjetivo «unclear» con «It is ... to».");
  G(g, "Her ___ to deliver the speech surprised everyone.", ["willingness", "willing", "willingly"], 0, "Sustantivo «willingness».");
  G(g, "Not until the last minute ___ the full extent of the damage.", ["did we realise", "we realised", "realised we"], 0, "Inversión con «not until».");
  T(g, "The judge ___ that the evidence was insufficient to proceed.", "Escribe la palabra que falta.", ["ruled"], "Pasado simple: ruled.");
  T(g, "The campaign has been ___ with mixed results.", "Escribe la palabra que falta.", ["met"], "Participio: «met with».");
  G(g, "The new director has been ___ with the task of restructuring the department.", ["charged", "charging", "charge"], 0, "Pasiva «charged with».");
  G(g, "The more I consider the proposal, ___ I become.", ["the less convinced", "less convinced", "the least convinced"], 0, "Estructura comparativa «the more ... the less».");
  T(g, "There was no ___ for the delay in the report.", "Escribe la palabra que falta.", ["explanation"], "Sustantivo «explanation».");
  G(g, "The treaty ___ into force in 2019 after lengthy negotiations.", ["came", "come", "came to"], 0, "Expresión «come into force».");
  T(g, "He spoke ___ the matter with remarkable frankness.", "Escribe la palabra que falta.", ["about"], "Preposición «about» con «speak».");
  T(g, "The fund is ___ to support small producers in rural areas.", "Escribe la palabra que falta.", ["designed"], "Pasiva «is designed to».");
  G(g, "She could not help ___ amused by the absurd situation.", ["feeling", "to feel", "feel"], 0, "«Cannot help + gerundio».");

  R(r, "The concept of the 'digital divide' was once used to describe unequal access to the internet. Scholars now use the term more broadly, to encompass differences in skills, confidence and the ability to use technology meaningfully.", "How is the term 'digital divide' now used?", ["Only to describe internet access", "More broadly, including skills and confidence", "To describe hardware costs"], 1, "«More broadly, to encompass differences in skills».");
  R(r, "The auction house revealed that the painting had changed hands several times in the twentieth century. Its provenance, though incomplete, has led specialists to question whether it was ever legally acquired.", "What have specialists questioned?", ["The painting's size", "Whether it was ever legally acquired", "The auction date"], 1, "«Whether it was ever legally acquired».");
  R(r, "Neuroscientists have found that bilingual speakers may develop stronger executive function. However, subsequent studies have struggled to replicate the findings consistently across different populations.", "What have subsequent studies struggled to do?", ["Confirm the findings consistently", "Replicate the findings consistently", "Fund the research"], 1, "«Replicate the findings consistently».");
  RT(r, "The company's decision to outsource its customer service has drawn criticism from employees and customers alike. Management argues that the change will improve response times, though the early figures are mixed.", "What do the early figures show?", ["Mixed results"], "«Early figures are mixed».");
  R(r, "The reintroduction of wolves to the highlands has been hailed as a conservation success. Farmers, however, claim that predation on livestock has risen sharply and call for compensation schemes.", "What do farmers call for?", ["The removal of all wolves", "Compensation schemes", "A ban on hiking"], 1, "«Call for compensation schemes».");
  R(r, "Anthropologists have long debated whether the rituals of ancient societies reflected shared beliefs or served primarily political purposes. Recent excavations tentatively favour the latter interpretation.", "Which interpretation do recent excavations favour?", ["Shared beliefs", "Primarily political purposes", "Economic exchange"], 1, "«Primarily political purposes».");
  R(r, "The publishing industry has been reshaped by self-publishing platforms, which allow authors to reach readers without traditional gatekeepers. Critics warn that the sheer volume of titles makes it harder for quality work to be noticed.", "What do critics warn about?", ["That authors cannot publish", "That quality work is harder to notice", "That readers are disappearing"], 1, "«Harder for quality work to be noticed».");
  R(r, "A recent analysis of parliamentary debates suggests that politicians' rhetoric has become more polarised over the past two decades. The authors note, however, that this trend is not uniform across all parties.", "What do the authors note?", ["The trend is uniform", "The trend is not uniform across parties", "Politicians have become less polarised"], 1, "«Not uniform across all parties».");
  R(r, "The bank's chief economist has warned that rising household debt could amplify any downturn in the economy. She recommends stricter lending criteria to curb excessive borrowing.", "What does the economist recommend?", ["Lower interest rates", "Stricter lending criteria", "More household borrowing"], 1, "«Stricter lending criteria».");
  R(r, "Some readers find experimental poetry difficult, arguing that its fragmented syntax obscures meaning. Its defenders, however, argue that the reader's effort is itself part of the poem's purpose.", "What do defenders of experimental poetry argue?", ["The poems have no meaning", "The reader's effort is part of the poem's purpose", "Syntax should be simpler"], 1, "«The reader's effort is itself part of the poem's purpose».");
  R(r, "The new vaccine has been approved for use in several countries, though its long-term efficacy remains uncertain. Health authorities emphasise the need for continued monitoring.", "What do health authorities emphasise?", ["The need for continued monitoring", "That the vaccine is ineffective", "That no monitoring is necessary"], 0, "«The need for continued monitoring».");
  R(r, "Urban beekeeping has become increasingly popular, but some ecologists caution that dense colonies may compete with native pollinators for limited floral resources.", "What do some ecologists caution?", ["That bees are endangered", "That dense colonies may compete with native pollinators", "That honey is unsafe"], 1, "«Compete with native pollinators for limited floral resources».");
  R(r, "The museum's new director has promised to rethink the permanent collection. She intends to give greater visibility to works by artists who were excluded from the canon for decades.", "Who does the director intend to give more visibility to?", ["Famous contemporary artists", "Artists excluded from the canon", "Foreign visitors"], 1, "«Artists who were excluded from the canon».");
  R(r, "Several municipalities have experimented with participatory budgeting, in which residents decide how a portion of public funds is spent. Evaluations suggest that the process increases trust in local government, though it rarely changes the overall budget.", "What do evaluations suggest about participatory budgeting?", ["It reduces trust", "It increases trust but rarely changes the overall budget", "It is always abandoned"], 1, "«Increases trust ... rarely changes the overall budget».");
  R(r, "The aviation sector is under pressure to reduce its emissions. Airlines argue that alternative fuels are not yet available at scale, while environmentalists demand faster investment in sustainable technologies.", "What do airlines argue?", ["That alternative fuels are available at scale", "That alternative fuels are not yet available at scale", "That they do not produce emissions"], 1, "«Not yet available at scale».");

  L(l, "Woman: I don't think the committee fully understood the implications of the change. Man: They understood the figures well enough. What they underestimated was the reaction of the staff.", "What did the committee underestimate?", ["The reaction of the staff", "The cost of the figures", "The number of committee members"], 0, "«What they underestimated was the reaction of the staff».");
  L(l, "Man: The festival has grown so quickly that the local infrastructure is struggling. Woman: Yes, the transport network simply wasn't designed for such numbers.", "What is struggling?", ["The local infrastructure", "The festival's budget", "The weather forecast"], 0, "«The local infrastructure is struggling».");
  L(l, "Girl: I'm not sure the new scheme will reach the people who need it most. Boy: That's a fair concern. Outreach has been limited so far.", "What concerns the girl?", ["That the scheme will not reach those who need it most", "That the scheme is too expensive", "That the scheme has been cancelled"], 0, "«Will reach the people who need it most».");
  L(l, "Woman: The surgeon explained the risks very clearly. Man: She did, though I'd have appreciated a written summary too.", "What would the man have liked?", ["A written summary", "A second opinion", "A shorter consultation"], 0, "«A written summary».");
  L(l, "Boy: Do you think the company will survive the downturn? Girl: It's touch and go. Its debts are considerable, though its brand is still strong.", "How does the girl describe the company's position?", ["It is touch and go", "It is secure", "It has already failed"], 0, "«It's touch and go».");
  L(l, "Man: The reform was supposed to simplify the tax code. Woman: It has done the opposite, adding layers of exemptions that few people understand.", "What has the reform done to the tax code?", ["Added layers of exemptions", "Simplified it", "Abolished it"], 0, "«Adding layers of exemptions».");
  L(l, "Girl: The lecturer's analogy was brilliant, though it may have oversimplified the theory. Boy: Perhaps, but it made the concept accessible to everyone in the room.", "What does the boy say about the analogy?", ["It made the concept accessible", "It was confusing", "It was too long"], 0, "«It made the concept accessible».");
  L(l, "Woman: Our suppliers have raised their prices again. Man: We'll have to decide whether to absorb the increase or pass it on to customers.", "What do they have to decide?", ["Whether to absorb or pass on the increase", "Whether to change suppliers", "Whether to close the shop"], 0, "«Absorb the increase or pass it on».");
  LT(l, "Man: The directors have approved the merger, but the shareholders are divided. Woman: That's typical. Their interests rarely align perfectly.", "How are the shareholders described?", ["Divided"], "«The shareholders are divided».");
  L(l, "Boy: The new cycle path has reduced accidents on the main road. Girl: It has, but cyclists still complain about the lack of connections to the suburbs.", "What do cyclists complain about?", ["The lack of connections to the suburbs", "The cost of bicycles", "The speed limits"], 0, "«The lack of connections to the suburbs».");
  L(l, "Woman: The investigators have ruled out foul play. Man: So the cause was purely accidental, then? Woman: That seems to be the working conclusion for now.", "What is the working conclusion?", ["The cause was accidental", "It was foul play", "The cause is unknown"], 0, "«Purely accidental ... the working conclusion».");
  L(l, "Girl: My grandmother has started attending an art class at the community centre. Boy: That's lovely. Has she shown you anything she's made?", "Where does the grandmother attend classes?", ["At the community centre", "At a university", "At home"], 0, "«The community centre».");
  L(l, "Man: I'm worried that the hospital will close the maternity unit. Woman: The consultation has been extended, so there's still time to voice our opinions.", "What is the woman encouraging?", ["To voice their opinions", "To leave the area", "To campaign for a new hospital"], 0, "«There's still time to voice our opinions».");
  L(l, "Boy: The expedition team has returned after six weeks in the mountains. Girl: Did they find what they were looking for? Boy: They discovered two new species of moss, which is a remarkable result.", "What did the team discover?", ["Two new species of moss", "A lost city", "A new mountain"], 0, "«Two new species of moss».");
  L(l, "Woman: The new contract includes a clause about data protection that many staff found reassuring. Man: Yes, although I'd like to see how it is enforced in practice.", "What does the man want to see?", ["How the clause is enforced in practice", "The contract's price", "The staff's comments"], 0, "«How it is enforced in practice».");
  L(l, "Girl: Do you think the government will meet its climate targets? Boy: On current trends, probably not, unless investment accelerates considerably.", "What does the boy say about the targets?", ["They will probably not be met unless investment accelerates", "They have already been met", "They are unrealistic in any case"], 0, "«Probably not, unless investment accelerates».");
  L(l, "Man: The publisher has offered a generous advance, but the royalty rate is low. Woman: That's often the trade-off. Make sure you negotiate the rights clauses carefully.", "What does the woman advise?", ["To negotiate the rights clauses carefully", "To accept the offer immediately", "To refuse the advance"], 0, "«Negotiate the rights clauses carefully».");
  L(l, "Woman: Have you seen the results of the survey on working hours? Man: I have. Most respondents felt overworked, though fewer than half said they had considered leaving.", "How many respondents had considered leaving?", ["Fewer than half", "Most of them", "All of them"], 0, "«Fewer than half».");
  L(l, "Boy: The river has risen dramatically since last night. Girl: The authorities have issued a warning, so residents in the low-lying streets should evacuate.", "Who should evacuate?", ["Residents in the low-lying streets", "Everyone in the city", "The river authorities"], 0, "«Residents in the low-lying streets».");

  T(t, "Rewrite: 'The company was forced to close its branches because of the losses.' → 'Losses ___ the company to close its branches.'", "Verbo «compel».", ["compelled", "forced", "obliged"], "«Compelled» o «forced».");
  T(t, "Rewrite: 'Although the evidence was weak, the jury convicted him.' → 'The jury convicted him ___ the weakness of the evidence.'", "Expresión «notwithstanding».", ["notwithstanding", "despite", "in spite of"], "«Notwithstanding» o «despite».");
  T(t, "Rewrite: 'It is probable that the talks will collapse.' → 'The talks ___ collapse.'", "Verbo modal de probabilidad.", ["are likely to", "will probably", "are liable to"], "«Are likely to» o «are liable to».");
  T(t, "Rewrite: 'The decision surprised most observers.' → 'Most observers were ___ by the decision.'", "Participio «taken aback».", ["taken aback", "caught off guard", "astonished", "surprised"], "«Taken aback» o «astonished».");
  T(t, "Rewrite: 'He never imagined that he would win.' → 'Never ___ that he would win.'", "Inversión con «never».", ["did he imagine"], "«Never did he imagine».");
  T(t, "Rewrite: 'They had to reduce the workforce because of the recession.' → 'The recession ___ them to reduce the workforce.'", "Verbo «necessitate» o «force».", ["necessitated", "forced", "compelled"], "«Necessitated» o «forced».");
  T(t, "Rewrite: 'The scheme is designed to benefit young people.' → 'The scheme ___ young people.'", "Verbo «aimed at».", ["aims to benefit", "is aimed at", "targets"], "«Aims to benefit» o «targets».");
  T(t, "Rewrite: 'His arguments were not convincing.' → 'His arguments ___ convince anyone.'", "Expresión «fell flat».", ["fell flat", "failed to convince", "did not convince"], "«Fell flat» o «failed to convince».");
  T(t, "Rewrite: 'The workers protested against the new contracts.' → 'The workers ___ the new contracts.'", "Verbo «object to».", ["objected to", "protested against", "took issue with"], "«Object to» = oponerse a.");
  T(t, "Rewrite: 'We expect the results to be published next month.' → 'The results are ___ to be published next month.'", "Expresión «expected».", ["expected"], "«Are expected to be published».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C1 · Gramática", r = "C1 · Lectura", l = "C1 · Escucha", t = "C1 · Reformulación";
  T(g, "The director's resignation ___ the company into a period of uncertainty.", "Escribe la palabra que falta.", ["plunged"], "Pasado simple de «plunge»: plunged.");
  T(g, "I would not have ___ such a decision without consulting the team.", "Escribe la palabra que falta.", ["taken"], "Condicional mixto con participio: taken.");
  G(g, "Each of the proposals ___ carefully before the final vote.", ["was examined", "were examined", "examine"], 0, "Sujeto «each» con verbo singular.");
  G(g, "The old theatre ___ demolished in the 1960s despite public protests.", ["was", "is", "has"], 0, "Pasiva en pasado simple.");
  T(g, "Only by working together ___ the crisis be resolved.", "Escribe la palabra que falta.", ["can"], "Inversión con «only by» + «can».");
  G(g, "They ___ for the new contract since the spring, without any success.", ["have been negotiating", "negotiate", "have negotiated"], 0, "Present perfect continuo con «since».");
  G(g, "The minister's remarks, ___ were widely reported, caused considerable offence.", ["which", "who", "that"], 0, "Relativa no definitiva con «which».");
  T(g, "I'd rather the matter ___ dealt with internally, if possible.", "Escribe la palabra que falta.", ["were"], "«I'd rather» + pasado de subjuntivo: were dealt.");
  T(g, "Such was the ___ of the response that the website crashed.", "Escribe la palabra que falta.", ["volume"], "Sustantivo «volume» en estructura «such was».");
  G(g, "The committee has ___ the decision to a later date.", ["deferred", "deferring", "defer"], 0, "Present perfect con «deferred».");
  T(g, "Had the prices ___ higher, the demand would have fallen.", "Escribe la palabra que falta.", ["been"], "Condicional mixto con inversión: had been.");
  G(g, "Hardly ___ the first chapter when she decided to abandon the book.", ["had she read", "she had read", "did she read"], 0, "Inversión con «hardly ... when».");
  T(g, "The commission ___ its report last week, to general surprise.", "Escribe la palabra que falta.", ["published"], "Pasado simple: published.");
  G(g, "She is anything ___ naive, despite her youth.", ["but", "except", "than"], 0, "Expresión «anything but».");
  T(g, "The new evidence has ___ the case against the defendant considerably.", "Escribe la palabra que falta.", ["strengthened"], "Present perfect con «strengthened».");
  G(g, "It is ___ that the government will change its policy on energy.", ["doubtful", "doubting", "doubt"], 0, "Adjetivo «doubtful» con «It is ... that».");
  T(g, "Its ___ to the environment has been questioned by several groups.", "Escribe la palabra que falta.", ["impact"], "Sustantivo «impact» con posesivo.");
  T(g, "The students ___ the lecture notes to review for the exam.", "Escribe la palabra que falta.", ["used"], "Pasado simple con sentido de finalidad.");
  G(g, "She has ___ to have been involved in the affair from the beginning.", ["come", "came", "coming"], 0, "Present perfect con «come to have been».");
  T(g, "So ___ was the pressure that several staff members resigned.", "Escribe la palabra que falta.", ["great"], "Inversión con «so great».");
  T(g, "The matter is ___ under review by the regulator.", "Escribe la palabra que falta.", ["currently"], "Adverbio «currently» con participio.");
  G(g, "It came as no surprise that the talks ___ down.", ["broke", "broken", "breaking"], 0, "Pasado simple de «break down»: broke.");
  T(g, "The minister ___ the claims as baseless and unfounded.", "Escribe la palabra que falta.", ["dismissed"], "Pasado simple: dismissed.");
  G(g, "The report reached conclusions that were ___ with the earlier findings.", ["inconsistent", "inconsistently", "inconsistency"], 0, "Adjetivo «inconsistent with».");
  T(g, "I cannot ___ how they managed to finish the project so quickly.", "Escribe la palabra que falta.", ["fathom"], "Verbo «fathom» (comprender).");
  T(g, "He was ___ to admit that he had made a mistake.", "Escribe la palabra que falta.", ["reluctant"], "Adjetivo «reluctant to».");
  G(g, "The new law will ___ into effect once it is published in the gazette.", ["come", "become", "go"], 0, "Expresión «come into effect».");
  T(g, "The discovery has ___ a new debate about the origins of the species.", "Escribe la palabra que falta.", ["sparked"], "Present perfect con «sparked».");
  T(g, "No one ___ that the proposal would be accepted so quickly.", "Escribe la palabra que falta.", ["anticipated"], "Pasado simple: anticipated.");
  G(g, "It is ___ that every citizen has access to the courts.", ["essential", "essentially", "essence"], 0, "Adjetivo «essential» con «It is ... that».");

  R(r, "Historians once portrayed the Renaissance as a sudden awakening after the 'dark ages'. Current scholarship emphasises continuity, showing how medieval ideas and institutions shaped the intellectual movements of the period.", "What does current scholarship emphasise?", ["A sudden awakening", "Continuity with medieval ideas and institutions", "The decline of learning"], 1, "«Continuity with medieval ideas».");
  RT(r, "The island's economy was historically dependent on a single crop, which left it vulnerable to price shocks. Diversification into tourism and services has reduced that vulnerability, although the transition has been uneven.", "How has the transition been described?", ["Uneven"], "«The transition has been uneven».");
  R(r, "The tribunal's decision has been appealed on the grounds that the evidence was obtained unlawfully. The appellants argue that the procedure violated their right to a fair hearing.", "On what grounds has the decision been appealed?", ["The sentence was too short", "The evidence was obtained unlawfully", "The judges were absent"], 1, "«Evidence obtained unlawfully».");
  R(r, "Many developers now incorporate green roofs and rainwater harvesting into their designs. While these features reduce runoff, their maintenance costs can deter smaller builders from adopting them.", "What can deter smaller builders?", ["Lack of demand", "Maintenance costs", "Planning restrictions"], 1, "«Maintenance costs can deter smaller builders».");
  R(r, "The philosopher argued that moral judgements cannot be reduced to measurable outcomes. In her view, the meaning of an action depends on the intentions and relationships that surround it.", "According to the philosopher, what does the meaning of an action depend on?", ["Only on measurable outcomes", "On intentions and relationships", "On the law alone"], 1, "«Intentions and relationships».");
  R(r, "Recent surveys indicate that young adults are postponing homeownership, citing high property prices and insecure contracts. Some economists predict that this delay will affect birth rates in the coming decade.", "What do some economists predict?", ["Higher property prices", "A delay in the coming decade's birth rates", "An end to renting"], 1, "«Affect birth rates in the coming decade».");
  R(r, "The botanical garden has introduced a seed bank to preserve endangered native species. Curators stress that the collection will be useful only if the seeds are regularly tested for viability.", "What do curators stress?", ["The seeds must be sold", "The seeds must be regularly tested for viability", "The seeds should be planted outdoors"], 1, "«Regularly tested for viability».");
  R(r, "The conference organisers initially welcomed the proposal to hold sessions online. Later, however, they concluded that the networking opportunities of an in-person event could not be replicated.", "What did the organisers later conclude?", ["Online sessions are better", "In-person networking cannot be replicated online", "The conference should be cancelled"], 1, "«Networking opportunities ... could not be replicated».");
  R(r, "A growing body of research suggests that exposure to nature improves concentration. Its authors caution, however, that the findings are based largely on short-term observations and small samples.", "What do the authors caution about?", ["The cost of research", "The short-term observations and small samples", "The climate"], 1, "«Short-term observations and small samples».");
  R(r, "The orchestra has commissioned composers from several continents to write for its next season. The programme notes emphasise that the works reflect diverse musical traditions rather than a single dominant style.", "What do the programme notes emphasise?", ["A single dominant style", "Diverse musical traditions", "A return to classical works"], 1, "«Diverse musical traditions».");
  R(r, "Regulators have fined the online retailer for misleading consumers about delivery times. The company has said that the errors were unintentional and has pledged to revise its advertising practices.", "What has the company pledged to do?", ["Stop trading", "Revise its advertising practices", "Appeal to the public"], 1, "«Revise its advertising practices».");
  R(r, "The coastal wetlands act as a natural buffer against storm surges. Planners increasingly argue that restoring them is more cost-effective than building concrete barriers.", "What do planners argue about restoring wetlands?", ["It is less cost-effective", "It is more cost-effective than concrete barriers", "It is impossible"], 1, "«More cost-effective than building concrete barriers».");
  R(r, "The report on public health concludes that the reduction in smoking rates has been partly offset by rising obesity. The authors argue that prevention strategies must address several risk factors at once.", "What do the authors argue?", ["Only smoking should be targeted", "Several risk factors should be addressed at once", "Obesity is not a concern"], 1, "«Address several risk factors at once».");
  R(r, "Many translators feel that their work is undervalued, particularly when automated tools are used to produce first drafts. Some agencies, however, argue that the tools have made translation faster and more affordable.", "What do some agencies argue?", ["That translation is slower", "That tools have made translation faster and more affordable", "That translators are unnecessary"], 1, "«Faster and more affordable».");
  R(r, "The city's decision to convert a disused railway line into a cycle route has been widely praised. Business owners along the route, however, reported a temporary fall in trade during the construction period.", "What did business owners report?", ["A rise in trade", "A temporary fall in trade during construction", "No change at all"], 1, "«A temporary fall in trade during the construction period».");

  L(l, "Woman: The auditors have raised concerns about the way the reserves were valued. Man: They have, but the explanation is largely technical and shouldn't alarm shareholders.", "What have the auditors raised concerns about?", ["How the reserves were valued", "The salaries of directors", "The company's logo"], 0, "«The way the reserves were valued».");
  L(l, "Girl: The new library has been designed to be a community space rather than just a place for books. Boy: That's the right approach. Many people now use libraries for meetings and workshops.", "What is the new library designed to be?", ["A community space", "A bookshop", "A museum"], 0, "«A community space rather than just a place for books».");
  L(l, "Man: The team was hoping to publish the findings this spring. Woman: That's unlikely now. The peer review will take at least another six months.", "When are the findings likely to be published?", ["In six months or more", "This spring", "Next week"], 0, "«At least another six months».");
  L(l, "Boy: Our flight has been rebooked for the morning. Girl: That's not ideal, but at least the airline has offered a hotel for the night.", "What has the airline offered?", ["A hotel for the night", "A refund", "A free meal voucher"], 0, "«A hotel for the night».");
  L(l, "Woman: The council wants to close the swimming pool for renovation. Man: Residents will be furious. It's the only pool within several miles.", "Why will residents be furious?", ["It is the only pool within several miles", "The pool is free", "The pool is new"], 0, "«The only pool within several miles».");
  L(l, "Man: I've been reading about the impact of noise on sleep. Woman: It's more significant than most people realise, particularly for older adults.", "Whom does the woman say noise affects most?", ["Older adults", "Children", "Teenagers"], 0, "«Particularly for older adults».");
  L(l, "Girl: The publisher has decided to delay the novel until next year. Boy: That's a shame, although it may give the author time to revise the final chapters.", "Why might the novel be delayed?", ["To allow revision of the final chapters", "Because of a lack of paper", "Because the author has left"], 0, "«Give the author time to revise the final chapters».");
  L(l, "Woman: The new bridge has transformed travel between the two districts. Man: It has, though the traffic on the old road has increased as a result.", "What has happened to traffic on the old road?", ["It has increased", "It has decreased", "It has stopped"], 0, "«The traffic on the old road has increased».");
  L(l, "Man: I'm inclined to accept the offer, despite the relocation. Woman: It's a big step, but the salary and prospects are considerably better.", "What does the man intend to do?", ["Accept the offer despite the relocation", "Refuse the offer", "Negotiate a shorter contract"], 0, "«Inclined to accept the offer».");
  LT(l, "Boy: The committee has rejected the application on procedural grounds. Girl: That's disappointing, but they've invited us to resubmit with the missing documents.", "On what grounds was the application rejected?", ["Procedural grounds"], "«On procedural grounds».");
  L(l, "Woman: The vaccination campaign has reached nearly every district. Man: That's impressive, although a few rural areas still have low coverage.", "Which areas still have low coverage?", ["Some rural areas", "The capital", "Coastal towns"], 0, "«A few rural areas still have low coverage».");
  L(l, "Girl: The manager has asked us to prepare a presentation on the new strategy. Boy: Do you know how long it should be? Girl: Fifteen minutes, with time for questions.", "How long should the presentation be?", ["Fifteen minutes", "Thirty minutes", "Five minutes"], 0, "«Fifteen minutes».");
  L(l, "Man: The ferry service has been suspended until the weather improves. Woman: Then we'll have to take the longer route by road.", "How will they travel?", ["By the longer road route", "By plane", "By train"], 0, "«Take the longer route by road».");
  L(l, "Woman: The rescue team reached the village just before nightfall. Man: They were lucky the road was still passable.", "When did the rescue team reach the village?", ["Just before nightfall", "At dawn", "At midday"], 0, "«Just before nightfall».");
  L(l, "Boy: The architect has presented three designs for the square. Girl: I prefer the second one, because it keeps the old trees.", "Which design does the girl prefer?", ["The second one", "The first one", "The third one"], 0, "«I prefer the second one».");
  L(l, "Man: The conference speaker argued that cities must invest in green infrastructure. Woman: I agree, though the funding question remains unresolved.", "What remains unresolved?", ["The funding question", "The speaker's identity", "The venue"], 0, "«The funding question remains unresolved».");
  L(l, "Girl: The shop has closed after forty years. Boy: It's a loss for the street. The owner was always willing to give advice to customers.", "What was the owner always willing to do?", ["Give advice to customers", "Lower prices", "Deliver goods"], 0, "«Willing to give advice to customers».");
  L(l, "Woman: The data suggest that sales rose sharply after the campaign. Man: They do, though it's hard to separate the effect of the campaign from the seasonal trend.", "What is hard to separate?", ["The campaign's effect from the seasonal trend", "The sales figures", "The customers' ages"], 0, "«Hard to separate the effect of the campaign from the seasonal trend».");
  L(l, "Boy: The university has changed its admission policy to consider work experience. Girl: That's a welcome change, since many talented students lack traditional qualifications.", "What has the university changed?", ["Its admission policy", "Its tuition fees", "Its campus"], 0, "«Changed its admission policy to consider work experience».");
  L(l, "Man: The project manager resigned without explanation. Woman: I heard she was under pressure from the board to deliver results faster.", "Why might the manager have resigned?", ["Pressure from the board to deliver results faster", "A better job offer abroad", "Illness"], 0, "«Under pressure from the board to deliver results faster».");

  T(t, "Rewrite: 'The team was surprised by how quickly the results came in.' → 'The team was ___ by the speed of the results.'", "Verbo «astonished» o «taken aback».", ["astonished", "taken aback", "amazed"], "«Astonished» o «amazed».");
  T(t, "Rewrite: 'Their decision was based on a misreading of the report.' → 'Their decision ___ a misreading of the report.'", "Verbo «stem from».", ["stemmed from", "rested on", "was founded on"], "«Stemmed from».");
  T(t, "Rewrite: 'It seems likely that the strike will end soon.' → 'The strike ___ to end soon.'", "Verbo «look set».", ["looks set", "is set", "is likely"], "«Looks set» o «is likely».");
  T(t, "Rewrite: 'The mayor did not know about the plan until the last minute.' → 'It was ___ the last minute that the mayor learned about the plan.'", "Expresión «not until».", ["not until", "only at"], "«Not until» o «only at».");
  T(t, "Rewrite: 'The company is aiming to double its sales within five years.' → 'The company ___ to double its sales within five years.'", "Verbo «aspire».", ["aspires", "aims", "intends", "seeks"], "«Aspires» o «aims».");
  T(t, "Rewrite: 'He spoke for a long time without saying anything useful.' → 'He ___ at length without saying anything useful.'", "Verbo «waffle».", ["waffled", "rambled", "droned on"], "«Waffled» o «rambled».");
  T(t, "Rewrite: 'The aim of the reform is to reduce bureaucracy.' → 'The reform ___ to reduce bureaucracy.'", "Verbo «seek».", ["seeks", "aims", "is intended"], "«Seeks» o «aims».");
  T(t, "Rewrite: 'Their claims are unsupported by any evidence.' → 'Their claims ___ any evidence.'", "Verbo «lack».", ["lack", "are devoid of", "are without"], "«Lack» o «are devoid of».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C1 · Gramática", r = "C1 · Lectura", l = "C1 · Escucha", t = "C1 · Reformulación";
  T(g, "The stock ___ sharply after the announcement, wiping out months of gains.", "Escribe la palabra que falta.", ["plunged"], "Pasado simple: plunged.");
  G(g, "Not even the most ___ analysts predicted such a dramatic shift.", ["optimistic", "optimism", "optimistically"], 0, "Adjetivo «optimistic» con sustantivo «analysts».");
  T(g, "She could have pursued a career in law, ___ she chose medicine instead.", "Escribe la palabra que falta.", ["but"], "Conjunción adversativa «but» tras condicional de posibilidad pasada.");
  T(g, "The proposal, ___ was discussed at length, was finally rejected.", "Escribe la palabra que falta.", ["which"], "Relativa no definitiva con «which».");
  G(g, "I'd ___ not comment on the allegations until the investigation concludes.", ["prefer to", "prefer", "rather"], 0, "«I'd prefer to» + infinitivo.");
  G(g, "The new rules have ___ a significant impact on small businesses.", ["had", "have", "having"], 0, "Presente perfecto con «have had».");
  T(g, "Were the committee ___ to reconsider its position, the outcome might change.", "Escribe la palabra que falta.", ["willing"], "Condicional de segundo tipo con «willing».");
  G(g, "The defendants ___ guilty of all charges by the jury last Friday.", ["were found", "found", "have found"], 0, "Pasiva en pasado simple: were found.");
  G(g, "The results of the study ___ to be more nuanced than the headlines suggested.", ["turn out", "turned out to", "are turning"], 0, "Expresión «turn out to be».");
  T(g, "Despite ___ exhausted, she continued to care for the patients through the night.", "Escribe la palabra que falta.", ["being"], "«Despite» + gerundio.");
  G(g, "Little ___ the scale of the problem until the reports arrived.", ["did the board appreciate", "the board appreciated", "appreciated the board"], 0, "Inversión con «little» y pasado.");
  G(g, "The minister's speech was ___ to reassure investors, though few were convinced.", ["intended", "intending", "intent"], 0, "Participio «intended to».");
  T(g, "The bridge ___ closed for several hours after the accident.", "Escribe la palabra que falta.", ["was"], "Pasiva simple en pasado.");
  G(g, "He is generally ___ as a man of integrity and principle.", ["regarded", "regarding", "regard"], 0, "Pasiva «regarded as».");
  T(g, "The software ___ processed nearly a million transactions before the glitch was detected.", "Escribe la palabra que falta.", ["had"], "Pasado perfecto por anterioridad a «was detected».");
  T(g, "It is ___ that the new policy will reduce waiting times.", "Escribe la palabra que falta.", ["hoped"], "Pasiva impersonal «It is hoped that».");
  G(g, "The rules ___ by all members of staff, regardless of seniority.", ["apply", "applies", "applying"], 0, "Sujeto plural «rules» con verbo en plural.");
  T(g, "Despite the setbacks, the team has ___ its commitment to the project.", "Escribe la palabra que falta.", ["maintained"], "Present perfect con «maintained».");
  T(g, "The author ___ her earlier theory in a series of articles.", "Escribe la palabra que falta.", ["revised"], "Pasado simple: revised.");
  G(g, "It was ___ that the witness had lied under oath.", ["established", "establish", "establishing"], 0, "Pasiva impersonal «It was established that».");
  T(g, "The festival has ___ its reputation as one of the country's most innovative events.", "Escribe la palabra que falta.", ["cemented"], "Present perfect con «cemented».");
  G(g, "He ___ his doubts in private but publicly supported the decision.", ["voiced", "voicing", "voice"], 0, "Pasado simple: voiced.");
  T(g, "The mayor was ___ for failing to act on the warnings.", "Escribe la palabra que falta.", ["criticised"], "Pasiva con «criticised for».");
  G(g, "Only ___ the evidence could the court reach a fair verdict.", ["after reviewing", "reviewing after", "to review after"], 0, "Expresión «only after» + gerundio.");
  G(g, "The new head of department ___ a radical change in strategy.", ["has introduced", "introduced", "introducing"], 0, "Present perfect con efecto actual.");
  T(g, "The vote was ___ close that the result was contested.", "Escribe la palabra que falta.", ["so"], "Estructura «so close that».");
  G(g, "Teachers ___ the importance of listening to students' concerns.", ["emphasised", "emphasising", "emphasise"], 0, "Pasado simple: emphasised.");
  G(g, "Successive governments ___ to address the housing shortage.", ["have failed", "failed", "have failing"], 0, "Present perfect con sujeto plural.");
  T(g, "She is quite ___ to dismiss criticism, which can be a weakness.", "Escribe la palabra que falta.", ["inclined"], "Adjetivo «inclined to».");
  T(g, "The agreement was ___ after weeks of tense negotiation.", "Escribe la palabra que falta.", ["concluded"], "Pasiva: concluded.");

  R(r, "The dispute between the two companies has centred on the ownership of a patent. Legal experts say the outcome may set an important precedent for how research collaborations are structured in the future.", "What may the outcome set?", ["A precedent for research collaborations", "A new tax", "A ban on patents"], 0, "«An important precedent for research collaborations».");
  R(r, "Recent reforms have shifted responsibility for social care from central government to local authorities. Councils argue that they lack the funding to meet the increased demand that follows.", "What do councils argue they lack?", ["Staff", "Funding to meet increased demand", "Buildings"], 1, "«Lack the funding to meet the increased demand».");
  R(r, "The ancient manuscript was discovered in a monastery library, where it had been catalogued incorrectly for two centuries. Its discovery has forced scholars to reconsider the chronology of early medieval texts.", "What has the discovery forced scholars to reconsider?", ["The manuscript's cover", "The chronology of early medieval texts", "The library's location"], 1, "«The chronology of early medieval texts».");
  RT(r, "Advocates of remote learning highlight its flexibility for students who have caring responsibilities. Critics respond that it often exacerbates inequality, since reliable internet access is far from universal.", "What do critics say remote learning exacerbates?", ["Inequality"], "«Often exacerbates inequality».");
  R(r, "The composer's late symphony was initially met with bewilderment. Over time, however, it came to be seen as an anticipation of later developments in twentieth-century music.", "How was the symphony later seen?", ["As a failure", "As an anticipation of later developments", "As a copy of earlier works"], 1, "«An anticipation of later developments».");
  R(r, "A sharp rise in energy prices has prompted many households to reconsider their heating habits. Energy suppliers have responded by offering tailored advice, although consumer groups question how far this will protect the most vulnerable.", "What do consumer groups question?", ["How far the advice will protect the most vulnerable", "Whether energy prices will rise", "Whether households need heating"], 0, "«How far this will protect the most vulnerable».");
  R(r, "The company's founder has stepped back from daily operations, handing control to a board of independent directors. Investors have welcomed the move as a step towards better governance.", "How have investors reacted?", ["With hostility", "By welcoming the move as better governance", "With indifference"], 1, "«Welcomed the move as a step towards better governance».");
  R(r, "The geologists' survey indicates that the region's groundwater is being depleted faster than it is replenished. They recommend limiting extraction and investing in water recycling.", "What do the geologists recommend?", ["Increasing extraction", "Limiting extraction and investing in recycling", "Ignoring the depletion"], 1, "«Limiting extraction and investing in water recycling».");
  R(r, "The novelist's decision to write in a second language has drawn both praise and suspicion. Some reviewers see it as a bold experiment, while others question whether the prose can match the richness of her earlier work.", "What do some reviewers question?", ["Whether the novel is short", "Whether the prose matches her earlier work", "Whether she should publish"], 1, "«Whether the prose can match the richness of her earlier work».");
  R(r, "Urban farms have sprung up on rooftops and vacant lots, providing fresh produce to nearby residents. Their long-term viability, however, depends on access to affordable land and steady volunteer support.", "What does the long-term viability of urban farms depend on?", ["Government bans", "Affordable land and steady volunteer support", "Imported seeds"], 1, "«Affordable land and steady volunteer support».");
  R(r, "Several studies have linked social media use to changes in adolescent sleep patterns. However, the causal direction remains unclear, since teenagers who sleep poorly may also be more likely to use their phones late at night.", "Why is the causal direction unclear?", ["Because teenagers never sleep", "Because poor sleepers may also use phones more late at night", "Because social media is banned"], 1, "«Poor sleepers may also be more likely to use their phones late at night».");
  R(r, "The regional airport has proposed a new runway to accommodate growing traffic. Residents' groups have objected, arguing that the noise and emissions would seriously affect nearby villages.", "What have residents' groups argued?", ["That the runway would reduce noise", "That noise and emissions would seriously affect nearby villages", "That traffic is declining"], 1, "«Noise and emissions would seriously affect nearby villages».");
  R(r, "The notion of 'cultural capital' has been applied to explain differences in educational outcomes. Critics argue that the concept risks treating cultural habits as individual deficits rather than as products of structural inequality.", "What do critics say the concept risks doing?", ["Explaining outcomes perfectly", "Treating cultural habits as individual deficits", "Eliminating inequality"], 1, "«Treating cultural habits as individual deficits».");
  R(r, "Tourism authorities have launched a campaign to spread visitors more evenly across the year. They hope that quieter months will ease pressure on local services and reduce the strain on fragile sites.", "What do the authorities hope quieter months will do?", ["Increase prices", "Ease pressure on local services and fragile sites", "Attract fewer tourists"], 1, "«Ease pressure on local services and reduce the strain on fragile sites».");
  R(r, "The national orchestra has announced a reduced season due to funding cuts. Musicians' representatives warn that the decision may force several players to leave the profession altogether.", "What do musicians' representatives warn?", ["That the orchestra will expand", "That several players may leave the profession", "That tickets will be free"], 1, "«Several players may leave the profession altogether».");
  R(r, "Child psychologists have long emphasised the role of play in emotional development. Recent work suggests that unstructured play is particularly valuable for building resilience and social skills.", "What does recent work suggest unstructured play is valuable for?", ["Memorising facts", "Building resilience and social skills", "Improving physical strength"], 1, "«Building resilience and social skills».");

  L(l, "Man: The inspectors found several breaches of the safety regulations. Woman: That's serious, but the company has already started correcting them.", "What has the company started doing?", ["Correcting the breaches", "Closing the factory", "Appealing the decision"], 0, "«Already started correcting them».");
  LT(l, "Woman: The orchestra's tour has been cancelled because of visa problems. Man: That's a disappointment for the audiences who had already bought tickets.", "Why was the tour cancelled?", ["Visa problems"], "«Because of visa problems».");
  L(l, "Boy: The results of the election are still being counted. Girl: Yes, and the margin in several constituencies is extremely narrow.", "How narrow is the margin?", ["Extremely narrow", "Very wide", "Not mentioned"], 0, "«Extremely narrow».");
  L(l, "Man: The architect wants to preserve the original façade. Woman: The developers say it would make the project unviable, so the negotiations are ongoing.", "What is the architect's wish?", ["To preserve the original façade", "To demolish the building", "To sell the site"], 0, "«To preserve the original façade».");
  L(l, "Girl: The lecture series has been so popular that the organisers are adding extra sessions. Boy: That's a sign of real demand for the topic.", "What are the organisers doing?", ["Adding extra sessions", "Cancelling the series", "Moving the venue"], 0, "«Adding extra sessions».");
  L(l, "Woman: The staff have voted to accept the new working pattern. Man: It was a close call, but it means we can finally move forward.", "How did the staff vote?", ["They accepted the new pattern", "They rejected it", "They abstained"], 0, "«Voted to accept the new working pattern».");
  L(l, "Man: The company has been fined for failing to protect customer data. Woman: That's rightly serious, although the amount is small compared with its profits.", "How does the woman describe the fine?", ["Small compared with the company's profits", "Enormous", "Unfair"], 0, "«The amount is small compared with its profits».");
  L(l, "Boy: Did you read about the new study on coffee and memory? Girl: Yes, but the sample was tiny, so I'd be cautious about the conclusions.", "What does the girl think about the study?", ["Its conclusions need caution", "It is definitive", "It is fraudulent"], 0, "«I'd be cautious about the conclusions».");
  L(l, "Woman: The ministry has promised a review of the funding formula. Man: I'll believe it when I see it. They've promised reviews before.", "What does the man think of the promise?", ["He is sceptical", "He is delighted", "He is indifferent"], 0, "«I'll believe it when I see it».");
  L(l, "Girl: The team's morale has improved since the new manager arrived. Boy: It's partly the manager, but also the fact that the workload is finally manageable.", "What else has improved morale?", ["A manageable workload", "A bigger office", "Higher salaries"], 0, "«The workload is finally manageable».");
  LT(l, "Man: The town's historic market is under threat from a supermarket development. Woman: Local traders have launched a petition, which has already gathered thousands of signatures.", "What have local traders launched?", ["A petition"], "«Launched a petition».");
  L(l, "Woman: The surgery has reduced its waiting list by a third this year. Man: That's welcome news, though patients still report difficulty getting appointments.", "By how much has the waiting list been reduced?", ["A third", "A half", "A quarter"], 0, "«Reduced its waiting list by a third».");
  L(l, "Boy: The new law requires all restaurants to display calorie information. Girl: It's a useful measure, though some owners say the printing costs are considerable.", "What do some owners complain about?", ["The printing costs", "The new tax", "The opening hours"], 0, "«The printing costs are considerable».");
  LT(l, "Man: The team has finally agreed on a title for the report. Woman: Thank goodness. We've been arguing about it for weeks.", "How long had they been arguing?", ["For weeks"], "«For weeks».");
  L(l, "Girl: The new training scheme has attracted far more applicants than the organisers expected. Boy: That suggests the demand for skills is genuinely high.", "What did the organisers expect?", ["Fewer applicants than they received", "More applicants than they received", "No applicants"], 0, "Esperaban menos solicitudes que las recibidas.");
  L(l, "Woman: The bank has agreed to waive the fees for the first year. Man: That's generous, but the interest rate is still rather high.", "What has the bank agreed to waive?", ["The fees for the first year", "The interest rate", "The contract"], 0, "«Waive the fees for the first year».");
  L(l, "Boy: The reservoir is nearly full after the heavy rains. Girl: That's good for the summer, although the authorities are monitoring the dam closely.", "What are the authorities doing?", ["Monitoring the dam closely", "Draining the reservoir", "Closing the road"], 0, "«Monitoring the dam closely».");
  L(l, "Man: The school has introduced a policy on mobile phones. Woman: I think it's overdue. Many pupils were distracted during lessons.", "Why does the woman support the policy?", ["Pupils were distracted during lessons", "Phones are expensive", "The school lacks internet"], 0, "«Many pupils were distracted during lessons».");
  L(l, "Girl: The museum's new exhibition explores the history of textiles. Boy: I'd love to see it, especially the section on dyes from the eighteenth century.", "Which section does the boy want to see?", ["Dyes from the eighteenth century", "Modern fashion", "Weaving tools"], 0, "«Dyes from the eighteenth century».");
  L(l, "Woman: The committee has invited public comments on the draft plan. Man: Good. The consultation is open until the end of the month.", "Until when is the consultation open?", ["The end of the month", "The end of the year", "Next week"], 0, "«Until the end of the month».");
  L(l, "Man: The charity has lost its main sponsor this year. Woman: That's a serious blow, but it has already begun looking for new partners.", "What has the charity begun to do?", ["Look for new partners", "Close its doors", "Sell its building"], 0, "«Has already begun looking for new partners».");

  T(t, "Rewrite: 'It is unclear why the system failed.' → 'The reason ___ the system failed remains unclear.'", "Relativa con «why».", ["why", "for which"], "«Why».");
  T(t, "Rewrite: 'The new rules will apply from next January.' → 'The new rules will ___ next January.'", "Verbo «take effect».", ["take effect", "come into force", "become effective"], "«Take effect».");
  T(t, "Rewrite: 'The results were a considerable disappointment.' → 'The results were ___ disappointing.'", "Adverbio de intensidad.", ["deeply", "considerably", "very", "extremely"], "Adverbio de grado.");
  T(t, "Rewrite: 'She was too ill to attend the ceremony.' → 'She was ___ ill to attend the ceremony.'", "Estructura «too ... to».", ["too"], "«Too ill to».");
  T(t, "Rewrite: 'He admitted that he had lied.' → 'He ___ having lied.'", "Verbo «confess».", ["confessed to", "admitted", "owned up to"], "«Confessed to having lied».");
  T(t, "Rewrite: 'The government plans to reduce spending next year.' → 'The government ___ cuts in spending next year.'", "Verbo «contemplate» o «envisage».", ["envisages", "plans", "is planning to make"], "«Envisages».");
  T(t, "Rewrite: 'Few people understood the complexity of the problem.' → 'Few people ___ the complexity of the problem.'", "Verbo «grasp».", ["grasped", "appreciated", "fully understood"], "«Grasp» o «appreciate».");
  T(t, "Rewrite: 'In the event that the train is cancelled, we will take a taxi.' → '___ the train is cancelled, we will take a taxi.'", "Conjunción «should».", ["should", "Should", "In case"], "«Should».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C1";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C1 · Gramática", r = "C1 · Lectura", l = "C1 · Escucha", t = "C1 · Reformulación";
  G(g, "The council has ___ its plans for the new car park after public objections.", ["shelved", "shelving", "shelve"], 0, "Present perfect con «shelved» (aparcar un plan).");
  G(g, "Had the warnings been taken more seriously, the damage ___ far less severe.", ["would have been", "would be", "had been"], 0, "Condicional mixto con inversión implícita de «had».");
  R(r, "The early settlers relied on a network of trails that connected distant valleys. Archaeologists now believe these routes were as important for cultural exchange as for trade in goods.", "What do archaeologists believe the routes were important for?", ["Only trade in goods", "Cultural exchange as well as trade in goods", "Military defence alone"], 1, "«As important for cultural exchange as for trade in goods».");
  R(r, "The hospital trust has announced that surgeries will be rescheduled because of a shortage of anaesthetists. Patients have been advised to contact their GP if their condition deteriorates in the meantime.", "What have patients been advised to do if their condition deteriorates?", ["Wait for the surgery", "Contact their GP", "Travel abroad"], 1, "«Contact their GP».");
  L(l, "Woman: The directors have decided to postpone the expansion. Man: I think that's wise. The market is too unpredictable at the moment.", "Why has the expansion been postponed?", ["The market is too unpredictable", "The building is unsafe", "The staff have resigned"], 0, "«The market is too unpredictable».");
  T(t, "Rewrite: 'The proposal was approved without any objections.' → 'The proposal was approved ___ objection.'", "Preposición «without».", ["without", "with no"], "«Without objection».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C2 · Gramática", r = "C2 · Lectura", l = "C2 · Escucha", t = "C2 · Reformulación";
  G(g, "Not for nothing ___ the most respected historians of the period.", ["is she regarded as", "she is regarded as", "regarded she is as"], 0, "Inversión con «not for nothing» (no por nada).");
  T(g, "The findings, ___ their methodological flaws, have been widely cited.", "Escribe la palabra que falta.", ["despite"], "Preposición «despite» + sustantivo.");
  G(g, "Little ___ that the treaty would collapse within a decade.", ["did the signatories foresee", "the signatories foresaw", "foresaw the signatories"], 0, "Inversión con «little» y pasado.");
  G(g, "She has ___ in the field of computational linguistics for decades.", ["specialised", "specialising", "specialise"], 0, "Present perfect con «specialised».");
  T(g, "The policy would have been ___ more effective had it been implemented earlier.", "Escribe la palabra que falta.", ["considerably"], "Adverbio «considerably» antes de comparativo.");
  T(g, "It is ___ to me how the committee arrived at such a conclusion.", "Escribe la palabra que falta.", ["baffling"], "Adjetivo «baffling» con «It is ... to me».");
  G(g, "The judge's ruling ___ the government's interpretation of the statute.", ["undermined", "undermining", "undermine"], 0, "Pasado simple: undermined.");
  T(g, "Were it not ___ the intervention of the mediator, the talks would have collapsed.", "Escribe la palabra que falta.", ["for"], "Condicional mixto: were it not for.");
  T(g, "The poem is ___ in ambiguity, which invites multiple readings.", "Escribe la palabra que falta.", ["steeped"], "Participio «steeped in».");
  G(g, "The minister has ___ to the view that reform is inevitable.", ["subscribed", "subscribing", "subscribe"], 0, "Expresión «subscribe to the view».");
  T(g, "Had she ___ the warning, she would have avoided the trap.", "Escribe la palabra que falta.", ["heeded"], "Condicional mixto con participio: heeded.");
  G(g, "The institute's research has ___ a marked shift in public attitudes.", ["illuminated", "illuminating", "illuminate"], 0, "Present perfect con «illuminated».");
  T(g, "Its authors ___ the sample to ensure representativeness.", "Escribe la palabra que falta.", ["stratified"], "Pasado simple: stratified.");
  T(g, "The more ___ the argument becomes, the less persuasive it appears.", "Escribe la palabra que falta.", ["convoluted"], "Adjetivo «convoluted» tras «the more».");
  G(g, "The treaty's provisions are ___ to interpretation.", ["open", "opening", "opened"], 0, "Adjetivo «open to interpretation».");
  T(g, "He ___ his opposition to the bill with unusual vehemence.", "Escribe la palabra que falta.", ["articulated"], "Pasado simple: articulated.");
  T(g, "The ___ of the new evidence was not immediately apparent to the court.", "Escribe la palabra que falta.", ["significance"], "Sustantivo «significance».");
  G(g, "Few economists ___ the policy's long-term benefits without reservation.", ["endorse", "endorsing", "endorsed"], 0, "Verbo «endorse» en presente simple con sujeto plural.");
  T(g, "The novel's structure ___ the fractured experience of its protagonist.", "Escribe la palabra que falta.", ["mirrors"], "Presente simple tercera persona: mirrors.");
  G(g, "She wrote the letter ___ the assumption that it would never be read in public.", ["under", "by", "on"], 0, "Expresión «under the assumption».");
  T(g, "The defence ___ that the prosecution had failed to disclose key documents.", "Escribe la palabra que falta.", ["contended"], "Pasado simple: contended.");
  T(g, "The reform was ___ to address long-standing inequalities in access to healthcare.", "Escribe la palabra que falta.", ["intended"], "Participio «intended to».");
  G(g, "The agency has ___ a comprehensive review of its procedures.", ["commissioned", "commissioning", "commission"], 0, "Present perfect con «commissioned».");
  T(g, "I cannot ___ the feeling that something important has been overlooked.", "Escribe la palabra que falta.", ["shake"], "Expresión «shake the feeling».");
  T(g, "The philosopher ___ the claim that knowledge is merely justified belief.", "Escribe la palabra que falta.", ["disputed"], "Pasado simple: disputed.");
  G(g, "The new evidence ___ the defendant's version of events.", ["corroborates", "corroborating", "corroborate"], 0, "Presente simple tercera persona: corroborates.");
  T(g, "Never ___ such an ambitious plan been attempted by a municipality.", "Escribe la palabra que falta.", ["has"], "Inversión con «never» y presente perfecto.");
  G(g, "The sheer ___ of the task deterred many volunteers.", ["magnitude", "magnitudinal", "magnify"], 0, "Sustantivo «magnitude».");
  T(g, "She remained ___ to the principles she had defended for years.", "Escribe la palabra que falta.", ["faithful"], "Adjetivo «faithful to».");
  T(g, "The recommendations, ___ were largely ignored, have since been vindicated.", "Escribe la palabra que falta.", ["which"], "Relativa no definitiva con «which».");
  G(g, "He was ___ in the belief that his reputation was unassailable.", ["steadfast", "steadfastly", "steadfastness"], 0, "Adjetivo «steadfast in the belief».");
  T(g, "The ___ of the proposal lies in its simplicity.", "Escribe la palabra que falta.", ["strength"], "Sustantivo «strength».");

  R(r, "The historian's reinterpretation of the treaty challenges the long-held view that its provisions were imposed unilaterally. Instead, she argues, they were the product of prolonged bargaining between unequal but interdependent parties.", "How does the historian describe the treaty's provisions?", ["Imposed unilaterally", "The product of prolonged bargaining", "Accidental"], 1, "«Product of prolonged bargaining between unequal but interdependent parties».");
  R(r, "Proponents of the new accounting standard maintain that it provides a more faithful picture of corporate value. Detractors counter that its reliance on projections introduces a degree of subjectivity that undermines comparability.", "What do detractors claim the standard undermines?", ["Corporate value", "Comparability", "Shareholder returns"], 1, "«Undermines comparability».");
  R(r, "The critic's review was notable for its restraint. Rather than dismissing the play outright, she identified a handful of genuine insights amid what she considered an otherwise unfocused performance.", "How would you describe the review?", ["Harsh and dismissive", "Restrained, acknowledging some insights", "Enthusiastic and unqualified"], 1, "«Restraint» y reconocimiento de aciertos.");
  R(r, "Climatologists warn that feedback loops may accelerate warming beyond current projections. Because these mechanisms are poorly understood, the models used by policymakers may underestimate the risks.", "Why might the models underestimate the risks?", ["Because feedback loops are well understood", "Because the mechanisms are poorly understood", "Because warming is slowing"], 1, "«The mechanisms are poorly understood».");
  R(r, "The ethnographic study documents how a rural community negotiated the arrival of industrial agriculture. Rather than capitulating, residents developed hybrid practices that preserved local autonomy while adopting new techniques.", "How did residents respond to industrial agriculture?", ["They capitulated entirely", "They developed hybrid practices preserving autonomy", "They migrated to cities"], 1, "«Hybrid practices that preserved local autonomy».");
  R(r, "Although the reform was ostensibly designed to increase transparency, its complex reporting requirements have, in practice, placed an onerous burden on smaller institutions with limited administrative capacity.", "Who has the reform burdened in practice?", ["Large institutions", "Smaller institutions with limited capacity", "Regulators"], 1, "«Smaller institutions with limited administrative capacity».");
  R(r, "Literary scholars have increasingly turned their attention to the marginalia of early modern books. These annotations, far from being incidental, reveal how readers actively negotiated the texts they encountered.", "What do marginalia reveal, according to scholars?", ["That readers ignored the texts", "How readers actively negotiated the texts", "That books were rarely read"], 1, "«How readers actively negotiated the texts».");
  R(r, "The judgement hinged on whether the defendant had been reasonably aware of the risk. The court concluded that the warnings, though brief, were sufficiently prominent to alert a reasonable person.", "On what did the judgement hinge?", ["Whether the defendant had a lawyer", "Whether the defendant was reasonably aware of the risk", "The length of the warnings"], 1, "«Whether the defendant had been reasonably aware of the risk».");
  R(r, "Economists have long debated whether central bank independence serves the public interest. Recent crises, however, have prompted a reassessment of the trade-offs between autonomy and democratic accountability.", "What have recent crises prompted?", ["An abandonment of central banks", "A reassessment of autonomy and democratic accountability", "A merger of central banks"], 1, "«A reassessment of the trade-offs between autonomy and democratic accountability».");
  R(r, "The archaeological report suggests that the city's walls were built in several phases, reflecting shifting political priorities rather than a single coherent plan. The authors caution that the evidence remains fragmentary.", "What do the authors caution about the evidence?", ["It is complete", "It remains fragmentary", "It has been destroyed"], 1, "«The evidence remains fragmentary».");
  R(r, "The philanthropic foundation has committed to funding long-term research rather than short-term projects. Its trustees argue that transformative discoveries rarely emerge from work designed to deliver immediate results.", "What do the trustees argue?", ["Short-term projects are more valuable", "Transformative discoveries rarely emerge from immediate-results work", "Research should be privatised"], 1, "«Rarely emerge from work designed to deliver immediate results».");
  R(r, "The parliamentary committee's report is notable for its candid acknowledgement of past failures. It nevertheless stops short of assigning individual responsibility, a decision that has frustrated campaigners.", "What has frustrated campaigners?", ["The report's candour", "The report's refusal to assign individual responsibility", "The length of the report"], 1, "«Refusal to assign individual responsibility».");
  R(r, "Architects who work with vernacular materials argue that they offer both environmental and cultural advantages. Critics, however, contend that such materials are rarely suited to the scale and demands of modern urban construction.", "What do critics contend about vernacular materials?", ["They are too expensive", "They are rarely suited to modern urban construction", "They are illegal"], 1, "«Rarely suited to the scale and demands of modern urban construction».");
  R(r, "A sociological analysis of online communities reveals that participants often adopt the linguistic norms of their group with remarkable speed. The authors suggest that this convergence reflects a desire for belonging rather than conscious imitation.", "What does the convergence reflect, according to the authors?", ["Conscious imitation", "A desire for belonging", "Technical limitations"], 1, "«A desire for belonging rather than conscious imitation».");
  R(r, "The philosopher's late work revisits the problem of free will with unusual humility. Where earlier writings were confidently prescriptive, this text concedes that several questions may be beyond the reach of human reason.", "How does the late work differ from earlier writings?", ["It is more prescriptive", "It concedes that some questions may be beyond reason", "It is shorter"], 1, "«Concedes that several questions may be beyond the reach of human reason».");
  R(r, "The pharmaceutical company's trial results were published in full, including several adverse outcomes that had initially been omitted. Independent reviewers praised the decision as an important step towards transparency.", "How did independent reviewers view the decision?", ["As a mistake", "As an important step towards transparency", "As irrelevant"], 1, "«An important step towards transparency».");
  R(r, "The migration policy under review has been criticised for its reliance on administrative discretion. Lawyers argue that without clearer criteria, similar cases may receive markedly different outcomes.", "What do lawyers argue would happen without clearer criteria?", ["Cases would be resolved quickly", "Similar cases may receive markedly different outcomes", "The policy would be abolished"], 1, "«Similar cases may receive markedly different outcomes».");
  R(r, "Sociolinguists have documented the gradual erosion of regional dialects under the influence of broadcast media. Yet some researchers observe a counter-trend, in which younger speakers deliberately revive local forms as markers of identity.", "What is the counter-trend?", ["Younger speakers abandon dialects", "Younger speakers deliberately revive local forms as identity markers", "Broadcast media revives dialects"], 1, "«Revive local forms as markers of identity».");
  R(r, "The hospital's ethics committee has been asked to rule on a case involving the withdrawal of treatment. Its members acknowledge that the principles at stake are not easily reconciled and that consensus may prove elusive.", "What do committee members acknowledge?", ["The case is simple", "The principles at stake are not easily reconciled", "They have already reached a verdict"], 1, "«Not easily reconciled».");

  L(l, "Man: The committee's approach strikes me as overly cautious. Woman: Caution has its merits, particularly when the consequences of error are irreversible.", "What does the woman emphasise?", ["The merits of caution when errors are irreversible", "That the committee should act faster", "That the committee is unnecessary"], 0, "«Caution has its merits ... irreversible».");
  L(l, "Woman: The study's authors have been careful to distinguish correlation from causation. Man: Which is commendable, though the headlines have ignored those caveats entirely.", "What does the man criticise?", ["The headlines ignoring the caveats", "The authors' caution", "The sample size"], 0, "«The headlines have ignored those caveats entirely».");
  L(l, "Girl: The minister's defence of the policy was unconvincing. Boy: I thought so too, though she did concede that the implementation had been flawed.", "What did the minister concede?", ["That the implementation had been flawed", "That the policy was perfect", "That she would resign"], 0, "«The implementation had been flawed».");
  L(l, "Man: The novel's ambiguity is both its greatest strength and its most frustrating feature. Woman: I'd go further. The ambiguity is deliberate, and the reader is meant to feel that discomfort.", "What does the woman say about the ambiguity?", ["It is deliberate", "It is accidental", "It is a weakness"], 0, "«The ambiguity is deliberate».");
  L(l, "Woman: The regulator has been accused of regulatory capture. Man: The accusations are serious, though the evidence so far is largely circumstantial.", "How does the man describe the evidence?", ["Largely circumstantial", "Conclusive", "Non-existent"], 0, "«Largely circumstantial».");
  L(l, "Boy: The researchers concluded that the effect was negligible. Girl: Negligible in the aggregate, perhaps, but for a minority of patients it was transformative.", "How did the effect differ for some patients?", ["It was transformative", "It was negligible", "It was harmful"], 0, "«For a minority of patients it was transformative».");
  L(l, "Man: I'm not persuaded that the redesign will improve accessibility. Woman: The consultants insist it will, though they concede that some features may need revisiting.", "What do the consultants concede?", ["Some features may need revisiting", "The redesign is unnecessary", "The budget was exceeded"], 0, "«Some features may need revisiting».");
  L(l, "Girl: The university's decision to rename the faculty has provoked considerable debate. Boy: Naming is always contentious, since it signals values as much as it describes structures.", "What does the boy say naming signals?", ["Values as much as structures", "Only costs", "Only dates"], 0, "«Signals values as much as it describes structures».");
  L(l, "Woman: The auditors found no evidence of deliberate wrongdoing, though they noted serious lapses in oversight. Man: Lapses that the board ought to have caught.", "What did the auditors find?", ["Serious lapses in oversight but no deliberate wrongdoing", "Deliberate fraud", "No problems at all"], 0, "«No evidence of deliberate wrongdoing ... serious lapses».");
  LT(l, "Man: The conductor's interpretation was unusually restrained. Woman: Restrained, yes, but the tension he built in the second movement was remarkable.", "How does the woman describe the tension?", ["Remarkable"], "«The tension he built ... was remarkable».");
  L(l, "Woman: The authorities insist the flood risk has been mitigated. Man: They say that, but the residents of the low-lying district remain unconvinced.", "How do the residents feel?", ["Unconvinced", "Reassured", "Indifferent"], 0, "«Remain unconvinced».");
  L(l, "Boy: The chapter on methodology is more rigorous than the rest of the book. Girl: Agreed, though the authors' conclusions occasionally outrun their data.", "What do the authors' conclusions sometimes do?", ["Outrun their data", "Contradict the methodology", "Ignore the findings"], 0, "«Conclusions occasionally outrun their data».");
  L(l, "Man: The company's transparency report is commendable, but it omits the most sensitive figures. Woman: That omission will invite scrutiny, and rightly so.", "What does the man say the report omits?", ["The most sensitive figures", "The authors' names", "The date"], 0, "«Omits the most sensitive figures».");
  L(l, "Woman: The gallery's acquisition has been controversial because of the price paid. Man: Controversial, but the work is undoubtedly important for understanding the period.", "Why has the acquisition been controversial?", ["Because of the price paid", "Because the work is fake", "Because the gallery is closing"], 0, "«Because of the price paid».");
  L(l, "Girl: The council has embraced participatory planning in principle. Boy: In principle, yes, but the timetable leaves residents little time to contribute meaningfully.", "What is the boy's criticism?", ["The timetable leaves little time for residents", "The council has rejected planning", "The residents have too much influence"], 0, "«The timetable leaves residents little time».");
  L(l, "Man: The decision to commission the bridge was taken long before the environmental study. Woman: Which is precisely why the study now carries so little weight.", "What does the woman say about the study?", ["It carries little weight", "It was decisive", "It was never finished"], 0, "«Carries so little weight».");
  L(l, "Woman: The translator has chosen to preserve the original syntax, which makes the text demanding. Man: Demanding, but it captures the rhythm of the source in a way few translations do.", "What does the man say the translation captures?", ["The rhythm of the source", "The modern idiom", "The plot"], 0, "«Captures the rhythm of the source».");
  L(l, "Boy: The judge's remarks were measured, though the press has seized on a single phrase. Girl: Journalists always prefer the striking quote to the careful argument.", "What do journalists prefer, according to the girl?", ["The striking quote", "The careful argument", "The official statement"], 0, "«Prefer the striking quote to the careful argument».");
  L(l, "Man: The panel acknowledged the limitations of the data, yet still recommended immediate action. Woman: That tension between uncertainty and urgency defines most policy decisions.", "What tension does the woman identify?", ["Between uncertainty and urgency", "Between cost and quality", "Between tradition and innovation"], 0, "«Tension between uncertainty and urgency».");

  T(t, "Rewrite: 'Only after a lengthy inquiry was the truth finally established.' → 'It was ___ a lengthy inquiry that the truth was finally established.'", "Expresión «only after».", ["only after", "not until"], "«Only after».");
  T(t, "Rewrite: 'The argument, though persuasive, relies on several unverified assumptions.' → 'Despite its persuasiveness, the argument ___ on several unverified assumptions.'", "Verbo «hinge» o «rest».", ["hinges", "rests", "depends"], "«Hinges» o «rests».");
  T(t, "Rewrite: 'It would be wrong to ignore the environmental consequences.' → 'It would be ___ to disregard the environmental consequences.'", "Adjetivo «remiss».", ["remiss", "negligent", "short-sighted"], "«Remiss» o «negligent».");
  T(t, "Rewrite: 'The author deliberately avoids making any firm predictions.' → 'The author ___ from making any firm predictions.'", "Verbo «refrain».", ["refrains", "abstains"], "«Refrains».");
  T(t, "Rewrite: 'The investigation found no grounds for prosecution.' → 'The investigation ___ no basis for prosecution.'", "Verbo «uncover» o «find».", ["uncovered", "found", "identified"], "«Uncovered» o «found».");
  T(t, "Rewrite: 'Their conclusions are clearly at odds with the evidence.' → 'Their conclusions are ___ with the evidence.'", "Expresión «at variance».", ["at variance", "inconsistent", "at odds"], "«At variance».");
  T(t, "Rewrite: 'He was unwilling to accept any compromise.' → 'He ___ any compromise.'", "Verbo «rule out».", ["ruled out", "refused", "would not accept"], "«Ruled out» o «refused».");
  T(t, "Rewrite: 'The policy was introduced in spite of widespread opposition.' → 'The policy was introduced ___ widespread opposition.'", "Preposición «notwithstanding».", ["notwithstanding", "despite", "in the face of"], "«Notwithstanding» o «in the face of».");
  T(t, "Rewrite: 'The data are not sufficient to justify the claim.' → 'The data ___ to justify the claim.'", "Expresión «fall short».", ["fall short of justifying", "do not warrant", "fail to justify"], "«Fall short of justifying».");
  T(t, "Rewrite: 'The results have not been fully explained yet.' → 'The results ___ fully explained yet.'", "Pasiva con «remain».", ["remain to be"], "«Remain to be».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C2 · Gramática", r = "C2 · Lectura", l = "C2 · Escucha", t = "C2 · Reformulación";
  T(g, "The committee's deliberations, ___ were conducted in private, have been leaked to the press.", "Escribe la palabra que falta.", ["which"], "Relativa no definitiva con «which».");
  G(g, "It is ___ to suppose that the reform will succeed without substantial investment.", ["naive", "naively", "naivety"], 0, "Adjetivo «naive» con «It is ... to suppose».");
  T(g, "Were the government to ___ the consultation, public trust would be eroded.", "Escribe la palabra que falta.", ["abandon"], "Condicional de segundo tipo con «were to».");
  G(g, "The dispute ___ on a fundamental disagreement about the nature of property rights.", ["turns", "turning", "turned"], 0, "Presente simple tercera persona: turns.");
  G(g, "Hardly ___ the significance of the discovery when the funding was withdrawn.", ["had the team grasped", "the team had grasped", "did the team grasp"], 0, "Inversión con «hardly ... when».");
  T(g, "She ___ her objections in a carefully worded memorandum.", "Escribe la palabra que falta.", ["lodged"], "Pasado simple: lodged.");
  T(g, "The evidence ___ strongly in favour of the hypothesis.", "Escribe la palabra que falta.", ["points"], "Presente simple con «point» (apunta); con sujeto «evidence».");
  G(g, "The tribunal's ruling has ___ a new interpretation of the law.", ["precipitated", "precipitating", "precipitate"], 0, "Present perfect con «precipitated».");
  G(g, "Scarcely ___ the implications of the decision when the protests began.", ["had they considered", "they had considered", "did they considered"], 0, "Inversión con «scarcely» y pasado perfecto.");
  T(g, "The hypothesis, ___ seemed plausible at first, was ultimately discredited.", "Escribe la palabra que falta.", ["which"], "Relativa no definitiva con «which».");
  T(g, "He was ___ by the sheer complexity of the proposal.", "Escribe la palabra que falta.", ["overwhelmed"], "Participio «overwhelmed by».");
  G(g, "The library's holdings ___ extensively catalogued over the last decade.", ["have been", "has been", "are being"], 0, "Present perfect pasivo con «over the last decade».");
  G(g, "The manuscript ___ to have been written by a monk in the twelfth century.", ["is thought", "thinks", "is thinking"], 0, "Pasiva «is thought to have been».");
  G(g, "Not only ___ the proposal ambitious, but it was also remarkably well costed.", ["was", "is", "were"], 0, "Inversión con «not only» en pasado.");
  T(g, "It was ___ to her that the decision had been made without proper consultation.", "Escribe la palabra que falta.", ["apparent"], "Adjetivo «apparent to».");
  G(g, "The theory ___ several anomalies that the original model could not explain.", ["accommodates", "accommodating", "accommodate"], 0, "Presente simple tercera persona: accommodates.");
  T(g, "I would ___ with the hypothesis, were it supported by more data.", "Escribe la palabra que falta.", ["concur"], "Verbo «concur with» en condicional.");
  T(g, "The bill was ___ on a narrow margin, after several amendments.", "Escribe la palabra que falta.", ["passed"], "Pasiva con «was passed».");
  G(g, "The government's response has been ___ criticised for its lack of urgency.", ["widely", "wide", "widen"], 0, "Adverbio «widely» con participio.");
  T(g, "Her arguments ___ the premises on which the policy was built.", "Escribe la palabra que falta.", ["undermine"], "Presente simple con sujeto plural: undermine.");
  T(g, "The programme has been ___ to the satisfaction of all parties.", "Escribe la palabra que falta.", ["concluded"], "Pasiva con «concluded».");
  G(g, "Little ___ the true cost of the project until the audit was completed.", ["did the ministry realise", "the ministry realised", "realised the ministry"], 0, "Inversión con «little» y pasado.");
  G(g, "The results were ___ of the expectations set out in the original proposal.", ["short", "shortly", "shortage"], 0, "Expresión «short of» (por debajo de).");
  T(g, "The ___ of the argument rests on an unexamined premise.", "Escribe la palabra que falta.", ["coherence"], "Sustantivo «coherence».");
  G(g, "She ___ the proposal on the grounds of excessive cost.", ["rejected", "rejecting", "rejects"], 0, "Pasado simple: rejected.");
  T(g, "The professor ___ the students to question every assumption.", "Escribe la palabra que falta.", ["encouraged"], "Pasado simple: encouraged.");
  T(g, "The experiment ___ to replicate the earlier findings with considerable precision.", "Escribe la palabra que falta.", ["succeeded"], "Pasado simple: succeeded.");
  G(g, "Many of the claims made in the report are ___ by the available data.", ["unsubstantiated", "unsubstantiating", "unsubstantial"], 0, "Adjetivo «unsubstantiated».");
  T(g, "It is ___ that the ruling will be appealed within the month.", "Escribe la palabra que falta.", ["likely"], "Adjetivo «likely» con «It is ... that».");

  R(r, "The philosopher's critique of utilitarianism rests on the claim that aggregating welfare obscures the distinctness of individuals. Defenders reply that a theory which ignored aggregate welfare would fail to account for ordinary moral judgements.", "What do defenders say a theory ignoring aggregate welfare would fail to do?", ["Account for ordinary moral judgements", "Reduce inequality", "Describe individuals"], 0, "«Fail to account for ordinary moral judgements».");
  R(r, "The commission's findings were striking less for their content than for their tone. Its authors refrained from the customary euphemisms, describing the failures in unambiguous terms.", "What is the commission's findings' most striking feature?", ["Their content", "Their tone, which avoided euphemisms", "Their length"], 1, "«Its tone ... refrained from the customary euphemisms».");
  R(r, "Despite the orchestra's financial difficulties, its artistic reputation has never been higher. Critics point to a series of recordings that have been widely acclaimed for their fidelity to the composer's intentions.", "What have critics praised?", ["The orchestra's finances", "Recordings faithful to the composer's intentions", "Its concert venues"], 1, "«Recordings ... acclaimed for their fidelity».");
  R(r, "The economist argues that inflation expectations, rather than current prices, are the principal driver of wage negotiations. If this is correct, central banks must communicate their intentions with unusual clarity.", "What must central banks do if the argument is correct?", ["Ignore expectations", "Communicate their intentions with unusual clarity", "Raise wages"], 1, "«Communicate their intentions with unusual clarity».");
  R(r, "Scholars of the medieval period have been divided over the function of the illuminated border. Some regard it as mere decoration, while others see it as a deliberate commentary on the text it frames.", "How do some scholars regard the border?", ["As a deliberate commentary", "As mere decoration", "As a forgery"], 1, "«Mere decoration».");
  R(r, "The directors' remuneration package has been defended as a necessary incentive for performance. Shareholder activists, however, argue that it bears little relation to actual results and reflects the directors' bargaining power.", "What do shareholder activists argue about the package?", ["It is a necessary incentive", "It bears little relation to results", "It is too small"], 1, "«Bears little relation to actual results».");
  R(r, "Recent epidemiological work challenges the assumption that urban living is uniformly detrimental to health. The authors show that access to green space and walkable neighbourhoods can offset many of the disadvantages associated with density.", "What can offset the disadvantages of density?", ["Higher housing prices", "Access to green space and walkable neighbourhoods", "Fewer residents"], 1, "«Access to green space and walkable neighbourhoods».");
  R(r, "The translator's preface acknowledges the impossibility of rendering the poem's wordplay without loss. Instead of forcing equivalents, she has opted for explanatory notes that restore some of the original's associative richness.", "How has the translator dealt with the wordplay?", ["By omitting it entirely", "By providing explanatory notes", "By forcing equivalents"], 1, "«Explanatory notes».");
  R(r, "The court's reasoning turned on a narrow reading of the statute's purpose. Dissenting judges contended that such an approach ignored the legislature's broader aim of protecting vulnerable tenants.", "What did the dissenting judges contend?", ["The statute had no purpose", "The narrow reading ignored the broader aim of protecting tenants", "The court was correct"], 1, "«Ignored the legislature's broader aim of protecting vulnerable tenants».");
  R(r, "A longitudinal study of graduates found that early career mobility correlated with later job satisfaction, but only among those with access to supportive professional networks. The authors caution against simple generalisations.", "Under what condition was mobility associated with satisfaction?", ["Among those with supportive professional networks", "Among all graduates", "Among those who remained in one job"], 0, "«Only among those with access to supportive professional networks».");
  R(r, "The planners' vision of a car-free city centre has been criticised by retailers, who fear that reduced accessibility will depress trade. Planners respond that pedestrianised districts generally experience sustained growth in footfall.", "What do planners say about pedestrianised districts?", ["They lose footfall", "They generally experience sustained growth in footfall", "They become empty"], 1, "«Sustained growth in footfall».");
  R(r, "Historians of science have increasingly emphasised the collaborative character of discovery. Rather than heroic individuals working in isolation, they describe networks of technicians, patrons and rivals whose contributions shaped outcomes.", "What do historians now emphasise about discovery?", ["Heroic individuals working in isolation", "Its collaborative character", "Its random nature"], 1, "«Its collaborative character».");
  R(r, "The bank's regulator has issued a sharply worded warning, noting that the institution's risk models rely on assumptions that have not been tested under stressed conditions.", "What does the regulator note about the bank's models?", ["They have been stress-tested", "Their assumptions have not been tested under stress", "They are perfectly accurate"], 1, "«Not been tested under stressed conditions».");
  R(r, "The novel's narrator is notoriously unreliable, yet the text offers subtle clues that allow careful readers to reconstruct a plausible version of events. Critics disagree about whether this reconstruction is intended by the author.", "What do critics disagree about?", ["Whether the narrator is reliable", "Whether reconstruction is intended by the author", "Whether the novel is short"], 1, "«Whether this reconstruction is intended by the author».");
  R(r, "Advocates of community policing argue that sustained contact between officers and residents builds trust and improves the flow of information. Sceptics question whether the benefits can be sustained once budgets are constrained.", "What do sceptics question?", ["Whether residents want police contact", "Whether the benefits can be sustained under budget constraints", "Whether crime exists"], 1, "«Whether the benefits can be sustained once budgets are constrained».");
  R(r, "The pottery found at the site displays stylistic influences from three distinct regions. Scholars have debated whether this reflects migration, trade or a fashion for exotic goods, and the evidence does not yet decide the matter.", "Does the evidence decide the matter?", ["Yes, it proves migration", "No, the evidence does not yet decide the matter", "Yes, it proves trade"], 1, "«The evidence does not yet decide the matter».");

  L(l, "Woman: The board has been reluctant to disclose the terms of the settlement. Man: That reticence is understandable, though it fuels speculation among staff.", "What does the reticence fuel?", ["Speculation among staff", "A strike", "A new appointment"], 0, "«It fuels speculation among staff».");
  L(l, "Man: The findings challenge the orthodoxy that the policy was effective. Woman: They do, but the authors are careful to acknowledge that their sample was regionally limited.", "What do the authors acknowledge?", ["Their sample was regionally limited", "The policy was perfect", "The orthodoxy is correct"], 0, "«Their sample was regionally limited».");
  L(l, "Girl: The editor's decision to cut the epilogue has divided the readership. Boy: For some, it was an improvement; others feel the book loses its emotional resolution.", "What do others feel the book loses?", ["Its emotional resolution", "Its title", "Its index"], 0, "«Loses its emotional resolution».");
  L(l, "Woman: The new framework is ambitious, yet its success hinges on coordination across several ministries. Man: Which is precisely where previous initiatives have foundered.", "Where have previous initiatives foundered?", ["In coordination across ministries", "In funding", "In public support"], 0, "«Precisely where previous initiatives have foundered».");
  L(l, "Man: The tribunal's decision seems to contradict its earlier jurisprudence. Woman: It does, although the judges explicitly distinguish the present circumstances.", "How do the judges justify the decision?", ["By distinguishing the present circumstances", "By ignoring jurisprudence", "By appealing to public opinion"], 0, "«Explicitly distinguish the present circumstances».");
  L(l, "Boy: The curator insisted that the display should not be interpreted as a celebration. Girl: She was right. The exhibition is a sober reckoning with the past.", "How does the girl describe the exhibition?", ["A sober reckoning with the past", "A celebration", "A commercial venture"], 0, "«A sober reckoning with the past».");
  L(l, "Woman: The forecasters now expect growth to slow considerably in the second half. Man: That's a sobering prospect, especially for the regions that depend on export income.", "Which regions are most affected?", ["Those dependent on export income", "Those dependent on tourism", "Those with the largest population"], 0, "«Depend on export income».");
  L(l, "Man: The family has decided to contest the will. Woman: I can understand their reasoning, although litigation of this kind rarely brings the reconciliation they hope for.", "What does the woman say about litigation?", ["It rarely brings the reconciliation they hope for", "It always brings reconciliation", "It is illegal"], 0, "«Rarely brings the reconciliation».");
  L(l, "Girl: The study's recommendations are sensible, but I doubt they will be implemented without a change in political leadership. Boy: That's a cynical but probably accurate view.", "What does the girl doubt?", ["That the recommendations will be implemented", "That the study is sensible", "That the leadership will change"], 0, "«I doubt they will be implemented».");
  LT(l, "Woman: The orchestra's principal cellist has announced her departure after two decades. Man: The loss will be felt keenly, though her successor has an impressive record.", "How long did the cellist serve?", ["Two decades"], "«After two decades».");
  L(l, "Boy: The report's authors argue that the apparent improvement is an artefact of changes in measurement. Girl: That's a serious charge, and it needs to be tested independently.", "What do the authors argue?", ["The improvement is an artefact of measurement changes", "The improvement is real", "There was no change at all"], 0, "«An artefact of changes in measurement».");
  L(l, "Man: The minister has pledged to protect the rights of tenants. Woman: The pledge is welcome, although the details remain vague and the enforcement mechanisms are weak.", "What does the woman say about the details?", ["They remain vague", "They are clear", "They have been published in full"], 0, "«The details remain vague».");
  L(l, "Girl: The architect has been praised for integrating the new building with its surroundings. Boy: Integration is one thing, but the scale of the structure still dominates the street.", "What does the boy criticise?", ["The scale dominates the street", "The colour of the building", "The cost of the site"], 0, "«The scale of the structure still dominates the street».");
  L(l, "Woman: The data show that absenteeism has fallen since the new policy was introduced. Man: That is encouraging, but we ought to examine whether it reflects healthier workplaces or simply stricter monitoring.", "What does the man want to examine?", ["Whether the fall reflects healthier workplaces or stricter monitoring", "Whether absenteeism has risen", "Whether the policy should be abandoned"], 0, "«Whether it reflects healthier workplaces or simply stricter monitoring».");
  L(l, "Man: The negotiators have made real progress on the transitional arrangements. Woman: Real progress, yes, though the thornier questions of sovereignty have yet to be addressed.", "What remains unaddressed?", ["The thornier questions of sovereignty", "The transitional arrangements", "The negotiators' salaries"], 0, "«The thornier questions of sovereignty have yet to be addressed».");
  L(l, "Boy: The festival's programme deliberately mixes established artists with emerging voices. Girl: That blend is what keeps it vital, and it's something few festivals manage well.", "What keeps the festival vital?", ["Blending established and emerging artists", "Its low prices", "Its location"], 0, "«That blend is what keeps it vital».");
  L(l, "Woman: The clinic's waiting times have improved, but the number of complaints has risen. Man: Which suggests that the improvement in speed has come at a cost to the quality of care.", "What does the man conclude from the clinic's figures?", ["Speed has come at a cost to quality", "The clinic should close", "Patients are satisfied"], 0, "«Improvement in speed has come at a cost to the quality of care».");

  T(t, "Rewrite: 'The proposal was dismissed as impractical by most of the board.' → 'Most of the board ___ the proposal as impractical.'", "Verbo «dismiss».", ["dismissed", "rejected", "disregarded"], "«Dismissed».");
  T(t, "Rewrite: 'The new evidence has made the original theory untenable.' → 'The new evidence has ___ the original theory.'", "Verbo «undermine» o «rule out».", ["undermined", "rendered untenable", "ruled out"], "«Undermined» o «rendered untenable».");
  T(t, "Rewrite: 'The author uses irony to criticise the political elite.' → 'Through irony, the author ___ the political elite.'", "Verbo «satirise» o «lampoon».", ["satirises", "lampoons", "skewers", "mocks"], "«Satirises» o «lampoons».");
  T(t, "Rewrite: 'He achieved very little during his time in office.' → 'His time in office was ___ productive.'", "Adjetivo «unproductive» o «fruitless».", ["unproductive", "fruitless", "barren"], "«Unproductive» o «fruitless».");
  T(t, "Rewrite: 'It is impossible to predict how the market will respond.' → 'It is ___ to predict how the market will respond.'", "Adjetivo «impossible» o «futile».", ["impossible", "beyond prediction", "difficult to foresee"], "«Impossible».");
  T(t, "Rewrite: 'The new policy has had a limited effect on unemployment.' → 'The new policy has ___ little effect on unemployment.'", "Verbo «made».", ["made", "had"], "«Had little effect».");
  T(t, "Rewrite: 'The team could not avoid making several mistakes.' → 'The team ___ making several mistakes.'", "Expresión «could not help».", ["could not help", "could not avoid"], "«Could not help making».");
  T(t, "Rewrite: 'The committee made a decision that was widely welcomed.' → 'The committee's decision was ___ welcomed.'", "Adverbio «widely».", ["widely", "broadly", "generally"], "«Widely welcomed».");
  T(t, "Rewrite: 'Her argument is reasonable but ultimately flawed.' → 'Her argument is ___ but ultimately flawed.'", "Adjetivo «plausible».", ["plausible", "sound", "reasonable"], "«Plausible».");
  T(t, "Rewrite: 'We cannot be certain that the results are accurate.' → 'The accuracy of the results ___ certain.'", "Verbo «remain».", ["remains uncertain", "is not certain", "cannot be confirmed"], "«Remains uncertain».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function RT(part, pass, q, acc, e) { push({ type: "reading", passage: pass, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { push({ type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C2 · Gramática", r = "C2 · Lectura", l = "C2 · Escucha", t = "C2 · Reformulación";
  G(g, "The debate ___ whether the legislation can be reconciled with the constitution.", ["centres on", "centring on", "centred"], 0, "Presente simple: centres on.");
  T(g, "Had the auditors ___ the ledgers more carefully, the irregularities would have surfaced sooner.", "Escribe la palabra que falta.", ["examined"], "Condicional mixto con participio: examined.");
  G(g, "She ___ the manuscript for publication once the final revisions were complete.", ["submitted", "submitting", "submit"], 0, "Pasado simple: submitted.");
  T(g, "The novelist's prose is ___ with allusions that reward the attentive reader.", "Escribe la palabra que falta.", ["replete"], "Adjetivo «replete with».");
  G(g, "It is not ___ that the government will reverse its decision.", ["inconceivable", "inconceive", "inconceivably"], 0, "Adjetivo «inconceivable» con «It is not».");
  T(g, "The findings were ___ at the conference, although the methodology was questioned.", "Escribe la palabra que falta.", ["presented"], "Pasiva con «were presented».");
  T(g, "The company's strategy has been ___ by a single-minded focus on margins.", "Escribe la palabra que falta.", ["dictated"], "Pasiva con «dictated by».");
  G(g, "Were the proposal to ___ the scrutiny of the committee, its flaws would be exposed.", ["survive", "survives", "surviving"], 0, "Condicional de segundo tipo con «were to».");
  T(g, "Such ___ the scale of the disruption that emergency powers were invoked.", "Escribe la palabra que falta.", ["was"], "Inversión con «such» y sujeto singular.");
  T(g, "The essay ___ a compelling case for reconsidering the principle of proportionality.", "Escribe la palabra que falta.", ["makes"], "Presente simple tercera persona: makes.");
  G(g, "The judge refused to ___ the request for an adjournment.", ["entertain", "entertaining", "entertained"], 0, "Verbo «entertain» (considerar una petición).");
  T(g, "Not until the evidence was reviewed ___ the depth of the fraud become apparent.", "Escribe la palabra que falta.", ["did"], "Inversión con «not until».");
  G(g, "The initiative has ___ widespread support across the political spectrum.", ["garnered", "garnering", "garner"], 0, "Present perfect con «garnered».");
  T(g, "The prosecution's case ___ largely on circumstantial evidence.", "Escribe la palabra que falta.", ["rested"], "Pasado simple de «rest on»: rested.");
  T(g, "Whatever the ___ of the decision, it must be justified publicly.", "Escribe la palabra que falta.", ["merits"], "Sustantivo «merits».");
  G(g, "The author's argument is ___ on a series of tacit assumptions.", ["predicated", "predicting", "predicate"], 0, "Participio «predicated on».");
  T(g, "The results have been ___ by an independent panel of experts.", "Escribe la palabra que falta.", ["verified"], "Pasiva: verified.");
  T(g, "It is ___ that the reforms will be resisted by entrenched interests.", "Escribe la palabra que falta.", ["probable"], "Adjetivo «probable» con «It is ... that».");
  G(g, "The minister ___ the implications of the ruling with considerable care.", ["weighed", "weighing", "weigh"], 0, "Pasado simple: weighed.");
  T(g, "The council has ___ its commitment to transparency in several public statements.", "Escribe la palabra que falta.", ["reaffirmed"], "Present perfect con «reaffirmed».");
  G(g, "The protesters ___ the decision as an act of bad faith.", ["denounced", "denouncing", "denounce"], 0, "Pasado simple: denounced.");
  T(g, "Her ___ to the cause has been unwavering throughout her career.", "Escribe la palabra que falta.", ["dedication"], "Sustantivo «dedication».");
  T(g, "The theory has ___ widespread acceptance among specialists in the field.", "Escribe la palabra que falta.", ["gained"], "Present perfect con «gained».");
  G(g, "Few would ___ that the exhibition was a remarkable achievement.", ["dispute", "disputing", "disputed"], 0, "Verbo «dispute» en condicional con «few».");
  T(g, "The study ___ a striking discrepancy between official statistics and lived experience.", "Escribe la palabra que falta.", ["reveals"], "Presente simple tercera persona: reveals.");
  T(g, "I would have ___ the offer had the terms been less restrictive.", "Escribe la palabra que falta.", ["accepted"], "Condicional mixto con participio: accepted.");
  G(g, "The historian's thesis has been ___ by several subsequent discoveries.", ["vindicated", "vindicating", "vindicate"], 0, "Pasiva: vindicated.");
  G(g, "It was ___ the storm subsided that the rescue could begin.", ["not until", "not only", "not when"], 0, "Estructura enfática: «It was not until ... that».");
  T(g, "The minister's statement ___ considerable anxiety among investors.", "Escribe la palabra que falta.", ["provoked"], "Pasado simple: provoked.");
  T(g, "The evidence ___ to a conclusion that few had anticipated.", "Escribe la palabra que falta.", ["pointed"], "Pasado simple: pointed to.");
  G(g, "The bill is ___ to face strong opposition in the upper chamber.", ["likely", "probable", "likelihood"], 0, "«Likely to face».");
  T(g, "The project's ___ rested on the assumption that demand would remain stable.", "Escribe la palabra que falta.", ["viability"], "Sustantivo «viability».");
  G(g, "He ___ his concerns about the programme in a memorandum to the board.", ["communicated", "communicating", "communicate"], 0, "Pasado simple: communicated.");
  T(g, "The discovery of the ruins ___ a re-evaluation of the region's early history.", "Escribe la palabra que falta.", ["prompted"], "Pasado simple: prompted.");
  T(g, "The evaluation ___ several shortcomings that the team has since addressed.", "Escribe la palabra que falta.", ["identified"], "Pasado simple: identified.");
  G(g, "The manager was ___ with the responsibility for overseeing the transition.", ["entrusted", "entrusting", "entrust"], 0, "Participio «entrusted with».");

  R(r, "The concept of the 'public sphere' has been reinterpreted in light of digital media. Some theorists see new spaces for deliberation, while others warn that algorithmic filtering fragments public discussion into isolated enclaves.", "What do others warn algorithmic filtering does?", ["Unites public discussion", "Fragments public discussion into isolated enclaves", "Eliminates deliberation"], 1, "«Fragments public discussion into isolated enclaves».");
  R(r, "Archaeologists excavating the coastal settlement uncovered evidence of a sophisticated drainage system. The discovery has prompted a reassessment of the community's capacity for collective planning.", "What has the discovery prompted?", ["A reassessment of collective planning capacity", "The abandonment of the site", "A new excavation budget"], 0, "«A reassessment of the community's capacity for collective planning».");
  R(r, "Advocates of the policy claim that its benefits accrue mainly to low-income households. A careful analysis of the distributional data, however, suggests that the largest gains went to households in the middle of the income distribution.", "Where did the largest gains go, according to the analysis?", ["To the lowest-income households", "To households in the middle of the distribution", "To the wealthiest households"], 1, "«Households in the middle of the income distribution».");
  RT(r, "Museum conservators have raised concerns about the proposed loan of a fragile manuscript. They argue that the journey and the new environment could cause irreversible damage, and they have requested additional safeguards.", "What have conservators requested?", ["Additional safeguards"], "«Additional safeguards».");
  R(r, "The memoir's author reflects on her childhood in a provincial town, where the rhythms of agricultural life shaped every aspect of communal existence. Reviewers have praised the restraint with which she handles painful memories.", "What have reviewers praised?", ["The author's restraint in handling painful memories", "The book's length", "The cover design"], 0, "«The restraint with which she handles painful memories».");
  R(r, "Regulators argue that the proposed merger would reduce competition in several regional markets. The companies counter that the combined entity would invest more heavily in innovation and pass efficiencies on to consumers.", "What do the companies counter?", ["That the merger would reduce innovation", "That the merged entity would invest more in innovation", "That they will not merge"], 1, "«Invest more heavily in innovation».");
  R(r, "The rise of remote diagnostics has transformed rural healthcare. Patients can now consult specialists without travelling, although clinicians warn that the technology cannot replace the diagnostic value of a physical examination.", "What do clinicians warn?", ["Remote diagnostics replace physical examination", "Technology cannot replace a physical examination's diagnostic value", "Specialists are unnecessary"], 1, "«Cannot replace the diagnostic value of a physical examination».");
  R(r, "An influential school of thought holds that language change is driven primarily by social prestige. Recent sociolinguistic studies, however, suggest that mundane patterns of everyday interaction are equally important.", "What do recent studies suggest?", ["Prestige is the only driver", "Everyday interaction patterns are equally important", "Language does not change"], 1, "«Mundane patterns of everyday interaction are equally important».");
  R(r, "The commission has recommended a radical simplification of the tax code, arguing that its complexity encourages avoidance and imposes heavy compliance costs on small firms.", "What does the commission argue complexity encourages?", ["Avoidance", "Investment in research", "Higher wages"], 0, "«Encourages avoidance».");
  R(r, "The philosopher distinguishes between the duty to obey the law and the duty to resist its injustice. She contends that a citizen may legitimately disobey statutes that violate fundamental rights, provided the disobedience is open and principled.", "Under what conditions may a citizen legitimately disobey?", ["Whenever the citizen disagrees", "When laws violate fundamental rights and disobedience is open and principled", "Never"], 1, "«When laws violate fundamental rights and disobedience is open and principled».");
  R(r, "The rediscovery of an early scientific treatise has forced historians to revise their account of the period. Its author anticipated several findings that were later attributed to contemporaries.", "What did the author anticipate?", ["Findings later attributed to contemporaries", "The collapse of the period", "Modern computing"], 0, "«Findings that were later attributed to contemporaries».");
  R(r, "Environmental economists have proposed a carbon border tax to protect domestic industries from competitors in countries with weaker climate policies. Critics fear the measure could provoke retaliation and strain international trade relations.", "What do critics fear?", ["Retaliation and strained trade relations", "Lower domestic emissions", "Cheaper imports"], 0, "«Provoke retaliation and strain international trade relations».");
  R(r, "The choreographer's latest work abandons narrative altogether, relying instead on repetition and gradual shifts in rhythm. Some audience members found the piece tedious, while others described it as a meditation on time.", "How did some audience members describe the piece?", ["As tedious", "As a meditation on time", "As a comedy"], 1, "«A meditation on time».");
  R(r, "Several studies suggest that memory is reconstructive rather than reproductive. Each recollection, they argue, alters the trace, so that repeated retrieval can gradually change what a person remembers.", "What do the studies argue about each recollection?", ["It leaves the memory unchanged", "It alters the trace", "It erases the memory entirely"], 1, "«It alters the trace».");
  R(r, "The authority's plan to relocate the market has provoked fierce opposition from traders, who say the new site lacks the footfall that sustains their livelihoods. The authority insists that the move will modernise the district.", "What does the authority insist the move will do?", ["Reduce footfall", "Modernise the district", "Close the market"], 1, "«Modernise the district».");
  R(r, "The diplomatic correspondence reveals that the two governments had been negotiating in secret for several months before the public announcement. Historians differ over whether the secrecy was essential to the agreement's success.", "What do historians differ over?", ["Whether the negotiations took place", "Whether the secrecy was essential to the agreement's success", "The date of the announcement"], 1, "«Whether the secrecy was essential to the agreement's success».");
  R(r, "A new generation of sensors promises to monitor pollution with unprecedented granularity. However, the data they generate raise questions about ownership, privacy and the capacity of local authorities to interpret them.", "What questions do the data raise?", ["Only technical ones", "Questions about ownership, privacy and interpretation", "Questions about pricing"], 1, "«Ownership, privacy and the capacity of local authorities to interpret them».");
  R(r, "The painter's late canvases have been reassessed by critics who once dismissed them as incoherent. Recent exhibitions suggest that the works were deliberately fragmented, reflecting the artist's growing scepticism about representation.", "Why were the late canvases fragmented, according to recent exhibitions?", ["By accident", "Deliberately, reflecting scepticism about representation", "Because the paint was cheap"], 1, "«Deliberately fragmented, reflecting ... scepticism about representation».");
  R(r, "The parliamentary inquiry has concluded that the agency lacked clear lines of accountability. Its recommendations include a restructuring of the chain of command and the appointment of an independent ombudsman.", "What does the inquiry recommend?", ["Abolishing the agency", "An independent ombudsman and a restructured chain of command", "Lower salaries"], 1, "«An independent ombudsman and a restructuring of the chain of command».");
  R(r, "Biologists have documented a striking case of rapid adaptation in urban birds. Populations in cities have altered their song frequency to be heard above traffic noise, a change that appears to have occurred within a few decades.", "Within what period did the change appear to occur?", ["Several centuries", "A few decades", "A single year"], 1, "«Within a few decades».");
  R(r, "The foundation's annual report stresses that its grants are allocated through a process of open competition. Critics, however, observe that a disproportionate share of the funding goes to institutions already well established.", "What do critics observe?", ["That the grants are not competitive", "That much of the funding goes to already established institutions", "That the foundation has closed"], 1, "«A disproportionate share of the funding goes to institutions already well established».");
  RT(r, "The transition to renewable energy has created new jobs in engineering and maintenance, yet many displaced workers from fossil fuel industries lack the training to fill these roles. Policymakers have begun to design retraining schemes.", "What have policymakers begun to design?", ["Retraining schemes"], "«Retraining schemes».");
  R(r, "A close reading of the diary reveals a writer deeply conflicted about her public persona. Its entries alternate between confident declarations and private doubts that the author plainly never intended to publish.", "What do the entries alternate between?", ["Public praise and criticism", "Confident declarations and private doubts", "Poetry and prose"], 1, "«Confident declarations and private doubts».");
  R(r, "The company's internal memo, leaked to the press, acknowledges that its safety testing had been rushed. The executives insist the product remains safe, though they have agreed to an independent review.", "What have the executives agreed to?", ["Halt production", "An independent review", "A public apology"], 1, "«An independent review».");
  R(r, "Phonologists have long assumed that vowel shifts occur gradually across speech communities. A new analysis of recordings from the twentieth century, however, suggests that some changes spread abruptly through specific social networks.", "How do the recordings suggest some changes spread?", ["Gradually across the whole community", "Abruptly through specific social networks", "Not at all"], 1, "«Abruptly through specific social networks».");

  L(l, "Man: The regulator has been criticised for its slow response to the complaints. Woman: To be fair, its statutory powers are limited, and the complaints raised issues outside its remit.", "Why was the regulator's response limited?", ["Its statutory powers are limited", "It lacks staff", "It ignored the complaints"], 0, "«Its statutory powers are limited».");
  L(l, "Girl: The new exhibition reframes the colonial collection in light of recent research. Boy: It does so with real sensitivity, though some visitors may find the approach unsettling.", "What might some visitors find unsettling?", ["The approach", "The price", "The lighting"], 0, "«Some visitors may find the approach unsettling».");
  L(l, "Woman: The commission's interim report has been received with a mixture of relief and scepticism. Man: Relief that it exists, perhaps, but its conclusions are tentative at best.", "How does the man describe the conclusions?", ["Tentative at best", "Conclusive", "Controversial"], 0, "«Its conclusions are tentative at best».");
  L(l, "Boy: The author's decision to publish under a pseudonym has fuelled much speculation. Girl: I suspect she wanted the work judged on its merits rather than her reputation.", "Why does the girl think the author used a pseudonym?", ["To have the work judged on its merits", "To avoid royalties", "To mislead publishers"], 0, "«Judged on its merits rather than her reputation».");
  L(l, "Man: The district's flood defences were designed for a different climate. Woman: Which is why the council is now proposing a complete reassessment of its risk models.", "What is the council proposing?", ["A complete reassessment of its risk models", "The demolition of the defences", "A tax increase"], 0, "«A complete reassessment of its risk models».");
  L(l, "Woman: The chancellor's budget has been welcomed by business groups, but trade unions fear that the cuts to public services will prove damaging. Man: Their fears are not unfounded, given the scale of the reductions.", "What do the trade unions fear?", ["That the cuts to public services will prove damaging", "That business taxes will rise", "That the budget will be delayed"], 0, "«Cuts to public services will prove damaging».");
  L(l, "Girl: The evaluation found that the programme had improved literacy, but the gains were uneven across schools. Boy: That unevenness is the real story, I think.", "What does the boy think is the real story?", ["The unevenness of the gains across schools", "The improvement in literacy", "The cost of the programme"], 0, "«That unevenness is the real story».");
  L(l, "Man: The ambassador has been recalled for consultations. Woman: That usually signals serious disagreement, though officials insist it is routine.", "What do officials insist about the recall?", ["That it is routine", "That it is a punishment", "That it is permanent"], 0, "«Insist it is routine».");
  LT(l, "Boy: The new cathedral roof has been completed on schedule, which is remarkable given the complexity of the restoration. Girl: The craftsmen deserve much of the credit for that.", "What does the girl credit for the timing?", ["The craftsmen"], "«The craftsmen deserve much of the credit».");
  L(l, "Woman: The new procedure has reduced complications by a quarter, though it is considerably more expensive. Man: The question is whether the savings in aftercare justify the initial outlay.", "What is the question the man raises?", ["Whether the savings in aftercare justify the outlay", "Whether the procedure should be banned", "Whether the complications are rising"], 0, "«Whether the savings in aftercare justify the initial outlay».");
  L(l, "Man: The symposium's keynote speaker challenged the prevailing methodology in a provocative way. Woman: Provocative, but I think she overstated her case considerably.", "How does the woman assess the keynote?", ["She overstated her case", "She was entirely correct", "She was irrelevant"], 0, "«She overstated her case considerably».");
  L(l, "Girl: The union has rejected the employer's latest offer, citing the continued lack of guarantees on pensions. Boy: The employer will say it has moved significantly, but the members see things differently.", "What have the union members done?", ["Rejected the offer", "Accepted the offer", "Left the union"], 0, "«Has rejected the employer's latest offer».");
  L(l, "Woman: The new director has inherited a deeply divided organisation. Man: Yes, though her early decisions suggest she intends to build consensus rather than impose a vision.", "What does the man say about the director's approach?", ["She intends to build consensus", "She intends to impose a vision", "She intends to resign"], 0, "«Build consensus rather than impose a vision».");
  L(l, "Boy: The editors have decided to retain the controversial passage, arguing that it is essential to the author's argument. Girl: I think that's a principled decision, even if it will provoke complaints.", "Why did the editors keep the passage?", ["It is essential to the author's argument", "It was requested by the author", "It was cheap to print"], 0, "«Essential to the author's argument».");
  L(l, "Man: The investigators have uncovered a pattern of irregular payments over several years. Woman: That suggests the problem was systemic rather than an isolated lapse.", "What does the woman say the problem was?", ["Systemic rather than an isolated lapse", "A single error", "Due to new staff"], 0, "«Systemic rather than an isolated lapse».");
  L(l, "Girl: The conservatoire's new scholarship scheme aims to widen participation among students from disadvantaged backgrounds. Boy: It's a worthy aim, although the scheme is modest and will benefit only a handful of students.", "How many students will benefit?", ["Only a handful", "Hundreds", "Every student"], 0, "«Only a handful of students».");
  L(l, "Woman: The surveyor's report reveals serious structural problems in the eastern wing. Man: Serious, yes, but the recommended repairs are less drastic than the rumours suggested.", "How are the recommended repairs described?", ["Less drastic than the rumours suggested", "More drastic than expected", "Impossible"], 0, "«Less drastic than the rumours suggested».");
  L(l, "Man: The team's analysis of the satellite data has identified an unexpected pattern of deforestation. Woman: That is alarming, although the pattern may reflect seasonal clearing rather than permanent loss.", "What might the pattern reflect?", ["Seasonal clearing rather than permanent loss", "Permanent urban growth", "Measurement errors only"], 0, "«Seasonal clearing rather than permanent loss».");
  L(l, "Boy: The university's senate has approved the new curriculum, despite objections from several departments. Girl: The objections were noted, but the senate felt that the overall direction was sound.", "What did the senate feel about the direction?", ["It was sound", "It was flawed", "It was unclear"], 0, "«The overall direction was sound».");
  L(l, "Woman: The findings of the research are impressive, but the sample consisted almost entirely of volunteers. Man: That limitation is serious. Volunteers are rarely representative of the wider population.", "Why does the man see the limitation as serious?", ["Volunteers are rarely representative of the wider population", "The findings are insignificant", "The research was too expensive"], 0, "«Volunteers are rarely representative of the wider population».");

  T(t, "Rewrite: 'The company has been forced to revise its forecasts because of unexpected costs.' → 'Unexpected costs have ___ the company to revise its forecasts.'", "Verbo «necessitate» o «compel».", ["necessitated", "compelled", "obliged", "prompted"], "«Compelled» o «necessitated».");
  T(t, "Rewrite: 'Few observers anticipated the outcome of the referendum.' → 'The outcome of the referendum ___ most observers.'", "Verbo «catch off guard».", ["caught", "took", "surprised"], "«Caught» o «took».");
  T(t, "Rewrite: 'The regulator is under pressure to act quickly.' → 'The regulator is ___ to act quickly.'", "Expresión «under pressure».", ["under pressure", "pressed", "pressured"], "«Under pressure».");
  T(t, "Rewrite: 'The author makes no attempt to hide her bias.' → 'The author ___ her bias.'", "Verbo «make no effort to conceal».", ["makes no effort to conceal", "does not conceal", "openly displays"], "«Makes no effort to conceal».");
  T(t, "Rewrite: 'The data fail to support the claim that the drug is effective.' → 'The data ___ the claim that the drug is effective.'", "Verbo «fail to substantiate».", ["fail to substantiate", "do not substantiate", "do not bear out"], "«Fail to substantiate».");
  T(t, "Rewrite: 'The government has refused to comment on the report.' → 'The government has ___ comment on the report.'", "Verbo «decline».", ["declined to", "declined", "refused to"], "«Declined to».");
  T(t, "Rewrite: 'Although the plan was ambitious, it was carried out successfully.' → 'Ambitious as the plan ___, it was carried out successfully.'", "Inversión con «as» y verbo «was».", ["was", "may have been", "had been"], "«Ambitious as the plan was».");
  T(t, "Rewrite: 'Their decision to withdraw came as a shock.' → 'Their decision to withdraw ___ a shock.'", "Verbo «come as».", ["came as", "was", "proved"], "«Came as».");
  T(t, "Rewrite: 'It is important that the minutes be accurate.' → 'The minutes ___ be accurate.'", "Verbo «must».", ["must", "need to", "have to"], "«Must».");
  T(t, "Rewrite: 'The study overlooked several significant variables.' → 'The study ___ several significant variables.'", "Verbo «neglect» u «omit».", ["neglected", "omitted", "failed to consider", "ignored"], "«Neglected» u «omitted».");
  T(t, "Rewrite: 'The results were not as clear as the researchers had hoped.' → 'The results were ___ than the researchers had hoped.'", "Expresión «less conclusive».", ["less conclusive", "less clear", "more ambiguous"], "«Less conclusive».");
  T(t, "Rewrite: 'Their objections were dismissed without serious consideration.' → 'Their objections were ___ without serious consideration.'", "Verbo «brush aside».", ["brushed aside", "dismissed out of hand", "summarily dismissed"], "«Brushed aside» o «dismissed out of hand».");
  T(t, "Rewrite: 'She managed to persuade the board to reconsider.' → 'She ___ the board into reconsidering.'", "Verbo «prevail upon» o «persuade».", ["prevailed upon", "persuaded", "induced"], "«Prevailed upon» o «persuaded».");
  T(t, "Rewrite: 'The data suggest a strong link between diet and health.' → 'The data ___ a strong link between diet and health.'", "Verbo «indicate» o «point to».", ["indicate", "point to", "imply", "suggest"], "«Indicate».");
  T(t, "Rewrite: 'The new evidence clearly contradicts the earlier account.' → 'The new evidence ___ the earlier account.'", "Verbo «belie».", ["belies", "contradicts", "refutes", "calls into question"], "«Belies» o «contradicts».");
  T(t, "Rewrite: 'The manager refused to take responsibility for the error.' → 'The manager ___ responsibility for the error.'", "Verbo «shirk».", ["shirked", "disclaimed", "evaded", "declined to accept"], "«Shirked».");
  T(t, "Rewrite: 'It is unlikely that the deadline will be extended.' → 'The deadline ___ extended.'", "Expresión «is unlikely to be».", ["is unlikely to be", "is not likely to be"], "«Is unlikely to be».");
  T(t, "Rewrite: 'The council was criticised for ignoring the residents' concerns.' → 'The council ___ for disregarding the residents' concerns.'", "Verbo «be taken to task».", ["was taken to task", "was rebuked", "was censured"], "«Was taken to task» o «censured».");
  EXTRA_ITEMS.push(...out);
})();

(function () {
  var out = [], LV = "C2";
  function push(o) { o.level = LV; out.push(o); }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }
  var g = "C2 · Gramática", r = "C2 · Lectura", l = "C2 · Escucha", t = "C2 · Reformulación";
  T(g, "The committee was ___ to a difficult choice between two equally strong candidates.", "Escribe la palabra que falta.", ["confronted"], "Participio «confronted with».");
  T(g, "Had the ministry ___ the risks, it would have commissioned a fuller assessment.", "Escribe la palabra que falta.", ["anticipated"], "Condicional mixto con participio: anticipated.");
  G(g, "The judgement ___ on the principle that the state must justify any infringement of rights.", ["rests", "resting", "rested"], 0, "Presente simple: rests on.");
  G(g, "Not a word ___ about the matter at the meeting, which surprised everyone.", ["was said", "said", "was saying"], 0, "Inversión negativa con «not a word» y pasiva.");
  T(g, "The novel ___ the disintegration of a family against the backdrop of war.", "Escribe la palabra que falta.", ["traces"], "Presente simple tercera persona: traces.");
  R(r, "The former governor's memoirs have been criticised for their selective account of the crisis. Historians note that key decisions are presented as inevitable, obscuring the debates that preceded them.", "What do historians note the memoirs do?", ["Present decisions as inevitable", "Present decisions as the result of open debate", "Omit the crisis entirely"], 0, "«Presented as inevitable, obscuring the debates».");
  R(r, "The association of small farmers has rejected the proposed subsidy reform. Its spokesperson argues that the new criteria favour large estates and would effectively exclude the most vulnerable producers.", "Whom does the spokesperson say the reform would exclude?", ["Large estates", "The most vulnerable producers", "Government officials"], 1, "«Exclude the most vulnerable producers».");
  R(r, "Recent work on the origins of the printing press emphasises the role of local craftsmen rather than a single inventor. Their collective experimentation, the authors argue, was more decisive than any individual breakthrough.", "What do the authors argue was more decisive?", ["A single inventor's breakthrough", "Collective experimentation by local craftsmen", "Government funding"], 1, "«Collective experimentation ... more decisive than any individual breakthrough».");
  R(r, "The judge's dissent reads less like a legal opinion than a moral appeal. It invokes the principle of equal dignity, which, she argues, the majority has allowed to be eroded by procedural formalism.", "What does the dissent invoke?", ["The principle of equal dignity", "Procedural formalism", "Commercial interests"], 0, "«The principle of equal dignity».");
  L(l, "Woman: The accounts show a surplus, but the reserves are lower than the auditors recommended. Man: Which means we have very little room for error if the market turns.", "What do the reserves show?", ["They are lower than recommended", "They exceed the recommendation", "They have been abolished"], 0, "«Lower than the auditors recommended».");
  L(l, "Man: The theatre's new artistic director has been praised for her daring programming. Woman: Daring, certainly, though a few critics feel the season lacks a coherent through-line.", "What do some critics feel the season lacks?", ["A coherent through-line", "Daring", "Famous actors"], 0, "«Lacks a coherent through-line».");
  L(l, "Girl: The policy paper argues for devolving powers to the regions. Boy: The argument is coherent, but it glosses over the fiscal consequences for the poorer ones.", "What does the boy say the paper glosses over?", ["The fiscal consequences for poorer regions", "The benefits of devolution", "The history of the regions"], 0, "«Glosses over the fiscal consequences for the poorer ones».");
  L(l, "Woman: The workshop was oversubscribed, so the organisers have added a second session. Man: That's a good sign, though it may strain the facilitators.", "What might be strained?", ["The facilitators", "The budget", "The venue's roof"], 0, "«May strain the facilitators».");
  T(t, "Rewrite: 'It was not clear whether the decision had been taken lawfully.' → 'It remained ___ whether the decision had been taken lawfully.'", "Verbo «unclear» o «moot».", ["unclear", "moot", "open"], "«Unclear» o «moot».");
  T(t, "Rewrite: 'The ministry has agreed to review its guidelines.' → 'The ministry has ___ to review its guidelines.'", "Verbo «undertake».", ["undertaken", "undertook", "committed"], "«Undertaken» o «committed».");
  EXTRA_ITEMS.push(...out);
})();

