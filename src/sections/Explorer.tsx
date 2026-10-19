import { useDeferredValue, useId, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { connectors } from '../data/connectors'
import { families, familyById } from '../data/families'
import { filterConnectors } from '../utils/search'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import type { ConnectorFamily } from '../types'
import styles from './Explorer.module.css'

const suggestions = ['postgres', 'correo', 'firewall', 'aws', 'excel']

export function Explorer() {
  const [query, setQuery] = useState('')
  const [family, setFamily] = useState<ConnectorFamily | 'todas'>('todas')
  const [selectedId, setSelectedId] = useState('postgresql')
  const [showAll, setShowAll] = useState(false)
  const deferred = useDeferredValue(query)
  const reduce = useReducedMotion()
  const inputId = useId()
  const detailRef = useRef<HTMLDivElement>(null)

  const matches = useMemo(() => filterConnectors(connectors, deferred, family), [deferred, family])
  const selected =
    matches.find((c) => c.id === selectedId) ?? matches[0] ?? connectors.find((c) => c.id === selectedId)!
  const filtering = deferred.trim() !== '' || family !== 'todas'
  // Sin filtro se muestra una muestra corta; el resto, a petición.
  const visible = filtering || showAll ? matches : matches.slice(0, 12)

  const choose = (id: string) => {
    setSelectedId(id)
    if (window.matchMedia('(max-width: 860px)').matches)
      detailRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="conectores" className={`${styles.section} defer`} aria-labelledby="explorer-title">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="explorer-title" className="section-title">
            ¿Qué necesitas conectar?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">
            Busca un sistema y comprueba si ya existe un conector: qué hace, cómo se autentica y dónde está su código.
          </p>
        </Reveal>

        <div className={styles.controls}>
          <label htmlFor={inputId} className="visually-hidden">
            Buscar un sistema
          </label>
          <div className={styles.search}>
            <Search size={20} aria-hidden="true" className={styles.searchIcon} />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="PostgreSQL, correo, firewall…"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button type="button" className={styles.clear} onClick={() => setQuery('')} aria-label="Borrar búsqueda">
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className={styles.suggest}>
            <span>Prueba:</span>
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </p>
          <div className={styles.filters} role="group" aria-label="Filtrar por familia">
            {[{ id: 'todas' as const, label: 'Todas', colorVar: '' }, ...families].map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={family === f.id}
                onClick={() => setFamily(f.id)}
              >
                {f.colorVar && <span className={styles.dot} style={{ background: f.colorVar }} aria-hidden="true" />}
                {f.label}
              </button>
            ))}
          </div>
          <p className={styles.count} aria-live="polite">
            {filtering
              ? matches.length
                ? `${matches.length} de ${connectors.length} conectores.`
                : 'Aún no hay un conector para eso. Escríbeme: puede ser el siguiente.'
              : `${connectors.length} conectores en ${families.length} familias.`}
          </p>
        </div>

        <div className={styles.layout}>
          <ul className={styles.results}>
            {visible.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.result}
                    aria-pressed={c.id === selected.id}
                    onClick={() => choose(c.id)}
                  >
                    <span className={styles.dot} style={{ background: familyById[c.family].colorVar }} aria-hidden="true" />
                    <span className={styles.resultName}>{c.name}</span>
                    {c.code && <span className={styles.resultCode}>{c.code}</span>}
                  </button>
                </li>
              ))}
          </ul>
          {!filtering && !showAll && (
            <button type="button" className={`btn btn-ghost ${styles.showAll}`} onClick={() => setShowAll(true)}>
              Ver los {connectors.length} conectores
            </button>
          )}

          <div ref={detailRef} className={styles.detail} aria-live="polite">
            <AnimatePresence mode="wait">
              <m.article
                key={selected.id}
                className={styles.card}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  className={styles.cardImg}
                  src={selected.frame}
                  alt={`Guía del conector ${selected.name}`}
                  width={480}
                  height={300}
                  loading="lazy"
                  decoding="async"
                />
                <p className={styles.cardMeta}>
                  <span className={styles.dot} style={{ background: familyById[selected.family].colorVar }} aria-hidden="true" />
                  {familyById[selected.family].label}
                  {selected.code && ` · ${selected.code}`}
                </p>
                <h3 className={styles.cardName}>{selected.name}</h3>
                <p className={styles.cardText}>{selected.description.replace(/\.$/, '')}.</p>
                <dl className={styles.cardList}>
                  <div>
                    <dt>Autenticación</dt>
                    <dd>{selected.authModes.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>Operaciones</dt>
                    <dd>
                      <ul className={styles.ops}>
                        {selected.operations.map((o) => (
                          <li key={o}>
                            <code>{o}</code>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
                <ExternalLink className="link-more" href={`https://github.com/Dgirto/${selected.repo}`}>
                  Ver el código en GitHub <ArrowUpRight size={16} aria-hidden="true" />
                </ExternalLink>
              </m.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
