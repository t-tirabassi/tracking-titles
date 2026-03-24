export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  plot: string;
  thoughts: string;
  rating: number;
  dateAdded: string;
  favorite: boolean;
}

export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Horror",
  "Biography",
  "History",
  "Other"
] as const;

export type Genre = typeof GENRES[number];
