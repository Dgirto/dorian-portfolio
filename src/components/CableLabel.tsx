import type { ConnectorFamily } from '../types'
import { familyById } from '../data/families'
import styles from './CableLabel.module.css'

interface Props {
  family: ConnectorFamily
  code: string | null
  name: string
  tone?: 'ink' | 'paper'
  showCode?: boolean
}

/** Etiqueta de cable: franja del color del par + código del catálogo + nombre. */
export function CableLabel({ family, code, name, tone = 'paper', showCode = true }: Props) {
  return (
    <span className={`${styles.label} ${tone === 'ink' ? styles.onInk : ''} ${showCode ? '' : styles.wrap}`}>
      <span className={styles.stripe} style={{ background: familyById[family].colorVar }} aria-hidden="true" />
      {showCode && code && <span className={styles.code}>{code}</span>}
      <span className={styles.name}>{name}</span>
    </span>
  )
}
