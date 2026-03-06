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
      {/* Blur orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/15 rounded-full blur-[80px]" />

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-stretch">
        {/* Book Cover with glow */}
        <div className="relative flex-shrink-0 animate-float">
          <div className="absolute -inset-3 rounded-2xl bg-primary/20 blur-xl" />
          <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
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
        <div className="relative flex flex-1 flex-col justify-center text-center md:text-left">
          <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
            <div className="flex items-center gap-2 bg-accent/15 border border-accent/20 rounded-full px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                A la une
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl leading-tight">
            {book.title}
          </h2>

          <p className="mt-2 text-white/60">
            Par <span className="font-semibold text-white/90">{authorName}</span>
          </p>

          <div className="mt-5 flex items-center justify-center gap-4 md:justify-start">
            <span className={`text-2xl font-display font-bold ${isFree ? 'text-success' : 'text-white'}`}>
              {isFree ? 'Gratuit' : formatCurrency(book.price)}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
            <Link
              to={`/${authorId}/book/${book.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105 focus-ring"
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
