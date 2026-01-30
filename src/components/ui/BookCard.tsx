import { Link } from 'react-router';
import { BookOpen } from 'lucide-react';
import type { AuthorBook } from '../../types/models';
import { formatCurrency } from '../../lib/utils/formatters';

interface BookCardProps {
  book: AuthorBook;
  authorId: string;
}

export default function BookCard({ book, authorId }: BookCardProps) {
  return (
    <Link
      to={`/${authorId}/book/${book.id}`}
      className="group block overflow-hidden rounded-xl bg-surface shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-container">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-on-surface-variant/40" />
          </div>
        )}
        {book.price === 0 && (
          <span className="absolute top-2 right-2 rounded-full bg-success px-2.5 py-0.5 text-xs font-semibold text-white">
            Gratuit
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-display text-sm font-semibold text-on-surface line-clamp-2 leading-snug">
          {book.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-primary">
          {formatCurrency(book.price)}
        </p>
      </div>
    </Link>
  );
}
