import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EMPTY_FILTERS, FiltersPanel, type Filters } from "@/components/FiltersPanel";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import { RequestModal, type RequestTarget } from "@/components/RequestModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
  component: ProjectFeed;
});

function ProjectFeed() {
  return null;
}
