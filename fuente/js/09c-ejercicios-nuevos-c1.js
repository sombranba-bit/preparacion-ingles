import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel C1 (originales, al estilo de CAE):
   gramática y vocabulario, lectura con inferencia, escucha y reformulación. */
(function () {
  const out = [];
  const LV = "C1";
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

  const UE = "CAE · Use of English";
  G(UE, "Little ___ that the decision would have such far-reaching consequences.", ["did they realise", "they realised", "had they realised"], 0, "Inversión tras little en registro formal.");
  G(UE, "Had the committee ___ the evidence more carefully, it would have reached a different verdict.", ["examined", "examine", "examining"], 0, "Tercer condicional con inversión: had examined.");
  G(UE, "The proposal ___ with considerable reluctance by the board.", ["was received", "received", "has been received"], 0, "Pasiva: was received.");
  G(UE, "She ___ to be the most gifted pianist of her generation.", ["is widely held", "is widely holding", "widely holds"], 0, "Be widely held to be = se considera.");
  G(UE, "Not until the results ___ published did the scientists speak publicly.", ["were", "had been", "are"], 0, "Not until + pasiva en pasado: were published.");
  G(UE, "It is essential that every candidate ___ the form before the deadline.", ["submit", "submits", "submitting"], 0, "Subjuntivo tras essential that: forma base.");
  G(UE, "The negotiations ___ on for months before a settlement was reached.", ["dragged", "were dragged", "had dragged on to"], 0, "Drag on: pasado simple.");
  G(UE, "He ___ the blame for the failure on his assistant.", ["laid", "lay", "lain"], 0, "Lay the blame on = echar la culpa a.");
  G(UE, "The council has ___ to the pressure from local residents.", ["given in", "given up", "given out"], 0, "Give in = ceder.");
  G(UE, "Whatever ___ the outcome, we must accept it with good grace.", ["the", "is", "a"], 0, "Whatever + sustantivo: the outcome.");
  G(UE, "The directors were ___ aware of the risks involved.", ["fully", "full", "fulfilled"], 0, "Fully aware.");
  G(UE, "She was ___ to take responsibility for the error.", ["quick", "fast", "fastly"], 0, "Quick to + infinitivo.");
  G(UE, "Had I ___ about the delay, I would have rearranged the meeting.", ["known", "knew", "know"], 0, "Inversión condicional 3: had known.");
  G(UE, "The lecture was ___ over our heads.", ["way", "much", "far"], 0, "Go over someone's head: way over our heads.");
  G(UE, "The article ___ the government for its failure to act.", ["castigates", "castigates on", "castigates of"], 0, "Castigate someone = criticar duramente.");
  G(UE, "I was ___ to find that the house had already been sold.", ["dismayed", "dismaying", "dismay"], 0, "Adjetivo participial: dismayed.");
  G(UE, "The lawyer ___ to the court that the evidence had been tampered with.", ["alleged", "alleged about", "alleged of"], 0, "Allege that = alegar que.");
  G(UE, "The problem ___ in a lack of communication between departments.", ["lies", "lays", "lied"], 0, "The problem lies in = el problema radica en.");
  G(UE, "He is ___ in the sense that he never says what he really thinks.", ["disingenuous", "disinterested", "unassuming"], 0, "Disingenuous = poco sincero.");
  G(UE, "The offer was ___ tempting that she accepted it straight away.", ["so", "such", "too"], 0, "So + adjetivo + that.");
  G(UE, "I would sooner ___ than pretend to agree.", ["resign", "to resign", "resigning"], 0, "Would sooner + verbo base.");
  G(UE, "The manager is reluctant ___ any changes until the audit is complete.", ["to make", "making", "make"], 0, "Reluctant to + infinitivo.");
  G(UE, "Her speech was ___ in humour and warmth.", ["laced", "lacked", "lacquered"], 0, "Laced with = impregnado de.");
  G(UE, "The evidence, ___ in the report, was overwhelming.", ["as summarised", "summarised as", "which summarised"], 0, "Participio reducido: as summarised = tal como se resume.");
  G(UE, "They ___ the project for lack of funds.", ["shelved", "shelved on", "shelves off"], 0, "Shelve = aparcar.");
  G(UE, "We had ___ a clear idea of what the client wanted.", ["no", "none", "nothing"], 0, "No + sustantivo.");
  G(UE, "The director ___ the decision to close the factory.", ["defended", "defended on", "defended for"], 0, "Defend a decision.");
  G(UE, "I'm ___ the impression that the results are being concealed.", ["under", "over", "in"], 0, "Be under the impression = tener la impresión.");
  G(UE, "Hardly ___ the first paragraph when she realised it was a forgery.", ["had she read", "she had read", "did she read"], 0, "Hardly + inversión con had.");
  G(UE, "The rescue team reached the climbers ___ the storm had passed.", ["only after", "only when after", "after only"], 0, "Only after.");
  G(UE, "The ruling ___ a major shift in the way courts interpret the law.", ["signals", "sighs", "sings"], 0, "Signal a shift.");
  G(UE, "She ___ the offer, citing her commitments to her family.", ["declined", "declined of", "declined to"], 0, "Decline an offer.");
  G(UE, "The committee ___ the candidates on the basis of their experience.", ["assessed", "assessed of", "assessed for"], 0, "Assess candidates.");
  G(UE, "It was a ___ of the situation that nobody had anticipated.", ["complication", "complicate", "complicated"], 0, "Sustantivo: complication.");

  const RD = "CAE · Reading";
  R(RD, "Some historians contend that the printing press did not so much spread knowledge as concentrate it in the hands of those who could afford to publish. Others counter that its democratising effects were profound, if slow to materialise.", "What do the other historians argue?", ["The printing press had slow but profound democratising effects", "The printing press only benefited the rich", "The printing press was never widely used"], 0, "Efectos democratizadores lentos pero profundos.");
  R(RD, "The reforestation project has been hailed as a triumph, yet its critics note that the planted species are poorly suited to the local climate and may not survive the next drought.", "What do the critics doubt?", ["That the project was a triumph", "That the planted species will survive", "That the project was funded"], 1, "Que las especies sobrevivan.");
  R(RD, "Few would dispute that the novel is ambitious. What is less certain is whether its ambition is matched by execution; several chapters, the reviewer suggests, read as though they were written in a hurry.", "What does the reviewer suggest about some chapters?", ["They were carefully revised", "They seem rushed", "They are the best in the book"], 1, "Parecen escritos a toda prisa.");
  R(RD, "Proponents of the scheme point to its low cost and rapid rollout. Detractors, meanwhile, warn that the savings are illusory once the long-term maintenance expenses are factored in.", "What do the detractors claim?", ["The savings are not real in the long run", "The scheme is too slow", "The scheme is too expensive to launch"], 0, "Los ahorros son ilusorios a largo plazo.");
  R(RD, "The mayor's decision to pedestrianise the square was initially met with hostility from local traders, many of whom feared a collapse in footfall. Within a year, however, the same traders were lobbying for the restrictions to be extended.", "How did the traders' attitude change?", ["They began to support the restrictions", "They closed their shops", "They campaigned against the mayor"], 0, "Pasaron a apoyar las restricciones.");
  R(RD, "Whether or not one accepts the author's thesis, the book compels attention. Its central claim, that memory is less a record than a reconstruction, is developed with unusual rigour.", "What does the reviewer say about the book?", ["It is hard to ignore", "It is poorly argued", "It is too short"], 0, "Obliga a prestarle atención.");
  R(RD, "For decades the region's economy relied on a single industry. The closure of its main plant forced a painful reassessment, and the area's leaders now speak of diversification as a matter of survival.", "What do the area's leaders consider diversification to be?", ["A necessity", "An optional extra", "A failure"], 0, "Una cuestión de supervivencia.");
  R(RD, "The study's authors are careful not to overstate their findings. They acknowledge that the sample was drawn from a single city and that the results may not generalise to rural populations.", "What limitation do the authors acknowledge?", ["The sample came from one city", "The data was lost", "The findings were overstated"], 0, "La muestra era de una ciudad.");
  R(RD, "Her early paintings, dismissed by contemporaries as crude, are now displayed in the world's leading galleries. Her later work, by contrast, has rarely been shown outside her homeland.", "How are her later works treated?", ["They are rarely exhibited abroad", "They are sold in every gallery", "They are considered crude"], 0, "Rara vez se exponen fuera de su país.");
  R(RD, "It would be a mistake to regard the decline of local newspapers as merely a commercial problem. Their disappearance leaves many communities without a shared record of what happens, and without anyone to hold local power to account.", "What is the author's main concern?", ["The loss of accountability in local communities", "The falling profits of newspapers", "The high cost of printing"], 0, "La pérdida de rendición de cuentas.");
  R(RD, "The festival's programme, though eclectic, was criticised for its lack of coherence. Organisers argued that diversity was the point, a claim that many visitors found unconvincing.", "What did many visitors think of the organisers' claim?", ["They found it unconvincing", "They fully agreed", "They had not read the programme"], 0, "No les convenció.");
  R(RD, "Economists disagree about whether the rise in automation will destroy jobs or merely transform them. The historical record offers reasons for both optimism and caution.", "What does the historical record offer?", ["Reasons for both optimism and caution", "Clear evidence that jobs will disappear", "Proof that automation has no effect"], 0, "Razones para ser optimistas y cautelosos.");
  R(RD, "Despite the controversy surrounding his methods, the surgeon's results were undeniably impressive. Few of his peers, however, were willing to adopt the technique without further trials.", "Why were other surgeons hesitant?", ["They wanted more trials before adopting it", "They thought the results were fake", "They disliked the surgeon personally"], 0, "Querían más ensayos.");
  R(RD, "The minister's speech was notable less for what it said than for what it omitted. Commentators noted the absence of any reference to the spending cuts that had dominated the previous week's headlines.", "What did commentators find notable about the speech?", ["What it left out", "How long it was", "Its humour"], 0, "Lo que omitió.");
  R(RD, "Language learners often assume that fluency is a matter of vocabulary. In practice, pragmatic competence, knowing when and how to say something, is frequently the decisive factor.", "What does the writer say is often decisive?", ["Pragmatic competence", "A large vocabulary", "Grammar exercises"], 0, "La competencia pragmática.");
  R(RD, "The team's failure to qualify was blamed on injuries, but a closer examination revealed deeper problems in recruitment and training that had gone unaddressed for years.", "What did a closer examination reveal?", ["Deeper problems in recruitment and training", "Only bad luck with injuries", "The referee was biased"], 0, "Problemas más profundos.");

  const LI = "CAE · Listening";
  L(LI, "Woman: I'm not sure the committee will accept the revised budget. Man: Perhaps not in its current form, but they may be persuaded if we address their concerns about staffing.", "What does the man suggest?", ["Addressing the staffing concerns", "Withdrawing the budget", "Ignoring the committee"], 0, "Atender preocupaciones de personal.");
  L(LI, "Man: Honestly, I thought the reviews would be harsher. Woman: They were mixed, but I think the critics were reluctant to dismiss the book entirely.", "What is the woman's view of the reviews?", ["The critics were reluctant to dismiss the book", "They were all very positive", "They were all very harsh"], 0, "Reticentes a descartarlo.");
  L(LI, "Woman: We've been told the software will be ready by March, but I'm sceptical given how many deadlines have already slipped. Man: Fair point. I'd build in some contingency time.", "What is the man's advice?", ["To build in contingency time", "To trust the March deadline", "To cancel the project"], 0, "Añadir margen de contingencia.");
  L(LI, "Girl: Didn't you find the second act a bit slow? Boy: I did at first, but in hindsight it sets up the ending rather brilliantly.", "How does the boy now view the second act?", ["It sets up the ending brilliantly", "It was too fast", "It was unnecessary"], 0, "Prepara brillantemente el final.");
  L(LI, "Man: The mayor's claims about the new bus routes don't stack up. Woman: I agree, but the figures she quoted are technically accurate; it's the conclusions that are misleading.", "What does the woman say about the mayor's figures?", ["They are accurate but the conclusions are misleading", "They are completely false", "They are unavailable"], 0, "Cifras exactas, conclusiones engañosas.");
  L(LI, "Woman: I'd always assumed he was the one who leaked the story. Man: So had I, until I saw the timestamps on the emails. It really wasn't him.", "What did the man discover?", ["The colleague had not leaked the story", "The colleague was the leak", "The emails were lost"], 0, "El colega no filtró la historia.");
  L(LI, "Man: The trouble with grand plans is that they rarely survive contact with reality. Woman: True, but they do provide a direction, even if the route changes.", "What is the woman's view of grand plans?", ["They provide direction even if they change", "They always fail", "They should be avoided"], 0, "Dan dirección aunque cambie la ruta.");
  L(LI, "Woman: Do you really think the government will reverse the decision? Man: I wouldn't bet on it, though public pressure has a way of changing ministers' minds.", "What is the man's attitude?", ["He is doubtful but acknowledges pressure can work", "He is certain of a reversal", "He thinks public pressure is pointless"], 0, "Duda, pero reconoce la presión.");
  L(LI, "Girl: I'm surprised the museum has decided to charge for entry. Boy: It's a sign of the times, I suppose, though many visitors will feel it's a step backwards.", "How does the boy feel about the decision?", ["It is a step backwards for many visitors", "It is a welcome change", "He hasn't formed an opinion"], 0, "Un paso atrás para muchos.");
  L(LI, "Man: Do you think the report reflects the true state of the industry? Woman: Only in part. It relies heavily on the companies' own disclosures, which are rarely impartial.", "What is the woman's concern about the report?", ["It relies on biased disclosures", "It is too brief", "It was not published"], 0, "Se basa en declaraciones poco imparciales.");
  L(LI, "Woman: I've been thinking about whether to take the transfer. Man: You know my view: the offer is generous, but you'd be giving up a lot of stability.", "What does the man think?", ["The offer is generous but stability is lost", "The transfer is a bad idea", "She should take it immediately"], 0, "La oferta es buena pero pierde estabilidad.");
  L(LI, "Man: Why did the negotiations collapse? Woman: Mainly because neither side was prepared to concede on the question of pensions.", "What caused the collapse?", ["Neither side would concede on pensions", "The venue was unsuitable", "A journalist leaked the terms"], 0, "Ninguno cedía en las pensiones.");
  L(LI, "Girl: Your presentation was very persuasive. Boy: Thanks, though I suspect the audience was more impressed by the slides than by my argument.", "What does the boy suspect?", ["The slides impressed the audience more than the argument", "The audience was bored", "The slides were badly designed"], 0, "Las diapositivas impresionaron más.");
  L(LI, "Woman: I'd rather we waited for the test results before making a decision. Man: I understand, but we can't afford to stand still while the market moves.", "What is the man's position?", ["They can't wait while the market moves", "They should wait for the results", "They should abandon the project"], 0, "No pueden esperar.");
  L(LI, "Boy: I don't see why the council is so keen on the new road. Girl: They'll tell you it's about traffic, but the land it's built on has been earmarked for development for years.", "What does the girl suggest is the real reason?", ["Land for development", "Reducing traffic", "Improving air quality"], 0, "Terrenos para urbanizar.");

  const TR = "CAE · Use of English";
  T(TR, "Rewrite: 'Although the results were disappointing, the team remained optimistic.' → 'Disappointing ___, the team remained optimistic.'", "Inversión de adjetivo con «though».", ["though the results were", "though results were"], "Disappointing though the results were.");
  T(TR, "Rewrite: 'I\'m sorry I didn\'t call you.' → 'I ___ not calling you.'", "Usa un verbo que expresa arrepentimiento.", ["regret"], "I regret not calling you.");
  T(TR, "Rewrite: 'It is possible that the flight will be delayed.' → 'The flight ___ delayed.'", "Probabilidad: may / might.", ["may be", "might be", "could be"], "May / might be.");
  T(TR, "Rewrite: 'You must not use your phone during the exam.' → 'Using your phone during the exam ___.'", "Prohibición en forma de «is not allowed».", ["is not allowed", "is prohibited", "is forbidden"], "Is not allowed / prohibited / forbidden.");
  T(TR, "Rewrite: 'I didn't expect such a warm welcome.' → 'Such ___ welcome I hadn't expected.'", "Inversión con «such a».", ["a warm"], "Such a warm welcome.");

  G(UE, "Such ___ the chaos that the police had to close the station.", ["was", "were", "had been"], 0, "Such + was + sustantivo para consecuencia.");
  G(UE, "The senator ___ to have accepted the bribe, though he denies it.", ["is alleged", "alleges", "is alleging"], 0, "Be alleged to have + participio.");
  G(UE, "The contract ___ be interpreted in more than one way.", ["is open to", "is open for", "opens to"], 0, "Be open to interpretation.");
  G(UE, "He ___ his reputation on a single, risky investment.", ["staked", "risked on", "bet of"], 0, "Stake one's reputation on.");
  G(UE, "I'd have no objection ___ the meeting being moved to Tuesday.", ["to", "for", "at"], 0, "Have no objection to + -ing.");
  G(UE, "No sooner ___ the report than the manager called a meeting.", ["had they published", "they had published", "did they published"], 0, "No sooner + inversión con had.");
  G(UE, "The judge ___ the defendant of all charges.", ["acquitted", "acquitted from", "absolved for"], 0, "Acquit someone of.");
  G(UE, "She ___ a remarkable degree of composure during the crisis.", ["displayed", "displayed of", "exhibited on"], 0, "Display composure.");
  G(UE, "Were the proposal ___ to a vote, it would almost certainly fail.", ["put", "placed", "set on"], 0, "Put to a vote.");
  G(UE, "The conclusions ___ with the evidence presented in the appendix.", ["are at odds", "are odds", "are in odds"], 0, "Be at odds with = estar en desacuerdo con.");
  G(UE, "Their claims ___ scrutiny once the documents were examined.", ["did not withstand", "did not stand up with", "did not hold of"], 0, "Withstand scrutiny = resistir el escrutinio.");
  G(UE, "The whole affair was ___ with secrecy from start to finish.", ["shrouded", "covered of", "wrapped on"], 0, "Shroud in secrecy.");
  R(RD, "The architect's designs are often described as audacious, but her buildings are in fact governed by a rigorous concern for the lives of those who use them. The boldness lies in the forms, not in the purpose.", "Where does the architect's boldness lie?", ["In the forms", "In the purpose", "In the cost"], 0, "En las formas.");
  R(RD, "Public trust in institutions tends to erode gradually, then collapse suddenly. Once a scandal exposes a pattern of concealment, even routine announcements are met with suspicion.", "What happens after a scandal exposes concealment?", ["Routine announcements are treated with suspicion", "Trust is restored at once", "Institutions are dissolved"], 0, "Se sospecha incluso de anuncios rutinarios.");
  R(RD, "Ancient coins recovered from the seabed suggest that trade routes linking the two regions were far more extensive than scholars had assumed. The coins, many bearing foreign inscriptions, now prompt a rethink of earlier models.", "What do the coins prompt scholars to do?", ["Reconsider earlier models", "Abandon archaeology", "Ignore foreign influence"], 0, "Replantear modelos anteriores.");
  R(RD, "Although the report was commissioned to address rising costs, its most striking finding concerned staff morale, which the authors describe as 'quietly corrosive'.", "What is the report's most striking finding?", ["Staff morale is quietly corrosive", "Costs are falling", "Management is too strict"], 0, "La moral del personal se deteriora en silencio.");
  R(RD, "Writers who rely heavily on adjectives often produce prose that is vivid but imprecise. A stronger verb, the editor insists, does more work than three decorative adjectives.", "What does the editor prefer?", ["Stronger verbs", "More adjectives", "Longer sentences"], 0, "Verbos más fuertes.");
  R(RD, "Many fans of the series were disappointed by its final season, arguing that the plot had been resolved too hastily. The showrunners, however, maintained that the ending had been planned from the outset.", "What did the showrunners claim?", ["The ending had been planned from the start", "The series was cancelled", "The fans wrote the ending"], 0, "El final estaba planeado desde el principio.");
  R(RD, "Local councils have long struggled to balance development with conservation. Recent legislation, which obliges planners to consider heritage sites at an early stage, has been welcomed by conservationists.", "How have conservationists reacted to the legislation?", ["They have welcomed it", "They have opposed it", "They have ignored it"], 0, "Lo han acogido bien.");
  R(RD, "The company's sudden change of strategy surprised analysts, who had grown accustomed to its cautious approach. Some suspected a reaction to pressure from shareholders rather than a considered change of direction.", "What did some analysts suspect?", ["A reaction to shareholder pressure", "A merger was planned", "The CEO had resigned"], 0, "Reacción a la presión de los accionistas.");
  R(RD, "Translators often face a dilemma: a literal rendering may preserve the words but lose the tone, while a free version may capture the tone at the cost of fidelity to the original.", "What dilemma do translators face?", ["Preserving words versus tone", "Choosing between two languages", "Deciding which book to translate"], 0, "Palabras frente a tono.");
  L(LI, "Man: I'm not convinced the opposition has a coherent alternative. Woman: Coherence isn't the only currency in politics; sometimes a clear message is enough to win the argument.", "What is the woman's point?", ["A clear message can be enough", "Coherence is always essential", "The opposition has a strong plan"], 0, "Un mensaje claro puede bastar.");
  L(LI, "Woman: The study claims a link between the drug and the side effect, but the sample was tiny. Man: Exactly. Until it's replicated on a larger scale, I'd treat the finding with caution.", "What is the man's advice?", ["To treat the finding with caution", "To start using the drug", "To ignore the side effect"], 0, "Tratar el hallazgo con cautela.");
  L(LI, "Girl: Do you think the novel will translate well? Boy: The prose is so idiomatic that I'm not optimistic, though the story might survive the journey.", "How does the boy feel about the translation?", ["Not optimistic, but the story might survive", "Very optimistic", "He hasn't read the novel"], 0, "Poco optimista, pero la historia podría sobrevivir.");
  L(LI, "Man: The minutes suggest the board knew about the shortfall months earlier. Woman: Which means the public statement last spring was, at best, misleading.", "What does the woman conclude?", ["The public statement was misleading", "The board was unaware", "The shortfall was minor"], 0, "La declaración fue engañosa.");
  L(LI, "Woman: I'd assumed the new hires would be a boost, but the training period has been longer than anyone anticipated. Man: That's the price of expertise, I suppose.", "What does the man suggest about the training?", ["It is the price of expertise", "It should be cancelled", "It was unexpectedly short"], 0, "Es el precio de la experiencia.");
  L(LI, "Boy: Why does the museum insist on keeping the original documents locked away? Girl: Conservation, mostly. Light and humidity would damage them within years.", "Why are the documents locked away?", ["To protect them from light and humidity", "Because they are fakes", "To sell them"], 0, "Para protegerlos de la luz y la humedad.");
  L(LI, "Man: You seem unusually calm about the audit. Woman: I've learned that the worst outcomes are rarely as bad as the rumours suggest.", "What is the woman's attitude to the audit?", ["She is calm because rumours exaggerate", "She is worried about the outcome", "She has refused to take part"], 0, "Los rumores exageran.");
  L(LI, "Girl: The compromise seems fair to me. Boy: It's fair in principle, but in practice the costs fall almost entirely on the smaller partners.", "Who bears most of the costs?", ["The smaller partners", "The largest partner", "The government"], 0, "Los socios más pequeños.");

  G(UE, "I ___ the impression that the meeting had been cancelled, but I was mistaken.", ["was under", "was in", "was over"], 0, "Be under the impression.");

  ITEMS.push(...out);
})();
