import { cn } from '@/lib/utils';

/** Small circular 18+ badge. */
export function AgeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-danger/40 bg-danger/15 px-1.5 text-xs font-bold text-danger',
        className,
      )}
      aria-label="18 plus only"
    >
      18+
    </span>
  );
}
