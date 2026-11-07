import { connectors } from '../data/connectors'
import { splitName } from '../utils/connectors'
import type { Connector } from '../types'
import { LogoTile } from './LogoTile'
import styles from './LogoMarquee.module.css'

function Row({ items, reverse }: { items: Connector[]; reverse?: boolean }) {
  // La lista se duplica para que el desplazamiento infinito no tenga saltos.
  const loop = [...items, ...items]
  return (
    <div className={styles.row}>
      <ul className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {loop.map((c, i) => (
          <li key={`${c.id}-${i}`} className={styles.item}>
            <LogoTile connector={c} size="sm" />
            <span className={styles.name}>{splitName(c.name).title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Dos filas de logos en movimiento continuo; decorativas, el catálogo está en el detalle del proyecto. */
export function LogoMarquee() {
  // Las dos filas mezclan familias para que haya variedad de color.
  const odd = connectors.filter((_, i) => i % 2 === 0)
  const even = connectors.filter((_, i) => i % 2 === 1)
  return (
    <div className={styles.wall} aria-hidden="true">
      <Row items={odd} />
      <Row items={even} reverse />
    </div>
  )
}
