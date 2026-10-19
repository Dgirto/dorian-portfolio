import type { Connector, ConnectorFamily } from '../types'
import { familyById } from '../data/families'

/** Minúsculas y sin tildes, para que "conexion" encuentre "conexión". */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

function haystack(c: Connector): string {
  return normalize(
    [c.name, c.repo, c.code ?? '', c.description, familyById[c.family].label, ...c.keywords, ...c.operations].join(' '),
  )
}

/**
 * Devuelve los conectores que coinciden con todas las palabras de la consulta
 * y con la familia elegida ("todas" para no filtrar).
 */
export function filterConnectors(
  list: Connector[],
  query: string,
  family: ConnectorFamily | 'todas' = 'todas',
): Connector[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  return list.filter((c) => {
    if (family !== 'todas' && c.family !== family) return false
    if (terms.length === 0) return true
    const text = haystack(c)
    return terms.every((t) => text.includes(t))
  })
}
