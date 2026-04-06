export default function Card({
  children,
  className = '',
  featured = false,
  hoverable = true,
  size = 'md',
}) {
  const padding = size === 'lg' ? 'p-8' : 'p-6'

  return (
    <div
      className={[
        'relative bg-white rounded-2xl border border-gray-light',
        'shadow-sm',
        hoverable &&
          'transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-0.5',
        featured && 'overflow-hidden',
        padding,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Gradient top accent for featured cards */}
      {featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary via-purple to-pink"
        />
      )}

      {children}
    </div>
  )
}
