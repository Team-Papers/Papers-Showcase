import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Aucun livre',
  description = 'Aucun livre disponible pour le moment.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-surface-container p-4">
        <BookOpen className="h-10 w-10 text-on-surface-variant" />
      </div>
      <h3 className="font-display text-lg font-semibold text-on-surface">{title}</h3>
      <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
