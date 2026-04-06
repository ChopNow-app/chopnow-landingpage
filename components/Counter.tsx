'use client'

import { useEffect, useRef, useState } from 'react'

const BASE = 247

export default function Counter({ duration = 1400 }: { duration?: number }) {
  const [target, setTarget] = useState(BASE)
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  // Fetch real count from Supabase and add to base
  useEffect(() => {
    fetch('/api/count')
      .then((r) => r.json())
      .then(({ count }) => {
        if (typeof count === 'number' && count > 0) {
          setTarget(BASE + count)
        }
      })
      .catch(() => {})
  }, [])

  // Animate counter when in view
  useEffect(() => {
    const el = ref.current
    if (!el) return

    started.current = false
    setValue(0)

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
