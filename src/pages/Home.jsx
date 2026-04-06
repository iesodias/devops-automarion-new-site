import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Courses from '../components/sections/Courses'
import Portfolio from '../components/sections/Portfolio'
import Differentials from '../components/sections/Differentials'
import Testimonials from '../components/sections/Testimonials'
import CallToAction from '../components/sections/CallToAction'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DevOps, Cloud & Automação | Cursos e Portfólio</title>
        <meta
          name="description"
          content="Especialista em DevOps, Cloud e Automação. Cursos práticos de Terraform, Kubernetes, Azure, AWS e GitHub Actions. Aprenda com projetos reais."
        />
      </Helmet>
      <Hero />
      <About />
      <Courses />
      <Portfolio />
      <Differentials />
      <Testimonials />
      <CallToAction />
      <Contact />
    </>
  )
}
