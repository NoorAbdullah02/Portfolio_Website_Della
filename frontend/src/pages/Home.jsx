import Navbar from '../components/Navbar.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Education from '../components/Education.jsx'
import Experience from '../components/Experience.jsx'
import Research from '../components/Research.jsx'
import Projects from '../components/Projects.jsx'
import Publications from '../components/Publications.jsx'
import Achievements from '../components/Achievements.jsx'
import Contact from '../components/Contact.jsx'
import AIChat from '../components/AIChat.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'
import useSpotlight from '../hooks/useSpotlight.js'

export default function Home() {
  useReveal()
  useSpotlight()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Research />
        <Projects />
        <Publications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </>
  )
}
