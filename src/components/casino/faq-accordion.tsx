import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FaqItem = { q: string; a: string };

/**
 * Pure-HTML details/summary accordion — no JS required, all answers present
 * in the initial HTML for search-engine crawlers and screen readers.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => (
        <details
          key={i}
          open={i === 0}
          className="group overflow-hidden rounded-2xl border border-border bg-surface/50"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-foreground transition-colors hover:bg-surface-overlay/50 [&::-webkit-details-marker]:hidden">
            <h3 className="text-left">{item.q}</h3>
            <ChevronDown
              size={18}
              className={cn(
                'shrink-0 text-secondary transition-transform duration-300',
                'group-open:rotate-180',
              )}
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

