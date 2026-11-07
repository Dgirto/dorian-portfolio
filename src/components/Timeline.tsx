import { useRef } from 'react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { timeline } from '../data/timeline'
import { formatRange } from '../utils/format'
import { Reveal } from './Reveal'
import styles from './Timeline.module.css'

const kindLabel = { experiencia: 'Experiencia laboral', formacion: 'Formación académica' } as const

/** Experiencia y formación, con un riel que se llena al desplazarse. */
export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 65%'] })

  return (
    <div className={styles.timeline}>
      <span className={styles.rail} aria-hidden="true">
        <m.span className={styles.railFill} style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }} />
      </span>
      <ol ref={listRef} className={styles.entries}>
        {timeline.map((e) => (
          <Reveal as="li" key={`${e.organization}-${e.start}`} className={styles.entry}>
            <span className={styles.node} aria-hidden="true" />
            <p className={styles.kind}>{kindLabel[e.kind]}</p>
            <h4 className={styles.org}>{e.organization}</h4>
            <p className={styles.role}>{e.title}</p>
            <p className={styles.dates}>
              {formatRange(e.start, e.end, e.endIsExpected)}
              {' · '}
              {e.type}
              {e.location ? ` · ${e.location}` : ''}
            </p>
            {e.description && <p className={styles.desc}>{e.description}</p>}
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
