import type { Connector } from '../types'
import { logoOf } from '../utils/connectors'
import styles from './LogoTile.module.css'

/** Logo del sistema sobre un cuadrado blanco redondeado, al estilo de un icono de aplicación. */
export function LogoTile({ connector, size = 'md' }: { connector: Connector; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`${styles.tile} ${styles[size]}`}>
      <img src={logoOf(connector)} alt="" width={64} height={64} loading="lazy" decoding="async" />
    </span>
  )
}
