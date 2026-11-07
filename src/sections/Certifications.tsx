import type { CSSProperties } from 'react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, Expand, X } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { certifications } from '../data/certifications'
import { formatYearMonth } from '../utils/format'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import type { Certification } from '../types'
import styles from './Certifications.module.css'

/** Visor del certificado a tamaño completo, en un diálogo nativo. */
function CertViewer({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (cert && !dialog.open) dialog.showModal()
    if (!cert && dialog.open) dialog.close()
  }, [cert])

  return (
    <dialog
      ref={ref}
      className={styles.viewer}
      aria-label={cert ? `Certificado: ${cert.name}` : 'Certificado'}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {cert && (
        <div className={styles.sheet}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
          <img
            src={`${cert.image.src}.webp`}
            alt={`Certificado ${cert.name}, emitido por ${cert.issuer} a nombre de Dorian Girón Prato`}
            width={cert.image.width}
            height={cert.image.height}
          />
        </div>
      )}
    </dialog>
  )
}

// Primero las verificables: la cuadrícula llena por columnas y quedan a la izquierda.
const ordenadas = [...certifications].sort((a, b) => Number(!a.verifyUrl) - Number(!b.verifyUrl))
const FILAS = Math.ceil(ordenadas.length / 2)

const ANCHO_COMPACTO = '(max-width: 1100px)'

function useCompacta() {
  return useSyncExternalStore(
    (avisar) => {
      const consulta = window.matchMedia(ANCHO_COMPACTO)
      consulta.addEventListener('change', avisar)
      return () => consulta.removeEventListener('change', avisar)
    },
    () => window.matchMedia(ANCHO_COMPACTO).matches,
  )
}

/** Posición de 0 a 1 en la secuencia: fila a fila y, en cada fila, primero la izquierda. */
function orden(indice: number, compacta: boolean) {
  if (compacta) return indice / ordenadas.length
  const columna = indice < FILAS ? 0 : 1
  const fila = columna === 0 ? indice : indice - FILAS
  return (fila * 2 + columna) / ordenadas.length
}

interface CertCardProps {
  cert: Certification
  progress: MotionValue<number>
  order: number
  animar: boolean
  onOpen: () => void
}

/** Tarjeta que aparece según avanza el desplazamiento, ligada a la posición de la lista. */
function CertCard({ cert, progress, order, animar, onOpen }: CertCardProps) {
  const inicio = order * 0.72
  const opacity = useTransform(progress, [inicio, inicio + 0.28], [0, 1])
  const y = useTransform(progress, [inicio, inicio + 0.28], [28, 0])

  return (
    <m.li className={styles.cert} style={animar ? { opacity, y } : undefined}>
      <button type="button" className={styles.thumb} onClick={() => onOpen()} aria-label={`Ver certificado: ${cert.name}`}>
        <img src={`${cert.image.src}-min.webp`} alt="" width={120} height={85} loading="lazy" decoding="async" />
      </button>
      <div className={styles.info}>
        <p className={styles.certName}>{cert.name}</p>
        <p className={styles.certMeta}>
          {cert.issuer} · {formatYearMonth(cert.issued)}
          {cert.expires ? ` · vence ${formatYearMonth(cert.expires)}` : ''}
          {cert.credentialId && !cert.verifyUrl ? ` · ID ${cert.credentialId}` : ''}
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.verify} onClick={() => onOpen()}>
          Ver <Expand size={14} aria-hidden="true" />
          <span className="visually-hidden"> {cert.name}</span>
        </button>
        {cert.verifyUrl && (
          <ExternalLink className={styles.verify} href={cert.verifyUrl}>
            Verificar <ArrowUpRight size={16} aria-hidden="true" />
            <span className="visually-hidden"> {cert.name}</span>
          </ExternalLink>
        )}
      </div>
    </m.li>
  )
}

export function Certifications() {
  const [open, setOpen] = useState<Certification | null>(null)
  const lista = useRef<HTMLUListElement>(null)
  const reduce = useReducedMotion()
  const compacta = useCompacta()
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 88%', 'end 72%'] })

  return (
    <section id="certificaciones" className={`dark grid-lines ${styles.section}`} aria-labelledby="certificaciones-title">
      <div className={styles.grid}>
        <div className={styles.side}>
          <Reveal>
            <h2 id="certificaciones-title" className={`section-title ${styles.title}`}>
              Certificaciones.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-lead">Oracle Academy, SCRUMstudy y Cisco Networking Academy.</p>
          </Reveal>
        </div>

        <ul ref={lista} className={styles.list} style={{ '--filas': FILAS } as CSSProperties}>
          {ordenadas.map((c, i) => (
            <CertCard
              key={c.name}
              cert={c}
              progress={scrollYProgress}
              order={orden(i, compacta)}
              animar={!reduce}
              onOpen={() => setOpen(c)}
            />
          ))}
        </ul>
      </div>
      <CertViewer cert={open} onClose={() => setOpen(null)} />
    </section>
  )
}
