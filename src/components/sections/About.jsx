import { useState } from 'react'
import Badge from '../ui/Badge'
import SectionTitle from '../ui/SectionTitle'
import Counter from '../ui/Counter'
import { useInView } from '../../hooks/useInView'
import { personal } from '../../data/personal'
import { SECTIONS } from '../../constants/routes'
import { assetPath } from '../../utils/assetPath'

const techBadges = [
  'Kubernetes',
  'Terraform',
  'Docker',
  'Azure',
  'AWS',
  'GitHub Actions',
  'Ansible',
  'Linux',
]

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [imageLoaded, setImageLoaded] = useState(true)

  const reveal = (delay = 0) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  })

  return (
    <section id={SECTIONS.ABOUT} className="py-20 md:py-28 bg-white dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div style={reveal(0)}>
          <SectionTitle
            title="Sobre Mim"
            subtitle="Conheça minha trajetória e o que me motiva a ensinar DevOps e Cloud."
          />
        </div>

        {/* ── Two-column content ── */}
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16"
        >
          {/* ━━ Left — visual placeholder ━━ */}
          <div
            style={reveal(0.1)}
            className="rounded-2xl overflow-hidden aspect-square max-w-md mx-auto w-full bg-gray-bg dark:bg-[#1e1e3a] relative"
          >
            {personal.photo && imageLoaded ? (
              <img
                src={assetPath(personal.photo)}
                alt={personal.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setImageLoaded(false)}
              />
            ) : (
              <>
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-purple/[0.06]" />

                {/* Decorative large initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-[10rem] font-extrabold text-primary/[0.06] dark:text-white/[0.04] select-none leading-none tracking-tight">
                    {personal.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>

                {/* Terminal-style info block */}
                <div className="absolute inset-6 flex items-end justify-center pb-4">
                  <div className="w-full max-w-xs bg-white/90 dark:bg-dark/90 backdrop-blur-sm rounded-xl border border-gray-light dark:border-white/10 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-orange/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/30" />
                      <span className="ml-auto font-mono text-[10px] text-gray-muted/60 dark:text-gray-light/60">
                        terminal
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-gray-muted dark:text-gray-light leading-relaxed">
                      <span className="text-primary">$</span> whoami{'\n'}
                      <br />
                      <span className="text-primary/70">
                        {personal.name.toLowerCase().replace(/\s+/g, '.')}
                      </span>
                      <br />
                      <span className="text-primary">$</span> role{'\n'}
                      <br />
                      <span className="text-orange-dark">{personal.role}</span>
                      <br />
                      <span className="text-primary">$</span> passion{'\n'}
                      <br />
                      <span className="text-purple">
                        &quot;Ensinar DevOps na prática&quot;
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ━━ Right — text content ━━ */}
          <div style={reveal(0.2)}>
            <Badge>{personal.role}</Badge>

            <p className="text-lg text-gray-body dark:text-gray-light leading-relaxed mt-5">
              {personal.bio}
            </p>

            <p className="text-lg text-gray-body dark:text-gray-light leading-relaxed mt-4">
              Acredito que a melhor forma de aprender é construindo. Por isso,
              todos os meus cursos e conteúdos são baseados em projetos reais,
              com ferramentas que o mercado usa no dia a dia.
            </p>

            {/* Tech badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {techBadges.map((tech, i) => (
                <Badge
                  key={tech}
                  variant={['default', 'orange', 'purple', 'pink'][i % 4]}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ── Counters row ── */}
        <div style={reveal(0.3)} className="mt-16 bg-gray-bg dark:bg-white/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter
              end={personal.stats.yearsExperience}
              label="Anos de Experiência"
            />
            <Counter
              end={personal.stats.projectsDelivered}
              label="Projetos Passo a Passo"
            />
            <Counter
              end={personal.stats.studentsFormed}
              label="Alunos Formados"
            />
            <Counter
              end={personal.stats.technologiesMastered}
              label="Tecnologias"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
