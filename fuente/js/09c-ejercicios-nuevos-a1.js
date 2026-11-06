import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel A1 (originales, al estilo de Movers/KET de nivel básico):
   40 de gramática, 30 de lectura y 30 de escucha. */
(function () {
  const out = [];
  const LV = "A1";
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

  const GR = "A1 · Gramática";
  G(GR, "She ___ a student.", ["is", "are", "am"], 0, "Con she se usa is.");
  G(GR, "They ___ from Spain.", ["are", "is", "am"], 0, "Con they se usa are.");
  G(GR, "I ___ a red bag.", ["have", "has", "is"], 0, "Con I se usa have.");
  G(GR, "He ___ like pizza.", ["doesn't", "don't", "isn't"], 0, "Con he en negativa: doesn't.");
  G(GR, "We ___ playing football now.", ["are", "is", "do"], 0, "Presente continuo con we: are + -ing.");
  G(GR, "There ___ two books on the table.", ["are", "is", "have"], 0, "Plural: there are.");
  G(GR, "___ you like coffee?", ["Do", "Does", "Are"], 0, "Preguntas con you: Do.");
  G(GR, "She ___ to school every day.", ["goes", "go", "going"], 0, "Presente simple con she: -es.");
  G(GR, "She can ___ very fast.", ["run", "to run", "running"], 0, "Después de can va el verbo sin «to».");
  G(GR, "My brother ___ English on Mondays.", ["studies", "study", "studys"], 0, "Consonante + y → ies.");
  G(GR, "Look! It ___ now.", ["is raining", "rains", "rain"], 0, "Algo que pasa ahora: presente continuo.");
  G(GR, "This is ___ apple.", ["an", "a", "the"], 0, "Delante de vocal se usa an.");
  G(GR, "I have ___ sisters.", ["two", "second", "too"], 0, "Two es el número 2.");
  G(GR, "___ is your name?", ["What", "Who", "Where"], 0, "Para preguntar el nombre: What.");
  G(GR, "The cat is ___ the table.", ["under", "of", "to"], 0, "Under = debajo de.");
  G(GR, "We ___ at home yesterday.", ["were", "are", "was"], 0, "Pasado de we: were.");
  G(GR, "He ___ a film last night.", ["watched", "watch", "watching"], 0, "Pasado simple: watched.");
  G(GR, "They ___ go to the park last Sunday.", ["did not", "do not", "are not"], 0, "Pasado en negativa: did not + verbo base.");
  G(GR, "I'm ___ hungry.", ["very", "much", "many"], 0, "Very + adjetivo.");
  G(GR, "Our house is ___ than yours.", ["bigger", "more big", "biggest"], 0, "Comparativo corto: bigger.");
  G(GR, "This book is the ___ in the shop.", ["cheapest", "cheaper", "cheap"], 0, "Superlativo: the cheapest.");
  G(GR, "Mum, can I have ___ water, please?", ["some", "any", "a"], 0, "Con incontables en afirmativa: some.");
  G(GR, "There aren't ___ eggs left.", ["any", "some", "a"], 0, "En negativa con plurales: any.");
  G(GR, "She likes ___ to music.", ["listening", "listen", "listens"], 0, "Like + -ing.");
  G(GR, "My birthday is ___ June.", ["in", "on", "at"], 0, "Meses: in.");
  G(GR, "The lesson starts ___ nine o'clock.", ["at", "in", "on"], 0, "Horas: at.");
  G(GR, "We go to school ___ bus.", ["by", "with", "in"], 0, "Medio de transporte: by bus.");
  G(GR, "Where ___ your parents work?", ["do", "does", "are"], 0, "Pregunta con your parents: do.");
  G(GR, "He is ___ than his sister.", ["taller", "tall", "tallest"], 0, "Comparativo: taller than.");
  G(GR, "She ___ her homework yet.", ["hasn't finished", "didn't finish", "doesn't finish"], 0, "Yet con present perfect negativo: hasn't finished.");
  G(GR, "I ___ never been to Japan.", ["have", "has", "am"], 0, "Con I: have been.");
  G(GR, "It is ___ cold today, so take a coat.", ["very", "much", "many"], 0, "Very cold.");
  G(GR, "Can you ___ me the time, please?", ["tell", "say", "speak"], 0, "Tell + persona: tell me.");
  G(GR, "The shop ___ at 9 a.m. every day.", ["opens", "open", "opening"], 0, "Tercera persona singular: opens.");
  G(GR, "I'm going to ___ a cake tomorrow.", ["bake", "baking", "baked"], 0, "Going to + verbo base.");
  G(GR, "Let's ___ to the cinema.", ["go", "to go", "going"], 0, "Let's + verbo base.");
  G(GR, "What time ___ it?", ["is", "are", "does"], 0, "La hora: what time is it?");
  G(GR, "Tim ___ get up early on Saturdays.", ["doesn't", "don't", "isn't"], 0, "Tercera persona en negativa: doesn't.");

  const RD = "A1 · Lectura";
  R(RD, "Tom has a dog called Max. Max likes to run in the park every morning.", "What does Max like to do?", ["Sleep", "Run in the park", "Swim"], 1, "Max corre en el parque.");
  R(RD, "Anna is ten years old. She lives in a flat with her mum and dad.", "How old is Anna?", ["Ten", "Twelve", "Eleven"], 0, "Tiene diez años.");
  R(RD, "Today is Sunday. We are going to visit our grandma. She makes the best cakes.", "Where are they going?", ["To the park", "To grandma's house", "To school"], 1, "Van a visitar a la abuela.");
  R(RD, "My favourite colour is blue. I have a blue bag, a blue hat and blue shoes.", "What is the writer's favourite colour?", ["Red", "Green", "Blue"], 2, "Su color favorito es el azul.");
  R(RD, "Ben gets up at seven. He has breakfast, brushes his teeth and goes to school.", "What does Ben do after breakfast?", ["He goes to bed", "He brushes his teeth", "He goes to the shop"], 1, "Después del desayuno se lava los dientes.");
  R(RD, "The supermarket is open from 8 a.m. to 10 p.m. It is closed on Christmas Day.", "When is the supermarket closed?", ["On Christmas Day", "At 8 a.m.", "At 10 p.m."], 0, "Está cerrado el día de Navidad.");
  R(RD, "Lucy has a cat. Its name is Mimi. Mimi is black and white.", "What colour is Mimi?", ["All black", "Black and white", "Brown"], 1, "Mimi es blanca y negra.");
  R(RD, "It is raining today, so we are staying at home. We are playing cards.", "What are they doing?", ["Playing cards", "Going swimming", "Walking in the rain"], 0, "Juegan a las cartas.");
  R(RD, "Sam is a doctor. He works at the hospital near the school.", "Where does Sam work?", ["At a school", "At a hospital", "At a shop"], 1, "Trabaja en un hospital.");
  R(RD, "Our class has twenty students. Ten are girls and ten are boys.", "How many boys are in the class?", ["Twenty", "Ten", "Five"], 1, "Diez son chicos.");
  R(RD, "Maria likes sport. On Tuesdays she plays tennis, and on Thursdays she swims.", "What does Maria do on Thursdays?", ["She plays tennis", "She swims", "She reads"], 1, "Los jueves nada.");
  R(RD, "Welcome to our café! We serve tea, coffee and cakes. Open every day from 9 to 5.", "What time does the café close?", ["At nine", "At five", "At six"], 1, "Cierra a las cinco.");
  R(RD, "Ali has a new bike. It is red and very fast. He rides it to school every day.", "How does Ali go to school?", ["By bus", "On foot", "By bike"], 2, "Va en bici.");
  R(RD, "The shop is opposite the bank. You can buy bread and milk there.", "What can you buy in the shop?", ["Bread and milk", "Money", "Shoes"], 0, "Pan y leche.");
  R(RD, "Emma is from London, but now she lives in Madrid. She likes the sun.", "Where does Emma live now?", ["In London", "In Madrid", "In Paris"], 1, "Ahora vive en Madrid.");
  R(RD, "There are three rooms in my flat: a kitchen, a bathroom and a bedroom.", "How many rooms are there?", ["Two", "Three", "Four"], 1, "Hay tres habitaciones.");
  R(RD, "Jack is tall. He plays basketball at school and he is very good.", "What sport does Jack play?", ["Football", "Basketball", "Tennis"], 1, "Juega baloncesto.");
  R(RD, "Please don't play with the ball in the house. Play in the garden, please.", "Where should you play?", ["In the house", "In the garden", "In the kitchen"], 1, "Jugar en el jardín.");
  R(RD, "My dad cooks dinner on Fridays. We eat pasta and salad.", "What do they eat on Fridays?", ["Pizza", "Pasta and salad", "Soup"], 1, "Pasta y ensalada.");
  R(RD, "Kate has a big family. She has two brothers and one sister.", "How many brothers does Kate have?", ["One", "Two", "Three"], 1, "Tiene dos hermanos.");
  R(RD, "The bus to the beach leaves at half past ten. Please be at the stop at ten.", "When should you be at the bus stop?", ["At ten", "At half past ten", "At eleven"], 0, "A las diez.");
  R(RD, "Paul likes to read before bed. This week he is reading a book about animals.", "What is Paul reading?", ["A book about animals", "A magazine", "A map"], 0, "Un libro sobre animales.");
  R(RD, "It's hot in summer. We go to the beach and swim in the sea.", "What do they do in summer?", ["They ski", "They swim", "They skate"], 1, "Nadan en el mar.");
  R(RD, "My grandad is seventy. He has a small garden with roses and tomatoes.", "What is in the garden?", ["Roses and tomatoes", "Apples", "Cars"], 0, "Rosas y tomates.");
  R(RD, "Lisa wants a new phone for her birthday. It costs fifty euros.", "How much is the phone?", ["Fifty euros", "Ten euros", "Five euros"], 0, "Cincuenta euros.");
  R(RD, "Our teacher is called Mr Brown. He is from Scotland and he is very funny.", "Where is Mr Brown from?", ["England", "Scotland", "Ireland"], 1, "Es de Escocia.");
  R(RD, "Tina gets to school at quarter past eight. The lessons start at half past eight.", "What time do the lessons start?", ["At 8:15", "At 8:30", "At 9:00"], 1, "A las 8:30.");
  R(RD, "There is a park near my house. It has a lake and lots of ducks.", "What is in the park?", ["A lake and ducks", "A zoo", "A museum"], 0, "Tiene lago y patos.");
  R(RD, "On Saturdays I clean my room and help my mum in the kitchen.", "What does the writer do on Saturdays?", ["Cleans the room and helps in the kitchen", "Goes to school", "Works in a shop"], 0, "Limpia y ayuda en la cocina.");

  const LI = "A1 · Escucha";
  L(LI, "Man: Excuse me, is this the bus to the station? Woman: No, it's the one over there.", "Where is the woman pointing?", ["To the station", "Over there", "To the bank"], 1, "Señala el autobús de allí.");
  L(LI, "Girl: What's your favourite animal? Boy: I like dogs. They are very friendly.", "What is the boy's favourite animal?", ["Cats", "Dogs", "Birds"], 1, "Le gustan los perros.");
  L(LI, "Mum: Have you got your bag? Son: Yes, it's in the hall.", "Where is the bag?", ["In the kitchen", "In the hall", "In the car"], 1, "Está en el vestíbulo.");
  L(LI, "Teacher: Open your books at page ten. Students: OK.", "Which page should the students open?", ["Page 1", "Page 10", "Page 100"], 1, "Página diez.");
  L(LI, "Woman: What time is it? Man: It's half past three.", "What time is it?", ["3:30", "3:00", "4:30"], 0, "Son las tres y media.");
  L(LI, "Boy: Can I have a sandwich? Dad: Yes, but first wash your hands.", "What must the boy do first?", ["Eat the sandwich", "Wash his hands", "Go to bed"], 1, "Lavarse las manos primero.");
  L(LI, "Girl: Is it cold outside? Man: Yes, take your coat.", "What should the girl take?", ["Her coat", "Her hat", "Her bike"], 0, "El abrigo.");
  L(LI, "Woman: How much is the apple? Shopkeeper: Forty cents.", "How much is the apple?", ["Forty cents", "Four euros", "Fourteen cents"], 0, "Cuarenta céntimos.");
  L(LI, "Man: Where do you live? Girl: I live near the park, next to the school.", "Where does the girl live?", ["Near the park", "Near the sea", "In the city centre"], 0, "Cerca del parque.");
  L(LI, "Mum: Are you hungry? Son: Yes, I'd like some pasta.", "What would the son like?", ["Some pasta", "Some soup", "Some fruit"], 0, "Pasta.");
  L(LI, "Teacher: Who has a pet? Boy: I do. I have a rabbit.", "What pet does the boy have?", ["A rabbit", "A cat", "A fish"], 0, "Un conejo.");
  L(LI, "Woman: Let's go to the cinema on Friday. Man: Great, I'll buy the tickets.", "What will the man do?", ["Buy the tickets", "Cook dinner", "Call his mum"], 0, "Compra las entradas.");
  L(LI, "Girl: Do you play any sports? Boy: Yes, I play football on Sundays.", "When does the boy play football?", ["On Sundays", "On Mondays", "On Saturdays"], 0, "Los domingos.");
  L(LI, "Man: How many brothers do you have? Girl: I have one brother. He's seven.", "How old is the brother?", ["Seven", "Seventeen", "Five"], 0, "Tiene siete años.");
  L(LI, "Waiter: Would you like tea or coffee? Customer: Tea, please. With no milk.", "What does the customer want?", ["Coffee with milk", "Tea without milk", "Water"], 1, "Té sin leche.");
  L(LI, "Woman: Is the shop open on Mondays? Man: No, it's closed on Mondays.", "Is the shop open on Mondays?", ["Yes", "No", "Only in the morning"], 1, "Está cerrado los lunes.");
  L(LI, "Girl: My bike is broken. Dad: Don't worry, we'll fix it after lunch.", "When will they fix the bike?", ["Before lunch", "After lunch", "Tomorrow"], 1, "Después de comer.");
  L(LI, "Boy: Where's the library? Woman: It's on the second floor, next to the lift.", "Where is the library?", ["On the ground floor", "On the second floor", "Next to the bank"], 1, "Segunda planta.");
  L(LI, "Man: What's the weather like? Woman: It's sunny, but a bit windy.", "What is the weather like?", ["Sunny and windy", "Rainy", "Snowing"], 0, "Soleado y algo ventoso.");
  L(LI, "Mum: Did you brush your teeth? Child: Yes, Mum.", "Did the child brush their teeth?", ["Yes", "No"], 0, "Sí.");
  L(LI, "Girl: Let's meet at the café at three. Boy: OK, see you there.", "What time will they meet?", ["At two", "At three", "At four"], 1, "A las tres.");
  L(LI, "Teacher: Put your pens down, please. The test starts now.", "What does the teacher say to do?", ["Put the pens down", "Write a letter", "Sing a song"], 0, "Dejar los bolígrafos.");
  L(LI, "Man: Is the post office far? Woman: No, it's five minutes on foot.", "How long does it take to walk there?", ["Five minutes", "Fifteen minutes", "One hour"], 0, "Cinco minutos.");
  L(LI, "Girl: I like your shoes. Boy: Thanks, they're new.", "What does the girl say about the shoes?", ["She likes them", "She hates them", "She has the same ones"], 0, "Le gustan.");
  L(LI, "Dad: Please turn off the light. Son: Sorry, I forgot.", "What does the dad ask?", ["Turn off the light", "Open the window", "Close the door"], 0, "Apagar la luz.");
  L(LI, "Woman: Which is your room? Girl: The one at the end of the corridor.", "Where is the girl's room?", ["At the end of the corridor", "In the kitchen", "Upstairs by the stairs"], 0, "Al final del pasillo.");
  L(LI, "Man: How do you get to work? Woman: I walk. It takes about ten minutes.", "How does the woman get to work?", ["On foot", "By car", "By bus"], 0, "Andando.");
  L(LI, "Boy: Happy birthday, Anna! Girl: Thank you! I'm eight today.", "How old is Anna today?", ["Six", "Eight", "Eighteen"], 1, "Cumple ocho años.");

  G(GR, "Sara and Ana ___ best friends.", ["are", "is", "am"], 0, "Plural: are.");
  G(GR, "I don't ___ any milk.", ["have", "has", "having"], 0, "Con I en negativa: don't have.");
  R(RD, "On Sundays we go to the market. My mum buys apples, bread and fish there.", "What does the mum buy at the market?", ["Shoes", "Apples, bread and fish", "Toys"], 1, "Manzanas, pan y pescado.");
  R(RD, "Carlos has a blue car. It is old, but it works well.", "What colour is Carlos's car?", ["Red", "Blue", "White"], 1, "Es azul.");
  L(LI, "Girl: Where's the cat? Boy: It's sleeping under the bed.", "Where is the cat?", ["Under the bed", "On the sofa", "In the garden"], 0, "Debajo de la cama.");

  G(GR, "The dog is ___ the door.", ["next to", "next of", "next from"], 0, "Next to = al lado de.");
  G(GR, "My mum ___ a doctor.", ["is", "are", "am"], 0, "Tercera persona singular: is.");
  G(GR, "Where ___ the toilet?", ["is", "are", "am"], 0, "Pregunta singular: where is.");
  R(RD, "Lucy's house is blue. It has a big garden with a swing and a small pond.", "What is in the garden?", ["A swing and a pond", "A car", "A swimming pool"], 0, "Un columpio y un estanque.");
  R(RD, "Peter has three pets: a fish, a hamster and a parrot. The parrot can say his name.", "What can the parrot say?", ["Peter's name", "Good morning", "Hello"], 0, "El nombre de Peter.");
  L(LI, "Woman: What's the weather like today? Man: It's cloudy, but it's not raining.", "What's the weather like?", ["Cloudy", "Sunny", "Snowy"], 0, "Nublado.");
  G(GR, "The book is ___ the desk.", ["on", "in", "at"], 0, "On = encima de.");
  R(RD, "Max has a big red ball. He plays with it in the garden every afternoon.", "Where does Max play with his ball?", ["In the garden", "In the kitchen", "At school"], 0, "En el jardín.");
  ITEMS.push(...out);
})();
