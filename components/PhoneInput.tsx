'use client'

import { useId } from 'react'

interface PhoneInputProps {
  id?: string
  value: string
  onChange: (raw: string, formatted: string, valid: boolean) => void
  variant?: 'light' | 'dark'
  label?: string
}

/** Formats a raw digit string into "6XX XXX XXX" */
function formatCM(digits: string): string {
  const d = digits.slice(0, 9)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
}

/** Cameroon mobile: starts with 6, 9 digits total */
function isValidCM(digits: string): boolean {
  return /^6[5-9]\d{7}$/.test(digits)
}

export default function PhoneInput({
  id,
  value,
  onChange,
  variant = 'light',
  label = 'Numéro WhatsApp *',
}: PhoneInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  const raw = value.replace(/\s/g, '')
  const isValid = isValidCM(raw)
  const isTouched = raw.length > 0
  const showError = isTouched && raw.length === 9 && !isValid

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Strip everything except digits
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9)
    onChange(digits, formatCM(digits), isValidCM(digits))
  }

  const labelColor = variant === 'dark' ? 'var(--cream-muted)' : '#6B6560'

  const inputStyle: React.CSSProperties =
    variant === 'dark'
      ? {
          width: '100%',
          padding: '13px 40px 13px 80px',
          borderRadius: 11,
          border: showError
            ? '1.5px solid #f87171'
            : isValid
            ? '1.5px solid #16A34A'
            : '1.5px solid rgba(255,255,255,0.1)',
          fontSize: 15,
          color: 'var(--cream)',
          background: 'rgba(255,255,255,0.05)',
          outline: 'none',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          WebkitAppearance: 'none',
          appearance: 'none' as const,
          boxShadow: isValid ? '0 0 0 3px rgba(22,163,74,0.1)' : showError ? '0 0 0 3px rgba(248,113,113,0.12)' : 'none',
        }
      : {
          width: '100%',
          padding: '13px 40px 13px 80px',
          borderRadius: 11,
          border: showError
            ? '1.5px solid #ef4444'
            : isValid
            ? '1.5px solid #16A34A'
            : '1.5px solid rgba(28,28,30,0.14)',
          fontSize: 15,
          color: '#1C1C1E',
          background: 'white',
          outline: 'none',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          WebkitAppearance: 'none',
          appearance: 'none' as const,
          boxShadow: isValid ? '0 0 0 3px rgba(22,163,74,0.1)' : showError ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
        }

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
        {label}
      </label>

      <div className="relative">
        {/* Flag + country code prefix */}
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center gap-1.5 pointer-events-none select-none"
          style={{ padding: '0 12px', borderRight: variant === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(28,28,30,0.1)' }}
        >
          {/* Cameroon flag SVG — no emoji */}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="20" height="14" rx="2" fill="#007A5E" />
            <rect x="6.67" width="6.67" height="14" fill="#CE1126" />
            <rect x="13.33" width="6.67" height="14" fill="#FCD116" />
            {/* Star */}
            <path d="M10 4.5l.5 1.5H12l-1.2.9.5 1.6L10 7.6l-1.3.9.5-1.6L8 6h1.5z" fill="#FCD116" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: variant === 'dark' ? 'rgba(240,235,224,0.5)' : '#6B7280' }}>
            +237
          </span>
        </div>

        <input
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="6XX XXX XXX"
          value={formatCM(raw)}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Right status icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isValid && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Numéro valide">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
          {showError && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" aria-label="Numéro invalide">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        </div>
      </div>

      {/* Inline hint / error */}
      <p className="text-xs mt-1.5" style={{ color: showError ? '#ef4444' : variant === 'dark' ? 'rgba(154,147,138,0.6)' : '#B0A9A0' }}>
        {showError
          ? 'Numéro invalide — doit commencer par 65, 66, 67, 68 ou 69'
          : 'Numéro MTN ou Orange Money valide en Cameroun'}
      </p>
    </div>
  )
}
