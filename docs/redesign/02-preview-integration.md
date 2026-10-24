# Phase 2: modular consulting homepage preview

## Status
Implemented on the redesign branch only. No production homepage replacement, routes deletion, or auth/API changes.

## Preview
Visit `/redesign-preview` on a deployment of the branch. The route uses `robots: noindex, nofollow` and does not replace `app/page.tsx`.

## Architecture
- `app/redesign-preview/page.tsx` — isolated route metadata and stylesheet
- `components/consulting/preview/content.ts` — business messaging and editorial data
- `PreviewHeader.tsx` — accessible client navigation
- `PreviewHero.tsx` — Framer Motion text entrance, image zoom, scroll motion, reduced-motion handling
- `PreviewSections.tsx` — business challenges, consulting capabilities, management philosophy, Discovery Lab, real resources and contact
- `ConsultingPreviewPage.tsx` — server component assembling sections
- `preview.css` — page-scoped styles without replacing Tailwind tokens or original global CSS

## Business positioning
Myria is presented first as a management advisory practice strengthened by intelligent systems. The homepage explains relevant challenges, consulting capabilities, distinctive collaborative methods, the Discovery Lab, and the path to an engagement. No fabricated quotes or customer references.

## Reused existing destinations
- `/contact-myria` — existing contact and voice advisor
- `/labs/discovery` — existing Discovery Lab
- `/client-portal` — existing portal explanation
- `/resources/guides/finding-ai-opportunities` — existing guide
- `/resources/playbook` — existing resource
- `/resources/guides` — resource index
- Existing privacy and terms pages

## Preview-specific boundaries
The root layout still renders the existing site header on other routes. On the preview route only, `body:has(#myria-redesign-preview) > header` suppresses that original header to avoid two navbars. When the preview is promoted to the homepage, this must be replaced with a robust layout-level header consolidation.

The initial preview uses a remotely hosted architectural background for the cinematic hero. Before production promotion, replace it with the approved locally hosted `public/images/myria-hero.webp` asset from the redesign source package and verify the image license/ownership.

## Validation / next steps
- Inspect a real preview deployment at desktop and mobile widths.
- Confirm `pnpm install --frozen-lockfile`, `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.
- Confirm hero image loads, mobile menu keyboard handling, reduced-motion behavior, all CTA URLs, and text contrast.
- Promote only after QA and approved positioning; keep `main` unchanged until then.
