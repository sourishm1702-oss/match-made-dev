import { createFileRoute } from "@tanstack/react-router";
import { Plus, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EMPTY_FILTERS, FiltersPanel, type Filters } from "@/components/FiltersPanel";
import { PostProjectModal } from "@/components/PostProjectModal";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
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
import { ROLES_OPEN_OPTIONS, filterProjects } from "@/lib/filtering";
import { matchCandidateToProject, type Project } from "@/lib/mock-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Feed — ProjectMatch" },
      {
        name: "description",
        content:
          "Browse open projects looking for teammates, filtered by skills, roles, and weekly commitment, each with an AI match score.",
      },
      { property: "og:title", content: "Project Feed — ProjectMatch" },
      {
        property: "og:description",
        content: "Open hackathon, coursework, and side projects looking for collaborators.",
      },
    ],
  }),
  component: ProjectFeed,
});

type Sort = "match" | "newest" | "roles";

function ProjectFeed() {
  const store = useStore();
  const { user, projects, applications } = store;
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const [sort, setSort] = useState<Sort>("match");
  const [target, setTarget] = useState<RequestTarget | null>(null);
  const [details, setDetails] = useState<Project | null>(null);
  const [postOpen, setPostOpen] = useState(false);

  const visible = useMemo(() => {
    const list = filterProjects(projects, filters);
    const sorted = [...list];
    if (sort === "match") {
      sorted.sort(
        (a, b) => matchCandidateToProject(user, b).score - matchCandidateToProject(user, a).score,
      );
    } else if (sort === "roles") {
      sorted.sort(
        (a, b) =>
          b.requiredRoles.filter((r) => !r.filled).length -
          a.requiredRoles.filter((r) => !r.filled).length,
      );
    }
    return sorted;
  }, [projects, filters, sort, user]);

  const send = (t: RequestTarget) => {
    store.apply(t.project.id);
    store.logActivity(`You requested to join '${t.project.title}'`, "sent");
    toast.success("Request sent", { description: `${t.project.title} will get back to you soon.` });
    setTarget(null);
  };

  return (
    <div className="space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">Project Feed</h1>
          <p className="text-xs text-muted-foreground">
            {visible.length} project{visible.length === 1 ? "" : "s"} looking for teammates
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            extraTitle="Roles open"
            extraOptions={ROLES_OPEN_OPTIONS}
          />
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="h-8 w-[150px] rounded-full border-white/12 bg-white/5 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="roles">Most Roles Open</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="hero" size="sm" onClick={() => setPostOpen(true)}>
            <Plus aria-hidden /> Post
          </Button>
        </div>
      </header>

      <div className="flex gap-6">
        <div className="hidden lg:block">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            extraTitle="Roles open"
            extraOptions={ROLES_OPEN_OPTIONS}
          />
        </div>

        <div className="min-w-0 flex-1">
          {visible.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {visible.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  viewer={user}
                  applied={applications.includes(p.id)}
                  onRequest={(project) => setTarget({ kind: "project", project, candidate: user })}
                  onDetails={setDetails}
                />
              ))}
            </div>
          ) : (
            <div className="glass grid place-items-center gap-3 rounded-2xl p-14 text-center">
              <SearchX className="h-7 w-7 text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">No projects match your filters</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Try clearing a skill or widening the commitment range.
              </p>
              <Button variant="glass" size="sm" onClick={() => setFilters({ ...EMPTY_FILTERS })}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <RequestModal target={target} onClose={() => setTarget(null)} onSend={send} />
      <ProjectDetailsModal
        project={details}
        viewer={user}
        applied={details ? applications.includes(details.id) : false}
        onClose={() => setDetails(null)}
        onRequest={(project) => {
          setDetails(null);
          setTarget({ kind: "project", project, candidate: user });
        }}
      />
      <PostProjectModal
        open={postOpen}
        onOpenChange={setPostOpen}
        ownerId={user.id}
        onCreate={(p) => {
          store.addProject(p);
          store.logActivity(`You posted a new project '${p.title}'`, "sent");
          toast.success("Project published", { description: `${p.title} is now live in the feed.` });
        }}
      />
    </div>
  );
}
