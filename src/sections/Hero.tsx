import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { Laptop, Phone } from '../components/Devices'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] })
  // El portátil se endereza y crece mientras sube; el teléfono avanza un poco más rápido.
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const phoneY = useTransform(scrollYProgress, [0, 1], [140, 0])

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        }

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          <m.span className={styles.name} {...enter(0)}>
            {profile.name}
          </m.span>
          <m.span className={styles.claim} {...enter(0.1)}>
            Software que conecta sistemas.
          </m.span>
        </h1>
        <m.p className={styles.intro} {...enter(0.25)}>
          {profile.intro}
        </m.p>
        <m.div className={styles.actions} {...enter(0.35)}>
          <a className="btn" href="#proyectos">
            Ver proyectos
          </a>
          <a className="link-more" href="#contacto">
            Contactar <ChevronRight size={18} aria-hidden="true" />
          </a>
        </m.div>
      </div>

      <div ref={stageRef} className={styles.stage}>
        <m.div
          className={styles.laptop}
          style={reduce ? undefined : { rotateX, scale, transformPerspective: 1600 }}
        >
          <Laptop
            src="/work/watchdog-dashboard.webp"
            alt="Panel de watchdog-bot-monitor, uno de mis proyectos, con el estado de una flota de bots"
            width={1400}
            height={875}
            eager
          />
        </m.div>
        <m.div className={styles.phone} style={reduce ? undefined : { y: phoneY }}>
          <Phone
            src="/work/escuela-mobile.webp"
            alt="appEscuela, otro de mis proyectos, en un teléfono"
            width={390}
            height={844}
            eager
          />
        </m.div>
      </div>
    </section>
  )
}
