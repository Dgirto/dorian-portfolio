import { useState } from 'react'
import { ChevronRight, Pause, Play } from 'lucide-react'
import { connectors } from '../data/connectors'
import { families } from '../data/families'
import { Counter } from '../components/Counter'
import { LogoTile } from '../components/LogoTile'
import { Reveal } from '../components/Reveal'
import { splitName } from '../utils/connectors'
import type { Connector } from '../types'
import styles from './ConnectorWall.module.css'

function Row({ items, reverse }: { items: Connector[]; reverse?: boolean }) {
  // La lista se duplica para que el desplazamiento infinito no tenga saltos.
  const loop = [...items, ...items]
  return (
    <div className={styles.row}>
      <ul className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {loop.map((c, i) => {
          const { title, variant } = splitName(c.name)
          return (
            <li key={`${c.id}-${i}`} className={styles.item} aria-hidden={i >= items.length || undefined}>
              <LogoTile connector={c} />
              <span className={styles.name}>{title}</span>
              <span className={styles.variant}>{variant ?? c.code}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ConnectorWall() {
  const [paused, setPaused] = useState(false)
  // Las dos filas mezclan familias para que el muro tenga variedad de color.
  const odd = connectors.filter((_, i) => i % 2 === 0)
  const even = connectors.filter((_, i) => i % 2 === 1)

  return (
    <section className={`dark ${styles.section}`} aria-labelledby="wall-title">
      <div className={styles.head}>
        <Reveal>
          <h2 id="wall-title" className={styles.title}>
            <Counter value={connectors.length} className={styles.number} />
            <span>sistemas conectados.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">
            Bases de datos, nube, correo y seguridad. Cada conector tiene su código abierto en GitHub y sigue el mismo
            método de principio a fin.
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
        <Row items={odd} />
        <Row items={even} reverse />
      </div>

      <div className={styles.foot}>
        <a className="link-more" href="#conectores">
          Explorar el catálogo <ChevronRight size={18} aria-hidden="true" />
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
