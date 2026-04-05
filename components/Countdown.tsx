'use client'

import { useEffect, useState } from 'react'

// April 6 + 2.5 weeks = inscriptions close
const CLOSE_DATE = new Date('2026-04-23T23:59:59')
// April 6 + 6 weeks = MVP launch
const LAUNCH_DATE = new Date('2026-05-18T08:00:00')

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function calc(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n: number) { return String(n).padStart(2, '0') }

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="countdown-digit">{value === 0 || value > 0 ? pad(value) : '--'}</span>
      <span className="countdown-label">{label}</span>
    </span>
  )
}

export default function Countdown() {
  const [close, setClose] = useState<TimeLeft | null>(null)
  const [launch, setLaunch] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setClose(calc(CLOSE_DATE))
    setLaunch(calc(LAUNCH_DATE))
    const t = setInterval(() => {
      setClose(calc(CLOSE_DATE))
      setLaunch(calc(LAUNCH_DATE))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  if (!close || !launch) return <div className="countdown-bar" />

  return (
    <div className="countdown-bar">
      {/* Inscriptions close */}
      <div className="countdown-item">
        <span className="countdown-tag close">Inscriptions ferment dans</span>
        <div className="countdown-clock">
          <Digit value={close.days} label="j" />
          <span className="countdown-sep">·</span>
          <Digit value={close.hours} label="h" />
          <span className="countdown-sep">·</span>
          <Digit value={close.minutes} label="m" />
          <span className="countdown-sep">·</span>
          <Digit value={close.seconds} label="s" />
        </div>
      </div>

      {/* Divider */}
      <div className="countdown-divider" />

      {/* MVP launch */}
      <div className="countdown-item">
        <span className="countdown-tag launch">Lancement MVP dans</span>
        <div className="countdown-clock">
          <Digit value={launch.days} label="j" />
          <span className="countdown-sep">·</span>
          <Digit value={launch.hours} label="h" />
          <span className="countdown-sep">·</span>
          <Digit value={launch.minutes} label="m" />
        </div>
      </div>
    </div>
  )
}
