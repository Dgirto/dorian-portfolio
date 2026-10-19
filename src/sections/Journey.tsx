import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { timeline } from '../data/timeline'
import { certifications } from '../data/certifications'
import { formatRange, formatYearMonth } from '../utils/format'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import styles from './Journey.module.css'

const kindLabel = { experiencia: 'Experiencia laboral', formacion: 'Formación académica' } as const

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })

  return (
    <section id="trayectoria" className={`dark ${styles.section}`} aria-labelledby="trayectoria-title">
      <div className={styles.grid}>
        <div className={styles.side}>
          <Reveal>
            <h2 id="trayectoria-title" className="section-title">
              Trayectoria.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">Dónde trabajo, qué estudio y qué he certificado.</p>
          </Reveal>
        </div>

        <div>
          <div className={styles.timeline}>
            <span className={styles.rail} aria-hidden="true">
              <m.span className={styles.railFill} style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }} />
            </span>
            <ol ref={listRef} className={styles.entries}>
              {timeline.map((e) => (
                <Reveal as="li" key={`${e.organization}-${e.start}`} className={styles.entry}>
                  <span className={styles.node} aria-hidden="true" />
                  <p className={styles.kind}>{kindLabel[e.kind]}</p>
                  <h3 className={styles.org}>{e.organization}</h3>
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

          <div id="certificaciones" className={styles.certs}>
            <Reveal>
              <h3 className={styles.certsTitle}>Certificaciones</h3>
            </Reveal>
            <ul>
              {certifications.map((c, i) => (
                <Reveal as="li" key={c.credentialId} delay={i * 0.05} className={styles.cert}>
                  <div>
                    <p className={styles.certName}>{c.name}</p>
                    <p className={styles.certMeta}>
                      {c.issuer} · {formatYearMonth(c.issued)}
                      {c.expires ? ` · vence ${formatYearMonth(c.expires)}` : ''}
                    </p>
                  </div>
                  {c.verifyUrl ? (
                    <ExternalLink className={styles.verify} href={c.verifyUrl}>
                      Verificar <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="visually-hidden"> {c.name}</span>
                    </ExternalLink>
                  ) : (
                    <span className={styles.certMeta}>Sin enlace de verificación</span>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
