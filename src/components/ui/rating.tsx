import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Rating({
  value,
  className,
  showValue = true,
  size = 16,
}: {
  value: number;
  className?: string;
  showValue?: boolean;
  size?: number;
}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div
      className={cn('inline-flex items-center gap-1.5', className)}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5`}
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= rounded;
          const half = !filled && i + 0.5 === rounded;
          return (
            <span key={i} className="relative">
              <Star size={size} className="text-border" fill="currentColor" />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star size={size} className="text-accent" fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
