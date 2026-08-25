import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { InitialsAvatar } from "@/components/Avatar";
import { AvailabilityBadge } from "@/components/CandidateCard";
import { SkillTag } from "@/components/SkillTag";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/app-store";
import {
  ALL_SKILLS,
  COMMITMENTS,
  DOMAIN_ROLES,
  EXPERIENCE_LEVELS,
  INTERESTS,
  type Availability,
  type Candidate,
  type Commitment,
  type DomainRole,
  type ExperienceLevel,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — ProjectMatch" },
      {
        name: "description",
        content:
          "Showcase your role, skills, availability, experience level, and weekly commitment so AI matching can find you the right team.",
      },
      { property: "og:title", content: "Your Profile — ProjectMatch" },
      {
        property: "og:description",
        content: "Edit your skills, interests, and availability to sharpen your AI match scores.",
      },
    ],
  }),
  component: ProfilePage,
});

const AVAILABILITIES: Availability[] = ["Actively Looking", "Open to Offers", "Not Available"];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-transparent gradient-accent text-background"
          : "border-white/12 bg-white/5 text-muted-foreground hover:border-violet/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold">
        {label} {hint && <span className="font-normal text-muted-foreground">· {hint}</span>}
      </p>
      {children}
    </div>
  );
}

function ProfilePage() {
  const { user, updateUser, profileCompleteness, projects, applications } = useStore();
  const [draft, setDraft] = useState<Candidate>(user);

  const patch = (p: Partial<Candidate>) => setDraft((d) => ({ ...d, ...p }));

  const save = () => {
    updateUser(draft);
    toast.success("Profile saved", { description: "Your match scores have been recalculated." });
  };

  const myApplications = projects.filter((p) => applications.includes(p.id));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">Your Profile</h1>
          <p className="text-xs text-muted-foreground">
            {profileCompleteness}% complete — stronger profiles get better matches
          </p>
        </div>
        <Progress value={profileCompleteness} className="h-1.5 w-40 shrink-0 bg-white/10" />
      </header>

      <Tabs defaultValue="view">
        <TabsList className="rounded-full border border-white/10 bg-white/5">
          <TabsTrigger value="view" className="rounded-full text-xs">
            View Profile
          </TabsTrigger>
          <TabsTrigger value="edit" className="rounded-full text-xs">
            Edit Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="mt-6 space-y-6 duration-300 animate-in fade-in">
          <section className="aurora glass rounded-3xl p-7">
            <div className="flex flex-wrap items-center gap-4">
              <InitialsAvatar id={user.id} name={user.name} size="xl" />
              <div className="min-w-0">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-violet/30 bg-violet/12 px-2.5 py-0.5 text-[11px] font-medium text-violet">
                    {user.role}
                  </span>
                  <AvailabilityBadge status={user.availability} />
                  <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    {user.experience} · {user.commitment}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{user.bio}</p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <section className="glass rounded-2xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {user.skills.map((s) => (
                  <SkillTag key={s} skill={s} />
                ))}
              </div>
            </section>
            <section className="glass rounded-2xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Project interests
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {user.interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-0.5 text-[11px] text-cyan"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section className="glass rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your active applications
            </h3>
            {myApplications.length ? (
              <ul className="mt-3 space-y-2">
                {myApplications.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{p.title}</span>
                    <span className="shrink-0 text-[11px] text-amber">Pending</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                No applications yet — browse the project feed to get started.
              </p>
            )}
          </section>
        </TabsContent>

        <TabsContent value="edit" className="mt-6 space-y-6 duration-300 animate-in fade-in">
          <section className="glass space-y-5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <InitialsAvatar id={draft.id} name={draft.name || "New User"} size="lg" />
              <p className="text-xs text-muted-foreground">
                Your avatar is generated from your initials.
              </p>
            </div>
            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => patch({ name: e.target.value })}
                aria-label="Name"
                className="rounded-xl border-white/12 bg-white/5"
              />
            </Field>
            <Field label="Tagline">
              <Input
                value={draft.tagline}
                onChange={(e) => patch({ tagline: e.target.value })}
                aria-label="Tagline"
                className="rounded-xl border-white/12 bg-white/5"
              />
            </Field>
            <Field label="Bio">
              <Textarea
                value={draft.bio}
                onChange={(e) => patch({ bio: e.target.value })}
                rows={4}
                aria-label="Bio"
                className="resize-none rounded-xl border-white/12 bg-white/5"
              />
            </Field>
          </section>

          <section className="glass space-y-5 rounded-2xl p-6">
            <Field label="Domain role">
              <div className="flex flex-wrap gap-2">
                {DOMAIN_ROLES.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    active={draft.role === r}
                    onClick={() => patch({ role: r as DomainRole })}
                  />
                ))}
              </div>
            </Field>

            <Field label="Skills" hint="search, pick, or add your own">
              <TagInput
                value={draft.skills}
                onChange={(skills) => patch({ skills })}
                suggestions={ALL_SKILLS}
                placeholder="Add a skill and press Enter"
              />
            </Field>

            <Field label="Availability">
              <div className="flex flex-wrap gap-2">
                {AVAILABILITIES.map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    active={draft.availability === a}
                    onClick={() => patch({ availability: a })}
                  />
                ))}
              </div>
            </Field>

            <Field label="Experience level">
              <div className="inline-flex flex-wrap rounded-full border border-white/12 bg-white/5 p-1">
                {EXPERIENCE_LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={draft.experience === l}
                    onClick={() => patch({ experience: l as ExperienceLevel })}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
                      draft.experience === l
                        ? "gradient-accent text-background"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Project interests">
              <TagInput
                value={draft.interests}
                onChange={(interests) => patch({ interests })}
                suggestions={INTERESTS}
                placeholder="Add an interest and press Enter"
              />
            </Field>

            <Field label="Weekly commitment">
              <div className="flex flex-wrap gap-2">
                {COMMITMENTS.map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    active={draft.commitment === c}
                    onClick={() => patch({ commitment: c as Commitment })}
                  />
                ))}
              </div>
            </Field>
          </section>

          <div className="flex justify-end gap-2">
            <Button variant="glass" onClick={() => setDraft(user)}>
              Reset
            </Button>
            <Button variant="hero" onClick={save}>
              Save profile
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
