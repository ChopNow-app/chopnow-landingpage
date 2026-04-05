import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

// Allowed submission types
type SubmitType = 'consumer' | 'restaurant' | 'livreur'

// Sanitize: strip HTML tags and trim
function clean(v: unknown): string {
  if (typeof v !== 'string') return ''
  return v.replace(/<[^>]*>/g, '').trim().slice(0, 200)
}

// Validate Cameroon phone: 9 digits starting with 65-69
function isValidPhone(phone: string): boolean {
  return /^6[5-9]\d{7}$/.test(phone.replace(/\s/g, ''))
}

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const type = clean(body.type) as SubmitType
  if (!['consumer', 'restaurant', 'livreur'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  // 2. Sanitize common fields
  const phone = clean(body.phone)
  const quartier = clean(body.quartier)

  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 422 })
  }
  if (!quartier) {
    return NextResponse.json({ error: 'Missing quartier' }, { status: 422 })
  }

  // 3. Build row based on type
  let table: string
  let row: Record<string, string>

  if (type === 'consumer') {
    const prenom = clean(body.prenom)
    if (!prenom) return NextResponse.json({ error: 'Missing prenom' }, { status: 422 })

    table = 'waitlist_consumers'
    row = { prenom, phone, quartier }

  } else if (type === 'restaurant') {
    const nom_gerant = clean(body.nom_gerant)
    const nom_restaurant = clean(body.nom_restaurant)
    if (!nom_gerant || !nom_restaurant) {
      return NextResponse.json({ error: 'Missing restaurant fields' }, { status: 422 })
    }
    table = 'waitlist_restaurants'
    row = { nom_gerant, nom_restaurant, phone, quartier }

  } else {
    // livreur
    const prenom = clean(body.prenom)
    const vehicule = clean(body.vehicule)
    if (!prenom || !vehicule) {
      return NextResponse.json({ error: 'Missing livreur fields' }, { status: 422 })
    }
    table = 'waitlist_livreurs'
    row = { prenom, phone, quartier, vehicule }
  }

  // 4. Insert into Supabase
  const { error } = await getSupabase().from(table).insert(row)

  if (error) {
    // Duplicate phone for same type → still return success to user (idempotent)
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, duplicate: true })
    }
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
