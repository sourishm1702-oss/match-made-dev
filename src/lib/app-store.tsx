import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  CANDIDATES,
  CURRENT_USER_ID,
  INITIAL_ACTIVITY,
  PROJECTS,
  type ActivityEvent,
  type Candidate,
  type Project,
} from "./mock-data";

type Store = {
  user: Candidate;
  updateUser: (patch: Partial<Candidate>) => void;
  projects: Project[];
  addProject: (p: Project) => void;
  candidates: Candidate[];
  activity: ActivityEvent[];
  logActivity: (text: string, kind: ActivityEvent["kind"]) => void;
  applications: string[];
  apply: (projectId: string) => void;
  invites: string[];
  invite: (candidateId: string) => void;
  profileCompleteness: number;
};

const StoreContext = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Candidate>(
    () => CANDIDATES.find((c) => c.id === CURRENT_USER_ID)!,
  );
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activity, setActivity] = useState<ActivityEvent[]>(INITIAL_ACTIVITY);
  const [applications, setApplications] = useState<string[]>(["ecotrack"]);
  const [invites, setInvites] = useState<string[]>(["sana"]);

  const value = useMemo<Store>(() => {
    const logActivity = (text: string, kind: ActivityEvent["kind"]) =>
      setActivity((prev) => [{ id: `${Date.now()}`, text, time: "just now", kind }, ...prev]);

    const filled = [
      user.name,
      user.tagline,
      user.bio,
      user.role,
      user.skills.length ? "x" : "",
      user.interests.length ? "x" : "",
      user.availability,
      user.experience,
      user.commitment,
    ].filter(Boolean).length;

    return {
      user,
      updateUser: (patch) => setUser((prev) => ({ ...prev, ...patch })),
      projects,
      addProject: (p) => setProjects((prev) => [p, ...prev]),
      candidates: CANDIDATES.filter((c) => c.id !== user.id),
      activity,
      logActivity,
      applications,
      apply: (projectId) => setApplications((prev) => (prev.includes(projectId) ? prev : [...prev, projectId])),
      invites,
      invite: (candidateId) => setInvites((prev) => (prev.includes(candidateId) ? prev : [...prev, candidateId])),
      profileCompleteness: Math.round((filled / 9) * 100),
    };
  }, [user, projects, activity, applications, invites]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside AppStoreProvider");
  return ctx;
}
