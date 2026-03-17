import { BookOpen } from "lucide-react";

interface EmptyChapterProps {
  genre: string;
}

export function EmptyChapter({ genre }: EmptyChapterProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-[#faf8f3]">
      <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-[#c4b5a0] mb-4" />
      <h3 className="text-xl md:text-2xl font-serif text-[#2c1810] mb-2 text-center">
        Chapter Empty
      </h3>
      <p className="text-sm md:text-base text-[#8b7355] text-center max-w-md font-serif px-4">
        No {genre} books added yet.
        <br />
        Click "Add New Book" to start adding some!
      </p>
    </div>
  );
}