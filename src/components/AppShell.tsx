import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AppNav } from "./AppNav";
import { PostProjectModal } from "./PostProjectModal";
import { useStore } from "@/lib/app-store";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, addProject, logActivity } = useStore();
  const [postOpen, setPostOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <AppNav onPostProject={() => setPostOpen(true)} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 duration-300 animate-in fade-in sm:px-6">
        {children}
      </main>
      <PostProjectModal
        open={postOpen}
        onOpenChange={setPostOpen}
        ownerId={user.id}
        onCreate={(p) => {
          addProject(p);
          logActivity(`You posted a new project '${p.title}'`, "sent");
          toast.success("Project published", { description: `${p.title} is now live in the feed.` });
        }}
      />
    </div>
  );
}
