// Integración con la API pública de GitHub: sin token, solo datos públicos.
export interface GithubRepo {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  updated_at: string
  fork: boolean
  archived: boolean
}

export interface GithubUser {
  login: string
  public_repos: number
  html_url: string
}

export interface GithubSummary {
  publicRepos: number
  topLanguage: string | null
  lastPushed: GithubRepo | null
  recent: GithubRepo[]
}

export type GithubErrorKind = 'rate-limit' | 'network' | 'not-found' | 'unknown'

export class GithubError extends Error {
  readonly kind: GithubErrorKind
  readonly resetAt: Date | null

  constructor(kind: GithubErrorKind, resetAt: Date | null = null) {
    super(kind)
    this.kind = kind
    this.resetAt = resetAt
  }
}

export function summarize(user: GithubUser, repos: GithubRepo[], recentCount = 6): GithubSummary {
  const own = repos.filter((r) => !r.fork && !r.archived)
  const byPush = [...own].sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
  const counts = new Map<string, number>()
  for (const r of own) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
  let topLanguage: string | null = null
  let best = 0
  for (const [lang, n] of counts) if (n > best) [topLanguage, best] = [lang, n]
  return {
    publicRepos: user.public_repos,
    topLanguage,
    lastPushed: byPush[0] ?? null,
    recent: byPush.slice(0, recentCount),
  }
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    throw new GithubError('network')
  }
  if (res.status === 403 || res.status === 429) {
    const reset = Number(res.headers.get('x-ratelimit-reset'))
    throw new GithubError('rate-limit', reset ? new Date(reset * 1000) : null)
  }
  if (res.status === 404) throw new GithubError('not-found')
  if (!res.ok) throw new GithubError('unknown')
  return (await res.json()) as T
}

export async function fetchGithubSummary(user: string, signal?: AbortSignal): Promise<GithubSummary> {
  const base = `https://api.github.com/users/${encodeURIComponent(user)}`
  const [profile, repos] = await Promise.all([
    getJson<GithubUser>(base, signal),
    getJson<GithubRepo[]>(`${base}/repos?per_page=100&sort=pushed&type=owner`, signal),
  ])
  return summarize(profile, repos)
}
