import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel B1 (originales, al estilo de PET):
   gramática, lectura, escucha y reformulación. */
(function () {
  const out = [];
  const LV = "B1";
  function push(o) {
    o.level = LV;
    if (ITEMS.concat(out).some(x => x.level === LV && x.q === o.q && (x.passage || x.audio || "") === (o.passage || o.audio || ""))) return; /* sin duplicados */
    /* Reparte la respuesta correcta entre las posiciones (no siempre la primera) */
    if (o.options && o.options.length > 1) {
      const n = o.options.length, k = out.length % n;
      o.options = o.options.slice(k).concat(o.options.slice(0, k));
      o.answer = (o.answer - k + n) % n;
    }
    out.push(o);
  }
  function G(part, q, o, a, e) { push({ type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { push({ type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { push({ type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { push({ type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  const GR = "PET · Use of English";
  G(GR, "If I ___ you, I would apologise to her.", ["were", "was", "am"], 0, "Condicional 2: if I were you.");
  G(GR, "The bridge ___ built in 1890.", ["was", "is", "has"], 0, "Pasiva en pasado simple.");
  G(GR, "She asked me ___ I had finished the report.", ["whether", "that", "what"], 0, "Pregunta indirecta sí/no: whether o if.");
  G(GR, "He ___ be at home now. His car is outside.", ["must", "can", "should"], 0, "Deducción segura: must be.");
  G(GR, "I wish I ___ more time to study.", ["had", "have", "would have"], 0, "Wish + pasado simple para presente.");
  G(GR, "By the time you arrive, I ___ dinner.", ["will have cooked", "will cook", "cook"], 0, "Futuro perfecto con by the time.");
  G(GR, "Tom ___ playing tennis since he was ten.", ["has been", "was", "is"], 0, "Duración hasta ahora: present perfect continuo.");
  G(GR, "The man ___ car was stolen is very upset.", ["whose", "who", "which"], 0, "Relativo posesivo: whose.");
  G(GR, "She suggested ___ to the cinema.", ["going", "to go", "go"], 0, "Suggest + -ing.");
  G(GR, "I'd rather you ___ tell him about it yet.", ["didn't", "don't", "won't"], 0, "I'd rather + pasado simple.");
  G(GR, "The children were told ___ quiet in the library.", ["to be", "be", "being"], 0, "Tell + persona + to + infinitivo.");
  G(GR, "She made me ___ the mess in the kitchen.", ["clean up", "cleaning up to", "to clean up"], 0, "Make + persona + infinitivo sin to.");
  G(GR, "___ the rain, we enjoyed the trip.", ["Despite", "Although", "However"], 0, "Despite + sustantivo o -ing.");
  G(GR, "I'll call you as soon as I ___ home.", ["get", "will get", "got"], 0, "Tras as soon as: presente simple (futuro en sentido).");
  G(GR, "You needn't ___ the dishes. I'll do them later.", ["wash", "to wash", "washing"], 0, "Needn't + verbo base.");
  G(GR, "The meeting ___ because the manager was ill.", ["was cancelled", "cancelled", "has cancel"], 0, "Pasiva en pasado.");
  G(GR, "He is ___ to speak three languages.", ["able", "capable", "possible"], 0, "Be able to.");
  G(GR, "She plays the piano ___ than her sister.", ["better", "more good", "more well"], 0, "Comparativo irregular de well: better.");
  G(GR, "Had we known about the storm, we ___ earlier.", ["would have left", "would leave", "left"], 0, "Tercer condicional con inversión: would have left.");
  G(GR, "I'm not used ___ getting up so early.", ["to", "for", "at"], 0, "Be used to + -ing.");
  G(GR, "The more you practise, ___ you will get.", ["the better", "better", "more good"], 0, "The more..., the better.");
  G(GR, "Don't forget ___ the windows before you leave.", ["to close", "closing", "close"], 0, "Forget/remember to + infinitivo para algo pendiente.");
  G(GR, "She ___ her homework when the teacher came in.", ["had just finished", "just finished", "has just finish"], 0, "Had just + participio para algo justo antes de otra acción.");
  G(GR, "They ___ the film before, so they didn't want to see it again.", ["had already seen", "already saw", "have already see"], 0, "Pasado perfecto para algo anterior.");
  G(GR, "Jack, ___ is a famous actor, lives in our street.", ["who", "which", "whose"], 0, "Relativo de persona con comas: who.");
  G(GR, "If we ___ earlier, we would have caught the bus.", ["had left", "left", "would leave"], 0, "Tercer condicional.");
  G(GR, "It's the second time I ___ this book.", ["have read", "read", "am reading"], 0, "Second time con present perfect.");
  G(GR, "You ___ bring your own pen to the exam. The school provides them.", ["don't have to", "mustn't", "shouldn't"], 0, "Don't have to = no es necesario.");
  G(GR, "Whatever you decide, I ___ support you.", ["will", "would", "am going"], 0, "Compromiso futuro: will.");
  G(GR, "The food was so ___ that we ate everything.", ["delicious", "deliciously", "deliciousness"], 0, "Adjetivo tras was.");
  G(GR, "I'm sorry I ___ your birthday. I was very busy.", ["forgot", "forget", "have forgot"], 0, "Pasado simple para una acción terminada.");
  G(GR, "The lift ___ out of order, so we took the stairs.", ["was", "is", "were been"], 0, "Pasado de is: was.");

  const RD = "PET · Reading";
  R(RD, "Ben has been working at the bakery for two years. He gets up at five every morning to bake bread before the shop opens.", "What time does Ben get up?", ["At five", "At seven", "At nine"], 0, "A las cinco.");
  R(RD, "Visitors are reminded that photography is not allowed inside the museum. Please leave your bags in the lockers near the entrance.", "What must visitors do with their bags?", ["Put them in the lockers", "Take them inside", "Leave them outside"], 0, "Dejarlas en las taquillas.");
  R(RD, "Lara wanted to learn to surf, so she booked three lessons. On the first day she fell into the water many times, but she was determined to continue.", "How did Lara feel about the lessons?", ["Bored", "Determined", "Angry"], 1, "Decidida a continuar.");
  R(RD, "The new train line will reduce the journey time between the two cities by half. Work will begin next spring.", "When will the work start?", ["Next spring", "Last year", "Next winter"], 0, "La próxima primavera.");
  R(RD, "Dear Mrs Lee, thank you for your letter. Unfortunately, the course is full this term, but we will add your name to the waiting list.", "What will the school do with the letter writer's name?", ["Add it to a waiting list", "Delete it", "Send it to another school"], 0, "Lista de espera.");
  R(RD, "Many people think that cycling to work is dangerous. However, a recent study showed that cyclists in cities are safer than they expected.", "What did the study show?", ["Cycling is more dangerous", "Cyclists are safer than expected", "Nobody cycles to work"], 1, "Los ciclistas son más seguros de lo esperado.");
  R(RD, "The festival has music on four stages this year. Tickets for the main stage sold out within an hour, but there are still some for the smaller stages.", "What is still available?", ["Tickets for the main stage", "Tickets for the smaller stages", "Nothing"], 1, "Entradas para los escenarios pequeños.");
  R(RD, "Hotel guests can use the pool from seven in the morning until ten at night. Children must be accompanied by an adult at all times.", "What must children do at the pool?", ["Be with an adult", "Swim alone", "Arrive before seven"], 0, "Ir acompañados de un adulto.");
  R(RD, "Our school trip to the castle was great fun. The guide told us funny stories about the kings who had lived there.", "How did the writer feel about the trip?", ["It was great fun", "It was disappointing", "It was too short"], 0, "Fue muy divertido.");
  R(RD, "Jenny used to hate maths, but last year a new teacher changed her mind. Now she says it is her favourite subject.", "How does Jenny feel about maths now?", ["She hates it", "It is her favourite subject", "She doesn't study it"], 1, "Es su asignatura favorita.");
  R(RD, "The company has decided to close its office in London. Staff will be offered jobs in the Manchester branch instead.", "What will happen to the staff?", ["They will be offered jobs in Manchester", "They will be fired", "They will move to London"], 0, "Ofrecerán trabajo en Manchester.");
  R(RD, "A man who lives in our village has saved a dog from the river. The dog is now living happily with his family.", "What happened to the dog?", ["It is living with a family", "It drowned", "It ran away"], 0, "Vive feliz con una familia.");
  R(RD, "Tips for a good night's sleep: avoid coffee after lunch, switch off your phone an hour before bed, and keep your room cool.", "What should you do an hour before bed?", ["Drink coffee", "Switch off your phone", "Exercise"], 1, "Apagar el móvil.");
  R(RD, "The shop is having a sale this week. Everything in the summer section is half price, and you can get a free bag with purchases over fifty euros.", "What do you get free with purchases over fifty euros?", ["A bag", "A T-shirt", "A discount card"], 0, "Una bolsa.");
  R(RD, "Sam has never been abroad, but he has started learning French. He hopes to visit Paris next year with his friends.", "What does Sam hope to do next year?", ["Visit Paris", "Move to France", "Learn Spanish"], 0, "Visitar París.");
  R(RD, "Our flight was cancelled because of the fog. The airline offered us a hotel for the night and a free meal.", "What did the airline offer?", ["A hotel and a meal", "A refund only", "A new flight tomorrow"], 0, "Hotel y comida.");
  R(RD, "Please note that the library will be closed next Monday for maintenance. Books can be returned on Tuesday.", "When can books be returned?", ["On Monday", "On Tuesday", "On Sunday"], 1, "El martes.");
  R(RD, "Olivia loves painting. She has been to art classes since she was seven, and last month her picture won a prize.", "What happened last month?", ["She won a prize", "She stopped painting", "She moved abroad"], 0, "Ganó un premio.");
  R(RD, "The town council wants to build a new park near the river. Local people are invited to a meeting next week to share their ideas.", "What are local people invited to do?", ["Share their ideas", "Pay for the park", "Move away"], 0, "Compartir sus ideas.");
  R(RD, "Thomas started his own business after university. At first it was difficult, but now he has five employees and a busy shop.", "How many employees does Thomas have?", ["Three", "Five", "Ten"], 1, "Cinco.");
  R(RD, "Remember that the school photo will be taken on Thursday morning. Students should wear their uniform and arrive on time.", "What should students wear for the photo?", ["Their uniform", "Sports clothes", "Their own clothes"], 0, "El uniforme.");
  R(RD, "My cousin lives in a small village in the mountains. He says the air is fresh, but there are very few shops nearby.", "What is a disadvantage of his village?", ["There are few shops", "The air is dirty", "It is too big"], 0, "Pocas tiendas.");
  R(RD, "Hannah is nervous about her driving test on Friday. Her instructor says she is ready and that she should relax.", "How does Hannah feel?", ["Nervous", "Relaxed", "Bored"], 0, "Nerviosa.");
  R(RD, "The new software is easy to use, but it needs an update before it works on older computers. The company will release it in October.", "When will the update be released?", ["In October", "Next week", "Never"], 0, "En octubre.");
  R(RD, "When we arrived at the beach, it had already started raining, so we went to the cinema instead.", "Why did they go to the cinema?", ["It was raining", "The beach was closed", "They were tired"], 0, "Llovía.");
  R(RD, "Maria applied for the job last month. She has been waiting for a reply ever since, and she is starting to lose hope.", "How does Maria feel now?", ["Hopeful", "Less hopeful", "Excited"], 1, "Menos esperanzada.");

  const LI = "PET · Listening";
  L(LI, "Man: Have you decided what to do at the weekend? Woman: We're going to the coast, if the weather is nice.", "What will they do at the weekend?", ["Go to the coast", "Stay at home", "Visit relatives"], 0, "Ir a la costa.");
  L(LI, "Woman: The bus was late again this morning. Man: That's the third time this week. You should complain to the company.", "What does the man suggest?", ["Complaining to the company", "Taking a taxi", "Walking to work"], 0, "Quejarse a la empresa.");
  L(LI, "Girl: Did you enjoy the concert? Boy: It was amazing, but the sound system was too loud for my ears.", "What did the boy think of the concert?", ["It was amazing but too loud", "It was boring", "He didn't go"], 0, "Increíble pero muy alto.");
  L(LI, "Man: Could you pick up some bread on your way home? Woman: Sure, but the bakery closes at six.", "When does the bakery close?", ["At six", "At five", "At seven"], 0, "A las seis.");
  L(LI, "Woman: Shall we book a table for eight? Man: Let's make it half past seven, because my sister has a class at eight.", "What time will they eat?", ["At half past seven", "At eight", "At seven"], 0, "A las siete y media.");
  L(LI, "Boy: I think I've left my umbrella on the train. Girl: You should call the lost property office.", "What should the boy do?", ["Call the lost property office", "Buy a new umbrella", "Go home"], 0, "Llamar a objetos perdidos.");
  L(LI, "Man: I've applied for a job at the hospital. Woman: That's great! When will you find out?", "When will the man find out?", ["Next week", "Today", "Next year"], 0, "La semana que viene.");
  L(LI, "Girl: Our team lost the match yesterday. Boy: It's not the end of the season. We can still win the league.", "How does the boy feel about the team?", ["Hopeful", "Angry", "Bored"], 0, "Esperanzado.");
  L(LI, "Woman: I'm thinking of studying abroad next year. Man: Really? Which country? Woman: Probably Canada, because I want to improve my English.", "Why does the woman want to go to Canada?", ["To improve her English", "To find a job", "To visit family"], 0, "Para mejorar su inglés.");
  L(LI, "Boy: The museum has a new exhibition about space. Girl: I'd like to see it, but tickets are expensive on weekends.", "What is the girl's problem?", ["Tickets are expensive on weekends", "The museum is closed", "The exhibition is boring"], 0, "Las entradas son caras los fines de semana.");
  L(LI, "Man: Excuse me, is this seat taken? Woman: No, please sit down. The train is very crowded today.", "What does the woman say about the train?", ["It is very crowded", "It is empty", "It is late"], 0, "Muy llena.");
  L(LI, "Girl: I'm going to start going to the gym. Mum: That's a good idea. Try to go three times a week.", "How often does the mum suggest going?", ["Three times a week", "Every day", "Once a month"], 0, "Tres veces por semana.");
  L(LI, "Woman: Did you water the plants while I was away? Man: Yes, but I forgot the one in the bathroom.", "Which plant did the man forget?", ["The one in the bathroom", "The one in the garden", "All of them"], 0, "El del baño.");
  L(LI, "Man: Why are you so late? Girl: Sorry, the road was closed because of an accident.", "Why is the girl late?", ["The road was closed", "She overslept", "The bus broke down"], 0, "Carretera cortada.");
  L(LI, "Boy: My grandparents are coming to stay next month. Girl: Oh nice! Will they stay in your room?", "What does the girl ask?", ["Whether the grandparents will stay in the boy's room", "Where the bathroom is", "When they arrive"], 0, "Pregunta si se quedarán en la habitación del chico.");
  L(LI, "Woman: What's the best way to learn new words? Man: I write them in a notebook and review them every evening.", "What does the man do to learn words?", ["Writes them and reviews them", "Listens to music", "Uses a dictionary only"], 0, "Los escribe y repasa.");
  L(LI, "Girl: Did you see the new art gallery? Boy: Yes, it's in the old factory. The building is beautiful.", "Where is the art gallery?", ["In an old factory", "In a new building", "Next to the station"], 0, "En una antigua fábrica.");
  L(LI, "Man: Can we move the meeting to Friday? Woman: I'm afraid I'm busy then, but Thursday afternoon would be fine.", "When can the woman meet?", ["Thursday afternoon", "Friday", "Friday morning"], 0, "El jueves por la tarde.");
  L(LI, "Boy: I've finally finished my project. Mum: Well done! You must be very relieved.", "How does the boy probably feel?", ["Relieved", "Worried", "Confused"], 0, "Aliviado.");
  L(LI, "Woman: Do you know where the printer is? Man: It's on the second floor, but it's been broken since Monday.", "What is the problem with the printer?", ["It has been broken since Monday", "It is missing", "It is too slow"], 0, "Roto desde el lunes.");
  L(LI, "Girl: I'd like to adopt a cat. Dad: Let's talk about it after your exams, when you have more time.", "When does the dad want to talk about it?", ["After the exams", "Tomorrow", "Never"], 0, "Después de los exámenes.");
  L(LI, "Man: The shop was full of people. Woman: It's always busy before Christmas. We should have gone earlier.", "Why was the shop busy?", ["It was before Christmas", "It was a holiday", "There was a sale on Monday"], 0, "Antes de Navidad.");
  L(LI, "Boy: How long does it take to get to the airport? Woman: About forty minutes by car, but you should allow an hour during rush hour.", "How long should you allow during rush hour?", ["One hour", "Forty minutes", "Two hours"], 0, "Una hora.");
  L(LI, "Girl: Where did you go on holiday? Man: We went to the mountains. It was cold, but the views were incredible.", "What was the weather like?", ["Cold", "Hot", "Rainy"], 0, "Frío.");
  L(LI, "Woman: I think we should repaint the living room. Man: Good idea, but let's wait until next summer when we have more money.", "When does the man want to repaint?", ["Next summer", "Tomorrow", "Now"], 0, "El próximo verano.");

  G(GR, "The report ___ by the team before the deadline.", ["had been finished", "has finished", "finished"], 0, "Pasiva perfecta para algo anterior a otro momento del pasado.");
  G(GR, "I'd like to know ___ the train leaves.", ["when", "what time is", "that"], 0, "Pregunta indirecta con when.");
  G(GR, "She is taller ___ her mother.", ["than", "that", "as"], 0, "Comparativo: taller than.");
  G(GR, "Neither my brother ___ my parents like spicy food.", ["nor", "or", "neither"], 0, "Neither ... nor.");
  G(GR, "He told me he ___ to Paris the following week.", ["would go", "will go", "goes"], 0, "Estilo indirecto: will → would.");
  G(GR, "Unless you hurry, you ___ the bus.", ["will miss", "miss", "would miss"], 0, "Primer condicional con unless.");
  G(GR, "I ___ my glasses. I can't see the board.", ["have lost", "lost", "am losing"], 0, "Resultado presente: present perfect.");
  G(GR, "We are going to ___ the old house next year.", ["renovate", "renovated", "renovation"], 0, "Verbo base tras going to.");
  G(GR, "The film was so ___ that I fell asleep.", ["boring", "bored", "boringly"], 0, "Adjetivo -ing para describir la causa.");
  G(GR, "She ___ in this company since 2015.", ["has worked", "worked", "is working"], 0, "Since + present perfect.");
  R(RD, "Last week the council announced that the swimming pool will reopen after three months of repairs. The new pool will have a larger children's area.", "What will the new pool have?", ["A larger children's area", "A restaurant", "A car park"], 0, "Una zona infantil más grande.");
  R(RD, "Although Peter is only twelve, he already knows how to cook several dishes. He often helps his grandmother in the kitchen on Sundays.", "When does Peter help his grandmother?", ["On Sundays", "Every day", "On holidays"], 0, "Los domingos.");
  R(RD, "Customers who return a product within thirty days can get a full refund. The receipt must be shown at the till.", "What must customers show to get a refund?", ["The receipt", "The product box", "A bank card"], 0, "El recibo.");
  L(LI, "Man: Did you remember to send the email? Woman: Yes, I sent it this morning, before the meeting.", "When did the woman send the email?", ["This morning", "Last night", "After the meeting"], 0, "Esta mañana.");
  L(LI, "Girl: Why don't we go to the new Italian restaurant? Boy: That's a good idea, but I think it's fully booked on Friday.", "Why can't they go on Friday?", ["It's fully booked", "It's closed", "It's too expensive"], 0, "Está completo.");
  L(LI, "Woman: Our train was cancelled. Man: Don't worry, the next one leaves in twenty minutes from platform four.", "Which platform is the next train?", ["Platform four", "Platform two", "Platform nine"], 0, "Andén cuatro.");
  L(LI, "Boy: I'm really looking forward to the summer holidays. Girl: Me too. I'm planning to read lots of books.", "What is the girl planning to do?", ["Read lots of books", "Work in a shop", "Study maths"], 0, "Leer muchos libros.");

  G(GR, "She told me she ___ never been to Italy.", ["had", "has", "have"], 0, "Estilo indirecto: had.");
  G(GR, "If you ___ harder, you would pass the exam.", ["studied", "study", "will study"], 0, "Condicional 2 con studied.");
  R(RD, "The concert was postponed because the lead singer had lost her voice. Tickets will be valid for the new date.", "Why was the concert postponed?", ["The singer lost her voice", "The venue was closed", "The tickets were sold out"], 0, "La cantante perdió la voz.");
  L(LI, "Man: Have you finished reading the novel? Woman: Not yet, but I'm nearly at the end.", "How far has the woman read?", ["Nearly to the end", "Halfway", "She has not started"], 0, "Casi al final.");
  G(GR, "The guests ___ arrived by the time we got to the hotel.", ["had", "have", "has"], 0, "Pasado perfecto para una acción anterior.");
  ITEMS.push(...out);
})();
