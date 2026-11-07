import { useEffect, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import type { Project } from '../types'
import { ProjectDialog } from './Projects'
import styles from './Projects.module.css'

const META = {
  title: `Proyectos · ${profile.name}`,
  description: 'Todos los proyectos de software de Dorian Girón Prato: integraciones, apps web y móviles, visión por computadora e IoT.',
}

function fijarMeta(selector: string, atributo: string, valor: string) {
  document.querySelector(selector)?.setAttribute(atributo, valor)
}

/** Página /proyectos: índice completo; cada fila abre el mismo detalle que la portada. */
export function AllProjects() {
  const [open, setOpen] = useState<Project | null>(null)

  useEffect(() => {
    const url = `${profile.siteUrl.replace(/\/$/, '')}/proyectos`
    document.title = META.title
    fijarMeta('meta[name="description"]', 'content', META.description)
    fijarMeta('link[rel="canonical"]', 'href', url)
    fijarMeta('meta[property="og:url"]', 'content', url)
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
            <button type="button" className={styles.row} onClick={() => setOpen(p)} aria-haspopup="dialog">
              <span className={styles.rowIndex} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.rowName}>{p.name}</span>
              <span className={styles.rowThesis}>{p.thesis}</span>
              <span className={styles.rowKind}>
                {p.kind} · {p.year}
              </span>
              <Plus className={styles.rowIcon} size={18} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
