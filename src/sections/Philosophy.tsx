import { useRef } from 'react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { profile } from '../data/profile'
import styles from './Philosophy.module.css'

// Línea decorativa de crecimiento por etapas; no representa datos.
const STEPS = 'M0 220 H240 V172 H480 V124 H720 V76 H960 V28 H1200'

/** Capítulo negro: la filosofía en una línea y un trazo que se dibuja con el desplazamiento. */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 45%'] })
  const words = profile.philosophy.split(' ')
  const last = words.pop()

  return (
    <section ref={ref} className={`dark grid-lines ${styles.section}`} aria-labelledby="filosofia-title">
      <h2 id="filosofia-title" className={styles.line}>
        {words.join(' ')} <span>{last}</span>
      </h2>
      <svg className={styles.chart} viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.ghost} d={STEPS} vectorEffect="non-scaling-stroke" />
        <m.path
          className={styles.trace}
          d={STEPS}
          vectorEffect="non-scaling-stroke"
          style={reduce ? undefined : { pathLength: scrollYProgress }}
        />
      </svg>
    </section>
  )
}
