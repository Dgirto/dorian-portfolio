import { SiteHeader } from './components/SiteHeader'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Connectors } from './sections/Connectors'
import { Stack } from './sections/Stack'
import { GitHub } from './sections/GitHub'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Connectors />
        <Stack />
        <GitHub />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
