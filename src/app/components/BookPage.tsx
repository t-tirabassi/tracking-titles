import { Book } from "../types/book";
import { Star, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";

interface BookPageProps {
  book: Book;
  pageNumber: number;
  onDelete ?: () => void;
}

export function BookPage({ book, pageNumber, onDelete }: BookPageProps) {
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

      {/* Delete a book */}
      {onDelete && (
        <div className="absolute top-4 left-4 md:top-6 md:right-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="text-[#8b4513] hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Entry Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete "{book.title}" from the "{book.genre}" chapter?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Book title and author */}
      <div className="mb-5 mt-4">
        <h1 className="text-2xl md:text-3xl font-serif text-[#2c1810] mb-2">
          {book.title}
        </h1>
        <p className="text-base md:text-lg text-[#5c4a3a] italic">by {book.author}</p>
      </div>

      {/* Genre badge */}
      <div className="mb-5">
        <span className="inline-block px-3 py-1 bg-[#8b4513]/10 text-[#8b4513] text-base rounded-full">
          {book.genre}
        </span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-7 h-7 ${
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
      <div className="mt-4 mb-2 text-xs text-[#8b7355] text-right font-serif">
        Added: {new Date(book.dateAdded).toLocaleDateString()}
      </div>
    </div>
  );
}