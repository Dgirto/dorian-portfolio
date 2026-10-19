import styles from './Devices.module.css'

interface Shot {
  src: string
  alt: string
  width: number
  height: number
  eager?: boolean
  /** Dibuja la Dynamic Island. Desactívala si la captura no tiene barra de estado. */
  island?: boolean
}

/** Portátil dibujado en CSS con una captura real en la pantalla. */
export function Laptop({ src, alt, width, height, eager }: Shot) {
  return (
    <div className={styles.laptop}>
      <div className={styles.lid}>
        <div className={styles.screen}>
          <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </div>
      </div>
      <div className={styles.base} aria-hidden="true" />
    </div>
  )
}

/** Teléfono dibujado en CSS con una captura real. */
export function Phone({ src, alt, width, height, eager, island = true }: Shot) {
  return (
    <div className={`${styles.phone} ${island ? styles.island : ''}`}>
      <div className={styles.phoneScreen}>
        <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
    </div>
  )
}
