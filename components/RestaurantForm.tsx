'use client'

import { useState } from 'react'
import PhoneInput from './PhoneInput'

const QUARTIERS = [
  'Makepe', 'Bonamoussadi', 'Akwa', 'Bali',
  'Bonapriso', 'Deido', 'Ndogbong', 'Logpom', 'Autre quartier',
]

export default function RestaurantForm() {
  const [nom, setNom] = useState('')
  const [resto, setResto] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneValid, setPhoneValid] = useState(false)
  const [quartier, setQuartier] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nom.trim() || !resto.trim() || !phoneValid || !quartier) { setError(true); return }
    setError(false)

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'restaurant', nom_gerant: nom.trim(), nom_restaurant: resto.trim(), phone, quartier }),
    }).catch(() => {})

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(22,163,74,0.12)', border: '2px solid #16A34A' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h4 className="font-bold text-base mb-1" style={{ color: 'var(--cream)' }}>
          Demande reçue !
        </h4>
        <p className="text-sm mb-1" style={{ color: 'var(--cream-muted)' }}>
          <strong style={{ color: 'var(--cream)' }}>{resto}</strong> — {quartier}
        </p>
        <p className="text-sm" style={{ color: 'rgba(154,147,138,0.7)' }}>
          Notre équipe vous contacte sous 24 h au +237{phone}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-3">
        <div>
          <label htmlFor="r_nom" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--cream-muted)' }}>
            Votre nom *
          </label>
          <input
            id="r_nom" type="text" className="input-field-dark"
            placeholder="ex: Jean-Paul Mbarga"
            value={nom} onChange={(e) => setNom(e.target.value)}
            required autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="r_resto" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--cream-muted)' }}>
            Nom du restaurant *
          </label>
          <input
            id="r_resto" type="text" className="input-field-dark"
            placeholder="ex: Chez Mama Biya"
            value={resto} onChange={(e) => setResto(e.target.value)}
            required
          />
        </div>

        <PhoneInput
          id="r_phone"
          value={phone}
          variant="dark"
          onChange={(raw, _fmt, valid) => { setPhone(raw); setPhoneValid(valid) }}
        />

        <div>
          <label htmlFor="r_quartier" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--cream-muted)' }}>
            Quartier du restaurant *
          </label>
          <select
            id="r_quartier" className="input-field-dark"
            value={quartier} onChange={(e) => setQuartier(e.target.value)} required
          >
            <option value="">-- Choisissez le quartier --</option>
            {QUARTIERS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>

        {error && (
          <p className="text-sm" style={{ color: '#f87171' }}>
            {!phoneValid && phone.length > 0
              ? 'Numéro invalide — vérifiez le format.'
              : 'Remplissez tous les champs s\'il vous plaît.'}
          </p>
        )}

        <button type="submit" className="btn-submit">
          Inscrire mon restaurant →
        </button>
      </div>
    </form>
  )
}
