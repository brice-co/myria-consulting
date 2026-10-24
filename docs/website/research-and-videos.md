# Editorial research and real video integration

## Third-party research: publication rules
The four external research entries live in `lib/insights/studies.ts`. The corresponding listing is `/insights`. The homepage shows the three most relevant cards through `ResearchSection.tsx`.

Each entry contains:
- The verified original publisher, specific report/article, source URL, and the supported finding
- A distinct **Myria's perspective** (not attributed to the publisher)
- Category/year, original editorial SVG, accessible description
- Optional publication date where verifiable

Do not automatically scrape and republish publisher text or imagery. Human review is required before changing claims, adding articles, or assigning a publication year. Verify URLs quarterly and remove entries that become inaccessible or out of date. Do not imply affiliation, endorsement or that Myria conducted the cited research.

## Myria expertise strategy
Keep original, authored thinking visibly separate from third-party findings:
1. Myria Management Model
2. Finding the Right AI Opportunities
3. AI-Enabled Enterprise Playbook

Potential next additions: original methodology articles, workshop excerpts, decision maps, and approved case examples with transparent evidence and outcomes. Avoid invented client stories.

## Actual video workflow
Existing video-enabled cards are configured in `components/consulting/home/experience-content.ts`.
- Advisory Lab: 45–90 second narrated screen walkthrough, showing challenge → questions → perspective → next step.
- Virtual Advisory Team: show one real specialist handoff and the human advisor's interpretation.
- Collaborative Workspace: show a real shared board, comment/decision, participant handoff and tracked action.

Upload consent-cleared .mp4/.webm to `public/videos/`, add optional posters to `public/images/`, then update the `videoSrc` and `posterSrc` for each entry. Existing `ExperienceMedia` already changes from illustration to HTML video with visible playback controls. Do not upload real client identifiers, API keys, internal transcripts, or confidential details. Subtitles/captions and descriptive transcripts should accompany published videos.

## Brochure behavior
The original supplied brochure code included a **Preview PDF** external-tab link and a **Download** anchor. These actions are restored in `BrochurePdfActions`. For reliability, these actions appear only if the supplied PDF file exists under `public/brochures`; otherwise the page keeps the searchable overview and reports that the file is not yet available.

To complete activation, extract the upload-ready `myria-pdf-public-assets.zip` in the repository root, commit its three `public/brochures/*.pdf` files, and redeploy. No code changes should then be required. The user-provided PDFs are not replaced by recreated summaries.
