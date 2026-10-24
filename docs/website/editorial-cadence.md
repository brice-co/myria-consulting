# Myria Consulting — video and editorial operating cadence

## Website content release rule
The website does not claim a research feed is continuously live. Sources are curated and human-reviewed. An external study does not become a Myria accomplishment or a client reference.

### Monthly — research verification
- Review source link accessibility, publisher, edition, publication year and supporting evidence.
- Confirm the short "Research finding" text still matches the paper/article; separate all interpretation clearly.
- When research evolves, change the registry `lib/insights/studies.ts` and record the date actually reviewed. Remove stale or superseded entries.
- Verify shared preview image and social description; republish only after an editorial check.

### Quarterly — original expertise
Publish an original, substantive Myria-authored note connecting a management problem to decision ownership, end-to-end work, governance, and adoption. Good article ingredients:
1. One problem leaders recognize
2. A decision or workflow map
3. A practical method or framework
4. Limitations and trade-offs
5. An example clearly identified as hypothetical unless independently authorized
6. A working link to the relevant Myria service or Lab

The first original practice note is `/insights/from-strategy-to-execution`, without invented client results.

### Video production — no fabricated demos
The three experience cards already have optional `videoSrc` and `posterSrc` fields. They now also support `captionsSrc` pointing to a WebVTT file.

**Advisory Lab**
- 60–90 seconds; show real challenge intake, facilitated exploration and a human-led synthesis.
- Blur real client details and eliminate sensitive content.

**Virtual Advisory Team**
- 60–90 seconds; show one authentic handoff between specialist agents, the resulting output and human decision review.
- Do not portray a simulated handoff as a production case.

**Collaborative Workspace**
- 60–90 seconds; capture actual Liveblocks session presence, a shared finding, comment and approved decision.
- Use consent-cleared demo participants or invented demo data, labelled as demonstration.

**Publishing acceptance**
- Video file in `public/videos/` (or approved CDN), accessible poster, human-edited caption .vtt, short transcript and media description.
- Video controls, no autoplay audio, no confidential identifiers or secrets.
- Test paused poster, keyboard playback and reduced-motion preference at mobile and desktop widths.
- Set the corresponding video/captions paths in `components/consulting/home/experience-content.ts` only when all files have been supplied and tested.

## Brochure originals
The PDF preview and download actions rely on the original three binaries under `public/brochures/`. The user's archive has been extracted and verified byte-identical to the source. A GitHub-ready asset package is provided separately because the source connector does not support direct transfer of the multi-megabyte binary files from the conversation. Publishing is incomplete until those assets are committed to the site repository.
