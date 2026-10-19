import type { Connector } from '../types'

/** Ruta del logo del sistema (public/logos). */
export const logoOf = (c: Connector) => `/logos/${c.repo.toLowerCase()}.svg`

/**
 * Separa el nombre del sistema de su variante:
 * "Gmail (Google Workspace — cuenta de servicio)" → { title: "Gmail", variant: "Google Workspace — cuenta de servicio" }.
 */
export function splitName(name: string): { title: string; variant: string | null } {
  const m = name.match(/^(.*?)\s*\((.+)\)\s*$/)
  return m ? { title: m[1], variant: m[2] } : { title: name, variant: null }
}
