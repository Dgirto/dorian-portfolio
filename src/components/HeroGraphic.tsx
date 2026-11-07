import { m, useReducedMotion } from 'motion/react'
import styles from './HeroGraphic.module.css'

// Diagrama de conectores: las tecnologías con las que trabajo enlazadas a un mismo punto.
const NODES = [
  { label: 'Python', x: 16, y: 60 },
  { label: 'TypeScript', x: 372, y: 28 },
  { label: 'SQL', x: 16, y: 268 },
  { label: 'React', x: 412, y: 268 },
  { label: 'LLM', x: 56, y: 476 },
  { label: 'APIs', x: 384, y: 500 },
]

const TRACES = [
  'M62 94 V164 H224 V256',
  'M428 62 V130 H296 V256',
  'M108 285 H224',
  'M412 285 H296',
  'M102 476 V404 H224 V314',
  'M430 500 V422 H296 V314',
]

const JOINTS = [
  [62, 164],
  [428, 130],
  [102, 404],
  [430, 422],
]

export function HeroGraphic() {
  const reduce = useReducedMotion()
  const draw = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <svg className={styles.graphic} viewBox="0 0 520 560" aria-hidden="true">
      {TRACES.map((d, i) => (
        <m.path key={d} className={styles.trace} d={d} {...draw(i)} />
      ))}
      {JOINTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} className={styles.joint} cx={cx} cy={cy} r="4" />
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect className={styles.node} x={n.x} y={n.y} width="92" height="34" />
          <text className={styles.label} x={n.x + 46} y={n.y + 22}>
            {n.label}
          </text>
        </g>
      ))}
      <rect className={styles.hub} x="224" y="256" width="72" height="58" />
      <text className={styles.hubLabel} x="260" y="292">
        DG
      </text>
    </svg>
  )
}
