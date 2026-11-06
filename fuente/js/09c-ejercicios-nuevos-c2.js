import { ITEMS } from "./01-nucleo-niveles-audio.js";

/* 100 ejercicios nuevos de nivel C2 (originales, al estilo de CPE):
   gramática y vocabulario avanzado, lectura con inferencia, escucha y reformulación. */
(function () {
  const out = [];
  const LV = "C2";
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

  const UE = "CPE · Use of English";
  const RD = "CPE · Reading and Use of English";
  const LI = "CPE · Listening";
  G(UE, "Seldom ___ such a meticulous piece of research.", ["have I encountered", "I have encountered", "did I encounter"], 0, "Inversión tras seldom en registro formal.");
  G(UE, "So ___ were the delegates that the summit was postponed.", ["divided", "dividing", "divide"], 0, "So + adjetivo participial + que: so divided.");
  G(UE, "The committee's deliberations were conducted ___ the strictest confidentiality.", ["under", "within", "beneath"], 0, "Under confidentiality / under the strictest confidentiality.");
  G(UE, "Not ___ the warnings were ignored did the government act.", ["until", "unless", "before"], 0, "Not until + cláusula y después inversión: did the government act.");
  G(UE, "The author's prose is ___ with allusions to classical mythology.", ["studded", "stuffed", "crammed of"], 0, "Be studded with = estar salpicado de.");
  G(UE, "Her argument ___ on a premise that few would accept without question.", ["hinges", "hangs", "rests of"], 0, "Hinge on.");
  G(UE, "The regulator's decision ___ the industry's expectations.", ["ran counter to", "ran against of", "ran up to"], 0, "Run counter to = ir en contra de.");
  G(UE, "He ___ no pains to ensure that the event ran smoothly.", ["spared", "saved", "left"], 0, "Spare no pains = esforzarse al máximo.");
  G(UE, "The remark was clearly ___ at the chairman, though no names were mentioned.", ["aimed", "targeted to", "pointed of"], 0, "Aim at someone.");
  G(UE, "It is ___ that the tribunal will rule before the end of the year.", ["unlikely", "improbable of", "doubtful for"], 0, "It is unlikely that.");
  G(UE, "Had the evidence ___ less compelling, the verdict might have been different.", ["been", "be", "was"], 0, "Inversión condicional 3: had been.");
  G(UE, "The minister ___ a veil of secrecy over the negotiations.", ["drew", "pulled", "threw"], 0, "Draw a veil over = velar, ocultar.");
  G(UE, "Her resignation came as ___ of a shock to the board.", ["something", "somewhat", "someone"], 0, "Something of a shock = algo sorprendente.");
  G(UE, "The findings are ___ to be disputed by the research community.", ["likely", "probable", "apt for"], 0, "Be likely to.");
  G(UE, "He ___ the old guard for their unwillingness to embrace change.", ["upbraided", "upbraided of", "upbraided for to"], 0, "Upbraid someone for = reprender.");
  G(UE, "No ___ how carefully the plan was drafted, unforeseen problems emerged.", ["matter", "matters", "matter of"], 0, "No matter how.");
  G(UE, "The report was ___ with inaccuracies, which undermined its credibility.", ["riddled", "littered of", "strewn for"], 0, "Riddled with = plagado de.");
  G(UE, "The company has been ___ of concealing the true extent of its losses.", ["accused", "blamed for", "charged to"], 0, "Accuse someone of.");
  G(UE, "I'd ___ not comment on the matter until the investigation is complete.", ["rather", "soon", "better"], 0, "I'd prefer not to + infinitivo.");
  G(UE, "Only then ___ the full magnitude of the problem.", ["did they grasp", "they grasped", "had they grasped to"], 0, "Only then + inversión: did they grasp.");
  G(UE, "The artist's early work ___ the influence of her teachers.", ["bears", "bares", "wears"], 0, "Bear the influence = mostrar la influencia.");
  G(UE, "The judge ___ the appeal on procedural grounds.", ["dismissed", "dismissed of", "rejected for of"], 0, "Dismiss an appeal.");
  G(UE, "Such ___ the scale of the disaster that aid arrived weeks late.", ["was", "were", "had been"], 0, "Such was the scale...");
  G(UE, "She has a ___ for wading into arguments she knows nothing about.", ["propensity", "propension of", "tendency for of"], 0, "Propensity for.");
  G(UE, "The speech was a ___ of the government's position on the matter.", ["distillation", "distill", "distilled"], 0, "Sustantivo: distillation = resumen esencial.");
  G(UE, "The mayor was ___ in the midst of the scandal.", ["embroiled", "embroil", "embroiling"], 0, "Be embroiled in = verse envuelto en.");
  G(UE, "Little ___ the consequences of their decision until it was too late.", ["did they foresee", "they foresaw", "had they foreseen"], 0, "Little + inversión.");
  G(UE, "The essay ___ a sophisticated grasp of the subject's complexities.", ["evinces", "evinces of", "evinces to"], 0, "Evince = mostrar, revelar.");
  G(UE, "The proposal was ___ down on the grounds that it was impractical.", ["voted", "passed", "voiced"], 0, "Vote down = rechazar mediante votación.");
  G(UE, "The negotiators reached an ___ that satisfied neither side entirely.", ["accommodation", "accommodate", "accommodating"], 0, "Sustantivo: accommodation = acuerdo.");
  G(UE, "Were she ___ to accept the post, the company would be delighted.", ["willing", "wishing to", "keen of"], 0, "Be willing to.");
  R(RD, "The essayist's defence of ambiguity is more subtle than its critics allow. Ambiguity, she argues, is not a failure of communication but a deliberate invitation to the reader to participate in making meaning.", "What does the essayist argue about ambiguity?", ["It invites readers to make meaning", "It is a failure of communication", "It should be avoided in essays"], 0, "Invita al lector a construir el sentido.");
  R(RD, "Her memoir is at once a chronicle of exile and a meditation on the impossibility of ever fully belonging. What makes it remarkable is its refusal to offer consolation.", "What makes the memoir remarkable?", ["It offers no consolation", "It is very short", "It is a novel"], 0, "No ofrece consuelo.");
  R(RD, "Historians have long debated whether the revolution was driven by ideology or by economic desperation. The most persuasive recent accounts, however, reject this dichotomy, showing how the two were inextricably entangled.", "What do the recent accounts argue?", ["The two causes were inseparable", "Ideology was the only cause", "Economics played no role"], 0, "Las dos causas estaban inextricablemente unidas.");
  R(RD, "The committee's findings, though couched in the language of caution, amount to a damning indictment of the agency's oversight. Few readers will fail to notice what the report leaves unsaid.", "What does the report's language suggest?", ["It is cautious but critical", "It praises the agency", "It is neutral"], 0, "Cauteloso pero muy crítico.");
  R(RD, "What begins as a modest proposal for a footbridge soon becomes, in the councillors' hands, a referendum on the city's ambitions for itself. The bridge is never built, but the debate lingers for a decade.", "What became of the bridge?", ["It was never built", "It was built in a year", "It was demolished"], 0, "Nunca se construyó.");
  R(RD, "Linguists disagree about how far a language shapes thought. The strong version of the hypothesis has been largely abandoned, though a more modest claim, that language nudges habitual attention, has held up well under experiment.", "Which version of the hypothesis has held up under experiment?", ["The modest version", "The strong version", "Neither version"], 0, "La versión modesta.");
  R(RD, "The novelist's habit of withholding information forces the reader into an uneasy complicity. We begin to suspect the narrator, and then to suspect ourselves for having trusted him so readily.", "What does the novelist's technique force the reader to do?", ["Become complicit and suspicious", "Read the book quickly", "Trust the narrator completely"], 0, "Complicidad incómoda y sospecha.");
  R(RD, "The pharmaceutical company's internal memos, leaked to the press, reveal a deliberate decision to downplay adverse reactions. Its subsequent apology, the paper notes, was notable for what it did not admit.", "What does the newspaper say about the apology?", ["It did not admit key facts", "It admitted everything", "It was never published"], 0, "No admitió hechos clave.");
  R(RD, "The city's surge in property prices has displaced many long-standing residents, whose presence once gave the neighbourhood its character. Ironically, the same charm that attracts newcomers is steadily eroded by their arrival.", "What is the irony described?", ["Newcomers erode the charm that attracted them", "Residents are attracted to new areas", "Prices fall when newcomers arrive"], 0, "La llegada erosiona el encanto que los atrajo.");
  R(RD, "Despite a half-century of research, the precise mechanism by which the drug acts on the brain remains elusive. Researchers are cautiously optimistic that new imaging techniques may finally resolve the question.", "What gives researchers hope?", ["New imaging techniques", "A new drug", "Funding from the government"], 0, "Nuevas técnicas de imagen.");
  R(RD, "The translator's note, though brief, betrays a sensitivity to the untranslatable that many authors would envy. Rather than smoothing over the ambiguity, she draws the reader's attention to it.", "How does the translator handle ambiguity?", ["She draws attention to it", "She removes it", "She ignores it"], 0, "Llama la atención sobre ella.");
  R(RD, "Few policies have been subjected to such intense scrutiny as the reform of the pension system. Its architects insist the changes are overdue; its opponents see in them a quiet dismantling of the social contract.", "How do the opponents see the reform?", ["As a dismantling of the social contract", "As overdue", "As a minor adjustment"], 0, "Como un desmantelamiento del contrato social.");
  L(LI, "Woman: Your objection is well founded, but I'd argue that the premise of the entire study is flawed, not merely its conclusions. Man: That's a bolder claim than I was prepared to make.", "What is the woman's claim?", ["The premise of the study is flawed", "The conclusions are correct", "The study is irrelevant"], 0, "La premisa del estudio es errónea.");
  L(LI, "Man: The minutes make curious reading. The chairman seems to have anticipated every objection. Woman: Which suggests the outcome had been settled well before the meeting began.", "What does the woman suggest?", ["The outcome had been decided beforehand", "The chairman was unprepared", "The minutes are incomplete"], 0, "El resultado estaba decidido antes.");
  L(LI, "Girl: I can't quite decide whether his silence was tact or evasion. Boy: With him, I'd hazard it's usually both, and that's rather the point.", "What is the boy's view of the man's silence?", ["It is both tactful and evasive", "It is purely tactful", "It is simply rude"], 0, "Es tacto y evasión a la vez.");
  L(LI, "Woman: The authors would have us believe the market corrected itself, but the data points rather to a managed retreat. Man: Hardly a comforting distinction for the investors.", "What does the man think of the distinction?", ["It is hardly comforting for investors", "It is reassuring", "It is irrelevant"], 0, "Poco tranquilizador para los inversores.");
  L(LI, "Man: I wouldn't read too much into the delay. Woman: Easy for you to say; you weren't the one who had to placate the donors.", "How does the woman feel about the delay?", ["Frustrated, since she had to placate donors", "Relieved", "Indifferent"], 0, "Frustrada por tener que tranquilizar a los donantes.");
  L(LI, "Girl: Did the panel actually endorse the proposal? Boy: They endorsed its principles, but balked at the costings, which is a polite way of saying they rejected it.", "What does the boy imply about the panel?", ["It effectively rejected the proposal", "It fully endorsed it", "It has not yet met"], 0, "Lo rechazó en la práctica.");
  L(LI, "Woman: I'd half expected the archive to be a dusty backwater. Man: On the contrary, it's a hive of activity; the staff are digitising thousands of manuscripts a month.", "What surprised the woman?", ["The archive is very active", "The archive is closed", "The staff are idle"], 0, "El archivo está muy activo.");
  L(LI, "Man: The apology was graciously worded, but it didn't address the underlying grievance. Woman: No, it was an apology for the tone rather than for the substance.", "What does the woman say about the apology?", ["It apologised for tone, not substance", "It addressed the grievance", "It was not published"], 0, "Se disculpó por el tono, no por el fondo.");

  const TR = "CPE · Use of English";
  T(TR, "Rewrite: 'Although he had every reason to be angry, he remained calm.' → 'Angry ___ he had every reason to be, he remained calm.'", "Inversión con «as» y adjetivo.", ["as"], "Adjective + as + sujeto + verbo (concesivo).");
  T(TR, "Rewrite: 'It was a mistake to trust him.' → 'Trusting him ___ a mistake.'", "Verbo copulativo en 3.ª persona.", ["was"], "Gerund subject + was.");
  T(TR, "Rewrite: 'I'm not sure whether she will accept.' → 'It is ___ whether she will accept.'", "Expresión de duda con «unclear».", ["unclear", "uncertain", "doubtful"], "It is unclear/uncertain/doubtful whether.");
  T(TR, "Rewrite: 'The results surprised everybody.' → 'The results ___ everybody's expectations.'", "Verbo que significa «superar».", ["exceeded", "surpassed"], "Exceed/surpass expectations.");
  T(TR, "Rewrite: 'He only realised his mistake after it was too late.' → 'Only after it was too late ___ his mistake.'", "Inversión tras «only after».", ["did he realise", "did he realize"], "Only after... did he realise.");

  G(UE, "Nowhere ___ such ingenuity displayed as in the designs submitted that year.", ["was", "is", "has been"], 0, "Inversión tras nowhere (registro muy formal).");
  G(UE, "The defendant's lawyers ___ every possible avenue before conceding defeat.", ["explored", "explore", "exploring"], 0, "Pasado simple para una acción terminada.");
  G(UE, "Not a ___ of evidence supports the claim that the figures were falsified.", ["shred", "amount", "bag"], 0, "Not a shred of evidence = ni una pizca de pruebas.");
  G(UE, "The committee was ___ divided on the question of funding.", ["sharply", "sharp", "sharpen"], 0, "Adverbio ante participio: sharply divided.");
  G(UE, "She is adamant that the decision ___ be reconsidered.", ["should not be", "is not being", "had not been"], 0, "Insistir: should not be reconsidered (mantener el subjuntivo).");
  G(UE, "The lecture covered ___ ground in a single hour.", ["a great deal of", "a lot of of", "much of to"], 0, "A great deal of ground = mucho terreno cubierto.");
  G(UE, "He ___ up the argument with an unexpectedly lucid summary.", ["rounded", "rounded off", "rounded out to"], 0, "Round off = concluir.");
  G(UE, "The directors have ___ the plans for a merger indefinitely.", ["shelved", "shelved of", "shelved for"], 0, "Shelve indefinitely.");
  G(UE, "It is ___ hardly surprising that the project ran over budget.", ["perhaps", "maybe of", "possibly to"], 0, "Perhaps/hardly: it is perhaps hardly surprising.");
  G(UE, "I cannot ___ the feeling that we have overlooked something important.", ["shake", "shaken", "shaking off"], 0, "Shake off / shake the feeling.");
  G(UE, "The concession was made ___ reluctance and only after prolonged pressure.", ["with", "for", "by"], 0, "With reluctance.");
  G(UE, "The proposal ___ to the committee for review last spring.", ["was submitted", "submitted", "has submitted"], 0, "Pasiva en pasado simple.");
  G(UE, "Would that she ___ the courage to speak out earlier.", ["had found", "found", "has found"], 0, "Would that + pasado perfecto (deseo lamentado).");
  G(UE, "Scarcely had the orchestra begun ___ the audience began to cough.", ["when", "then", "than"], 0, "Scarcely... when.");
  G(UE, "The story, ___ the details were later verified, caused a sensation.", ["once", "when", "while"], 0, "Once + participio/oración: once the details were verified.");
  G(UE, "No sooner had the storm abated ___ the rescue teams set out.", ["than", "when", "then"], 0, "No sooner... than.");
  G(UE, "She ___ a reputation for fairness that is rarely questioned.", ["has earned", "earns", "has been earning of"], 0, "Earn a reputation.");
  G(UE, "The lecturer's remarks were so ___ that half the audience dozed off.", ["tedious", "tediously", "tedium"], 0, "Adjetivo tras so ... that.");
  G(UE, "They are ___ to the view that the matter should be left alone.", ["inclined", "disposed of", "minded for"], 0, "Be inclined to the view.");
  R(RD, "The archaeologist's discovery was initially dismissed as a hoax. Subsequent analysis, however, confirmed that the artefacts were genuine, forcing a substantial revision of the region's chronology.", "What did the subsequent analysis do?", ["It confirmed the artefacts were genuine", "It proved the discovery was a hoax", "It dated the artefacts to the present day"], 0, "Confirmó que eran auténticos.");
  R(RD, "The novel's narrator is so unreliable that readers spend the entire book attempting to reconstruct a version of events he has deliberately obscured.", "What do the readers spend the book doing?", ["Trying to reconstruct the events", "Reading the narrator's diary", "Forgetting the plot"], 0, "Reconstruir los hechos.");
  R(RD, "Proponents of the scheme present it as a model of cooperation between public and private sectors. Critics, by contrast, see a transfer of risk onto taxpayers dressed up as partnership.", "How do critics characterise the scheme?", ["A transfer of risk to taxpayers", "A model of cooperation", "A successful partnership"], 0, "Traslado del riesgo a los contribuyentes.");
  R(RD, "It has become fashionable to lament the decline of attention spans, yet the evidence is more ambiguous than the lamentations suggest. What has changed, perhaps, is the context in which attention is demanded.", "What does the writer suggest has changed?", ["The context in which attention is demanded", "The length of books", "The ability to read"], 0, "El contexto en que se exige atención.");
  R(RD, "Marine biologists warn that the coral reef, already weakened by warming waters, is now vulnerable to a disease that spreads with alarming speed.", "What makes the reef vulnerable?", ["Warming waters and a fast-spreading disease", "Overfishing alone", "Tourism only"], 0, "Agua caliente y una enfermedad.");
  R(RD, "The philosopher's late work abandons the rigid categories of his earlier writing. Admirers see a mature humility; detractors detect a retreat from the very rigour that made him famous.", "How do detractors view the late work?", ["As a retreat from rigour", "As a sign of maturity", "As a masterpiece"], 0, "Como una retirada del rigor.");
  R(RD, "Few cities have reinvented themselves as thoroughly as this former industrial port. Warehouses have become galleries, shipyards have become housing, and the once-silent docks now throng with cyclists and tourists.", "What have the shipyards become?", ["Housing", "Galleries", "A port"], 0, "Viviendas.");
  R(RD, "The minister's reply was technically responsive but politically evasive. It addressed each question in turn while carefully avoiding the one that mattered most to the committee.", "What did the minister avoid?", ["The question that mattered most to the committee", "Every question", "The committee itself"], 0, "La pregunta más importante para el comité.");
  R(RD, "Public libraries, once viewed as quiet repositories of books, have increasingly become community hubs offering everything from language classes to job-search workshops.", "What role do public libraries now play?", ["Community hubs", "Quiet book repositories only", "Commercial bookshops"], 0, "Centros comunitarios.");
  R(RD, "Her mastery of the Japanese syntax is so complete that her translations read as if they had been composed in English from the outset.", "How do her translations read?", ["As if composed in English originally", "As clumsy and literal", "As summaries"], 0, "Como si se hubieran escrito en inglés.");
  L(LI, "Man: The expedition's findings were announced with great fanfare. Woman: Yes, but the journal's editors had clearly noticed the gaps in the methodology, which is why the article was buried in an appendix.", "What does the woman suggest?", ["The editors noticed flaws and buried the article", "The findings were ground-breaking", "The article was the main feature"], 0, "Los editores notaron fallos y lo relegaron.");
  L(LI, "Woman: I'm loath to dismiss the proposal outright, but its assumptions about demand strike me as wildly optimistic. Man: Agreed, though I'd like to see the sensitivity analysis before passing judgement.", "What does the man want to see?", ["The sensitivity analysis", "The budget", "A new proposal"], 0, "El análisis de sensibilidad.");
  L(LI, "Girl: Doesn't it strike you as odd that the director never once addressed the question of costs? Boy: Not particularly. Costs were never really her concern; she was interested in impact.", "What was the director interested in?", ["Impact", "Costs", "Timing"], 0, "El impacto.");
  L(LI, "Man: I was prepared for a fierce debate, but the discussion was remarkably civil. Woman: That's because the chair had quietly reached a consensus with the main factions in advance.", "Why was the discussion civil?", ["The chair had reached consensus in advance", "Nobody attended", "The topic was trivial"], 0, "El presidente había pactado antes.");
  L(LI, "Woman: The data are compelling, but we'd be mistaken to read causation into what is essentially a correlation. Man: Quite. Let's not let enthusiasm outrun the evidence.", "What is the man's warning?", ["Enthusiasm should not outrun the evidence", "The data are worthless", "The study should be expanded"], 0, "El entusiasmo no debe superar las pruebas.");
  L(LI, "Boy: The tenor's performance was technically flawless, yet I found it strangely cold. Girl: I know what you mean. There was precision but very little abandon.", "What does the girl agree with?", ["The performance lacked abandon", "The performance was emotional", "The tenor was off-key"], 0, "Faltaba entrega.");
  L(LI, "Man: Is there any realistic prospect of the talks resuming? Woman: Only if both parties are prepared to abandon the maximalist positions they've been defending in public.", "What is needed for the talks to resume?", ["Both parties must abandon maximalist positions", "A new mediator", "More funding"], 0, "Abandonar posturas maximalistas.");
  L(LI, "Girl: I can't help thinking the scheme was doomed from the start. Boy: Hindsight is a wonderful thing; at the time, it seemed a perfectly sensible gamble.", "What does the boy say about the scheme?", ["It seemed a sensible gamble at the time", "It was clearly doomed", "It was never implemented"], 0, "Parecía una apuesta sensata.");
  L(LI, "Woman: The moderator kept interrupting, which rather undermined the candidate's case. Man: Undermined it? I'd say it simply exposed its weaknesses.", "How do the speakers differ?", ["The man thinks the weaknesses were exposed, the woman thinks the case was undermined", "They agree entirely", "They disagree about the moderator's identity"], 0, "Matiz sobre cómo afectó al candidato.");
  T(TR, "Rewrite: 'The report was so badly written that nobody could follow it.' → 'The report was so badly written ___ could follow it.'", "Estructura negativa con «nobody».", ["that nobody"], "So... that nobody could follow it.");
  T(TR, "Rewrite: 'I had hardly sat down when the bell rang.' → 'Hardly ___ down when the bell rang.'", "Inversión con «hardly» y pasado perfecto.", ["had I sat"], "Hardly had I sat down when...");
  T(TR, "Rewrite: 'Despite his age, he still runs five miles a day.' → 'Old ___, he still runs five miles a day.'", "Concesivo con «as» e inversión.", ["as he is"], "Old as he is, ...");
  T(TR, "Rewrite: 'It is essential that the rules are followed.' → 'It is essential that the rules ___ followed.'", "Subjuntivo tras essential.", ["be"], "Subjuntivo: be followed.");

  G(UE, "Under no ___ should the documents be released before the hearing.", ["circumstances", "conditions of", "situations to"], 0, "Under no circumstances = bajo ningún concepto.");
  R(RD, "The poem's apparent simplicity conceals a dense web of allusions that rewards repeated reading. Each rereading unsettles a previous interpretation, which is perhaps the poem's point.", "What does each rereading do?", ["Unsettles a previous interpretation", "Confirms the first reading", "Makes the poem shorter"], 0, "Desestabiliza la interpretación anterior.");

  ITEMS.push(...out);
})();
