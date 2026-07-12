import { cn } from '@/lib/utils';

/** Generates a clean SVG monogram logo from the casino name + brand colour. */
export function CasinoLogo({
  name,
  color,
  size = 56,
  className,
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const id = `g-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label={`${name} logo`}
      className={cn('shrink-0 rounded-xl', className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="14" fill={`url(#${id})`} />
      <rect
        width="55"
        height="55"
        x="0.5"
        y="0.5"
        rx="13.5"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
