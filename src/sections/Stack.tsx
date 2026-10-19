import { stack } from '../data/stack'
import { ExternalLink } from '../components/ExternalLink'
import type { StackItem } from '../types'
import styles from './Stack.module.css'

function Evidence({ item }: { item: StackItem }) {
  if (!item.href) return <span className={styles.value}>{item.evidence}</span>
  if (item.href.startsWith('#'))
    return (
      <a className={styles.value} href={item.href}>
        {item.evidence}
      </a>
    )
  return (
    <ExternalLink className={styles.value} href={item.href}>
      {item.evidence}
    </ExternalLink>
  )
}

export function Stack() {
  return (
    <section id="stack" className={`wrap ${styles.section}`} aria-labelledby="stack-title">
      <div className={styles.side} data-reveal>
        <h2 id="stack-title" className={styles.heading}>
          Stack, con evidencia
        </h2>
        <p className={styles.note}>
          Sin porcentajes ni barras: cada tecnología dice dónde puedes verla. El punto lleno enlaza a código o a una fuente
          pública; el punto hueco marca conocimientos que aún no tienen un repositorio público.
        </p>
      </div>
      <div className={styles.columns}>
        {stack.map((group) => (
          <div key={group.name} className={styles.group} data-reveal>
            <h3 className={styles.groupTitle}>{group.name}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name} className={styles.row}>
                  <span className={styles.left}>
                    <span className={item.href ? styles.dot : styles.ring} aria-hidden="true" />
                    <span className={styles.name}>{item.name}</span>
                  </span>
                  <Evidence item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
