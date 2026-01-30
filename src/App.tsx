import { Routes, Route } from 'react-router';
import ShowcasePage from './pages/ShowcasePage';
import BookDetailPage from './pages/BookDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/:authorId" element={<ShowcasePage />} />
      <Route path="/:authorId/book/:bookId" element={<BookDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
