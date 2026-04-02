import { BookOpenText } from "lucide-react";
import { useGenres } from "../contexts/GenreContext"; // use context for dynamic genres
import { genreColors as staticColors } from "../types/genreColors"; // static ones

interface ChapterDividerProps {
  chapterNumber?: number;
  title: string;
}

export function ChapterDivider({ title }: ChapterDividerProps) {
  const { genreColors: dynamicColors } = useGenres();

  // Merge static and dynamic colors
  const genreColor = dynamicColors[title] || staticColors[title] || { bg: "bg-[#e8e8e8]", text: "text-[#666666]" };

  const bgClass = genreColor.bg;
  const hex = bgClass?.match(/\[(.*?)\]/)?.[1] || "c4b5a0";

  const textClass = genreColor.text;
  const textHex = textClass?.match(/\[(.*?)\]/)?.[1] || "#666666";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-serif mb-3 md:mb-4 text-center text-[#2c1810] uppercase">
        <span className="mx-5" style={{ color: textHex }}>
          ⚜
        </span>
        {title}
        <span className="mx-5" style={{ color: textHex }}>
          ⚜
        </span>
      </h1>

      <BookOpenText
        className="w-12 h-12 md:w-16 md:h-16 mb-4 text-[#c4b5a0]"
        style={{ color: hex }}
      />

      <p className="text-sm md:text-base text-[#8b7355] font-serif max-w-md">
        Here are all of the {title} books you've read.
      </p>
    </div>
  );
}