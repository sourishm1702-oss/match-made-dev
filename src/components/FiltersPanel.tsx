import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ALL_SKILLS, DOMAIN_ROLES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type Filters = {
  query: string;
  skills: string[];
  roles: string[];
  commitment: string[];
  extra: string[];
};

export const EMPTY_FILTERS: Filters = { query: "", skills: [], roles: [], commitment: [], extra: [] };

export const COMMITMENT_PRESETS = ["Light", "Moderate", "Heavy"];

export function activeFilterCount(f: Filters) {
  return (
    (f.query ? 1 : 0) + f.skills.length + f.roles.length + f.commitment.length + f.extra.length
  );
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

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
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
        active
          ? "border-transparent gradient-accent text-background"
          : "border-white/12 bg-white/5 text-muted-foreground hover:border-violet/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function FiltersBody({
  filters,
  setFilters,
  extraTitle,
  extraOptions,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  extraTitle: string;
  extraOptions: string[];
}) {
  const [skillQuery, setSkillQuery] = useState("");
  const skills = ALL_SKILLS.filter((s) => s.toLowerCase().includes(skillQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          placeholder="Search by name, title, keyword…"
          aria-label="Search"
          className="rounded-full border-white/12 bg-white/5 pl-9"
        />
      </div>

      <Section title="Skills">
        <Input
          value={skillQuery}
          onChange={(e) => setSkillQuery(e.target.value)}
          placeholder="Search skills…"
          aria-label="Search within skills"
          className="mb-2 h-8 rounded-full border-white/12 bg-white/5 text-xs"
        />
        <div className="max-h-44 space-y-1.5 overflow-y-auto pr-1">
          {skills.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-xs">
              <Checkbox
                checked={filters.skills.includes(s)}
                onCheckedChange={() => setFilters({ ...filters, skills: toggle(filters.skills, s) })}
              />
              {s}
            </label>
          ))}
          {!skills.length && <p className="text-xs text-muted-foreground">No skills found</p>}
        </div>
      </Section>

      <Section title="Domain role">
        <div className="space-y-1.5">
          {DOMAIN_ROLES.map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-xs">
              <Checkbox
                checked={filters.roles.includes(r)}
                onCheckedChange={() => setFilters({ ...filters, roles: toggle(filters.roles, r) })}
              />
              {r}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Commitment level">
        <div className="flex flex-wrap gap-2">
          {COMMITMENT_PRESETS.map((c) => (
            <Chip
              key={c}
              label={c}
              active={filters.commitment.includes(c)}
              onClick={() => setFilters({ ...filters, commitment: toggle(filters.commitment, c) })}
            />
          ))}
        </div>
      </Section>

      <Section title={extraTitle}>
        <div className="flex flex-wrap gap-2">
          {extraOptions.map((o) => (
            <Chip
              key={o}
              label={o}
              active={filters.extra.includes(o)}
              onClick={() => setFilters({ ...filters, extra: toggle(filters.extra, o) })}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function FiltersPanel({
  filters,
  setFilters,
  extraTitle,
  extraOptions,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  extraTitle: string;
  extraOptions: string[];
}) {
  const count = activeFilterCount(filters);

  const header = (
    <div className="flex items-center justify-between gap-2">
      <p className="flex items-center gap-2 text-sm font-semibold">
        Filters
        {count > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full gradient-accent px-1.5 text-[11px] font-bold text-background">
            {count}
          </span>
        )}
      </p>
      {count > 0 && (
        <button
          type="button"
          onClick={() => setFilters({ ...EMPTY_FILTERS })}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-3 w-3" aria-hidden /> Clear
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="glass sticky top-24 hidden h-fit w-full max-w-xs shrink-0 flex-col gap-5 rounded-2xl p-5 lg:flex">
        {header}
        <FiltersBody
          filters={filters}
          setFilters={setFilters}
          extraTitle={extraTitle}
          extraOptions={extraOptions}
        />
      </aside>

      {/* Mobile drawer */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="glass" size="sm">
              <SlidersHorizontal aria-hidden /> Filters{count > 0 ? ` (${count})` : ""}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto bg-card/95 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-5 pb-10">
              {header}
              <FiltersBody
                filters={filters}
                setFilters={setFilters}
                extraTitle={extraTitle}
                extraOptions={extraOptions}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
