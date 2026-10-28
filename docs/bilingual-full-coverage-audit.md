# Myria bilingual coverage audit

Source: GitHub branch `seo/french-market-pages-2026-10`, 65 page modules (59 outside /fr, 6 under /fr).

**Meaning of columns:** Shared=component parity in progress; FR=French route exists; QA=not verified unless stated.

| Page / experience | Existing route | French equivalent | Assessment |
|---|---|---|---|
| cookie-policy | `/cookie-policy` | — | Not localized; English destination |
| privacy-policy | `/privacy-policy` | — | Not localized; English destination |
| terms-of-service | `/terms-of-service` | — | Not localized; English destination |
| about-myria | `/about-myria` | — | Not localized; English destination |
| admin/labs | `/admin/labs` | — | Application/auth route: scoped migration, preserve access control |
| admin/login | `/admin/login` | — | Application/auth route: scoped migration, preserve access control |
| advisory-lab | `/advisory-lab` | — | Not localized; English destination |
| client-portal | `/client-portal` | — | Application/auth route: scoped migration, preserve access control |
| collaborative-advisory/[sessionId] | `/collaborative-advisory/[sessionId]` | — | Not localized; English destination |
| collaborative-advisory/demo-session | `/collaborative-advisory/demo-session` | — | Not localized; English destination |
| contact-myria | `/contact-myria` | `/fr/contact` | French route present; layouts not consolidated |
| experience-lab | `/experience-lab` | — | Not localized; English destination |
| labs/[slug] | `/labs/[slug]` | — | Not localized; English destination |
| labs | `/labs` | — | Not localized; English destination |
| virtual-advisory-team | `/virtual-advisory-team` | — | Not localized; English destination |
| workspace/invitations | `/workspace/invitations` | — | Application/auth route: scoped migration, preserve access control |
| workspace/labs | `/workspace/labs` | — | Application/auth route: scoped migration, preserve access control |
| workspace/members | `/workspace/members` | — | Application/auth route: scoped migration, preserve access control |
| workspace | `/workspace` | — | Application/auth route: scoped migration, preserve access control |
| workspace/roles | `/workspace/roles` | — | Application/auth route: scoped migration, preserve access control |
| workspace/settings | `/workspace/settings` | — | Application/auth route: scoped migration, preserve access control |
| workspace/teams | `/workspace/teams` | — | Application/auth route: scoped migration, preserve access control |
| advisory-experience/invite | `/advisory-experience/invite` | — | Not localized; English destination |
| ai-enablement | `/ai-enablement` | — | Not localized; English destination |
| auth/invitations/[invitationId] | `/auth/invitations/[invitationId]` | — | Application/auth route: scoped migration, preserve access control |
| auth/invitations | `/auth/invitations` | — | Application/auth route: scoped migration, preserve access control |
| auth/sign-in | `/auth/sign-in` | — | Application/auth route: scoped migration, preserve access control |
| experience/ai-advisory | `/experience/ai-advisory` | — | Not localized; English destination |
| experience/intelligent-labs | `/experience/intelligent-labs` | — | Not localized; English destination |
| experience/intelligent-labs/register | `/experience/intelligent-labs/register` | — | Not localized; English destination |
| experience/interactive-workspace | `/experience/interactive-workspace` | — | Application/auth route: scoped migration, preserve access control |
| experience/myria-os | `/experience/myria-os` | — | Not localized; English destination |
| experience/videos | `/experience/videos` | — | Not localized; English destination |
| experience/workspace | `/experience/workspace` | — | Application/auth route: scoped migration, preserve access control |
| insights/from-strategy-to-execution | `/insights/from-strategy-to-execution` | — | Not localized; English destination |
| insights | `/insights` | `/fr/perspectives` | French overview only; research articles incomplete |
| our-approach/management-model | `/our-approach/management-model` | `/fr/notre-approche/modele-de-gestion` | French page exists; functional QA pending |
| / | `/` | `/fr` | French page exists; functional QA pending |
| portal/labs/[slug] | `/portal/labs/[slug]` | — | Application/auth route: scoped migration, preserve access control |
| portal/labs/[slug]/sessions/[sessionId] | `/portal/labs/[slug]/sessions/[sessionId]` | — | Application/auth route: scoped migration, preserve access control |
| portal/labs/[slug]/sessions/new | `/portal/labs/[slug]/sessions/new` | — | Application/auth route: scoped migration, preserve access control |
| portal/labs | `/portal/labs` | — | Application/auth route: scoped migration, preserve access control |
| portal | `/portal` | — | Application/auth route: scoped migration, preserve access control |
| portal/reports | `/portal/reports` | — | Application/auth route: scoped migration, preserve access control |
| redesign-preview | `/redesign-preview` | — | Not localized; English destination |
| resources/architecture | `/resources/architecture` | — | Not localized; English destination |
| resources/brochures/ai-governance | `/resources/brochures/ai-governance` | — | Not localized; English destination |
| resources/brochures | `/resources/brochures` | — | Not localized; English destination |
| resources/brochures/strategic-clarity | `/resources/brochures/strategic-clarity` | — | Not localized; English destination |
| resources/guides/[slug] | `/resources/guides/[slug]` | — | Not localized; English destination |
| resources/guides | `/resources/guides` | — | Not localized; English destination |
| resources/playbook | `/resources/playbook` | — | Not localized; English destination |
| services/[slug] | `/services/[slug]` | `/fr/services/[slug]` | French page exists; functional QA pending |
| services/fractional-cto | `/services/fractional-cto` | — | Not localized; English destination |
| services | `/services` | `/fr/services` | French page exists; functional QA pending |
| solutions/conversational-ai | `/solutions/conversational-ai` | — | Not localized; English destination |
| solutions | `/solutions` | — | Not localized; English destination |
| use-cases/[slug] | `/use-cases/[slug]` | — | Not localized; English destination |
| use-cases | `/use-cases` | — | Not localized; English destination |

## Existing French routes
- `/fr/contact`
- `/fr/notre-approche/modele-de-gestion`
- `/fr`
- `/fr/perspectives`
- `/fr/services/[slug]`
- `/fr/services`

## Foundation milestones
- [x] `next-intl` dependency and Next.js plugin configured
- [x] English/French message catalogs, routing intent and French client provider added
- [x] Explicit browser locale detection disabled in routing intent
- [ ] Dependency installation and lockfile consistency checked by CI
- [ ] Configure full locale-based routing without affecting API, admin, portal and Better Auth
- [ ] Correct document-level HTML `lang` attribute on French routes
- [ ] Migrate legacy inline translation literals to message catalog
- [ ] Complete French translation and QA of Discovery Labs and related workflows
- [ ] Complete French translation and QA of Insights, research, brochures, PDFs, resources
- [ ] Complete portal interfaces, notifications and agent language behavior
- [ ] Check canonical/hreflang for genuine equivalent content and remove premature alternates
- [ ] Mobile, keyboard, screen reader, runtime and SEO validation

## Release rule
Keep PR #9 as a draft. Do not merge while any critical parity and authentication isolation checks remain open.
