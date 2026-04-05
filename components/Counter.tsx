'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  target: number
  duration?: number
}

export default function Counter({ target, duration = 1400 }: CounterProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const step = target / (duration / 16)
          let current = 0
          const timer = setInterval(() => {
            current += step
            if (current >= target) {
              setValue(target)
              clearInterval(timer)
              return
            }
            setValue(Math.floor(current))
          }, 16)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="counter-text">
      {value}
    </span>
  )
}
