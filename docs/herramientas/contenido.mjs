// Contenido del PDF del Laboratorio #4. Cada sección recibe los ayudantes de generar-pdf.mjs:
// codigo(archivo, {desde, hasta, titulo}), captura(nombre, pie, {ancho}) y terminal(comando, {filtrar}).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const REPO = 'https://github.com/Dgirto/dorian-portfolio'

export const datosDoc = {
  titulo: 'Laboratorio #4 – Mi portafolio en React – Dorian Girón Prato',
  archivo: 'Laboratorio-4-Dorian-Giron-Prato.pdf',
  pie: 'Laboratorio #4 · Fullstack Developer Software – Seminario IA 501 · Dorian Girón Prato',
}

/** Árbol de carpetas de src/ (solo nombres), como el explorador de VS Code. */
function arbol(dir, prefijo = '') {
  const items = readdirSync(dir)
    .filter((n) => !n.startsWith('.'))
    .sort((a, b) => Number(statSync(join(dir, b)).isDirectory()) - Number(statSync(join(dir, a)).isDirectory()) || a.localeCompare(b))
  return items
    .map((n, i) => {
      const ultimo = i === items.length - 1
      const ruta = join(dir, n)
      const linea = `${prefijo}${ultimo ? '└── ' : '├── '}${n}`
      return statSync(ruta).isDirectory() ? `${linea}/\n${arbol(ruta, prefijo + (ultimo ? '    ' : '│   '))}` : `${linea}\n`
    })
    .join('')
}

/** Resultados de Lighthouse guardados por docs/herramientas/lighthouse.mjs (si existen). */
function lighthouse() {
  const f = join(ROOT, 'docs', 'capturas', 'lighthouse.json')
  if (!existsSync(f)) return '<p class="aviso">No se encontraron resultados de Lighthouse.</p>'
  const r = JSON.parse(readFileSync(f, 'utf8'))
  const fila = (d) =>
    `<tr><td>${d.dispositivo}</td><td>${d.rendimiento}</td><td>${d.accesibilidad}</td><td>${d.buenasPracticas}</td><td>${d.seo}</td><td>${d.lcp}</td></tr>`
  return `<table><thead><tr><th>Dispositivo</th><th>Rendimiento</th><th>Accesibilidad</th><th>Buenas prácticas</th><th>SEO</th><th>LCP</th></tr></thead>
    <tbody>${r.resultados.map(fila).join('')}</tbody></table>
    <p style="font-size:9pt;color:#6e6e73">Lighthouse ${r.version} sobre la versión de producción (<code>npm run build</code> + <code>vite preview</code>), medido el ${r.fecha}.</p>`
}

const ultimas = (n) => (out) => out.split('\n').slice(-n).join('\n')

export const seccionesDoc = [
  // ── Portada ──
  async () => `
  <section class="portada">
    <div class="inst"><strong>SENATI</strong>Escuela de Tecnologías de la Información</div>
    <div>
      <div class="sub">Laboratorio #4 · Guía Práctica 4</div>
      <h1>Creación de mi portafolio en React usando componentes</h1>
      <div class="imagen"><img src="${pathToFileURL(join(ROOT, 'docs', 'capturas', '01-hero-escritorio.png'))}" alt=""></div>
      <dl>
        <dt>Curso</dt><dd>Fullstack Developer Software – Seminario (IA 501)</dd>
        <dt>Instructor</dt><dd>Ing. Giancarlos Barboza N.</dd>
        <dt>Alumno</dt><dd>Dorian Girón Prato</dd>
        <dt>Carrera</dt><dd>Ingeniería de Software con Inteligencia Artificial · 5.º ciclo</dd>
        <dt>Repositorio</dt><dd><a href="${REPO}">${REPO.replace('https://', '')}</a></dd>
        <dt>Fecha</dt><dd>19 de octubre de 2026</dd>
      </dl>
    </div>
    <div class="inst">Documentación con capturas de código y de ejecución.</div>
  </section>`,

  // ── Índice y objetivo ──
  async () => `
  <section class="salto indice">
    <h2><small>Contenido</small>Índice</h2>
    <ol>
      <li>Objetivo, tecnologías y estructura del proyecto</li>
      <li>Pasos 1 a 4 · Navbar (cabecera con menú hamburguesa)</li>
      <li>Pasos 5 a 7 · Banner (portada animada)</li>
      <li>Pasos 8 a 10 · Perfil (sobre mí y formación)</li>
      <li>Pasos 11 a 13 · Habilidades</li>
      <li>Pasos 14 a 16 · Proyectos</li>
      <li>Pasos 17 a 19 · Contacto (formulario controlado)</li>
      <li>Ensamblaje final en App y vista móvil</li>
      <li>Proyecto adicional: alerta sísmica con Arduino (Tinkercad)</li>
      <li>Verificación: lint, tipos, pruebas, compilación y Lighthouse</li>
      <li>Diferencias con la guía y conclusiones</li>
    </ol>

    <h3>1. Objetivo</h3>
    <p>Construir un portafolio personal en React dividido en componentes reutilizables, siguiendo la estructura de la guía: Navbar, Banner, Perfil,
    Habilidades, Proyectos y Contacto, cada uno con su lógica y sus estilos encapsulados y ensamblados en <code>App</code>.</p>
    <p>El resultado es mi portafolio profesional real, publicado en GitHub: muestra mi experiencia como ingeniero de software júnior en Ruvic AI,
    mi formación en SENATI (5.º ciclo de Ingeniería de Software con IA) y mis proyectos con código público.</p>

    <h3>Tecnologías</h3>
    <table>
      <thead><tr><th>Herramienta</th><th>Uso en el proyecto</th></tr></thead>
      <tbody>
        <tr><td>React 19 + Vite</td><td>Componentes, estado con <code>useState</code>, efectos con <code>useEffect</code> y servidor de desarrollo.</td></tr>
        <tr><td>TypeScript</td><td>Tipos para los datos (proyectos, habilidades, trayectoria) y los componentes.</td></tr>
        <tr><td>CSS Modules</td><td>Un archivo <code>.module.css</code> por componente: estilos encapsulados, como pide la guía.</td></tr>
        <tr><td>Motion</td><td>Animaciones al hacer scroll (respetando «reducir movimiento»).</td></tr>
        <tr><td>three.js</td><td>Portátil 3D del banner, que se abre con el scroll.</td></tr>
        <tr><td>Vitest + ESLint</td><td>Pruebas automáticas de los datos y análisis estático del código.</td></tr>
      </tbody>
    </table>
  </section>`,

  // ── Estructura ──
  async ({ codigo, terminal }) => `
  <section class="salto">
    <h2><small>Paso 1 y 2</small>Instalación y estructura de archivos</h2>
    <p>El proyecto se creó con Vite (plantilla React + TypeScript). Igual que en la guía, cada componente tiene su lógica (<code>.tsx</code>) y sus estilos
    (<code>.module.css</code>) en archivos separados. Los datos (proyectos, habilidades, trayectoria y perfil) están centralizados en <code>src/data</code>,
    así que añadir un proyecto no exige tocar los componentes.</p>
    <div class="fila" style="gap:6mm">
      <figure class="editor" style="flex:1"><figcaption><span class="dots"><i></i><i></i><i></i></span><span>Explorador · src/</span></figcaption>
        <div class="code"><pre class="arbol" style="color:#d4d4d4;padding-left:12pt">src/\n${arbol(join(ROOT, 'src')).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre></div></figure>
    </div>
    ${await codigo('package.json', { desde: 1, hasta: 13 })}
    ${terminal('node --version && npm --version')}
  </section>`,

  // ── Navbar ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 1 a 4</small>Navbar: cabecera con menú hamburguesa</h2>
    <p>Equivale a <code>Navbar.jsx</code> de la guía. Con <code>useState</code> se controla si el menú móvil está abierto (<code>open</code>), y al pulsar un enlace
    se cierra con <code>setOpen(false)</code>. Además, un <code>IntersectionObserver</code> resalta la sección visible y la tecla Escape cierra el menú.
    Los enlaces salen de un arreglo de datos recorrido con <code>map</code>.</p>
    ${await codigo('src/components/SiteHeader.tsx')}
    ${await codigo('src/data/navigation.ts', { desde: 1, hasta: 9 })}
    <h3>Estilos y responsividad (Paso 3)</h3>
    <p>En pantallas de hasta 900 px los enlaces se ocultan y aparece el botón hamburguesa; con la clase <code>open</code> el menú se despliega.</p>
    ${await codigo('src/components/SiteHeader.module.css', { desde: 93, hasta: 134 })}
    <h3>Ejecución</h3>
    ${captura('01-hero-escritorio', 'Cabecera fija y translúcida en escritorio, con el enlace «Escríbeme».')}
    <div class="fila">
      ${captura('20-movil-inicio', 'Móvil: menú cerrado.', { ancho: '42%' })}
      ${captura('21-movil-menu', 'Móvil: menú hamburguesa abierto (estado <code>open = true</code>).', { ancho: '42%' })}
    </div>
  </section>`,

  // ── Banner ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 5 a 7</small>Banner: portada con portátil que se abre al hacer scroll</h2>
    <p>Equivale a <code>Banner.jsx</code>. Muestra mi nombre, una frase y los botones de acción. En lugar de la foto circular de la guía, el banner presenta
    un portátil 3D (three.js) que llega cerrado y se abre según el progreso del scroll (<code>useScroll</code> + <code>useTransform</code>), y al final aparece un teléfono
    con otro de mis proyectos. Si el usuario prefiere reducir el movimiento, se muestra una imagen fija.</p>
    ${await codigo('src/sections/Hero.tsx', { desde: 11, hasta: 54 })}
    <h3>Estilos (Paso 6)</h3>
    ${await codigo('src/sections/Hero.module.css', { desde: 52, hasta: 79 })}
    <h3>Ejecución</h3>
    ${captura('02-portatil-abriendose', 'El portátil abriéndose mientras se hace scroll.')}
    ${captura('03-portatil-abierto', 'Portátil abierto con el panel de watchdog-bot-monitor y el teléfono con appEscuela.')}
  </section>`,

  // ── Perfil ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 8 a 10</small>Perfil: sobre mí y formación</h2>
    <p>Equivale a <code>Perfil.jsx</code>. Los textos salen de <code>src/data/profile.ts</code>; la foto tiene un leve efecto de paralaje. La formación académica y la experiencia
    se muestran en la sección Trayectoria a partir de <code>src/data/timeline.ts</code>.</p>
    ${await codigo('src/data/profile.ts', { desde: 1, hasta: 20 })}
    ${await codigo('src/sections/About.tsx')}
    ${await codigo('src/data/timeline.ts')}
    <h3>Estilos (Paso 9)</h3>
    ${await codigo('src/sections/About.module.css', { desde: 1, hasta: 33 })}
    <h3>Ejecución</h3>
    ${captura('04-sobre-mi', 'Sección «Sobre mí»: 5.º ciclo de Ingeniería de Software con IA en SENATI y prácticas en Ruvic AI.')}
    ${captura('09-trayectoria', 'Trayectoria: experiencia, formación en SENATI y certificaciones verificables.')}
  </section>`,

  // ── Habilidades ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 11 a 13</small>Habilidades</h2>
    <p>Equivale a <code>Habilidades.jsx</code>: un arreglo de datos recorrido con <code>map</code>. En vez de porcentajes, cada tecnología indica dónde se puede
    comprobar (repositorio o proyecto), para no inventar niveles.</p>
    ${await codigo('src/data/stack.ts', { desde: 1, hasta: 28 })}
    ${await codigo('src/sections/Stack.tsx', { desde: 25, hasta: 58 })}
    <h3>Estilos y cuadrícula (Paso 12)</h3>
    ${await codigo('src/sections/Stack.module.css', { desde: 10, hasta: 32 })}
    <h3>Ejecución</h3>
    ${captura('08-stack', 'Stack con evidencia: cada habilidad enlaza al lugar donde se usa.')}
  </section>`,

  // ── Proyectos ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 14 a 16</small>Proyectos</h2>
    <p>Equivale a <code>Proyectos.jsx</code>. Cada proyecto es un objeto con imagen, descripción, etiquetas de tecnologías y enlaces al código y a la demo.
    La cuadrícula se genera con <code>map</code>; al pulsar una tarjeta se abre un diálogo con galería, el problema, la solución y mi aporte.</p>
    ${await codigo('src/types/index.ts', { desde: 50, hasta: 69, titulo: 'src/types/index.ts · tipo Project' })}
    ${await codigo('src/data/projects.ts', { desde: 1, hasta: 30 })}
    ${await codigo('src/sections/Projects.tsx', { desde: 186, hasta: 230 })}
    <h3>Estilos (Paso 15)</h3>
    ${await codigo('src/sections/Projects.module.css', { desde: 1, hasta: 25 })}
    <h3>Ejecución</h3>
    ${captura('05-proyectos', 'Cuadrícula de proyectos.')}
    ${captura('06-proyecto-detalle', 'Detalle de un proyecto en un diálogo modal.')}
    ${captura('07-explorador-busqueda', 'Explorador de los 46 conectores con búsqueda en vivo (filtro «postgres»).')}
  </section>`,

  // ── Contacto ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 17 a 19</small>Contacto: formulario controlado</h2>
    <p>Equivale a <code>Contacto.jsx</code>. Un único estado (<code>useState</code>) guarda nombre, correo y mensaje; <code>onChange</code> actualiza el campo por su
    atributo <code>name</code> (como <code>manejarCambio</code> en la guía) y <code>onSubmit</code> evita la recarga (como <code>manejarEnvio</code>).</p>
    <p class="nota">El sitio no tiene servidor, así que el formulario no finge un envío: abre la aplicación de correo del visitante con el mensaje ya redactado
    (<code>mailto:</code>) y lo indica en pantalla.</p>
    ${await codigo('src/components/ContactForm.tsx')}
    ${await codigo('src/sections/Contact.tsx', { desde: 10, hasta: 47 })}
    <h3>Estilos (Paso 18)</h3>
    ${await codigo('src/components/ContactForm.module.css', { desde: 18, hasta: 59 })}
    <h3>Ejecución</h3>
    ${captura('11-contacto-formulario', 'Formulario de contacto con datos de ejemplo escritos.')}
  </section>`,

  // ── App ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Pasos 4, 7, 10, 13, 16 y 19</small>Ensamblaje en App</h2>
    <p>Como en la guía, cada componente se importa y se coloca en <code>App</code>, en el orden en que aparece en la página. <code>main.tsx</code> monta la aplicación.</p>
    ${await codigo('src/App.tsx')}
    ${await codigo('src/main.tsx')}
    <h3>Vista móvil</h3>
    <div class="fila">
      ${captura('22-movil-proyectos', 'Proyectos en móvil.', { ancho: '42%' })}
      ${captura('23-movil-contacto', 'Contacto en móvil.', { ancho: '42%' })}
    </div>
    ${captura('10-github', 'Actividad de GitHub en vivo, leída de la API pública.')}
  </section>`,

  // ── Tinkercad ──
  async ({ codigo, captura }) => `
  <section class="salto">
    <h2><small>Proyecto adicional</small>Alerta sísmica con Arduino (Tinkercad)</h2>
    <p>Circuito diseñado y simulado en Tinkercad Circuits e incorporado al portafolio como proyecto. Dos Arduino Uno se comunican por I2C:</p>
    <ul>
      <li><b>Controlador (U1, maestro):</b> lee el sensor de inclinación, el de temperatura TMP36 y el de gas cada 500 ms, muestra los valores en un LCD 16×2
      y envía el código de alerta (0 normal, 1 sismo, 2 incendio, 3 gas). La alarma se desactiva con una clave en un teclado 4×4.</li>
      <li><b>Actuadores (U4, esclavo en la dirección 8):</b> abre la puerta de emergencia con un servo, anima un anillo NeoPixel con un color por evento
      y hace sonar el zumbador con un patrón distinto en cada caso.</li>
    </ul>
    ${captura('30-tinkercad-circuito', 'Vista de protoboard en Tinkercad.')}
    ${captura('31-tinkercad-esquema', 'Esquema eléctrico exportado de Tinkercad. U1 y U4 comparten A4 (SDA), A5 (SCL), 5 V y GND.')}
    ${captura('12-proyecto-iot', 'El proyecto dentro del portafolio.')}
    ${await codigo('iot/alerta-sismica/controlador/controlador.ino')}
    ${await codigo('iot/alerta-sismica/actuadores/actuadores.ino')}
  </section>`,

  // ── Verificación ──
  async ({ terminal }) => `
  <section class="salto">
    <h2><small>Calidad</small>Verificación</h2>
    <p>Salidas reales de los comandos del proyecto, ejecutados al generar este documento.</p>
    ${terminal('npm run lint')}
    ${terminal('npm run typecheck')}
    ${terminal('npm test', { filtrar: ultimas(8) })}
    ${terminal('npm run build', { filtrar: ultimas(14) })}
    <h3>Lighthouse</h3>
    ${lighthouse()}
    <h3>Control de versiones</h3>
    ${terminal('git log --oneline -10')}
  </section>`,

  // ── Diferencias y conclusiones ──
  async () => `
  <section class="salto">
    <h2><small>Cierre</small>Diferencias con la guía y conclusiones</h2>
    <table>
      <thead><tr><th>Guía</th><th>Este proyecto</th><th>Motivo</th></tr></thead>
      <tbody>
        <tr><td>JavaScript (<code>.jsx</code>)</td><td>TypeScript (<code>.tsx</code>)</td><td>Los tipos detectan errores en los datos antes de ejecutar.</td></tr>
        <tr><td>Bootstrap y <code>.css</code> globales</td><td>CSS Modules</td><td>Estilos encapsulados por componente, sin choques de clases.</td></tr>
        <tr><td>Datos dentro de cada componente</td><td>Datos en <code>src/data</code></td><td>Para actualizar el portafolio solo se editan los datos.</td></tr>
        <tr><td>Banner con foto circular</td><td>Portátil 3D que se abre con el scroll; la foto está en «Sobre mí»</td><td>Presentar los proyectos desde el primer vistazo.</td></tr>
        <tr><td>Habilidades con porcentajes</td><td>Habilidades con evidencia</td><td>No inventar niveles: cada una enlaza a dónde se usa.</td></tr>
        <tr><td>Formulario que limpia los campos al enviar</td><td>Formulario que abre el correo con el mensaje</td><td>Sin servidor, no se simula un envío que no ocurre.</td></tr>
        <tr><td>Sección «Servicios»</td><td>Conectores, GitHub en vivo y Trayectoria</td><td>Mostrar trabajo real en lugar de servicios genéricos.</td></tr>
      </tbody>
    </table>
    <h3>Conclusiones</h3>
    <ul>
      <li>Dividir la página en componentes con su propio estado y estilos hace que cada parte se pueda modificar sin afectar a las demás.</li>
      <li>Separar los datos de la presentación permite añadir proyectos, como el de Tinkercad, sin cambiar la lógica de los componentes.</li>
      <li><code>useState</code> resuelve tanto el menú móvil como el formulario controlado; <code>useEffect</code> se usa para los eventos del navegador.</li>
      <li>Las pruebas, el análisis estático y Lighthouse confirman que el sitio compila sin errores y es accesible.</li>
    </ul>
    <p class="nota">Código fuente: <a href="${REPO}">${REPO}</a></p>
  </section>`,
]
