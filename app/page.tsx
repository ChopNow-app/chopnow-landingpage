import ConsumerForm from '@/components/ConsumerForm'
import RestaurantForm from '@/components/RestaurantForm'
import LivreurForm from '@/components/LivreurForm'
import Counter from '@/components/Counter'

// Dish names — no emojis, editorial text style
const DISHES = [
  'Ndolé', 'Eru', 'Poulet DG', 'Okok', 'Koki',
  'Mbanga Soup', 'Riz aux haricots', 'Achu', 'Beignets haricots', 'Kondre',
]

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MarqueeStrip />
      <PhotoStrip />
      <ProblemSection />
      <HowItWorks />
      <WaitlistSection />
      <RestaurantSection />
      <LivreurSection />
      <Footer />
    </main>
  )
}

/* ─────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────── */
function Nav() {
  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ background: 'rgba(15, 14, 11, 0.88)', borderColor: 'rgba(46, 40, 32, 0.7)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo — type-only, no emoji */}
        <a href="/" className="headline text-xl shrink-0" style={{ color: 'var(--cream)', letterSpacing: '-0.01em' }}>
          <span style={{ color: 'var(--fire)' }}>Chop</span>Now
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#restaurant" className="text-sm font-medium nav-resto-link hidden sm:block">
            Mon restaurant
          </a>
          <a href="#livreur" className="text-sm font-medium nav-resto-link hidden sm:block">
            Devenir livreur
          </a>
          <a href="#waitlist" className="text-sm font-medium nav-resto-link sm:hidden">
            S&apos;inscrire
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center px-4 sm:px-6 pt-10 pb-16">

      {/* Atmospheric blobs */}
      <div className="hero-glow" style={{ width: 520, height: 520, background: 'rgba(225, 29, 42, 0.06)', top: '-150px', right: '-120px' }} />
      <div className="hero-glow" style={{ width: 280, height: 280, background: 'rgba(189, 239, 79, 0.04)', bottom: '80px', left: '-80px' }} />

      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">

          {/* ── Left: text ── */}
          <div>
            <div className="inline-flex mb-7 reveal">
              <div className="badge">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--spark)' }}
                />
                Bientôt à Douala, Cameroun
              </div>
            </div>

            <h1
              className="headline mb-6 reveal"
              style={{ fontSize: 'clamp(44px, 8.5vw, 84px)', animationDelay: '0.08s' }}
            >
              <span style={{ color: 'var(--cream)' }}>Commander</span><br />
              <span style={{ color: 'var(--cream)' }}>à manger,</span><br />
              <span style={{ color: 'var(--fire)' }}>même sans</span><br />
              <span style={{ color: 'var(--fire)' }}>adresse.</span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-md reveal"
              style={{ color: 'var(--cream-muted)', animationDelay: '0.16s' }}
            >
              Choisissez votre repas, payez par MTN MoMo ou Orange Money,
              recevez chez vous. Sans carte bancaire, sans adresse formelle.
            </p>

            <div className="mb-9 reveal" style={{ animationDelay: '0.24s' }}>
              <a href="#waitlist" className="btn-spark">
                Rejoindre la liste d&apos;attente
              </a>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#restaurant" className="text-sm font-medium underline-offset-2 hover:underline" style={{ color: 'var(--cream-muted)' }}>
                  Vous êtes restaurateur ?
                </a>
                <span style={{ color: 'var(--border)' }}>·</span>
                <a href="#livreur" className="text-sm font-medium underline-offset-2 hover:underline" style={{ color: 'var(--cream-muted)' }}>
                  Vous voulez livrer ?
                </a>
              </div>
            </div>

            {/* Trust chips — text + small SVG, no emoji */}
            <div className="flex flex-wrap gap-2 reveal" style={{ animationDelay: '0.32s' }}>
              <span className="chip">
                <IconMomo />
                MTN MoMo
              </span>
              <span className="chip">
                <IconOrange />
                Orange Money
              </span>
              <span className="chip">
                <IconPin />
                Adresse par repère
              </span>
              <span className="chip">
                <WhatsAppIcon size={12} />
                WhatsApp ordering
              </span>
            </div>
          </div>

          {/* ── Right: food image card ── */}
          <div className="hidden lg:block reveal" style={{ animationDelay: '0.36s' }}>
            <div className="relative">
              {/* Main food image */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1665332561290-cc6757172890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=560"
                  alt="Plats africains livrés par ChopNow — Douala"
                  width={560}
                  height={380}
                  className="w-full object-cover"
                  style={{ display: 'block', height: 340 }}
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: 'linear-gradient(to top, rgba(15,14,11,0.85), transparent)' }}
                />
                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>
                    Livraison à Douala
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--spark)', color: '#0F0E0B' }}
                  >
                    Disponible bientôt
                  </span>
                </div>
              </div>

              {/* Small floating card — MoMo payment */}
              <div
                className="absolute -bottom-5 -left-5 rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(225,29,42,0.12)' }}
                >
                  <IconMomoLarge />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--cream)' }}>Paiement Mobile Money</div>
                  <div className="text-xs" style={{ color: 'var(--cream-muted)' }}>MTN · Orange — aucune carte</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = [...DISHES, ...DISHES]
  return (
    <div className="overflow-hidden py-3.5 select-none" style={{ background: 'var(--fire)' }} aria-hidden="true">
      <div className="marquee-inner">
        {items.map((dish, i) => (
          <span key={i} className="text-white font-semibold text-sm whitespace-nowrap" style={{ padding: '0 28px' }}>
            {i % 2 === 0 ? dish : <><span style={{ opacity: 0.5, marginRight: 28 }}>·</span>{dish}</>}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   PHOTO STRIP
───────────────────────────────────────────────── */
const PHOTOS = [
  {
    // Delivery man on motorcycle — African context
    src: 'https://plus.unsplash.com/premium_photo-1682092285979-c8d7ead62b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    alt: 'Livreur à moto à Douala',
    label: 'Nos livreurs',
    sub: 'Rapides, fiables, de votre quartier',
    tag: 'Livreur',
    anchor: '#livreur',
  },
  {
    // Person holding Android phone — Lagos, Nigeria (West Africa context)
    src: 'https://images.unsplash.com/photo-1576814547952-f8531781d7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    alt: 'Personne commandant sur son téléphone Android',
    label: 'Commandez en 2 min',
    sub: 'Depuis votre téléphone, sans carte bancaire',
    tag: 'Commander',
    anchor: '#waitlist',
  },
  {
    // Jollof rice — West African cuisine
    src: 'https://images.unsplash.com/photo-1664993101841-036f189719b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    alt: 'Plats africains — Jollof rice et cuisine camerounaise',
    label: 'Restaurants partenaires',
    sub: 'Cuisine locale, 100 % camerounaise',
    tag: 'Restaurant',
    anchor: '#restaurant',
  },
]

function PhotoStrip() {
  return (
    <section className="py-10 px-4 sm:px-6" style={{ background: '#0A0908' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          {PHOTOS.map((p, i) => (
            <a
              key={p.tag}
              href={p.anchor}
              className="group block relative rounded-2xl overflow-hidden reveal"
              style={{
                transitionDelay: `${i * 0.1}s`,
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                width={700}
                height={460}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block', height: 220 }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.3) 55%, transparent 100%)' }}
              />

              {/* Top tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--fire)', color: 'white' }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-bold text-sm mb-0.5" style={{ color: 'var(--cream)' }}>
                  {p.label}
                </div>
                <div className="text-xs" style={{ color: 'rgba(240,235,224,0.6)' }}>
                  {p.sub}
                </div>
              </div>

              {/* Hover arrow */}
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   PROBLEM
───────────────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    {
      num: '01',
      icon: <IconPin size={22} color="var(--fire)" />,
      title: "Pas d'adresse formelle",
      desc: `"Derrière le marché de Makepe" — ce n'est pas reconnu par les apps classiques.`,
      fix: 'GPS + point de repère + description libre',
    },
    {
      num: '02',
      icon: <IconCard size={22} color="var(--fire)" />,
      title: 'Pas de carte bancaire',
      desc: `Moins de 10 % des Camerounais ont une carte Visa. Les apps de livraison l'exigent quand même.`,
      fix: 'MTN MoMo + Orange Money — zéro CB',
    },
    {
      num: '03',
      icon: <IconPlate size={22} color="var(--fire)" />,
      title: 'Pas nos plats locaux',
      desc: 'Ndolé, Poulet DG, Koki — les apps disponibles ne les proposent pas.',
      fix: 'Restaurants 100 % camerounais',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 reveal">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--fire)' }}>
            Le problème
          </p>
          <h2 className="headline" style={{ fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--cream)' }}>
            Les autres apps ne marchent<br className="hidden sm:block" /> pas ici.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <div
              key={p.num}
              className="card-dark p-6 relative overflow-hidden group reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(225,29,42,0.06) 0%, transparent 70%)' }}
              />
              <div className="problem-num mb-3">{p.num}</div>
              <div className="mb-3">{p.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: 'var(--cream)', fontFamily: 'var(--font-body)' }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--cream-muted)' }}>
                {p.desc}
              </p>
              <div
                className="text-xs font-semibold flex items-center gap-2 pt-3"
                style={{ borderTop: '1px solid var(--border)', color: 'var(--spark)' }}
              >
                <IconCheck size={14} />
                {p.fix}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: '1',
      icon: <IconBag size={24} color="var(--fire)" />,
      title: 'Vous choisissez',
      desc: 'Parcourez les restaurants près de chez vous et composez votre commande.',
    },
    {
      n: '2',
      icon: <IconPhone size={24} color="var(--fire)" />,
      title: 'Vous payez par MoMo',
      desc: 'Un simple transfert MTN ou Orange Money depuis votre téléphone. Aucune carte requise.',
    },
    {
      n: '3',
      icon: <IconDelivery size={24} color="var(--fire)" />,
      title: 'On livre chez vous',
      desc: `Indiquez un point de repère connu. Pas besoin d'adresse officielle — le livreur vous contacte.`,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: '#110F0C' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 reveal">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--spark)' }}>
            Comment ça marche
          </p>
          <h2 className="headline" style={{ fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--cream)' }}>
            3 étapes, c&apos;est tout.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="flex items-start gap-4">
                <div className="step-num shrink-0">{s.n}</div>
                <div>
                  <div className="mb-2.5">{s.icon}</div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: 'var(--cream)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
              {i < 2 && <div className="sm:hidden mt-5 divider-dashed" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   WAITLIST  (cream light section — visual contrast)
───────────────────────────────────────────────── */
function WaitlistSection() {
  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6" style={{ background: '#F7F3EC' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Counter + social proof */}
          <div className="reveal">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--fire)' }}>
              Liste d&apos;attente
            </p>
            <div className="flex items-end gap-3 mb-3">
              <Counter />
              <span className="text-lg font-medium pb-2" style={{ color: '#6B6560' }}>personnes</span>
            </div>
            <p className="text-base font-medium mb-1" style={{ color: '#3D3530' }}>
              attendent déjà le lancement à Douala.
            </p>
            <p className="text-sm mb-8" style={{ color: '#8A8078' }}>
              Rejoins-les. Sois parmi les premiers servis.
            </p>

            {/* Momentum + quartier breakdown */}
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{ background: 'white', border: '1px solid rgba(28,28,30,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: '#6B6560' }}>Inscriptions cette semaine</span>
                <span className="font-bold" style={{ color: 'var(--fire)' }}>+38 inscrits</span>
              </div>
              {[
                { q: 'Makepe', pct: 34 },
                { q: 'Bonamoussadi', pct: 27 },
                { q: 'Akwa / Bonapriso', pct: 22 },
                { q: 'Autres quartiers', pct: 17 },
              ].map((row) => (
                <div key={row.q}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#8A8078' }}>
                    <span>{row.q}</span><span>{row.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full w-full" style={{ background: '#F0EBE0' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${row.pct}%`, background: 'var(--fire)', opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal" style={{ transitionDelay: '0.12s' }}>
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'white', border: '1px solid rgba(28,28,30,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              <h3 className="headline text-2xl mb-1" style={{ color: '#1C1C1E' }}>
                Je veux commander
              </h3>
              <p className="text-sm mb-6" style={{ color: '#8A8078' }}>
                Inscrivez-vous. On vous contacte dès le lancement dans votre quartier.
              </p>
              <ConsumerForm />
              <p className="text-center text-xs mt-4" style={{ color: '#B0A9A0' }}>
                Pas de spam. On vous écrit uniquement quand on lance près de chez vous.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   RESTAURANT
───────────────────────────────────────────────── */
function RestaurantSection() {
  const perks = [
    'Commissions parmi les plus basses du marché',
    'Inscription en moins de 10 minutes',
    'Paiements directement sur votre MoMo',
    'Dashboard simple — WhatsApp ou web',
    'Zéro frais avant le lancement',
    'Support en français et en pidgin',
  ]

  return (
    <section id="restaurant" className="py-20 px-4 sm:px-6" style={{ background: '#0A0908' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 reveal">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--spark)' }}>
            Pour les restaurateurs
          </p>
          <h2 className="headline" style={{ fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--cream)' }}>
            Votre restaurant<br />
            <span style={{ color: 'var(--fire)' }}>sur ChopNow.</span>
          </h2>
          <p className="text-sm leading-relaxed mt-4 max-w-md" style={{ color: 'var(--cream-muted)' }}>
            Plus de clients sans démarche commerciale. Vous gérez votre menu,
            on gère la logistique.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Perks + stats */}
          <div className="space-y-3 reveal">
            {perks.map((perk) => (
              <div key={perk} className="check-item text-sm" style={{ color: 'var(--cream-muted)' }}>
                <span>{perk}</span>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div
                className="rounded-xl p-4"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div className="headline text-2xl mb-0.5" style={{ color: 'var(--fire)' }}>{'< 12%'}</div>
                <div className="text-xs mb-1" style={{ color: 'var(--cream-muted)' }}>de commission au lancement</div>
                <div className="text-xs" style={{ color: 'rgba(154,147,138,0.6)' }}>soit ~120 FCFA sur un plat à 1 000 FCFA</div>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div className="headline text-2xl mb-0.5" style={{ color: 'var(--fire)' }}>10 min</div>
                <div className="text-xs" style={{ color: 'var(--cream-muted)' }}>{"pour s'inscrire"}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl p-6 sm:p-8 reveal"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', transitionDelay: '0.12s' }}
          >
            <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--cream)' }}>
              Inscrire mon restaurant
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--cream-muted)' }}>
              Notre équipe vous contacte sous 24 h.
            </p>
            <RestaurantForm />
            <p className="text-center text-xs mt-4" style={{ color: 'rgba(154,147,138,0.5)' }}>
              Inscription gratuite · Aucun engagement avant le lancement
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   LIVREUR
───────────────────────────────────────────────── */
function LivreurSection() {
  const avantages = [
    'Choisissez vos horaires librement',
    'Paiement quotidien sur votre MoMo',
    'Aucune exclusivité — travaillez où vous voulez',
    'Support disponible 7j/7 via WhatsApp',
  ]

  return (
    <section id="livreur" className="py-20 px-4 sm:px-6" style={{ background: '#0F0E0B', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: pitch */}
          <div className="reveal">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
              Devenez livreur
            </p>
            <h2 className="headline mb-4" style={{ fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--cream)' }}>
              Gagnez de l&apos;argent<br />
              <span style={{ color: 'var(--gold)' }}>à votre rythme.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--cream-muted)', maxWidth: 400 }}>
              Livrez dans votre quartier avec votre moto ou vélo. Pas de patron,
              pas d&apos;horaires fixes — vous choisissez quand travailler.
            </p>

            <div className="space-y-3 mb-8">
              {avantages.map((a) => (
                <div key={a} className="flex items-start gap-3 text-sm" style={{ color: 'var(--cream-muted)' }}>
                  <span
                    className="inline-flex items-center justify-center rounded shrink-0 mt-0.5"
                    style={{ width: 20, height: 20, minWidth: 20, background: 'rgba(201,151,62,0.12)', color: 'var(--gold)', fontSize: 11, fontWeight: 700 }}
                  >
                    ✓
                  </span>
                  {a}
                </div>
              ))}
            </div>

            {/* Earnings card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: 'var(--cream-muted)' }}>
                Revenus complémentaires
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--cream)' }}>
                Gagnez un revenu flexible selon votre disponibilité et votre zone de livraison.
              </p>
              <ul className="space-y-2">
                {[
                  'Travaillez à votre rythme — matin, midi ou soir',
                  'Rémunération par course, sans engagement',
                  'Paiement direct sur votre Mobile Money',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'var(--cream-muted)' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs mt-3" style={{ color: 'rgba(154,147,138,0.6)' }}>
                Les tarifs exacts seront communiqués au lancement.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal" style={{ transitionDelay: '0.12s' }}>
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--cream)' }}>
                Je veux devenir livreur
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--cream-muted)' }}>
                Notre équipe vous contacte sous 24 h pour valider votre profil.
              </p>
              <LivreurForm />
              <p className="text-center text-xs mt-4" style={{ color: 'rgba(154,147,138,0.45)' }}>
                Inscription gratuite · Disponible dès le lancement à Douala
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6" style={{ background: '#0A0908', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="headline text-xl" style={{ color: 'var(--cream)' }}>
          <span style={{ color: 'var(--fire)' }}>Chop</span>Now
        </div>
        <p className="text-sm text-center" style={{ color: 'var(--cream-muted)' }}>
          Douala, Cameroun — Bientôt en ligne
        </p>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────
   ICON SET — inline SVG, no emoji
───────────────────────────────────────────────── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconPin({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconCard({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function IconPlate({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  )
}

function IconBag({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function IconPhone({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  )
}

function IconDelivery({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
      <rect width="7" height="7" x="14" y="10" rx="1" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <circle cx="7.5" cy="17.5" r="2.5" />
    </svg>
  )
}

function IconCheck({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// Small chip icons — minimal 12x12
function IconMomo() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
function IconOrange() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}
function IconMomoLarge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--fire)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
      <line x1="6" x2="6.01" y1="15" y2="15" />
      <line x1="10" x2="14" y1="15" y2="15" />
    </svg>
  )
}
