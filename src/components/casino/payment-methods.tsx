import { paymentMethodMap } from '@/data/payment-methods';
import { cn } from '@/lib/utils';

export function PaymentChip({ id, className }: { id: string; className?: string }) {
  const method = paymentMethodMap.get(id);
  if (!method) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm font-medium',
        className,
      )}
    >
      <span
        className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-bold text-white"
        style={{ backgroundColor: method.accent }}
        aria-hidden="true"
      >
        {method.name.slice(0, 1)}
      </span>
      {method.name}
    </span>
  );
}

export function PaymentMethods({ ids }: { ids: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <PaymentChip key={id} id={id} />
      ))}
    </div>
  );
}
