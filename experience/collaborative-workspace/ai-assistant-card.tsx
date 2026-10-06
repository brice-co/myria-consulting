import { Bot, Sparkles } from "lucide-react";

type Props = {
  eyebrow?: string;
  children: React.ReactNode;
};

export function AIAssistantCard({
  eyebrow = "MYRIA AI",
  children,
}: Props) {
  return (
    <div className="rounded-xl border border-primary/20 bg-background p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
            <Bot size={12} />
          </div>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        </div>

        <Sparkles
          size={12}
          className="text-primary"
        />
      </div>

      <div className="text-[11px] leading-5 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}