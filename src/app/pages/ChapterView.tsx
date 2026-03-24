import { useParams } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBooks } from "../contexts/BookContext";
import { BookPage } from "../components/BookPage";
import { EmptyChapter } from "../components/EmptyChapter";
import { ChapterDivider } from "../components/ChapterDivider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

// Wrapper to apply different layout per page type
function PageWrapper({
  type,
  children,
}: {
  type: "book" | "divider";
  children: React.ReactNode;
}) {
  return type === "book" ? (
    <div className="w-full h-full">{children}</div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {children}
    </div>
  );
}

export function ChapterView() {
  const { genre } = useParams<{ genre: string }>();
  const { books, removeBook } = useBooks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const decodedGenre = genre ? decodeURIComponent(genre) : "";
  const genreBooks = books.filter((book) => book.genre === decodedGenre);

  const handleNavigate = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < genreBooks.length; // index 0 = divider

  const handlePageClick = () => {
    if (canGoNext) {
      handleNavigate(currentIndex + 1);
    } else {
      handleNavigate(0);
    }
  };

  const handleDeleteBook = (bookId: string) => {
    removeBook(bookId);
    if (currentIndex >= genreBooks.length && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PageWrapper type={currentIndex === 0 ? "divider" : "book"}>
                  {currentIndex === 0 ? (
                    <ChapterDivider chapterNumber={1} title={decodedGenre} />
                  ) : (
                    <BookPage
                      book={genreBooks[currentIndex - 1]}
                      pageNumber={currentIndex}
                      onDelete={() =>
                        handleDeleteBook(genreBooks[currentIndex - 1].id)
                      }
                    />
                  )}
                </PageWrapper>
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
            <div>
              Page {currentIndex + 1} of {genreBooks.length + 1}
            </div>
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