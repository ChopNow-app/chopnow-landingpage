# ChopNow — Landing Page

Waitlist landing page for ChopNow, a food delivery platform built for Douala, Cameroon. Validates market demand before product development — targeting consumers, restaurants, and delivery riders.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — custom design tokens, dark/light variants
- **Supabase** — PostgreSQL backend with Row Level Security
- **TypeScript**

## Features

- Three waitlist forms: consumers, restaurants (`waitlist_restaurants`), delivery riders (`waitlist_livreurs`)
- Cameroon phone validation (`+237 6XX XXX XXX`) with real-time formatting
- Double countdown: inscription deadline + MVP launch date
- Progress bar showing signups toward launch goal
- WhatsApp share on consumer confirmation
- Sticky mobile CTA bar
- Scroll reveal animations
- Secure API route — Supabase service role key never exposed to client

## Project Structure

```
landing/
├── app/
│   ├── api/submit/route.ts   # Form submission endpoint
│   ├── globals.css           # Design tokens + global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main landing page
├── components/
│   ├── ConsumerForm.tsx
│   ├── RestaurantForm.tsx
│   ├── LivreurForm.tsx
│   ├── PhoneInput.tsx        # Shared phone input with Cameroon validation
│   ├── Countdown.tsx         # Dual countdown timer
│   ├── MobileStickyBar.tsx
│   ├── Counter.tsx
│   └── ScrollReveal.tsx
├── lib/
│   └── supabase.ts           # Lazy Supabase singleton (server-side only)
└── supabase-setup.sql        # Database schema + RLS policies
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> The service role key is only used server-side in the API route. It is never sent to the browser.

### 3. Set up the database

Run `supabase-setup.sql` in your Supabase project via **SQL Editor**. This creates:

- `waitlist_consumers`
- `waitlist_restaurants`
- `waitlist_livreurs`
- `waitlist_counts` view (safe public read)
- Row Level Security on all tables

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

```bash
npx vercel
```

Add the two environment variables in **Vercel → Project → Settings → Environment Variables**:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Security Notes

- `.env.local` is gitignored — never commit it
- RLS is enabled on all Supabase tables — no direct client access
- All form inputs are sanitized (HTML stripped, max 200 chars) before insert
- Duplicate phone numbers return `{ ok: true, duplicate: true }` without error
