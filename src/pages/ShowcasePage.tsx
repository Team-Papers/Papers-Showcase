import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Library, BookMarked } from 'lucide-react';
import { getAuthorProfile, getBookDetail } from '../lib/api/client';
import type { AuthorProfile, AuthorBook, BookDetail } from '../types/models';
import ShowcaseLayout from '../components/layout/ShowcaseLayout';
import BookCard from '../components/ui/BookCard';
import FeaturedBook from '../components/ui/FeaturedBook';
import CategoryFilter from '../components/ui/CategoryFilter';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import NotFoundPage from './NotFoundPage';

export default function ShowcasePage() {
  const { authorId } = useParams<{ authorId: string }>();
  const [author, setAuthor] = useState<AuthorProfile | null>(null);
  const [bookDetails, setBookDetails] = useState<Map<string, BookDetail>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!authorId) return;
    setLoading(true);
    getAuthorProfile(authorId)
      .then(async (data) => {
        setAuthor(data);
        // Fetch details for each book to get categories
        const details = await Promise.allSettled(
          data.books.map((b: AuthorBook) => getBookDetail(b.id))
        );
        const detailsMap = new Map<string, BookDetail>();
        details.forEach((result, i) => {
          if (result.status === 'fulfilled') {
            detailsMap.set(data.books[i].id, result.value);
          }
        });
        setBookDetails(detailsMap);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [authorId]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    bookDetails.forEach((detail) => {
      detail.categories?.forEach((bc) => cats.add(bc.category.name));
    });
    return Array.from(cats).sort();
  }, [bookDetails]);

  const filteredBooks = useMemo(() => {
    if (!author) return [];
    if (!selectedCategory) return author.books;
    return author.books.filter((book) => {
      const detail = bookDetails.get(book.id);
      return detail?.categories?.some((bc) => bc.category.name === selectedCategory);
    });
  }, [author, selectedCategory, bookDetails]);

  if (loading) return <Spinner />;
  if (error || !author) return <NotFoundPage />;

  const displayName = author.penName || `${author.user?.firstName ?? ''} ${author.user?.lastName ?? ''}`.trim();

  // Featured book is the most recent or first book (when no category filter)
  const featuredBook = !selectedCategory && author.books.length > 0 ? author.books[0] : null;
  const otherBooks = featuredBook
    ? filteredBooks.filter(b => b.id !== featuredBook.id)
    : filteredBooks;

  return (
    <ShowcaseLayout author={author}>
      {/* Featured Book Hero */}
      {featuredBook && (
        <div className="mb-10">
          <FeaturedBook
            book={featuredBook}
            authorId={authorId!}
            authorName={displayName}
          />
        </div>
      )}

      {/* Stats bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Library className="h-5 w-5" />
          <span className="text-sm font-medium">
            {author.books.length} livre{author.books.length !== 1 ? 's' : ''} publie{author.books.length !== 1 ? 's' : ''}
          </span>
        </div>
        {otherBooks.length > 0 && (
          <div className="flex items-center gap-2 text-on-surface-variant">
            <BookMarked className="h-4 w-4" />
            <span className="text-sm">
              {otherBooks.length} autre{otherBooks.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      )}

      {/* Section title when showing filtered or other books */}
      {(selectedCategory || otherBooks.length > 0) && (
        <h2 className="mb-6 font-display text-xl font-semibold text-on-surface">
          {selectedCategory ? `Categorie: ${selectedCategory}` : 'Tous les livres'}
        </h2>
      )}

      {/* Book grid */}
      {otherBooks.length === 0 && selectedCategory ? (
        <EmptyState
          title="Aucun livre"
          description={`Aucun livre dans la categorie "${selectedCategory}".`}
        />
      ) : otherBooks.length === 0 && !featuredBook ? (
        <EmptyState
          title="Aucun livre"
          description="Cet auteur n'a pas encore publie de livre."
        />
      ) : otherBooks.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {otherBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              authorId={authorId!}
              index={index}
            />
          ))}
        </div>
      ) : null}
    </ShowcaseLayout>
  );
}
