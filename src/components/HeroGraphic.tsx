import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import styles from './HeroGraphic.module.css'

// Tecnologías enlazadas a un mismo punto; cada una indica dónde se usa de verdad.
const NODES = [
  { label: 'Python', x: 16, y: 60, joint: [62, 164], trace: 'M62 94 V164 H224 V256', uso: '46 conectores, watchdog y SmartPark' },
  { label: 'TypeScript', x: 372, y: 28, joint: [428, 130], trace: 'M428 62 V130 H296 V256', uso: 'Este sitio y SmartPark' },
  { label: 'SQL', x: 16, y: 268, trace: 'M108 285 H224', uso: 'PostgreSQL, MySQL y SQLite' },
  { label: 'React', x: 412, y: 268, trace: 'M412 285 H296', uso: 'Tuerka, SmartPark y este sitio' },
  { label: 'LLM', x: 56, y: 476, joint: [102, 404], trace: 'M102 476 V404 H224 V314', uso: 'Métricas de agentes de IA en watchdog' },
  { label: 'APIs', x: 384, y: 500, joint: [430, 422], trace: 'M430 500 V422 H296 V314', uso: 'FastAPI, Express y 46 integraciones' },
] as const

const PASO_MS = 2800
const INCLINACION = 7

export function HeroGraphic() {
  const reduce = useReducedMotion()
  const [auto, setAuto] = useState(0)
  const [elegido, setElegido] = useState<number | null>(null)
  const dentro = useRef(false)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })

  // Recorrido automático: se detiene mientras alguien explora el gráfico.
  useEffect(() => {
    if (reduce || elegido !== null) return
    const id = window.setInterval(() => setAuto((a) => (a + 1) % NODES.length), PASO_MS)
    return () => window.clearInterval(id)
  }, [reduce, elegido])

  const activo = elegido ?? (reduce ? null : auto)
  const nodo = activo === null ? null : NODES[activo]

  const draw = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
        }

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * INCLINACION * 2)
    rotateX.set(((e.clientY - r.top) / r.height - 0.5) * -INCLINACION * 2)
  }

  const salir = (e: PointerEvent<HTMLDivElement>) => {
    rotateX.set(0)
    rotateY.set(0)
    // En pantallas táctiles el nodo tocado sigue elegido al levantar el dedo.
    if (dentro.current && e.pointerType === 'mouse') {
      dentro.current = false
      setElegido(null)
    }
  }

  const elegir = (i: number) => {
    dentro.current = true
    setElegido(i)
    setAuto(i)
  }

  return (
    <div className={styles.wrap} onPointerMove={mover} onPointerLeave={salir}>
      <m.div style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}>
        <svg className={styles.graphic} viewBox="0 0 520 560" role="group" aria-label="Tecnologías con las que trabajo">
          {NODES.map((n, i) => (
            <m.path
              key={n.label}
              className={`${styles.trace} ${activo === i ? styles.traceOn : ''} ${activo !== null && activo !== i ? styles.dim : ''}`}
              d={n.trace}
              {...draw(i)}
            />
          ))}

          {!reduce &&
            NODES.map((n, i) => (
              <circle key={n.label} className={`${styles.pulse} ${activo === i ? styles.pulseOn : ''}`} r={activo === i ? 6 : 4}>
                {/* Inicio negativo: cada pulso ya va en camino y nunca asoma en el origen del SVG. */}
                <animateMotion dur="3.4s" begin={`${-i * 0.55}s`} repeatCount="indefinite" path={n.trace} />
              </circle>
            ))}

          {NODES.map((n) =>
            'joint' in n ? <circle key={n.label} className={styles.joint} cx={n.joint[0]} cy={n.joint[1]} r="4" /> : null,
          )}

          {NODES.map((n, i) => (
            <g
              key={n.label}
              className={`${styles.nodeGroup} ${activo === i ? styles.nodeOn : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${n.label}: ${n.uso}`}
              aria-pressed={elegido === i}
              onPointerEnter={() => elegir(i)}
              onFocus={() => elegir(i)}
              onBlur={() => setElegido(null)}
              onClick={() => elegir(i)}
            >
              <rect className={styles.hit} x={n.x - 8} y={n.y - 8} width="108" height="50" />
              <rect className={styles.node} x={n.x} y={n.y} width="92" height="34" />
              <text className={styles.label} x={n.x + 46} y={n.y + 22}>
                {n.label}
              </text>
            </g>
          ))}

          {!reduce && <rect className={styles.ring} x="224" y="256" width="72" height="58" />}
          <rect className={styles.hub} x="224" y="256" width="72" height="58" />
          <text className={styles.hubLabel} x="260" y="292">
            DG
          </text>
        </svg>
      </m.div>

      <p className={styles.caption}>
        <b>{nodo?.label ?? 'Explora'}</b>
        <span>{nodo?.uso ?? 'Pasa el cursor o toca una tecnología.'}</span>
      </p>
    </div>
  )
}
