import { createContext, useContext, useState, ReactNode } from "react";

interface GenreColor {
  bg: string;
  text: string;
}

export interface CustomGenre {
  name: string;
  bg: string;
  text: string;
}

interface GenreContextType {
  customGenres: CustomGenre[];
  genreColors: Record<string, GenreColor>;
  addGenre: (genre: CustomGenre) => void;
}

const initialColors: Record<string, GenreColor> = {
  "Fiction":          { bg: "bg-[#ffdab8]", text: "text-[#b35704]" },
  "Non-Fiction":      { bg: "bg-[#E0E6FF]", text: "text-[#2F3FA7]" },
  "Mystery":          { bg: "bg-[#E6D6FF]", text: "text-[#5B2294]" },
  "Fantasy":          { bg: "bg-[#bceba0]", text: "text-[#055c23]" },
  "Romance":          { bg: "bg-[#FFD6EB]", text: "text-[#B40055]" },
  "Science Fiction":  { bg: "bg-[#c8e8e8]", text: "text-[#006666]" },
  "Horror":           { bg: "bg-[#fcbbbb]", text: "text-[#990000]" },
  "Biography":        { bg: "bg-[#fadea7]", text: "text-[#8a5801]" },
  "History":          { bg: "bg-[#e0caab]", text: "text-[#4f3719]" },
  "Other":            { bg: "bg-[#e8e8e8]", text: "text-[#666666]" },
};

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export function useGenres() {
  const context = useContext(GenreContext);
  if (!context) throw new Error("useGenres must be used within GenreProvider");
  return context;
}

interface GenreProviderProps {
  children: ReactNode;
}

export function GenreProvider({ children }: GenreProviderProps) {
  const [customGenres, setCustomGenres] = useState<CustomGenre[]>([]);
  const [genreColors, setGenreColors] = useState<Record<string, GenreColor>>(initialColors);

  const addGenre = (genre: CustomGenre) => {
    setCustomGenres((prev) => [...prev, genre]);
    setGenreColors((prev) => ({ ...prev, [genre.name]: { bg: genre.bg, text: genre.text } }));
  };

  return (
    <GenreContext.Provider value={{ customGenres, genreColors, addGenre }}>
      {children}
    </GenreContext.Provider>
  );
}