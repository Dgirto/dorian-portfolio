import { stack } from '../data/stack'
import { ExternalLink } from '../components/ExternalLink'
import { Reveal } from '../components/Reveal'
import type { StackItem } from '../types'
import styles from './Stack.module.css'

// Tamaño de cada baldosa del mosaico, en el orden de src/data/stack.ts.
const spans = ['wide', 'normal', 'normal', 'normal', 'normal', 'normal', 'wide']

function Evidence({ item }: { item: StackItem }) {
  if (!item.href) return <span className={styles.evidence}>{item.evidence}</span>
  if (item.href.startsWith('#'))
    return (
      <a className={styles.evidence} href={item.href}>
        {item.evidence}
      </a>
    )
  return (
    <ExternalLink className={styles.evidence} href={item.href}>
      {item.evidence}
    </ExternalLink>
  )
}

export function Stack() {
  return (
    <section id="stack" className={`${styles.section} defer`} aria-labelledby="stack-title">
      <div className={styles.head}>
        <Reveal>
          <h2 id="stack-title" className="section-title">
            Stack, con evidencia.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-lead">
            Sin porcentajes inventados: cada herramienta indica dónde puedes verla en uso.
          </p>
        </Reveal>
      </div>

      <ul className={styles.bento}>
        {stack.map((group, i) => (
          <Reveal as="li" key={group.name} delay={(i % 3) * 0.08} className={`${styles.tile} ${styles[spans[i] ?? 'normal']}`}>
            <h3 className={styles.tileTitle}>{group.name}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className={styles.name}>{item.name}</span>
                  <Evidence item={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
