import type { ConnectorFamily, FamilyInfo } from '../types'

// Cada familia de sistemas lleva un par del código de colores del cableado estructurado (TIA-568).
export const families: FamilyInfo[] = [
  { id: 'datos', label: 'Bases de datos', pair: 'par azul', colorVar: 'var(--pair-blue)' },
  { id: 'nube', label: 'Nube y almacenamiento', pair: 'par naranja', colorVar: 'var(--pair-orange)' },
  { id: 'productividad', label: 'Productividad y mensajería', pair: 'par verde', colorVar: 'var(--pair-green)' },
  { id: 'seguridad', label: 'Seguridad', pair: 'par marrón', colorVar: 'var(--pair-brown)' },
  { id: 'devops', label: 'DevOps', pair: 'par gris', colorVar: 'var(--pair-slate)' },
]

export const familyById = Object.fromEntries(families.map((f) => [f.id, f])) as Record<ConnectorFamily, FamilyInfo>
