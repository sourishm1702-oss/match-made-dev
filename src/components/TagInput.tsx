import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SkillTag } from "./SkillTag";

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Add and press Enter",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = (tag: string) => {
    const t = tag.trim();
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setDraft("");
  };

  const matches = draft
    ? suggestions.filter((s) => s.toLowerCase().includes(draft.toLowerCase()) && !value.includes(s)).slice(0, 6)
    : [];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((t) => (
          <SkillTag key={t} skill={t} onRemove={() => onChange(value.filter((x) => x !== t))} />
        ))}
        {!value.length && <p className="text-xs text-muted-foreground">Nothing added yet</p>}
      </div>
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
          }
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="rounded-full border-white/12 bg-white/5 text-sm"
      />
      {matches.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {matches.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => add(m)}
              className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-violet/40 hover:text-foreground"
            >
              + {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
