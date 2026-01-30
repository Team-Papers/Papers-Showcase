export interface AuthorUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface AuthorProfile {
  id: string;
  userId: string;
  user?: AuthorUser;
  penName: string;
  bio: string;
  photoUrl?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  status: string;
  books: AuthorBook[];
  createdAt: string;
}

export interface AuthorBook {
  id: string;
  title: string;
  slug: string;
  coverUrl?: string;
  price: number;
  publishedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface BookCategory {
  category: Category;
}

export interface BookAuthor {
  id: string;
  penName: string;
  photoUrl?: string;
  user?: { firstName: string; lastName: string; avatarUrl?: string };
}

export interface BookDetail {
  id: string;
  title: string;
  slug: string;
  description?: string;
  isbn?: string;
  language: string;
  pageCount?: number;
  price: number;
  coverUrl?: string;
  status: string;
  publishedAt?: string;
  author: BookAuthor;
  categories: BookCategory[];
  _count: { reviews: number; purchases: number };
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string; avatarUrl?: string };
}
