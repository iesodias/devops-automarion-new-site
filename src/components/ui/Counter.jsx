import { useState, useEffect, useCallback } from 'react'
import { useInView } from '../../hooks/useInView'

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

export default function Counter({
  end,
  label,
  suffix = '+',
  duration = 2000,
}) {
  const [ref, isInView] = useInView({ threshold: 0.3 })
  const [count, setCount] = useState(0)

  const animate = useCallback(() => {
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.round(easedProgress * end))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  useEffect(() => {
    if (isInView) animate()
  }, [isInView, animate])

  return (
    <div ref={ref} className="text-center">
      <span className="block text-4xl font-bold text-primary font-heading tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="block mt-1 text-sm text-gray-muted">{label}</span>
    </div>
  )
}
