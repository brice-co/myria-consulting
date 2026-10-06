import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ExperienceFooter() {
  return (
    <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-border pt-7 sm:flex-row">
      <p className="max-w-xl text-xs leading-6 text-muted-foreground">
        These experiences demonstrate how Myria
        is exploring the intersection of management
        consulting, collaborative work and
        enterprise AI.
      </p>

      <Link
        href="/experience/interactive-workspace"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#173039] px-5 py-3 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Explore all experiences
        <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}