import type { ConnectorFamily, FamilyInfo } from '../types'

// Familias de sistemas del catálogo de conectores, cada una con su color.
export const families: FamilyInfo[] = [
  { id: 'datos', label: 'Bases de datos', colorVar: 'var(--fam-datos)' },
  { id: 'nube', label: 'Nube y almacenamiento', colorVar: 'var(--fam-nube)' },
  { id: 'productividad', label: 'Productividad y mensajería', colorVar: 'var(--fam-productividad)' },
  { id: 'seguridad', label: 'Seguridad', colorVar: 'var(--fam-seguridad)' },
  { id: 'devops', label: 'DevOps', colorVar: 'var(--fam-devops)' },
]

export const familyById = Object.fromEntries(families.map((f) => [f.id, f])) as Record<ConnectorFamily, FamilyInfo>
