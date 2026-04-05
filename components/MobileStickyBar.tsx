'use client'

import { useEffect, useState } from 'react'

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="mobile-sticky-bar"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="mobile-sticky-inner">
        <div>
          <div className="mobile-sticky-count">247 inscrits</div>
          <div className="mobile-sticky-sub">Fermeture le 23 avril</div>
        </div>
        <a href="#waitlist" className="mobile-sticky-cta">
          Je m&apos;inscris →
        </a>
      </div>
    </div>
  )
}
