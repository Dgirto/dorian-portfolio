import { useEffect, useRef, useState } from 'react'
import type { MotionValue } from 'motion/react'
import type { LaptopScene } from '../three/laptopScene'
import { Laptop } from './Devices'
import styles from './LaptopCanvas.module.css'

interface Props {
  screen: string
  /** Fotograma inicial (portátil cerrado) renderizado desde la propia escena. */
  poster: string
  alt: string
  progress: MotionValue<number>
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Portátil 3D en tiempo real. Como en las páginas de Apple, primero se muestra un fotograma fijo
 * (la tapa cerrada) y la escena 3D se carga cuando el visitante empieza a interactuar o tras unos
 * segundos de inactividad, para no bloquear la carga inicial.
 */
export function LaptopCanvas({ screen, poster, alt, progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    if (!supported) return
    const canvas = canvasRef.current
    if (!canvas) return
    let scene: LaptopScene | null = null
    let cancelled = false
    let started = false
    let unsubscribe = () => {}
    const observer = new ResizeObserver(() => scene?.resize())
    const events = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'wheel'] as const

    const start = () => {
      if (started) return
      started = true
      events.forEach((e) => window.removeEventListener(e, start))
      window.clearTimeout(timer)
      import('../three/laptopScene').then(({ createLaptopScene }) => {
        if (cancelled) return
        scene = createLaptopScene(canvas, screen, () => setReady(true))
        scene.setProgress(progress.get())
        unsubscribe = progress.on('change', (v) => scene?.setProgress(v))
        observer.observe(canvas)
      })
    }

    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }))
    const timer = window.setTimeout(start, 6000)

    return () => {
      cancelled = true
      events.forEach((e) => window.removeEventListener(e, start))
      window.clearTimeout(timer)
      unsubscribe()
      observer.disconnect()
      scene?.dispose()
    }
  }, [screen, progress, supported])

  if (!supported) return <Laptop src={screen} alt={alt} width={2400} height={1500} />

  return (
    <div className={styles.wrap} role="img" aria-label={alt}>
      <img className={`${styles.poster} ${ready ? styles.hidden : ''}`} src={poster} alt="" width={2200} height={1512} decoding="async" />
      <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.ready : ''}`} aria-hidden="true" />
    </div>
  )
}
