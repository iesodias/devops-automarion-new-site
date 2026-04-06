import { Mail } from 'lucide-react'
import { scrollToSection } from '../../utils/smoothScroll'
import { SECTIONS } from '../../constants/routes'
import { personal } from '../../data/personal'

/* Lightweight brand SVGs — lucide doesn't ship brand icons */
function GitHubIcon({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.62-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  )
}

function LinkedInIcon({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.46A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.23 0Z" />
    </svg>
  )
}

function YouTubeIcon({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.68 31.68 0 0 0 0 12a31.68 31.68 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.68 31.68 0 0 0 24 12a31.68 31.68 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  )
}

function InstagramIcon({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Início', section: SECTIONS.HERO },
  { label: 'Sobre', section: SECTIONS.ABOUT },
  { label: 'Cursos', section: SECTIONS.COURSES },
  { label: 'Portfólio', section: SECTIONS.PORTFOLIO },
  { label: 'Contato', section: SECTIONS.CONTACT },
]

const SOCIAL_LINKS = [
  { Icon: GitHubIcon, href: personal.social.github, label: 'GitHub' },
  { Icon: LinkedInIcon, href: personal.social.linkedin, label: 'LinkedIn' },
  { Icon: YouTubeIcon, href: personal.social.youtube, label: 'YouTube' },
  { Icon: InstagramIcon, href: personal.social.instagram, label: 'Instagram' },
]

const CONTACT_ITEMS = [
  { Icon: Mail, text: personal.social.email, href: `mailto:${personal.social.email}` },
  { Icon: LinkedInIcon, text: 'LinkedIn', href: personal.social.linkedin },
  { Icon: GitHubIcon, text: 'GitHub', href: personal.social.github },
  { Icon: YouTubeIcon, text: 'YouTube', href: personal.social.youtube },
  { Icon: InstagramIcon, text: 'Instagram', href: personal.social.instagram },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary dark:bg-[#0e0e24] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(SECTIONS.HERO)
              }}
              className="inline-flex items-center gap-0.5 font-heading select-none"
            >
              <span className="text-2xl font-bold text-white">DevOps</span>
              <span className="text-2xl font-bold text-orange">Automation</span>
            </a>
            <p className="mt-4 text-white/70 leading-relaxed max-w-xs text-sm">
              {personal.tagline}
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, section }) => (
                <li key={section}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section)}
                    className="text-white/70 hover:text-orange transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-orange transition-colors duration-200 text-sm group"
                  >
                    <Icon
                      size={16}
                      className="shrink-0 text-white/50 group-hover:text-orange transition-colors"
                    />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} {personal.brandName} — Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/50 hover:text-orange transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
