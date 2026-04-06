import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { scrollToSection } from '../../utils/smoothScroll'
import { SECTIONS } from '../../constants/routes'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'

const NAV_ITEMS = [
  { label: 'Início', section: SECTIONS.HERO },
  { label: 'Sobre', section: SECTIONS.ABOUT },
  { label: 'Cursos', section: SECTIONS.COURSES },
  { label: 'Portfólio', section: SECTIONS.PORTFOLIO },
  { label: 'Contato', section: SECTIONS.CONTACT },
]

export default function Header({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 bg-white/95 backdrop-blur-sm',
          'transition-shadow duration-300',
          scrolled ? 'shadow-md' : 'shadow-none',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(SECTIONS.HERO)
            }}
            className="flex items-center gap-0.5 font-heading select-none"
          >
            <span className="text-xl md:text-2xl font-bold text-primary">DevOps</span>
            <span className="text-xl md:text-2xl font-bold text-orange">Automation</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {NAV_ITEMS.map(({ label, section }) => {
              const isActive = activeSection === section
              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => scrollToSection(section)}
                  className={[
                    'relative px-3 py-2 text-sm font-medium rounded-md',
                    'transition-colors duration-200 cursor-pointer',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-body hover:text-primary',
                  ].join(' ')}
                >
                  {label}
                  {/* Active indicator */}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute bottom-0 left-1/2 -translate-x-1/2',
                      'h-0.5 rounded-full bg-orange',
                      'transition-all duration-300 ease-out',
                      isActive ? 'w-5 opacity-100' : 'w-0 opacity-0',
                    ].join(' ')}
                  />
                </button>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToSection(SECTIONS.COURSES)}
              >
                Ver Cursos
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-primary hover:bg-gray-bg transition-colors cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  )
}
