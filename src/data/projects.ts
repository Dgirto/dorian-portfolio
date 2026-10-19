import type { Project } from '../types'

// Proyectos destacados. Todo dato procede del repositorio público enlazado.
// Para añadir uno: copia un objeto, pon sus capturas en public/work/ y enlázalas en `slides`.
export const projects: Project[] = [
  {
    slug: 'watchdog',
    name: 'watchdog-bot-monitor',
    kind: 'Personal',
    year: '2026',
    thesis: 'Vigila bots y agentes de IA en producción y avisa cuando caen o se degradan.',
    problem: 'Un bot puede caerse sin que nadie lo note, y un agente de IA puede seguir "en línea" mientras responde mal.',
    solution:
      'Heartbeats por HTTP y WebSocket firmados con HMAC, incidentes que se abren y cierran solos, alertas por SendGrid y Slack con protección contra flapping, y un panel con la salud de cada agente: latencia p95, tasa de error del LLM y cola.',
    contribution: 'Diseño y desarrollo completos: arquitectura hexagonal, API, panel y 29 pruebas con pytest.',
    team: 'Individual',
    stack: ['Python', 'FastAPI', 'WebSockets', 'SQLite / PostgreSQL', 'pytest'],
    repo: 'https://github.com/Dgirto/watchdog-bot-monitor',
    slides: [
      {
        type: 'image',
        src: '/work/watchdog-dashboard.webp',
        alt: 'Panel de watchdog-bot-monitor: estado de la flota con cinco agentes en línea y el cockpit de salud de agentes de IA',
        width: 1400,
        height: 875,
        position: 'left top',
      },
      {
        type: 'image',
        src: '/work/watchdog-fleet.webp',
        alt: 'Cockpit de agentes de IA: un agente degradado con latencia de 3400 ms y 18 % de error frente a otro en estado óptimo',
        width: 1130,
        height: 620,
        position: 'left top',
      },
      {
        type: 'image',
        src: '/work/watchdog-api.webp',
        alt: 'Documentación OpenAPI de la API de watchdog con los endpoints de heartbeat, bots e incidentes',
        width: 1400,
        height: 972,
        position: 'center top',
      },
    ],
  },
  {
    slug: 'conectores',
    name: 'Conectores del catálogo Ruvic AI',
    kind: 'Prácticas',
    year: '2026',
    thesis: '46 conectores con los que un agente de IA lee y opera sistemas externos.',
    problem:
      'Un agente de IA solo es útil si puede trabajar con los sistemas de la empresa: bases de datos, correo, nube y seguridad, cada uno con su propia autenticación.',
    solution:
      'Cada conector repite el mismo método: librería instalable con pip, manifest.json para el catálogo, SKILL.md con instrucciones para el agente, guía bilingüe, prueba de conexión, permisos mínimos y errores clasificados en autenticación, red y datos.',
    contribution: 'Desarrollo de los conectores en Python, su documentación y sus pruebas, durante mis prácticas.',
    team: 'Ruvic AI',
    stack: ['Python', 'OAuth2', 'boto3', 'Azure SDK', 'Google APIs', 'Docker'],
    repo: 'https://github.com/Dgirto?tab=repositories',
    status: 'Repositorios públicos creados en julio de 2026',
    slides: [
      {
        type: 'image',
        src: '/work/doc-gmail.webp',
        alt: 'Guía del conector Gmail: qué hace, ejemplos de peticiones al agente y tabla de operaciones',
        width: 960,
        height: 600,
      },
      {
        type: 'image',
        src: '/work/doc-postgresql.webp',
        alt: 'Guía del conector PostgreSQL en modo solo lectura',
        width: 960,
        height: 600,
      },
      {
        type: 'image',
        src: '/work/doc-palo-alto-pan-os.webp',
        alt: 'Guía del conector Palo Alto PAN-OS, que combina la REST API y la XML API para confirmar cambios',
        width: 960,
        height: 600,
      },
    ],
  },
  {
    slug: 'escuela',
    name: 'appEscuela',
    kind: 'Académico',
    year: '2026',
    thesis: 'Directorio de alumnos en React para gestionar el estado de matrícula.',
    problem: 'Consultar a los alumnos registrados y cambiar su estado de matrícula sin una hoja de cálculo.',
    solution:
      'Tarjetas por alumno con estado, cambio de estado y eliminación con confirmación; animaciones de reordenamiento que respetan prefers-reduced-motion. Desplegada en Vercel.',
    contribution: 'Desarrollo completo del frontend y despliegue.',
    team: 'SENATI',
    stack: ['React 19', 'Vite', 'Bootstrap 5', 'Vercel'],
    repo: 'https://github.com/Dgirto/appEscuela',
    demo: 'https://app-escuela-rho.vercel.app',
    slides: [
      {
        type: 'image',
        src: '/work/escuela-desktop.webp',
        alt: 'appEscuela en escritorio: directorio de alumnos con tarjetas, estado de matrícula y acciones',
        width: 1400,
        height: 875,
        position: 'center top',
      },
      {
        type: 'image',
        src: '/work/escuela-cards.webp',
        alt: 'Detalle de las tarjetas de alumno con los botones Cambiar estado y Eliminar',
        width: 760,
        height: 430,
      },
      {
        type: 'image',
        src: '/work/escuela-mobile.webp',
        alt: 'appEscuela en un teléfono: las tarjetas se apilan en una columna',
        width: 390,
        height: 844,
        position: 'center top',
      },
    ],
  },
  {
    slug: 'msgraph',
    name: 'msgraph-Robin',
    kind: 'Prácticas',
    year: '2026',
    thesis: 'Librería Python para automatizar Microsoft 365 a través de Microsoft Graph.',
    problem: 'Leer y enviar correos de Outlook, mover archivos de OneDrive y avisar en Teams desde un script, sin repetir la autenticación de Azure.',
    solution:
      'Clientes de correo (con filtros y lectura periódica), envío con adjuntos, lectura y escritura en OneDrive incluidas hojas de Excel, mensajes a Teams y gestión de webhooks de Graph.',
    contribution: 'Desarrollo de la librería y su integración como conector del catálogo.',
    team: 'Ruvic AI',
    stack: ['Python', 'Microsoft Graph', 'Azure AD', 'pip'],
    repo: 'https://github.com/Dgirto/msgraph-Robin',
    slides: [
      {
        type: 'code',
        filename: 'README.md · uso de EmailClient',
        language: 'python',
        caption: 'Lectura periódica de correo con callback, tal como la documenta el repositorio.',
        code: `from msgraph_client import EmailClient

email_client = EmailClient(client, mailbox="usuario@empresa.com")

emails = email_client.get_new_emails(
    only_unread=True,
    subject_contains="Reporte",
    include_attachments=True,
    limit=10,
)

def procesar(email):
    print(f"Nuevo correo: {email.subject}")

email_client.start_polling(callback=procesar, poll_interval=60)`,
      },
      {
        type: 'image',
        src: '/work/doc-msgraph-robin.webp',
        alt: 'Guía de configuración del conector Microsoft Graph',
        width: 960,
        height: 600,
      },
    ],
  },
  {
    slug: 'tareas',
    name: 'appTareas (doit)',
    kind: 'Académico',
    year: '2026',
    thesis: 'Gestor de tareas Android con SQLite local e inicio de sesión con Google.',
    problem: 'Organizar tareas de un equipo con estados, fechas de vencimiento y responsables, también sin conexión.',
    solution:
      'Tareas en tres estados con filtros y búsqueda, registro local, acceso con Google mediante Firebase o como invitado, y datos de demostración solo en compilaciones de depuración.',
    contribution: 'Toda la capa de interfaz (actividades, adaptador, layouts, tema, navegación) y el módulo de autenticación.',
    team: 'SENATI · equipo de 5',
    stack: ['Java', 'Android SDK 35', 'SQLite', 'Firebase Auth', 'Figma'],
    repo: 'https://github.com/Dgirto/appTareas',
    slides: [
      {
        type: 'code',
        filename: 'ui/EstadosUi.java',
        language: 'java',
        caption: 'La presentación de cada estado vive en la capa de interfaz, no en la de negocio.',
        code: `/**
 * Traduce un EstadoTarea a los recursos que le corresponden en pantalla.
 * Vive en ui/ porque es decision de presentacion, no de negocio.
 */
final class EstadosUi {

    @ColorRes
    static int colorDe(EstadoTarea estado) {
        switch (estado) {
            case EN_PROGRESO:
                return R.color.estado_progreso;
            case COMPLETADA:
                return R.color.estado_completada;
            case PENDIENTE:
            default:
                return R.color.estado_pendiente;
        }
    }
}`,
      },
      {
        type: 'code',
        filename: 'README.md · compilar y ejecutar',
        language: 'bash',
        caption: 'Compilación, instalación y pruebas unitarias con Gradle.',
        code: `git clone https://github.com/Dgirto/appTareas.git
cd appTareas
./gradlew assembleDebug      # genera el APK de depuración
./gradlew installDebug       # lo instala en el dispositivo
./gradlew test               # ejecuta las pruebas unitarias`,
      },
    ],
  },
]
