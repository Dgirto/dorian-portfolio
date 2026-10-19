import { profile } from '../data/profile'
import { ScrollWords } from '../components/ScrollWords'

/** Capítulo oscuro: la frase se ilumina palabra a palabra con el desplazamiento. */
export function Statement() {
  return (
    <section className="dark" aria-label="Qué hago">
      <ScrollWords text={profile.statement} />
    </section>
  )
}
