/* Audiolibros de LibriVox (dominio público). Se escuchan en streaming desde archive.org,
   sin descargar nada a la app. Cada capítulo es: carpeta + prefijo + número + sufijo + .mp3.
   El nivel es orientativo (vocabulario y longitud de frase; no hay listado oficial CEFR). */
const AUDIOLIBROS = [
  { nivel: "A2", titulo: "Aesop's Fables", autor: "Esopo", lib: 9041, carpeta: "aesops_fables_-_new_translation_1407_librivox", pre: "aesops_fables_-_new_translation_", suf: "_aesop_64kb", caps: "00 01 02 04 05 06 08 09 10 11 12 13 14 15 16 17 18 19" },
  { nivel: "A2", titulo: "The Little Mermaid", autor: "Hans Christian Andersen", lib: 8320, carpeta: "thelittlemermaid_1310_librivox", pre: "littlemermaid_0", suf: "_andersen_64kb", caps: "1 2 3" },
  { nivel: "A2", titulo: "The Jungle Book", autor: "Kipling", lib: 662, carpeta: "jungle_book_mh_0808_librivox", pre: "junglebook_kipling_", suf: "_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11" },
  { nivel: "A2", titulo: "Just So Stories", autor: "Rudyard Kipling", lib: 585, carpeta: "just_so_stories", pre: "just_so_stories_", suf: "_kipling_reynard_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12" },
  { nivel: "B1", titulo: "Alice's Adventures in Wonderland", autor: "Lewis Carroll", lib: 200, carpeta: "alice_in_wonderland_librivox", pre: "wonderland_ch_", suf: "_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12" },
  { nivel: "B1", titulo: "Peter Pan", autor: "J. M. Barrie", lib: 816, carpeta: "peter_pan_0707_librivox", pre: "peterpan_", suf: "_barrie_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17" },
  { nivel: "B1", titulo: "Heidi", autor: "Johanna Spyri", lib: 491, carpeta: "heidi_solo_librivox", pre: "heidi_", suf: "_spyri_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23" },
  { nivel: "B1", titulo: "Black Beauty", autor: "Anna Sewell", lib: 3550, carpeta: "blackbeauty_0910_librivox", pre: "blackbeauty_", suf: "_sewell_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49" },
  { nivel: "B1", titulo: "The Secret Garden", autor: "Frances Hodgson Burnett", lib: 56, carpeta: "secret_garden_librivox", pre: "secretgarden_", suf: "_burnett_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27" },
  { nivel: "B2", titulo: "Treasure Island", autor: "Robert Louis Stevenson", lib: 449, carpeta: "treasureisland_librivox", pre: "treasure_island_", suf: "_stevenson_64kb", caps: "01-02 03-04 05-06 07-08 09-10 11-12 13 14 15 16 17 18 19 20 21 22 23-24 25-26 27 28 29 30 31 32 33 34" },
  { nivel: "B2", titulo: "The Invisible Man", autor: "H. G. Wells", lib: 426, carpeta: "invisible_man_librivox", pre: "invisible_man_", suf: "_64kb", caps: "01-02_wells 03-04_wells-2 05-07_wells 08-10_wells 11-12_wells 13-14_wells 15-17_wells 18-19_wells2 20_wells 21-22_wells2 23_wells2 24-26_wells 27-28_wells" },
  { nivel: "B2", titulo: "The Wind in the Willows", autor: "Kenneth Grahame", lib: 94, carpeta: "wind_in_the_willows_collab_librivox", pre: "wind_in_the_willows_", suf: "_grahame_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12" },
  { nivel: "B2", titulo: "A Study in Scarlet", autor: "Arthur Conan Doyle", lib: 2452, carpeta: "studyinscarlet_0811_librivox", pre: "studyscarlet_", suf: "_doyle_64kb", caps: "1-1 1-2 1-3 1-4 1-5 1-6 1-7 2-1 2-2 2-3 2-4 2-5 2-6 2-7" },
  { nivel: "C1", titulo: "Pride and Prejudice", autor: "Jane Austen", lib: 253, carpeta: "pride_and_prejudice_librivox", pre: "prideandprejudice_", suf: "_austen_64kb", caps: "01-03 04-05 06 07 08 09 10-11 12-13 14-15 16-17 18-19 20 21-22 23-25 26 27 28-29 30 31 32-33 34-35 36-37 38-39 40-41 42-43 44-45 46 47-48 49 50-51 52-53f 54 55 56-57 58 59 60-61" },
  { nivel: "C1", titulo: "Frankenstein", autor: "Mary Shelley", lib: 381, carpeta: "frankenstein_shelley", pre: "frankenstein_", suf: "_shelley_64kb", caps: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21" },
  { nivel: "C1", titulo: "Great Expectations", autor: "Charles Dickens", lib: 2591, carpeta: "great_expectations_mfs_0812_librivox", pre: "greatexpectations_", suf: "_dickens_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59" },
  { nivel: "C2", titulo: "Crime and Punishment", autor: "Fiódor Dostoievski", lib: 755, carpeta: "crime_and_punishment_0902_librivox", pre: "crime_and_punishment_", suf: "_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40" },
  { nivel: "C2", titulo: "Middlemarch", autor: "George Eliot", lib: 788, carpeta: "middlemarch_0810_librivox", pre: "middlemarch_", suf: "_eliot_64kb", caps: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86" },
  { nivel: "C2", titulo: "Moby Dick", autor: "Herman Melville", lib: 753, carpeta: "moby_dick_librivox", pre: "mobydick_", suf: "_melville_64kb", caps: "000 001_002 003 004_007 008_009 010_012 013_015 016 017_021 022_025 026_027 028_031 032 033_035 036_040 041 042_044 045_047 048_050 051_053 054 055_058 059_063 064_067 068_071 072_073 074_077 078_080 081_082 083_086 087_088 089_091 092_096 097_100 101_104 105_108 109_113 114_118 119_123 124_127 128_132 133 134 135" }
];

function audiolibrosHTML() {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  return AUDIOLIBROS.map(l => {
    const caps = l.caps.split(" ");
    const filas = caps.map((n, i) => `<li><span class="muted">Parte ${i + 1}</span> <audio controls preload="none" src="https://www.archive.org/download/${esc(l.carpeta)}/${esc(l.pre + n + l.suf)}.mp3"></audio></li>`).join("");
    return `<details class="src-row"><summary><span class="res-tag">${esc(l.nivel)}</span> ${esc(l.titulo)} · ${esc(l.autor)} <span class="muted">(${caps.length} partes)</span></summary><ol>${filas}</ol></details>`;
  }).join("");
}
function pintarAudiolibros() {
  const caja = document.getElementById("audiolibros");
  if (caja) caja.innerHTML = audiolibrosHTML();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pintarAudiolibros);
else pintarAudiolibros();
