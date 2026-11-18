import type { Profile } from '../types'

// Datos verificados en LinkedIn (perfil propio, 2026-10-19) y GitHub (Dgirto).
// Edita aquí cualquier dato personal; ningún componente repite estos textos.
export const profile: Profile = {
  name: 'Dorian Girón Prato',
  shortName: 'Dorian Girón',
  headline: 'Software Developer Intern | Ingeniería de Software con Inteligencia Artificial',
  role: 'Ingeniero de Software',
  studies: 'Estudiante de 5.º ciclo de Ingeniería de Software con IA en SENATI',
  location: 'Lima, Perú',
  intro:
    'Desarrollo soluciones de software e IA. Trabajo con Python, TypeScript y React, y construyo conectores que integran agentes de IA con sistemas reales.',
  about:
    'Me desarrollo profesionalmente en el área de ingeniería de software, con experiencia práctica desde marzo de 2026 en desarrollo frontend y backend. Trabajo con Python en la creación y validación de conectores que integran agentes de IA con bases de datos, correo electrónico y servicios en la nube.',
  aboutMore:
    'Me enfoco en comprender la lógica del software y automatizar procesos. Complemento mi experiencia con proyectos de desarrollo web y móvil, herramientas de monitoreo y prototipos IoT simulados en Tinkercad.',
  philosophy: 'Del código a soluciones que generan valor.',
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
    alt: 'Retrato de Dorian Girón Prato, con lentes y camisa negra, sonriendo',
    width: 720,
    height: 960,
  },
  githubUser: 'Dgirto',
  // Cambia este valor por el dominio final tras desplegar (también en index.html, robots.txt y sitemap.xml).
  siteUrl: 'https://dorian-portafolio.vercel.app',
}
