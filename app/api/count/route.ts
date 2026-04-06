import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const revalidate = 60 // cache 60 secondes

export async function GET() {
  try {
    const { count, error } = await getSupabase()
      .from('waitlist_consumers')
      .select('*', { count: 'exact', head: true })

    if (error) return NextResponse.json({ count: 0 })
    return NextResponse.json({ count: count ?? 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
