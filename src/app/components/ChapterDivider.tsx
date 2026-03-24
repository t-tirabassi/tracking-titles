import { BookOpenText } from "lucide-react";
import { genreColors } from "../types/genreColors"; // ← adjust path if needed

interface ChapterDividerProps {
  chapterNumber: number;
  title: string; // title === genre
}

export function ChapterDivider({ title }: ChapterDividerProps) {

  // Get the genre's text color class
  const genreColorClass = genreColors[title]?.text || "text-[#c4b5a0]";
  const bgClass = genreColors[title]?.bg;
  const hex = bgClass?.match(/\[(.*?)\]/)?.[1] || "c4b5a0";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-serif mb-3 md:mb-4 text-center text-[#2c1810] uppercase">
        <span className={`mx-5 ${genreColorClass}`}>⚜</span>
        {title}
        <span className={`mx-5 ${genreColorClass}`}>⚜</span>
      </h1>

      {/* ONLY this changes */}
      <BookOpenText
        className="w-12 h-12 md:w-16 md:h-16 mb-4 text-[#c4b5a0]"
        style={{ color: hex }}
      />

      <p className="text-sm md:text-base text-[#8b7355] font-serif max-w-md">
        This chapter contains all of the {title} books you've read.
      </p>
    </div>
  );
}