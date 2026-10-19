import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import styles from './About.module.css'

const facts = [
  { label: 'Base', value: profile.location },
  { label: 'Ahora', value: 'Prácticas en Ruvic AI' },
  { label: 'Formación', value: 'SENATI, 2024 – 2027' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={ref} id="sobre-mi" className={styles.about} aria-labelledby="sobre-mi-title">
      <div className={styles.grid}>
        <Reveal className={styles.photoWrap}>
          <m.img
            className={styles.photo}
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={profile.portrait.width}
            height={profile.portrait.height}
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { y: photoY }}
          />
        </Reveal>
        <div className={styles.text}>
          <Reveal>
            <h2 id="sobre-mi-title" className="section-title">
              Sobre mí
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lead}>{profile.about}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.more}>{profile.aboutMore}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
