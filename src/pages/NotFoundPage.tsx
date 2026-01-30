import { BookX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-dim text-center px-4">
      <div className="mb-4 rounded-full bg-surface-container p-5">
        <BookX className="h-12 w-12 text-on-surface-variant" />
      </div>
      <h1 className="font-display text-2xl font-bold text-on-surface">Page introuvable</h1>
      <p className="mt-2 text-on-surface-variant">
        Cette vitrine n'existe pas ou n'est plus disponible.
      </p>
    </div>
  );
}
