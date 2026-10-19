import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/profile'
import { connectors } from '../data/connectors'
import { useCenteredIndex } from '../hooks/useCenteredIndex'
import { CableLabel } from '../components/CableLabel'
import { ExternalLink } from '../components/ExternalLink'
import styles from './Hero.module.css'

export function Hero() {
  const stripRef = useRef<HTMLDivElement>(null)
  const lit = useCenteredIndex(stripRef, 'li')
  const current = connectors[lit] ?? connectors[0]

  return (
    <section id="inicio" className={`${styles.hero} on-ink`} aria-labelledby="hero-title">
      <div className={`wrap ${styles.titleBlock}`}>
        <h1 id="hero-title" className={styles.title}>
          {profile.name}
        </h1>
        <div className={styles.lede}>
          <p className={styles.intro}>{profile.intro}</p>
          <div className={styles.actions}>
            <a className="btn" href="#proyectos">
              Ver proyectos <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondary} href="#conectores">
              Buscar un conector
            </a>
          </div>
        </div>
      </div>

      <div
        ref={stripRef}
        className={styles.strip}
        tabIndex={0}
        role="region"
        aria-label={`Tira de ${connectors.length} conectores: desplázala horizontalmente con las flechas`}
      >
        <ul className={styles.stripList}>
        {connectors.map((c, i) => (
          <li key={c.id} className={i === lit ? styles.lit : undefined}>
            <ExternalLink href={`https://github.com/Dgirto/${c.repo}`} className={styles.frameLink} tabIndex={-1}>
              <img
                src={c.frame}
                alt={`Guía del conector ${c.name}`}
                width={480}
                height={300}
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </ExternalLink>
          </li>
        ))}
        </ul>
      </div>

      <div className={`wrap ${styles.caption}`}>
        <CableLabel family={current.family} code={current.code} name={current.name} tone="ink" />
        <p className={styles.captionText}>{current.description}</p>
      </div>

      <div className={`wrap grid12 ${styles.facts}`}>
        <p className={styles.fact}>{profile.role}</p>
        <p className={styles.fact}>{profile.studies}</p>
        <p className={styles.fact}>
          {profile.location}. {profile.workMode}.
        </p>
        <p className={`${styles.fact} ${styles.factLinks}`}>
          <ExternalLink href={profile.links.github.href}>GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin.href}>LinkedIn</ExternalLink>
        </p>
      </div>
    </section>
  )
}
