import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/certifications'
import { ExternalLink } from '../components/ExternalLink'
import { formatYearMonth } from '../utils/format'
import styles from './Certifications.module.css'

export function Certifications() {
  return (
    <section id="certificaciones" className={`${styles.section} on-accent`} aria-labelledby="cert-title">
      <div className={`wrap ${styles.top}`} data-reveal>
        <h2 id="cert-title" className={styles.heading}>
          Certificaciones
        </h2>
        <p className={styles.intro}>
          Cada credencial enlaza a la verificación de la institución que la emitió.
        </p>
      </div>

      {certifications.length === 0 ? (
        <p className={`wrap ${styles.empty}`}>Las certificaciones se publicarán aquí cuando estén verificadas.</p>
      ) : (
        <ol className={styles.list}>
          {certifications.map((c) => (
            <li key={c.credentialId} className={`wrap ${styles.row}`}>
              <h3 className={styles.name}>{c.name}</h3>
              <p className={styles.issuer}>
                {c.issuer}
                <span className={styles.date}>
                  Expedida en {formatYearMonth(c.issued)}
                  {c.expires ? ` · vence en ${formatYearMonth(c.expires)}` : ''}
                </span>
              </p>
              <p className={styles.id}>
                <span className="visually-hidden">ID de la credencial: </span>
                {c.credentialId}
              </p>
              {c.verifyUrl ? (
                <ExternalLink href={c.verifyUrl} className={styles.verify}>
                  Verificar <ArrowUpRight size={18} aria-hidden="true" />
                </ExternalLink>
              ) : (
                <span className={styles.verifyMissing}>Sin enlace de verificación</span>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
