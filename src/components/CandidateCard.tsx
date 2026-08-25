import { InitialsAvatar } from "./Avatar";
import { MatchBadge } from "./MatchBadge";
import { SkillTag } from "./SkillTag";
import { Button } from "@/components/ui/button";
import {
  matchCandidateToProject,
  type Candidate,
  type Project,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const AVAILABILITY_STYLE: Record<string, { dot: string; text: string }> = {
  "Actively Looking": { dot: "bg-success", text: "text-success" },
  "Open to Offers": { dot: "bg-amber", text: "text-amber" },
  "Not Available": { dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

export function AvailabilityBadge({ status }: { status: string }) {
  const s = AVAILABILITY_STYLE[status] ?? AVAILABILITY_STYLE["Not Available"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium",
        s.text,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden />
      {status}
    </span>
  );
}

export function CandidateCard({
  candidate,
  contextProject,
  invited,
  onInvite,
  onView,
  className,
}: {
  candidate: Candidate;
  contextProject?: Project;
  invited?: boolean;
  onInvite: (candidate: Candidate) => void;
  onView: (candidate: Candidate) => void;
  className?: string;
}) {
  const breakdown = contextProject ? matchCandidateToProject(candidate, contextProject) : undefined;
  const visible = candidate.skills.slice(0, 4);
  const overflow = candidate.skills.length - visible.length;

  return (
    <article className={cn("glass glass-hover flex flex-col gap-4 rounded-2xl p-5", className)}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <InitialsAvatar id={candidate.id} name={candidate.name} size="lg" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{candidate.name}</h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {candidate.tagline}
            </p>
          </div>
        </div>
        {breakdown && <MatchBadge breakdown={breakdown} className="shrink-0" />}
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-violet/30 bg-violet/12 px-2.5 py-0.5 text-[11px] font-medium text-violet">
          {candidate.role}
        </span>
        <AvailabilityBadge status={candidate.availability} />
        <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {candidate.experience}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {visible.map((s) => (
          <SkillTag key={s} skill={s} />
        ))}
        {overflow > 0 && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            +{overflow} more
          </span>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground">
        Interests: {candidate.interests.join(", ")} · {candidate.commitment}
      </p>

      <footer className="mt-auto flex items-center justify-end gap-2 border-t border-white/10 pt-4">
        <Button variant="glass" size="sm" onClick={() => onView(candidate)}>
          View Profile
        </Button>
        <Button variant="hero" size="sm" disabled={invited} onClick={() => onInvite(candidate)}>
          {invited ? "Invited" : "Invite to Project"}
        </Button>
      </footer>
    </article>
  );
}
