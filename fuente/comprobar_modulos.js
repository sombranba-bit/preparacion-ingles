// Comprueba las conexiones entre los módulos de js/ antes de construir.
// Avisa de: nombres usados sin importar, imports que no existen, asignaciones a
// nombres importados (no permitidas en módulos ES) y nombres repetidos.
// Uso:  node comprobar_modulos.js            (requiere el paquete "typescript")
const path = require('path');
const fs = require('fs');

let ts;
try { ts = require('typescript'); }
catch (e) { console.error('Falta el paquete typescript: npm install typescript'); process.exit(2); }

const dir = path.resolve(process.argv[2] || path.join(__dirname, 'js'));
const ficheros = [dir, path.join(dir, 'fin')].flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.js'))
  .sort().map(f => path.join(d, f)));

const programa = ts.createProgram(ficheros, {
  allowJs: true, checkJs: true, noEmit: true, strict: false,
  module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2020, lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'], types: [],
});

// Solo los errores de conexión entre módulos. El resto (tipos, variables sin usar) no cuenta.
const CONEXION = {
  2304: 'nombre sin declarar (falta importarlo)',
  2552: 'nombre sin declarar (falta importarlo)',
  2582: 'nombre sin declarar (falta importarlo)',
  2591: 'nombre sin declarar (falta importarlo)',
  2592: 'nombre sin declarar (falta importarlo)',
  2305: 'el módulo no exporta ese nombre',
  2300: 'nombre repetido',
  2451: 'nombre declarado dos veces',
  2448: 'nombre usado antes de declararlo',
  2632: 'asignación a un nombre importado (no permitido en módulos)',
  2630: 'asignación a una función importada',
  2540: 'asignación a una constante importada',
  2614: 'importación que no existe en el módulo',
};

const errores = ts.getPreEmitDiagnostics(programa)
  .filter(d => d.file && CONEXION[d.code]);

for (const d of errores) {
  const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
  console.log(`${path.basename(d.file.fileName)}:${line + 1}:${character + 1}  ${CONEXION[d.code]}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`);
}
console.log(errores.length
  ? `\n${errores.length} error(es) de conexión entre módulos.`
  : `Módulos correctos: ${ficheros.length} ficheros, 0 errores de conexión.`);
process.exit(errores.length ? 1 : 0);
