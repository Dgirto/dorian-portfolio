export type ConnectorFamily = 'datos' | 'nube' | 'productividad' | 'seguridad' | 'devops'

export interface Connector {
  id: string
  repo: string
  name: string
  /** Código del catálogo de Ruvic AI, p. ej. "CON-016". */
  code: string | null
  description: string
  category: string
  family: ConnectorFamily
  keywords: string[]
  authModes: string[]
  operations: string[]
  /** Captura real de la guía del conector (public/frames). */
  frame: string
}

export interface FamilyInfo {
  id: ConnectorFamily
  label: string
  colorVar: string
}

export type ProjectKind = 'Prácticas' | 'Académico' | 'Personal'

export type Slide =
  | { type: 'image'; src: string; alt: string; width: number; height: number; position?: string }
  | { type: 'code'; filename: string; language: string; code: string; caption: string }

export interface ProjectCover {
  src: string
  alt: string
  width: number
  height: number
  /** Cómo se presenta la portada en la tarjeta. */
  frame: 'laptop' | 'phone' | 'plain'
}

export interface Project {
  slug: string
  name: string
  /** Portada de la tarjeta; sin portada se muestra el primer fragmento de código. */
  cover?: ProjectCover
  /** Ocupa el ancho completo de la cuadrícula. */
  featured?: boolean
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
  repo: string
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
  credentialId: string
  verifyUrl: string | null
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
  statement: string
  email: string
  links: { github: ProfileLink; linkedin: ProfileLink }
  portrait: { src: string; alt: string; width: number; height: number }
  githubUser: string
  siteUrl: string
}
