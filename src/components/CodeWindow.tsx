import type { ReactNode } from 'react'
import type { CodeLanguage } from '../types'
import styles from './CodeWindow.module.css'

const KEYWORDS: Record<CodeLanguage, string[]> = {
  python: ['from', 'import', 'def', 'return', 'raise', 'if', 'not', 'and', 'or', 'in', 'for', 'try', 'except', 'with', 'as', 'class', 'None', 'True', 'False', 'self', 'is'],
  java: ['final', 'class', 'static', 'int', 'switch', 'case', 'return', 'default', 'private', 'public', 'void', 'new'],
  bash: ['git', 'cd'],
  json: ['true', 'false', 'null'],
  cpp: ['if', 'else', 'return', 'for', 'while', 'void', 'byte', 'int', 'float', 'char', 'const', 'volatile', 'unsigned', 'long'],
}

// Un único patrón con grupos: comentario, cadena, número, anotación, palabra.
const TOKEN =
  /(#[^\n]*|\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("""[\s\S]*?"""|f?"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(@\w+)|([A-Za-z_][\w.]*)/g

function highlight(code: string, lang: CodeLanguage): ReactNode[] {
  const out: ReactNode[] = []
  const keywords = new Set(KEYWORDS[lang])
  let last = 0
  let i = 0
  for (const m of code.matchAll(TOKEN)) {
    const at = m.index ?? 0
    if (at > last) out.push(code.slice(last, at))
    const [text, comment, str, num, deco, word] = m
    let cls: string | undefined
    if (comment && lang === 'cpp' && text.startsWith('#')) cls = styles.deco
    else if (comment && !(lang === 'json')) cls = styles.comment
    else if (str) cls = lang === 'json' && code[at + text.length] === ':' ? styles.key : styles.string
    else if (num) cls = styles.number
    else if (deco) cls = styles.deco
    else if (word && keywords.has(word)) cls = styles.keyword
    else if (word && code[at + text.length] === '(') cls = styles.fn
    else if (word && /^[A-Z]/.test(word)) cls = styles.type
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : text)
    last = at + text.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

/** Ventana de editor con resaltado de sintaxis para fragmentos reales de los repositorios. */
export function CodeWindow({
  filename,
  language,
  code,
  compact = false,
}: {
  filename: string
  language: CodeLanguage
  code: string
  compact?: boolean
}) {
  return (
    <figure className={`${styles.window} ${compact ? styles.compact : ''}`}>
      <figcaption className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.file}>{filename}</span>
      </figcaption>
      <pre className={styles.pre}>
        <code>{highlight(code, language)}</code>
      </pre>
    </figure>
  )
}
