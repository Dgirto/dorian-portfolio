import { describe, expect, it } from 'vitest'
import { summarize, type GithubRepo } from './github'

const repo = (name: string, pushed: string, language: string | null, extra: Partial<GithubRepo> = {}): GithubRepo => ({
  name,
  html_url: `https://github.com/x/${name}`,
  description: null,
  language,
  stargazers_count: 0,
  pushed_at: pushed,
  updated_at: pushed,
  fork: false,
  archived: false,
  ...extra,
})

describe('summarize', () => {
  const repos = [
    repo('a', '2026-01-01T00:00:00Z', 'Python'),
    repo('b', '2026-03-01T00:00:00Z', 'Python'),
    repo('c', '2026-02-01T00:00:00Z', 'Java'),
    repo('fork', '2026-12-01T00:00:00Z', 'Go', { fork: true }),
  ]

  it('ordena por último push e ignora forks', () => {
    const s = summarize({ login: 'x', public_repos: 4, html_url: '' }, repos)
    expect(s.lastPushed?.name).toBe('b')
    expect(s.recent.map((r) => r.name)).toEqual(['b', 'c', 'a'])
  })

  it('calcula el lenguaje más usado', () => {
    expect(summarize({ login: 'x', public_repos: 4, html_url: '' }, repos).topLanguage).toBe('Python')
  })

  it('soporta una cuenta vacía', () => {
    const s = summarize({ login: 'x', public_repos: 0, html_url: '' }, [])
    expect(s).toEqual({ publicRepos: 0, topLanguage: null, lastPushed: null, recent: [] })
  })
})
