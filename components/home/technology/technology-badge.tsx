type TechnologyBadgeProps = {
  name: string;
};

export function TechnologyBadge({
  name,
}: TechnologyBadgeProps) {
  return (
    <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] font-medium text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-primary">
      {name}
    </span>
  );
}