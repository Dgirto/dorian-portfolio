import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { connectors } from './connectors'
import { projects } from './projects'
import { certifications } from './certifications'
import { families } from './families'
import { logoOf } from '../utils/connectors'

const publicDir = join(process.cwd(), 'public')

describe('datos del portafolio', () => {
  it('cada conector tiene id único, familia válida y logo existente', () => {
    const ids = new Set(connectors.map((c) => c.id))
    expect(ids.size).toBe(connectors.length)
    const famIds = new Set(families.map((f) => f.id))
    for (const c of connectors) {
      expect(famIds.has(c.family)).toBe(true)
      expect(existsSync(join(publicDir, logoOf(c)))).toBe(true)
    }
  })

  it('cada proyecto enlaza a GitHub y sus imágenes existen', () => {
    for (const p of projects) {
      expect(p.repo).toMatch(/^https:\/\/github\.com\/Dgirto/)
      expect(p.slides.length).toBeGreaterThan(0)
      for (const s of p.slides) if (s.type === 'image') expect(existsSync(join(publicDir, s.src))).toBe(true)
      if (p.cover.kind === 'laptop' || p.cover.kind === 'phone' || p.cover.kind === 'plain')
        expect(existsSync(join(publicDir, p.cover.src))).toBe(true)
      if (p.cover.kind === 'phones') for (const shot of p.cover.shots) expect(existsSync(join(publicDir, shot.src))).toBe(true)
    }
  })

  it('las certificaciones tienen fecha AAAA-MM y verificación https', () => {
    for (const c of certifications) {
      expect(c.issued).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/)
      if (c.verifyUrl) expect(c.verifyUrl).toMatch(/^https:\/\//)
    }
  })
})
