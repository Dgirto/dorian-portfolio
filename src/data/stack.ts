import type { StackGroup } from '../types'

const gh = (repo: string) => `https://github.com/Dgirto/${repo}`

// Sin niveles ni porcentajes: cada tecnología dice dónde se ve.
// "Sin repositorio público aún" marca conocimientos confirmados que todavía no tienen código público.
export const stack: StackGroup[] = [
  {
    name: 'Lenguajes',
    items: [
      { name: 'Python', evidence: '46 conectores, watchdog', href: gh('watchdog-bot-monitor') },
      { name: 'TypeScript', evidence: 'Ruvic AI, este sitio' },
      { name: 'JavaScript', evidence: 'appEscuela', href: gh('appEscuela') },
      { name: 'Java', evidence: 'appTareas (Android)', href: gh('appTareas') },
      { name: 'C y C++', evidence: 'Sin repositorio público aún' },
      { name: 'SQL', evidence: 'Conectores de bases de datos', href: gh('PostgreSQL') },
    ],
  },
  {
    name: 'Desarrollo frontend',
    items: [
      { name: 'React', evidence: 'appEscuela, este sitio', href: 'https://app-escuela-rho.vercel.app' },
      { name: 'HTML y CSS', evidence: 'Guías de los conectores', href: gh('Gmail') },
      { name: 'Vite', evidence: 'appEscuela, este sitio', href: gh('appEscuela') },
      { name: 'Bootstrap 5', evidence: 'appEscuela', href: gh('appEscuela') },
      { name: 'Android (XML, Material)', evidence: 'appTareas', href: gh('appTareas') },
    ],
  },
  {
    name: 'Inteligencia artificial y APIs',
    items: [
      { name: 'Integración de LLM con API keys', evidence: 'Sin repositorio público aún' },
      { name: 'Herramientas para agentes de IA', evidence: 'SKILL.md de cada conector', href: gh('Gmail') },
      { name: 'Métricas de agentes de IA', evidence: 'watchdog: latencia p95, error LLM', href: gh('watchdog-bot-monitor') },
      { name: 'Microsoft Graph', evidence: 'msgraph-Robin', href: gh('msgraph-Robin') },
      { name: 'Google Workspace APIs', evidence: 'Gmail, Drive, Sheets, Docs, Calendar', href: gh('Drive') },
      { name: 'AWS (boto3) y Azure SDK', evidence: 'Conectores de nube', href: gh('AWS-S3') },
      { name: 'OAuth2', evidence: 'Gmail, Drive OAuth2', href: gh('Drive-OAuth') },
      { name: 'FastAPI y WebSockets', evidence: 'watchdog-bot-monitor', href: gh('watchdog-bot-monitor') },
      { name: 'Visión por computadora (OpenCV, EasyOCR)', evidence: 'parqueo', href: gh('parqueo') },
    ],
  },
  {
    name: 'Automatización',
    items: [
      { name: 'Automatización de procesos', evidence: 'Sin repositorio público aún' },
      { name: 'Alertas por correo y Slack', evidence: 'watchdog: SendGrid, webhooks', href: gh('watchdog-bot-monitor') },
      { name: 'Lectura periódica de correo', evidence: 'msgraph-Robin: polling', href: gh('msgraph-Robin') },
      { name: 'Integración de servicios por API', evidence: '46 conectores', href: 'https://github.com/Dgirto?tab=repositories' },
    ],
  },
  {
    name: 'Infraestructura y contenedores',
    items: [
      { name: 'Docker', evidence: 'Pruebas locales de conectores', href: gh('SQL-Server') },
      { name: 'LocalStack', evidence: 'Conectores AWS', href: gh('AWS-S3') },
      { name: 'PostgreSQL y SQLite', evidence: 'watchdog, appTareas', href: gh('watchdog-bot-monitor') },
      { name: 'Permisos mínimos (IAM, roles)', evidence: 'README de cada conector', href: gh('AWS-S3') },
      { name: 'Vercel', evidence: 'appEscuela', href: 'https://app-escuela-rho.vercel.app' },
    ],
  },
  {
    name: 'IoT y sistemas embebidos',
    items: [
      { name: 'Simulación de circuitos en Tinkercad', evidence: 'Sin repositorio público aún' },
      { name: 'Soluciones IoT', evidence: 'Certificación Cisco IoT', href: '#certificaciones' },
      { name: 'Redes y hardware', evidence: 'Certificaciones Cisco', href: '#certificaciones' },
    ],
  },
  {
    name: 'Herramientas de desarrollo',
    items: [
      { name: 'Git y GitHub', evidence: 'github.com/Dgirto', href: 'https://github.com/Dgirto' },
      { name: 'pytest', evidence: 'watchdog: 29 pruebas', href: gh('watchdog-bot-monitor') },
      { name: 'Gradle y Android Studio', evidence: 'appTareas', href: gh('appTareas') },
      { name: 'Figma', evidence: 'Diseño de appTareas', href: gh('appTareas') },
      { name: 'Pruebas QA', evidence: 'Ruvic AI' },
    ],
  },
]
