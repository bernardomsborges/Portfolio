import { cn } from "@/lib/cn";

export function StatusBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-xs font-medium whitespace-nowrap text-ink shadow-pill ring-1 ring-line sm:text-sm",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-online" />
      {label}
    </span>
  );
}
