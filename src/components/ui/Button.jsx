import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-orange text-white shadow-md hover:bg-orange-dark hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]',
  secondary:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-[0.98] dark:border-gray-light dark:text-gray-light dark:hover:bg-gray-light dark:hover:text-dark',
  outline:
    'border border-gray-light text-primary bg-transparent hover:border-primary hover:bg-primary/5 active:scale-[0.98] dark:border-white/20 dark:text-gray-light dark:hover:border-white/40 dark:hover:bg-white/5',
  ghost:
    'text-primary bg-transparent hover:bg-gray-bg active:scale-[0.98] dark:text-gray-light dark:hover:bg-white/10',
}

const sizes = {
  sm: 'text-sm px-5 py-2 gap-1.5',
  md: 'text-base px-7 py-3 gap-2',
  lg: 'text-lg px-9 py-3.5 gap-2.5',
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    href,
    children,
    className = '',
    icon: Icon,
    ...rest
  },
  ref,
) {
  const base = [
    'inline-flex items-center justify-center',
    'font-semibold rounded-lg',
    'transition-all duration-200 ease-out',
    'cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-orange',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && <Icon className="shrink-0" size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
    </>
  )

  if (href) {
    return (
      <a ref={ref} href={href} className={base} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} className={base} {...rest}>
      {content}
    </button>
  )
})

export default Button
