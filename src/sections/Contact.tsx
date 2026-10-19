import { profile } from '../data/profile'
import { ExternalLink } from '../components/ExternalLink'
import styles from './Contact.module.css'

const subject = encodeURIComponent('Contacto desde tu portafolio')

export function Contact() {
  return (
    <section id="contacto" className={`wrap grid12 ${styles.section}`} aria-labelledby="contacto-title">
      <div className={styles.lead} data-reveal>
        <h2 id="contacto-title" className={styles.heading}>
          Contacto
        </h2>
        <p className={styles.statement}>
          ¿Sistemas que no se hablan o un proceso manual que debería ser automático? Escríbeme.
        </p>
      </div>
      <img
        className={styles.portrait}
        src={profile.portrait.src}
        alt={profile.portrait.alt}
        width={profile.portrait.width}
        height={profile.portrait.height}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.channels}>
        <p className={styles.question}>¿Empleo, prácticas o un proyecto?</p>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${profile.email}?subject=${subject}`}>
              {profile.email.split('@')[0]}
              <wbr />@{profile.email.split('@')[1]}
            </a>
          </li>
          <li>
            <ExternalLink href={profile.links.linkedin.href}>LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={profile.links.github.href}>GitHub · {profile.links.github.handle}</ExternalLink>
          </li>
        </ul>
        <p className={styles.where}>
          {profile.location}. {profile.workMode}.
        </p>
      </div>
    </section>
  )
}
