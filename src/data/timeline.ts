import type { TimelineEntry } from '../types'

// Fuente: LinkedIn (verificado el 2026-10-19). Solo datos confirmados.
export const timeline: TimelineEntry[] = [
  {
    kind: 'experiencia',
    title: 'Ingeniero de software júnior',
    organization: 'Ruvic AI',
    type: 'Contrato de prácticas',
    start: '2026-03',
    end: null,
    location: 'En remoto',
    description:
      'Desarrollo de software y aseguramiento de calidad: interfaces web con HTML, CSS, JavaScript y TypeScript; servicios core y conectores internos en Python; pruebas QA antes de cada despliegue y control de versiones en GitHub.',
  },
  {
    kind: 'formacion',
    title: 'Profesional Técnico, Ingeniería de Software con Inteligencia Artificial',
    organization: 'SENATI',
    type: 'Formación académica',
    start: '2024-09',
    end: '2027-07',
    endIsExpected: true,
  },
]
