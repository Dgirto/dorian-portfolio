import type { StackGroup } from '../types'

const gh = (repo: string) => `https://github.com/Dgirto/${repo}`
const ARDUINO = gh('dorian-portfolio/tree/main/iot/alerta-sismica')

// Sin niveles ni porcentajes: cada tecnología dice dónde se ve.
// "Sin repositorio público aún" marca conocimientos confirmados que todavía no tienen código público.
export const stack: StackGroup[] = [
  {
    name: 'Lenguajes',
    items: [
      { name: 'Python', evidence: '46 conectores, watchdog', href: gh('watchdog-bot-monitor') },
      { name: 'TypeScript', evidence: 'Prácticas profesionales, SmartPark, este sitio', href: gh('parqueo') },
      { name: 'JavaScript', evidence: 'appEscuela, Tuerka, Sistema de inventario', href: gh('appEscuela') },
      { name: 'Java', evidence: 'appTareas (Android)', href: gh('appTareas') },
      { name: 'C y C++', evidence: 'Alerta sísmica con Arduino', href: ARDUINO },
      { name: 'SQL', evidence: 'Conectores de bases de datos', href: gh('PostgreSQL') },
    ],
  },
  {
    name: 'Desarrollo frontend',
    items: [
      { name: 'React', evidence: 'Tuerka, SmartPark, este sitio', href: 'https://proyecto-tuerka.vercel.app' },
      { name: 'HTML y CSS', evidence: 'Tuerka, este sitio', href: gh('ProyectoTuerka') },
      { name: 'Vite', evidence: 'appEscuela, este sitio', href: gh('appEscuela') },
      { name: 'Bootstrap 5', evidence: 'appEscuela', href: gh('appEscuela') },
      { name: 'Android (XML, Material)', evidence: 'appTareas', href: gh('appTareas') },
    ],
  },
  {
    name: 'IoT y sistemas embebidos',
    items: [
      { name: 'Simulación de circuitos en Tinkercad', evidence: 'Alerta sísmica con Arduino', href: ARDUINO },
      { name: 'Soluciones IoT', evidence: 'Certificación Cisco IoT', href: '#certificaciones' },
      { name: 'Redes y hardware', evidence: 'Certificaciones Cisco', href: '#certificaciones' },
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
      { name: 'AWS (boto3) y Azure SDK', evidence: '13 conectores de nube', href: gh('AWS-S3') },
      { name: 'OAuth2', evidence: 'Google Workspace, Drive OAuth2', href: gh('Drive-OAuth') },
      { name: 'FastAPI y WebSockets', evidence: 'watchdog, SmartPark', href: gh('watchdog-bot-monitor') },
      { name: 'Visión por computadora (OpenCV, EasyOCR)', evidence: 'SmartPark', href: gh('parqueo') },
    ],
  },
  {
    name: 'Infraestructura y contenedores',
    items: [
      { name: 'Docker', evidence: '16 conectores', href: gh('PostgreSQL') },
      { name: 'LocalStack', evidence: 'AWS-S3', href: gh('AWS-S3') },
      { name: 'PostgreSQL y SQLite', evidence: 'watchdog, appTareas', href: gh('watchdog-bot-monitor') },
      { name: 'Permisos mínimos (IAM, roles)', evidence: 'Guías de conectores: AWS-S3, PostgreSQL', href: gh('AWS-S3') },
      { name: 'Vercel', evidence: 'appEscuela, Tuerka, este sitio', href: 'https://app-escuela-rho.vercel.app' },
      { name: 'Cloudflare Pages y D1', evidence: 'Selah Cafetería' },
    ],
  },
  {
    name: 'Backend y datos',
    items: [
      { name: 'Node.js y Express', evidence: 'miApi: API del Sistema de inventario', href: gh('miApi') },
      { name: 'Sequelize y MySQL', evidence: 'miApi', href: gh('miApi') },
      { name: 'JWT y bcrypt', evidence: 'miApi: autenticación', href: gh('miApi') },
      { name: 'Supabase', evidence: 'Tuerka: cuentas y reservas', href: gh('ProyectoTuerka') },
      { name: 'Mercado Pago', evidence: 'Tuerka: pago de reservas', href: gh('ProyectoTuerka') },
    ],
  },
  {
    name: 'Automatización',
    items: [
      { name: 'Automatización de procesos', evidence: 'watchdog: vigilancia y alertas automáticas', href: gh('watchdog-bot-monitor') },
      { name: 'Alertas por correo y Slack', evidence: 'watchdog: SendGrid, webhooks', href: gh('watchdog-bot-monitor') },
      { name: 'Lectura periódica de correo', evidence: 'msgraph-Robin: polling', href: gh('msgraph-Robin') },
      { name: 'Integración de servicios por API', evidence: '46 conectores', href: 'https://github.com/Dgirto?tab=repositories' },
    ],
  },
  {
    name: 'Herramientas de desarrollo',
    items: [
      { name: 'Git y GitHub', evidence: 'github.com/Dgirto', href: 'https://github.com/Dgirto' },
      { name: 'pytest', evidence: 'watchdog: 91 pruebas', href: gh('watchdog-bot-monitor') },
      { name: 'Vitest', evidence: 'Tuerka, este sitio', href: gh('ProyectoTuerka') },
      { name: 'Gradle y Android Studio', evidence: 'appTareas', href: gh('appTareas') },
      { name: 'Figma', evidence: 'appTareas; Tuerka, de Figma a React', href: gh('ProyectoTuerka') },
      { name: 'Pruebas QA', evidence: 'watchdog: rondas de QA y seguridad', href: gh('watchdog-bot-monitor') },
    ],
  },
]
