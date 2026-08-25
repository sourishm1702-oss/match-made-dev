import { Link } from "@tanstack/react-router";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import { InitialsAvatar } from "./Avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/app-store";

const LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/projects", label: "Project Feed" },
  { to: "/talent", label: "Talent Feed" },
  { to: "/profile", label: "Profile" },
] as const;

export function AppNav({ onPostProject }: { onPostProject: () => void }) {
  const { user } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="shrink-0 text-lg font-bold tracking-tight gradient-text">
          ProjectMatch
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "bg-white/10 text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Button variant="hero" size="sm" onClick={onPostProject} className="hidden sm:inline-flex">
            <Plus aria-hidden /> Post a Project
          </Button>
          <Link to="/profile" aria-label="Your profile">
            <InitialsAvatar id={user.id} name={user.name} size="sm" />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="glass" size="icon" aria-label="Open menu">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="gradient-text">ProjectMatch</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "bg-white/10 text-foreground font-medium" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Button
                  variant="hero"
                  className="mt-4"
                  onClick={() => {
                    setOpen(false);
                    onPostProject();
                  }}
                >
                  <Plus aria-hidden /> Post a Project
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
