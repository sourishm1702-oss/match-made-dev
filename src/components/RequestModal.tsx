import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { InitialsAvatar } from "./Avatar";
import { MatchBadge } from "./MatchBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  matchCandidateToProject,
  matchReasons,
  type Candidate,
  type Project,
} from "@/lib/mock-data";

export type RequestTarget =
  | { kind: "project"; project: Project; candidate: Candidate }
  | { kind: "candidate"; project: Project; candidate: Candidate };

export function RequestModal({
  target,
  onClose,
  onSend,
}: {
  target: RequestTarget | null;
  onClose: () => void;
  onSend: (target: RequestTarget, message: string) => void;
}) {
  const [reasoning, setReasoning] = useState("");
  const [message, setMessage] = useState("");

  const isProject = target?.kind === "project";
  const headline = target ? (isProject ? target.project.title : target.candidate.name) : "";

  useEffect(() => {
    if (!target) return;
    setReasoning(matchReasons(target.candidate, target.project).map((r) => `• ${r}`).join("\n"));
    setMessage(
      isProject
        ? `Hi ${target.project.title === "" ? "there" : ""}! I'd love to join ${target.project.title} — I've been building with ${target.candidate.skills.slice(0, 2).join(" and ")} and this is exactly the kind of project I want to ship. Happy to start on the open ${target.project.requiredRoles.find((r) => !r.filled)?.role ?? "role"} work this week.`
        : `Hi ${target.candidate.name.split(" ")[0]}! I'm building ${target.project.title} and your ${target.candidate.skills.slice(0, 2).join(" / ")} background lines up really well with what we still need. Would you want to join the team?`,
    );
  }, [target, isProject]);

  if (!target) return null;

  const breakdown = matchCandidateToProject(target.candidate, target.project);
  const avatarId = isProject ? target.project.ownerId : target.candidate.id;
  const avatarName = isProject ? target.project.title : target.candidate.name;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl border-white/12 bg-card/85 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-left">
            <InitialsAvatar id={avatarId} name={avatarName} />
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold">{headline}</span>
              <span className="block text-xs font-normal text-muted-foreground">
                {isProject ? "Request to join team" : "Invite to " + target.project.title}
              </span>
            </span>
            <MatchBadge breakdown={breakdown} className="ml-auto shrink-0" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="reasoning" className="flex items-center gap-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-violet" aria-hidden /> AI match reasoning
              <span className="font-normal text-muted-foreground">(editable)</span>
            </label>
            <Textarea
              id="reasoning"
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              rows={5}
              className="resize-none rounded-xl border-white/12 bg-white/5 text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-semibold">
              Personal message <span className="font-normal text-muted-foreground">(AI-suggested)</span>
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none rounded-xl border-white/12 bg-white/5 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="glass" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="hero" onClick={() => onSend(target, message)}>
            {isProject ? "Send Request" : "Send Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
