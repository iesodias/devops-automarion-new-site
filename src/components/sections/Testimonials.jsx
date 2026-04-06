import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { useInView } from '../../hooks/useInView'
import { testimonials } from '../../data/testimonials'
import { SECTIONS } from '../../constants/routes'
import { scrollToSection } from '../../utils/smoothScroll'

function TestimonialCard({ testimonial, index }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const firstLetter = testimonial.name.charAt(0).toUpperCase()

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      <Card className="flex flex-col h-full" hoverable>
        {/* Stylized quote character */}
        <span className="text-5xl leading-none text-orange/30 dark:text-orange/40 font-serif select-none">
          &ldquo;
        </span>

        {/* Testimonial text */}
        <p className="text-gray-body dark:text-gray-light text-sm leading-relaxed italic mt-2 flex-1">
          {testimonial.text}
        </p>

        {/* Author info */}
        <div className="border-t border-gray-light dark:border-white/10 pt-4 mt-6 flex items-center gap-3">
          {/* Avatar circle */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple flex items-center justify-center text-white font-semibold text-sm">
            {firstLetter}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary dark:text-white truncate">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-muted dark:text-gray-light truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function Testimonials() {
  const [ctaRef, ctaInView] = useInView({ threshold: 0.2 })

  return (
    <section id={SECTIONS.TESTIMONIALS} className="py-20 md:py-28 bg-white dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="O Que Dizem Meus Alunos"
          subtitle="Feedback real de quem já passou pelos meus cursos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* CTA below grid */}
        <div
          ref={ctaRef}
          className="text-center mt-12"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}
        >
          <p className="text-gray-muted dark:text-gray-light text-base max-w-lg mx-auto leading-relaxed">
            Junte-se a centenas de profissionais que já evoluíram sua carreira.
          </p>
          <div className="mt-4">
            <Button
              variant="secondary"
              size="md"
              onClick={() => scrollToSection(SECTIONS.COURSES)}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
