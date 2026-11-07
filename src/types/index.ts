export type ConnectorFamily = 'datos' | 'nube' | 'productividad' | 'seguridad' | 'devops'

export interface Connector {
  id: string
  repo: string
  name: string
  /** Código del catálogo, p. ej. "CON-016". */
  code: string | null
  description: string
  category: string
  family: ConnectorFamily
  keywords: string[]
  authModes: string[]
  operations: string[]
}

export interface FamilyInfo {
  id: ConnectorFamily
  label: string
  colorVar: string
}

export type ProjectKind = 'Prácticas' | 'Académico' | 'Personal' | 'Cliente'

export type CodeLanguage = 'python' | 'java' | 'javascript' | 'bash' | 'json' | 'cpp'

export interface Shot {
  src: string
  alt: string
  width: number
  height: number
  /** Solo en teléfonos: false si la captura no tiene barra de estado. */
  island?: boolean
}

export type Slide =
  | ({ type: 'image' } & Shot)
  | { type: 'code'; filename: string; language: CodeLanguage; code: string; caption: string }
  /** Mosaico con los logos de los sistemas conectados. */
  | { type: 'logos'; caption: string }

/** Cómo se presenta la portada de la tarjeta. */
export type ProjectCover =
  | ({ kind: 'laptop' | 'phone' | 'plain' } & Shot)
  | { kind: 'phones'; shots: [Shot, Shot] }
  | { kind: 'logos' }
  /** Usa el primer fragmento de código de `slides`. */
  | { kind: 'code' }

export interface Project {
  slug: string
  name: string
  cover: ProjectCover
  /** Ocupa el ancho completo de la cuadrícula. */
  featured?: boolean
  /** Solo aparece en «Todos los proyectos», no en la cuadrícula principal. */
  listOnly?: boolean
  kind: ProjectKind
  year: string
  /** Una frase-tesis: qué es, en una línea. */
  thesis: string
  problem: string
  solution: string
  contribution: string
  team: string
  stack: string[]
  slides: Slide[]
  /** Opcional: los trabajos para clientes no enlazan su código. */
  repo?: string
  demo?: string
  status?: string
}

export interface Certification {
  name: string
  issuer: string
  /** AAAA-MM */
  issued: string
  /** AAAA-MM o null si no vence / no consta. */
  expires: string | null
  /** null si LinkedIn no muestra un ID de credencial. */
  credentialId: string | null
  verifyUrl: string | null
  /** Ruta sin extensión: `<src>.webp` a tamaño completo y `<src>-min.webp` en miniatura. */
  image: { src: string; width: number; height: number }
}

export interface TimelineEntry {
  kind: 'experiencia' | 'formacion'
  title: string
  organization: string
  /** Tipo de vínculo: "Contrato de prácticas", "Profesional Técnico"… */
  type: string
  /** AAAA-MM */
  start: string
  /** AAAA-MM o null si continúa. */
  end: string | null
  /** true si `end` es una fecha prevista, no cumplida. */
  endIsExpected?: boolean
  location?: string
  description?: string
}

export interface StackItem {
  name: string
  /** Dónde se puede ver: repositorio, proyecto o fuente. */
  evidence: string
  href?: string
}

export interface StackGroup {
  name: string
  items: StackItem[]
}

export interface ProfileLink {
  label: string
  href: string
  handle: string
}

export interface Profile {
  name: string
  shortName: string
  headline: string
  role: string
  studies: string
  location: string
  workMode: string
  intro: string
  about: string
  aboutMore: string
  /** Filosofía en una línea; la última palabra se resalta. */
  philosophy: string
  email: string
  links: { github: ProfileLink; linkedin: ProfileLink }
  portrait: { src: string; alt: string; width: number; height: number }
  githubUser: string
  siteUrl: string
}
