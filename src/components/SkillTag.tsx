import { SKILL_CATEGORY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TINTS: Record<string, string> = {
  Frontend: "bg-cyan/12 text-cyan border-cyan/25",
  Backend: "bg-violet/15 text-violet border-violet/30",
  Design: "bg-pink/12 text-pink border-pink/25",
  Data: "bg-amber/12 text-amber border-amber/25",
  DevOps: "bg-success/12 text-success border-success/25",
  Product: "bg-white/8 text-foreground/85 border-white/15",
};

export function SkillTag({
  skill,
  className,
  onRemove,
}: {
  skill: string;
  className?: string;
  onRemove?: () => void;
}) {
  const tint = TINTS[SKILL_CATEGORY[skill] ?? ""] ?? "bg-white/8 text-foreground/80 border-white/15";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        tint,
        className,
      )}
    >
      {skill}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${skill}`}
          className="-mr-0.5 rounded-full px-1 text-current/70 transition-colors hover:text-current"
        >
          ×
        </button>
      )}
    </span>
  );
}
