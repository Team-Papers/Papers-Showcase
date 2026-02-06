import { Link } from 'react-router';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import type { AuthorBook } from '../../types/models';
import { formatCurrency } from '../../lib/utils/formatters';

interface FeaturedBookProps {
  book: AuthorBook;
  authorId: string;
  authorName: string;
}

export default function FeaturedBook({ book, authorId, authorName }: FeaturedBookProps) {
  const isFree = book.price === 0;

  return (
    <div className="featured-hero animate-fade-up">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch">
        {/* Book Cover */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-2 rounded-2xl bg-white/10 blur-xl" />
          <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/20">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-200 to-primary-400">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            )}
            {isFree && (
              <span className="badge-free absolute top-3 left-3">
                Gratuit
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center text-center md:text-left">
          <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              A la une
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {book.title}
          </h2>

          <p className="mt-2 text-white/70">
            Par <span className="font-semibold text-white">{authorName}</span>
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
            <span className={`text-2xl font-bold ${isFree ? 'text-success' : 'text-white'}`}>
              {isFree ? 'Gratuit' : formatCurrency(book.price)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
            <Link
              to={`/${authorId}/book/${book.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl focus-ring"
            >
              Decouvrir
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
