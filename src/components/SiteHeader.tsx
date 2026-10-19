import { useEffect, useId, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { navItems } from '../data/navigation'
import styles from './SiteHeader.module.css'

/** Barra fija y translúcida con la sección activa resaltada. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.wordmark} href="#inicio" onClick={() => setOpen(false)}>
          {profile.shortName}
        </a>
        <nav aria-label="Principal" className={styles.nav}>
          <ul id={menuId} className={`${styles.links} ${open ? styles.open : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.action} href={`mailto:${profile.email}`}>
            Escríbeme
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
