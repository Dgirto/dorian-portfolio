// SEO del sitio: genera en el build un HTML real por URL a partir de los datos del portafolio.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { certifications } from './src/data/certifications'
import { profile } from './src/data/profile'
import { projects } from './src/data/projects'
import type { Project } from './src/types'

const SITIO = profile.siteUrl.replace(/\/$/, '')
const AUTOR = `${SITIO}/#persona`
const SITIO_WEB = `${SITIO}/#sitio`
const IMAGEN = `${SITIO}/og-image.png`
const IMAGEN_ALT = 'Portada del portafolio de Dorian Girón Prato, Ingeniero de Software.'
const CONOCIMIENTOS = ['Python', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'SQL', 'Integración de APIs', 'Visión por computadora']

export interface Pagina {
  ruta: string
  titulo: string
  descripcion: string
  jsonLd: unknown[]
  noscript: string
}

const esc = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const url = (ruta: string) => (ruta === '/' ? `${SITIO}/` : `${SITIO}${ruta}`)

export function recortar(texto: string, maximo = 155) {
  if (texto.length <= maximo) return texto
  const corte = texto.slice(0, maximo - 1)
  return `${corte.slice(0, corte.lastIndexOf(' ')).replace(/[\s,.;:]+$/, '')}…`
}

const persona = {
  '@type': 'Person',
  '@id': AUTOR,
  name: profile.name,
  givenName: 'Dorian',
  jobTitle: profile.role,
  description: profile.intro,
  url: `${SITIO}/`,
  image: `${SITIO}/work/dorian-portrait.webp`,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
  alumniOf: { '@type': 'EducationalOrganization', name: 'SENATI' },
  knowsAbout: CONOCIMIENTOS,
  sameAs: [profile.links.github.href, profile.links.linkedin.href],
}

const sitioWeb = {
  '@type': 'WebSite',
  '@id': SITIO_WEB,
  name: profile.name,
  url: `${SITIO}/`,
  inLanguage: 'es-PE',
  author: { '@id': AUTOR },
}

const migas = (...tramos: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: tramos.map(([name, ruta], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url(ruta),
  })),
})

function obra(p: Project) {
  return {
    '@type': p.repo ? 'SoftwareSourceCode' : 'CreativeWork',
    name: p.name,
    description: p.thesis,
    url: url(`/proyectos/${p.slug}`),
    dateCreated: p.year,
    keywords: p.stack.join(', '),
    creator: { '@id': AUTOR },
    ...(p.repo ? { codeRepository: p.repo } : {}),
  }
}

const enlaceProyecto = (p: Project) =>
  `<li><a href="/proyectos/${esc(p.slug)}">${esc(p.name)}</a>: ${esc(p.thesis)}</li>`

const pie = `<p><a href="${esc(profile.links.github.href)}">GitHub</a> · <a href="${esc(profile.links.linkedin.href)}">LinkedIn</a> · <a href="mailto:${esc(profile.email)}">Correo</a></p>`

function paginaInicio(): Pagina {
  const seleccion = projects.filter((p) => !p.listOnly)
  return {
    ruta: '/',
    titulo: `${profile.name} · ${profile.role} en Lima`,
    descripcion: recortar(
      `${profile.role} en Lima. Proyectos con Python, TypeScript y React: 46 conectores de API, paneles en tiempo real y aplicaciones web con código público.`,
    ),
    jsonLd: [
      persona,
      sitioWeb,
      {
        '@type': 'ProfilePage',
        '@id': `${SITIO}/#perfil`,
        url: `${SITIO}/`,
        name: profile.name,
        inLanguage: 'es-PE',
        isPartOf: { '@id': SITIO_WEB },
        mainEntity: { '@id': AUTOR },
      },
    ],
    noscript: `<main>
<h1>Soy ${esc(profile.shortName)}. ${esc(profile.role)}.</h1>
<p>${esc(profile.intro)}</p>
<p>${esc(profile.about)}</p>
<h2>Proyectos</h2>
<ul>${seleccion.map(enlaceProyecto).join('')}</ul>
<p><a href="/proyectos">Ver todos los proyectos</a></p>
<h2>Certificaciones</h2>
<ul>${certifications.map((c) => `<li>${esc(c.name)}, ${esc(c.issuer)}</li>`).join('')}</ul>
${pie}
</main>`,
  }
}

function paginaProyectos(): Pagina {
  return {
    ruta: '/proyectos',
    titulo: `Proyectos · ${profile.name}`,
    descripcion: recortar(
      `Los ${projects.length} proyectos de ${profile.name}: integraciones de API, aplicaciones web y móviles, monitoreo en tiempo real y visión por computadora.`,
    ),
    jsonLd: [
      persona,
      sitioWeb,
      {
        '@type': 'CollectionPage',
        '@id': `${SITIO}/proyectos#coleccion`,
        name: `Proyectos de ${profile.name}`,
        url: url('/proyectos'),
        inLanguage: 'es-PE',
        isPartOf: { '@id': SITIO_WEB },
        author: { '@id': AUTOR },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projects.length,
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: url(`/proyectos/${p.slug}`),
            name: p.name,
          })),
        },
      },
      migas(['Inicio', '/'], ['Proyectos', '/proyectos']),
    ],
    noscript: `<main>
<h1>Todos los proyectos</h1>
<ul>${projects.map(enlaceProyecto).join('')}</ul>
<p><a href="/">Volver al inicio</a></p>
${pie}
</main>`,
  }
}

function paginaProyecto(p: Project): Pagina {
  const ruta = `/proyectos/${p.slug}`
  return {
    ruta,
    titulo: `${p.name} · Proyecto de ${profile.shortName}`,
    descripcion: recortar(`${p.thesis} ${p.solution}`),
    jsonLd: [persona, sitioWeb, obra(p), migas(['Inicio', '/'], ['Proyectos', '/proyectos'], [p.name, ruta])],
    noscript: `<main>
<h1>${esc(p.name)}</h1>
<p>${esc(p.thesis)}</p>
<p>${esc(p.kind)} · ${esc(p.year)} · ${esc(p.team)}</p>
<h2>El problema</h2><p>${esc(p.problem)}</p>
<h2>La solución</h2><p>${esc(p.solution)}</p>
<h2>Mi aporte</h2><p>${esc(p.contribution)}</p>
<h2>Tecnologías</h2><ul>${p.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
${p.repo ? `<p><a href="${esc(p.repo)}">Ver el código</a></p>` : ''}
${p.demo ? `<p><a href="${esc(p.demo)}">Abrir la demo</a></p>` : ''}
<p><a href="/proyectos">Todos los proyectos</a></p>
</main>`,
  }
}

export const paginas = (): Pagina[] => [paginaInicio(), paginaProyectos(), ...projects.map(paginaProyecto)]

function reemplazar(html: string, patron: RegExp, valor: string) {
  if (!patron.test(html)) throw new Error(`SEO: no se encontró ${patron}`)
  return html.replace(patron, () => valor)
}

export function renderizar(plantilla: string, p: Pagina) {
  const direccion = url(p.ruta)
  const meta = (atributo: string, nombre: string) => new RegExp(`<meta ${atributo}="${nombre}" content="[^"]*" />`)
  const conMeta = (atributo: string, nombre: string, valor: string) =>
    `<meta ${atributo}="${nombre}" content="${esc(valor)}" />`

  let html = reemplazar(plantilla, /<title>[^<]*<\/title>/, `<title>${esc(p.titulo)}</title>`)
  html = reemplazar(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${direccion}" />`)
  for (const [atributo, nombre, valor] of [
    ['name', 'description', p.descripcion],
    ['property', 'og:title', p.titulo],
    ['property', 'og:description', p.descripcion],
    ['property', 'og:url', direccion],
    ['property', 'og:type', p.ruta.startsWith('/proyectos/') ? 'article' : 'website'],
    ['property', 'og:image', IMAGEN],
    ['property', 'og:image:alt', IMAGEN_ALT],
    ['name', 'twitter:title', p.titulo],
    ['name', 'twitter:description', p.descripcion],
    ['name', 'twitter:image', IMAGEN],
    ['name', 'twitter:image:alt', IMAGEN_ALT],
  ] as const) {
    html = reemplazar(html, meta(atributo, nombre), conMeta(atributo, nombre, valor))
  }
  const datos = JSON.stringify({ '@context': 'https://schema.org', '@graph': p.jsonLd }).replace(/</g, '\\u003c')
  html = reemplazar(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${datos}</script>`)
  return reemplazar(html, /<noscript>[\s\S]*?<\/noscript>/, `<noscript>${p.noscript}</noscript>`)
}

export function mapaDelSitio(rutas: string[], fecha: string) {
  const urls = rutas.map((r) => `  <url>\n    <loc>${url(r)}</loc>\n    <lastmod>${fecha}</lastmod>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

/** Tras el build escribe cada página con su HTML y regenera el mapa del sitio. */
export function seo(): Plugin {
  let salida = 'dist'
  return {
    name: 'seo-paginas',
    apply: 'build',
    configResolved(config) {
      salida = config.build.outDir
    },
    closeBundle() {
      const plantilla = readFileSync(join(salida, 'index.html'), 'utf8')
      const todas = paginas()
      for (const p of todas) {
        const carpeta = join(salida, p.ruta)
        mkdirSync(carpeta, { recursive: true })
        writeFileSync(join(carpeta, 'index.html'), renderizar(plantilla, p))
      }
      const hoy = new Date().toISOString().slice(0, 10)
      writeFileSync(join(salida, 'sitemap.xml'), mapaDelSitio(todas.map((p) => p.ruta), hoy))
    },
  }
}
