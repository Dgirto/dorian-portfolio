import type { Profile } from '../types'

// Datos verificados en LinkedIn (perfil propio, 2026-10-19) y GitHub (Dgirto).
// Edita aquí cualquier dato personal; ningún componente repite estos textos.
export const profile: Profile = {
  name: 'Dorian Girón Prato',
  shortName: 'Dorian Girón',
  headline: 'Software Developer Intern en Ruvic AI | Ingeniería de Software con Inteligencia Artificial',
  role: 'Ingeniero de software júnior en Ruvic AI',
  studies: 'Estudiante de 5.º ciclo de Ingeniería de Software con IA en SENATI',
  location: 'Lima, Perú',
  workMode: 'Trabajo en remoto',
  intro:
    'Estudiante de 5.º ciclo de Ingeniería de Software con IA en SENATI e ingeniero de software júnior en Ruvic AI. Construyo conectores de API, integraciones con modelos de lenguaje y automatizaciones que hacen que los sistemas trabajen juntos.',
  about:
    'Curso el 5.º ciclo de Ingeniería de Software con Inteligencia Artificial en SENATI y, desde marzo de 2026, hago mis prácticas como ingeniero de software júnior en Ruvic AI. Mi trabajo va del frontend web a los servicios del backend: construyo en Python los conectores que permiten a un agente de IA consultar bases de datos, leer correo u operar servicios en la nube, y los pruebo antes de cada entrega.',
  aboutMore:
    'Me interesa entender cómo funciona el código por dentro y convertir procesos manuales en flujos automáticos. Fuera del trabajo sigo construyendo: aplicaciones web y móviles, herramientas de monitoreo y prototipos IoT simulados en Tinkercad.',
  statement:
    'Hoy un agente de IA puede leer tu correo, consultar tu base de datos o revisar tu firewall. Antes necesita una forma segura de conectarse. Ese es mi trabajo.',
  email: 'gironpratodorian@gmail.com',
  links: {
    github: { label: 'GitHub', href: 'https://github.com/Dgirto', handle: 'Dgirto' },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dorian-giron-prato-30b25a32b/',
      handle: 'dorian-giron-prato',
    },
  },
  portrait: {
    src: '/work/dorian-portrait.webp',
    alt: 'Dorian Girón Prato, de pie, con traje azul marino, camisa blanca y corbata roja',
    width: 546,
    height: 728,
  },
  githubUser: 'Dgirto',
  // Cambia este valor por el dominio final tras desplegar (también en index.html, robots.txt y sitemap.xml).
  siteUrl: 'https://dorian-portafolio.vercel.app',
}
