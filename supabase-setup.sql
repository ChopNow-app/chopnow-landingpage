-- ================================================================
-- ChopNow Landing — Supabase Tables Setup
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- ================================================================

-- 1. CONSUMERS (liste d'attente)
CREATE TABLE waitlist_consumers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom     TEXT NOT NULL,
  phone      TEXT NOT NULL,
  quartier   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  -- Prevent duplicate phone registrations
  UNIQUE (phone)
);

-- 2. RESTAURANTS
CREATE TABLE waitlist_restaurants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom_gerant      TEXT NOT NULL,
  nom_restaurant  TEXT NOT NULL,
  phone           TEXT NOT NULL,
  quartier        TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (phone)
);

-- 3. LIVREURS
CREATE TABLE waitlist_livreurs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom     TEXT NOT NULL,
  phone      TEXT NOT NULL,
  quartier   TEXT NOT NULL,
  vehicule   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (phone)
);

-- ================================================================
-- Row Level Security (RLS) — block all public access
-- Only your service role key (server-side) can insert/read
-- ================================================================
ALTER TABLE waitlist_consumers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_livreurs   ENABLE ROW LEVEL SECURITY;

-- No public policies = nobody can read or write via browser/anon key
-- The service role key bypasses RLS automatically

-- ================================================================
-- Optional: view total counts without exposing personal data
-- ================================================================
CREATE OR REPLACE VIEW public.waitlist_counts AS
SELECT
  (SELECT COUNT(*) FROM waitlist_consumers)  AS consumers,
  (SELECT COUNT(*) FROM waitlist_restaurants) AS restaurants,
  (SELECT COUNT(*) FROM waitlist_livreurs)   AS livreurs;
