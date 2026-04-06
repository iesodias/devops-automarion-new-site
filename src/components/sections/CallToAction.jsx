import { Rocket, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import { useInView } from '../../hooks/useInView'
import { SECTIONS } from '../../constants/routes'
import { scrollToSection } from '../../utils/smoothScroll'

export default function CallToAction() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  const reveal = (delay = 0) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  })

  return (
    <section id={SECTIONS.CTA} ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Card wrapper */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-bg p-10 md:p-16 text-center">
          {/* ── Decorative blobs ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 w-60 h-60 bg-orange/10 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple/[0.04] rounded-full blur-2xl"
          />

          {/* Small floating dot accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-10 w-2 h-2 rounded-full bg-orange/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-12 left-12 w-3 h-3 rounded-full bg-primary/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/3 top-8 w-2 h-2 rounded-full bg-pink/30"
          />

          {/* ── Content ── */}
          <div className="relative z-10">
            {/* Decorative icon */}
            <div style={reveal(0)} className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple flex items-center justify-center">
                <Rocket size={26} className="text-white" />
              </div>
            </div>

            <h2
              style={reveal(0.05)}
              className="text-3xl md:text-4xl font-heading font-bold text-primary max-w-2xl mx-auto leading-tight"
            >
              Pronto para Levar Sua Carreira ao{' '}
              <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">
                Próximo Nível
              </span>
              ?
            </h2>

            <p
              style={reveal(0.12)}
              className="text-lg text-gray-muted mt-5 max-w-2xl mx-auto leading-relaxed"
            >
              Escolha um curso, explore meus projetos ou entre em contato para
              uma parceria.
            </p>

            <div
              style={reveal(0.2)}
              className="flex justify-center gap-4 mt-9 flex-wrap"
            >
              <Button
                variant="primary"
                size="lg"
                icon={Rocket}
                onClick={() => scrollToSection(SECTIONS.COURSES)}
              >
                Ver Cursos
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={MessageCircle}
                onClick={() => scrollToSection(SECTIONS.CONTACT)}
              >
                Falar Comigo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
