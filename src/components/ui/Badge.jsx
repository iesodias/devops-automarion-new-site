const variantStyles = {
  default: 'bg-badge-bg text-primary dark:bg-white/10 dark:text-gray-light',
  orange: 'bg-orange/10 text-orange-dark dark:bg-orange/20 dark:text-orange',
  purple: 'bg-purple/10 text-purple dark:bg-purple/20 dark:text-purple',
  pink: 'bg-pink/10 text-pink dark:bg-pink/20 dark:text-pink',
}

export default function Badge({
  children,
  className = '',
  variant = 'default',
}) {
  return (
    <span
      className={[
        'inline-block font-mono text-xs font-medium px-3 py-1 rounded-full',
        'select-none whitespace-nowrap',
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
