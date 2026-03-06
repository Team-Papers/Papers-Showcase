import { Link } from 'react-router';
import { BookOpen, Calendar } from 'lucide-react';
import type { AuthorBook } from '../../types/models';
import { formatCurrency } from '../../lib/utils/formatters';

interface BookCardProps {
  book: AuthorBook;
  authorId: string;
  index?: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    month: 'short',
    year: 'numeric'
  });
}

export default function BookCard({ book, authorId, index = 0 }: BookCardProps) {
  const isFree = book.price === 0;

  return (
    <Link
      to={`/${authorId}/book/${book.id}`}
      className="book-card group grid-item block focus-ring"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-container">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="book-cover h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <BookOpen className="h-12 w-12 text-primary-500" />
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Free badge */}
        {isFree && (
          <span className="badge-free absolute top-3 right-3 animate-scale-in">
            Gratuit
          </span>
        )}

        {/* View button on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <span className="block w-full rounded-xl bg-white/95 py-2.5 text-center text-sm font-semibold text-primary-700 shadow-lg backdrop-blur-sm">
            Voir le livre
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold text-on-surface line-clamp-2 leading-snug transition-colors group-hover:text-primary">
          {book.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <p className={`text-base font-display font-bold ${isFree ? 'text-success' : 'text-primary'}`}>
            {isFree ? 'Gratuit' : formatCurrency(book.price)}
          </p>

          {book.publishedAt && (
            <div className="flex items-center gap-1 text-xs text-on-surface-muted">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(book.publishedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
