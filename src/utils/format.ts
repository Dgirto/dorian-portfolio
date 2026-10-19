const MONTHS = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.']

/** "2025-06" → "jun. 2025" */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split('-').map(Number)
  if (!year || !month || month < 1 || month > 12) return value
  return `${MONTHS[month - 1]} ${year}`
}

/** Rango legible: "mar. 2026 – actualidad" o "sept. 2024 – jul. 2027 (prevista)". */
export function formatRange(start: string, end: string | null, endIsExpected = false): string {
  const to = end ? `${formatYearMonth(end)}${endIsExpected ? ' (prevista)' : ''}` : 'actualidad'
  return `${formatYearMonth(start)} – ${to}`
}

/** Fecha ISO → "18 oct. 2026" en español. */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
