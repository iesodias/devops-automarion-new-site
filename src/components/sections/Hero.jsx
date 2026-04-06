import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { personal } from '../../data/personal'
import { SECTIONS } from '../../constants/routes'
import { scrollToSection } from '../../utils/smoothScroll'

const techStack = [
  'Kubernetes',
  'Terraform',
  'Azure',
  'AWS',
  'Docker',
  'GitHub Actions',
]

const terminalLines = [
  { prompt: '~$', cmd: 'terraform init', delay: 0 },
  { prompt: '~$', cmd: 'kubectl apply -f deploy.yaml', delay: 1 },
  { prompt: '~$', cmd: 'docker build -t app:latest .', delay: 2 },
  { prompt: '', cmd: '✓ Deploy successful', delay: 3 },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const stagger = (index) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
  })

  return (
    <section
      id={SECTIONS.HERO}
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Subtle top-right ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-primary/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-orange/[0.05] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Content ── */}
          <div className="max-w-xl">
            {/* Badge */}
            <div style={stagger(0)}>
              <Badge>DevOps &bull; Cloud &bull; Automação</Badge>
            </div>

            {/* Headline */}
            <h1
              style={stagger(1)}
              className="mt-6 font-heading text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl"
            >
              {personal.tagline.split('. ').map((sentence, i, arr) => (
                <span key={i}>
                  {i === 0 ? (
                    <>
                      <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">
                        {sentence}
                      </span>
                      {i < arr.length - 1 ? '. ' : ''}
                    </>
                  ) : (
                    <>
                      {sentence}
                      {i < arr.length - 1 ? '. ' : ''}
                    </>
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              style={stagger(2)}
              className="mt-6 max-w-lg text-lg leading-relaxed text-gray-muted"
            >
              {personal.subtitle}
            </p>

            {/* CTA Buttons */}
            <div style={stagger(3)} className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection(SECTIONS.COURSES)}
                icon={Play}
              >
                Conhecer Cursos
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection(SECTIONS.PORTFOLIO)}
                icon={ArrowRight}
              >
                Ver Portfólio
              </Button>
            </div>

            {/* Tech badges */}
            <div style={stagger(4)} className="mt-10 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* ── Right: Decorative Visual ── */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="relative mx-auto aspect-square max-w-md">
              {/* Floating gradient blobs */}
              <div className="absolute -top-4 -right-4 h-72 w-72 animate-[heroFloat_6s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-primary/15 to-purple/10 blur-2xl" />
              <div className="absolute bottom-8 -left-8 h-56 w-56 animate-[heroFloat_8s_ease-in-out_infinite_1s] rounded-full bg-gradient-to-tr from-orange/12 to-pink/8 blur-2xl" />
              <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-[heroFloat_7s_ease-in-out_infinite_0.5s] rounded-full bg-gradient-to-r from-purple/10 to-primary/10 blur-xl" />

              {/* Terminal mockup */}
              <div className="relative z-10 mx-auto mt-8 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-light bg-white shadow-xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-gray-light bg-gray-bg px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-pink/60" />
                  <span className="h-3 w-3 rounded-full bg-orange/60" />
                  <span className="h-3 w-3 rounded-full bg-primary/40" />
                  <span className="ml-2 font-mono text-xs text-gray-muted">
                    terminal
                  </span>
                </div>

                {/* Terminal body */}
                <div className="p-5 font-mono text-sm leading-7">
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted
                          ? 'translateX(0)'
                          : 'translateX(-12px)',
                        transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.8 + line.delay * 0.25}s`,
                      }}
                    >
                      {line.prompt && (
                        <span className="text-orange">{line.prompt} </span>
                      )}
                      <span
                        className={
                          line.prompt ? 'text-primary' : 'text-purple font-semibold'
                        }
                      >
                        {line.cmd}
                      </span>
                    </div>
                  ))}
                  <div
                    className="mt-1 inline-block h-4 w-2 animate-[blink_1s_step-end_infinite] bg-primary"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transition: 'opacity 0.5s 2s',
                    }}
                  />
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
