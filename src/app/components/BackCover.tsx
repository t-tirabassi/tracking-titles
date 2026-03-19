import { BookOpenText } from "lucide-react";

export function BookCover() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3c0008] to-[#300006] text-white p-6 md:p-8 relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-[#caa906]" />
      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-[#caa906]" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-[#caa906]" />
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-[#caa906]" />

      {/* Center image */}
      <BookOpenText className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 text-[#caa906]" />
    </div>
  );
}