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
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.name}>{profile.name}</p>
          <nav aria-label="Secundaria">
            <ul className={styles.nav}>
              {[...navItems, ...footerExtraItems].map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.nav}>
            <li>
              <a href={`mailto:${profile.email}`}>Correo</a>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin.href}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.github.href}>GitHub</ExternalLink>
            </li>
          </ul>
        </div>
        <div className={styles.bottom}>
          <p>
            © {year} {profile.name}. Hecho con React y TypeScript.
          </p>
          <p>
            {profile.location} · <time>{time}</time> hora local
          </p>
        </div>
      </div>
    </footer>
  )
}
