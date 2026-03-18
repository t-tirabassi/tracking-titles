import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types/book";

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "dateAdded">) => void;
  removeBook: (bookId: string) => void;
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
    };
    setBooks([...books, newBook]);
  };

  const removeBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
}
