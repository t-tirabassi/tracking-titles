import { Link, useLocation } from "react-router";
import { GENRES } from "../types/book";
import { useBooks } from "../contexts/BookContext";
import { AddBookDialog } from "./AddBookDialog";
import { BookOpenText, Home, Menu, X, Plus, Minus, Bookmark } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Sidebar() {
  const { books, addBook } = useBooks();
  const location = useLocation();
  const favActive = location.pathname === "/Favorites"
  const [isOpen, setIsOpen] = useState(false);

  const getBookCountForGenre = (genre: string) => {
    return books.filter((book) => book.genre === genre).length;
  };

  const closeSidebar = () => setIsOpen(false);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-[#caa906]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpenText className="w-6 h-6 md:w-8 md:h-8 mb-3 mr-1 text-[#caa906]" />
            <div>
              <h2 className="text-lg md:text-xl font-serif text-[#ffffff]">Tracking Titles</h2>
              <p className="text-xs md:text-sm text-[#ffffff]">{books.length} books added</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden text-[#ffffff] hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <AddBookDialog onAddBook={addBook} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 md:p-4">
        <Link
          to="/"
          onClick={closeSidebar}
          className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg mb-2 transition-colors ${
            location.pathname === "/"
              ? "bg-[#001E57] text-[#caa906] border border-[#caa906]"
              : "text-[#c4b5a0] hover:bg-[#0a2a5c] hover:text-white"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-serif">Home</span>
        </Link>

        <div className="mt-4 mb-2 px-3 md:px-4">
          <h3 className="flex text-xs uppercase tracking-wider text-[#caa906] font-serif">
            Chapters<Plus className="ml-2 w-4 h-4"/><Minus className="ml-2 w-4 h-4" />
          </h3>
        </div>

        {GENRES.map((genre) => {
          const count = getBookCountForGenre(genre);
          const isActive = location.pathname === `/chapter/${encodeURIComponent(genre)}`;

          return (
            <Link
              key={genre}
              to={`/chapter/${encodeURIComponent(genre)}`}
              onClick={closeSidebar}
              className={`flex items-center justify-between px-3 md:px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-[#001E57] text-[#caa906] border-2 border-[#caa906]"
                  : "text-[#c4b5a0] hover:bg-[#0a2a5c] hover:text-white"
              }`}
            >
              <span className="font-serif text-sm md:text-base">{genre}</span>
              <span className={`text-sm ${isActive ? "text-[#ffffff]" : "text-[#caa906]"}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

        {/* Favorites Tab */}
        <div className="mt-4 mb-2 p-2 md:p-4">
          <Link
            to="/Favorites"
            onClick={closeSidebar}
            className={`flex items-center justify-between px-3 md:px-4 py-3 rounded-lg mb-1 transition-colors ${
              favActive
                ? "bg-[#001E57] text-[#caa906] border-2 border-[#caa906]"
                : "text-[#c4b5a0] hover:bg-[#0a2a5c] hover:text-white"
            }`}
            >
              <span className="font-serif text-sm md:text-base">Favorites</span>
              <Bookmark className={`w-4 h-4 ${
                favActive ? "text-white" : "text-[#caa906]"
              }`} />
            </Link>
        </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-[#001E57] hover:bg-[#6b3410] text-white"
        size="icon"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50 
          w-80 max-w-[85vw]
          bg-gradient-to-b from-[#3c0008] to-[#300006] 
          border-r border-[#caa906] 
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {sidebarContent}
      </div>
    </>
  );
}