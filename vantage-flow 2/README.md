# Vantage Flow — Storefront

A premium, mobile-first fashion e-commerce storefront for **Vantage Flow LLC**
(www.vantageflowllc.us), built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, and Framer Motion.

This deliverable is the **storefront**: every customer-facing page and flow,
fully built and interactive. Checkout and an admin dashboard are intentionally
**out of scope** for this build (see "What's not included" below) — this is a
frontend, not a hosted backend, so there's no live database or payment
processor to wire up.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Requires Node 18.17+.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint
```

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

This build intentionally stops at the frontend boundary:

- **Payments**: The checkout page has a real UI for card / Apple Pay / Google
  Pay / PayPal, but no live processor is wired up. To make it live: create a
  Stripe account, add `@stripe/stripe-js` + `@stripe/react-stripe-js`, swap
  the card fields in `app/checkout/page.tsx` for Stripe Elements, and add a
  server route (e.g. a Next.js Route Handler) that creates a PaymentIntent.
  Apple Pay / Google Pay ship via Stripe's Payment Request Button; PayPal via
  their JS SDK.
- **Admin dashboard**: Out of scope for this build per project scope.
  Products/inventory/orders/customers/discounts/analytics all need a real
  database (e.g. Postgres via Prisma) and authenticated routes — `lib/data.ts`
  is where that data currently lives as static mock content, and is the
  natural place to swap in real queries.
- **Accounts/auth**: The login and account pages are UI-complete but not
  wired to a real auth provider. Drop in NextAuth.js / Clerk / Auth.js and
  replace the mock `mockOrders` / `mockAddresses` in `lib/data.ts` with
  per-user queries.
- **Cart/wishlist persistence**: Currently `localStorage`-backed (see
  `context/CartContext.tsx`, `context/WishlistContext.tsx`) so they work
  fully client-side without a backend. Swap for a database-backed cart once
  accounts exist.

## Project structure

```
app/                  Routes (App Router)
  shop/                Shop listing + client filtering logic
  product/[slug]/      Product detail (server + client split)
  cart/, checkout/     Cart and checkout pages
  account/             Account overview, orders, addresses, wishlist
  about/, contact/, faq/, size-guide/, shipping-returns/,
  privacy-policy/, terms/, login/
  layout.tsx           Root layout: fonts, providers, nav, footer
  sitemap.ts, robots.ts
components/           Reusable UI (Nav, Footer, ProductCard, CartDrawer, …)
context/               CartContext, WishlistContext, UIContext (React state)
lib/                    types.ts, data.ts (mock product/collection catalog)
```

## Notes

- Product imagery uses Unsplash URLs as placeholders — swap in real product
  photography before launch (same `Product.colors[].image` shape).
- App icons in `/public` (`icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png`, `favicon.ico`, `apple-touch-icon.png`) are
  generated placeholders (a simple "VF" wordmark) — replace with real brand
  icons before shipping the PWA.
- The theme toggle applies `dark` class + `data-accent` attribute after
  mount, which can cause a brief flash of the default theme on first load.
  For a zero-flash production version, add a small inline script in
  `<head>` (or use `next-themes`) that reads `localStorage` before paint.
- Tailwind config (`tailwind.config.ts`) holds all brand tokens — change
  colors/fonts there, not inline, to keep the system consistent.
