import { avatarGradient, initials } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function InitialsAvatar({
  id,
  name,
  size = "md",
  className,
}: {
  id: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-[11px]",
    md: "h-10 w-10 text-xs",
    lg: "h-14 w-14 text-sm",
    xl: "h-20 w-20 text-lg",
  } as const;

  return (
    <div
      role="img"
      aria-label={`${name} avatar`}
      title={name}
      style={{ backgroundImage: avatarGradient(id) }}
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold text-background ring-1 ring-white/20",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </div>
  );
}
