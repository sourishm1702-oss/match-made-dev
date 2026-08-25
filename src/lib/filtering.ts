import type { Filters } from "@/components/FiltersPanel";
import { DOMAIN_ROLES, type Candidate, type Commitment, type Project } from "./mock-data";

const PRESET_MAP: Record<string, Commitment[]> = {
  Light: ["1-5 hrs/wk", "5-10 hrs/wk"],
  Moderate: ["10-15 hrs/wk"],
  Heavy: ["15-20 hrs/wk", "20+ hrs/wk"],
};

function matchesCommitment(presets: string[], commitment: Commitment) {
  if (!presets.length) return true;
  return presets.some((p) => PRESET_MAP[p]?.includes(commitment));
}

const ROLE_KEYWORDS: Record<string, string[]> = {
  Frontend: ["frontend", "full-stack"],
  Backend: ["backend", "full-stack"],
  "Full-Stack": ["full-stack"],
  "Design (UI/UX)": ["designer", "ui"],
  "Data Science/ML": ["data"],
  DevOps: ["devops"],
  "Product/PM": ["pm", "product"],
};

export function filterCandidates(candidates: Candidate[], f: Filters) {
  const q = f.query.trim().toLowerCase();
  return candidates.filter((c) => {
    if (
      q &&
      !`${c.name} ${c.tagline} ${c.role} ${c.skills.join(" ")} ${c.interests.join(" ")}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    if (f.skills.length && !f.skills.every((s) => c.skills.includes(s))) return false;
    if (f.roles.length && !f.roles.includes(c.role)) return false;
    if (!matchesCommitment(f.commitment, c.commitment)) return false;
    if (f.extra.length && !f.extra.includes(c.availability)) return false;
    return true;
  });
}

export function filterProjects(projects: Project[], f: Filters) {
  const q = f.query.trim().toLowerCase();
  return projects.filter((p) => {
    if (
      q &&
      !`${p.title} ${p.description} ${p.missingSkills.join(" ")} ${p.requiredRoles
        .map((r) => r.role)
        .join(" ")}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    if (f.skills.length && !f.skills.some((s) => p.missingSkills.includes(s))) return false;
    if (f.roles.length) {
      const openRoles = p.requiredRoles.filter((r) => !r.filled).map((r) => r.role.toLowerCase());
      const ok = f.roles.some((role) =>
        (ROLE_KEYWORDS[role] ?? []).some((kw) => openRoles.some((o) => o.includes(kw))),
      );
      if (!ok) return false;
    }
    if (!matchesCommitment(f.commitment, p.commitment)) return false;
    if (f.extra.length) {
      const open = p.requiredRoles.filter((r) => !r.filled).length;
      const ok = f.extra.some((e) =>
        e === "1 role open" ? open === 1 : e === "2 roles open" ? open === 2 : open >= 3,
      );
      if (!ok) return false;
    }
    return true;
  });
}

export const CANDIDATE_ROLE_OPTIONS = DOMAIN_ROLES;
export const AVAILABILITY_OPTIONS = ["Actively Looking", "Open to Offers", "Not Available"];
export const ROLES_OPEN_OPTIONS = ["1 role open", "2 roles open", "3+ roles open"];
