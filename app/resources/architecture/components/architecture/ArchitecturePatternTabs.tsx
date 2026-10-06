import type { PatternTab } from "@/app/resources/architecture/lib/architecture/types";
import { Button } from "@/components/ui/button";

type Props = {
  tabs: PatternTab[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ArchitecturePatternTabs({
  tabs,
  activeId,
  onSelect,
}: Props) {
  return (
    <div
      className="mb-5 flex flex-wrap gap-2"
      role="tablist"
      aria-label="Pattern disciplines"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.id === activeId;

        return (
          <Button
            key={tab.id}
            variant={active ? "secondary" : "ghost"}
            onClick={() => onSelect(tab.id)}
            role="tab"
            aria-selected={active}
            className={
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }
          >
            <Icon />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}