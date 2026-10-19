import { m, motionValue, useTransform, type MotionValue } from 'motion/react'
import styles from './Laptop3D.module.css'

// Valor fijo para cuando no hay progreso de scroll (portátil abierto).
const NEUTRAL = motionValue(1)

interface Props {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  width: number
  height: number
  /** 0 = tapa cerrada · 1 = abierta. Sin valor, se muestra abierta y estática. */
  progress?: MotionValue<number>
}

/**
 * Portátil en 3D hecho con CSS: la tapa gira sobre la bisagra y la base queda tumbada hacia el visitante.
 * Al final del recorrido todas las transformaciones vuelven a cero, así la captura se ve nítida.
 */
export function Laptop3D({ src, srcSet, sizes, alt, width, height, progress }: Props) {
  // La cámara queda fija, algo por encima; solo gira la tapa, de cerrada (-88°, apoyada sobre el teclado) a abierta (0°).
  const lid = useTransform(progress ?? NEUTRAL, [0, 1], [-88, 0])

  return (
    <div className={styles.wrap}>
    <div className={styles.scene}>
      <div className={styles.device}>
        <div className={styles.deck} aria-hidden="true">
          <div className={styles.keyboard} />
          <div className={styles.trackpad} />
          <div className={styles.lip} />
        </div>
        <m.div className={styles.lid} style={progress ? { rotateX: lid } : undefined}>
          <div className={styles.front}>
            <div className={styles.screen}>
              <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} decoding="async" />
            </div>
          </div>
          <div className={styles.back} aria-hidden="true">
            <span className={styles.mark}>DG</span>
          </div>
        </m.div>
      </div>
    </div>
    </div>
  )
}
