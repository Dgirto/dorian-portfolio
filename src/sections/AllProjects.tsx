import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import type { Project } from '../types'
import { ProjectDialog } from './Projects'
import styles from './Projects.module.css'

const LISTA = '/proyectos'

function proyectoDeLaRuta() {
  const slug = window.location.pathname.replace(/\/$/, '').split('/')[2]
  return projects.find((p) => p.slug === slug) ?? null
}

/** Página /proyectos: cada proyecto tiene su URL y abre el mismo detalle que la portada. */
export function AllProjects() {
  const [open, setOpen] = useState<Project | null>(proyectoDeLaRuta)

  useEffect(() => {
    const alVolver = () => setOpen(proyectoDeLaRuta())
    window.addEventListener('popstate', alVolver)
    return () => window.removeEventListener('popstate', alVolver)
  }, [])

  // La navegación interna no recarga la página, así que el título se actualiza aquí.
  useEffect(() => {
    document.title = open ? `${open.name} · Proyecto de ${profile.shortName}` : `Proyectos · ${profile.name}`
  }, [open])

  const abrir = (e: MouseEvent<HTMLAnchorElement>, p: Project) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    window.history.pushState(null, '', `${LISTA}/${p.slug}`)
    setOpen(p)
  }

  const cerrar = useCallback(() => {
    setOpen(null)
    if (window.location.pathname !== LISTA) window.history.pushState(null, '', LISTA)
  }, [])

  return (
    <section className={styles.page} aria-labelledby="todos-title">
      <a className={styles.back} href="/#proyectos">
        <ArrowLeft size={16} aria-hidden="true" /> Volver al inicio
      </a>
      <div className={styles.allHead}>
        <h1 id="todos-title" className="section-title">
          Todos los proyectos.
        </h1>
        <span className={styles.allCount}>{projects.length} proyectos</span>
      </div>
      <ol className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a className={styles.row} href={`${LISTA}/${p.slug}`} onClick={(e) => abrir(e, p)} aria-haspopup="dialog">
              <span className={styles.rowIndex} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.rowName}>{p.name}</span>
              <span className={styles.rowThesis}>{p.thesis}</span>
              <span className={styles.rowKind}>
                {p.kind} · {p.year}
              </span>
              <Plus className={styles.rowIcon} size={18} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
      <ProjectDialog project={open} onClose={cerrar} />
    </section>
  )
}
