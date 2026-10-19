// Toma las capturas de ejecución del portafolio para la documentación.
// Uso: con el sitio corriendo (npm run dev), ejecutar `node docs/herramientas/capturas.mjs [url]`.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { openChrome, sleep } from './cdp.mjs'

const URL = process.argv[2] ?? 'http://localhost:5173/'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'capturas')
mkdirSync(OUT, { recursive: true })

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1.5, mobile: false }
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }

const { send, evaluate, close } = await openChrome()

async function setup(device, reduceMotion) {
  await send('Emulation.setDeviceMetricsOverride', device)
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: reduceMotion ? 'reduce' : 'no-preference' }],
  })
  await send('Page.navigate', { url: URL })
  await sleep(4000)
  // Para capturar secciones completas se desactiva el renderizado diferido (content-visibility).
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto';
    const s = document.createElement('style'); s.textContent = '.defer{content-visibility:visible!important}'; document.head.append(s);
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'))`)
}

async function shot(name, clip) {
  const res = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 }, captureBeyondViewport: true } : {}) })
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(res.data, 'base64'))
  console.log('✓', name)
}

/** Lleva una sección a la vista y la captura completa. */
async function section(name, selector, offset = 0) {
  await evaluate(`document.querySelector('${selector}').scrollIntoView(); window.scrollBy(0, ${offset})`)
  await sleep(1500)
  const b = await evaluate(
    `(() => { const r = document.querySelector('${selector}').getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: document.documentElement.clientWidth, height: r.height } })()`,
  )
  await shot(name, b)
}

/** Escribe en un input controlado por React disparando el evento que React escucha. */
const typeInto = (selector, value) =>
  evaluate(`(() => {
    const el = document.querySelector('${selector}')
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)})
    el.dispatchEvent(new Event('input', { bubbles: true }))
  })()`)

// ── Escritorio con animaciones: hero y apertura del portátil ──
await setup(DESKTOP, false)
await shot('01-hero-escritorio')
await evaluate("window.dispatchEvent(new Event('scroll')); window.scrollTo(0, 1)")
await sleep(4000)
const [trackTop, trackEnd] = await evaluate(
  "(() => { const t = document.querySelector('#inicio [class*=_track_]'); const top = t.getBoundingClientRect().top + scrollY; return [top, top + t.offsetHeight - innerHeight] })()",
)
await evaluate(`window.scrollTo(0, ${Math.round(trackTop + (trackEnd - trackTop) * 0.28)})`)
await sleep(2500)
await shot('02-portatil-abriendose')
await evaluate(`window.scrollTo(0, ${trackEnd})`)
await sleep(2500)
await shot('03-portatil-abierto')

// ── Escritorio sin animaciones (contenido estable para capturar secciones completas) ──
await setup(DESKTOP, true)
await section('04-sobre-mi', '#sobre-mi')
await section('05-proyectos', '#proyectos')
await evaluate("document.querySelectorAll('#proyectos h3 button')[0].click()")
await sleep(1200)
await shot('06-proyecto-detalle')
await evaluate("document.querySelector('dialog')?.close()")
await sleep(500)
await typeInto('#conectores input[type=search]', 'postgres')
await sleep(800)
await section('07-explorador-busqueda', '#conectores')
await section('08-stack', '#stack')
await section('09-trayectoria', '#trayectoria')
await section('10-github', '#github')
await typeInto('#contacto input[name=nombre]', 'Ana Torres')
await typeInto('#contacto input[name=email]', 'ana@empresa.com')
await typeInto('#contacto textarea[name=mensaje]', 'Hola Dorian, queremos integrar nuestro CRM con un agente de IA. ¿Conversamos?')
await section('11-contacto-formulario', '#contacto')
// Proyecto IoT (Tinkercad): la última tarjeta de la cuadrícula.
await evaluate("[...document.querySelectorAll('#proyectos h3 button')].at(-1).scrollIntoView({ block: 'center' })")
await sleep(800)
await evaluate("[...document.querySelectorAll('#proyectos h3 button')].at(-1).click()")
await sleep(1200)
await shot('12-proyecto-iot')
await evaluate("document.querySelector('dialog')?.close()")

// ── Móvil ──
await setup(MOBILE, true)
await shot('20-movil-inicio')
await evaluate("document.querySelector('header nav button').click()")
await sleep(600)
await shot('21-movil-menu')
await evaluate("document.querySelector('header nav button').click()")
await evaluate("document.querySelector('#proyectos').scrollIntoView()")
await sleep(1200)
await shot('22-movil-proyectos')
await evaluate("document.querySelector('#contacto').scrollIntoView()")
await sleep(1200)
await shot('23-movil-contacto')

close()
