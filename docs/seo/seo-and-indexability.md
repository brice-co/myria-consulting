# Myria Consulting — SEO and Google indexing

## Public-site principle
Myria Consulting is a management advisory firm that combines people, processes, technology and communication with intelligent systems. Public content targets real business problems, service intent and the firm's own management framework, not an artificially inflated set of keywords.

## Implemented
- `app/sitemap.ts`: canonical public pages, 5 advisory Labs, guide articles and 9 use-case pages; excludes portal, auth, API, workspaces, experimental/demo-only routes and private invitations.
- `app/robots.ts`: search-engine access to public routes, restrictions for private/API routes, absolute sitemap directive.
- `lib/seo.ts`: canonical site base, reusable canonical/open-graph/Twitter metadata and private noindex metadata.
- `app/opengraph-image.tsx`: local share card.
- `components/seo/OrganizationJsonLd.tsx`: Organization and WebSite structured data with no fabricated reviews, addresses or credentials.
- Management Model and brochure overview pages with meaningful HTML copy and unique metadata.
- Navigation now presents the Management Model and Publications pages; reused existing logo.
- `app/portal/layout.tsx`, `app/auth/layout.tsx`, `app/(myria)/admin/layout.tsx`, `app/(myria)/workspace/layout.tsx`, and collaborative sessions declare noindex for nonpublic areas.

## Intentional omissions and remaining content work
- The user-supplied three PDF binaries could not be committed via the available GitHub text-file integration. Pages provide accessible PDF-derived **overviews**; no broken download controls are displayed. Place exact PDFs into `public/brochures/` in the repository to enable downloads. A matching upload-ready ZIP is supplied separately.
- Other legacy public routes remain online because removal or redirection could break integrations and inbound links. Legacy routes are not automatically promoted in the sitemap.
- Major rankings or Google knowledge panels are **not guaranteed** by metadata, structured data, or indexing.
- Verify property ownership and submit `https://myriaconsulting.com/sitemap.xml` using Google Search Console. Inspect priority URLs and watch page indexing reports over time.
- Create genuine expert content, authored case studies with permission, links from relevant industry sources, and technically accurate bilingual content if Myria decides to target French search queries.
- Any video strategy should favor a few relevant, clearly explained real demonstrations rather than animation-heavy decoration.

## Acceptance
Confirm `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, both management-resource sections, public page metadata and the shared navigation on the Vercel Preview build. Check that the private URLs are not in the sitemap; manually test mobile nav and inspect structured data before production merge.
