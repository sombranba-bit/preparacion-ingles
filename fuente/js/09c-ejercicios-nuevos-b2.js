import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel B2 (originales, al estilo de FCE):
   gramática y vocabulario, lectura con inferencia, escucha y reformulación. */
(function () {
  const out = [];
  const LV = "B2";
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

  const GR = "FCE · Use of English";
  G(GR, "I'd rather you ___ say anything until we know the facts.", ["didn't", "don't", "wouldn't"], 0, "I'd rather + pasado simple: didn't.");
  G(GR, "The package ___ to have arrived by now, but it hasn't.", ["ought", "is", "gets"], 0, "Ought to + infinitivo con to.");
  G(GR, "She ___ up smoking last year after a long struggle.", ["gave", "left", "stopped on"], 0, "Give up + -ing.");
  G(GR, "Despite ___ exhausted, she kept going.", ["being", "to be", "she was"], 0, "Despite + -ing.");
  G(GR, "The manager insisted ___ the report before Friday.", ["on the team finishing", "the team finishes", "the team to finish"], 0, "Insist on + -ing.");
  G(GR, "Had they ___ the warning, they would have avoided the accident.", ["heeded", "heed", "heeding"], 0, "Tercer condicional con inversión: had heeded.");
  G(GR, "The new policy will come ___ effect next month.", ["into", "in", "to"], 0, "Come into effect.");
  G(GR, "I'm not ___ to working late every night.", ["used", "accustomed for", "use"], 0, "Be used to + -ing.");
  G(GR, "The town ___ a significant change since I last visited.", ["has undergone", "has gone under", "has underwent"], 0, "Undergo a change: has undergone.");
  G(GR, "It's high time we ___ a decision about the budget.", ["made", "make", "will make"], 0, "It's high time + pasado simple.");
  G(GR, "Not only ___ the exam, but she also got the top grade.", ["did she pass", "she passed", "she did pass"], 0, "Inversión tras not only.");
  G(GR, "He is ___ to be the best candidate for the job.", ["likely", "probable", "possibly"], 0, "Be likely to.");
  G(GR, "The results ___ far more positive than the experts had predicted.", ["were", "was", "are"], 0, "Results en plural: were.");
  G(GR, "If it ___ for the storm, we would have arrived on time.", ["hadn't been", "wasn't", "weren't"], 0, "Tercer condicional con it: hadn't been.");
  G(GR, "She is ___ to attend the conference, but she has other commitments.", ["supposed", "suppose", "supposing"], 0, "Be supposed to.");
  G(GR, "The hotel was ___ to the beach, which made it very convenient.", ["close", "closely", "closer than"], 0, "Close to.");
  G(GR, "Do you mind ___ the window? It's freezing in here.", ["closing", "to close", "close"], 0, "Mind + -ing.");
  G(GR, "The meeting was ___ off because the speaker was ill.", ["called", "put", "taken"], 0, "Call off = cancelar.");
  G(GR, "She has a ___ for getting lost in new cities.", ["habit", "custom to", "practice"], 0, "Have a habit of: habit.");
  G(GR, "The proposal was ___ down by the committee.", ["turned", "pulled", "put"], 0, "Turn down = rechazar.");
  G(GR, "He ___ the chance to study abroad because of his family.", ["passed up", "gave away on", "set off"], 0, "Pass up = dejar pasar una oportunidad.");
  G(GR, "The team ___ the opposition by three goals to one.", ["beat", "won over of", "defeated to"], 0, "Beat someone = vencer.");
  G(GR, "Scarcely ___ the door when the phone started ringing.", ["had she closed", "she had closed", "did she close"], 0, "Scarcely + inversión.");
  G(GR, "I ___ a lot of time on this project, so I'm glad it's finished.", ["have spent", "spent", "have been spending"], 0, "Present perfect para una experiencia reciente con resultado.");
  G(GR, "It was ___ the best film I've seen this year.", ["by far", "far by", "far more"], 0, "By far + superlativo.");
  G(GR, "She wouldn't have got the job ___ her excellent references.", ["without", "unless", "despite"], 0, "Without + sustantivo.");
  G(GR, "The bridge is ___ repair, so drivers should take another route.", ["under", "in", "on"], 0, "Under repair.");
  G(GR, "They made ___ that the project would be finished on time.", ["sure", "certain of", "safe"], 0, "Make sure that.");
  G(GR, "He is ___ to be a very talented musician.", ["said", "told", "spoken"], 0, "Be said to be.");
  G(GR, "She ___ her temper when the waiter spilled the coffee.", ["lost", "missed", "dropped"], 0, "Lose one's temper.");
  G(GR, "We ___ a lot of progress in the last few months.", ["have made", "did", "have done"], 0, "Make progress.");
  G(GR, "The festival ___ place every year in the autumn.", ["takes", "is taken", "takes on"], 0, "Take place = tener lugar.");
  G(GR, "I wish I ___ the answer to that question yesterday.", ["had known", "knew", "would know"], 0, "Lamentar algo del pasado: had known.");
  G(GR, "He ___ his time in the library studying for the exam.", ["spent", "passed", "lost"], 0, "Spend time + -ing.");

  const RD = "FCE · Reading";
  R(RD, "Many people assume that the decline in bee populations only affects honey production. In fact, bees pollinate around a third of the food we eat, so the consequences are far more serious.", "What is the writer's main point?", ["Bees only produce honey", "The loss of bees affects much more than honey", "Bees are not important"], 1, "Afecta mucho más que la miel.");
  R(RD, "The museum's new director has promised to make the collection more accessible. Ticket prices will be reduced for students, and guided tours will be offered in several languages.", "What change is planned for students?", ["Free tours", "Lower ticket prices", "Longer opening hours"], 1, "Entradas más baratas.");
  R(RD, "Few people realise how much planning goes into a successful festival. Organisers often begin work two years in advance, negotiating with artists and securing funding.", "According to the text, when do organisers start planning?", ["Two years before", "Two months before", "On the day"], 0, "Dos años antes.");
  R(RD, "Critics argue that the new law will do little to reduce traffic. They claim that without better public transport, drivers will simply continue to use their cars.", "What do the critics say?", ["The law will reduce traffic", "Drivers will continue using cars", "Public transport is excellent"], 1, "Seguirán usando el coche.");
  R(RD, "When Lena first moved abroad, she struggled to make friends. Gradually, by joining a choir and volunteering at a local shelter, she built a network she now considers her second family.", "How did Lena make friends?", ["By joining a choir and volunteering", "By studying at a university", "By moving back home"], 0, "Coro y voluntariado.");
  R(RD, "The company's profits fell sharply last year, yet its share price rose. Analysts attribute this to investors' confidence in the new product range.", "Why did the share price rise?", ["Profits increased", "Investors trusted the new products", "The company sold its factories"], 1, "Confianza en la nueva gama.");
  R(RD, "Although the novel was initially rejected by twelve publishers, it went on to become a bestseller and was translated into over thirty languages.", "What happened to the novel in the end?", ["It was rejected by all publishers", "It became a bestseller", "It was never published"], 1, "Se convirtió en un superventas.");
  R(RD, "Researchers have found that people who sleep fewer than six hours a night are more likely to make errors at work. The study, however, did not account for shift patterns.", "What limitation does the study have?", ["It did not consider shift patterns", "It involved only children", "It measured sleep in hours"], 0, "No tuvo en cuenta los turnos.");
  R(RD, "The village had been almost abandoned until a group of young artists moved in. Within a few years, galleries and cafés had opened, and tourists began to visit.", "What brought tourists to the village?", ["Its new galleries and cafés", "A new railway", "A famous monument"], 0, "Galerías y cafés.");
  R(RD, "Fitness experts recommend that people should not focus solely on running. Strength training and flexibility exercises are equally important for long-term health.", "What do experts say about running?", ["It is the only exercise needed", "It should be combined with other exercise", "It is harmful"], 1, "Combinarlo con otros ejercicios.");
  R(RD, "The article examines how social media has changed the way young people form opinions. While some benefits are clear, the author warns against accepting information without checking it.", "What does the author warn against?", ["Using social media at all", "Accepting information without checking", "Forming opinions"], 1, "Aceptar información sin comprobarla.");
  R(RD, "Tourists are advised to book accommodation early during the summer season. Prices rise quickly and popular hotels often sell out weeks in advance.", "Why should tourists book early?", ["Prices rise and hotels sell out", "Hotels close in summer", "Flights are cheaper"], 0, "Los precios suben y se llenan.");
  R(RD, "The school has introduced a new reading scheme. Pupils who read for at least thirty minutes a day receive a certificate, which many of them display proudly in their classrooms.", "What do pupils receive for reading?", ["A certificate", "Money", "Extra holidays"], 0, "Un certificado.");
  R(RD, "The scientist admitted that her early hypothesis had been wrong. Instead of hiding the results, she published them and invited other researchers to challenge her conclusions.", "What did the scientist do with her results?", ["She hid them", "She published them", "She destroyed them"], 1, "Los publicó.");
  R(RD, "Living in a big city has many advantages, but it can also be expensive and stressful. Many residents now choose to live on the outskirts and commute by train.", "Why do some residents live outside the city?", ["It is cheaper and less stressful", "They are not allowed to live in the centre", "The trains are free"], 0, "Más barato y menos estrés.");
  R(RD, "Although the painting was attributed to a famous artist for decades, recent tests suggest that it was produced by one of his students.", "What do recent tests suggest?", ["The painting is by the famous artist", "The painting was made by a student", "The painting is a fake from the 20th century"], 1, "Lo hizo un alumno.");
  R(RD, "Employees who work from home often report feeling more productive, but some miss the social contact of the office. Many companies now offer a mix of both.", "What do many companies offer now?", ["Only office work", "A mix of home and office work", "Only home working"], 1, "Mezcla de ambos.");
  R(RD, "The mountain village can only be reached by a narrow road that is closed in winter. Its residents rely on helicopters for emergencies.", "How do residents deal with emergencies in winter?", ["They use helicopters", "They walk to town", "They wait for spring"], 0, "Helicópteros.");
  R(RD, "The actor said he had never expected the role to change his career. Since the film was released, he has received offers from directors all over the world.", "What has happened since the film was released?", ["He has received offers worldwide", "He has retired", "He has stopped acting"], 0, "Ofertas de todo el mundo.");
  R(RD, "Local farmers have started selling their produce directly to customers. This has reduced costs and allowed the farmers to keep a larger share of the profits.", "What is one benefit for farmers?", ["They keep more profit", "They must pay more tax", "They need fewer customers"], 0, "Se quedan con más beneficio.");
  R(RD, "The committee's report praised the city's efforts to reduce waste, but it criticised the lack of recycling bins in poorer neighbourhoods.", "What did the committee criticise?", ["Lack of recycling bins in poorer areas", "The cost of waste collection", "The number of parks"], 0, "Falta de contenedores en barrios pobres.");

  const LI = "FCE · Listening";
  L(LI, "Woman: I was sure the new restaurant would be busy, but it was almost empty. Man: Perhaps people are put off by the prices.", "What does the man suggest?", ["People think it's too expensive", "The food is poor", "It's closed on weekends"], 0, "Los precios disuaden.");
  L(LI, "Man: Are you going to apply for the scholarship? Woman: I'd like to, but the application deadline is so close that I'm not sure I'll manage it.", "How does the woman feel about the scholarship?", ["She is unsure she can meet the deadline", "She has already been accepted", "She doesn't want it"], 0, "Duda que llegue al plazo.");
  L(LI, "Woman: The team has been working around the clock, but the client still isn't happy. Man: Maybe we should ask them what they actually need.", "What does the man suggest?", ["Asking the client what they need", "Working faster", "Stopping the project"], 0, "Preguntar al cliente.");
  L(LI, "Boy: I can't believe the film won best picture. Girl: I know, it was a surprise, but I thought the acting was excellent.", "What does the girl think of the film?", ["The acting was excellent", "It was too long", "It was badly made"], 0, "La interpretación era excelente.");
  L(LI, "Man: Shall we go hiking this weekend? Woman: It depends on the forecast. If it's going to rain, let's do something indoors.", "What will they do if it rains?", ["Do something indoors", "Go hiking anyway", "Cancel the trip forever"], 0, "Algo en interiores.");
  L(LI, "Girl: My sister has been offered a promotion, but it means moving abroad. Boy: That's a big decision. Has she decided yet?", "What is the girl's sister considering?", ["A promotion that involves moving abroad", "A new car", "Retiring early"], 0, "Un ascenso con traslado al extranjero.");
  L(LI, "Woman: The repairs should have been finished by now. Man: I know. The contractors keep blaming the weather, but I suspect they're just behind schedule.", "What does the man suspect?", ["The contractors are behind schedule", "The weather is very bad", "The repairs are complete"], 0, "Van retrasados.");
  L(LI, "Man: I'm not convinced the new policy will work. Woman: Give it time. Changes like this usually take a while to show results.", "What is the woman's attitude to the policy?", ["She thinks it needs time", "She is sure it will fail", "She wants it cancelled"], 0, "Necesita tiempo.");
  L(LI, "Girl: Did you know the library is extending its opening hours? Boy: Really? That will be a relief during exam season.", "Why is the boy pleased?", ["It will help during exam season", "The library is cheaper", "He lives next to it"], 0, "Ayuda en época de exámenes.");
  L(LI, "Woman: I've been trying to get through to the bank all morning. Man: Have you tried the online chat? It's often quicker than the phone line.", "What does the man recommend?", ["Using the online chat", "Visiting the bank", "Calling again later"], 0, "Chat en línea.");
  L(LI, "Boy: We should have checked the weather before we set off. Girl: True, but we didn't expect the fog to be so thick.", "What do they regret?", ["Not checking the weather", "Choosing the wrong route", "Bringing too much food"], 0, "No mirar el tiempo.");
  L(LI, "Man: The festival was a huge success, wasn't it? Woman: It was, though I think the organisers underestimated the number of visitors.", "What does the woman think about the organisers?", ["They underestimated visitor numbers", "They were very well prepared", "They cancelled the festival"], 0, "Subestimaron el número de visitantes.");
  L(LI, "Girl: I've finally decided to take up painting. Boy: Good for you! It's a great way to relax after work.", "Why does the boy support the girl's decision?", ["Painting relaxes people", "It is very profitable", "It is easy to learn"], 0, "Relaja.");
  L(LI, "Woman: I wouldn't have bought the car if I'd known how expensive the insurance was. Man: Yes, it's a lot more than I expected too.", "How does the woman feel about the car?", ["She regrets buying it", "She is delighted with it", "She has sold it"], 0, "Se arrepiente.");
  L(LI, "Man: The new manager seems very strict. Woman: At first, perhaps, but she's fair and she listens to everyone's ideas.", "What is the woman's opinion of the manager?", ["She is fair and listens", "She is unfair and rude", "She is too lazy"], 0, "Es justa y escucha.");
  L(LI, "Boy: Do you think I should study medicine or engineering? Girl: Whatever you choose, you need to be passionate about it, or it will be a struggle.", "What does the girl advise?", ["To choose what he is passionate about", "To choose medicine", "To choose the easier course"], 0, "Elegir lo que le apasiona.");
  L(LI, "Woman: The concert was cancelled at the last minute. Man: That's disappointing, but at least they'll refund the tickets.", "How does the man feel?", ["Disappointed but relieved about the refund", "Excited", "Angry with the band"], 0, "Decepcionado pero aliviado.");
  L(LI, "Girl: Why did you change your mind about the holiday? Man: The flights became much more expensive, so we decided to stay closer to home.", "Why did the man change his plans?", ["The flights became more expensive", "The hotel closed", "His friends cancelled"], 0, "Los vuelos subieron.");

  const TR = "FCE · Use of English";
  T(TR, "Rewrite: 'It's a pity I didn't study harder.' → 'I wish I ___ harder.'", "Lamentar algo pasado: wish + pasado perfecto.", ["had studied"], "Wish + pasado perfecto para lamentar el pasado.");
  T(TR, "Rewrite: 'You should have told me earlier.' → 'I wish you ___ me earlier.'", "Pasado perfecto tras wish.", ["had told"], "Wish + had + participio.");
  T(TR, "Rewrite: 'The shop is open until midnight.' → 'The shop stays ___ midnight.'", "Expresión con «open» → «open until».", ["open until", "open till"], "Stay open until.");
  T(TR, "Complete: 'Although it was expensive, we bought it.' → 'In ___ its price, we bought it.'", "Expresión: despite + sustantivo.", ["spite of", "spite"], "In spite of = a pesar de.");
  T(TR, "Rewrite: 'He is so clever that he understands everything.' → 'He is ___ clever that he understands everything.'", "Estructura: such/so + adjetivo.", ["so"], "So + adjetivo + that.");
  T(TR, "Complete: 'I didn't have time to finish the report.' → 'I ran out ___ time to finish the report.'", "Preposición tras «run out».", ["of"], "Run out of = quedarse sin.");

  G(GR, "The authors ___ that the figures had been manipulated.", ["claimed", "claimed about", "claimed of"], 0, "Claim + that.");
  G(GR, "Were it not ___ the rain, we would have gone for a walk.", ["for", "to", "of"], 0, "Were it not for = si no fuera por.");
  G(GR, "When we arrived at the station, the train ___ already left.", ["had", "has", "was"], 0, "Pasado perfecto para algo anterior a otro pasado.");
  G(GR, "It's no use ___ to him; he never listens.", ["arguing", "to argue", "argue"], 0, "It's no use + -ing.");
  G(GR, "The hotel offers ___ views of the mountains.", ["stunning", "stunningly", "stun"], 0, "Adjetivo ante sustantivo.");
  G(GR, "I'm afraid I ___ with you on this point.", ["disagree", "disagreed", "am disagree"], 0, "Presente simple con I.");
  G(GR, "By next year, the company ___ its headquarters to Berlin.", ["will have moved", "will move", "has moved"], 0, "Futuro perfecto con by next year.");
  G(GR, "He was accused ___ stealing the money.", ["of", "for", "about"], 0, "Accuse someone of + -ing.");
  G(GR, "The more carefully you plan, ___ mistakes you will make.", ["the fewer", "the less", "fewer"], 0, "The fewer + contables.");
  G(GR, "They were ___ to leave the building immediately.", ["instructed", "instructed to", "instruct"], 0, "Be instructed to + infinitivo.");
  R(RD, "Many cities are experimenting with car-free zones. Early results suggest that air quality improves, although shop owners often worry about losing customers.", "What do shop owners often worry about?", ["Losing customers", "Pollution", "Rising rents"], 0, "Perder clientes.");
  R(RD, "The discovery of the tomb was accidental. A workman digging a foundation hit a stone slab that turned out to cover the entrance.", "How was the tomb found?", ["By accident", "After years of research", "Through satellite images"], 0, "Por accidente.");
  R(RD, "Critics have accused the film of being too sentimental. Its defenders, however, argue that its emotional honesty is precisely what makes it powerful.", "What do the film's defenders say?", ["It is emotionally honest", "It is too long", "It is badly acted"], 0, "Es emocionalmente honesta.");
  R(RD, "Fewer young people are learning to drive than in previous decades. Some experts blame the high cost of lessons, while others point to the growth of public transport.", "What is one reason experts give?", ["The high cost of lessons", "Driving has been banned", "Cars are too cheap"], 0, "El coste de las clases.");
  R(RD, "The restaurant's menu changes every month to reflect what is in season. Customers say this keeps the dishes fresh and gives them a reason to return.", "Why do customers like the menu?", ["It stays fresh and gives a reason to return", "It is cheap", "It has many desserts"], 0, "Se mantiene fresco y anima a volver.");
  R(RD, "Archaeologists believe the settlement was abandoned after a long drought. Pottery found on the site suggests that its inhabitants moved south.", "What do archaeologists think caused the abandonment?", ["A long drought", "A war", "An earthquake"], 0, "Una larga sequía.");
  L(LI, "Man: I've read the contract three times and I still don't understand clause five. Woman: Let's ask the lawyer to explain it before we sign anything.", "What does the woman suggest?", ["Asking the lawyer to explain it", "Signing it immediately", "Ignoring clause five"], 0, "Pedir al abogado que lo explique.");
  L(LI, "Girl: Do you think the company will hire more staff this year? Boy: Possibly, but I'd expect them to wait until the figures improve.", "What does the boy think?", ["The company will probably wait", "The company will hire a lot", "The company will close"], 0, "Esperará a que mejoren las cifras.");
  L(LI, "Woman: The new bridge is much more useful than I expected. Man: It has certainly cut my journey time, but the noise from the traffic is awful.", "What is the man's complaint?", ["Traffic noise", "The journey is too long", "The bridge is unsafe"], 0, "El ruido del tráfico.");
  L(LI, "Boy: Why are you so quiet? Girl: I've just found out I didn't get the scholarship I applied for.", "Why is the girl quiet?", ["She didn't get the scholarship", "She is tired", "She is angry at the boy"], 0, "No le dieron la beca.");
  L(LI, "Man: I'd never have guessed that the old factory would become a theatre. Woman: It's remarkable what a bit of imagination can achieve.", "What does the woman think?", ["Imagination can achieve remarkable things", "The factory should be demolished", "Theatres are too expensive"], 0, "La imaginación logra cosas notables.");

  G(GR, "The new road ___ by the time the next election is held.", ["will have been built", "will be built", "has built"], 0, "Futuro perfecto pasivo.");
  R(RD, "Many employers now value soft skills, such as communication and teamwork, as highly as technical qualifications. Recruiters say these skills are harder to teach.", "Why do recruiters value soft skills?", ["They are harder to teach", "They are cheaper", "They are in fashion"], 0, "Son más difíciles de enseñar.");
  ITEMS.push(...out);
})();
