import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Bell, FolderKanban, Sparkles, UserCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InitialsAvatar } from "@/components/Avatar";
import { CandidateCard } from "@/components/CandidateCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import { RequestModal, type RequestTarget } from "@/components/RequestModal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/app-store";
import { matchCandidateToProject, type Candidate, type Project } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ProjectMatch" },
      {
        name: "description",
        content:
          "Your ProjectMatch dashboard: active applications, posted projects, AI-recommended teammates, and recent activity.",
      },
      { property: "og:title", content: "Dashboard — ProjectMatch" },
      {
        property: "og:description",
        content: "Track applications, posted projects, and AI-recommended matches in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function StatCard({
  label,
  value,
  icon,
  footer,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{label}</p>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-violet/12 text-violet">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums">{value}</p>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}

function Dashboard() {
  const store = useStore();
  const { user, projects, candidates, activity, applications, invites, profileCompleteness } = store;
  const [target, setTarget] = useState<RequestTarget | null>(null);
  const [details, setDetails] = useState<Project | null>(null);

  const myProjects = projects.filter((p) => p.ownerId === user.id);

  const recommendedProjects = useMemo(
    () =>
      projects
        .filter((p) => p.ownerId !== user.id)
        .map((p) => ({ p, score: matchCandidateToProject(user, p).score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((x) => x.p),
    [projects, user],
  );

  const contextProject = myProjects[0];
  const recommendedCandidates = useMemo(() => {
    if (!contextProject) return [];
    return candidates
      .map((c) => ({ c, score: matchCandidateToProject(c, contextProject).score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.c);
  }, [candidates, contextProject]);

  const send = (t: RequestTarget) => {
    if (t.kind === "project") {
      store.apply(t.project.id);
      store.logActivity(`You requested to join '${t.project.title}'`, "sent");
      toast.success("Request sent", { description: `${t.project.title} will get back to you soon.` });
    } else {
      store.invite(t.candidate.id);
      store.logActivity(`You invited ${t.candidate.name} to '${t.project.title}'`, "sent");
      toast.success("Invite sent", { description: `${t.candidate.name} has been invited.` });
    }
    setTarget(null);
  };

  return (
    <div className="space-y-10">
      <section className="aurora glass overflow-hidden rounded-3xl p-8 sm:p-12">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/12 px-3 py-1 text-[11px] font-medium text-violet">
          <Sparkles className="h-3 w-3" aria-hidden /> AI matching is live
        </p>
        <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Find your perfect project team,{" "}
          <span className="gradient-text">powered by AI matching</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Welcome back, {user.name.split(" ")[0]}. We scored every open project against your skills,
          interests, and weekly availability — your strongest matches are below.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="hero" asChild>
            <Link to="/projects">Browse Projects</Link>
          </Button>
          <Button variant="glass" asChild>
            <Link to="/profile">Complete Your Profile</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Your Active Applications"
          value={String(applications.length)}
          icon={<Activity className="h-4 w-4" aria-hidden />}
        />
        <StatCard
          label="Projects You Posted"
          value={String(myProjects.length)}
          icon={<FolderKanban className="h-4 w-4" aria-hidden />}
        />
        <StatCard
          label="AI-Recommended Matches"
          value={String(recommendedProjects.length + recommendedCandidates.length)}
          icon={<Sparkles className="h-4 w-4" aria-hidden />}
          footer={
            <p className="text-[11px] text-muted-foreground">
              {invites.length} invite{invites.length === 1 ? "" : "s"} sent
            </p>
          }
        />
        <StatCard
          label="Profile Completeness"
          value={`${profileCompleteness}%`}
          icon={<UserCheck className="h-4 w-4" aria-hidden />}
          footer={<Progress value={profileCompleteness} className="h-1.5 bg-white/10" />}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Recommended for you</h2>
            <p className="text-xs text-muted-foreground">Highest AI match scores, sorted descending</p>
          </div>
          <Link to="/projects" className="text-xs text-cyan transition-opacity hover:opacity-80">
            View all projects →
          </Link>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {recommendedProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              viewer={user}
              applied={applications.includes(p.id)}
              onRequest={(project) => setTarget({ kind: "project", project, candidate: user })}
              onDetails={setDetails}
              className="w-[320px] shrink-0 snap-start sm:w-[360px]"
            />
          ))}
        </div>
      </section>

      {contextProject && recommendedCandidates.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Top candidates for <span className="gradient-text">{contextProject.title}</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Scored against your open roles: {contextProject.missingSkills.join(", ")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendedCandidates.map((c: Candidate) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                contextProject={contextProject}
                invited={invites.includes(c.id)}
                onInvite={(candidate) =>
                  setTarget({ kind: "candidate", project: contextProject, candidate })
                }
                onView={() => toast.info(`${c.name}`, { description: c.bio })}
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-4 w-4 text-cyan" aria-hidden /> Recent activity
        </h2>
        <ul className="glass divide-y divide-white/8 rounded-2xl">
          {activity.map((a) => (
            <li key={a.id} className="flex items-start gap-3 p-4">
              <InitialsAvatar id={a.id} name={a.kind === "match" ? "AI Match" : "Activity"} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">{a.text}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

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
    </div>
  );
}
