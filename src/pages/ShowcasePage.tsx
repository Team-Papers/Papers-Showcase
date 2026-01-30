import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Library } from 'lucide-react';
import { getAuthorProfile, getBookDetail } from '../lib/api/client';
import type { AuthorProfile, AuthorBook, BookDetail } from '../types/models';
import ShowcaseLayout from '../components/layout/ShowcaseLayout';
import BookCard from '../components/ui/BookCard';
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

  return (
    <ShowcaseLayout author={author}>
      {/* Stats bar */}
      <div className="mb-6 flex items-center gap-2 text-on-surface-variant">
        <Library size={18} />
        <span className="text-sm font-medium">
          {author.books.length} livre{author.books.length !== 1 ? 's' : ''} publie{author.books.length !== 1 ? 's' : ''}
        </span>
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

      {/* Book grid */}
      {filteredBooks.length === 0 ? (
        <EmptyState
          title="Aucun livre"
          description={selectedCategory ? `Aucun livre dans la categorie "${selectedCategory}".` : undefined}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} authorId={authorId!} />
          ))}
        </div>
      )}
    </ShowcaseLayout>
  );
}
