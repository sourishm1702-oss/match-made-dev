import { createFileRoute } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CandidateCard } from "@/components/CandidateCard";
import { EMPTY_FILTERS, FiltersPanel, type Filters } from "@/components/FiltersPanel";
import { RequestModal, type RequestTarget } from "@/components/RequestModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/app-store";
import { AVAILABILITY_OPTIONS, filterCandidates } from "@/lib/filtering";
import { matchCandidateToProject } from "@/lib/mock-data";

export const Route = createFileRoute("/talent")({
  head: () => ({
    meta: [
      { title: "Talent Feed — ProjectMatch" },
      {
        name: "description",
        content:
          "Browse developers, designers, data scientists, and PMs looking for teams, with AI match scores against your open project.",
      },
      { property: "og:title", content: "Talent Feed — ProjectMatch" },
      {
        property: "og:description",
        content: "Find collaborators by skill, role, availability, and experience level.",
      },
    ],
  }),
  component: TalentFeed,
});

function TalentFeed() {
  const store = useStore();
  const { user, projects, candidates, invites } = store;
  const myProjects = projects.filter((p) => p.ownerId === user.id);
  const [projectId, setProjectId] = useState(myProjects[0]?.id ?? "");
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const [target, setTarget] = useState<RequestTarget | null>(null);

  const contextProject = myProjects.find((p) => p.id === projectId) ?? myProjects[0];

  const visible = useMemo(() => {
    const list = filterCandidates(candidates, filters);
    if (!contextProject) return list;
    return [...list].sort(
      (a, b) =>
        matchCandidateToProject(b, contextProject).score -
        matchCandidateToProject(a, contextProject).score,
    );
  }, [candidates, filters, contextProject]);

  const send = (t: RequestTarget) => {
    store.invite(t.candidate.id);
    store.logActivity(`You invited ${t.candidate.name} to '${t.project.title}'`, "sent");
    toast.success("Invite sent", { description: `${t.candidate.name} has been invited.` });
    setTarget(null);
  };

  return (
    <div className="space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">Talent Feed</h1>
          <p className="text-xs text-muted-foreground">
            {visible.length} candidate{visible.length === 1 ? "" : "s"}
            {contextProject ? ` scored for ${contextProject.title}` : ""}
          </p>
        </div>
        {myProjects.length > 0 && (
          <Select value={contextProject?.id ?? ""} onValueChange={setProjectId}>
            <SelectTrigger className="h-8 w-[190px] shrink-0 rounded-full border-white/12 bg-white/5 text-xs">
              <SelectValue placeholder="Score against…" />
            </SelectTrigger>
            <SelectContent>
              {myProjects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  Match for {p.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          extraTitle="Availability"
          extraOptions={AVAILABILITY_OPTIONS}
        />

        <div className="min-w-0 flex-1">
          {visible.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {visible.map((c) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  {...(contextProject ? { contextProject } : {})}
                  invited={invites.includes(c.id)}
                  onInvite={(candidate) => {
                    if (contextProject) {
                      setTarget({ kind: "candidate", project: contextProject, candidate });
                    } else {
                      toast.info("Post a project first", {
                        description: "You need an open project to invite someone.",
                      });
                    }
                  }}
                  onView={(candidate) => {
                    toast.info(candidate.name, { description: candidate.bio });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="glass grid place-items-center gap-3 rounded-2xl p-14 text-center">
              <SearchX className="h-7 w-7 text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">No candidates match your filters</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Loosen the skill requirements or include more availability states.
              </p>
              <Button variant="glass" size="sm" onClick={() => setFilters({ ...EMPTY_FILTERS })}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <RequestModal target={target} onClose={() => setTarget(null)} onSend={send} />
    </div>
  );
}
