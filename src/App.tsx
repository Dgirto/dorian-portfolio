import { useEffect } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Philosophy } from './sections/Philosophy'
import { Projects } from './sections/Projects'
import { AllProjects } from './sections/AllProjects'
import { Stack } from './sections/Stack'
import { Certifications } from './sections/Certifications'
import { GitHubLive } from './sections/GitHubLive'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  const esProyectos = window.location.pathname.replace(/\/$/, '') === '/proyectos'

  // Al llegar con un ancla, la sección aún no existía cuando el navegador intentó ir a ella.
  useEffect(() => {
    const destino = window.location.hash && document.querySelector(window.location.hash)
    if (!destino) return
    const ir = () => destino.scrollIntoView({ behavior: 'instant', block: 'start' })
    ir()
    // Las secciones diferidas cambian de altura al dibujarse: se corrige la posición una vez.
    const id = window.setTimeout(ir, 450)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        {esProyectos ? (
          <AllProjects />
        ) : (
          <>
            <Hero />
            <About />
            <Certifications />
            <Philosophy />
            <Projects />
            <Stack />
            <GitHubLive />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
