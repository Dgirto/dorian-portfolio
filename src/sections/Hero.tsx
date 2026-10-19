import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { Laptop, Phone } from '../components/Devices'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Recorrido: el portátil llega cerrado y se abre mientras la escena queda fijada.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const open = useTransform(smooth, [0, 0.62], [0, 1], { clamp: true })
  const phoneY = useTransform(smooth, [0.55, 0.85], ['40%', '0%'], { clamp: true })
  const phoneOpacity = useTransform(smooth, [0.55, 0.75], [0, 1], { clamp: true })
  const hint = useTransform(smooth, [0, 0.15], [1, 0], { clamp: true })

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

      <div ref={trackRef} className={reduce ? styles.trackStatic : styles.track}>
        <div className={styles.sticky}>
          <div className={styles.stage}>
            <div className={styles.laptop}>
              <Laptop
                src="/work/watchdog-dashboard.webp"
                srcSet="/work/watchdog-dashboard-1200.webp 1200w, /work/watchdog-dashboard.webp 2400w"
                sizes="(max-width: 640px) 90vw, 860px"
                alt="Panel de watchdog-bot-monitor, uno de mis proyectos, con el estado de una flota de bots"
                width={2400}
                height={1500}
                progress={reduce ? undefined : open}
              />
            </div>
            <m.div className={styles.phone} style={reduce ? undefined : { y: phoneY, opacity: phoneOpacity }}>
              <Phone
                src="/work/escuela-mobile.webp"
                alt="appEscuela, otro de mis proyectos, en un teléfono"
                width={780}
                height={1688}
                island={false}
              />
            </m.div>
          </div>
          {!reduce && (
            <m.p className={styles.hint} style={{ opacity: hint }} aria-hidden="true">
              Desliza para abrir
            </m.p>
          )}
        </div>
      </div>
    </section>
  )
}
