import { Users, Clock, CalendarDays } from "lucide-react";
import { InitialsAvatar } from "./Avatar";
import { MatchBadge } from "./MatchBadge";
import { SkillTag } from "./SkillTag";
import { Button } from "@/components/ui/button";
import { candidateById, matchCandidateToProject, type Candidate, type Project } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  viewer,
  applied,
  onRequest,
  onDetails,
  className,
}: {
  project: Project;
  viewer: Candidate;
  applied?: boolean;
  onRequest: (project: Project) => void;
  onDetails: (project: Project) => void;
  className?: string;
}) {
  const owner = candidateById(project.ownerId);
  const breakdown = matchCandidateToProject(viewer, project);
  const isOwn = project.ownerId === viewer.id;
  const openRoles = project.requiredRoles.filter((r) => !r.filled).length;

  return (
    <article
      className={cn(
        "glass glass-hover flex flex-col gap-4 rounded-2xl p-5",
        className,
      )}
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        {isOwn ? (
          <span className="shrink-0 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            Your project
          </span>
        ) : (
          <MatchBadge breakdown={breakdown} className="shrink-0" />
        )}
      </header>

      <div className="flex flex-wrap gap-1.5">
        {project.requiredRoles.map((r) => (
          <span
            key={r.role}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              r.filled
                ? "border border-white/10 bg-white/10 text-foreground/70"
                : "border border-dashed border-violet/50 bg-violet/10 text-violet",
            )}
          >
            {r.role}
            {r.filled ? " ✓" : ""}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className="font-semibold text-cyan">Needs:</span>
        {project.missingSkills.map((s) => (
          <SkillTag key={s} skill={s} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden />
          <span className="font-bold text-foreground tabular-nums">
            {project.members}/{project.teamSize}
          </span>
          members
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {project.commitment}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          {project.deadline}
        </span>
        <span className="ml-auto">{openRoles} roles open</span>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <InitialsAvatar id={project.ownerId} name={owner?.name ?? "Unknown"} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium">{owner?.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">{project.postedAgo}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="glass" size="sm" onClick={() => onDetails(project)}>
            Details
          </Button>
          {!isOwn && (
            <Button
              variant="hero"
              size="sm"
              disabled={applied}
              onClick={() => onRequest(project)}
            >
              {applied ? "Requested" : "Request to Join"}
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}
