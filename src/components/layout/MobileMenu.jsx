import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { scrollToSection } from '../../utils/smoothScroll'
import { SECTIONS } from '../../constants/routes'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_ITEMS = [
  { label: 'Início', section: SECTIONS.HERO },
  { label: 'Sobre', section: SECTIONS.ABOUT },
  { label: 'Cursos', section: SECTIONS.COURSES },
  { label: 'Portfólio', section: SECTIONS.PORTFOLIO },
  { label: 'Contato', section: SECTIONS.CONTACT },
]

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  const closeRef = useRef(null)

  // Trap focus on open
  useEffect(() => {
    if (isOpen && closeRef.current) closeRef.current.focus()
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleNav = (section) => {
    onClose()
    // Small delay so the overlay closes before scrolling
    setTimeout(() => scrollToSection(section), 150)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className={[
        'fixed inset-0 z-50 md:hidden',
        'transition-all duration-300 ease-in-out',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {/* Backdrop */}
      <div
        className={[
          'absolute inset-0 bg-dark/20 dark:bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={[
          'absolute top-0 right-0 h-full w-full max-w-sm',
          'bg-white dark:bg-dark shadow-2xl',
          'flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header controls */}
        <div className="flex items-center justify-between px-6 h-16">
          <span className="font-heading select-none">
            <span className="text-xl font-bold text-primary dark:text-white">DevOps</span>
            <span className="text-xl font-bold text-orange">Automation</span>
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex items-center justify-center w-10 h-10 rounded-lg text-primary dark:text-white hover:bg-gray-bg dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-light dark:border-white/10" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-6 pt-8 gap-1">
          {NAV_ITEMS.map(({ label, section }) => {
            const isActive = activeSection === section
            return (
              <button
                key={section}
                type="button"
                onClick={() => handleNav(section)}
                className={[
                  'text-left py-3.5 px-4 rounded-xl text-lg font-medium',
                  'transition-colors duration-200 cursor-pointer',
                  isActive
                    ? 'text-primary dark:text-white bg-badge-bg dark:bg-white/10 font-semibold'
                    : 'text-gray-body dark:text-gray-light hover:text-primary dark:hover:text-white hover:bg-gray-bg dark:hover:bg-white/10',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleNav(SECTIONS.COURSES)}
            className="w-full"
          >
            Ver Cursos
          </Button>
        </div>
      </div>
    </div>
  )
}
