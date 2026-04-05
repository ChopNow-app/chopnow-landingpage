import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

// Lazy singleton — only instantiated on first request, not at build time
export function getSupabase(): SupabaseClient {
  if (_client) return _client

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — add them to .env.local and Vercel environment variables')
  }

  _client = createClient(url, key, { auth: { persistSession: false } })
  return _client
}
