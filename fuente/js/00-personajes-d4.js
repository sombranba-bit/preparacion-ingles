// Personajes de la maqueta D4: dibujos, catálogo, precios y efectos. Los colores son fijos (como en la maqueta).
const spikes=(cx,cy,n,rIn,rOut)=>{let d='';for(let i=0;i<n;i++){const a=i*2*Math.PI/n,b1=a-Math.PI/n*.6,b2=a+Math.PI/n*.6,p=(r,t)=>`${(cx+r*Math.cos(t)).toFixed(1)} ${(cy+r*Math.sin(t)).toFixed(1)}`;d+=`M${p(rIn,b1)}L${p(rOut,a)}L${p(rIn,b2)}Z`;}return d;};
const SH='<ellipse cx="50" cy="93" rx="24" ry="4" fill="#2a1d14" opacity=".12"/>';
export const AV={
  ardilla:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="ga" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#f0ae6c"/><stop offset="1" stop-color="#a95a2a"/></radialGradient></defs>${SH}
    <path d="M68 74C92 72 100 48 88 30C86 42 80 52 70 56Z" fill="#c4743a" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <ellipse cx="30" cy="30" rx="10" ry="13" fill="#a95a2a" stroke="#2a1d14" stroke-width="1.6" transform="rotate(-18 30 30)"/>
    <ellipse cx="70" cy="30" rx="10" ry="13" fill="#a95a2a" stroke="#2a1d14" stroke-width="1.6" transform="rotate(18 70 30)"/>
    <ellipse cx="30" cy="31" rx="5" ry="7" fill="#f7b7b0" transform="rotate(-18 30 31)"/><ellipse cx="70" cy="31" rx="5" ry="7" fill="#f7b7b0" transform="rotate(18 70 31)"/>
    <circle cx="50" cy="56" r="31" fill="url(#ga)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="50" cy="68" rx="17" ry="13" fill="#fff1dc"/>
    <ellipse cx="38" cy="50" rx="6.5" ry="7" fill="#2a1d14"/><ellipse cx="62" cy="50" rx="6.5" ry="7" fill="#2a1d14"/>
    <circle cx="40" cy="47.5" r="2.4" fill="#fff"/><circle cx="64" cy="47.5" r="2.4" fill="#fff"/>
    <path d="M45 62Q50 58 55 62Q50 66 45 62Z" fill="#e0587a"/>
    <path d="M50 66Q48 72 43 70M50 66Q52 72 57 70" stroke="#2a1d14" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="28" cy="62" r="4.5" fill="#f0587a" opacity=".35"/><circle cx="72" cy="62" r="4.5" fill="#f0587a" opacity=".35"/></svg>`,
  zorro:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffab62"/><stop offset="1" stop-color="#d9531f"/></linearGradient></defs>${SH}
    <path d="M18 50L20 10L46 32Z" fill="#d9531f" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M82 50L80 10L54 32Z" fill="#d9531f" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M24 42L25 22L38 32Z" fill="#2a1d14"/><path d="M76 42L75 22L62 32Z" fill="#2a1d14"/>
    <path d="M12 48Q50 16 88 48Q86 84 50 90Q14 84 12 48Z" fill="url(#gf)" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M18 60Q30 56 50 82Q32 86 22 74Z M82 60Q70 56 50 82Q68 86 78 74Z" fill="#fff4e4"/>
    <path d="M28 50Q36 43 44 50Q36 55 28 50Z" fill="#2a1d14"/><path d="M72 50Q64 43 56 50Q64 55 72 50Z" fill="#2a1d14"/>
    <circle cx="36" cy="49.5" r="1.4" fill="#fff"/><circle cx="64" cy="49.5" r="1.4" fill="#fff"/>
    <ellipse cx="50" cy="76" rx="5" ry="3.6" fill="#2a1d14"/>
    <path d="M50 80Q47 84 44 82M50 80Q53 84 56 82" stroke="#2a1d14" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,
  erizo:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="ge" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#fbe2c2"/><stop offset="1" stop-color="#d9a06a"/></radialGradient></defs>${SH}
    <path d="${spikes(50,56,14,28,45)}" fill="#7a5238" stroke="#2a1d14" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="50" cy="58" r="28" fill="url(#ge)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="40" cy="55" rx="4.6" ry="5.2" fill="#2a1d14"/><ellipse cx="60" cy="55" rx="4.6" ry="5.2" fill="#2a1d14"/>
    <circle cx="41.5" cy="53.5" r="1.6" fill="#fff"/><circle cx="61.5" cy="53.5" r="1.6" fill="#fff"/>
    <path d="M33 48L30 45M38 47.5L37 44.5M62 47.5L63 44.5M67 48L70 45" stroke="#2a1d14" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="50" cy="66" rx="4.4" ry="3.2" fill="#e0587a"/>
    <path d="M44 72Q50 77 56 72" stroke="#2a1d14" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="31" cy="66" r="4.2" fill="#f0587a" opacity=".35"/><circle cx="69" cy="66" r="4.2" fill="#f0587a" opacity=".35"/></svg>`,
  gato:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gg" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#c9cdd8"/><stop offset="1" stop-color="#7d8496"/></radialGradient></defs>${SH}
    <path d="M20 48L18 12L44 30Z" fill="#7d8496" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M80 48L82 12L56 30Z" fill="#7d8496" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M24 40L24 22L36 31Z" fill="#f7b7b0"/><path d="M76 40L76 22L64 31Z" fill="#f7b7b0"/>
    <ellipse cx="50" cy="56" rx="32" ry="29" fill="url(#gg)" stroke="#2a1d14" stroke-width="1.6"/>
    <path d="M50 30V38M42 31L44 38M58 31L56 38" stroke="#4a5060" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="36" cy="52" rx="5.5" ry="6.5" fill="#9ee27a" stroke="#2a1d14" stroke-width="1"/><ellipse cx="64" cy="52" rx="5.5" ry="6.5" fill="#9ee27a" stroke="#2a1d14" stroke-width="1"/>
    <ellipse cx="36" cy="52" rx="1.6" ry="4.5" fill="#2a1d14"/><ellipse cx="64" cy="52" rx="1.6" ry="4.5" fill="#2a1d14"/>
    <circle cx="38" cy="49.5" r="1.6" fill="#fff"/><circle cx="66" cy="49.5" r="1.6" fill="#fff"/>
    <path d="M46 64H54L50 68Z" fill="#e0587a" stroke="#2a1d14" stroke-width="1" stroke-linejoin="round"/>
    <path d="M50 68Q48 72 44 71M50 68Q52 72 56 71" stroke="#2a1d14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M22 62L8 59M22 67L9 69M78 62L92 59M78 67L91 69" stroke="#2a1d14" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="28" cy="64" r="4" fill="#f0587a" opacity=".3"/><circle cx="72" cy="64" r="4" fill="#f0587a" opacity=".3"/></svg>`,
  pinguino:`<svg viewBox="0 0 100 100" aria-hidden="true">${SH}
    <ellipse cx="50" cy="56" rx="31" ry="34" fill="#2a2f3d" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="50" cy="63" rx="20" ry="25" fill="#fff8ef"/>
    <ellipse cx="50" cy="40" rx="18" ry="14" fill="#fff8ef" opacity="0"/>
    <circle cx="41" cy="44" r="7" fill="#fff" stroke="#2a1d14" stroke-width="1.2"/><circle cx="59" cy="44" r="7" fill="#fff" stroke="#2a1d14" stroke-width="1.2"/>
    <circle cx="42.5" cy="45" r="3.6" fill="#2a1d14"/><circle cx="60.5" cy="45" r="3.6" fill="#2a1d14"/>
    <circle cx="43.5" cy="43.6" r="1.1" fill="#fff"/><circle cx="61.5" cy="43.6" r="1.1" fill="#fff"/>
    <path d="M44 53L50 60L56 53Z" fill="#ffb22e" stroke="#2a1d14" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="32" cy="54" r="3.6" fill="#f0587a" opacity=".4"/><circle cx="68" cy="54" r="3.6" fill="#f0587a" opacity=".4"/>
    <path d="M30 88L24 93L38 92ZM70 88L76 93L62 92Z" fill="#ffb22e" stroke="#2a1d14" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  bruno:`<svg viewBox="0 0 100 100" aria-hidden="true">${SH}<circle cx="26" cy="32" r="12" fill="#8a5a3c" stroke="#2a1d14" stroke-width="1.6"/><circle cx="74" cy="32" r="12" fill="#8a5a3c" stroke="#2a1d14" stroke-width="1.6"/><circle cx="26" cy="32" r="5.5" fill="#d9a07a"/><circle cx="74" cy="32" r="5.5" fill="#d9a07a"/><circle cx="50" cy="56" r="32" fill="#a86f47" stroke="#2a1d14" stroke-width="1.6"/><ellipse cx="50" cy="68" rx="15" ry="11" fill="#e8c9a6"/><circle cx="38" cy="50" r="4.6" fill="#2a1d14"/><circle cx="62" cy="50" r="4.6" fill="#2a1d14"/><circle cx="39.5" cy="48.5" r="1.5" fill="#fff"/><circle cx="63.5" cy="48.5" r="1.5" fill="#fff"/><ellipse cx="50" cy="63" rx="5" ry="3.6" fill="#2a1d14"/><path d="M50 67Q47 72 43 70M50 67Q53 72 57 70" stroke="#2a1d14" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="28" cy="62" r="4" fill="#f0587a" opacity=".35"/><circle cx="72" cy="62" r="4" fill="#f0587a" opacity=".35"/></svg>`,
  kiwi:`<svg viewBox="0 0 100 100" aria-hidden="true">${SH}<path d="M24 46Q12 58 26 68Z" fill="#7bc96a" stroke="#2a1d14" stroke-width="1.4"/><path d="M76 46Q88 58 74 68Z" fill="#7bc96a" stroke="#2a1d14" stroke-width="1.4"/><path d="M40 28Q44 16 50 22Q56 16 60 28" stroke="#2a1d14" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="58" rx="30" ry="28" fill="#9ed97f" stroke="#2a1d14" stroke-width="1.6"/><circle cx="40" cy="50" r="6" fill="#fff" stroke="#2a1d14" stroke-width="1.2"/><circle cx="60" cy="50" r="6" fill="#fff" stroke="#2a1d14" stroke-width="1.2"/><circle cx="41.5" cy="50" r="3.2" fill="#2a1d14"/><circle cx="61.5" cy="50" r="3.2" fill="#2a1d14"/><path d="M46 58L54 58L50 65Z" fill="#ffb22e" stroke="#2a1d14" stroke-width="1.2" stroke-linejoin="round"/><circle cx="32" cy="62" r="4" fill="#f0587a" opacity=".3"/><circle cx="68" cy="62" r="4" fill="#f0587a" opacity=".3"/><path d="M38 86L34 93M44 86L44 93M56 86L56 93M62 86L66 93" stroke="#ffb22e" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  lola:`<svg viewBox="0 0 100 100" aria-hidden="true">${SH}<path d="M24 40L22 16L40 30Z" fill="#f7a8b8" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/><path d="M76 40L78 16L60 30Z" fill="#f7a8b8" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="50" cy="58" rx="32" ry="29" fill="#ffc2cf" stroke="#2a1d14" stroke-width="1.6"/><ellipse cx="50" cy="66" rx="12" ry="9" fill="#f7a8b8" stroke="#2a1d14" stroke-width="1.4"/><ellipse cx="46" cy="66" rx="1.6" ry="2.4" fill="#2a1d14"/><ellipse cx="54" cy="66" rx="1.6" ry="2.4" fill="#2a1d14"/><circle cx="38" cy="50" r="4.4" fill="#2a1d14"/><circle cx="62" cy="50" r="4.4" fill="#2a1d14"/><circle cx="39.5" cy="48.5" r="1.4" fill="#fff"/><circle cx="63.5" cy="48.5" r="1.4" fill="#fff"/><circle cx="28" cy="62" r="4.5" fill="#f0587a" opacity=".35"/><circle cx="72" cy="62" r="4.5" fill="#f0587a" opacity=".35"/><path d="M44 76Q50 80 56 76" stroke="#2a1d14" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,
  conejo:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gc" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6dccb"/></radialGradient></defs>${SH}
    <ellipse cx="37" cy="24" rx="9" ry="22" fill="url(#gc)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="63" cy="24" rx="9" ry="22" fill="url(#gc)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="37" cy="26" rx="4" ry="14" fill="#f7b7b0"/><ellipse cx="63" cy="26" rx="4" ry="14" fill="#f7b7b0"/>
    <ellipse cx="50" cy="60" rx="31" ry="28" fill="url(#gc)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="40" cy="56" rx="4.5" ry="5.5" fill="#2a1d14"/><ellipse cx="60" cy="56" rx="4.5" ry="5.5" fill="#2a1d14"/>
    <circle cx="41.5" cy="54.5" r="1.5" fill="#fff"/><circle cx="61.5" cy="54.5" r="1.5" fill="#fff"/>
    <path d="M46 66H54L50 70Z" fill="#e0587a" stroke="#2a1d14" stroke-width="1" stroke-linejoin="round"/>
    <path d="M50 70V74M50 74Q46 79 42 76M50 74Q54 79 58 76" stroke="#2a1d14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <rect x="47.5" y="74.5" width="5" height="5" rx="1" fill="#fff" stroke="#2a1d14" stroke-width=".9"/>
    <circle cx="30" cy="66" r="4.5" fill="#f0587a" opacity=".3"/><circle cx="70" cy="66" r="4.5" fill="#f0587a" opacity=".3"/></svg>`
,
  buho:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gb" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#b08d6a"/><stop offset="1" stop-color="#6b4a2e"/></radialGradient></defs>${SH}
    <path d="M30 34L34 16L46 30Z" fill="#6b4a2e" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M70 34L66 16L54 30Z" fill="#6b4a2e" stroke="#2a1d14" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="50" cy="56" r="31" fill="url(#gb)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="50" cy="68" rx="17" ry="13" fill="#fff1dc"/>
    <ellipse cx="38" cy="50" rx="6.5" ry="7" fill="#2a1d14"/><ellipse cx="62" cy="50" rx="6.5" ry="7" fill="#2a1d14"/>
    <circle cx="40" cy="48" r="2" fill="#fff"/><circle cx="64" cy="48" r="2" fill="#fff"/>
    <path d="M46 62L54 62L50 69Z" fill="#f0a33a" stroke="#2a1d14" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="30" cy="66" r="4.5" fill="#f0587a" opacity=".3"/><circle cx="70" cy="66" r="4.5" fill="#f0587a" opacity=".3"/></svg>`,
  rana:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gr" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#a6e6a0"/><stop offset="1" stop-color="#3f9e5a"/></radialGradient></defs>${SH}
    <circle cx="32" cy="36" r="12" fill="url(#gr)" stroke="#2a1d14" stroke-width="1.6"/><circle cx="68" cy="36" r="12" fill="url(#gr)" stroke="#2a1d14" stroke-width="1.6"/>
    <circle cx="32" cy="36" r="6" fill="#2a1d14"/><circle cx="68" cy="36" r="6" fill="#2a1d14"/>
    <circle cx="34" cy="34" r="2" fill="#fff"/><circle cx="70" cy="34" r="2" fill="#fff"/>
    <ellipse cx="50" cy="62" rx="34" ry="27" fill="url(#gr)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="50" cy="70" rx="18" ry="11" fill="#d9f5cf"/>
    <path d="M32 62Q50 74 68 62" stroke="#2a1d14" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="25" cy="64" r="4.5" fill="#f0587a" opacity=".3"/><circle cx="75" cy="64" r="4.5" fill="#f0587a" opacity=".3"/></svg>`,
  pulpo:`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gp" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#f3a6c8"/><stop offset="1" stop-color="#b4568a"/></radialGradient></defs>${SH}
    <path d="M24 60Q18 80 26 90M38 66Q34 86 42 92M50 68Q50 90 50 94M62 66Q66 86 58 92M76 60Q82 80 74 90" stroke="#b4568a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M24 60Q18 80 26 90M38 66Q34 86 42 92M50 68Q50 90 50 94M62 66Q66 86 58 92M76 60Q82 80 74 90" stroke="#2a1d14" stroke-width="1" fill="none" stroke-linecap="round" opacity=".4"/>
    <path d="M18 56Q18 18 50 16Q82 18 82 56Q82 70 50 70Q18 70 18 56Z" fill="url(#gp)" stroke="#2a1d14" stroke-width="1.6"/>
    <ellipse cx="38" cy="48" rx="6.5" ry="7" fill="#2a1d14"/><ellipse cx="62" cy="48" rx="6.5" ry="7" fill="#2a1d14"/>
    <circle cx="40" cy="46" r="2" fill="#fff"/><circle cx="64" cy="46" r="2" fill="#fff"/>
    <path d="M45 60Q50 64 55 60" stroke="#2a1d14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="28" cy="58" r="4.5" fill="#f0587a" opacity=".3"/><circle cx="72" cy="58" r="4.5" fill="#f0587a" opacity=".3"/></svg>`
};
export const CAT=[
  {id:'gato',k:'avatar',nombre:'Mía',desc:'Gato gris',precio:300},
  {id:'pinguino',k:'avatar',nombre:'Tito',desc:'Pingüino',precio:400},
  {id:'conejo',k:'avatar',nombre:'Nube',desc:'Conejo',precio:500},
  {id:'bruno',k:'avatar',nombre:'Bruno',desc:'Oso',precio:450},
  {id:'kiwi',k:'avatar',nombre:'Kiwi',desc:'Pájaro',precio:450},
  {id:'lola',k:'avatar',nombre:'Lola',desc:'Cerdito',precio:550},
  {id:'buho',k:'avatar',nombre:'Ona',desc:'Búho',precio:600},
  {id:'rana',k:'avatar',nombre:'Rita',desc:'Rana',precio:650},
  {id:'pulpo',k:'avatar',nombre:'Poli',desc:'Pulpo',precio:700},
  {id:'#bff0e0',k:'color',nombre:'Fondo menta',desc:'Color de fondo',precio:150},
  {id:'#d4c6ff',k:'color',nombre:'Fondo lila',desc:'Color de fondo',precio:200},
  {id:'#bfe4ff',k:'color',nombre:'Fondo cielo',desc:'Color de fondo',precio:200},
  {id:'grad',k:'color',nombre:'Fondo degradado',desc:'Se mueve con colores suaves',precio:300,animado:true},
  {id:'confeti',k:'efecto',nombre:'Confeti al acertar',desc:'Cae confeti en cada acierto',precio:250},
  {id:'aura',k:'efecto',nombre:'Aura',desc:'Un halo que late alrededor',precio:300,animado:true},
  {id:'destellos',k:'efecto',nombre:'Destellos',desc:'Chispas que parpadean',precio:350,animado:true},
  {id:'vivo',k:'efecto',nombre:'Personaje vivo',desc:'Se mueve y da un salto al acertar',precio:400,animado:true},
  {id:'sencillo',k:'marco',nombre:'Marco sencillo',desc:'Borde liso',precio:0},
  {id:'hojas',k:'marco',nombre:'Hojas',desc:'Hojas que caen despacio',precio:0,animado:true},
  {id:'marco',k:'marco',nombre:'Marco dorado',desc:'Borde dorado fijo',precio:350},
  {id:'arcoiris',k:'marco',nombre:'Marco arcoíris',desc:'Anillo de colores que gira',precio:500,animado:true},
  {id:'estrellas',k:'marco',nombre:'Estrellas',desc:'Estrellas que orbitan',precio:300,animado:true},
  {id:'llamas',k:'marco',nombre:'Llamas',desc:'Brasas que suben',precio:400,animado:true},
  {id:'nieve',k:'marco',nombre:'Nieve',desc:'Copos que caen',precio:350,animado:true},
  {id:'burbujas',k:'marco',nombre:'Burbujas',desc:'Burbujas que suben',precio:300,animado:true},
  {id:'cosmico',k:'marco',nombre:'Cósmico',desc:'Dos órbitas de luz',precio:500,animado:true},
  {id:'bn-arena',k:'banner',nombre:'Arena',desc:'Fondo cálido',precio:0},
  {id:'bn-menta',k:'banner',nombre:'Menta',desc:'Fondo fresco',precio:0},
  {id:'bn-cielo',k:'banner',nombre:'Cielo',desc:'Fondo claro',precio:0},
  {id:'bn-olas',k:'banner',nombre:'Olas',desc:'Olas suaves que se mueven',precio:0,animado:true},
  {id:'bn-noche',k:'banner',nombre:'Noche estrellada',desc:'Cielo oscuro con estrellas',precio:300},
  {id:'bn-bosque',k:'banner',nombre:'Bosque',desc:'Hojas verdes',precio:350},
  {id:'bn-atardecer',k:'banner',nombre:'Atardecer',desc:'Degradado cálido que se mueve',precio:400,animado:true},
  {id:'bn-confeti',k:'banner',nombre:'Fiesta',desc:'Confeti que cae despacio',precio:450,animado:true},
];
export const FREE_AV=[{id:'ardilla',nombre:'Pepa'},{id:'zorro',nombre:'Lucas'},{id:'erizo',nombre:'Erika'}];
export const GRAD='linear-gradient(120deg,#ffd9a8,#ff9ecf,#9ee7ff,#c9ffb0,#ffd9a8)';
export const MARCO_COL={sencillo:'#2a1d14',hojas:'#18a58a',marco:'#ffb22e',arcoiris:'#ffd166',estrellas:'#ffd166',llamas:'#ff7a3d',nieve:'#4aa8ff',burbujas:'#5fd6ff',cosmico:'#a57bff'};
export const PARTICULAS={hojas:1,estrellas:1,llamas:1,nieve:1,burbujas:1,cosmico:1};
export const OWNED_INICIAL=['ardilla','zorro','erizo','#ffd9a8','sencillo','hojas','bn-arena','bn-menta','bn-cielo','bn-olas'];
// Franja de banner sobre el personaje (inicio y perfil). Sin banner equipado, no sale nada.
export const bnHtml = id => id ? `<div class="bn ${id}" aria-hidden="true"></div>` : "";

export function marcoIcono(id){
  const INK='#2a1d14';
  const ringInk=(c,w)=>`<circle cx="28" cy="28" r="17" fill="none" stroke="${INK}" stroke-width="${w+3}"/><circle cx="28" cy="28" r="17" fill="none" stroke="${c}" stroke-width="${w}"/>`;
  const pt=(a,r)=>[28+Math.cos(a*Math.PI/180)*r, 28+Math.sin(a*Math.PI/180)*r];
  const sparkle=(x,y,r,c)=>`<path d="M${x} ${y-r}Q${x} ${y} ${x+r} ${y}Q${x} ${y} ${x} ${y+r}Q${x} ${y} ${x-r} ${y}Q${x} ${y} ${x} ${y-r}Z" fill="${c}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const star=(x,y,r,c)=>{let d='';for(let i=0;i<10;i++){const rr=i%2?r*.5:r,t=-Math.PI/2+i*Math.PI/5;d+=(i?'L':'M')+(x+Math.cos(t)*rr).toFixed(2)+' '+(y+Math.sin(t)*rr).toFixed(2);}return `<path d="${d}Z" fill="${c}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;};
  const flame=(x,y,a,c,k)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${k})" d="M0 0C6-4 5-11 0-17C-5-11-6-4 0 0Z" fill="${c}" stroke="${INK}" stroke-width="${(1.4/k).toFixed(2)}" stroke-linejoin="round"/>`;
  const flake=(x,y)=>{let g='';for(let k=0;k<3;k++){const a=k*Math.PI/3;const x1=(x-Math.cos(a)*6).toFixed(2),y1=(y-Math.sin(a)*6).toFixed(2),x2=(x+Math.cos(a)*6).toFixed(2),y2=(y+Math.sin(a)*6).toFixed(2);g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>`;}for(let k=0;k<3;k++){const a=k*Math.PI/3;const x1=(x-Math.cos(a)*6).toFixed(2),y1=(y-Math.sin(a)*6).toFixed(2),x2=(x+Math.cos(a)*6).toFixed(2),y2=(y+Math.sin(a)*6).toFixed(2);g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7cc4ff" stroke-width="1.8" stroke-linecap="round"/>`;}return g;};
  const bub=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#e6f9ff" stroke="${INK}" stroke-width="1.5"/><circle cx="${(x-r*.35).toFixed(2)}" cy="${(y-r*.35).toFixed(2)}" r="${(r*.28).toFixed(2)}" fill="#fff"/>`;
  let b='';
  switch(id){
    case 'sencillo': b=`<circle cx="28" cy="28" r="17" fill="none" stroke="${INK}" stroke-width="4.5"/>`; break;
    case 'marco': b=ringInk('#ffb22e',6)+`<path d="M${pt(196,17).join(' ')} A17 17 0 0 1 ${pt(246,17).join(' ')}" fill="none" stroke="#fff3c4" stroke-width="1.8" stroke-linecap="round"/>`+sparkle(6,9,5,'#ffd166')+sparkle(50,9,3.6,'#fff1b8')+sparkle(50,48,4.6,'#ffd166'); break;
    case 'arcoiris': b=`<circle cx="28" cy="28" r="17" fill="none" stroke="${INK}" stroke-width="9.5"/>`+['#ff6b6b','#ffd166','#c6f432','#5fd6ff','#a57bff','#ff6bd6'].map((c,i)=>`<circle cx="28" cy="28" r="17" fill="none" stroke="${c}" stroke-width="6.5" stroke-dasharray="17.8 89" transform="rotate(${i*60-90} 28 28)"/>`).join(''); break;
    case 'estrellas': b=ringInk('#ffd166',3.5)+[-90,-18,54,126,198].map(a=>star(...pt(a,23),5.2,'#ffd166')).join(''); break;
    case 'llamas': b=ringInk('#ff7a3d',4.5)+[0,45,90,135,180,225,270,315].map(a=>{const [x,y]=pt(a,14);return flame(x.toFixed(2),y.toFixed(2),a+90,'#ff7a3d',.85)+flame(x.toFixed(2),y.toFixed(2),a+90,'#ffd166',.42);}).join(''); break;
    case 'nieve': b=ringInk('#6fbcff',3)+flake(12,12)+flake(44,12)+flake(12,44)+flake(44,44); break;
    case 'burbujas': b=ringInk('#3fc6f0',3)+bub(9,11,6)+bub(47,8,3.8)+bub(48,47,6.5)+bub(9,47,3.8); break;
    case 'cosmico': {
      const a=-25*Math.PI/180, t=-1.1, px=26*Math.cos(t), py=9*Math.sin(t);
      const ox=(px*Math.cos(a)-py*Math.sin(a)+28).toFixed(2), oy=(px*Math.sin(a)+py*Math.cos(a)+28).toFixed(2);
      b=`<ellipse cx="28" cy="28" rx="26" ry="9" transform="rotate(-25 28 28)" fill="none" stroke="${INK}" stroke-width="4"/><ellipse cx="28" cy="28" rx="26" ry="9" transform="rotate(-25 28 28)" fill="none" stroke="#5fd6ff" stroke-width="1.8"/>`+ringInk('#8d62f5',3.5)+`<circle cx="${ox}" cy="${oy}" r="4" fill="#5fd6ff" stroke="${INK}" stroke-width="1.5"/>`; break;
    }
  }
  return `<svg viewBox="0 0 56 56" class="mi mi-${id}" aria-hidden="true">${b}</svg>`;
}
export function fxParticulas(el,tipo,clave){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const W=el.clientWidth||52, H=el.clientHeight||W, P=36, dpr=Math.min(devicePixelRatio||1,2);
  const CW=W+P*2, CH=H+P*2, R=W/2, EDGE=P*.6;
  const cfg={
    estrellas:{n:7,forma:'star',col:['#ffd166','#fff1b8'],orb:1},
    llamas:{n:12,forma:'drop',col:['#ff7a3d','#ffb22e','#ff4d4d'],sube:1},
    nieve:{n:14,forma:'dot',col:['#ffffff','#cfe9ff'],cae:1},
    burbujas:{n:8,forma:'ring',col:['#8fe3ff','#c9f3ff'],sube:1},
    cosmico:{n:4,forma:'dot',col:['#a57bff','#5fd6ff'],orb:1},
    hojas:{n:7,forma:'leaf',col:['#18a58a','#7bc96a'],cae:1}
  }[tipo];
  const c=document.createElement('canvas'); c.className='fxc';
  c.width=CW*dpr; c.height=CH*dpr; c.style.width=CW+'px'; c.style.height=CH+'px';
  c.style.left=(-P)+'px'; c.style.top=(-P)+'px';
  el.appendChild(c);
  const x=c.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  const nuevo=q=>{
    q.col=cfg.col[Math.floor(Math.random()*cfg.col.length)]; q.life=0;
    q.max=cfg.orb?Infinity:(120+Math.random()*60); q.s=2.6+Math.random()*2.2;
    q.rot=Math.random()*6.28; q.vr=(Math.random()-.5)*.04; q.ph=Math.random()*6.28;
    if(cfg.orb){ q.a=Math.random()*6.28; q.rad=R+8+Math.random()*P*.45; q.sp=(.008+Math.random()*.008)*(Math.random()<.5?-1:1); }
    else if(cfg.sube){ q.x=CW/2+(Math.random()-.5)*W*.7; q.y=CH-P*.5; q.vx=(Math.random()-.5)*.25; q.vy=-(.35+Math.random()*.45); }
    else { q.x=P+Math.random()*W; q.y=-P*.6; q.vx=0; q.vy=.25+Math.random()*.35; }
    return q;
  };
  const pts=[]; for(let i=0;i<cfg.n;i++){ const q=nuevo({}); if(!cfg.orb) q.life=Math.random()*q.max; pts.push(q); }
  const dibuja=(q,al)=>{
    x.save(); x.globalAlpha=al; x.translate(q.x,q.y); x.rotate(q.rot); x.fillStyle=q.col; x.strokeStyle=q.col;
    if(cfg.forma==='star'){ x.beginPath(); for(let i=0;i<8;i++){ const r=i%2?q.s*.34:q.s*1.25, t=i*Math.PI/4-Math.PI/2; x.lineTo(Math.cos(t)*r,Math.sin(t)*r); } x.closePath(); x.fill(); }
    else if(cfg.forma==='drop'){ x.beginPath(); x.moveTo(0,-q.s*1.6); x.quadraticCurveTo(q.s*1.1,0,0,q.s*.9); x.quadraticCurveTo(-q.s*1.1,0,0,-q.s*1.6); x.fill(); }
    else if(cfg.forma==='ring'){ x.lineWidth=1.2; x.beginPath(); x.arc(0,0,q.s*1.1,0,6.28); x.stroke(); }
    else if(cfg.forma==='leaf'){ x.beginPath(); x.ellipse(0,0,q.s*1.3,q.s*.7,0,0,6.28); x.fill(); }
    else { x.beginPath(); x.arc(0,0,q.s*.7,0,6.28); x.fill(); }
    x.restore();
  };
  let last=0;
  const tick=now=>{
    if(!el.isConnected) return;   // el avatar ya no está en pantalla: deja de animar
    const k=last?Math.min((now-last)/16.67,3):1; last=now;   // movimiento por tiempo real: igual en 60 y 120 Hz
    x.clearRect(0,0,CW,CH);
    for(const q of pts){
      q.life+=k; q.rot+=q.vr*k;
      let al;
      if(cfg.orb){ q.a+=q.sp*k; q.x=CW/2+Math.cos(q.a)*q.rad; q.y=CH/2+Math.sin(q.a)*q.rad*.9; al=.6+.4*Math.sin(q.life*.06+q.rad); }
      else {
        q.x+=(q.vx+Math.sin(q.life*.05+q.ph)*.2)*k; q.y+=q.vy*k;
        al=Math.sin(Math.PI*Math.min(q.life/q.max,1));
        if(q.life>=q.max||q.y>CH+8||q.y<-P-8||q.x<-P||q.x>CW+P) nuevo(q);
      }
      // se desvanece antes de tocar el borde del lienzo: nada aparece ni se corta de golpe
      const d=Math.min(q.x,CW-q.x,q.y,CH-q.y);
      al*=Math.max(0,Math.min(1,d/EDGE));
      if(al>0.01) dibuja(q,al);
    }
    el[clave]=requestAnimationFrame(tick);
  };
  el[clave]=requestAnimationFrame(tick);
}
export function confetiFx(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const W=innerWidth, H=innerHeight, dpr=Math.min(devicePixelRatio||1,2);
  const c=document.createElement('canvas'); c.className='fx-screen';
  c.width=W*dpr; c.height=H*dpr; c.style.width=W+'px'; c.style.height=H+'px';
  document.body.appendChild(c);
  const x=c.getContext('2d'); x.scale(dpr,dpr);
  const cols=['#ffb22e','#f0587a','#4aa8ff','#18a58a','#a57bff','#c6f432'];
  const ox=W/2, oy=H*.42, ps=[];
  for(let i=0;i<72;i++){
    const a=-Math.PI/2+(Math.random()-.5)*Math.PI*.9, sp=6+Math.random()*7;
    ps.push({x:ox,y:oy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,w:5+Math.random()*5,h:3+Math.random()*4,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[i%cols.length],round:Math.random()<.3,life:0,max:110+Math.random()*40});
  }
  let t=0;
  const step=()=>{
    t++; x.clearRect(0,0,W,H); let vivos=0;
    for(const p of ps){
      if(p.life>p.max) continue; vivos++;
      p.life++; p.vx*=.985; p.vy=p.vy*.985+.22; p.x+=p.vx; p.y+=p.vy; p.r+=p.vr;
      const al=Math.max(0,1-Math.pow(p.life/p.max,2));
      x.save(); x.globalAlpha=al; x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c;
      if(p.round){ x.beginPath(); x.arc(0,0,p.w/2.4,0,Math.PI*2); x.fill(); } else x.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      x.restore();
    }
    if(vivos && t<400) requestAnimationFrame(step); else c.remove();
  };
  requestAnimationFrame(step);
}
