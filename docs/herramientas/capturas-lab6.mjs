// Capturas de ejecución del Laboratorio #6 (formulario con EmailJS) sobre el sitio publicado.
// Hace UN envío real (llega al correo configurado en EmailJS) y simula un fallo de red para el caso de error.
// Uso: node docs/herramientas/capturas-lab6.mjs [url]
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { openChrome, sleep } from './cdp.mjs'

const URL = process.argv[2] ?? 'https://dorian-portafolio.vercel.app/'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'capturas')
mkdirSync(OUT, { recursive: true })

// Ventana visible: EmailJS bloquea los navegadores automatizados sin interfaz (opción blockHeadless).
const { send, evaluate, close } = await openChrome({ headless: false })
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1.5, mobile: false })
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })

const shot = async (name, clip) => {
  const res = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 }, captureBeyondViewport: true } : {}) })
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(res.data, 'base64'))
  console.log('✓', name)
}

/** Recorte de la sección de contacto (desde el título hasta el final del formulario). */
const contacto = () =>
  evaluate(`(() => {
    const s = document.querySelector('#contacto').getBoundingClientRect()
    const f = document.querySelector('#contacto form').getBoundingClientRect()
    return { x: 0, y: s.top + scrollY, width: document.documentElement.clientWidth, height: f.bottom - s.top + 40 }
  })()`)

const typeInto = (selector, value) =>
  evaluate(`(() => {
    const el = document.querySelector('${selector}')
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)})
    el.dispatchEvent(new Event('input', { bubbles: true }))
  })()`)

await send('Page.navigate', { url: URL })
await sleep(4000)
await evaluate(`document.documentElement.style.scrollBehavior = 'auto';
  const s = document.createElement('style'); s.textContent = '.defer{content-visibility:visible!important}'; document.head.append(s);
  document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'))`)
await evaluate("document.querySelector('#contacto').scrollIntoView()")
await sleep(1500)
await shot('40-lab6-formulario', await contacto())

await typeInto('#contacto input[name=nombre]', 'Prueba Laboratorio 6')
await typeInto('#contacto input[name=email]', 'gironpratodorian@gmail.com')
await typeInto(
  '#contacto textarea[name=mensaje]',
  'Mensaje de prueba enviado desde el formulario publicado del portafolio para documentar el Laboratorio #6 (EmailJS + SweetAlert2).',
)
await sleep(400)
await shot('41-lab6-formulario-lleno', await contacto())

// Red lenta (solo en esta ventana) para que se vea el estado «Enviando…» antes de la respuesta.
await send('Network.enable')
await send('Network.emulateNetworkConditions', { offline: false, latency: 1500, downloadThroughput: -1, uploadThroughput: -1 })
await evaluate("document.querySelector('#contacto button[type=submit]').click()")
await sleep(500)
await evaluate("document.querySelector('#contacto form').scrollIntoView({ block: 'center' })")
await sleep(200)
await shot('42-lab6-enviando')
const estado = await evaluate(
  "({ boton: document.querySelector('#contacto button[type=submit]').textContent.trim(), deshabilitado: document.querySelector('#contacto button[type=submit]').disabled })",
)
console.log('durante el envío:', estado)

// Respuesta real de EmailJS → alerta de SweetAlert2.
for (let i = 0; i < 30 && !(await evaluate("!!document.querySelector('.swal2-popup')")); i++) await sleep(500)
await sleep(700)
await shot('43-lab6-enviado')
const exito = await evaluate("({ titulo: document.querySelector('.swal2-title')?.textContent, campo: document.querySelector('#contacto input[name=nombre]').value })")
console.log('resultado:', exito)
await evaluate("document.querySelector('.swal2-confirm')?.click()")
await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 })

// Caso de error SIMULADO: sin conexión, la petición a EmailJS falla y no se envía nada.
// Se espera a que pase el límite de un envío cada 10 s.
await sleep(11000)
await typeInto('#contacto input[name=nombre]', 'Prueba de error')
await typeInto('#contacto input[name=email]', 'gironpratodorian@gmail.com')
await typeInto('#contacto textarea[name=mensaje]', 'Este envío falla a propósito (sin conexión) para mostrar el manejo de errores.')
await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 })
await evaluate("document.querySelector('#contacto button[type=submit]').click()")
for (let i = 0; i < 20 && !(await evaluate("!!document.querySelector('.swal2-popup')")); i++) await sleep(500)
await sleep(700)
await shot('44-lab6-error')
const error = await evaluate(
  "({ titulo: document.querySelector('.swal2-title')?.textContent, conservaDatos: document.querySelector('#contacto input[name=nombre]').value })",
)
console.log('error:', error)
await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 })

close()
console.log('listo')
