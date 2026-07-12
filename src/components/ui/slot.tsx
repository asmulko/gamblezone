import { cloneElement, isValidElement, type ReactElement } from 'react';
import { cn } from '@/lib/utils';

/**
 * Minimal Slot: merges its own props/className onto a single child element.
 * Used for the Button `asChild` pattern (e.g. wrapping a <Link>).
 */
export function Slot({
  children,
  className,
  ...props
}: { children?: React.ReactNode; className?: string } & Record<string, unknown>) {
  if (!isValidElement(children)) return null;
  const child = children as ReactElement<Record<string, unknown>>;
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props.className as string | undefined),
  });
}
