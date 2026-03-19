import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBooks } from "../contexts/BookContext";
import { BookPage } from "../components/BookPage";
import { EmptyChapter } from "../components/EmptyChapter";
import { GENRES } from "../types/book";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

export function ChapterView() {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const { books, removeBook } = useBooks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const decodedGenre = genre ? decodeURIComponent(genre) : "";
  const genreBooks = books.filter((book) => book.genre === decodedGenre);
  const getNextGenre = () => {
  const currentGenreIndex = GENRES.findIndex(g => g === decodedGenre);
  // If not found / is last go to first
  if (currentGenreIndex === -1 || currentGenreIndex === GENRES.length - 1) {
    return GENRES[0];
  }
  return GENRES[currentGenreIndex + 1];
};

  const handleNavigate = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const handlePageClick = () => {
    // Click to go to next page, or loop back to first
    if (canGoNext) {
      handleNavigate(currentIndex + 1);
    } else {
      const nextGenre = getNextGenre();
      navigate(`/chapter/${encodeURIComponent(nextGenre)}`)
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < genreBooks.length - 1;

  // Handles book deletion
  const handleDeleteBook = (bookId: string) => {
    removeBook(bookId);
    if (currentIndex >= genreBooks.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    else if (genreBooks.length == 1) {
      setCurrentIndex(0);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="h-full flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Book Display Area */}
      <div className="flex-1 flex items-center justify-center md:px-8 md:py-10 overflow-hidden">
        <div
          className="relative w-full h-full md:h-auto md:max-w-2xl md:aspect-[3/4] rounded-none md:rounded-lg shadow-2xl overflow-hidden bg-[#faf8f3] cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(139,115,85,0.2)",
          }}
          onClick={handlePageClick}
        >
          {genreBooks.length === 0 ? (
            <EmptyChapter genre={decodedGenre} />
          ) : (
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BookPage
                  book={genreBooks[currentIndex]}
                  pageNumber={currentIndex + 1}
                  onDelete={() => handleDeleteBook(genreBooks[currentIndex].id)}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Navigation */}
      {genreBooks.length > 0 && (
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#f5f1e8] border-t border-[#c4b5a0]">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(currentIndex - 1);
            }}
            disabled={!canGoPrevious}
            className="gap-2 text-[#2c1810] hover:text-[#8b4513] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden md:inline">Previous</span>
          </Button>

          <div className="text-xs md:text-sm text-[#8b7355] font-serif text-center">
            <div>Page {currentIndex + 1} of {genreBooks.length}</div>
          </div>

          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(currentIndex + 1);
            }}
            disabled={!canGoNext}
            className="gap-2 text-[#2c1810] hover:text-[#8b4513] disabled:opacity-30"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}