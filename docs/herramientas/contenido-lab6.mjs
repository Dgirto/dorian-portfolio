// Contenido del PDF del Laboratorio #6: formulario funcional con EmailJS.
// Uso: node docs/herramientas/generar-pdf.mjs contenido-lab6.mjs
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const REPO = 'https://github.com/Dgirto/dorian-portfolio'
const SITIO = 'https://dorian-portafolio.vercel.app'
const img = (n) => pathToFileURL(join(ROOT, 'docs', 'capturas', `${n}.png`))
const ultimas = (n) => (out) => out.split('\n').slice(-n).join('\n')
const lineas = (re) => (out) => out.split('\n').filter((l) => re.test(l)).join('\n')

export const datosDoc = {
  titulo: 'Laboratorio #6 – Formulario funcional con EmailJS – Dorian Girón Prato',
  archivo: 'Laboratorio-6-Dorian-Giron-Prato.pdf',
  pie: 'Laboratorio #6 · Fullstack Developer Software – Seminario IA 501 · Dorian Girón Prato',
}

export const seccionesDoc = [
  // ── Portada ──
  async () => `
  <section class="portada">
    <div class="inst"><strong>SENATI</strong>Escuela de Tecnologías de la Información</div>
    <div>
      <div class="sub">Laboratorio #6 · Guía Práctica 6</div>
      <h1>Formulario funcional con EmailJS</h1>
      <div class="imagen"><img src="${img('43-lab6-enviado')}" alt=""></div>
      <dl>
        <dt>Curso</dt><dd>Fullstack Developer Software – Seminario (IA 501)</dd>
        <dt>Instructor</dt><dd>Ing. Giancarlos Barboza N.</dd>
        <dt>Alumno</dt><dd>Dorian Girón Prato</dd>
        <dt>Carrera</dt><dd>Ingeniería de Software con Inteligencia Artificial · 5.º ciclo</dd>
        <dt>Sitio publicado</dt><dd><a href="${SITIO}">${SITIO.replace('https://', '')}</a></dd>
        <dt>Repositorio</dt><dd><a href="${REPO}">${REPO.replace('https://', '')}</a></dd>
        <dt>Fecha</dt><dd>25 de octubre de 2026</dd>
      </dl>
    </div>
    <div class="inst">Documentación con capturas de configuración, código y ejecución.</div>
  </section>`,

  // ── Índice, objetivo y arquitectura ──
  async () => `
  <section class="salto indice">
    <h2><small>Contenido</small>Índice</h2>
    <ol>
      <li>Objetivo, tecnologías y funcionamiento</li>
      <li>Paso 1 · Configuración en el panel de EmailJS</li>
      <li>Paso 2 · Variables de entorno en Vite</li>
      <li>Paso 3 · Instalación de librerías</li>
      <li>Paso 4 · Componente del formulario conectado a EmailJS</li>
      <li>Publicación en Vercel con las variables de entorno</li>
      <li>Ejecución: envío real, estado de carga, éxito y error</li>
      <li>Verificación de calidad</li>
      <li>Seguridad, diferencias con la guía y conclusiones</li>
    </ol>

    <h3>1. Objetivo</h3>
    <p>Convertir el formulario de contacto del portafolio, que en el Laboratorio #4 era un formulario controlado sin servidor,
    en un <b>formulario funcional</b>: al pulsar «Enviar mensaje», el mensaje llega por correo electrónico al propietario del sitio.
    Para lograrlo sin construir un backend propio se usa <b>EmailJS</b>, un servicio que envía correos desde el navegador a partir de una
    plantilla, y <b>SweetAlert2</b> para mostrar el resultado con una alerta.</p>

    <h3>Tecnologías</h3>
    <table>
      <thead><tr><th>Herramienta</th><th>Uso</th></tr></thead>
      <tbody>
        <tr><td>EmailJS (<code>@emailjs/browser</code> 5)</td><td>Envía el correo con un servicio (Gmail) y una plantilla, sin servidor propio.</td></tr>
        <tr><td>SweetAlert2</td><td>Alerta de éxito o error al terminar el envío.</td></tr>
        <tr><td>Vite (<code>import.meta.env</code>)</td><td>Lee las credenciales desde el archivo <code>.env</code> (variables con prefijo <code>VITE_</code>).</td></tr>
        <tr><td>React 19 + TypeScript</td><td>Formulario controlado con <code>useState</code> y envío asíncrono con <code>async/await</code>.</td></tr>
        <tr><td>Vercel</td><td>Publicación del sitio y variables de entorno de producción.</td></tr>
      </tbody>
    </table>

    <h3>Cómo funciona</h3>
    <div class="flujo">
      <div><strong>1. Visitante</strong>Completa nombre, correo y mensaje en el formulario del portafolio.</div>
      <span>→</span>
      <div><strong>2. React</strong><code>emailjs.send()</code> envía los datos con el Service ID, el Template ID y la Public Key.</div>
      <span>→</span>
      <div><strong>3. EmailJS</strong>Completa la plantilla (<code>{{nombre}}</code>, <code>{{email}}</code>, <code>{{mensaje}}</code>) y envía el correo por Gmail.</div>
      <span>→</span>
      <div><strong>4. Correo</strong>Llega a gironpratodorian@gmail.com con «Responder a» apuntando al visitante.</div>
    </div>
  </section>`,

  // ── Paso 1: EmailJS ──
  async ({ captura, codigo }) => `
  <section class="salto">
    <h2><small>Paso 1</small>Configuración en el panel de EmailJS</h2>
    <p>Antes de escribir código se crearon las credenciales en <a href="https://www.emailjs.com">emailjs.com</a> con una cuenta gratuita
    (200 envíos al mes).</p>
    <ol>
      <li><b>Email Services → Add New Service:</b> se conectó la cuenta de Gmail. EmailJS asignó el <b>Service ID</b> <code>service_xa2vuyz</code>.</li>
      <li><b>Email Templates → Create New Template:</b> se creó la plantilla «Contact Us», con Template ID <code>template_hvvsetd</code>.</li>
      <li><b>Account → API Keys:</b> se copió la <b>Public Key</b> (<code>kHZV…</code>), que identifica la cuenta al enviar desde el navegador.</li>
    </ol>
    <div class="par">
      ${captura('52-lab6-emailjs-template-id', 'Plantilla creada y su Template ID.')}
      ${captura('51-lab6-emailjs-editor', '«Edit Content»: editor visual o editor de código HTML.')}
    </div>
    <h3>La plantilla</h3>
    <p>En la plantilla se definen el destinatario (<b>To Email</b>), el asunto y el cuerpo. Las variables entre llaves dobles se
    reemplazan por los valores que envía React. Se configuró <b>Reply To</b> = <code>{{email}}</code> para responder al visitante con un clic.</p>
    ${captura('50-lab6-emailjs-plantilla', 'Configuración de la plantilla en EmailJS: asunto, contenido, To Email, From Name y Reply To.')}
    <table>
      <thead><tr><th>Variable</th><th>Origen en React</th><th>Uso en la plantilla</th></tr></thead>
      <tbody>
        <tr><td><code>{{nombre}}</code> / <code>{{name}}</code></td><td><code>form.nombre</code></td><td>Remitente y saludo</td></tr>
        <tr><td><code>{{email}}</code></td><td><code>form.email</code></td><td>Reply To y datos del visitante</td></tr>
        <tr><td><code>{{mensaje}}</code> / <code>{{message}}</code></td><td><code>form.mensaje</code></td><td>Cuerpo del correo</td></tr>
        <tr><td><code>{{title}}</code>, <code>{{time}}</code></td><td>Generados al enviar</td><td>Asunto y fecha de recepción</td></tr>
      </tbody>
    </table>
    <p class="nota">La guía pide <code>{{nombre}}</code>, <code>{{email}}</code> y <code>{{mensaje}}</code>. La plantilla «Contact Us» que crea EmailJS
    por defecto usa <code>{{name}}</code>, <code>{{message}}</code>, <code>{{title}}</code> y <code>{{time}}</code>, así que el formulario envía
    <b>ambos juegos de nombres</b>: funciona con cualquiera de las dos plantillas.</p>
    <h3>Diseño del correo</h3>
    <p>Para que el correo recibido tenga la misma identidad que el portafolio se diseñó una plantilla HTML (Code Editor de EmailJS) con
    tablas y estilos en línea, que es lo que soportan Gmail y Outlook.</p>
    ${captura('45-lab6-plantilla-correo', 'Diseño de la plantilla con datos de ejemplo: cabecera oscura «¿Hablamos?», datos del visitante, mensaje y botón para responder.', { ancho: '82%' })}
    ${await codigo('docs/herramientas/plantilla-emailjs.html', { desde: 1, hasta: 30, titulo: 'Plantilla HTML de EmailJS (Code Editor)' })}
  </section>`,

  // ── Paso 2: variables de entorno ──
  async ({ codigo, terminal }) => `
  <section class="salto">
    <h2><small>Paso 2</small>Variables de entorno en Vite</h2>
    <p>Las credenciales no se escriben en el código fuente. En la raíz del proyecto (junto a <code>package.json</code>) se creó el archivo
    <code>.env</code> con las tres variables. En Vite, solo las variables que empiezan por <code>VITE_</code> llegan al navegador.</p>
    <p>El archivo real <code>.env</code> no se sube a GitHub; en el repositorio queda <code>.env.example</code> como modelo:</p>
    ${await codigo('.env.example')}
    <p>Tras crear o editar <code>.env</code> hay que <b>reiniciar <code>npm run dev</code></b>: Vite solo lee el archivo al arrancar.</p>
    <p class="nota"><b>Punto clave 1 de la guía:</b> en Vite las variables se leen con <code>import.meta.env.VITE_…</code>,
    no con <code>env()</code> como en Laravel ni con <code>process.env</code> como en Node o Webpack. Además, Vite las
    <b>incrusta al compilar</b>: si se cambian, hay que volver a compilar y desplegar.</p>
    <h3>Exclusión del repositorio</h3>
    ${await codigo('.gitignore', { desde: 7, hasta: 10 })}
    ${terminal('git check-ignore -v .env')}
    <h3>Tipos de las variables (TypeScript)</h3>
    <p>Como el proyecto usa TypeScript, se declararon las variables para que <code>import.meta.env</code> tenga autocompletado y
    comprobación de tipos:</p>
    ${await codigo('src/vite-env.d.ts')}
  </section>`,

  // ── Paso 3: instalación ──
  async ({ codigo, terminal }) => `
  <section class="salto">
    <h2><small>Paso 3</small>Instalación de librerías</h2>
    <p>Se instalaron EmailJS y SweetAlert2 desde la terminal del proyecto:</p>
    <figure class="terminal"><figcaption>Terminal · dorian-portfolio</figcaption><pre><b>&gt; npm install @emailjs/browser sweetalert2</b></pre></figure>
    <p>Versiones instaladas, comprobadas al generar este documento:</p>
    ${terminal('npm ls @emailjs/browser sweetalert2')}
    ${await codigo('package.json', { desde: 14, hasta: 24, titulo: 'package.json · dependencias' })}
    <h3>Carga bajo demanda</h3>
    <p>Las dos librerías se importan con <code>import()</code> dinámico dentro del envío. Así no pesan en la carga inicial de la página:
    Vite las separa en archivos propios que el navegador solo descarga cuando alguien envía el formulario.</p>
    ${terminal('npm run build', { filtrar: lineas(/sweetalert2|index-.*\.js|built in/) })}
  </section>`,

  // ── Paso 4: componente ──
  async ({ codigo }) => `
  <section class="salto">
    <h2><small>Paso 4</small>Componente del formulario conectado a EmailJS</h2>
    <p>La guía actualiza <code>Contacto.jsx</code>. En este proyecto el formulario vive en <code>src/components/ContactForm.tsx</code>
    (el mismo componente controlado del Laboratorio #4) y se conectó a EmailJS con programación asíncrona.</p>
    <table>
      <thead><tr><th>Guía (Contacto.jsx)</th><th>Este proyecto (ContactForm.tsx)</th></tr></thead>
      <tbody>
        <tr><td><code>formulario</code> / <code>setFormulario</code></td><td><code>form</code> / <code>setForm</code> (un único estado con los tres campos)</td></tr>
        <tr><td><code>cargando</code> (booleano)</td><td><code>status</code>: <code>idle · sending · sent · error</code>; <code>sending = status === 'sending'</code></td></tr>
        <tr><td><code>manejarCambio</code></td><td><code>onChange</code>: actualiza el campo según su atributo <code>name</code></td></tr>
        <tr><td><code>manejarEnvio</code> con <code>async/await</code></td><td><code>onSubmit</code> con <code>async/await</code> y <code>try/catch</code></td></tr>
        <tr><td><code>Swal.fire(...)</code></td><td><code>alerta(ok)</code>: una sola función para éxito y error</td></tr>
        <tr><td><code>disabled={cargando}</code></td><td><code>disabled={sending}</code> en los tres campos y el botón</td></tr>
      </tbody>
    </table>

    <h3>Credenciales desde el .env</h3>
    ${await codigo('src/components/ContactForm.tsx', { desde: 15, hasta: 32 })}
    <p>Si falta alguna variable, el formulario no finge un envío: abre la aplicación de correo del visitante con el mensaje redactado
    (comportamiento del Laboratorio #4). Los textos de <code>NOTES</code> se anuncian a los lectores de pantalla con <code>aria-live</code>.</p>

    <h3>Estado controlado y manejo de cambios</h3>
    ${await codigo('src/components/ContactForm.tsx', { desde: 57, hasta: 66 })}

    <h3>Envío asíncrono (manejarEnvio)</h3>
    ${await codigo('src/components/ContactForm.tsx', { desde: 75, hasta: 105 })}
    <ul>
      <li><code>e.preventDefault()</code> evita que el navegador recargue la página.</li>
      <li><code>setStatus('sending')</code> activa el estado de carga antes de llamar a EmailJS.</li>
      <li><code>await emailjs.send(serviceId, templateId, params, opciones)</code> espera la respuesta del servicio.</li>
      <li>Si todo va bien, se limpia el formulario y se muestra la alerta de éxito; si falla, el error queda en la consola y se muestra
      la alerta de error <b>sin borrar lo escrito</b>, para que el visitante pueda reintentar.</li>
      <li><code>limitRate</code> permite un envío cada 10 segundos y <code>blockHeadless</code> rechaza navegadores automatizados (antispam).</li>
    </ul>

    <h3>Alertas con SweetAlert2</h3>
    ${await codigo('src/components/ContactForm.tsx', { desde: 34, hasta: 50 })}
    <p>Los colores siguen la paleta del portafolio (fondo <code>#0d1117</code>, botón verde <code>#0a7f52</code>).
    <code>heightAuto: false</code> evita que la página salte al inicio mientras la alerta está abierta.</p>

    <h3>Campos y botón bloqueados durante el envío</h3>
    ${await codigo('src/components/ContactForm.tsx', { desde: 107, hasta: 162 })}
    <p class="nota"><b>Punto clave 2 de la guía:</b> con <code>disabled={sending}</code> los campos y el botón se bloquean mientras se envía,
    así un usuario impaciente no puede enviar el mismo correo varias veces. <code>aria-busy</code> lo comunica a los lectores de pantalla.</p>
    <p class="nota"><b>Punto clave 3 de la guía (<code>finally</code>):</b> la guía usa <code>finally</code> para devolver
    <code>cargando</code> a <code>false</code>. Aquí el estado de carga no es un booleano aparte, sino que se deriva de <code>status</code>:
    tanto el <code>try</code> (<code>'sent'</code>) como el <code>catch</code> (<code>'error'</code>) lo sacan de <code>'sending'</code>,
    por lo que el botón siempre vuelve a su estado normal, igual que con <code>finally</code>.</p>

    <h3>Uso en la sección de contacto</h3>
    ${await codigo('src/sections/Contact.tsx', { desde: 38, hasta: 40 })}
  </section>`,

  // ── Vercel ──
  async ({ captura, terminal }) => `
  <section class="salto">
    <h2><small>Publicación</small>Variables de entorno en Vercel</h2>
    <p>El archivo <code>.env</code> solo existe en la computadora de desarrollo. Para que el sitio publicado envíe correos, las mismas tres
    variables se añadieron en Vercel: <b>Project → Settings → Environment Variables</b>, entorno <b>Production</b>.</p>
    ${captura('53-lab6-vercel-agregar', 'Alta de las tres variables en Vercel. El aviso naranja indica que una variable VITE_ queda visible en el navegador: es lo esperado para la Public Key de EmailJS.', { ancho: '62%' })}
    ${captura('54-lab6-vercel-variables', 'Variables guardadas en el proyecto dorian-portafolio, entorno Production.')}
    <h3>Por qué hizo falta volver a desplegar</h3>
    <p>Al guardar las variables, el sitio seguía mostrando «Preparar correo». Vite incrusta <code>import.meta.env</code> al compilar, así
    que el despliegue anterior se había compilado <b>sin</b> las claves. Se resolvió con <b>Deployments → ⋯ → Redeploy</b>.</p>
    <div class="par">
      ${captura('56-lab6-sin-variables', 'Antes del Redeploy: sin variables, el formulario usa el respaldo (abrir el correo del visitante).')}
      ${captura('55-lab6-vercel-despliegues', 'Despliegues del proyecto en Vercel (cada push a main publica una versión nueva).')}
    </div>
    <h3>Comprobación del sitio publicado</h3>
    <p>Este script descarga el JavaScript publicado y confirma que las credenciales quedaron incrustadas:</p>
    ${terminal('node docs/herramientas/verificar-produccion.mjs')}
  </section>`,

  // ── Ejecución ──
  async ({ captura }) => `
  <section class="salto">
    <h2><small>Ejecución</small>Prueba en el sitio publicado</h2>
    <p>Prueba realizada en <a href="${SITIO}/#contacto">${SITIO.replace('https://', '')}</a> con un <b>envío real</b> el 25 de octubre de 2026.
    Para que el estado «Enviando…» se viera en la captura, se simuló una red lenta en el navegador de prueba.</p>
    ${captura('40-lab6-formulario', '1. Sección de contacto con el formulario listo: la nota indica «Tu mensaje me llega directamente al correo».')}
    ${captura('41-lab6-formulario-lleno', '2. Formulario completado con nombre, correo y mensaje.')}
    ${captura('42-lab6-enviando', '3. Durante el envío: botón «Enviando…», campos y botón deshabilitados y nota «Enviando tu mensaje…».')}
    ${captura('43-lab6-enviado', '4. Respuesta real de EmailJS: alerta «¡Mensaje enviado!» de SweetAlert2 y formulario vacío.')}
    <h3>Manejo de errores</h3>
    <p>Para documentar el caso de error se <b>simuló una pérdida de conexión</b> en el navegador de prueba (no se envió nada). La petición a
    EmailJS falla, se muestra la alerta de error y el texto escrito se conserva para reintentar.</p>
    ${captura('44-lab6-error', '5. Sin conexión: alerta «No se pudo enviar»; los datos del formulario se mantienen.')}
  </section>`,

  // ── Calidad ──
  async ({ terminal }) => `
  <section class="salto">
    <h2><small>Calidad</small>Verificación</h2>
    <p>Salidas reales de los comandos del proyecto, ejecutados al generar este documento.</p>
    ${terminal('npm run lint')}
    ${terminal('npm run typecheck')}
    ${terminal('npm test', { filtrar: ultimas(6) })}
    ${terminal('npm run build', { filtrar: ultimas(8) })}
    <h3>Control de versiones</h3>
    ${terminal('git log --oneline -8')}
  </section>`,

  // ── Seguridad, diferencias y conclusiones ──
  async () => `
  <section class="salto">
    <h2><small>Cierre</small>Seguridad, diferencias con la guía y conclusiones</h2>
    <h3>Seguridad</h3>
    <ul>
      <li><b>La Public Key de EmailJS es pública por diseño:</b> viaja en el JavaScript del sitio. Lo que impide que otros la usen es la lista de
      dominios permitidos en <b>Account → Security</b> (solo <code>dorian-portafolio.vercel.app</code> y <code>localhost</code>).</li>
      <li><code>.env</code> está en <code>.gitignore</code>: las credenciales no están en el historial de GitHub.</li>
      <li>Antispam: un envío cada 10 segundos por visitante (<code>limitRate</code>) y bloqueo de navegadores automatizados (<code>blockHeadless</code>).</li>
      <li>Campos <code>required</code> y <code>type="email"</code>: el navegador valida antes de enviar.</li>
    </ul>
    <h3>Diferencias con la guía</h3>
    <table>
      <thead><tr><th>Guía</th><th>Este proyecto</th><th>Motivo</th></tr></thead>
      <tbody>
        <tr><td><code>Contacto.jsx</code> (JavaScript)</td><td><code>ContactForm.tsx</code> (TypeScript)</td><td>Tipos para el estado y las variables de entorno.</td></tr>
        <tr><td>Booleano <code>cargando</code> + <code>finally</code></td><td>Estado <code>status</code> con cuatro valores</td><td>Un solo estado sirve para el botón, la nota accesible y las alertas.</td></tr>
        <tr><td>Imports estáticos</td><td><code>import()</code> dinámico</td><td>EmailJS y SweetAlert2 no pesan en la carga inicial.</td></tr>
        <tr><td>Variables <code>{{nombre}}</code>, <code>{{email}}</code>, <code>{{mensaje}}</code></td><td>Esas y las de la plantilla por defecto</td><td>Funciona con la plantilla de la guía y con «Contact Us».</td></tr>
        <tr><td>Sin respaldo</td><td>Si faltan credenciales, abre el correo del visitante</td><td>El formulario nunca finge un envío que no ocurre.</td></tr>
        <tr><td>Solo en local</td><td>Publicado en Vercel con variables de producción</td><td>El formulario funciona en el sitio real.</td></tr>
      </tbody>
    </table>
    <h3>Conclusiones</h3>
    <ul>
      <li>EmailJS permite que un sitio estático envíe correos reales sin programar ni mantener un servidor.</li>
      <li>Separar las credenciales en variables de entorno evita exponerlas en el repositorio y permite usar valores distintos en local y en producción.</li>
      <li>En Vite las variables se incrustan al compilar: tras cambiarlas en Vercel hay que volver a desplegar.</li>
      <li><code>async/await</code> con <code>try/catch</code> y el bloqueo del formulario durante el envío dan una experiencia clara y evitan correos duplicados.</li>
    </ul>
    <p class="nota">Sitio: <a href="${SITIO}">${SITIO}</a> · Código: <a href="${REPO}">${REPO}</a></p>
  </section>`,
]
