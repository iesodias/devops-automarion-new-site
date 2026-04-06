import {
  Target,
  Cloud,
  GitBranch,
  Brain,
  GitFork,
  GraduationCap,
} from 'lucide-react'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { useInView } from '../../hooks/useInView'
import { differentials } from '../../data/skills'
import { SECTIONS } from '../../constants/routes'

const iconMap = { Target, Cloud, GitBranch, Brain, Github: GitFork, GraduationCap }

const iconBgColors = [
  'bg-primary',
  'bg-purple',
  'bg-orange',
  'bg-pink',
  'bg-primary',
  'bg-purple',
]

export default function Differentials() {
  const [ref, isInView] = useInView({ threshold: 0.05 })

  return (
    <section
      id={SECTIONS.DIFFERENTIALS}
      ref={ref}
      className="py-20 md:py-28 bg-gray-bg dark:bg-[#12122a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(28px)',
            transition:
              'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <SectionTitle
            title="Por que Aprender Comigo"
            subtitle="Diferenciais que fazem a diferença na sua evolução profissional."
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {differentials.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <div
                key={item.title}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s`,
                }}
              >
                <Card className="bg-white dark:bg-[#1e1e3a] h-full">
                  {/* Icon */}
                  <div
                    className={[
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      iconBgColors[index % iconBgColors.length],
                    ].join(' ')}
                  >
                    {Icon && (
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-primary dark:text-white mt-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-muted dark:text-gray-light text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
