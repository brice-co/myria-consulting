# Phase 3 — Experience section and visual/functional acceptance

## What was added
An **Experience How Myria Works** section follows the Discovery Lab. It includes:
1. Advisory Lab — `/advisory-lab`
2. Virtual Advisory Team — `/virtual-advisory-team`
3. Collaborative Workspace — `/collaborative-advisory/demo-session`

Links point to existing repository routes. They may require provider configuration or access to function in the Preview environment.

Video slots are **not** fake players. Until a real video is configured, each card shows a labelled editorial illustration with no Play button. Real recordings can be supplied later:
- copy files to `public/videos/` and optionally images to `public/images/`;
- edit `components/consulting/preview/experience-content.ts` fields `videoSrc` and `posterSrc`;
- example: `videoSrc: "/videos/advisory-lab.mp4"`, `posterSrc: "/images/advisory-lab-poster.webp"`;
- the card switches automatically to an HTML5 `<video controls playsInline preload="metadata">` player.

## Layout and accessibility decisions
- Business positioning and Discovery Lab appear before product demonstrations.
- Replaced the “Challenges” navigation item with “Experience” to avoid adding another full-width item. Challenges remain accessible with the scroll cue.
- Structured semantic `<section>`, `<article>`, heading, and link elements. Decorative media is labelled as illustration rather than footage.
- Responsive columns: three on large desktop, two with a full-width third card on tablet, one on mobile.
- Existing motion reduction and focused keyboard navigation remain unchanged.
- Content is deliberately specific to advisory work, without fictional testimonials or fabricated client results.

## Release readiness
- Verify Vercel compilation and route output after latest commit.
- Check desktop and mobile screenshot from an actual browser with authorized preview access, confirm no horizontal scroll and readable headline.
- Test nav links, Escape behavior on mobile, and CTA routes.
- Check reduced-motion experience.
- Confirm actual video assets/license and replace hero's external image before promotion.
- Validate private experience routes with suitable Preview environment variables; never copy live secrets into Preview.
- Do not merge into production until reviewed.
