import { Outlet } from 'react-router-dom'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { SECTIONS } from '../../constants/routes'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'
import BackToTop from '../ui/BackToTop'

const sectionIds = Object.values(SECTIONS)

export default function Layout() {
  const activeSection = useScrollSpy(sectionIds, 120)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
