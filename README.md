# GambleZone

Independent, transparent comparison of **licensed online casinos** — an MVP
showcase built with Next.js, TypeScript, Tailwind CSS, `next-intl` and
`framer-motion`.

> ⚠️ **Demonstration MVP.** All casino data is clearly labelled **sample data**.
> Names, ratings, bonuses, licences and links are fictional placeholders
> (destination URLs point to `example.com`). Nothing here should be presented as
> factual. There is no backend, database, email sending or real affiliate
> tracking.

## Features

- **Dark, premium burgundy design** with a 21st.dev-style aurora hero, glass
  surfaces and a bento methodology layout.
- **Internationalisation out of the box** — English, German, Spanish, Polish and
  Portuguese, with locale-prefixed routes (`/en`, `/de`, `/es`, `/pl`, `/pt`) and
  a language switcher.
- **`framer-motion` animations** — scroll reveals, staggered card entrances,
  spring interactions and animated menus/accordions. Respects
  `prefers-reduced-motion`.
- **Pages**: Home, Casino catalog (filterable), Casino detail, Bonuses, Guides,
  Methodology, Responsible Gambling, Affiliate Disclosure, Privacy, Cookies,
  Terms, Contact and a localized 404.
- **Compliance guardrails**: 18+ notices, responsible-gambling messaging,
  affiliate links marked `sponsored nofollow`, no "guaranteed win" language.
- **Secure affiliate redirect** at `/go/[casino]` — server-side allowlist, no
  open redirect, no user-supplied destination, minimal non-PII click logging.
- **SEO**: per-locale metadata, `hreflang` alternates, `robots.txt`,
  `sitemap.xml`, `noindex` on legal/utility pages.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (redirects to /en)
```

Other scripts:

```bash
npm run build      # production build (static generation)
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Optionally copy the environment example:

```bash
cp .env.example .env.local
```

## Project structure

```text
messages/                 # i18n translation files (en, de, es, pl, pt)
src/
├── app/
│   ├── [locale]/         # localized routes (home, casinos, legal, etc.)
│   ├── go/[casino]/      # affiliate redirect handler
│   ├── robots.ts
│   ├── sitemap.ts
│   └── icon.svg
├── components/           # ui, layout, casino, forms, motion, home
├── config/               # site + markets configuration
├── data/                 # sample casinos + payment methods
├── i18n/                 # next-intl routing + request config
├── lib/                  # helpers (casino selection, utils)
├── middleware.ts         # locale routing
└── types/                # Zod schemas + inferred types
```

## Adding / editing casinos

Edit [`src/data/casinos.ts`](src/data/casinos.ts). Data is validated with Zod at
module load, so invalid records fail the build with a clear error. Expired offers
are hidden automatically, and casinos not available in a market never render an
active CTA.

## Notes on scope

Deliberately **out of scope** for this MVP (see `PLAN.md`): user accounts,
database, payments, real email/newsletter sending, CMS, and streams. The
architecture keeps market and locale as separate concerns so these can be added
later.
