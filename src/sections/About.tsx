import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Timeline } from '../components/Timeline'
import styles from './About.module.css'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30])

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
          <div className={styles.journey}>
            <Reveal>
              <h3 className={styles.journeyTitle}>Trayectoria</h3>
            </Reveal>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  )
}
