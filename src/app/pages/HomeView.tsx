import { motion } from "motion/react";
import { BookCover } from "../components/BookCover";
import { useNavigate } from "react-router";
import { useBooks } from "../contexts/BookContext";

export function HomeView() {
  const navigate = useNavigate();
  const { books } = useBooks();

  const handleCoverClick = () => {
    if (books.length > 0) {
      // Gets the first book's genre and navigate to it
      const firstGenre = books[0].genre;
      navigate(`/chapter/${encodeURIComponent(firstGenre)}`);
    }
  };

  return (
    <div className="h-full flex items-center justify-center md:px-8 md:py-10">
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full md:h-auto md:max-w-2xl md:aspect-[3/4] rounded-none md:rounded-lg shadow-2xl overflow-hidden cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(212,175,55,0.3)",
        }}
        onClick={handleCoverClick}
      >
        <BookCover />
      </motion.div>
    </div>
  );
}