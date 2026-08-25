import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "./TagInput";
import { COMMITMENTS, type Commitment, type Project } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS = [
  "Frontend Dev",
  "Backend Dev",
  "Full-Stack Dev",
  "UI Designer",
  "Data Scientist",
  "DevOps",
  "PM",
];

export function PostProjectModal({
  open,
  onOpenChange,
  ownerId,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  ownerId: string;
  onCreate: (p: Project) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState(4);
  const [commitment, setCommitment] = useState<Commitment>("10-15 hrs/wk");
  const [deadline, setDeadline] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setRoles([]);
    setSkills([]);
    setTeamSize(4);
    setCommitment("10-15 hrs/wk");
    setDeadline("");
  };

  const submit = () => {
    onCreate({
      id: `p-${Date.now()}`,
      title: title.trim() || "Untitled Project",
      description: description.trim() || "No description yet.",
      ownerId,
      requiredRoles: (roles.length ? roles : ["Frontend Dev"]).map((role) => ({ role, filled: false })),
      missingSkills: skills.length ? skills : ["React"],
      members: 1,
      teamSize,
      commitment,
      interests: ["Web Apps"],
      deadline: deadline || "Flexible",
      postedAgo: "just now",
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-lg overflow-y-auto rounded-2xl border-white/12 bg-card/85 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle>Post a project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="p-title" className="text-xs font-semibold">Project title</label>
            <Input
              id="p-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. EcoTrack"
              className="rounded-xl border-white/12 bg-white/5"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="p-desc" className="text-xs font-semibold">Description</label>
            <Textarea
              id="p-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What are you building and why?"
              className="resize-none rounded-xl border-white/12 bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold">Required roles</p>
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((r) => {
                const active = roles.includes(r);
                return (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setRoles((prev) => (active ? prev.filter((x) => x !== r) : [...prev, r]))
                    }
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                      active
                        ? "border-transparent gradient-accent text-background"
                        : "border-white/12 bg-white/5 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold">Missing skill tags</p>
            <TagInput value={skills} onChange={setSkills} placeholder="Add a skill and press Enter" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="p-size" className="text-xs font-semibold">Team size</label>
              <Input
                id="p-size"
                type="number"
                min={2}
                max={12}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value) || 2)}
                className="rounded-xl border-white/12 bg-white/5"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="p-deadline" className="text-xs font-semibold">Deadline</label>
              <Input
                id="p-deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Nov 30, 2026"
                className="rounded-xl border-white/12 bg-white/5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold">Commitment level</p>
            <div className="flex flex-wrap gap-2">
              {COMMITMENTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={commitment === c}
                  onClick={() => setCommitment(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                    commitment === c
                      ? "border-transparent gradient-accent text-background"
                      : "border-white/12 bg-white/5 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="glass" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="hero" onClick={submit}>
            Publish project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
