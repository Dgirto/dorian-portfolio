import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { ExternalLink } from '../components/ExternalLink'
import type { Project, Slide } from '../types'
import styles from './Projects.module.css'

function SlideView({ slide, eager }: { slide: Slide; eager: boolean }) {
  if (slide.type === 'image') {
    return (
      <img
        src={slide.src}
        alt={slide.alt}
        width={slide.width}
        height={slide.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={slide.position ? { objectPosition: slide.position } : undefined}
      />
    )
  }
  return (
    <figure className={`${styles.code} on-ink`}>
      <figcaption className={styles.codeFile}>{slide.filename}</figcaption>
      <pre>
        <code className={`language-${slide.language}`}>{slide.code}</code>
      </pre>
      <p className={styles.codeCaption}>{slide.caption}</p>
    </figure>
  )
}

function ProjectBand({ project }: { project: Project }) {
  const rowRef = useRef<HTMLDivElement>(null)

  // Empieza en la diapositiva central para que asomen las dos vecinas.
  useEffect(() => {
    const row = rowRef.current
    if (!row || project.slides.length < 3) return
    const middle = row.querySelectorAll('li')[Math.floor(project.slides.length / 2)]
    if (middle) row.scrollLeft = middle.offsetLeft - (row.clientWidth - middle.clientWidth) / 2
  }, [project.slides.length])

  return (
    <article className={styles.band} aria-labelledby={`p-${project.slug}`}>
      <div
        ref={rowRef}
        className={styles.strip}
        tabIndex={0}
        role="region"
        aria-label={`Capturas de ${project.name}: desplázalas horizontalmente`}
      >
        <ul className={styles.slides}>
          {project.slides.map((s, i) => (
            <li key={i} className={styles.slide}>
              <SlideView slide={s} eager={false} />
            </li>
          ))}
        </ul>
      </div>

      <div className={`wrap grid12 ${styles.facts}`} data-reveal>
        <div className={styles.identity}>
          <h3 id={`p-${project.slug}`} className={styles.name}>
            {project.name}
          </h3>
          <p className={styles.kind}>
            {project.kind} · {project.year}
          </p>
          <p className={styles.links}>
            <ExternalLink href={project.repo}>
              Repositorio <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
            {project.demo && (
              <ExternalLink href={project.demo}>
                Demo en vivo <ArrowUpRight size={16} aria-hidden="true" />
              </ExternalLink>
            )}
          </p>
        </div>
        <div className={styles.story}>
          <p className={styles.thesis}>{project.thesis}</p>
          <dl className={styles.dl}>
            <div>
              <dt>Problema</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>Solución</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>Mi contribución</dt>
              <dd>{project.contribution}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.meta}>
          <dl className={styles.metaList}>
            <div>
              <dt>Equipo</dt>
              <dd>{project.team}</dd>
            </div>
            {project.status && (
              <div>
                <dt>Estado</dt>
                <dd>{project.status}</dd>
              </div>
            )}
            <div>
              <dt>Tecnologías</dt>
              <dd>
                <ul className={styles.tech}>
                  {project.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="proyectos" className={styles.projects} aria-labelledby="proyectos-title">
      <div className="wrap" data-reveal>
        <h2 id="proyectos-title" className={styles.heading}>
          Proyectos
        </h2>
        <p className={styles.intro}>
          {projects.length} trabajos con código público. Cada captura sale del proyecto real: su panel, su demo o su documentación.
        </p>
      </div>
      {projects.map((p) => (
        <ProjectBand key={p.slug} project={p} />
      ))}
    </section>
  )
}
