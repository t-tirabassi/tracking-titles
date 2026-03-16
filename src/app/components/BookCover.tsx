import { BookOpen } from "lucide-react";

export function BookCover() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#8b4513] to-[#5c3317] text-white p-6 md:p-8 relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-[#d4af37]" />
      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-[#d4af37]" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-[#d4af37]" />
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-[#d4af37]" />

      {/* Center content */}
      <BookOpen className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 text-[#d4af37]" />
      <h1 className="text-3xl md:text-5xl font-serif mb-3 md:mb-4 text-center">
        Tracking Titles
      </h1>
      <div className="w-24 md:w-32 h-0.5 bg-[#d4af37] mb-3 md:mb-4" />
      <p className="text-md md:text-lg text-center text-[#f5deb3] max-w-md px-4">
        Your readily available reading catalog,
        <br />
        categorized all in one place.
      </p>
    </div>
  );
}