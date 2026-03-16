import { Book } from "../types/book";
import { Star } from "lucide-react";

interface BookPageProps {
  book: Book;
  pageNumber: number;
}

export function BookPage({ book, pageNumber }: BookPageProps) {
  return (
    <div
      className="h-full flex flex-col p-6 md:p-8 bg-[#faf8f3]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          transparent,
          transparent 31px,
          rgba(139, 69, 19, 0.05) 31px,
          rgba(139, 69, 19, 0.05) 32px
        )`
      }}
    >
      {/* Page number */}
      <div className="text-right text-sm text-[#8b7355] mb-4 font-serif">
        {pageNumber}
      </div>

      {/* Book title and author */}
      <div className="mb-5 mt-4">
        <h1 className="text-2xl md:text-3xl font-serif text-[#2c1810] mb-2">
          {book.title}
        </h1>
        <p className="text-base md:text-lg text-[#5c4a3a] italic">by {book.author}</p>
      </div>

      {/* Genre badge */}
      <div className="mb-5">
        <span className="inline-block px-3 py-1 bg-[#8b4513]/10 text-[#8b4513] text-sm rounded-full">
          {book.genre}
        </span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= book.rating
                ? "fill-[#d4af37] text-[#d4af37]"
                : "text-[#c4b5a0]"
            }`}
          />
        ))}
      </div>

      {/* Content sections */}
      <div className="flex-1 overflow-y-auto space-y-4 text-[#2c1810] font-serif">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-[#8b7355] mb-4">
            Plot
          </h3>
          <p className="mb-8 leading-relaxed text-sm md:text-base whitespace-pre-line break-words">{book.plot}</p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-[#8b7355] mb-4">
            My Thoughts
          </h3>
          <p className="mb-8 leading-relaxed text-sm md:text-base italic whitespace-pre-line break-words">{book.thoughts}</p>
        </div>
      </div>

      {/* Date stamp */}
      <div className="mt-4 mb-4 text-xs text-[#8b7355] text-right font-serif">
        Added: {new Date(book.dateAdded).toLocaleDateString()}
      </div>
    </div>
  );
}