import { Mail, Link2, GitFork, Play } from 'lucide-react'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { useInView } from '../../hooks/useInView'
import { personal } from '../../data/personal'
import { SECTIONS } from '../../constants/routes'

/* Lucide-compatible Instagram glyph (not available in lucide-react ≤ 1.x) */
function InstagramIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <circle cx={12} cy={12} r={5} />
      <circle cx={17.5} cy={6.5} r={1.5} fill="currentColor" stroke="none" />
    </svg>
  )
}

const contactItems = [
  { key: 'email', icon: Mail, label: personal.social.email, href: `mailto:${personal.social.email}` },
  { key: 'linkedin', icon: Link2, label: 'LinkedIn', href: personal.social.linkedin, external: true },
  { key: 'github', icon: GitFork, label: 'GitHub', href: personal.social.github, external: true },
  { key: 'youtube', icon: Play, label: 'YouTube', href: personal.social.youtube, external: true },
  { key: 'instagram', icon: InstagramIcon, label: 'Instagram', href: personal.social.instagram, external: true },
]

export default function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id={SECTIONS.CONTACT} className="py-20 md:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Vamos Conversar?"
          subtitle="Entre em contato diretamente pelos canais abaixo."
        />

        {/* ── Centered contact card ── */}
        <div
          ref={ref}
          className="max-w-2xl mx-auto mt-14"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(32px)',
            transition:
              'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-light shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactItems.map(({ key, icon: Icon, label, href, external }, index) => (
                <a
                  key={key}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={[
                    'flex items-center gap-4 group rounded-xl px-4 py-3.5',
                    'transition-all duration-200 ease-out',
                    'hover:bg-orange/[0.04]',
                    // Center the last (odd) item across both columns
                    index === contactItems.length - 1 && contactItems.length % 2 !== 0
                      ? 'md:col-span-2 md:max-w-[50%] md:mx-auto md:w-full'
                      : '',
                  ].join(' ')}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.07}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + index * 0.07}s`,
                  }}
                >
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-badge-bg flex items-center justify-center text-primary transition-colors duration-200 group-hover:bg-orange/10 group-hover:text-orange">
                    <Icon size={20} />
                  </span>
                  <span className="text-gray-body font-medium transition-colors duration-200 group-hover:text-orange truncate">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── CTA + response time ── */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Mail}
              href={`mailto:${personal.social.email}`}
            >
              Envie um E-mail
            </Button>
            <p className="text-sm text-gray-muted">
              Respondo em até 48 horas úteis.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
