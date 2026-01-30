import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.papers237.duckdns.org/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export async function getAuthorProfile(authorId: string) {
  const { data } = await apiClient.get(`/authors/${authorId}`);
  return data.data;
}

export async function getBookDetail(bookId: string) {
  const { data } = await apiClient.get(`/books/${bookId}`);
  return data.data;
}

export async function getBookReviews(bookId: string) {
  const { data } = await apiClient.get(`/reviews/books/${bookId}/reviews`);
  return data.data;
}

export async function getCategories() {
  const { data } = await apiClient.get('/categories');
  return data.data;
}
