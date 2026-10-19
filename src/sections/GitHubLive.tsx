import { ArrowUpRight, RefreshCw } from 'lucide-react'
import { profile } from '../data/profile'
import { useGithubSummary } from '../hooks/useGithubSummary'
import { Counter } from '../components/Counter'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import { formatDate } from '../utils/format'
import type { GithubError } from '../utils/github'
import styles from './GitHubLive.module.css'

function errorMessage(error: GithubError): string {
  if (error.kind === 'rate-limit')
    return error.resetAt
      ? `GitHub limitó las consultas por un momento. Vuelve a intentarlo después de las ${error.resetAt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}.`
      : 'GitHub limitó las consultas por un momento. Vuelve a intentarlo más tarde.'
  if (error.kind === 'network') return 'No pude conectar con GitHub. Revisa tu conexión e inténtalo de nuevo.'
  return 'GitHub no devolvió los datos esperados.'
}

export function GitHubLive() {
  const state = useGithubSummary(profile.githubUser)
  const data = state.status === 'ready' ? state.data : null

  return (
    <section id="github" className={`${styles.section} defer`} aria-labelledby="github-title">
      <div className={styles.inner}>
        <Reveal>
          <h2 id="github-title" className="section-title">
            GitHub, en vivo.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">Datos leídos ahora mismo de la API pública de GitHub.</p>
        </Reveal>

        <dl className={styles.stats} aria-busy={state.status === 'loading'}>
          <Reveal className={styles.stat}>
            <dt>Repositorios públicos</dt>
            <dd className={styles.big}>{data ? <Counter value={data.publicRepos} /> : '—'}</dd>
          </Reveal>
          <Reveal className={styles.stat} delay={0.08}>
            <dt>Lenguaje más usado</dt>
            <dd className={styles.big}>{data?.topLanguage ?? '—'}</dd>
          </Reveal>
          <Reveal className={styles.stat} delay={0.16}>
            <dt>Último push</dt>
            <dd className={styles.mid}>{data?.lastPushed?.name ?? '—'}</dd>
            {data?.lastPushed && <dd className={styles.small}>{formatDate(data.lastPushed.pushed_at)}</dd>}
          </Reveal>
        </dl>

        {state.status === 'loading' && <p className={styles.state}>Consultando GitHub…</p>}
        {state.status === 'error' && (
          <div className={styles.state} role="status">
            <p>{errorMessage(state.error)}</p>
            <p className={styles.stateActions}>
              <button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>
                <RefreshCw size={16} aria-hidden="true" /> Reintentar
              </button>
              <ExternalLink className="link-more" href={`${profile.links.github.href}?tab=repositories`}>
                Ver repositorios en GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </ExternalLink>
            </p>
          </div>
        )}
        {data && data.recent.length === 0 && <p className={styles.state}>Todavía no hay repositorios públicos.</p>}
        {data && data.recent.length > 0 && (
          <>
            <h3 className={styles.recentTitle}>Actividad reciente</h3>
            <ul className={styles.recent}>
              {data.recent.map((r) => (
                <li key={r.name}>
                  <ExternalLink className={styles.repo} href={r.html_url}>
                    <span className={styles.repoName}>{r.name}</span>
                    <span className={styles.repoDesc}>{r.description || 'Sin descripción'}</span>
                    <span className={styles.repoMeta}>
                      {r.language ?? 'Sin lenguaje'} · {formatDate(r.pushed_at)}
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </>
        )}
        <ExternalLink className="link-more" href={profile.links.github.href}>
          Ver perfil completo <ArrowUpRight size={16} aria-hidden="true" />
        </ExternalLink>
      </div>
    </section>
  )
}
