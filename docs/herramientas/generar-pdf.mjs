// Genera la documentación del Laboratorio #4 en PDF:
// capturas de código (resaltado con los colores de VS Code), capturas de ejecución y resultados reales
// de las comprobaciones. Uso: `node docs/herramientas/generar-pdf.mjs` (tras `capturas.mjs`).
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { codeToHtml } from 'shiki'
import { openChrome, sleep } from './cdp.mjs'
// Contenido a generar: `node generar-pdf.mjs [contenido.mjs | contenido-lab6.mjs]` (por defecto el Laboratorio #4).
const { seccionesDoc, datosDoc } = await import(`./${process.argv[2] ?? 'contenido.mjs'}`)

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..', '..')
const DOCS = join(ROOT, 'docs')
const CAPTURAS = join(DOCS, 'capturas')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const lang = (file) => ({ tsx: 'tsx', ts: 'ts', css: 'css', json: 'json', html: 'html', mjs: 'js', ino: 'cpp', cpp: 'cpp' })[file.split('.').pop()] ?? 'txt'

/** Ventana de editor con el código de un archivo (o un fragmento por líneas). */
async function codigo(file, { desde, hasta, titulo } = {}) {
  const full = readFileSync(join(ROOT, file), 'utf8').replace(/\r\n/g, '\n')
  const lines = full.split('\n')
  const a = desde ?? 1
  const b = hasta ?? lines.length
  const fragment = lines.slice(a - 1, b).join('\n').replace(/\s+$/, '')
  const html = await codeToHtml(fragment, { lang: lang(file), theme: 'dark-plus' })
  return `<figure class="editor${b - a < 30 ? ' corto' : ''}">
    <figcaption><span class="dots"><i></i><i></i><i></i></span><span>${esc(titulo ?? file)}${desde ? ` · líneas ${a}–${b}` : ''}</span></figcaption>
    <div class="code" style="counter-reset: ln ${a - 1}">${html}</div>
  </figure>`
}

/** Captura de ejecución con su pie. */
function captura(nombre, pie, { ancho = '100%' } = {}) {
  const file = join(CAPTURAS, `${nombre}.png`)
  if (!existsSync(file)) return `<p class="falta">Falta la captura «${nombre}».</p>`
  return `<figure class="shot" style="width:${ancho}"><img src="${pathToFileURL(file)}" alt=""><figcaption>${pie}</figcaption></figure>`
}

/** Ejecuta un comando real y muestra su salida en una ventana de terminal. */
function terminal(cmd, { filtrar } = {}) {
  let out
  try {
    out = execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' } })
  } catch (e) {
    out = `${e.stdout ?? ''}${e.stderr ?? ''}`
  }
  out = out.replace(/\x1b\[[0-9;]*m/g, '').replace(/\r/g, '').replace(/^npm notice.*\n?/gm, '').trim()
  if (filtrar) out = filtrar(out)
  return `<figure class="terminal"><figcaption>Terminal · dorian-portfolio</figcaption><pre><b>&gt; ${esc(cmd)}</b>\n${esc(out || '(sin salida: sin errores)')}</pre></figure>`
}

const helpers = { codigo, captura, terminal }

const cuerpo = []
for (const s of seccionesDoc) cuerpo.push(await s(helpers))

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>${datosDoc.titulo}</title>
<style>${readFileSync(join(HERE, 'estilos-doc.css'), 'utf8')}</style></head>
<body>${cuerpo.join('\n')}</body></html>`

const htmlPath = join(DOCS, datosDoc.archivo.replace(/\.pdf$/, '.html'))
writeFileSync(htmlPath, html)

const { send, close } = await openChrome()
await send('Page.navigate', { url: pathToFileURL(htmlPath).href })
await sleep(1500)
await send('Runtime.evaluate', { expression: 'Promise.all([...document.images].map(i => i.decode().catch(() => {})))', awaitPromise: true })
await sleep(500)
// Por flujo: un PDF de varios MB en base64 supera lo que admite un único mensaje de DevTools.
const { stream } = await send('Page.printToPDF', {
  transferMode: 'ReturnAsStream',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `<div style="width:100%;font-size:8px;color:#6e6e73;padding:0 14mm;display:flex;justify-content:space-between;font-family:Segoe UI,Arial">
    <span>${datosDoc.pie}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  marginTop: 0.55,
  marginBottom: 0.65,
  marginLeft: 0,
  marginRight: 0,
})
const partes = []
for (;;) {
  const c = await send('IO.read', { handle: stream, size: 1 << 20 })
  partes.push(Buffer.from(c.data, c.base64Encoded ? 'base64' : 'utf8'))
  if (c.eof) break
}
await send('IO.close', { handle: stream })
const pdfPath = join(DOCS, datosDoc.archivo)
writeFileSync(pdfPath, Buffer.concat(partes))
close()
console.log('PDF generado:', relative(ROOT, pdfPath))
