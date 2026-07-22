# GambleZone SEO implementation

Implemented in this project:

- Production-aware `index,follow` metadata and preview/development `noindex,nofollow` protection.
- Unique canonical URLs for primary pages and casino reviews.
- Full hreflang alternates for `en`, `es`, `de`, `pl`, `pt`, plus `x-default`.
- Open Graph and Twitter metadata generated through a shared SEO helper.
- Dynamic casino-review titles and descriptions.
- Organization and WebSite JSON-LD on every localized page.
- Review and BreadcrumbList JSON-LD on every casino review.
- ItemList JSON-LD on the casino catalogue.
- Existing FAQPage JSON-LD retained on the homepage.
- Expanded sitemap including key content pages and all localized casino reviews.
- Sitemap hreflang alternates, priorities, update frequency and review dates.
- Production-safe robots.txt with sitemap and host declarations.
- `/go`, `/api`, tracking-query, sort and filter crawl exclusions.
- Web app manifest and icon declaration.
- Metadata added to casino catalogue, bonuses, guides, free bonus, about, contact, methodology, responsible gambling and affiliate disclosure pages.

Deployment checklist:

1. Set `NEXT_PUBLIC_SITE_URL=https://gamblezone.vip` in production.
2. Deploy with `NODE_ENV=production`; Vercel production deployments automatically expose `VERCEL_ENV=production`.
3. Verify `/robots.txt` and `/sitemap.xml` after deployment.
4. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
5. Test representative URLs in Google Rich Results Test and Schema Markup Validator.
6. Request indexing for the homepage, casino catalogue and the most important casino reviews.

Not auto-generated because they require substantial original editorial content and ongoing maintenance:

- News articles and a publishing workflow.
- Provider-specific, payment-specific and category landing pages.
- Casino-versus-casino comparison articles.
- Backlinks or off-site promotion.
- Search Console/Bing account submission.

Those should be added only with useful, non-duplicative content rather than thin automatically generated pages.
