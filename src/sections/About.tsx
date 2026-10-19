import { profile } from '../data/profile'
import { timeline } from '../data/timeline'
import { formatRange } from '../utils/format'
import type { TimelineEntry } from '../types'
import styles from './About.module.css'

const facts = [
  { label: 'Base', value: profile.location },
  { label: 'Ahora', value: 'Ruvic AI, en prácticas' },
  { label: 'Formación', value: 'SENATI, 2024 – 2027' },
]

function Record({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  return (
    <div className={styles.record}>
      <h3 className={styles.recordTitle}>{title}</h3>
      <ul>
        {entries.map((e) => (
          <li key={`${e.organization}-${e.start}`} className={styles.entry}>
            <div className={styles.entryHead}>
              <span className={styles.entryOrg}>{e.organization}</span>
              <span className={styles.entryDate}>{formatRange(e.start, e.end, e.endIsExpected)}</span>
            </div>
            <p className={styles.entryTitle}>{e.title}</p>
            <p className={styles.entryMeta}>
              {e.type}
              {e.location ? ` · ${e.location}` : ''}
            </p>
            {e.description && <p className={styles.entryText}>{e.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function About() {
  const work = timeline.filter((e) => e.kind === 'experiencia')
  const studies = timeline.filter((e) => e.kind === 'formacion')

  return (
    <section id="sobre-mi" className={`wrap ${styles.about}`} aria-labelledby="sobre-mi-title">
      <div className={styles.row} data-reveal>
        <div className={styles.side}>
          <h2 id="sobre-mi-title" className={styles.heading}>
            Sobre mí
          </h2>
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className={styles.paragraph}>{profile.about}</p>
      </div>

      <div className={`${styles.row} ${styles.rowRecord}`} data-reveal>
        <h2 className={styles.side + ' ' + styles.recordHeading}>Trayectoria</h2>
        <div className={styles.records}>
          <Record title="Experiencia laboral" entries={work} />
          <Record title="Formación académica" entries={studies} />
        </div>
      </div>
    </section>
  )
}
