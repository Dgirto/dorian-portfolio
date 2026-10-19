import { m, motionValue, useTransform, type MotionValue } from 'motion/react'
import styles from './Devices.module.css'

interface Shot {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
  sizes?: string
  eager?: boolean
}

/** iPhone 14 Pro (adaptado de devices.css) con una captura real en la pantalla. */
export function Phone({ src, alt, width, height, srcSet, sizes, eager, island = true }: Shot & { island?: boolean }) {
  return (
    <div className={styles.phoneWrap}>
      <div className={styles.iphone}>
        <div className={styles.iphoneFrame}>
          <img
            className={styles.iphoneScreen}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <div className={styles.iphoneStripe} aria-hidden="true" />
        {island && <div className={styles.iphoneIsland} aria-hidden="true" />}
        <div className={styles.iphoneBtns} aria-hidden="true" />
        <div className={styles.iphonePower} aria-hidden="true" />
      </div>
    </div>
  )
}

// Progreso fijo (portátil abierto) cuando no hay animación.
const OPEN = motionValue(1)

/**
 * MacBook Pro (adaptado de devices.css). Con `progress` (0 → 1) la tapa se abre:
 * llega cerrada sobre el teclado y termina de frente, sin transformaciones residuales.
 */
export function Laptop({ src, alt, width, height, srcSet, sizes, eager, progress }: Shot & { progress?: MotionValue<number> }) {
  const lid = useTransform(progress ?? OPEN, [0, 1], [-88, 0])
  return (
    <div className={styles.macWrap}>
      <div className={styles.mac}>
        {progress && (
          <div className={styles.macDeck} aria-hidden="true">
            <div className={`${styles.macPower} ${styles.macPowerFront}`} />
          </div>
        )}
        <m.div className={styles.macLid} style={progress ? { rotateX: lid } : undefined}>
          <div className={styles.macFrame}>
            <img
              className={styles.macScreen}
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              width={width}
              height={height}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className={styles.macNotch} aria-hidden="true" />
          </div>
          {progress && <div className={styles.macBack} aria-hidden="true" />}
        </m.div>
        {!progress && <div className={styles.macPower} aria-hidden="true" />}
      </div>
    </div>
  )
}
