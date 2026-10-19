import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'
import { projects } from '../data/projects'
import { Laptop, Phone } from '../components/Devices'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import type { Project, Slide } from '../types'
import styles from './Projects.module.css'

function CodeBlock({ slide }: { slide: Extract<Slide, { type: 'code' }> }) {
  return (
    <figure className={styles.code}>
      <figcaption className={styles.codeFile}>{slide.filename}</figcaption>
      <pre>
        <code>{slide.code}</code>
      </pre>
    </figure>
  )
}

function Cover({ project }: { project: Project }) {
  const c = project.cover
  if (!c) {
    const code = project.slides.find((s): s is Extract<Slide, { type: 'code' }> => s.type === 'code')
    return code ? <CodeBlock slide={code} /> : null
  }
  if (c.frame === 'laptop') return <Laptop {...c} />
  if (c.frame === 'phone')
    return (
      <div className={styles.phoneCover}>
        <Phone {...c} />
      </div>
    )
  return <img className={styles.plain} src={c.src} alt={c.alt} width={c.width} height={c.height} loading="lazy" decoding="async" />
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {project && (
        <div className={styles.sheet}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
          <p className={styles.meta}>
            {project.kind} · {project.year} · {project.team}
          </p>
          <h2 id="dialog-title" className={styles.dialogTitle}>
            {project.name}
          </h2>
          <p className={styles.dialogThesis}>{project.thesis}</p>

          <div className={styles.gallery} tabIndex={0} role="region" aria-label="Capturas del proyecto">
            {project.slides.map((s, i) =>
              s.type === 'image' ? (
                <img key={i} src={s.src} alt={s.alt} width={s.width} height={s.height} decoding="async" />
              ) : (
                <div key={i} className={styles.galleryCode}>
                  <CodeBlock slide={s} />
                  <p>{s.caption}</p>
                </div>
              ),
            )}
          </div>

          <dl className={styles.story}>
            <div>
              <dt>El problema</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>La solución</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>Mi aporte</dt>
              <dd>{project.contribution}</dd>
            </div>
          </dl>

          <ul className={styles.tags} aria-label="Tecnologías">
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {project.status && <p className={styles.status}>{project.status}</p>}

          <p className={styles.links}>
            <ExternalLink className="btn" href={project.repo}>
              Ver código <ArrowUpRight size={18} aria-hidden="true" />
            </ExternalLink>
            {project.demo && (
              <ExternalLink className="btn btn-ghost" href={project.demo}>
                Abrir demo <ArrowUpRight size={18} aria-hidden="true" />
              </ExternalLink>
            )}
          </p>
        </div>
      )}
    </dialog>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section id="proyectos" className={`${styles.section} defer`} aria-labelledby="proyectos-title">
      <div className={styles.head}>
        <Reveal>
          <h2 id="proyectos-title" className="section-title">
            Proyectos.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">
            Trabajo real, con código público. Abre cualquiera para ver el problema, la solución y mi aporte.
          </p>
        </Reveal>
      </div>

      <ul className={styles.grid}>
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08} className={p.featured ? styles.featured : undefined}>
            <article className={`${styles.card} ${p.cover?.frame === 'laptop' ? styles.cardWide : ''}`}>
              <div className={styles.cardText}>
                <p className={styles.kind}>
                  {p.kind} · {p.year}
                </p>
                <h3 className={styles.cardTitle}>
                  <button type="button" className={styles.cardButton} onClick={() => setOpen(p)} aria-haspopup="dialog">
                    {p.name}
                  </button>
                </h3>
                <p className={styles.cardThesis}>{p.thesis}</p>
                <span className={styles.more} aria-hidden="true">
                  Ver proyecto <Plus size={16} />
                </span>
              </div>
              <div className={styles.cardMedia}>
                <Cover project={p} />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
