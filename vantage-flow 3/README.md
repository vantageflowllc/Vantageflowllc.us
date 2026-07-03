# Vantage Flow — Storefront

A premium, mobile-first fashion e-commerce storefront for **Vantage Flow LLC**
(www.vantageflowllc.us), built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, and Framer Motion.

This deliverable includes the full storefront **and** a real backend: Postgres
via Prisma, authentication via NextAuth.js, and live Stripe payments. An admin
dashboard for managing products/inventory is still out of scope (see "What's
not included" below) — the product catalog remains static mock data in
`lib/data.ts`.

## Getting started

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL, NEXTAUTH_SECRET, Stripe keys
npx prisma migrate dev --name init
npm run db:seed            # optional: creates demo@vantageflowllc.us / password123
npm run dev
```

Visit `http://localhost:3000`. Requires Node 18.17+ and a Postgres database
(a free one from [Neon](https://neon.tech) or [Supabase](https://supabase.com)
works fine for local dev — just point `DATABASE_URL` at it).

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint       # lint
npm run db:studio  # browse the database in Prisma Studio
```

### What's wired up now

- **Accounts** — real sign-up / sign-in via `next-auth` (email+password,
  hashed with bcrypt; add `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` to also
  enable Google sign-in). `/account/*` is protected by `middleware.ts` and
  redirects signed-out visitors to `/login`.
- **Cart** — persisted to Postgres per-user (`app/api/cart/route.ts`); guests
  still get a `localStorage` cart, which merges into their account cart the
  moment they sign in (see `context/CartContext.tsx`).
- **Checkout** — real Stripe PaymentIntents. `app/checkout/page.tsx` creates
  an intent for the cart total, and `components/checkout/CheckoutForm.tsx`
  renders Stripe's `PaymentElement`, which shows Card, Apple Pay, and Google
  Pay automatically (and PayPal too, if you enable it as a payment method in
  the Stripe Dashboard — no extra code needed). Checkout intentionally stays
  open to guests; orders are only saved to an account if you're signed in.
- **Orders** — recorded in Postgres after Stripe confirms the payment
  (`app/api/orders/route.ts`, which re-verifies the PaymentIntent status
  server-side rather than trusting the client). `/account/orders` reads real
  order history.
- **Addresses** — full CRUD against Postgres (`app/api/addresses/*`).
- **Theme flash** — fixed. A `beforeInteractive` script in `app/layout.tsx`
  applies the stored dark-mode/accent preference before first paint.

### Still worth doing before a real launch

- Move order creation from the client-confirmation callback to a **Stripe
  webhook** (`checkout.session.completed` / `payment_intent.succeeded`), so an
  order is still recorded if the browser tab closes right after payment.
  `app/api/orders/route.ts` already re-verifies the PaymentIntent server-side,
  which is most of the way there — a webhook just makes it not depend on the
  client calling back at all.
- Recompute the checkout total **server-side** from the cart contents instead
  of trusting the `amount` the client sends to
  `app/api/checkout/create-payment-intent/route.ts`.
- Add email verification / password reset flows if email+password sign-up
  stays enabled in production.

## Design system — "The Vantage Line"

- **Palette**: Ink `#0A0A0B`, Bone `#F6F5F2`, Stone `#A39E93`, and a single
  signature accent, Flow (deep pine) `#2F5D50` — used sparingly for CTAs,
  the wishlist heart, and the kinetic stroke.
- **Type**: Archivo (display, condensed grotesk) paired with Inter (body) and
  IBM Plex Mono (SKUs, eyebrows, data).
- **Signature element**: `components/FlowLine.tsx` — a single animated SVG
  stroke used as a section divider, nav underline, and footer mark. It ties
  back to the brand name: *vantage* (a clear sightline) and *flow* (motion).
- Full principles in `/mnt/skills/public/frontend-design/SKILL.md` were used
  to plan this system before any code was written.

## What's included

- **Home** — full-bleed hero, featured collections (asymmetric grid), Trending
  Now / New Arrivals / Best Sellers rails, testimonials, newsletter signup.
- **Shop** — category filters, in-page search, sorting, wishlist, quick view
  modal, responsive filter drawer on mobile, and infinite-scroll style
  pagination (`IntersectionObserver` + a "Loading more…" affordance).
- **Categories** — a dedicated browse-by-category landing page.
- **AI Stylist** — a 3-question quiz that recommends an outfit from the
  catalog using a rule-based scoring engine (`app/stylist/StylistQuiz.tsx`).
  Swap this for a real hosted-LLM call when you're ready to make it dynamic.
- **Product detail** — image gallery, color/size selection, tabs
  (description/details/shipping), related products, add-to-bag.
- **Cart** — full page + slide-out drawer, quantity editing, line removal.
- **Checkout** — one-page checkout **UI** with shipping form and a payment
  method switcher (Card / Apple Pay / Google Pay / PayPal). This is a working
  UI shell, not a live payment integration — see below.
- **Account** — overview, order history, saved addresses, wishlist (all
  backed by mock data + localStorage, no real auth).
- **Content pages** — About, Contact, FAQ, Size Guide, Shipping & Returns,
  Privacy Policy, Terms.
- **Theming** — a settings drawer (the sliders icon in the header) with a
  dark mode toggle and 5 accent-color presets, both persisted to
  `localStorage` (`context/ThemeContext.tsx`, `components/ThemeDrawer.tsx`).
- **Installable (PWA)** — a web app manifest, a minimal service worker
  (app-shell caching + offline fallback), and a custom "Add to Home Screen"
  prompt (`components/InstallPrompt.tsx`). Placeholder icons are in
  `/public`; swap them for real brand marks before launch.
- **SEO** — per-page metadata, Open Graph tags, dynamic `sitemap.xml` and
  `robots.txt`, semantic headings.
- **Accessibility** — skip link, visible focus states, `aria-label`s on icon
  buttons, `prefers-reduced-motion` support throughout.

## What's not included (by design)

- **Admin dashboard**: Managing products/inventory/discounts/analytics is out
  of scope for this build. The product catalog still lives as static mock
  content in `lib/data.ts` — swapping it for a `Product` table + admin CRUD
  routes is the natural next step, following the same Prisma pattern already
  used for `Address`/`Order`/`CartItem`.
- **Wishlist persistence**: Still `localStorage`-backed
  (`context/WishlistContext.tsx`) rather than database-backed. It works fully
  client-side; wiring it to Postgres would follow the same pattern as
  `CartItem` in `prisma/schema.prisma`.
- **Stripe webhook**: Order creation currently happens from the client's
  post-payment callback (with server-side verification against Stripe — see
  README notes above). A webhook is the more resilient production setup.

## Project structure

```
app/
  api/
    auth/[...nextauth]/  NextAuth route handler
    auth/register/       Sign-up (hashes password, creates User)
    cart/                GET/PUT — DB-backed cart for signed-in users
    addresses/           CRUD for saved addresses
    checkout/create-payment-intent/  Creates a Stripe PaymentIntent
    orders/              GET history / POST after a verified payment
  shop/, product/[slug]/, cart/, checkout/, account/,
  about/, contact/, faq/, size-guide/, shipping-returns/,
  privacy-policy/, terms/, login/
  layout.tsx             Root layout: fonts, providers, nav, footer, theme script
middleware.ts            Protects /account/* routes
components/
  checkout/CheckoutForm.tsx   Stripe PaymentElement + AddressElement
  account/SignOutButton.tsx
  providers/AuthSessionProvider.tsx
  Nav, Footer, ProductCard, CartDrawer, …
context/                  CartContext (DB-synced), WishlistContext, ThemeContext, UIContext
lib/
  auth.ts                 NextAuth config (credentials + optional Google)
  prisma.ts               Prisma client singleton
  types.ts, data.ts       Product/collection catalog (still static mock data)
prisma/
  schema.prisma           User/Account/Session, Address, CartItem, Order, OrderItem
  seed.ts                 Creates a demo account for local testing
```

## Notes

- Product imagery uses Unsplash URLs as placeholders — swap in real product
  photography before launch (same `Product.colors[].image` shape).
- App icons in `/public` (`icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png`, `favicon.ico`, `apple-touch-icon.png`) are
  generated placeholders (a simple "VF" wordmark) — replace with real brand
  icons before shipping the PWA.
- Tailwind config (`tailwind.config.ts`) holds all brand tokens — change
  colors/fonts there, not inline, to keep the system consistent.
