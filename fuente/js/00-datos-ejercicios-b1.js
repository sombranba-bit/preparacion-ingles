/* Ejercicios B1 originales con la estructura de tareas del examen PET (Cambridge B1 Preliminary).
   Preguntas propias: no son preguntas de examen oficial. Cada bloque indica la parte del examen que imita. */
export const EXTRA_ITEMS = (function () {
  var out = [];
  function G(part, q, o, a, e) { out.push({ level: "B1", type: "grammar", q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function R(part, pass, q, o, a, e) { out.push({ level: "B1", type: "reading", passage: pass, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function L(part, audio, q, o, a, e) { out.push({ level: "B1", type: "listening", audio: audio, q: q, options: o, answer: a, explain: part + ": " + e, part: part }); }
  function LT(part, audio, q, acc, e) { out.push({ level: "B1", type: "listening", audio: audio, q: q, accepted: acc, explain: part + ": " + e, part: part }); }
  function T(part, q, hint, acc, e) { out.push({ level: "B1", type: "rephrase", q: q, hint: hint, accepted: acc, explain: part + ": " + e, part: part }); }

  var UE = "PET · Use of English";
  var RD1 = "PET · Reading P1 (texto corto, 3 opciones)";
  var RD3 = "PET · Reading P3 (texto largo, 4 opciones)";
  var LI1 = "PET · Listening P1 (3 opciones)";
  var LI2 = "PET · Listening P2 (diálogo, 3 opciones)";
  var LI3 = "PET · Listening P3 (rellenar huecos)";

  // Use of English: opción múltiple (gramática)
  G(UE, "She asked me ___ I had finished the report.", ["if","that","what","which"], 0, "Pregunta indirecta con «if».");
  G(UE, "By next June, I ___ here for ten years.", ["will work","will have worked","work","have worked"], 1, "Futuro perfecto para una duración hasta un punto futuro.");
  G(UE, "The bridge ___ built in 1890.", ["is","was","has been","had"], 1, "Pasiva en pasado simple.");
  G(UE, "He suggested ___ a taxi.", ["take","taking","to take","to taking"], 1, "«Suggest» + -ing.");
  G(UE, "Despite ___ tired, she finished the race.", ["being","to be","be","been"], 0, "«Despite» + -ing.");
  G(UE, "We'd better ___ before it gets dark.", ["leave","leaving","to leave","left"], 0, "«Had better» + infinitivo sin «to».");
  G(UE, "I wish I ___ speak French better.", ["can","could","would","will"], 1, "«Wish» + could para una habilidad.");
  G(UE, "Although it was raining, ___ went for a walk.", ["we","us","our","ours"], 0, "Pronombre sujeto.");
  G(UE, "The film was ___ boring that we left early.", ["so","such","too","very"], 0, "«So + adjetivo + that».");
  G(UE, "She has lived in Bilbao ___ 2015.", ["for","since","from","during"], 1, "«Since» con un año concreto.");
  G(UE, "Could you tell me where ___?", ["is the station","the station is","the station","station is"], 1, "Pregunta indirecta: sujeto antes del verbo.");
  G(UE, "You ___ smoke here. It's forbidden.", ["mustn't","needn't","don't have","may not"], 0, "«Mustn't» = prohibición.");
  G(UE, "I used to ___ in a small village when I was a child.", ["live","living","lived","to live"], 0, "«Used to» + infinitivo.");
  G(UE, "He was ___ tired to continue.", ["too","enough","so","very"], 0, "«Too + adjetivo + to».");
  G(UE, "The meeting, ___ was held on Monday, was cancelled.", ["which","who","whose","what"], 0, "Cláusula de relativo con «which» para cosas.");
  G(UE, "Neither my sister ___ my brother likes spicy food.", ["nor","or","and","but"], 0, "«Neither… nor».");
  G(UE, "I'm looking forward to ___ you again.", ["seeing","see","to see","saw"], 0, "«Look forward to» + -ing.");
  G(UE, "She made me ___ the door.", ["close","to close","closing","closed"], 0, "«Make» + infinitivo sin «to».");
  G(UE, "By the time I got to the station, the train ___.", ["had left","left","has left","was leaving"], 0, "Pasado perfecto: acción anterior a otra en el pasado.");
  G(UE, "If it ___ tomorrow, we'll cancel the picnic.", ["rains","will rain","rained","would rain"], 0, "Condicional 1: presente en la cláusula «if».");
  G(UE, "There's ___ milk in the fridge, so we need to buy some.", ["little","few","a few","many"], 0, "«Little» con sustantivo incontable.");
  G(UE, "He's ___ the best player in the team.", ["by far","far","much","very"], 0, "«By far» + superlativo.");
  G(UE, "We haven't got ___ sugar for the cake.", ["enough","too much","so","very"], 0, "«Enough» antes del sustantivo.");
  G(UE, "Kate ___ the shopping when the phone rang.", ["was doing","did","does","has done"], 0, "Pasado continuo para una acción interrumpida.");
  G(UE, "You ___ wear a seatbelt in the car. It's the law.", ["must","might","would","could"], 0, "«Must» = obligación por ley.");
  G(UE, "The students are ___ for the exam next week.", ["studying","study","studied","to study"], 0, "Presente continuo con sentido de futuro.");
  G(UE, "I'm ___ I can't come to the party.", ["afraid","afraid of","sorry of","fear"], 0, "«I'm afraid…» para dar una mala noticia.");
  G(UE, "There was ___ traffic on the motorway, so we arrived late.", ["heavy","high","strong","big"], 0, "Colocación: «heavy traffic».");
  G(UE, "Could you ___ me the time, please?", ["tell","say","speak","talk"], 0, "«Tell» + persona.");

  // Reading P1: textos cortos, 3 opciones
  R(RD1, "Please keep this door closed at all times. Thank you.", "What does the sign ask?", ["To leave the door open","To keep the door closed","To knock first"], 1, "El cartel pide mantener la puerta cerrada.");
  R(RD1, "Bus 42 will not stop at Park Road on Sundays.", "When does the bus skip Park Road?", ["On weekdays","On Sundays","Every day"], 1, "No para en Park Road los domingos.");
  R(RD1, "The gym is closed for cleaning on Tuesday morning. It opens again at 12.", "When can you use the gym on Tuesday?", ["From 12 p.m.","All morning","It's closed all day"], 0, "Abre de nuevo a las 12.");
  R(RD1, "Lost: small black umbrella near the library. Please call Sam on 555 0198.", "What should you do if you find it?", ["Return it to the library","Call Sam","Keep it"], 1, "Hay que llamar a Sam.");
  R(RD1, "Dear Tom, the meeting has moved from 3 to 4 p.m. Please bring the sales figures.", "What must Tom bring?", ["The sales figures","A new report","Nothing"], 0, "Debe traer las cifras de ventas.");
  R(RD1, "Our new café serves breakfast until 11 a.m. and lunch after that.", "When can you get lunch?", ["Only at breakfast","After 11 a.m.","Before 11 a.m."], 1, "El almuerzo se sirve después de las 11.");
  R(RD1, "Guests are asked to pay for the room on arrival.", "When do guests pay?", ["When they arrive","When they leave","Before they book"], 0, "Pagan al llegar.");
  R(RD1, "The swimming pool is open to members only this week.", "Who can use the pool this week?", ["Everyone","Only members","Only children"], 1, "Esta semana solo socios.");
  R(RD1, "Please remember to recycle your plastic bottles in the yellow bin.", "Which bin is for plastic bottles?", ["The yellow bin","The black bin","The green bin"], 0, "El contenedor amarillo es para envases de plástico.");
  R(RD1, "Attention passengers: the 9:15 train to Leeds is cancelled. Please use the 10:00 train.", "What should passengers do?", ["Take the 9:15 train","Take the 10:00 train","Wait for a bus"], 1, "Se pide usar el tren de las 10:00.");
  R(RD1, "Tickets for the concert are on sale online from Friday. Prices start at £20.", "How much is the cheapest ticket?", ["£10","£20","£25"], 1, "El precio más bajo empieza en 20 libras.");
  R(RD1, "Mum's birthday party is on Saturday at 7. Don't forget the cake!", "What should the reader bring?", ["A cake","Flowers","Nothing"], 0, "Hay que llevar la tarta.");
  R(RD1, "The hotel's wifi is free in the lobby but costs £5 a day in the rooms.", "Where is free wifi?", ["In the rooms","In the lobby","Nowhere"], 1, "Es gratis en el vestíbulo.");
  R(RD1, "Sorry, the lift is out of order. Please use the stairs.", "What should you do?", ["Use the stairs","Wait for the lift","Call a taxi"], 0, "El ascensor no funciona: usar las escaleras.");
  R(RD1, "Ana: I'm going to the market on Friday. Do you want anything?", "What is Ana doing on Friday?", ["Going to the market","Going to work","Going to school"], 0, "Va al mercado el viernes.");

  // Reading P3: texto largo, 4 opciones
  R(RD3, "Sofia moved to Edinburgh three years ago. At first she found the weather difficult, but she soon joined a choir, and now she says the city feels like home. She still misses her family in Spain, so she flies back every summer.", "Why does Sofia fly to Spain every summer?", ["Her job requires it","She misses her family","The weather is better there","She is joining a choir there"], 1, "Echa de menos a su familia.");
  R(RD3, "Last year the council planted 300 trees in the city centre. Residents complained at first that the work blocked the pavements, but most now agree that the streets are cooler and more pleasant in summer.", "What is the main idea of the text?", ["The council wants to close the streets","Residents were happy about the trees from the start","The trees have improved the city, after some early complaints","The trees were removed after complaints"], 2, "Los árboles mejoraron la ciudad tras quejas iniciales.");
  R(RD3, "Many people think learning a language is about memorising words. However, teachers say the most effective method is to practise speaking every day, even for only ten minutes, because this builds confidence.", "According to teachers, what is most effective?", ["Memorising long lists of words","Speaking for ten minutes a day","Reading grammar books","Watching films only"], 1, "Hablar diez minutos cada día.");
  R(RD3, "The museum's new exhibition shows paintings from the 19th century. Visitors can also use a free app that explains each picture in English, Spanish and French.", "What does the free app do?", ["It sells paintings","It explains pictures in three languages","It books tickets","It records the visitor's voice"], 1, "Explica los cuadros en tres idiomas.");
  R(RD3, "When Ali lost his job, he was worried about money. He decided to take a short course in web design. Six months later he had a new job, and he now works from home two days a week.", "What did Ali do after losing his job?", ["He moved abroad","He took a short course","He opened a shop","He retired"], 1, "Hizo un curso corto de diseño web.");
  R(RD3, "Rain is forecast for the whole weekend, so the organisers have moved the football tournament indoors. The matches will now be played in the sports hall, starting at nine o'clock.", "Why were the matches moved?", ["The pitch was sold","The weather is bad","The players were ill","The hall is cheaper"], 1, "Se trasladan por la lluvia.");
  R(RD3, "Although the restaurant is small, it is always full on weekends. Booking in advance is recommended, as walk-in customers often have to wait for an hour.", "What is the problem for people without a booking?", ["The food is expensive","They may wait a long time","It is closed","They cannot pay"], 1, "Sin reserva pueden esperar una hora.");
  R(RD3, "Mark used to hate reading. Then, during a long flight, he picked up a thriller his sister had left in his bag. He finished it in one day and has read more than twenty books since.", "What changed Mark's attitude to reading?", ["A teacher's advice","A thriller his sister left in his bag","A reading club","An online course"], 1, "Un thriller que dejó su hermana.");
  R(RD3, "The company has decided to reduce its working week to four days without cutting salaries. Managers say the change will help staff rest and be more productive.", "What is the company's new policy?", ["Four-day week with the same pay","Longer days with less pay","Five days with extra pay","Unpaid leave"], 0, "Semana de cuatro días con el mismo salario.");
  R(RD3, "Dear customers, our shop will be closed next Monday for a staff training day. We apologise for any inconvenience and look forward to serving you on Tuesday.", "When will the shop reopen?", ["On Monday","On Tuesday","On Friday","Next week"], 1, "Reabre el martes.");

  // Use of English P3 (formación de palabras), P2 (cloze abierto), P4 (transformaciones)
  var WF = "PET · Use of English P3 (formación de palabras)";
  T(WF, "The ___ of the new road took two years. (CONSTRUCT)", "Sustantivo derivado de CONSTRUCT", ["construction"], "«Construction».");
  T(WF, "She is very ___ about her work. (PASSION)", "Adjetivo derivado de PASSION", ["passionate"], "«Passionate».");
  T(WF, "Please keep the receipt as proof of ___. (PURCHASE)", "Sustantivo derivado de PURCHASE", ["purchase"], "«Purchase» como sustantivo.");
  T(WF, "The hotel was ___ comfortable. (EXTREME)", "Adverbio derivado de EXTREME", ["extremely"], "«Extremely».");
  T(WF, "His ___ made everyone laugh. (HUMOUR)", "Sustantivo; también vale la grafía americana", ["humour","humor"], "«Humour».");
  T(WF, "The team's ___ was a big surprise. (SUCCEED)", "Sustantivo derivado de SUCCEED", ["success"], "«Success».");
  T(WF, "It was a ___ journey. (MEMORY)", "Adjetivo: que se recuerda", ["memorable"], "«Memorable».");
  T(WF, "The ___ of the flight was delayed. (DEPART)", "Sustantivo derivado de DEPART", ["departure"], "«Departure».");

  var OC = "PET · Use of English P2 (cloze abierto)";
  T(OC, "Our flight was delayed ___ the storm.", "Escribe la preposición de causa", ["because of","due to"], "«Because of» o «due to».");
  T(OC, "I'm going to bed now, ___ I'm very tired.", "Una palabra de causa", ["because","as","since"], "Conjunciones de causa.");
  T(OC, "He ran fast ___ he could catch the bus.", "Dos palabras de finalidad", ["so that"], "«So that» + sujeto + can.");
  T(OC, "The house ___ we bought last year needs painting.", "Pronombre relativo para cosas", ["that","which"], "Relativo para cosas.");
  T(OC, "I'd like to thank everyone ___ helped me.", "Pronombre relativo para personas", ["who","that"], "Relativo para personas.");

  var KW = "PET · Use of English P4 (transformaciones)";
  T(KW, "I haven't visited London for two years.", "Empieza con: I haven't", ["I haven't visited London for two years","I have not visited London for two years"], "Forma equivalente con «for».");
  T(KW, "Nobody told me about the change.", "Empieza con: I wasn't", ["I wasn't told about the change","I was not told about the change"], "Pasiva con «told».");
  T(KW, "The bus was late, so we missed the film.", "Empieza con: Because", ["Because the bus was late, we missed the film"], "«Because» + causa.");
  T(KW, "It's a pity I don't speak Chinese.", "Empieza con: I wish", ["I wish I spoke Chinese"], "«Wish» + pasado para lo presente.");
  T(KW, "They said I should apologise.", "Empieza con: They told", ["They told me to apologise"], "«Tell» + persona + infinitivo.");
  T(KW, "Let's go for a walk after lunch.", "Empieza con: Why don't we", ["Why don't we go for a walk after lunch"], "Sugerencia con «Why don't we».");
  T(KW, "I'm not as tall as my brother.", "Empieza con: My brother is", ["My brother is taller than me"], "Comparativo con «taller».");
  T(KW, "It isn't necessary to bring a laptop.", "Empieza con: You don't", ["You don't need to bring a laptop"], "«Don't need to».");
  T(KW, "The last time I went to the dentist was in May.", "Empieza con: I haven't", ["I haven't been to the dentist since May"], "Presente perfecto con «since».");
  T(KW, "She is the best cook I know.", "Empieza con: I've never", ["I've never known a better cook than her","I have never known a better cook than her"], "Comparación con «better».");

  // Listening P1, P2: opción múltiple con audio
  L(LI1, "Hi, I'm calling about the bike you advertised. Is it still for sale? Yes? Great, I'll come round at six.", "What is the caller doing?", ["Buying a bike","Selling a bike","Repairing a bike"], 0, "Quiere comprar la bici.");
  L(LI1, "Ladies and gentlemen, the museum closes in fifteen minutes. Please bring your bags to the front desk.", "What should visitors do?", ["Leave their bags at the front desk","Stay for an extra hour","Pay for a ticket"], 0, "Llevar las bolsas a recepción.");
  L(LI1, "Woman: Would you like tea or coffee? Man: Coffee, please, with milk and no sugar.", "What does the man want?", ["Tea with sugar","Coffee with milk, no sugar","Water"], 1, "Café con leche sin azúcar.");
  L(LI1, "The sun will come out this afternoon, but it'll be cold, with temperatures around five degrees.", "What is the weather like this afternoon?", ["Sunny and cold","Rainy and warm","Snowy and windy"], 0, "Sol y frío.");
  L(LI1, "Hello, I'm sorry, I can't come to work tomorrow. I have a doctor's appointment in the morning.", "Why can't the speaker come to work?", ["She is on holiday","She has a doctor's appointment","She is ill at home"], 1, "Tiene cita con el médico.");
  L(LI1, "Excuse me, is this seat free? Yes, please sit down. It's a very busy train today.", "Where are the speakers?", ["On a train","In a cinema","At a bus stop"], 0, "Están en un tren.");
  L(LI1, "Our next flight to Rome leaves from gate twelve in twenty minutes.", "Where does the Rome flight leave from?", ["Gate 12","Gate 20","Gate 2"], 0, "Puerta 12.");
  L(LI1, "I've decided to start running. I want to be fit for the marathon next year.", "What is the speaker's plan?", ["To run a marathon next year","To stop running","To buy a car"], 0, "Preparar un maratón.");
  L(LI1, "Jane: Did you finish the homework? Tom: Not yet. I'm going to do it after dinner.", "When will Tom do his homework?", ["Before dinner","After dinner","Tomorrow morning"], 1, "Después de cenar.");
  L(LI1, "The shop is having a sale. Everything in the summer section is half price until Sunday.", "What is on sale?", ["Winter clothes","Summer clothes","Shoes"], 1, "Ropa de verano a mitad de precio.");
  L(LI1, "Hi, it's Lisa. I'm running late, so please order me a sandwich. I'll be there by one.", "What does Lisa ask her friend to do?", ["Order a sandwich for her","Pick her up","Cancel lunch"], 0, "Pide que le pida un bocadillo.");
  L(LI1, "Attention, please. The school trip has been moved to Friday because of the weather.", "When is the school trip now?", ["Thursday","Friday","Monday"], 1, "Pasa al viernes.");
  L(LI1, "I'm so happy with my new phone. The camera is excellent and the battery lasts for days.", "How does the speaker feel about the phone?", ["Disappointed","Pleased","Angry"], 1, "Contento con el móvil.");
  L(LI1, "You need to fill in the form in capital letters and return it to reception by Thursday.", "What must you do with the form?", ["Return it by Thursday","Post it next month","Keep it"], 0, "Entregarlo antes del jueves.");
  L(LI1, "Could you turn the music down a little? I'm trying to study.", "Why does the speaker ask for quieter music?", ["They want to sleep","They are studying","They can't hear the TV"], 1, "Quiere estudiar.");
  L(LI2, "Man: What time does the film start? Woman: At eight, but we should be there by a quarter to, to get good seats.", "What time should they arrive?", ["At eight","At a quarter to eight","At nine"], 1, "Llegar a las 7:45.");
  L(LI2, "Woman: I've booked a table for four at the Italian restaurant. Man: Great, I'll tell the others.", "How many people are going to the restaurant?", ["Two","Four","Six"], 1, "Mesa para cuatro.");
  L(LI2, "Man: My car broke down on the motorway. Woman: Oh no! Are you safe? Man: Yes, I'm fine, but I'll be late.", "What happened to the man?", ["He had an accident","His car broke down","He missed his train"], 1, "Se le averió el coche.");
  L(LI2, "Woman: Which day is the team meeting? Man: It's on Wednesday, not Tuesday, because the manager is away.", "When is the meeting?", ["Tuesday","Wednesday","Thursday"], 1, "Miércoles, no martes.");
  L(LI2, "Man: Have you seen my keys? Woman: They're on the kitchen table, next to the post.", "Where are the keys?", ["On the kitchen table","In the car","In the bag"], 0, "En la mesa de la cocina.");
  L(LI2, "Woman: Shall we walk or take a taxi? Man: Let's walk. It's only ten minutes and the weather is lovely.", "What do they decide to do?", ["Walk","Take a taxi","Wait for a bus"], 0, "Van andando.");
  L(LI2, "Woman: You look tired. Man: I didn't sleep well. My neighbours were having a party until three in the morning.", "Why didn't the man sleep well?", ["He was ill","Neighbours were noisy","He drank too much coffee"], 1, "Fiesta de los vecinos.");
  L(LI2, "Man: Do you want to join our running club? Woman: I'd love to, but I only have time on weekends.", "When can the woman train?", ["Weekdays","Weekends","Every evening"], 1, "Solo fines de semana.");

  // Listening P3: rellenar huecos (respuesta escrita)
  LT(LI3, "The concert starts at half past seven, and the doors open at six thirty.", "The concert starts at ___.", ["half past seven","7:30","7.30","seven thirty"], "Hora de inicio.");
  LT(LI3, "Please write your name and your date of birth on the first page of the form.", "Write your name and ___ on the first page.", ["date of birth","your date of birth"], "Dato pedido en el formulario.");
  LT(LI3, "The train from Madrid to Seville takes two hours and fifteen minutes.", "The journey takes ___ hours and fifteen minutes.", ["two","2"], "Duración del viaje.");
  LT(LI3, "Our office is on the third floor, next to the library.", "The office is on the ___ floor.", ["third"], "Planta.");
  LT(LI3, "I bought three kilos of apples and a bottle of orange juice.", "She bought three kilos of ___.", ["apples"], "Producto comprado.");
  LT(LI3, "The bus leaves from platform four every twenty minutes.", "The bus leaves from platform ___.", ["four","4"], "Andén.");
  LT(LI3, "Sorry, the restaurant closes at eleven on Sunday nights.", "The restaurant closes at ___ on Sundays.", ["eleven","11","11 pm","11pm"], "Hora de cierre.");
  LT(LI3, "Ben works as a nurse at the city hospital.", "Ben is a ___.", ["nurse"], "Profesión.");

  return out;
})();

