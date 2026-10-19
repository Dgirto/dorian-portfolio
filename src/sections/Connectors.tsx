import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { connectors } from '../data/connectors'
import { families, familyById } from '../data/families'
import { filterConnectors } from '../utils/search'
import { CableLabel } from '../components/CableLabel'
import { ExternalLink } from '../components/ExternalLink'
import type { Connector, ConnectorFamily } from '../types'
import styles from './Connectors.module.css'

const suggestions = ['postgres', 'correo', 'firewall', 'aws', 'excel']

function ConnectorCard({ connector, onClose }: { connector: Connector; onClose?: () => void }) {
  const fam = familyById[connector.family]
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <CableLabel family={connector.family} code={connector.code} name={fam.label} />
        {onClose && (
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar ficha">
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      <h3 className={styles.cardName}>{connector.name}</h3>
      <p className={styles.cardText}>{connector.description}</p>
      <dl className={styles.cardList}>
        <div>
          <dt>Autenticación</dt>
          <dd>{connector.authModes.join(' · ')}</dd>
        </div>
        <div>
          <dt>Operaciones ({connector.operations.length})</dt>
          <dd>
            <code className={styles.ops}>{connector.operations.join('  ')}</code>
          </dd>
        </div>
      </dl>
      <ExternalLink href={`https://github.com/Dgirto/${connector.repo}`} className={styles.cardLink}>
        Ver repositorio {connector.repo} <ArrowUpRight size={16} aria-hidden="true" />
      </ExternalLink>
    </div>
  )
}

export function Connectors() {
  const [query, setQuery] = useState('')
  const [family, setFamily] = useState<ConnectorFamily | 'todas'>('todas')
  const [selectedId, setSelectedId] = useState<string>('postgresql')
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const inputId = useId()

  const matches = useMemo(() => filterConnectors(connectors, deferredQuery, family), [deferredQuery, family])
  const matchIds = useMemo(() => new Set(matches.map((c) => c.id)), [matches])
  const filtering = deferredQuery.trim() !== '' || family !== 'todas'

  // Si el filtro deja fuera la ficha elegida, se muestra el primer resultado.
  const activeId = matches.length && !matchIds.has(selectedId) ? matches[0].id : selectedId

  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheetOpen])

  const shown = connectors.find((c) => c.id === (hoverId ?? activeId)) ?? connectors[0]

  const select = (id: string) => {
    setSelectedId(id)
    setSheetOpen(true)
  }

  return (
    <section id="conectores" className={styles.section} aria-labelledby="conectores-title">
      <div className={`wrap ${styles.top}`} data-reveal>
        <h2 id="conectores-title" className={styles.heading}>
          {connectors.length} sistemas conectados
        </h2>
        <p className={styles.intro}>
          Cada fotograma es la guía real de un conector que construí para el catálogo de Ruvic AI. Todos siguen el mismo
          método: librería instalable, manifest, guía bilingüe, prueba de conexión y permisos mínimos.
        </p>
      </div>

      <div className={`wrap ${styles.controls}`}>
        <div className={styles.searchBox}>
          <label htmlFor={inputId} className={styles.searchLabel}>
            ¿Qué sistema necesitas conectar?
          </label>
          <div className={styles.inputWrap}>
            <Search size={20} aria-hidden="true" className={styles.searchIcon} />
            <input
              id={inputId}
              type="search"
              className={styles.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Prueba con postgres, correo, firewall…"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <p className={styles.suggest}>
            {suggestions.map((s) => (
              <button key={s} type="button" className={styles.suggestBtn} onClick={() => setQuery(s)}>
                {s}
              </button>
            ))}
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar por familia">
          <button
            type="button"
            className={styles.filter}
            aria-pressed={family === 'todas'}
            onClick={() => setFamily('todas')}
          >
            Todas
          </button>
          {families.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.filter}
              aria-pressed={family === f.id}
              onClick={() => setFamily(f.id)}
            >
              <span className={styles.filterStripe} style={{ background: f.colorVar }} aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>

        <p className={styles.count} aria-live="polite">
          {filtering
            ? matches.length
              ? `${matches.length} de ${connectors.length} conectores coinciden.`
              : 'Ningún conector coincide todavía. Prueba con otra palabra o escríbeme: puede ser el siguiente.'
            : `${connectors.length} conectores en ${families.length} familias.`}
        </p>
      </div>

      <div className={`wrap ${styles.layout}`}>
        <div className={`${styles.sheet} ${filtering ? styles.filtering : ''}`}>
          {families.map((f) => {
            const items = connectors.filter((c) => c.family === f.id)
            const hits = items.filter((c) => matchIds.has(c.id)).length
            return (
              <div key={f.id} className={styles.run}>
                <h3 className={styles.runTitle}>
                  <span className={styles.runStripe} style={{ background: f.colorVar }} aria-hidden="true" />
                  {f.label}
                  <span className={styles.runCount}>
                    {filtering ? `${hits} de ${items.length}` : items.length}
                  </span>
                </h3>
                <ul className={styles.frames}>
                  {items.map((c) => {
                    const isMatch = matchIds.has(c.id)
                    return (
                      <li key={c.id} className={isMatch ? styles.match : styles.miss}>
                        <button
                          type="button"
                          className={`${styles.frame} ${c.id === activeId ? styles.selected : ''}`}
                          onClick={() => select(c.id)}
                          onMouseEnter={() => setHoverId(c.id)}
                          onMouseLeave={() => setHoverId(null)}
                          onFocus={() => setHoverId(c.id)}
                          onBlur={() => setHoverId(null)}
                          aria-pressed={c.id === activeId}
                          aria-label={`${c.name}${c.code ? `, ${c.code}` : ''}${isMatch ? '' : ' (no coincide)'}`}
                        >
                          <img src={c.frame} alt="" width={480} height={300} loading="lazy" decoding="async" />
                          <CableLabel family={c.family} code={c.code} name={c.name} showCode={false} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <aside className={`${styles.panel} ${sheetOpen ? styles.panelOpen : ''}`} aria-label="Ficha del conector">
          <ConnectorCard connector={shown} onClose={() => setSheetOpen(false)} />
        </aside>
      </div>
    </section>
  )
}
