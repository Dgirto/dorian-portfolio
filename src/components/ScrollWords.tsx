import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import styles from './ScrollWords.module.css'

/** Palabra decorativa: el texto se pinta con CSS (attr) para que solo exista una vez en el árbol accesible. */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <m.span className={styles.word} data-word={word} style={{ opacity }} />
}

/** Frase fijada en pantalla cuyas palabras se iluminan a medida que se desplaza la página. */
export function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = text.split(' ')

  if (reduce) {
    return (
      <div className={styles.static}>
        <p className={styles.text}>{text}</p>
      </div>
    )
  }

  return (
    <div ref={ref} className={styles.track}>
      <div className={styles.sticky}>
        <p className={styles.text}>
          <span className="visually-hidden">{text}</span>
          <span aria-hidden="true">
            {words.map((w, i) => {
              const start = (i / words.length) * 0.85
              return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 0.85 / words.length]} />
            })}
          </span>
        </p>
      </div>
    </div>
  )
}
