// Comprueba que el sitio publicado se compiló con las variables de EmailJS (Vite las incrusta al compilar).
// Uso: node docs/herramientas/verificar-produccion.mjs [url]
const URL = process.argv[2] ?? 'https://dorian-portafolio.vercel.app/'
const html = await (await fetch(URL)).text()
const js = html.match(/assets\/index-[^"]+\.js/)?.[0]
console.log(`Sitio: ${URL}`)
console.log(`Bundle principal: ${js}`)
const codigo = await (await fetch(new globalThis.URL(js, URL))).text()
const service = codigo.match(/service_[a-z0-9]{6,}/)?.[0]
const template = codigo.match(/template_[a-z0-9]{6,}/)?.[0]
console.log(`Service ID incrustado: ${service ?? 'NO'}`)
console.log(`Template ID incrustado: ${template ?? 'NO'}`)
console.log(service && template ? 'Resultado: el formulario envía con EmailJS.' : 'Resultado: faltan variables; el formulario abre el correo del visitante.')
