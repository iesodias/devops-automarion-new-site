import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import {
  ArrowLeft,
  ExternalLink,
  GitFork,
  CheckCircle,
  ChevronRight,
  FolderOpen,
} from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  /* ── Not found ─────────────────────────────────────────── */
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Projeto não encontrado</title>
        </Helmet>

        <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />

          <div
            className={`relative z-10 flex flex-col items-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple to-orange shadow-lg shadow-purple/20">
              <FolderOpen size={36} className="text-white" strokeWidth={1.75} />
            </div>

            <h1 className="mt-7 text-3xl font-heading font-bold text-primary">
              Projeto não encontrado
            </h1>

            <p className="mt-3 max-w-md text-lg text-gray-muted leading-relaxed">
              O projeto que você procura não existe ou foi movido.
            </p>

            {/* Primary CTA */}
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 font-semibold text-white shadow-md shadow-orange/25 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-orange/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50"
            >
              <ArrowLeft size={18} />
              Voltar ao Início
            </Link>

            {/* Secondary hint */}
            <p className="mt-5 text-sm text-gray-muted">
              Ou explore nosso{' '}
              <Link
                to="/#portfolio"
                className="text-orange font-medium hover:underline"
              >
                portfólio completo
              </Link>
            </p>
          </div>
        </section>
      </>
    )
  }

  /* ── Project found ─────────────────────────────────────── */
  return (
    <>
      <Helmet>
        <title>{project.title} | Portfólio DevOps</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* ─── A · Hero / Header ───────────────────────────── */}
      <section className="bg-gray-bg py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-muted">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span>Portfólio</span>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-primary font-medium truncate">
              {project.title}
            </span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-gray-muted mt-4 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              variant="primary"
              size="md"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              icon={GitFork}
            >
              Ver no GitHub
            </Button>

            {project.demo && (
              <Button
                variant="secondary"
                size="md"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                icon={ExternalLink}
              >
                Ver Demo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ─── B · Destaques do Projeto ────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-heading font-bold text-primary">
            Destaques do Projeto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {project.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="text-orange shrink-0 mt-0.5"
                />
                <span className="text-gray-body leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Labs Section (Tech Challenge) ─────────────────── */}
      {project.labs && (() => {
        const providers = Object.entries(project.labs)
        const totalLabs = providers.reduce(
          (sum, [, levels]) =>
            sum + Object.values(levels).reduce((s, arr) => s + arr.length, 0),
          0,
        )
        const totalClouds = providers.length

        const levelLabels = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' }
        const providerMeta = {
          aws:   { label: 'AWS',   emoji: '☁️' },
          azure: { label: 'Azure', emoji: '☁️' },
          gcp:   { label: 'GCP',   emoji: '☁️' },
        }

        const stats = [
          { icon: '🧪', value: totalLabs,    label: 'Labs' },
          { icon: '❓', value: totalLabs,     label: 'Quizzes' },
          { icon: '☁️', value: totalClouds,  label: totalClouds === 1 ? 'Cloud' : 'Clouds' },
        ]

        return (
          <section className="bg-gray-bg py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-8">
                Labs Disponíveis
              </h2>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl p-4 text-center shadow-sm"
                  >
                    <span className="block text-lg" aria-hidden="true">{s.icon}</span>
                    <span className="block text-3xl font-bold text-primary mt-1">
                      {s.value}
                    </span>
                    <span className="block text-sm text-gray-muted mt-0.5">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Provider columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map(([provider, levels]) => {
                  const meta = providerMeta[provider] || { label: provider.toUpperCase(), emoji: '☁️' }

                  return (
                    <div
                      key={provider}
                      className="bg-white rounded-2xl border border-gray-light p-6 shadow-sm"
                    >
                      <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
                        <span aria-hidden="true">{meta.emoji}</span>
                        {meta.label}
                      </h3>

                      {Object.entries(levels).map(([level, labs]) => (
                        <div key={level} className="mt-6">
                          <p className="text-xs font-semibold text-orange uppercase tracking-wider mb-3">
                            {levelLabels[level] || level}
                          </p>

                          <div className="flex flex-col gap-0.5">
                            {labs.map((lab) => (
                              <a
                                key={lab.url}
                                href={lab.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group py-2.5 px-3 rounded-lg hover:bg-orange/5 transition-colors"
                              >
                                <ExternalLink
                                  size={14}
                                  className="text-gray-muted group-hover:text-orange transition-colors shrink-0"
                                />
                                <span className="text-gray-body group-hover:text-primary transition-colors text-sm">
                                  {lab.title}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ─── C · Back navigation ─────────────────────────── */}
      <section className="bg-gray-bg py-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-orange transition-colors font-medium"
        >
          <ArrowLeft size={16} />
          Voltar para o portfólio
        </Link>
      </section>
    </>
  )
}
