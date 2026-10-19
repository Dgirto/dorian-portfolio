import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import styles from './Contact.module.css'

const subject = encodeURIComponent('Contacto desde tu portafolio')

export function Contact() {
  return (
    <section id="contacto" className={`dark ${styles.section} defer`} aria-labelledby="contacto-title">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="contacto-title" className={styles.title}>
            ¿Hablamos?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            Busco oportunidades como desarrollador y proyectos de integración o automatización. Si tienes sistemas que no
            se hablan entre sí, escríbeme.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={styles.actions}>
            <a className="btn" href={`mailto:${profile.email}?subject=${subject}`}>
              <Mail size={18} aria-hidden="true" /> {profile.email}
            </a>
            <ExternalLink className="btn btn-ghost" href={profile.links.linkedin.href}>
              LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink className="btn btn-ghost" href={profile.links.github.href}>
              GitHub <ArrowUpRight size={18} aria-hidden="true" />
            </ExternalLink>
          </div>
        </Reveal>
        <p className={styles.where}>
          {profile.location} · {profile.workMode}
        </p>
      </div>
    </section>
  )
}
