import { PlaybookChapters } from "./_components/playbook-chapters";
import { PlaybookGate } from "./_components/playbook-gate";
import { PlaybookHero } from "./_components/playbook-hero";
import { PlaybookLearningPath } from "./_components/playbook-learning-path";
import { PlaybookPreview } from "./_components/playbook-preview";
import { RelatedResources } from "./_components/related-resources";
import { playbook } from "./_data/playbook";

export default function PlaybookPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ed] text-[#173039]">
      <PlaybookHero playbook={playbook} />
      <PlaybookLearningPath />
      <PlaybookPreview parts={playbook.previewParts} />
      <PlaybookChapters chapters={playbook.chapters} />
      <PlaybookGate />
      <RelatedResources />
    </main>
  );
}
