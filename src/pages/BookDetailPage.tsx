import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, BookOpen, Globe as GlobeIcon, FileText, Calendar } from 'lucide-react';
import { getBookDetail, getBookReviews } from '../lib/api/client';
import type { BookDetail, Review } from '../types/models';
import { formatCurrency, formatDate } from '../lib/utils/formatters';
import RatingStars from '../components/ui/RatingStars';
import QRCodeCard from '../components/ui/QRCodeCard';
import Spinner from '../components/ui/Spinner';
import NotFoundPage from './NotFoundPage';

export default function BookDetailPage() {
  const { authorId, bookId } = useParams<{ authorId: string; bookId: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    setLoading(true);
    Promise.all([
      getBookDetail(bookId),
      getBookReviews(bookId).catch(() => []),
    ])
      .then(([bookData, reviewsData]) => {
        setBook(bookData);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) return <Spinner />;
  if (error || !book) return <NotFoundPage />;

  const authorName = book.author?.penName || 'Auteur';
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Top bar */}
      <div className="bg-surface border-b border-outline">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <Link
            to={`/${authorId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            Retour a la vitrine
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          {/* Cover */}
          <div>
            <div className="overflow-hidden rounded-xl bg-surface shadow-lg">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full object-cover aspect-[2/3]"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-surface-container">
                  <BookOpen className="h-16 w-16 text-on-surface-variant/30" />
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="mt-6">
              <QRCodeCard bookId={book.id} />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-2xl font-bold text-on-surface sm:text-3xl">
              {book.title}
            </h1>
            <p className="mt-1 text-on-surface-variant">par {authorName}</p>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="mt-3">
                <RatingStars rating={avgRating} count={reviews.length} size={18} />
              </div>
            )}

            {/* Price */}
            <div className="mt-4">
              {book.price === 0 ? (
                <span className="inline-block rounded-full bg-success-container px-4 py-1.5 text-sm font-semibold text-success">
                  Gratuit
                </span>
              ) : (
                <span className="font-display text-2xl font-bold text-primary">
                  {formatCurrency(book.price)}
                </span>
              )}
            </div>

            {/* Meta chips */}
            <div className="mt-6 flex flex-wrap gap-3">
              {book.pageCount && (
                <div className="flex items-center gap-1.5 rounded-lg bg-surface-container px-3 py-1.5 text-sm text-on-surface-variant">
                  <FileText size={14} /> {book.pageCount} pages
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-1.5 rounded-lg bg-surface-container px-3 py-1.5 text-sm text-on-surface-variant">
                  <GlobeIcon size={14} /> {book.language === 'fr' ? 'Francais' : book.language}
                </div>
              )}
              {book.publishedAt && (
                <div className="flex items-center gap-1.5 rounded-lg bg-surface-container px-3 py-1.5 text-sm text-on-surface-variant">
                  <Calendar size={14} /> {formatDate(book.publishedAt)}
                </div>
              )}
            </div>

            {/* Categories */}
            {book.categories && book.categories.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {book.categories.map((bc) => (
                  <span
                    key={bc.category.id}
                    className="rounded-full bg-primary-container px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {bc.category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div className="mt-6">
                <h2 className="font-display text-lg font-semibold text-on-surface">Description</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant whitespace-pre-line">
                  {book.description}
                </p>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold text-on-surface">
                  Avis ({reviews.length})
                </h2>
                <div className="mt-3 space-y-3">
                  {reviews.slice(0, 10).map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-outline bg-surface p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-on-surface">
                          {review.user
                            ? `${review.user.firstName} ${review.user.lastName}`
                            : 'Anonyme'}
                        </span>
                        <RatingStars rating={review.rating} size={12} />
                      </div>
                      {review.comment && (
                        <p className="mt-2 text-sm text-on-surface-variant">{review.comment}</p>
                      )}
                      <p className="mt-1 text-xs text-on-surface-variant/60">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-outline bg-surface py-6 text-center text-sm text-on-surface-variant">
        Propulse par <span className="font-semibold text-primary">Paper's</span>
      </footer>
    </div>
  );
}
