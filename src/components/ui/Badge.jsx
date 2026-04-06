const variantStyles = {
  default: 'bg-badge-bg text-primary',
  orange: 'bg-orange/10 text-orange-dark',
  purple: 'bg-purple/10 text-purple',
  pink: 'bg-pink/10 text-pink',
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
