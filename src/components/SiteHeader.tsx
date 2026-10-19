import { useEffect, useId, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { navItems } from '../data/navigation'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`${styles.header} on-ink`}>
      <div className={`${styles.bar} wrap`}>
        <a className={styles.wordmark} href="#inicio">
          {profile.shortName}
        </a>
        <nav aria-label="Principal" className={styles.nav}>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span>{open ? 'Cerrar' : 'Menú'}</span>
          </button>
          <ul id={menuId} className={`${styles.links} ${open ? styles.open : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles.actionItem}>
              <a className={styles.action} href={`mailto:${profile.email}`}>
                Escríbeme
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
