import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Statement } from './sections/Statement'
import { ConnectorWall } from './sections/ConnectorWall'
import { Projects } from './sections/Projects'
import { Explorer } from './sections/Explorer'
import { Stack } from './sections/Stack'
import { Journey } from './sections/Journey'
import { GitHubLive } from './sections/GitHubLive'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <About />
        <Statement />
        <ConnectorWall />
        <Projects />
        <Explorer />
        <Stack />
        <Journey />
        <GitHubLive />
        <Contact />
      </main>
      <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
