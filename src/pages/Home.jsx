import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Courses from '../components/sections/Courses'
import Portfolio from '../components/sections/Portfolio'
import Differentials from '../components/sections/Differentials'
import Testimonials from '../components/sections/Testimonials'
import CallToAction from '../components/sections/CallToAction'
import Contact from '../components/sections/Contact'
import JsonLd from '../components/seo/JsonLd'
import { courses } from '../data/courses'
import { personal } from '../data/personal'

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevOps Automation',
    url: 'https://iesodias.com/',
    description: 'Plataforma completa de cursos e portfólio DevOps por Ieso Dias',
    author: { '@type': 'Person', name: personal.name },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: 'DevOps Engineer',
    url: 'https://iesodias.com/',
    sameAs: [
      personal.social.github,
      personal.social.linkedin,
      'https://devopsautomation.com.br/blog',
    ],
    description:
      'DevOps Engineer especializado em Cloud, Automação e Infrastructure as Code',
  }

  const coursesSchemas = courses.map((course) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Person',
      name: personal.name,
    },
    url: course.url,
  }))

  return (
    <>
      <Helmet>
        <title>DevOps Automation | DevOps, Cloud & Automação — Ieso Dias</title>
        <meta
          name="description"
          content="Plataforma completa de cursos e portfólio DevOps por Ieso Dias. Aprenda automação, cloud computing e práticas modernas de infraestrutura."
        />
        <link rel="canonical" href="https://iesodias.com/" />
        <meta
          property="og:title"
          content="DevOps Automation | DevOps, Cloud & Automação"
        />
        <meta
          property="og:description"
          content="Plataforma completa de cursos e portfólio DevOps. Aprenda automação, cloud computing e práticas modernas de infraestrutura."
        />
        <meta property="og:url" content="https://iesodias.com/" />
        <meta
          property="og:image"
          content="https://iesodias.com/assets/images/og-image.png"
        />
        <meta
          name="twitter:title"
          content="DevOps Automation | DevOps, Cloud & Automação"
        />
        <meta
          name="twitter:description"
          content="Plataforma completa de cursos e portfólio DevOps."
        />
      </Helmet>
      <JsonLd data={websiteSchema} />
      <JsonLd data={personSchema} />
      {coursesSchemas.map((courseSchema) => (
        <JsonLd
          key={courseSchema.url}
          data={courseSchema}
        />
      ))}
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
