import { m, useReducedMotion } from 'motion/react'
import { profile } from '../data/profile'
import { ExternalLink } from '../components/ExternalLink'
import { HeroGraphic } from '../components/HeroGraphic'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const role = profile.role.charAt(0).toLowerCase() + profile.role.slice(1)

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          // Solo desplazamiento: el texto es visible desde el primer fotograma (mejor LCP).
          initial: { y: 24 },
          animate: { y: 0 },
          transition: { duration: 1, delay, ease },
        }

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.intro}>
        <div className={styles.copy}>
          <m.h1 id="hero-title" className={styles.title} {...enter(0)}>
            Soy <mark>{profile.shortName}</mark>, {role}.
          </m.h1>
          <m.p className={styles.lead} {...enter(0.1)}>
            {profile.intro}
          </m.p>
          <m.ul className={styles.links} {...enter(0.2)}>
            <li>
              <a href="#proyectos">Proyectos ↓</a>
            </li>
            <li>
              <ExternalLink href={profile.links.github.href}>GitHub ↗</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin.href}>LinkedIn ↗</ExternalLink>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Correo ↗</a>
            </li>
          </m.ul>
        </div>
        <div className={styles.graphic}>
          <HeroGraphic />
        </div>
      </div>
    </section>
  )
}
