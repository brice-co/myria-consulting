# Homepage promotion — shared public navigation and Myria theme

**Branch:** `redesign/myria-consulting-modular`

## Promoted routes and components

- `app/page.tsx` renders `components/consulting/home/ConsultingHomePage.tsx`, rather than the former landing-page composition.
- The former `components/consulting/preview` implementation has been moved and renamed into `components/consulting/home`; former preview component paths are deleted.
- `components/navigation/consulting-header.tsx` is used by `components/navigation/site-header.tsx` in the root layout. The homepage uses the overlaid version; other marketing pages use the solid version.
- Header links on the homepage use in-page anchors; header links on other marketing pages use `/#...` to lead directly to the corresponding homepage sections.
- `app/redesign-preview/page.tsx` redirects to `/`, preventing two independently maintained public homepages.
- Auth and immersive workspaces such as `/portal` and `/workspace` do not render the public marketing header.
- Global CSS brand tokens were introduced without overriding application-specific dark-mode or chart variables. Public-site tokens: navy `#142b35`, teal `#173039`, warm neutral `#f7f4ee`, copper `#a87532`.
- Root and homepage SEO titles and descriptions now emphasize management advisory and intelligent systems.

## Preserved

- Existing contact route and voice agent, Discovery Lab, virtual advisors, collaborative workspace experience, guides, playbook and client portal.
- Authentication, database, API and workspace systems.
- Accessible mobile navigation with Escape focus restoration, reduced-motion hero behavior, and responsive experience cards.

## Browser acceptance performed

- Live Next.js dev server running the promoted branch; desktop 1440, tablet 1024, mobile 390, narrow mobile 320 tested in headless Chromium.
- Confirmed home HTTP 200, one shared header, three experience cards, no horizontal overflow and properly resolved internal section navigation from other public routes.
- `/redesign-preview` forwards to the homepage; /labs/discovery, /contact-myria, /client-portal and /virtual-advisory-team returned HTTP 200.
- Portal and workspace routes remained distinct; workspace redirected to sign-in as expected without authenticated Preview credentials.
- A React hydration issue specific to reduced-motion preferences was identified and corrected.
- Automated axe-core checks were used; final passes should still be complemented with manual accessibility review.

## Follow-ups

- Supply actual video files for Advisory Lab, Virtual Advisory Team and Collaborative Workspace, updating `components/consulting/home/experience-content.ts`.
- The hero background image still uses an external Unsplash source; replace with an approved, locally hosted image asset when available in the repository.
- Validate live integrations under separately provisioned Preview environment configuration before any end-to-end AI or authenticated-space signoff.
- Remove unused legacy landing/navigation components only as a separate post-release cleanup, after an import-dependency audit.
