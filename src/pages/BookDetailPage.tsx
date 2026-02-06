import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, BookOpen, Globe as GlobeIcon, FileText, Calendar, Tag, User, ShoppingBag } from 'lucide-react';
import { getBookDetail, getBookReviews } from '../lib/api/client';
import type { BookDetail, Review } from '../types/models';
import { formatCurrency, formatDate } from '../lib/utils/formatters';
import RatingStars from '../components/ui/RatingStars';
import QRCodeCard from '../components/ui/QRCodeCard';
import Spinner from '../components/ui/Spinner';
import ThemeToggle from '../components/ui/ThemeToggle';
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
        setReviews(Array.isArray(reviewsData) ? reviewsData : reviewsData?.reviews || []);
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
  const isFree = book.price === 0;

  return (
    <div className="min-h-screen bg-surface-dim transition-colors">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header with gradient */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <Link
            to={`/${authorId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors focus-ring rounded-lg px-2 py-1 -ml-2"
          >
            <ArrowLeft size={18} />
            Retour a la vitrine
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Left Column - Cover & QR */}
          <div className="animate-fade-up">
            {/* Cover with shadow and hover effect */}
            <div className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-outline/10">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full object-cover aspect-[2/3] transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <BookOpen className="h-20 w-20 text-primary-500" />
                  </div>
                )}
                {isFree && (
                  <span className="badge-free absolute top-4 left-4">
                    Gratuit
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            {book._count && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-xl bg-surface border border-outline p-4 transition-all hover:border-primary-200">
                  <ShoppingBag className="h-5 w-5 text-primary mb-1" />
                  <span className="text-lg font-bold text-on-surface">{book._count.purchases}</span>
                  <span className="text-xs text-on-surface-variant">Achats</span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-surface border border-outline p-4 transition-all hover:border-primary-200">
                  <User className="h-5 w-5 text-accent mb-1" />
                  <span className="text-lg font-bold text-on-surface">{book._count.reviews}</span>
                  <span className="text-xs text-on-surface-variant">Avis</span>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="mt-6">
              <QRCodeCard bookId={book.id} />
            </div>
          </div>

          {/* Right Column - Book Info */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            {/* Title & Author */}
            <div>
              <h1 className="font-display text-3xl font-bold text-on-surface sm:text-4xl leading-tight">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-on-surface-variant">
                par <span className="font-semibold text-on-surface">{authorName}</span>
              </p>
            </div>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <RatingStars rating={avgRating} size={20} />
                <span className="text-sm text-on-surface-variant">
                  {avgRating.toFixed(1)} ({reviews.length} avis)
                </span>
              </div>
            )}

            {/* Price Badge */}
            <div className="mt-6">
              {isFree ? (
                <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-success to-emerald-600 px-6 py-3 text-lg font-bold text-white shadow-lg">
                  Gratuit
                </span>
              ) : (
                <div className="inline-flex items-center gap-2">
                  <span className="font-display text-4xl font-bold text-primary">
                    {formatCurrency(book.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Meta chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {book.pageCount && (
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-outline px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary-200">
                  <FileText size={16} className="text-primary" />
                  {book.pageCount} pages
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-outline px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary-200">
                  <GlobeIcon size={16} className="text-primary" />
                  {book.language === 'fr' ? 'Francais' : book.language}
                </div>
              )}
              {book.publishedAt && (
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-outline px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary-200">
                  <Calendar size={16} className="text-primary" />
                  {formatDate(book.publishedAt)}
                </div>
              )}
            </div>

            {/* Categories */}
            {book.categories && book.categories.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-on-surface-variant" />
                  <span className="text-sm font-medium text-on-surface-variant">Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((bc) => (
                    <span
                      key={bc.category.id}
                      className="category-pill"
                    >
                      {bc.category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-on-surface mb-4">
                  A propos de ce livre
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-base leading-relaxed text-on-surface-variant whitespace-pre-line">
                    {book.description}
                  </p>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-on-surface">
                    Avis des lecteurs
                  </h2>
                  <span className="text-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                    {reviews.length} avis
                  </span>
                </div>
                <div className="space-y-4">
                  {reviews.slice(0, 10).map((review, index) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-outline bg-surface p-5 transition-all hover:shadow-md hover:border-primary-200 animate-fade-up"
                      style={{ animationDelay: `${(index + 2) * 50}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-primary font-semibold">
                            {review.user
                              ? review.user.firstName.charAt(0).toUpperCase()
                              : 'A'}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-on-surface">
                              {review.user
                                ? `${review.user.firstName} ${review.user.lastName}`
                                : 'Anonyme'}
                            </span>
                            <p className="text-xs text-on-surface-variant">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} size={14} />
                      </div>
                      {review.comment && (
                        <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-outline bg-surface py-8 text-center transition-colors">
        <p className="text-sm text-on-surface-variant">
          Propulse par <span className="font-semibold text-primary">Papers</span>
        </p>
      </footer>
    </div>
  );
}
