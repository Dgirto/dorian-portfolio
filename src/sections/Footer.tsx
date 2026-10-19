import { profile } from '../data/profile'
import { footerExtraItems, navItems } from '../data/navigation'
import { ExternalLink } from '../components/ExternalLink'
import { useLocalTime } from '../hooks/useLocalTime'
import styles from './Footer.module.css'

export function Footer() {
  const time = useLocalTime('America/Lima')
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.tile} ${styles.statement}`}>
        <p className={styles.statementText}>{profile.intro}</p>
        <p className={styles.legal}>
          © {year} {profile.name}. Fotografía del mosaico: Dorothee Hübner,{' '}
          <ExternalLink href="https://unsplash.com/photos/4vPPtrfLRcs">Unsplash</ExternalLink>. Las capturas
          pertenecen a los proyectos enlazados.
        </p>
      </div>
      <nav className={`${styles.tile} ${styles.nav}`} aria-label="Secundaria">
        <ul>
          {[...navItems, ...footerExtraItems].map(
            (item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className={`${styles.tile} ${styles.place}`}>
        <p>{profile.location}</p>
        <p className={styles.time}>
          <time>{time}</time> hora local
        </p>
      </div>
      <div className={`${styles.tile} ${styles.email}`}>
        <p className={styles.small}>Correo</p>
        <a href={`mailto:${profile.email}`} className={styles.emailLink}>
          {profile.email.split('@')[0]}
          <wbr />@{profile.email.split('@')[1]}
        </a>
      </div>
      <div className={`${styles.tile} ${styles.wordmark} on-ink`} aria-hidden="true">
        <span>{profile.shortName}</span>
      </div>
      <a className={`${styles.tile} ${styles.invite} on-accent`} href={`mailto:${profile.email}`}>
        <span className={styles.inviteText}>Hablemos de tu sistema</span>
        <svg className={styles.arrow} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <path d="M10 38 38 10M16 10h22v22" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </a>
    </footer>
  )
}
