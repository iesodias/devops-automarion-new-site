import { Link } from 'react-router-dom'
import { ExternalLink, Check, Terminal } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionTitle from '../ui/SectionTitle'
import { useInView } from '../../hooks/useInView'
import { projects } from '../../data/projects'
import { SECTIONS } from '../../constants/routes'

function ProjectVisual({ project }) {
  return (
    <div className="relative h-40 rounded-t-2xl bg-white dark:bg-[#1e1e3a] overflow-hidden">
      {/* Featured left accent */}
      {project.featured && (
        <span className="absolute left-0 inset-y-0 w-1 bg-orange z-10" />
      )}

      {/* Terminal-style header bar */}
      <div className="flex items-center gap-2 px-5 pt-4">
        <span className="w-3 h-3 rounded-full bg-pink/40 dark:bg-pink/60" />
        <span className="w-3 h-3 rounded-full bg-orange/40 dark:bg-orange/60" />
        <span className="w-3 h-3 rounded-full bg-primary/20 dark:bg-primary/40" />
        <span className="ml-3 font-mono text-xs text-primary/40 dark:text-gray-light/40 truncate">
          ~/{project.slug}
        </span>
      </div>

      {/* Decorative tech text watermark */}
      <div className="absolute bottom-3 left-5 right-5 flex flex-col gap-1.5 select-none">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="font-mono text-lg text-primary/[0.06] dark:text-white/[0.06] font-bold leading-tight tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Decorative terminal prompt */}
      <div className="mt-4 px-5 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-primary/25 dark:text-gray-light/25" />
          <div className="h-1.5 w-20 rounded-full bg-primary/8 dark:bg-primary/15" />
          <div className="h-1.5 w-14 rounded-full bg-purple/6 dark:bg-purple/12" />
        </div>
        <div className="flex items-center gap-2 ml-5">
          <div className="h-1.5 w-28 rounded-full bg-primary/5 dark:bg-primary/12" />
          <div className="h-1.5 w-10 rounded-full bg-orange/8 dark:bg-orange/15" />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <article
      ref={ref}
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white dark:bg-[#1e1e3a] p-0 overflow-hidden flex flex-col h-full" hoverable>
        {/* Terminal-style visual header */}
        <ProjectVisual project={project} />

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-lg font-semibold text-primary dark:text-white leading-snug">
            {project.title}
          </h3>

          <p className="text-gray-muted dark:text-gray-light text-sm mt-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="default">+{project.technologies.length - 4}</Badge>
            )}
          </div>

          {/* Highlights (first 2) */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-xs text-gray-muted dark:text-gray-light leading-relaxed"
                >
                  <Check size={13} className="shrink-0 mt-0.5 text-orange" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Action row */}
          <div className="flex gap-3 mt-auto pt-5">
            {project.github && (
              <Button
                variant="ghost"
                size="sm"
                icon={ExternalLink}
                onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
              >
                GitHub
              </Button>
            )}
            <Link to={`/projeto/${project.slug}`}>
              <Button variant="outline" size="sm">
                Ver Detalhes
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </article>
  )
}

export default function Portfolio() {
  return (
    <section id={SECTIONS.PORTFOLIO} className="py-20 md:py-28 bg-gray-bg dark:bg-[#12122a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Projetos que Demonstram na Prática"
          subtitle="Código aberto, infraestrutura real. Veja o que eu construo no dia a dia."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
