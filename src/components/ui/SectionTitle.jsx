export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center'

  return (
    <div className={[isCenter ? 'text-center' : 'text-left', className].filter(Boolean).join(' ')}>
      <h2
        className={[
          'font-heading font-bold text-primary dark:text-white',
          'text-3xl md:text-4xl leading-tight',
        ].join(' ')}
      >
        {title}
      </h2>

      {/* Decorative accent bar */}
      <span
        aria-hidden="true"
        className={[
          'block mt-4 h-1 w-15 rounded-full',
          'bg-gradient-to-r from-orange to-pink',
          isCenter ? 'mx-auto' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      {subtitle && (
        <p
          className={[
            'mt-4 text-gray-muted dark:text-gray-light text-lg leading-relaxed',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
