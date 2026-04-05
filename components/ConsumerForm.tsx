'use client'

import { useState } from 'react'
import PhoneInput from './PhoneInput'

const QUARTIERS = [
  'Makepe', 'Bonamoussadi', 'Akwa', 'Bali',
  'Bonapriso', 'Deido', 'Ndogbong', 'Logpom', 'Autre quartier',
]

const TOTAL = 247   // update weekly as real signups come in
const GOAL  = 500

export default function ConsumerForm() {
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')       // raw digits only
  const [phoneValid, setPhoneValid] = useState(false)
  const [quartier, setQuartier] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prenom.trim() || !phoneValid || !quartier) { setError(true); return }
    setError(false)

    const pos = TOTAL + Math.floor(Math.random() * 3) + 1
    setPosition(pos)

    // Save to Supabase
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'consumer', prenom: prenom.trim(), phone, quartier }),
    }).catch(() => {})

    setSubmitted(true)
  }

  function handleShare() {
    const text = `J'attends ChopNow à Douala — livraison repas par MoMo, sans adresse formelle. Rejoins la liste : `
    if (navigator.share) {
      navigator.share({ title: 'ChopNow — Livraison à Douala', text, url: window.location.href })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + window.location.href)}`, '_blank')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(22,163,74,0.1)', border: '2px solid #16A34A' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h4 className="font-bold text-lg mb-1" style={{ color: '#1C1C1E', fontFamily: 'var(--font-body)' }}>
          C&apos;est bon, {prenom} !
        </h4>
        <p className="text-sm mb-1" style={{ color: '#6B6560' }}>
          Tu es le <strong>#{position}</strong> sur la liste à Douala.
        </p>
        <p className="text-sm mb-6" style={{ color: '#8A8078' }}>
          On te contacte sur WhatsApp dès qu&apos;on lance à <strong>{quartier}</strong>.
        </p>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-semibold text-sm transition-all"
          style={{ background: '#25D366', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
        >
          <WhatsAppIcon />
          Partager ChopNow avec un ami à Douala
        </button>
        <p className="text-xs mt-3" style={{ color: '#B0A9A0' }}>
          Chaque partage aide à lancer plus vite dans votre quartier.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-3">
        <div>
          <label htmlFor="c_prenom" className="block text-sm font-medium mb-1.5" style={{ color: '#6B6560' }}>
            Votre prénom *
          </label>
          <input
            id="c_prenom" type="text" className="input-field" placeholder="ex: Sandrine"
            value={prenom} onChange={(e) => setPrenom(e.target.value)} required autoComplete="given-name"
          />
        </div>

        <PhoneInput
          id="c_phone"
          value={phone}
          variant="light"
          onChange={(raw, _fmt, valid) => { setPhone(raw); setPhoneValid(valid) }}
        />

        <div>
          <label htmlFor="c_quartier" className="block text-sm font-medium mb-1.5" style={{ color: '#6B6560' }}>
            Votre quartier *
          </label>
          <select
            id="c_quartier" className="input-field"
            value={quartier} onChange={(e) => setQuartier(e.target.value)} required
          >
            <option value="">-- Choisissez votre quartier --</option>
            {QUARTIERS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>

        {error && (
          <p className="text-sm" style={{ color: '#ef4444' }}>
            {!phoneValid && phone.length > 0
              ? 'Numéro WhatsApp invalide — vérifiez le format.'
              : 'Remplissez tous les champs s\'il vous plaît.'}
          </p>
        )}

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: '#8A8078' }}>
            <span><strong style={{ color: '#1C1C1E' }}>{TOTAL} inscrits</strong> sur {GOAL} pour confirmer le lancement</span>
            <span style={{ color: 'var(--fire)', fontWeight: 600 }}>{Math.round((TOTAL / GOAL) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: '#F0EBE0' }}>
            <div className="h-2 rounded-full" style={{ width: `${Math.round((TOTAL / GOAL) * 100)}%`, background: 'var(--fire)' }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: '#B0A9A0' }}>
            Dès 500 inscrits à Makepe, on confirme le lancement.
          </p>
        </div>

        <button type="submit" className="btn-submit">
          Rejoindre la liste d&apos;attente
        </button>
      </div>
    </form>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
