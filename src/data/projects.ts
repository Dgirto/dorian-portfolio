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
    contribution: 'Diseño y desarrollo completos: arquitectura hexagonal, API REST y WebSocket, panel web en tiempo real y 91 pruebas automatizadas.',
    team: 'Individual',
    stack: ['Python', 'FastAPI', 'WebSockets', 'SQLite / PostgreSQL', 'pytest'],
    repo: 'https://github.com/Dgirto/watchdog-bot-monitor',
    cover: {
      kind: 'laptop',
      src: '/work/watchdog-dashboard.webp',
      alt: 'Panel de watchdog-bot-monitor con cinco agentes en línea, uno degradado, y la salud de dos agentes de IA',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/watchdog-dashboard.webp',
        alt: 'Panel de watchdog-bot-monitor: estado general, flota por gravedad y cockpit de agentes de IA',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/watchdog-fleet.webp',
        alt: 'Panel con un incidente activo: scraper-02 caído aparece primero y la franja de estado pasa a rojo',
        width: 1400,
        height: 875,
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
    featured: true,
    name: 'Catálogo de conectores',
    kind: 'Prácticas',
    year: '2026',
    thesis: '46 conectores que permiten a un agente de IA trabajar con sistemas reales.',
    problem:
      'Un agente de IA solo aporta valor si puede operar con las herramientas de la empresa: bases de datos, correo, nube y seguridad, cada una con su propia forma de autenticarse.',
    solution:
      'Todos siguen el mismo método: librería instalable con pip, manifiesto para el catálogo, instrucciones para el agente, guía de configuración bilingüe, prueba de conexión, permisos mínimos y errores clasificados.',
    contribution: 'Desarrollo en Python, documentación y pruebas de los conectores durante mis prácticas.',
    team: 'Prácticas profesionales',
    stack: ['Python', 'OAuth2', 'boto3', 'Azure SDK', 'Google APIs', 'Docker'],
    repo: 'https://github.com/Dgirto?tab=repositories',
    status: 'Repositorios públicos desde julio de 2026',
    cover: { kind: 'logos' },
    slides: [
      { type: 'logos', caption: 'Los sistemas del catálogo, cada uno con su repositorio público.' },
      {
        type: 'code',
        filename: 'PostgreSQL/client.py',
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
    listOnly: true,
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
    slug: 'tuerka',
    name: 'Tuerka',
    featured: true,
    kind: 'Académico',
    year: '2026',
    thesis: 'Sitio web de venta de vehículos, llevado de Figma a React.',
    problem:
      'Un sitio para buscar, comparar y reservar vehículos tiene que verse igual que su diseño en cualquier pantalla y dejar que el cliente filtre el inventario y agende una visita sin fricción.',
    solution:
      'Inicio con buscador por tipo, marca y presupuesto; catálogo con filtros y orden que se guardan en la URL; ficha de cada vehículo con galería, pestañas y relacionados; favoritos que se conservan en el navegador; formulario «Agenda tu visita» con validación, y menú y buscador a pantalla completa en todas las páginas.',
    contribution:
      'Implementé el diseño de Figma del equipo en React: maquetación de las páginas, componentes y estilos, fiel al diseño y adaptado a escritorio y móvil.',
    team: 'Proyecto grupal',
    stack: ['React 18', 'React Router', 'Vite', 'CSS', 'Supabase', 'Mercado Pago', 'Figma'],
    repo: 'https://github.com/Dgirto/ProyectoTuerka',
    demo: 'https://proyecto-tuerka.vercel.app',
    cover: {
      kind: 'laptop',
      src: '/work/tuerka-inicio.webp',
      alt: 'Portada de Tuerka: «Tu próximo camino empieza aquí» con un auto deportivo frente al mar al atardecer',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/tuerka-inicio.webp',
        alt: 'Inicio de Tuerka con la portada y los botones para explorar vehículos',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/tuerka-catalogo.webp',
        alt: 'Catálogo con filtros por marca, tipo, condición, precio, año y transmisión, y seis vehículos de ejemplo',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/tuerka-detalle.webp',
        alt: 'Ficha del Toyota Corolla 2024 con galería, precio, botones para agendar visita y datos técnicos',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/tuerka-movil-inicio.webp',
        alt: 'Inicio de Tuerka en un teléfono',
        width: 390,
        height: 844,
      },
      {
        type: 'image',
        src: '/work/tuerka-movil-detalle.webp',
        alt: 'Ficha de un vehículo en un teléfono, con carrusel de fotos',
        width: 390,
        height: 844,
      },
    ],
  },
  {
    slug: 'selah',
    name: 'Selah Cafetería',
    kind: 'Cliente',
    year: '2026',
    thesis: 'Web de una cafetería con cuentas, reservas y panel de gestión.',
    problem:
      'Las reservas y las cotizaciones de eventos no llegaban a ningún sitio, y la apertura del local necesitaba una promoción de café gratis para clientes registrados.',
    solution:
      'Sitio público con carta, eventos y reservas; cuentas de cliente con cupón de café gratis; reservas de mesa con depósito opcional por Yape o Plin; cotizaciones de eventos y un panel por roles para caja y administración.',
    contribution:
      'Frontend sin framework, API en Cloudflare Pages Functions, base de datos D1 con migraciones, acceso con contraseña o Google, protección con Turnstile y límites de peticiones.',
    team: 'Cafetería en Lima',
    stack: ['JavaScript', 'HTML', 'CSS', 'Cloudflare Pages', 'Cloudflare D1', 'SQL', 'Google OAuth', 'Turnstile'],
    cover: {
      kind: 'laptop',
      src: '/work/selah-inicio.webp',
      alt: 'Inicio de la web de Selah Cafetería con la barra del local y el titular «Ven por el café, quédate por la esencia»',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/selah-inicio.webp',
        alt: 'Inicio de la web de Selah Cafetería con la barra del local y el titular «Ven por el café, quédate por la esencia»',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/selah-favoritos.webp',
        alt: 'Sección «Nuestros favoritos» con cuatro postres de la carta en tarjetas blancas',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/selah-reservas.webp',
        alt: 'Página de reservas con dos opciones: reservar una mesa o celebrar en Selah',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/selah-eventos.webp',
        alt: 'Página de eventos con los tipos de celebración y los paquetes disponibles',
        width: 1400,
        height: 875,
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
  {
    slug: 'inventario',
    name: 'Sistema de inventario',
    featured: true,
    kind: 'Académico',
    year: '2026',
    thesis: 'Panel administrativo fullstack con API REST, autenticación JWT, roles y kardex de movimientos.',
    problem:
      'Un almacén necesita saber qué tiene, cuánto vale y qué se está agotando, con un registro fiable de cada entrada y salida y permisos distintos según quién opere el sistema.',
    solution:
      'Una API en Node.js y Express con MySQL y un panel en React. Incluye inicio de sesión con JWT, rutas protegidas, roles de Administrador y Almacenero, gestión de productos, categorías y proveedores, y un kardex donde cada movimiento actualiza el stock en una transacción. El panel resume el valor del inventario, los productos con bajo stock y la actividad reciente.',
    contribution: 'Desarrollo completo del backend y el frontend en el seminario Fullstack Developer Software (IA 501) de SENATI.',
    team: 'SENATI · individual',
    stack: ['React 19', 'Node.js', 'Express', 'Sequelize', 'MySQL', 'JWT', 'Bootstrap'],
    repo: 'https://github.com/Dgirto/appInventario',
    status: 'API en el repositorio miApi. Capturas con datos de demostración.',
    cover: {
      kind: 'laptop',
      src: '/work/inventario-dashboard.webp',
      alt: 'Panel del sistema de inventario con valor total, productos, categorías, proveedores, bajo stock y flujo de stock',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/inventario-dashboard.webp',
        alt: 'Panel de inicio con indicadores del inventario y gráficos de stock y categorías',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/inventario-productos.webp',
        alt: 'Gestión de productos con su categoría, precio y stock',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/inventario-kardex.webp',
        alt: 'Kardex con el formulario de movimientos y la lista de entradas, salidas y ajustes',
        width: 1400,
        height: 875,
      },
      {
        type: 'code',
        filename: 'miApi/controllers/movimientoController.js',
        language: 'javascript',
        caption: 'Extracto: el movimiento y el stock se actualizan en una transacción, con bloqueo de la fila del producto.',
        code: `const movimiento = await sequelize.transaction(async (t) => {
    // Bloqueo de la fila del producto: evita que dos movimientos simultáneos
    // lean el mismo stock y se pisen al actualizarlo
    const producto = await Producto.findByPk(producto_id, {
        transaction: t,
        lock: t.LOCK.UPDATE
    });`,
      },
    ],
  },
  {
    slug: 'alumnos',
    listOnly: true,
    name: 'Mantenimiento de alumnos',
    kind: 'Académico',
    year: '2026',
    thesis: 'App Android para registrar y gestionar alumnos con base de datos local.',
    problem: 'Llevar el registro de alumnos de una institución en el teléfono, con sus datos personales, carrera, ciclo y estado, sin depender de internet.',
    solution:
      'Formulario de 10 campos, listado de registros y almacenamiento en SQLite. La interfaz usa Material Design, con menús desplegables para ciclo y estado y formato automático de la fecha de nacimiento.',
    contribution:
      'Implementé el mantenimiento de 10 campos con SQLite, rediseñé la interfaz con Material Design e integré las ramas del equipo mediante pull requests.',
    team: 'Equipo de 5',
    stack: ['Java', 'Android', 'SQLite', 'Material Design', 'Git'],
    repo: 'https://github.com/Dgirto/appMantenimientoAlumnos',
    cover: { kind: 'code' },
    slides: [
      {
        type: 'code',
        filename: 'db/DbAlumnos.java',
        language: 'java',
        caption: 'Extracto: inserción de un alumno en la base de datos SQLite.',
        code: `ContentValues values = new ContentValues();
values.put("nombre", nombre);
values.put("apellido", apellido);
values.put("telefono", telefono);
values.put("correo_electronico", correo_electronico);
values.put("direccion", direccion);
values.put("fechaNacimiento", fechaNacimiento);
values.put("dni", dni);
values.put("carrera", carrera);
values.put("ciclo", ciclo);
values.put("estado", estado);

// nos va a regresar el id insertado
id = db.insert(TABLE_ALUMNOS, null, values);`,
      },
    ],
  },
  {
    slug: 'parqueo',
    featured: true,
    name: 'Parqueo con lectura de placas',
    kind: 'Académico',
    year: '2026',
    thesis: 'Sistema web que lee placas en video y controla entradas, salidas y cobros.',
    problem: 'Controlar un estacionamiento a mano es lento y propenso a errores: hay que anotar cada placa y calcular cada cobro.',
    solution:
      'Procesa el video con OpenCV, reconoce la placa con EasyOCR y registra la entrada o la salida en SQLite. Un panel web muestra la cámara y los tickets en tiempo real, con historial filtrable, reportes de ingresos, tarifas y salida manual.',
    contribution: 'Desarrollo de la aplicación: visión por computadora, API, panel web, lógica de cobro, base de datos y pruebas.',
    team: 'Individual',
    stack: ['Python', 'FastAPI', 'OpenCV', 'EasyOCR', 'SQLite', 'React', 'TypeScript'],
    repo: 'https://github.com/Dgirto/parqueo',
    cover: {
      kind: 'laptop',
      src: '/work/parqueo-vivo.webp',
      alt: 'Panel En vivo de SmartPark con la cámara, la última placa leída y los vehículos dentro',
      width: 1400,
      height: 875,
    },
    slides: [
      {
        type: 'image',
        src: '/work/parqueo-vivo.webp',
        alt: 'Panel En vivo de SmartPark con la cámara, la última placa leída y los vehículos dentro',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/parqueo-registros.webp',
        alt: 'Historial de tickets con filtros por placa, estado y fecha',
        width: 1400,
        height: 875,
      },
      {
        type: 'image',
        src: '/work/parqueo-reportes.webp',
        alt: 'Reportes con ingresos por día y entradas por hora; el historial es de demostración',
        width: 1400,
        height: 875,
      },
      {
        type: 'code',
        filename: 'app/vision/plate_detector.py',
        language: 'python',
        caption: 'Extracto: se mejora el contraste del fotograma antes de pasarlo al reconocimiento de texto.',
        code: `def preprocess(self, frame: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    return clahe.apply(gray)`,
      },
    ],
  },
  {
    slug: 'alerta-sismica',
    listOnly: true,
    name: 'Alerta sísmica con Arduino',
    kind: 'Académico',
    year: '2026',
    thesis: 'Sistema de alerta ante sismo, incendio y fuga de gas con dos Arduino conectados por I2C.',
    problem:
      'Ante un sismo, un incendio o una fuga de gas hay que avisar al instante y abrir la salida, y solo una persona autorizada debe poder desactivar la alarma.',
    solution:
      'Un Arduino lee cada medio segundo un sensor de inclinación, uno de temperatura TMP36 y uno de gas, muestra los valores en una pantalla LCD y envía el tipo de alerta por I2C. El segundo Arduino abre la puerta de emergencia con un servo, enciende un anillo NeoPixel con luces que corren hacia la salida (un color por evento) y hace sonar una sirena distinta en cada caso. La alarma se desactiva con una clave en un teclado 4×4.',
    contribution: 'Diseño del circuito y programación de los dos microcontroladores, simulados en Tinkercad Circuits.',
    team: 'Simulación en Tinkercad',
    stack: ['Arduino (C++)', 'I2C (Wire)', 'Tinkercad Circuits', 'NeoPixel', 'Keypad', 'LCD I2C'],
    repo: 'https://github.com/Dgirto/dorian-portfolio/tree/main/iot/alerta-sismica',
    cover: {
      kind: 'plain',
      src: '/work/iot-circuito.webp',
      alt: 'Circuito en Tinkercad: dos Arduino Uno, pantalla LCD, teclado 4×4, sensores de gas, temperatura e inclinación, servo, anillo NeoPixel y zumbador',
      width: 1460,
      height: 940,
    },
    slides: [
      {
        type: 'image',
        src: '/work/iot-circuito.webp',
        alt: 'Vista de protoboard del circuito en Tinkercad con los dos Arduino Uno y sus componentes',
        width: 1460,
        height: 940,
      },
      {
        type: 'image',
        src: '/work/iot-esquema.webp',
        alt: 'Esquema eléctrico exportado de Tinkercad: el Arduino U1 con sensores, teclado y LCD, y el Arduino U4 con servo, NeoPixel y zumbador, unidos por A4 y A5 (I2C)',
        width: 1600,
        height: 1223,
      },
      {
        type: 'code',
        filename: 'controlador/controlador.ino',
        language: 'cpp',
        caption: 'El controlador decide el evento por prioridad y lo envía al Arduino de actuadores por I2C.',
        code: `byte detectarEvento() {
  if (digitalRead(PIN_TILT) != tiltReposo) return 1;  // Sismo (máxima prioridad)
  if (temperatura > UMBRAL_TEMP)           return 2;  // Incendio
  if (gas > UMBRAL_GAS)                    return 3;  // Fuga de gas
  return 0;
}

void enviarAlerta() {
  Wire.beginTransmission(DIR_ESCLAVO);
  Wire.write(alerta);
  Wire.endTransmission();
}`,
      },
      {
        type: 'code',
        filename: 'actuadores/actuadores.ino',
        language: 'cpp',
        caption: 'El receptor abre la puerta de emergencia y anima las luces con un color por tipo de alerta.',
        code: `void recibir(int n) {
  while (Wire.available()) alerta = Wire.read();
}

uint32_t colorAlerta() {
  if (alertaActual == 1) return luces.Color(255, 140, 0);  // Sismo: naranja
  if (alertaActual == 2) return luces.Color(255, 0, 0);    // Incendio: rojo
  return luces.Color(150, 0, 255);                         // Gas: morado
}`,
      },
    ],
  },
]
