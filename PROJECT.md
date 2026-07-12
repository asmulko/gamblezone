# PROJECT — GambleZone MVP

The concrete build plan derived from `PLAN.md`, scoped to a front-end MVP with
**no backend, database or email**. This document reflects what was implemented.

## Goal

A fast, premium, trust-building showcase that compares licensed online casinos,
with transparent bonus/condition information and clearly-labelled affiliate CTAs.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript (strict)
- Tailwind CSS with semantic CSS-variable design tokens
- `next-intl` for i18n · `framer-motion` for animation · `lucide-react` icons
- `zod` for data-model validation

## Languages i18n support

- English
- German
- Spanish
- Polish
- Portuguese

Locale-prefixed routes (`/en`, `/de`, `/es`, `/pl`, `/pt`) with a language
switcher. `locale` and `market` are kept as separate concerns.

## Design direction

- ui-ux-pro-max principles: AA contrast, visible focus, 44px touch targets,
  mobile-first, semantic tokens, `prefers-reduced-motion` support.
- 21st.dev vibe: aurora/spotlight hero, glass surfaces, bento methodology grid,
  spring micro-interactions, staggered scroll reveals.
- Dark burgundy palette: near-black background, graphite surfaces, burgundy
  primary, muted-red secondary, amber accent, warm-white text.

## Delivered pages

Home · Casinos (filterable catalog) · Casino detail · Bonuses · Guides ·
Methodology · Responsible Gambling · Affiliate Disclosure · Privacy · Cookies ·
Terms · Contact · localized 404 · `/go/[casino]` affiliate redirect.

## Data

6 fictional sample casinos in `src/data/casinos.ts`, validated by Zod schemas in
`src/types/casino.ts`. Offers, licences and affiliate links are placeholders.

## Compliance guardrails

- Sample data explicitly labelled; no invented real licences/bonuses.
- 18+ notices and responsible-gambling messaging throughout.
- Affiliate CTAs routed via `/go` with `rel="sponsored nofollow"`, allowlisted
  destinations, no open redirect, no PII in click logs.
- No "guaranteed win" / "no risk" language; no fake `AggregateRating` schema.

## Out of scope (future)

User accounts, database, payments, real newsletter/email sending, CMS, streams,
postback integration. The structure is ready to extend to these later.

## Status

MVP implemented. `npm run build` passes; 90 static pages generated across the 5
locales. See `README.md` for commands.