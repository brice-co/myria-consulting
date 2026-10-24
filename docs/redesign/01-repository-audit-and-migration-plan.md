# Myria Consulting — Repository Audit & Modular Redesign Migration

**Scope:** Current repository `brice-co/myria-consulting` compared with the separately delivered modular landing-page redesign.  
**Working branch:** `redesign/myria-consulting-modular`  
**Production branch:** `main` (do not modify until review and validation)

## Decision

Adopt the modular redesign **as the public website presentation layer**, not as a replacement for the existing Next.js application.

The current repository contains **512 tracked files** (including 106 under `app/`, 183 under `components/`, 79 under `lib/`, and 57 under `experience/` at the time of audit). The delivered redesign is a small, stand-alone landing page. Replacing the whole application with it would remove valuable existing functionality and create unnecessary regression risk.

The objective is to make Myria recognizable first as a **management consulting and transformation advisory firm strengthened by intelligent systems**, with the technical experiences available selectively and primarily through the separate Intelligent Systems experience.

## Confirmed existing architecture

- Next.js **16.1.6**, React **19.2.3**, TypeScript, Tailwind CSS 4, Framer Motion 12.
- `app/page.tsx` delegates to `components/landing/landing-page.tsx`, which composes the current home sections.
- `app/layout.tsx` loads global fonts, CSS, metadata, and the global site header.
- `components/navigation/` contains the active desktop and mobile navigation.
- `components/layouts/`, `components/landing/header.tsx`, and `components/navigation/site-header.tsx` contain **overlapping layout/navigation implementations**. Verify usage before consolidation.
- Existing advisory and business capabilities include `data/labs.ts`, `app/(myria)/labs/[slug]`, contact voice agent, client portal, `app/portal/`, resources, guide content, authentication, API routes, and collaborative advisory components.
- Integrated dependencies include Better Auth, Drizzle, Liveblocks, LiveKit, OpenAI Agents, Upstash, and Resend.

## Findings with evidence

| Priority | Finding | Evidence in code | Recommended response |
| --- | --- | --- | --- |
| High | The homepage overemphasizes technical demonstrations relative to the consulting offer. | `components/landing/landing-page.tsx` includes IntelligenceLayer, VirtualTeam, TechnologySection, ExperienceGallery. | Prioritize business challenges, capabilities, management approach, Discovery Lab, and a clear client CTA. |
| High | The current primary hero CTA points to Myria OS, not a consulting engagement. | `components/landing/hero-section.tsx`: `/experience/myria-os`. | Make `/contact-myria` or the Discovery Lab the primary path; keep product experiences secondary. |
| High | The current navigation exposes overlapping brands/offers (AI Advisory, Fractional CTO, demos, workspace, videos). | `components/navigation/data/navigation/main-navigation.ts`. | Simplify public nav. Preserve routes in code until a usage and dependency audit is complete. |
| High | Current root metadata positions Myria as “Virtual Management Consulting.” | `app/layout.tsx`. | Update the SEO title, description, and OpenGraph metadata once final copy is approved. |
| Medium | Global site-header implementation needs a reconciliation strategy before integrating the redesigned header. | `app/layout.tsx`, `components/navigation/site-header.tsx`, `components/layouts/Header.tsx`. | Use a single primary public header, avoid duplicate headers and conflicting CSS. |
| Medium | Some pages have metadata copied from unrelated offerings. | `app/(myria)/labs/page.tsx`, `app/services/page.tsx` (“Conversational AI”); `app/experience/videos/page.tsx` (“MyriaChat”). | Audit public page metadata in a dedicated SEO pass. |
| Medium | The problem tab initial state does not match any current problem ID. | `components/landing/problems-solved-section.tsx` initializes to `direction`, but `data/challenges.ts` IDs begin with `strategic-clarity`. | Align initial state with the first available problem; test interaction accessibility. |
| Medium | A nested page-level `<main>` appears inside a homepage section. | `components/landing/virtual-teams-section.tsx`. | Remove during home composition cleanup; retain only one document main landmark. |
| Medium | Two different client-facing portal routes exist. | `app/(myria)/client-portal/page.tsx` and `app/portal/page.tsx`. | Clarify public explanatory page vs authenticated workspace before changing links. |
| Medium | Service and Lab routes partially duplicate the same section. | `app/services/page.tsx` and `app/(myria)/labs/page.tsx` both render `LabsSection`. | Consolidate public route purpose and metadata after checking inbound links. |
| Validation | The small redesign was not verified in a production build when created. | Its delivered README documents syntax checks but no successful `next build`. | Run install, typecheck/lint, build, responsive, navigation, and accessibility checks after integration. |

## Preserve / adapt / defer

### Preserve without replacing
- `app/api/**` (voice, contact, Labs, auth, resources integrations)
- `auth/**`, `db/**`, `drizzle/**`, server-side `lib/**` and related services
- `app/portal/**` and existing client/advisory workspace functionality
- Legal pages and existing published resources
- Reusable UI components, authenticated workflows, and existing providers

### Adapt into the new consulting website
- `app/page.tsx`, public navigation, public footer, metadata
- Business challenge content from `data/challenges.ts`
- Discovery Lab description from `data/labs.ts`
- The modular redesign's hero image treatment, typography, section components, and restrained Motion
- Real guide and playbook links rather than placeholder article cards

### Defer from public navigation, do not immediately delete
- `/experience/myria-os`, `/experience/workspace`, `/experience/interactive-workspace`, `/experience/videos`
- Product/technology stack showcases
- Any unused legacy landing components, pending import-usage review
- `/services/fractional-cto` (remove from navigation as a current offer; check dependencies before changing the route)

## Proposed homepage information architecture

1. **Hero** — Myria's business value and precise offer: management expertise + intelligent systems + actionable execution.
2. **Business challenges** — Recognizable strategic, operational, transformation, AI, and change problems.
3. **Capabilities** — Strategy & Direction; Operations & Performance; AI, Data & Intelligent Systems; People & Change.
4. **Management philosophy / Myria difference** — Think deeper. Organize intelligently. Improve continuously. Explain specialist advisors and human accountability concretely.
5. **How we work / Discovery Lab** — What happens in a session, who participates, and example outputs grounded in `data/labs.ts`.
6. **Insights & expertise** — Link to real guides, playbook, and authored research; no fictional references or testimonials.
7. **Start a conversation** — Clear and functioning contact path.

Suggested public nav: **Approach · Capabilities · Discovery Lab · Insights · Contact**, with a discreet **Client Portal** link.

## Integration strategy

1. Create an isolated preview under a temporary route on this branch; do not immediately replace `app/page.tsx`.
2. Move reusable parts of the delivered redesign into an explicitly scoped `components/consulting/` directory and consolidate editorial data in `data/consulting.ts`. Avoid two competing global CSS systems.
3. Reconcile the site header, footer, typography, and background animation with existing app-wide providers. Use `next/image` and local optimized assets; preserve reduced-motion preferences.
4. Replace placeholder in-page links with actual existing routes, especially `/contact-myria`, `/labs/discovery`, `/resources/guides`, and `/resources/playbook`.
5. Validate responsive layouts, focus/keyboard interactions, contrast, metadata, API route preservation, authenticated areas, lint, typecheck, and production build.
6. Review the preview and its diff before replacing the homepage.
7. Only after approved deployment: inventory unused components and consider deleting dead code in a separate, reversible PR. Manage redirects if any public routes are retired.

## Definition of done

- A prospect can state what Myria does, whom it helps, why it is distinct, and how to engage within the first page screen or two.
- Public menu is simplified, without broken links or losing client access.
- The new hero exhibits a subtle zoom and animated type, without motion accessibility regressions.
- No fabricated clients, testimonials, published articles, or validated business outcomes.
- Existing contact, Lab, resources, authentication, portal, and API routes continue to work.
- CI/build and mobile/desktop QA pass; production branch remains unchanged until PR approval.

**Status:** Audit completed and strategy documented. Integration work and a production build are pending.
