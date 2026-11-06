import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel A2 (originales, al estilo de KET):
   gramática, lectura, escucha y reformulación sencilla. */
(function () {
  const out = [];
  const LV = "A2";
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

  const GR = "A2 · Gramática";
  G(GR, "Last summer we ___ to Portugal.", ["went", "go", "goes"], 0, "Pasado simple irregular: went.");
  G(GR, "She has ___ seen that film.", ["already", "yet", "still"], 0, "Already en afirmativa con present perfect.");
  G(GR, "Have you ___ been to London?", ["ever", "never", "yet"], 0, "Ever en preguntas de experiencia.");
  G(GR, "I haven't finished my homework ___.", ["yet", "already", "ever"], 0, "Yet en negativa, al final de la frase.");
  G(GR, "If it rains tomorrow, we ___ at home.", ["will stay", "would stay", "stayed"], 0, "Primer condicional: will + verbo base.");
  G(GR, "The letter ___ yesterday by my brother.", ["was posted", "posted", "is post"], 0, "Pasiva en pasado: was + participio.");
  G(GR, "This is the man ___ lives next door.", ["who", "which", "where"], 0, "Relativo para personas: who.");
  G(GR, "My car is ___ than yours.", ["faster", "more fast", "fastest"], 0, "Comparativo de fast: faster.");
  G(GR, "She is the ___ student in the class.", ["best", "better", "good"], 0, "Superlativo irregular: the best.");
  G(GR, "You ___ eat so much sugar. It's bad for you.", ["shouldn't", "don't should", "isn't"], 0, "Consejo negativo: shouldn't.");
  G(GR, "I'm ___ to the cinema with my friends tonight.", ["going", "go", "went"], 0, "Planes: going to.");
  G(GR, "When I was a child, I ___ to the beach every summer.", ["used to go", "use to go", "was go"], 0, "Hábito pasado: used to + verbo base.");
  G(GR, "He ___ working when the phone rang.", ["was", "were", "is"], 0, "Pasado continuo con he: was.");
  G(GR, "We ___ dinner when the lights went out.", ["were having", "have had", "are having"], 0, "Pasado continuo para una acción en curso.");
  G(GR, "Can you ___ me the way to the station?", ["show", "sell", "paint"], 0, "Show me the way.");
  G(GR, "There is ___ milk in the fridge, so we need to buy some.", ["not much", "not many", "much not"], 0, "Incontable: not much.");
  G(GR, "How ___ people were at the party?", ["many", "much", "long"], 0, "Contables: how many.");
  G(GR, "I'd like ___ tea, please.", ["a cup of", "a cup", "cups"], 0, "A cup of tea.");
  G(GR, "She asked me ___ I was from.", ["where", "what", "who"], 0, "Pregunta indirecta con lugar: where.");
  G(GR, "He said that he ___ tired.", ["was", "is", "be"], 0, "Estilo indirecto: was.");
  G(GR, "The film was ___ than I expected.", ["better", "gooder", "more good"], 0, "Comparativo irregular: better.");
  G(GR, "Let's ___ for a walk after lunch.", ["go", "going", "to go"], 0, "Let's + verbo base.");
  G(GR, "It's ___ expensive to live in the city centre.", ["very", "much", "many"], 0, "Very + adjetivo.");
  G(GR, "I'm looking forward ___ my holidays.", ["to", "at", "for"], 0, "Look forward to.");
  G(GR, "She ___ her keys. She can't open the door.", ["has lost", "lost", "is losing"], 0, "Resultado presente: present perfect.");
  G(GR, "Don't forget ___ the lights when you leave.", ["to turn off", "turning off", "turn off"], 0, "Forget to + infinitivo.");
  G(GR, "My sister is interested ___ painting.", ["in", "on", "at"], 0, "Interested in.");
  G(GR, "You must ___ a seatbelt in the car.", ["wear", "wearing", "to wear"], 0, "Modal + verbo base.");
  G(GR, "Every morning I ___ coffee before work.", ["drink", "drinks", "am drink"], 0, "Presente simple con I.");
  G(GR, "The children ___ in the garden at the moment.", ["are playing", "play", "played"], 0, "Ahora mismo: presente continuo.");
  G(GR, "I got up early ___ I could catch the train.", ["so that", "because", "although"], 0, "Para expresar finalidad: so that.");
  G(GR, "If I ___ rich, I would buy a big house.", ["were", "was going to", "will be"], 0, "Condicional 2 con «were».");
  G(GR, "Sorry, I ___ your name. Can you repeat it?", ["didn't catch", "don't catch", "wasn't catch"], 0, "Pasado simple en negativa.");
  G(GR, "My parents ___ married for thirty years.", ["have been", "are", "were been"], 0, "Duración hasta ahora: present perfect continuo o simple.");
  G(GR, "Mum, ___ you help me with my homework?", ["could", "must", "did"], 0, "Could para pedir favores con educación.");
  G(GR, "The shop ___ on Sundays, so we went on Saturday.", ["is closed", "closes", "is close"], 0, "Estado: is closed.");
  G(GR, "I don't know ___ to go for my holidays.", ["where", "what", "which"], 0, "Where to go.");
  G(GR, "This exercise is ___ than the last one.", ["more difficult", "difficulter", "most difficult"], 0, "Comparativo de adjetivo largo.");
  G(GR, "Peter ___ at the hospital since last year.", ["has worked", "worked", "works"], 0, "Since + present perfect.");

  const RD = "A2 · Lectura";
  R(RD, "Dear Sam, I'm sorry I missed your party. I had a cold and stayed in bed all weekend. See you soon, Lisa.", "Why did Lisa miss the party?", ["She was working", "She had a cold", "She was on holiday"], 1, "Tenía un resfriado.");
  R(RD, "The new café on Main Street opens at seven every morning. It sells cakes, sandwiches and great coffee.", "When does the café open?", ["At seven", "At nine", "At noon"], 0, "A las siete.");
  R(RD, "Tom wants to buy a new bike. He has been saving money for three months and now he has enough.", "What has Tom been doing?", ["Riding his bike", "Saving money", "Selling his bike"], 1, "Ahorrando dinero.");
  R(RD, "Visitors must show their ticket at the gate. Children under five can enter for free.", "Who can enter for free?", ["Children under five", "Visitors with a ticket", "Adults"], 0, "Niños menores de cinco años.");
  R(RD, "Last week Emma went to the doctor because her back hurt. The doctor gave her some tablets and told her to rest.", "Why did Emma go to the doctor?", ["Her back hurt", "She had a cold", "She lost her bag"], 0, "Le dolía la espalda.");
  R(RD, "The library is closed on Mondays. On other days it opens from ten until eight.", "When is the library closed?", ["On Mondays", "On Sundays", "After eight"], 0, "Los lunes.");
  R(RD, "My grandfather is a great cook. He makes the best soup in the family, and everyone asks him for the recipe.", "What is the grandfather good at?", ["Cooking", "Painting", "Driving"], 0, "Cocinar.");
  R(RD, "The school trip to the zoo was cancelled because of the rain. It will take place next month instead.", "What happened to the school trip?", ["It was cancelled", "It was a success", "It went to the museum"], 0, "Se canceló por la lluvia.");
  R(RD, "Hi Jo! We are at the hotel now. The room is small but the view is wonderful. Love, Mark.", "What is the view like?", ["Terrible", "Wonderful", "Boring"], 1, "Es maravillosa.");
  R(RD, "Our school is building a new gym. It will be ready by next September, and students can use it after lessons.", "When will the gym be ready?", ["Next September", "Last year", "Next week"], 0, "El próximo septiembre.");
  R(RD, "Anna doesn't like cold weather, so she always goes to Spain in winter. She says the sun makes her happy.", "Why does Anna go to Spain in winter?", ["She likes cold weather", "She doesn't like cold weather", "She works there"], 1, "No le gusta el frío.");
  R(RD, "Please remember to bring your own towel to the swimming pool. Towels cannot be rented at the desk.", "What must you bring to the pool?", ["A towel", "A swimsuit only", "Money"], 0, "Una toalla.");
  R(RD, "Last Saturday Max and his friends played football in the park. They won the game three to one.", "What was the score?", ["Three to one", "One to three", "Two to two"], 0, "Ganaron tres a uno.");
  R(RD, "The bus is usually late in the morning, so I always leave home twenty minutes earlier.", "Why does the writer leave early?", ["The bus is usually late", "The bus is free", "The writer likes walking"], 0, "El autobús suele llegar tarde.");
  R(RD, "Maria is learning to play the guitar. She practises for half an hour every evening.", "How long does Maria practise each evening?", ["Half an hour", "One hour", "Ten minutes"], 0, "Media hora.");
  R(RD, "The hotel has a pool, a gym and free wifi. Breakfast is served from seven to ten.", "What time is breakfast served?", ["From seven to ten", "From ten to twelve", "All day"], 0, "De siete a diez.");
  R(RD, "I lost my phone on the train yesterday. I went to the station office and a kind man gave it back to me.", "What happened to the phone?", ["It was lost and then returned", "It was sold", "It is still lost"], 0, "Lo recuperó.");
  R(RD, "Kids love the new playground. It has slides, swings and a big sandpit.", "What is in the playground?", ["Slides, swings and a sandpit", "A pool", "A football pitch"], 0, "Toboganes, columpios y arenero.");
  R(RD, "Our teacher says we should read in English every day, even for ten minutes. It helps us learn new words.", "What does the teacher recommend?", ["Reading every day", "Watching TV", "Sleeping more"], 0, "Leer cada día.");
  R(RD, "Jack is going to move to Edinburgh next month. He has already found a flat near the university.", "What has Jack already done?", ["He has found a flat", "He has sold his car", "He has left his job"], 0, "Ya ha encontrado piso.");
  R(RD, "Please keep this room tidy. Put your books on the shelf and your bags under the table.", "Where should you put your bags?", ["On the shelf", "Under the table", "On the bed"], 1, "Debajo de la mesa.");
  R(RD, "The concert was amazing! The band played all their famous songs and the crowd sang along.", "How was the concert?", ["Boring", "Amazing", "Too short"], 1, "Fue increíble.");
  R(RD, "Nina has two dogs and a cat. The dogs love long walks, but the cat prefers to sleep all day.", "What does the cat like to do?", ["Go for walks", "Sleep all day", "Play football"], 1, "Dormir todo el día.");
  R(RD, "If you want to join the club, fill in the form and give it to the teacher before Friday.", "When must the form be given in?", ["Before Friday", "After Monday", "On Sunday"], 0, "Antes del viernes.");
  R(RD, "Mark can't come to the meeting because he is ill. He will send his report by email instead.", "How will Mark send his report?", ["By email", "By post", "He will bring it"], 0, "Por correo electrónico.");
  R(RD, "The museum was built in 1900. Every year, thousands of visitors come to see its dinosaur collection.", "What is the museum famous for?", ["Its dinosaur collection", "Its paintings", "Its garden"], 0, "Su colección de dinosaurios.");
  R(RD, "My brother works in a supermarket on weekends. He stacks the shelves and helps customers.", "What does the brother do on weekends?", ["He works in a supermarket", "He goes to school", "He sleeps"], 0, "Trabaja en un supermercado.");

  const LI = "A2 · Escucha";
  L(LI, "Man: Do you want to go swimming on Saturday? Woman: I'd love to, but I have to visit my gran.", "What does the woman have to do on Saturday?", ["Go swimming", "Visit her gran", "Work"], 1, "Visitar a su abuela.");
  L(LI, "Woman: What time does the film start? Man: At half past seven. We should be there by seven.", "When should they arrive?", ["At seven", "At half past seven", "At eight"], 0, "A las siete.");
  L(LI, "Boy: I've bought a new computer game. Girl: Really? Can I play it after school?", "What has the boy bought?", ["A computer game", "A new bike", "A phone"], 0, "Un videojuego.");
  L(LI, "Man: Excuse me, where is the nearest chemist? Woman: Go straight on and turn right at the church.", "Where does the woman tell the man to turn?", ["Left at the church", "Right at the church", "Right at the bank"], 1, "A la derecha de la iglesia.");
  L(LI, "Mum: Did you finish your homework? Son: Not yet. I'll do it after dinner.", "When will the son do his homework?", ["Before dinner", "After dinner", "Tomorrow"], 1, "Después de cenar.");
  L(LI, "Woman: How was your holiday? Man: Great! The weather was perfect and the food was delicious.", "How was the man's holiday?", ["Terrible", "Great", "Average"], 1, "Muy bueno.");
  L(LI, "Girl: Could you help me carry these bags? Dad: Of course. Are they heavy?", "What does the girl ask her dad?", ["To carry the bags", "To buy bags", "To cook dinner"], 0, "Ayudarla con las bolsas.");
  L(LI, "Man: Which room do you want? Woman: The one with the sea view, please.", "Which room does the woman want?", ["The one with the sea view", "The one near the lift", "The cheapest one"], 0, "La que tiene vistas al mar.");
  L(LI, "Boy: I'm tired of studying. Mum: Take a break, then. A short walk will help.", "What does the mum suggest?", ["Studying harder", "Taking a short walk", "Going to bed"], 1, "Dar un paseo corto.");
  L(LI, "Woman: We're going to paint the kitchen this weekend. Man: Great idea. I'll buy the paint on Friday.", "When will the man buy the paint?", ["On Friday", "On Saturday", "On Sunday"], 0, "El viernes.");
  L(LI, "Girl: Is the museum open today? Man: No, it's closed on Tuesdays. Come tomorrow.", "Why can't they visit the museum today?", ["It's closed on Tuesdays", "It's raining", "It's too expensive"], 0, "Cierra los martes.");
  L(LI, "Boy: How much was the ticket? Girl: Ten pounds, and it included a drink.", "What was included in the ticket?", ["A drink", "A map", "A souvenir"], 0, "Una bebida.");
  L(LI, "Man: Shall we take the train or the bus? Woman: The train is faster, so let's take that.", "How will they travel?", ["By bus", "By train", "By car"], 1, "En tren, es más rápido.");
  L(LI, "Mum: Did you call Grandma? Son: Yes, she sends her love and wants to see us next week.", "When does Grandma want to see them?", ["Next week", "Tomorrow", "Next month"], 0, "La semana que viene.");
  L(LI, "Woman: I'm going to learn to swim this year. Man: That's a good plan. Start with a class.", "What does the man suggest?", ["Starting with a class", "Buying a boat", "Swimming alone"], 0, "Empezar con una clase.");
  L(LI, "Girl: The shop is closed. Boy: It opens at nine tomorrow, so we can come back then.", "When does the shop open?", ["Tonight", "At nine tomorrow", "At nine today"], 1, "Mañana a las nueve.");
  L(LI, "Man: Have you seen my glasses? Woman: They're on the table next to the TV.", "Where are the glasses?", ["On the table", "On the sofa", "In the car"], 0, "En la mesa.");
  L(LI, "Boy: Can I borrow your pen? Girl: Sure, but please give it back before the test.", "What does the girl want?", ["The boy to give the pen back before the test", "The boy to buy a pen", "The boy to write a letter"], 0, "Que se la devuelva antes del examen.");
  L(LI, "Woman: Our flight leaves at six in the morning. Man: Then we should get a taxi at four.", "When should they get a taxi?", ["At four", "At six", "At seven"], 0, "A las cuatro.");
  L(LI, "Girl: I'm really hungry. Dad: Lunch will be ready in ten minutes.", "When will lunch be ready?", ["In ten minutes", "Now", "In an hour"], 0, "En diez minutos.");
  L(LI, "Man: Why is the road closed? Woman: They are repairing the bridge. It should open next week.", "Why is the road closed?", ["Repairs to the bridge", "A football match", "A parade"], 0, "Reparan el puente.");
  L(LI, "Boy: I've been to Italy three times. Girl: Wow! What is your favourite city?", "How many times has the boy been to Italy?", ["Three times", "Two times", "Five times"], 0, "Tres veces.");
  L(LI, "Woman: Where did you put the keys? Man: I think I left them in the car.", "Where does the man think the keys are?", ["In the car", "In the kitchen", "In his bag"], 0, "En el coche.");
  L(LI, "Girl: Let's invite Tom to the party. Boy: Good idea, but he's away until Friday.", "When will Tom be back?", ["On Friday", "On Monday", "Today"], 0, "El viernes.");
  L(LI, "Man: The meeting has been moved to Thursday. Woman: Thanks for telling me. I'll update my calendar.", "When is the meeting now?", ["On Thursday", "On Wednesday", "On Friday"], 0, "El jueves.");
  L(LI, "Mum: Which dress do you want to wear? Girl: The blue one, because it's my favourite.", "Which dress does the girl choose?", ["The blue one", "The red one", "The green one"], 0, "El azul.");

  G(GR, "My friends ___ to the party yesterday, but I stayed at home.", ["went", "go", "gone"], 0, "Pasado simple: went.");
  G(GR, "You ___ wear a coat today. It's warm outside.", ["don't need to", "mustn't", "needn't"], 0, "Don't need to = no hace falta.");
  G(GR, "I think it ___ rain later.", ["will", "is going", "would"], 0, "Predicción sin evidencia: will.");
  G(GR, "She speaks English ___ than her brother.", ["better", "more good", "gooder"], 0, "Comparativo irregular de well: better.");
  R(RD, "Ella's train was delayed by twenty minutes, so she missed the first part of the meeting.", "Why did Ella miss the first part of the meeting?", ["Her train was late", "She was ill", "The meeting was cancelled"], 0, "El tren llegó tarde.");
  R(RD, "Our neighbours are moving to Bilbao next year. They say they will miss the park near our house.", "Where are the neighbours moving?", ["To Bilbao", "To the park", "To another house on our street"], 0, "A Bilbao.");
  L(LI, "Woman: Have you ever tried sushi? Man: Yes, twice. I really liked it.", "How many times has the man tried sushi?", ["Once", "Twice", "Never"], 1, "Dos veces.");
  L(LI, "Boy: Our club meets on Wednesdays at five. Girl: I can't come on Wednesdays, but I'll try on Thursdays.", "When can the girl come?", ["On Wednesdays", "On Thursdays", "On Fridays"], 1, "Los jueves.");

  G(GR, "When we arrived at the park, the children ___ football.", ["were playing", "played", "play"], 0, "Pasado continuo para una acción en curso.");
  G(GR, "I'm not very good ___ cooking.", ["at", "in", "for"], 0, "Good at = bueno en.");
  R(RD, "The bakery on the corner sells fresh bread every morning. It is closed on Sundays.", "When is the bakery closed?", ["On Sundays", "On Mondays", "Every morning"], 0, "Los domingos.");
  L(LI, "Girl: Are you coming to the match? Boy: I'd love to, but I have to finish my project first.", "Why can't the boy go to the match?", ["He has to finish a project", "He is ill", "The match is cancelled"], 0, "Tiene que acabar un proyecto.");
  G(GR, "She ___ her bike to school yesterday.", ["rode", "rides", "riding"], 0, "Pasado simple irregular: rode.");
  ITEMS.push(...out);
})();
