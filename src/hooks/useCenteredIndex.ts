import { useEffect, useState, type RefObject } from 'react'

/**
 * Índice del hijo más cercano al centro de una fila desplazable horizontal.
 * Sirve para "encender" el fotograma centrado de la tira.
 */
export function useCenteredIndex(ref: RefObject<HTMLElement | null>, selector: string): number {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const row = ref.current
    if (!row) return
    let frame = 0
    const measure = () => {
      frame = 0
      const box = row.getBoundingClientRect()
      const center = box.left + box.width / 2
      const items = row.querySelectorAll<HTMLElement>(selector)
      let best = 0
      let bestDist = Infinity
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - center)
        if (d < bestDist) [best, bestDist] = [i, d]
      })
      setIndex(best)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    row.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      row.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ref, selector])

  return index
}
