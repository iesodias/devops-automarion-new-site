import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { scrollToTop } from '../../utils/smoothScroll'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={[
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'w-11 h-11 rounded-full',
        'bg-primary text-white shadow-lg',
        'transition-all duration-300 ease-out',
        'hover:bg-primary-light hover:scale-110 hover:shadow-xl',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'cursor-pointer',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  )
}
