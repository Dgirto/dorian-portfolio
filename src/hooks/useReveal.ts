import { useEffect } from 'react'

/**
 * Activa las entradas escalonadas: los elementos con [data-reveal] suben y aparecen
 * una vez al entrar en pantalla. Sin JS o con movimiento reducido, todo es visible desde el inicio.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    root.classList.add('motion-ok')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const observeAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el))
    observeAll()
    // Secciones que montan contenido después (p. ej. GitHub) se observan al aparecer.
    const mutations = new MutationObserver(observeAll)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
      root.classList.remove('motion-ok')
    }
  }, [])
}
