import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const revalidate = 60 // cache 60 secondes

export async function GET() {
  try {
    const db = getSupabase()
    const [consumers, restaurants, livreurs] = await Promise.all([
      db.from('waitlist_consumers').select('*', { count: 'exact', head: true }),
      db.from('waitlist_restaurants').select('*', { count: 'exact', head: true }),
      db.from('waitlist_livreurs').select('*', { count: 'exact', head: true }),
    ])

    const total = (consumers.count ?? 0) + (restaurants.count ?? 0) + (livreurs.count ?? 0)
    return NextResponse.json({ count: total })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
