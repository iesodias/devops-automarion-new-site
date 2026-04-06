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
        'relative rounded-2xl border',
        'bg-white border-gray-light',
        'dark:bg-[#1e1e3a] dark:border-white/10',
        'shadow-sm dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]',
        hoverable &&
          'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
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
