'use client'

import { useState } from 'react'
import PhoneInput from './PhoneInput'

const QUARTIERS = [
  'Makepe', 'Bonamoussadi', 'Akwa', 'Bali',
  'Bonapriso', 'Deido', 'Ndogbong', 'Logpom', 'Newbell', 'Autre quartier',
]

const VEHICULES = [
  { value: 'Moto', label: 'Moto' },
  { value: 'Voiture', label: 'Voiture' },
  { value: 'Vélo', label: 'Vélo' },
  { value: 'À pied', label: 'À pied' },
]

export default function LivreurForm() {
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneValid, setPhoneValid] = useState(false)
  const [quartier, setQuartier] = useState('')
  const [vehicule, setVehicule] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prenom.trim() || !phoneValid || !quartier || !vehicule) { setError(true); return }
    setError(false)

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'livreur', prenom: prenom.trim(), phone, quartier, vehicule }),
    }).catch(() => {})

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(201,151,62,0.12)', border: '2px solid #C9973E' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9973E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h4 className="font-bold text-base mb-1" style={{ color: 'var(--cream)' }}>
          Candidature reçue, {prenom} !
        </h4>
        <p className="text-sm mb-1" style={{ color: 'var(--cream-muted)' }}>
          Zone : <strong style={{ color: 'var(--cream)' }}>{quartier}</strong> — {vehicule}
        </p>
        <p className="text-sm" style={{ color: 'rgba(154,147,138,0.7)' }}>
          Notre équipe vous contacte sous 48 h au +237{phone}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-3">
        <div>
          <label htmlFor="l_prenom" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--cream-muted)' }}>
            Votre prénom *
          </label>
          <input
            id="l_prenom" type="text" className="input-field-dark"
            placeholder="ex: Patrick"
            value={prenom} onChange={(e) => setPrenom(e.target.value)}
            required autoComplete="given-name"
          />
        </div>

        <PhoneInput
          id="l_phone"
          value={phone}
          variant="dark"
          onChange={(raw, _fmt, valid) => { setPhone(raw); setPhoneValid(valid) }}
        />

        <div>
          <label htmlFor="l_quartier" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--cream-muted)' }}>
            Votre zone de livraison *
          </label>
          <select
            id="l_quartier" className="input-field-dark"
            value={quartier} onChange={(e) => setQuartier(e.target.value)} required
          >
            <option value="">-- Choisissez votre zone --</option>
            {QUARTIERS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--cream-muted)' }}>
            Moyen de transport *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {VEHICULES.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setVehicule(v.value)}
                className="flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: vehicule === v.value ? 'rgba(225,29,42,0.15)' : 'rgba(255,255,255,0.05)',
                  border: vehicule === v.value ? '1.5px solid var(--fire)' : '1.5px solid rgba(255,255,255,0.1)',
                  color: vehicule === v.value ? 'var(--fire)' : 'var(--cream-muted)',
                  cursor: 'pointer',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm" style={{ color: '#f87171' }}>
            {!phoneValid && phone.length > 0
              ? 'Numéro WhatsApp invalide — vérifiez le format.'
              : 'Remplissez tous les champs s\'il vous plaît.'}
          </p>
        )}

        <button type="submit" className="btn-submit">
          Rejoindre l&apos;équipe de livreurs
        </button>
      </div>
    </form>
  )
}
