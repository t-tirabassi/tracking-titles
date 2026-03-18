import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { AnimatePresence } from "motion/react";
import { BookProvider } from "../contexts/BookContext";

export function RootLayout() {
  const location = useLocation();

  return (
    <BookProvider>
      <div className="flex h-screen bg-[#25130c] overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </BookProvider>
  );
}