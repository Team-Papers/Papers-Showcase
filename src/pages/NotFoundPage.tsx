import { BookX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-dim text-center px-4">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-container border border-outline">
        <BookX className="h-10 w-10 text-on-surface-muted" />
      </div>
      <h1 className="font-display text-2xl font-bold text-on-surface">Page introuvable</h1>
      <p className="mt-2 text-sm text-on-surface-variant max-w-sm">
        Cette vitrine n'existe pas ou n'est plus disponible.
      </p>
    </div>
  );
}
