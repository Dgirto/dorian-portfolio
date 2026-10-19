import { describe, expect, it } from 'vitest'
import { formatRange, formatYearMonth } from './format'

describe('format', () => {
  it('formatea año y mes en español', () => {
    expect(formatYearMonth('2025-06')).toBe('jun. 2025')
  })

  it('formatea rangos abiertos y previstos', () => {
    expect(formatRange('2026-03', null)).toBe('mar. 2026 – actualidad')
    expect(formatRange('2024-09', '2027-07', true)).toBe('sept. 2024 – jul. 2027 (prevista)')
  })
})
