import { useEffect, useState } from 'react'
import { GithubError, fetchGithubSummary, type GithubSummary } from '../utils/github'

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: GithubSummary }
  | { status: 'error'; error: GithubError }

const CACHE_KEY = 'gh-summary-v1'
const TTL_MS = 30 * 60 * 1000

function readCache(): GithubSummary | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw) as { at: number; data: GithubSummary }
    return Date.now() - at < TTL_MS ? data : null
  } catch {
    return null
  }
}

function writeCache(data: GithubSummary) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // Almacenamiento no disponible: se vuelve a pedir en la próxima visita.
  }
}

/** Resumen público del perfil de GitHub, con caché de sesión para no gastar el límite de la API. */
export function useGithubSummary(user: string): State {
  const [state, setState] = useState<State>(() => {
    const cached = readCache()
    return cached ? { status: 'ready', data: cached } : { status: 'loading' }
  })

  useEffect(() => {
    if (state.status === 'ready') return
    const controller = new AbortController()
    fetchGithubSummary(user, controller.signal)
      .then((data) => {
        writeCache(data)
        setState({ status: 'ready', data })
      })
      .catch((err: unknown) => {
        if ((err as Error).name === 'AbortError') return
        setState({ status: 'error', error: err instanceof GithubError ? err : new GithubError('unknown') })
      })
    return () => controller.abort()
    // Solo al montar: el usuario no cambia durante la visita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return state
}
