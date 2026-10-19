import { useState } from 'react'
import { ChevronRight, Pause, Play } from 'lucide-react'
import { connectors } from '../data/connectors'
import { families } from '../data/families'
import { Counter } from '../components/Counter'
import { Reveal } from '../components/Reveal'
import type { Connector } from '../types'
import styles from './ConnectorWall.module.css'

function Row({ items, reverse }: { items: Connector[]; reverse?: boolean }) {
  // La lista se duplica para que el desplazamiento infinito no tenga saltos.
  const loop = [...items, ...items]
  return (
    <div className={styles.row}>
      <ul className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {loop.map((c, i) => (
          <li key={`${c.id}-${i}`} className={styles.item} aria-hidden={i >= items.length || undefined}>
            <img src={c.frame} alt="" width={480} height={300} loading="lazy" decoding="async" />
            <span className={styles.caption}>
              <span className={styles.dot} style={{ background: `var(--fam-${c.family})` }} />
              {c.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ConnectorWall() {
  const [paused, setPaused] = useState(false)
  const half = Math.ceil(connectors.length / 2)

  return (
    <section className={`dark ${styles.section}`} aria-labelledby="wall-title">
      <div className={styles.head}>
        <Reveal>
          <h2 id="wall-title" className={styles.title}>
            <Counter value={connectors.length} className={styles.number} />
            <span>conectores publicados.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">
            Cada uno es una guía real del catálogo de Ruvic AI, con su código abierto en GitHub y el mismo método de
            principio a fin.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className={styles.families}>
            {families.map((f) => (
              <li key={f.id}>
                <span className={styles.dot} style={{ background: f.colorVar }} aria-hidden="true" />
                <strong>{connectors.filter((c) => c.family === f.id).length}</strong> {f.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className={`${styles.wall} ${paused ? styles.paused : ''}`}>
        <Row items={connectors.slice(0, half)} />
        <Row items={connectors.slice(half)} reverse />
      </div>

      <div className={styles.foot}>
        <a className="link-more" href="#conectores">
          Buscar en el catálogo <ChevronRight size={18} aria-hidden="true" />
        </a>
        <button
          type="button"
          className={styles.pause}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Reanudar animación' : 'Pausar animación'}
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>
    </section>
  )
}
