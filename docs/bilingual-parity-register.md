# Myria Consulting / Myria Conseil — bilingual parity register

Status: working register for draft PR #9. **Do not merge before validation.**

## Rules
- One shared experience and design system; no independently designed French marketing pages.
- A translated page must preserve the English page's sections, assets, interactive behavior, layout and depth of content.
- Language switching must remain on the corresponding route; never fall back to a different homepage.
- French brand: **Myria Conseil**. English brand: **Myria Consulting**.
- Only declare `hreflang` for genuine equivalent pages. Do not manufacture reciprocal alternatives.
- Verify production-appropriate HTML `lang`, canonical URLs, sitemap, mobile, keyboard and SEO metadata.
- If a link leads to content available only in English, don't silently suggest the destination is localized.

## Route status
| Page family | Shared layout | French copy | Same destinations | QA |
|---|---|---|---|---|
| Global header / footer | Shared | In progress | In progress; untranslated destinations remain English | Not validated |
| Home / | Shared core components | Core homepage content translated | Some interactive experiences and resources remain English | Not validated |
| Services hub | Separate EN/FR rendering | French written | Links to paired consulting pages | Requires layout consolidation |
| Six service detail pages | Separate EN/FR rendering | French written | Paired EN/FR URLs | Requires layout consolidation |
| Contact | Separate EN/FR rendering | French text | Email route needs business verification | Requires layout consolidation |
| Insights / perspectives | Separate EN/FR rendering | Overview only | Full articles are not translated | Not complete |
| Management model | English-only | Not started | English-only | Not started |
| Resources, guides, playbook | English-only | Not started | English-only | Not started |
| Discovery Lab and experiences | English-only | Not started | English-only | Not started |
| About, privacy, terms | English-only | Not started | English-only | Not started |

## Iteration 2 homepage acceptance
- [x] French and English render the same page section component tree.
- [x] Hero, challenge cards, capabilities, management philosophy and Discovery intro are localized.
- [x] Experience cards, illustration labels, Insights cards, research commentary and footer labels localized.
- [x] Language switch uses known paired routes and avoids misleading homepage fallback.
- [ ] Verify newest Vercel build successful.
- [ ] Browser audit desktop/mobile against English page.
- [ ] Audit outbound links for English-only target warnings.
- [ ] Confirm document-level `html lang=fr-CA` on French route.
- [ ] Implement formal `next-intl` routing and centralized messages, scoped safely around portal/auth routes.
- [ ] Validate all home interactions and linked experiences in French.

## Next iteration
Consolidate service hub and detail page rendering so only content and URL vary by locale.
