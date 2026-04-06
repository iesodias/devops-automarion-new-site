import { useState } from 'react'
import { BarChart3, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionTitle from '../ui/SectionTitle'
import { useInView } from '../../hooks/useInView'
import { courses } from '../../data/courses'
import { SECTIONS } from '../../constants/routes'
import { assetPath } from '../../utils/assetPath'

const badgeColors = {
  'Mais Vendido': 'bg-orange text-white',
  'Lançamento': 'bg-purple text-white',
  'Novo': 'bg-primary text-white',
  'Gratuito': 'bg-green-600 text-white',
}

function CourseCard({ course, index }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [imgError, setImgError] = useState(false)

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      <Card
        className="p-0 overflow-hidden flex flex-col h-full"
        hoverable
      >
        {/* Card header — image with gradient fallback */}
        <div className="relative h-36 rounded-t-2xl bg-gradient-to-br from-primary/10 to-purple/10 overflow-hidden">
          {course.image && !imgError ? (
            <img
              src={assetPath(course.image)}
              alt={course.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              {/* Decorative floating orbs */}
              <div className="absolute top-5 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-orange/10 to-pink/8 blur-md" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-purple/8 blur-md" />

              {/* Decorative code skeleton */}
              <div className="absolute top-5 left-6 flex flex-col gap-1.5 opacity-40">
                <div className="h-1.5 w-16 rounded-full bg-primary/20" />
                <div className="h-1.5 w-24 rounded-full bg-purple/15" />
                <div className="h-1.5 w-12 rounded-full bg-primary/10" />
              </div>
            </>
          )}

          {/* Dynamic badge */}
          {course.badge && (
            <span className={`absolute top-4 right-4 ${badgeColors[course.badge]} text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10`}>
              {course.badge}
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-xl font-semibold text-primary leading-snug">
            {course.title}
          </h3>

          <p className="text-gray-muted text-sm mt-2 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {course.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-light text-sm text-gray-muted">
            <BarChart3 size={15} className="text-primary/50" />
            {course.level}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-6">
            <a href={course.url} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="primary" size="md" className="w-full" icon={ArrowRight}>
                Saiba Mais
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function Courses() {
  const sortedCourses = [...courses].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  )

  return (
    <section id={SECTIONS.COURSES} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Cursos Práticos para Quem Quer Evoluir"
          subtitle="Aprenda DevOps, Cloud e automação com projetos reais."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {sortedCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
