export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  plot: string;
  thoughts: string;
  rating: number; // 1-5
  dateAdded: string;
}

export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Biography",
  "History",
  "Other"
] as const;

export type Genre = typeof GENRES[number];
