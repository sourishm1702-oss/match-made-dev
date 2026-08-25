import { createFileRoute } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CandidateCard } from "@/components/CandidateCard";
import { EMPTY_FILTERS, FiltersPanel, type Filters } from "@/components/FiltersPanel";
import { RequestModal, type RequestTarget } from "@/components/RequestModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Sort = "match" | "newest" | "roles";

function TalentFeed() {
  const store = useStore();
  const { user, projects, candidates, invites } = store;
  const myProjects = projects.filter((p) => p.ownerId === user.id);
  const [projectId, setProjectId] = useState(myProjects[0]?.id ?? "");
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const [target, setTarget] = useState<RequestTarget | null>(null);
  const [sort, setSort] = useState<Sort>("match");

  const contextProject = myProjects.find((p) => p.id === projectId) ?? myProjects[0];

  const visible = useMemo(() => {
    const list = filterCandidates(candidates, filters);
    const sorted = [...list];
    if (sort === "newest") {
      sorted.reverse();
    } else if (sort === "roles") {
      sorted.sort((a, b) => b.skills.length - a.skills.length);
    } else if (contextProject) {
      sorted.sort(
        (a, b) =>
          matchCandidateToProject(b, contextProject).score -
          matchCandidateToProject(a, contextProject).score,
      );
    }
    return sorted;
  }, [candidates, filters, contextProject, sort]);

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

      <div className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            placeholder="Search people by name, role, or skill…"
            aria-label="Search candidates"
            className="rounded-full border-white/12 bg-white/5 pl-9"
          />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
          <SelectTrigger
            aria-label="Sort candidates"
            className="h-10 w-full shrink-0 rounded-full border-white/12 bg-white/5 text-xs sm:w-[210px]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Sort by: Best Match</SelectItem>
            <SelectItem value="newest">Sort by: Newest</SelectItem>
            <SelectItem value="roles">Sort by: Most Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
