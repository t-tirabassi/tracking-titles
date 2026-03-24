import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types/book";

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "dateAdded">) => void;
  removeBook: (bookId: string) => void;
  updateBook: (updatedBook : Book) => void;
  toggleFavorite: (bookId: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within BookProvider");
  }
  return context;
}

interface BookProviderProps {
  children: ReactNode;
}

export function BookProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (bookData: Omit<Book, "id" | "dateAdded">) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      favorite: false,
    };
    setBooks([...books, newBook]);
  };

  const removeBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  const toggleFavorite = (bookId: string) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, favorite: !book.favorite } : book
      )
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, removeBook, updateBook, toggleFavorite }}>
      {children}
    </BookContext.Provider>
  );
}