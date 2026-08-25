import { InitialsAvatar } from "./Avatar";
import { MatchBadge } from "./MatchBadge";
import { SkillTag } from "./SkillTag";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  candidateById,
  matchCandidateToProject,
  matchReasons,
  type Candidate,
  type Project,
} from "@/lib/mock-data";

export function ProjectDetailsModal({
  project,
  viewer,
  applied,
  onClose,
  onRequest,
}: {
  project: Project | null;
  viewer: Candidate;
  applied?: boolean;
  onClose: () => void;
  onRequest: (p: Project) => void;
}) {
  if (!project) return null;
  const owner = candidateById(project.ownerId);
  const breakdown = matchCandidateToProject(viewer, project);
  const isOwn = project.ownerId === viewer.id;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[88vh] max-w-xl overflow-y-auto rounded-2xl border-white/12 bg-card/85 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-left">
            <span className="min-w-0 flex-1 truncate">{project.title}</span>
            {!isOwn && <MatchBadge breakdown={breakdown} className="shrink-0" />}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-xl p-3">
            <p className="text-[11px] text-muted-foreground">Team</p>
            <p className="text-lg font-bold tabular-nums">
              {project.members}/{project.teamSize}
            </p>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-[11px] text-muted-foreground">Commitment</p>
            <p className="text-lg font-bold">{project.commitment}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold">Roles</p>
          <div className="flex flex-wrap gap-1.5">
            {project.requiredRoles.map((r) => (
              <span
                key={r.role}
                className={
                  r.filled
                    ? "rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[11px] text-foreground/70"
                    : "rounded-full border border-dashed border-violet/50 bg-violet/10 px-2.5 py-0.5 text-[11px] text-violet"
                }
              >
                {r.role}
                {r.filled ? " ✓" : ""}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold">Skills still needed</p>
          <div className="flex flex-wrap gap-1.5">
            {project.missingSkills.map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
          </div>
        </div>

        {!isOwn && (
          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs font-semibold">Why you'd fit</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {matchReasons(viewer, project).map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <InitialsAvatar id={project.ownerId} name={owner?.name ?? "Owner"} size="sm" />
            <p className="truncate text-xs text-muted-foreground">
              Posted by <span className="font-medium text-foreground">{owner?.name}</span> ·{" "}
              {project.postedAgo}
            </p>
          </div>
          {!isOwn && (
            <Button variant="hero" size="sm" disabled={applied} onClick={() => onRequest(project)}>
              {applied ? "Requested" : "Request to Join"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
