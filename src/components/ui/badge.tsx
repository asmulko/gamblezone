import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type Tone = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'muted';

const tones: Record<Tone, string> = {
  primary: 'bg-primary/15 text-primary border-primary/25',
  secondary: 'bg-secondary/15 text-secondary border-secondary/25',
  accent: 'bg-accent/15 text-accent border-accent/25',
  success: 'bg-success/15 text-success border-success/25',
  warning: 'bg-warning/15 text-warning border-warning/25',
  muted: 'bg-surface-overlay text-muted border-border',
};

export function Badge({
  className,
  tone = 'muted',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
