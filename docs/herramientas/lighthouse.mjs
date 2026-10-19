// Mide el sitio con Lighthouse (escritorio y móvil) y guarda un resumen para el PDF.
// Uso: con `npm run build && npm run preview` activo, `node docs/herramientas/lighthouse.mjs [url]`.
import { execSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const URL = process.argv[2] ?? 'http://localhost:4173/'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'capturas', 'lighthouse.json')
const tmp = mkdtempSync(join(tmpdir(), 'lh-'))

function medir(dispositivo, flags) {
  const file = join(tmp, `${dispositivo}.json`)
  execSync(`npx -y lighthouse@12 ${URL} --quiet --output=json --output-path="${file}" --chrome-flags="--headless=new" ${flags}`, { stdio: 'inherit' })
  const r = JSON.parse(readFileSync(file, 'utf8'))
  const p = (k) => Math.round(r.categories[k].score * 100)
  return {
    version: r.lighthouseVersion,
    dispositivo: dispositivo === 'escritorio' ? 'Escritorio' : 'Móvil',
    rendimiento: p('performance'),
    accesibilidad: p('accessibility'),
    buenasPracticas: p('best-practices'),
    seo: p('seo'),
    lcp: r.audits['largest-contentful-paint'].displayValue,
  }
}

const resultados = [medir('escritorio', '--preset=desktop'), medir('movil', '--form-factor=mobile')]
writeFileSync(
  OUT,
  JSON.stringify({ version: resultados[0].version, fecha: new Date().toISOString().slice(0, 10), resultados }, null, 2),
)
console.log(resultados)
