import { Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MatchBreakdown } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function tier(score: number) {
  if (score >= 90)
    return {
      pill: "border-transparent text-background shadow-[0_0_24px_-6px_oklch(0.63_0.222_302/0.8)]",
      style: { backgroundImage: "var(--gradient-accent)" },
      bar: "var(--gradient-accent)",
    };
  if (score >= 70)
    return { pill: "border-cyan/40 bg-cyan/15 text-cyan", style: undefined, bar: "var(--cyan)" };
  if (score >= 50)
    return { pill: "border-amber/40 bg-amber/15 text-amber", style: undefined, bar: "var(--amber)" };
  return {
    pill: "border-white/15 bg-white/8 text-muted-foreground",
    style: undefined,
    bar: "var(--muted-foreground)",
  };
}

function Row({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export function MatchBadge({
  breakdown,
  label = "Match",
  className,
}: {
  breakdown: MatchBreakdown;
  label?: string;
  className?: string;
}) {
  const t = tier(breakdown.score);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${breakdown.score}% match — view breakdown`}
          style={t.style}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            t.pill,
            className,
          )}
        >
          <Sparkles className="h-3 w-3" aria-hidden />
          {breakdown.score}% {label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 glass rounded-xl p-3 text-foreground" align="end">
        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-violet" aria-hidden /> AI match breakdown
        </p>
        <div className="space-y-2.5">
          <Row label="Skill overlap" value={breakdown.skillOverlap} color={t.bar} />
          <Row label="Interest alignment" value={breakdown.interestAlignment} color={t.bar} />
          <Row label="Availability fit" value={breakdown.availabilityFit} color={t.bar} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
