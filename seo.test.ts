import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { projects } from './src/data/projects'
import { mapaDelSitio, paginas, recortar, renderizar } from './seo'

const plantilla = readFileSync('index.html', 'utf8')
const todas = paginas()

describe('SEO', () => {
  it('genera una página por URL, sin rutas repetidas', () => {
    expect(todas).toHaveLength(projects.length + 2)
    expect(new Set(todas.map((p) => p.ruta)).size).toBe(todas.length)
  })

  it('cada página tiene título y descripción únicos y de largo adecuado', () => {
    expect(new Set(todas.map((p) => p.titulo)).size).toBe(todas.length)
    expect(new Set(todas.map((p) => p.descripcion)).size).toBe(todas.length)
    for (const p of todas) {
      expect(p.titulo.length, p.titulo).toBeLessThanOrEqual(70)
      expect(p.descripcion.length, p.ruta).toBeGreaterThan(70)
      expect(p.descripcion.length, p.ruta).toBeLessThanOrEqual(160)
    }
  })

  it('el HTML de cada página apunta a sí misma y trae contenido sin JavaScript', () => {
    for (const p of todas) {
      const html = renderizar(plantilla, p)
      const direccion = p.ruta === '/' ? 'https://dorian-portafolio.vercel.app/' : `https://dorian-portafolio.vercel.app${p.ruta}`
      expect(html).toContain(`<link rel="canonical" href="${direccion}" />`)
      expect(html).toContain(`<meta property="og:url" content="${direccion}" />`)
      expect(html.match(/<noscript>[\s\S]*<h1>/)).not.toBeNull()
      expect(html.match(/<title>/g)).toHaveLength(1)
    }
  })

  it('los datos estructurados son JSON válido y no filtran etiquetas', () => {
    for (const p of todas) {
      const bloque = renderizar(plantilla, p).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
      const datos = JSON.parse(bloque![1])
      expect(datos['@context']).toBe('https://schema.org')
      expect(datos['@graph'].length).toBeGreaterThan(1)
    }
  })

  it('los proyectos de cliente no publican repositorio', () => {
    const selah = todas.find((p) => p.ruta === '/proyectos/selah')!
    const html = renderizar(plantilla, selah)
    expect(html).not.toContain('codeRepository')
    expect(html).not.toContain('Ver el código')
  })

  it('recorta sin partir palabras', () => {
    const r = recortar('palabra '.repeat(40))
    expect(r.length).toBeLessThanOrEqual(155)
    expect(r.endsWith('palabra…')).toBe(true)
  })

  it('el mapa del sitio lista todas las URL', () => {
    const xml = mapaDelSitio(todas.map((p) => p.ruta), '2026-11-07')
    expect(xml.match(/<loc>/g)).toHaveLength(todas.length)
    expect(xml).toContain('/proyectos/selah</loc>')
  })
})
