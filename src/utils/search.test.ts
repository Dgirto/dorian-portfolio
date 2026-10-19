import { describe, expect, it } from 'vitest'
import { connectors } from '../data/connectors'
import { filterConnectors, normalize } from './search'

import { splitName } from './connectors'

describe('splitName', () => {
  it('separa el nombre de su variante', () => {
    expect(splitName('Gmail (Google Workspace — cuenta de servicio)')).toEqual({
      title: 'Gmail',
      variant: 'Google Workspace — cuenta de servicio',
    })
    expect(splitName('PostgreSQL')).toEqual({ title: 'PostgreSQL', variant: null })
  })
})

describe('normalize', () => {
  it('quita tildes y mayúsculas', () => {
    expect(normalize('  Conexión SEGURA ')).toBe('conexion segura')
  })
})

describe('filterConnectors', () => {
  it('sin consulta devuelve todos', () => {
    expect(filterConnectors(connectors, '')).toHaveLength(connectors.length)
  })

  it('encuentra por nombre, alias y palabra clave', () => {
    expect(filterConnectors(connectors, 'postgres').map((c) => c.repo)).toContain('PostgreSQL')
    expect(filterConnectors(connectors, 'correo').some((c) => c.repo === 'Gmail')).toBe(true)
  })

  it('encuentra por código de catálogo', () => {
    expect(filterConnectors(connectors, 'CON-016').map((c) => c.repo)).toEqual(['PostgreSQL'])
  })

  it('combina palabras con AND y respeta la familia', () => {
    const aws = filterConnectors(connectors, 'aws', 'nube')
    expect(aws.length).toBeGreaterThan(0)
    expect(aws.every((c) => c.family === 'nube')).toBe(true)
    expect(filterConnectors(connectors, 'aws', 'seguridad')).toHaveLength(0)
  })

  it('no encuentra lo que no existe', () => {
    expect(filterConnectors(connectors, 'zzz-no-existe')).toHaveLength(0)
  })
})
