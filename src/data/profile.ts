import type { Profile } from '../types'

// Datos verificados en LinkedIn (perfil propio, 2026-10-19) y GitHub (Dgirto).
// Edita aquí cualquier dato personal; ningún componente repite estos textos.
export const profile: Profile = {
  name: 'Dorian Girón Prato',
  shortName: 'Dorian Girón',
  headline: 'Software Developer Intern en Ruvic AI | Ingeniería de Software con Inteligencia Artificial',
  role: 'Ingeniero de software júnior en prácticas, Ruvic AI',
  studies: 'Ingeniería de Software con IA en SENATI',
  location: 'Lima, Perú',
  workMode: 'Trabajo en remoto',
  intro:
    'Construyo software que conecta sistemas: conectores de API, integraciones con modelos de lenguaje y automatizaciones.',
  about:
    'Estudio Ingeniería de Software con Inteligencia Artificial en SENATI y, desde marzo de 2026, trabajo como ingeniero de software júnior en prácticas en Ruvic AI. Programo interfaces web, modifico servicios core y construyo en Python los conectores con los que un agente de IA lee y opera sistemas externos, con pruebas QA y control de versiones antes de cada entrega.',
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
    alt: 'Retrato de Dorian Girón Prato con traje azul marino y corbata roja',
    width: 200,
    height: 250,
  },
  githubUser: 'Dgirto',
  // Cambia este valor por el dominio final tras desplegar (también en index.html, robots.txt y sitemap.xml).
  siteUrl: 'https://dorian-portfolio.vercel.app',
}
