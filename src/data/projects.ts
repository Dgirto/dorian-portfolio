import type { Project } from '../types'

// Proyectos destacados. Todo dato procede del repositorio público enlazado.
// Para añadir uno: copia un objeto, guarda sus capturas en public/work/ y enlázalas en `cover` y `slides`.
export const projects: Project[] = [
  {
    slug: 'watchdog',
    name: 'watchdog-bot-monitor',
    featured: true,
    kind: 'Personal',
    year: '2026',
    thesis: 'Monitoreo en tiempo real para bots y agentes de IA en producción.',
    problem: 'Un bot puede caerse sin que nadie lo note, y un agente de IA puede seguir en línea mientras responde mal.',
    solution:
      'Cada agente envía latidos firmados con HMAC por HTTP o WebSocket. Si deja de hacerlo, se abre un incidente y llega una alerta por correo o Slack, con filtros contra falsas alarmas. Un panel muestra el estado de la flota y la salud de cada agente de IA: latencia p95, tasa de error del LLM y cola.',
    contribution: 'Diseño y desarrollo completos: arquitectura hexagonal, API REST y WebSocket, panel web y 29 pruebas automatizadas.',
    team: 'Individual',
    stack: ['Python', 'FastAPI', 'WebSockets', 'SQLite / PostgreSQL', 'pytest'],
    repo: 'https://github.com/Dgirto/watchdog-bot-monitor',
    cover: {
      kind: 'laptop',
      src: '/work/watchdog-dashboard.webp',
      alt: 'Panel de watchdog-bot-monitor con cinco agentes en línea y la salud de dos agentes de IA',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/watchdog-dashboard.webp',
        alt: 'Panel de watchdog-bot-monitor: estado de la flota y cockpit de agentes de IA',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/watchdog-fleet.webp',
        alt: 'Cockpit de agentes de IA: uno degradado con 3400 ms de latencia y 18 % de error frente a otro en estado óptimo',
        width: 1130,
        height: 620,
      },
      {
        type: 'image',
        src: '/work/watchdog-api.webp',
        alt: 'Documentación OpenAPI con los endpoints de latidos, bots e incidentes',
        width: 1400,
        height: 972,
      },
    ],
  },
  {
    slug: 'conectores',
    name: 'Catálogo de conectores de Ruvic AI',
    kind: 'Prácticas',
    year: '2026',
    thesis: '46 conectores que permiten a un agente de IA trabajar con sistemas reales.',
    problem:
      'Un agente de IA solo aporta valor si puede operar con las herramientas de la empresa: bases de datos, correo, nube y seguridad, cada una con su propia forma de autenticarse.',
    solution:
      'Todos siguen el mismo método: librería instalable con pip, manifiesto para el catálogo, instrucciones para el agente, guía de configuración bilingüe, prueba de conexión, permisos mínimos y errores clasificados.',
    contribution: 'Desarrollo en Python, documentación y pruebas de los conectores durante mis prácticas.',
    team: 'Ruvic AI',
    stack: ['Python', 'OAuth2', 'boto3', 'Azure SDK', 'Google APIs', 'Docker'],
    repo: 'https://github.com/Dgirto?tab=repositories',
    status: 'Repositorios públicos desde julio de 2026',
    cover: { kind: 'logos' },
    slides: [
      { type: 'logos', caption: 'Los sistemas del catálogo, cada uno con su repositorio público.' },
      {
        type: 'code',
        filename: 'PostgreSQL/lib/ruvic_postgresql_connector/client.py',
        language: 'python',
        caption: 'Extracto: validación de identificadores contra inyección SQL y conexión en modo de solo lectura.',
        code: `_IDENTIFIER_RE = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


def _validate_identifier(name: str, kind: str) -> None:
    """Valida nombres de tabla/esquema para evitar inyección SQL."""
    if not isinstance(name, str) or not _IDENTIFIER_RE.match(name):
        raise PostgresqlDataError(
            f"Nombre de {kind} inválido: {name!r}. "
            "Solo se permiten letras, números y guion bajo."
        )


conn = psycopg.connect(
    host=self.config.host,
    dbname=self.config.database,
    connect_timeout=self.config.connect_timeout,
    options="-c default_transaction_read_only=on",
)`,
      },
      {
        type: 'code',
        filename: 'PostgreSQL/manifest.json',
        language: 'json',
        caption: 'El manifiesto describe el conector para el catálogo: autenticación, campos y operaciones.',
        code: `{
  "id": "postgresql",
  "name": "PostgreSQL",
  "category": "database",
  "library": {
    "package": "ruvic-postgresql-connector",
    "import_name": "ruvic_postgresql_connector"
  },
  "operations": [
    "db.list_tables",
    "db.read",
    "db.stats",
    "db.explain"
  ]
}`,
      },
    ],
  },
  {
    slug: 'escuela',
    name: 'appEscuela',
    kind: 'Académico',
    year: '2026',
    thesis: 'Directorio de alumnos en React para gestionar la matrícula.',
    problem: 'Consultar a los alumnos y cambiar su estado de matrícula sin depender de una hoja de cálculo.',
    solution:
      'Tarjetas por alumno con estado, cambio de estado y eliminación con confirmación. Las animaciones de reordenamiento respetan la preferencia de movimiento reducido. Publicada en Vercel.',
    contribution: 'Desarrollo del frontend y despliegue.',
    team: 'SENATI',
    stack: ['React 19', 'Vite', 'Bootstrap 5', 'Vercel'],
    repo: 'https://github.com/Dgirto/appEscuela',
    demo: 'https://app-escuela-rho.vercel.app',
    cover: {
      kind: 'phone',
      island: false,
      src: '/work/escuela-mobile.webp',
      alt: 'appEscuela en un teléfono: tarjetas de alumnos con su estado de matrícula',
      width: 390,
      height: 844,
    },
    slides: [
      {
        type: 'image',
        src: '/work/escuela-desktop.webp',
        alt: 'appEscuela en escritorio: directorio de alumnos con estado de matrícula y acciones',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/escuela-cards.webp',
        alt: 'Detalle de las tarjetas con los botones Cambiar estado y Eliminar',
        width: 760,
        height: 430,
      },
      {
        type: 'image',
        src: '/work/escuela-mobile.webp',
        alt: 'appEscuela en un teléfono',
        width: 390,
        height: 844,
      },
    ],
  },
  {
    slug: 'msgraph',
    name: 'msgraph-Robin',
    kind: 'Prácticas',
    year: '2026',
    thesis: 'Librería de Python para automatizar Microsoft 365.',
    problem:
      'Leer y enviar correos de Outlook, gestionar archivos de OneDrive y avisar por Teams desde un script, sin repetir la autenticación de Azure en cada proyecto.',
    solution:
      'Clientes para correo (con filtros y lectura periódica), envío con adjuntos, OneDrive y Excel, mensajes de Teams y webhooks de Microsoft Graph, todo con una sola configuración.',
    contribution: 'Desarrollo de la librería y su integración como conector del catálogo.',
    team: 'Ruvic AI',
    stack: ['Python', 'Microsoft Graph', 'Azure AD', 'pip'],
    repo: 'https://github.com/Dgirto/msgraph-Robin',
    cover: { kind: 'code' },
    slides: [
      {
        type: 'code',
        filename: 'README.md · uso de EmailClient',
        language: 'python',
        caption: 'Lectura periódica de correo con un callback, tal como la documenta el repositorio.',
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
        type: 'code',
        filename: 'README.md · autenticación',
        language: 'python',
        caption: 'Una sola configuración de Azure para todos los clientes de la librería.',
        code: `from msgraph_client import GraphAuth, GraphClient

auth = GraphAuth(
    client_id="tu-client-id",
    client_secret="tu-client-secret",
    tenant_id="tu-tenant-id",
)
client = GraphClient(auth)`,
      },
    ],
  },
  {
    slug: 'tareas',
    name: 'appTareas (doit)',
    kind: 'Académico',
    year: '2026',
    thesis: 'Gestor de tareas para Android que funciona sin conexión.',
    problem: 'Organizar las tareas de un equipo con estados, fechas límite y responsables, incluso sin internet.',
    solution:
      'Tres estados de tarea con filtros y búsqueda, base de datos SQLite local, registro propio y acceso con Google mediante Firebase o como invitado.',
    contribution: 'Toda la capa de interfaz (pantallas, listas, tema y navegación) y el módulo de autenticación.',
    team: 'SENATI · equipo de 5',
    stack: ['Java', 'Android SDK 35', 'SQLite', 'Firebase Auth', 'Figma'],
    repo: 'https://github.com/Dgirto/appTareas',
    cover: {
      kind: 'phones',
      shots: [
        {
          src: '/work/tareas-lista.webp',
          alt: 'Diseño en Figma de doit: lista de tareas con estados, búsqueda y filtros',
          width: 390,
          height: 844,
        },
        {
          src: '/work/tareas-detalle.webp',
          alt: 'Diseño en Figma de doit: detalle de una tarea en progreso',
          width: 390,
          height: 844,
        },
      ],
    },
    slides: [
      { type: 'image', src: '/work/tareas-lista.webp', alt: 'Diseño en Figma: lista de tareas con estados, búsqueda y filtros', width: 390, height: 844 },
      { type: 'image', src: '/work/tareas-detalle.webp', alt: 'Diseño en Figma: detalle de una tarea con fechas y responsable', width: 390, height: 844 },
      { type: 'image', src: '/work/tareas-editar.webp', alt: 'Diseño en Figma: formulario para crear o editar una tarea', width: 390, height: 844 },
      { type: 'image', src: '/work/tareas-eliminar.webp', alt: 'Diseño en Figma: confirmación antes de eliminar una tarea', width: 390, height: 844 },
      { type: 'image', src: '/work/tareas-login.webp', alt: 'Diseño en Figma: inicio de sesión con usuario, Google o como invitado', width: 390, height: 844 },
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
