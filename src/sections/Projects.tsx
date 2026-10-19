import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'
import { projects } from '../data/projects'
import { connectors } from '../data/connectors'
import { splitName } from '../utils/connectors'
import { Laptop, Phone } from '../components/Devices'
import { CodeWindow } from '../components/CodeWindow'
import { LogoTile } from '../components/LogoTile'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import type { Project, Slide } from '../types'
import styles from './Projects.module.css'

type CodeSlide = Extract<Slide, { type: 'code' }>

// Logos que son solo un texto fino y se pierden en tamaño pequeño.
const WORDMARKS = new Set(['Cisco-Umbrella', 'MISP', 'MySQL-MariaDB', 'Oracle'])
// Variantes que comparten logo (Gmail, Drive…; servicios de AWS o de Azure) cuentan una sola vez.
const SHARED_LOGO: Record<string, string> = {
  'AWS-Cost-Explorer': 'aws',
  'AWS-EC2': 'aws',
  'AWS-Secrets-Manager': 'aws',
  'Azure-Key-Vault': 'azure',
  'Azure-Service-Bus': 'azure',
}
const seen = new Set<string>()
const iconic = connectors.filter((c) => {
  const key = SHARED_LOGO[c.repo] ?? splitName(c.name).title
  if (WORDMARKS.has(c.repo) || seen.has(key)) return false
  seen.add(key)
  return true
})

/** Mosaico de logos del catálogo de conectores. */
function LogoCloud({ count }: { count: number }) {
  // Se reparte la selección por todo el catálogo para mezclar familias.
  const step = Math.max(1, Math.floor(iconic.length / count))
  const picks = iconic.filter((_, i) => i % step === 0).slice(0, count)
  return (
    <div className={styles.cloud} aria-hidden="true">
      {picks.map((c) => (
        <LogoTile key={c.id} connector={c} size="sm" />
      ))}
    </div>
  )
}

function Cover({ project }: { project: Project }) {
  const c = project.cover
  switch (c.kind) {
    case 'laptop':
      return <Laptop {...c} />
    case 'phone':
      return (
        <div className={styles.phoneCover}>
          <Phone {...c} />
        </div>
      )
    case 'phones':
      return (
        <div className={styles.phonesCover}>
          <Phone {...c.shots[0]} />
          <Phone {...c.shots[1]} />
        </div>
      )
    case 'logos':
      return (
        <div className={styles.cloudCover}>
          <LogoCloud count={15} />
        </div>
      )
    case 'code': {
      const code = project.slides.find((s): s is CodeSlide => s.type === 'code')
      return code ? <CodeWindow filename={code.filename} language={code.language} code={code.code} compact /> : null
    }
    case 'plain':
      return <img className={styles.plain} src={c.src} alt={c.alt} width={c.width} height={c.height} loading="lazy" decoding="async" />
  }
}

function GallerySlide({ slide }: { slide: Slide }) {
  if (slide.type === 'image') {
    const tall = slide.height > slide.width
    return (
      <figure className={tall ? styles.slideTall : styles.slideWide}>
        <img src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} decoding="async" />
      </figure>
    )
  }
  if (slide.type === 'logos') {
    return (
      <figure className={styles.slideWide}>
        <div className={styles.cloudSlide}>
          <LogoCloud count={24} />
        </div>
        <figcaption>{slide.caption}</figcaption>
      </figure>
    )
  }
  return (
    <figure className={styles.slideWide}>
      <CodeWindow filename={slide.filename} language={slide.language} code={slide.code} />
      <figcaption>{slide.caption}</figcaption>
    </figure>
  )
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

          <div className={styles.gallery} tabIndex={0} role="region" aria-label="Galería del proyecto">
            {project.slides.map((s, i) => (
              <GallerySlide key={i} slide={s} />
            ))}
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
            <article className={`${styles.card} ${p.featured ? styles.cardWide : ''}`}>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>
                  <button type="button" className={styles.cardButton} onClick={() => setOpen(p)} aria-haspopup="dialog">
                    {p.name}
                  </button>
                </h3>
                <p className={styles.cardThesis}>{p.thesis}</p>
                <p className={styles.kind}>
                  {p.kind} · {p.year}
                </p>
                <span className={styles.more} aria-hidden="true">
                  Ver proyecto <Plus size={16} />
                </span>
              </div>
              <div className={`${styles.cardMedia} ${styles[`media_${p.cover.kind}`] ?? ''}`}>
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
