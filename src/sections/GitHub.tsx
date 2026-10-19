import { ArrowUpRight, RefreshCw } from 'lucide-react'
import { profile } from '../data/profile'
import { useGithubSummary } from '../hooks/useGithubSummary'
import { ExternalLink } from '../components/ExternalLink'
import { formatDate } from '../utils/format'
import type { GithubError } from '../utils/github'
import styles from './GitHub.module.css'

const COLS = 6
const ROWS = 4
// Baldosas de color, nunca adyacentes: [fila, columna] empezando en 0.
const SLOTS = { heading: [0, 0], f1: [0, 4], f2: [1, 5], f3: [2, 1], action: [3, 4] } as const

function errorMessage(error: GithubError): string {
  if (error.kind === 'rate-limit')
    return error.resetAt
      ? `La API pública de GitHub limitó las consultas; se libera a las ${error.resetAt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}.`
      : 'La API pública de GitHub limitó las consultas por ahora.'
  if (error.kind === 'network') return 'No se pudo contactar con GitHub. Revisa tu conexión.'
  return 'GitHub no devolvió los datos esperados.'
}

export function GitHub() {
  const state = useGithubSummary(profile.githubUser)
  const data = state.status === 'ready' ? state.data : null
  const pending = state.status === 'loading' ? 'Cargando…' : '—'

  const facts = {
    f1: { value: data ? String(data.publicRepos) : pending, label: 'repositorios públicos' },
    f2: { value: data?.topLanguage ?? pending, label: 'lenguaje más usado' },
    f3: {
      value: data?.lastPushed?.name ?? pending,
      label: data?.lastPushed ? `último push, ${formatDate(data.lastPushed.pushed_at)}` : 'último push',
    },
  }

  const tiles = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const slot = (Object.entries(SLOTS) as [keyof typeof SLOTS, readonly [number, number]][]).find(
        ([, [sr, sc]]) => sr === r && sc === c,
      )?.[0]
      const i = r * COLS + c
      if (!slot) {
        // Cada baldosa es su propio recorte de la foto: 6×4 en escritorio, 3×8 en el teléfono.
        tiles.push(
          <picture key={`${r}-${c}`} className={styles.photo}>
            <source media="(max-width: 767px)" srcSet={`/work/mosaic/m-${Math.floor(i / 3)}-${i % 3}.webp`} />
            <img src={`/work/mosaic/d-${r}-${c}.webp`} alt="" width={400} height={400} loading="lazy" decoding="async" />
          </picture>,
        )
      } else if (slot === 'heading') {
        tiles.push(
          <div key="heading" className={`${styles.tile} ${styles.inkTile}`}>
            <h2 id="github-title" className={styles.heading}>
              En GitHub
            </h2>
          </div>,
        )
      } else if (slot === 'action') {
        tiles.push(
          <ExternalLink key="action" href={profile.links.github.href} className={`${styles.tile} ${styles.actionTile}`}>
            <span className={styles.actionText}>
              Abrir perfil
              <span className={styles.actionHandle}>github.com/{profile.githubUser}</span>
            </span>
            <ArrowUpRight size={36} strokeWidth={2.5} aria-hidden="true" className={styles.arrow} />
          </ExternalLink>,
        )
      } else {
        const f = facts[slot]
        tiles.push(
          <div key={slot} className={`${styles.tile} ${styles.factTile}`}>
            <p className={styles.factValue}>{f.value}</p>
            <p className={styles.factLabel}>{f.label}</p>
          </div>,
        )
      }
    }
  }

  return (
    <section id="github" className={styles.section} aria-labelledby="github-title">
      <div className={styles.board} aria-busy={state.status === 'loading'}>
        {tiles}
      </div>

      <div className={`wrap ${styles.recent}`} data-reveal>
        <h3 className={styles.recentTitle}>Actividad reciente</h3>
        {state.status === 'loading' && <p className={styles.state}>Consultando la API pública de GitHub…</p>}
        {state.status === 'error' && (
          <div className={styles.state} role="status">
            <p>{errorMessage(state.error)}</p>
            <p className={styles.stateActions}>
              <button type="button" className={styles.retry} onClick={() => window.location.reload()}>
                <RefreshCw size={16} aria-hidden="true" /> Reintentar
              </button>
              <ExternalLink href={`${profile.links.github.href}?tab=repositories`}>Ver repositorios en GitHub</ExternalLink>
            </p>
          </div>
        )}
        {data && data.recent.length === 0 && <p className={styles.state}>Todavía no hay repositorios públicos.</p>}
        {data && data.recent.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visually-hidden">Repositorios públicos actualizados más recientemente</caption>
              <thead>
                <tr>
                  <th scope="col">Repositorio</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Lenguaje</th>
                  <th scope="col">Estrellas</th>
                  <th scope="col">Último push</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">
                      <ExternalLink href={r.html_url}>{r.name}</ExternalLink>
                    </th>
                    <td className={styles.desc}>{r.description || 'Sin descripción'}</td>
                    <td>{r.language ?? '—'}</td>
                    <td className={styles.num}>{r.stargazers_count}</td>
                    <td className={styles.num}>{formatDate(r.pushed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
