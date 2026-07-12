import { notFound } from 'next/navigation';

// Catches any unmatched path within a locale and renders the localized 404,
// which lives at app/[locale]/not-found.tsx (rendered inside the locale layout).
export default function CatchAllPage() {
  notFound();
}
