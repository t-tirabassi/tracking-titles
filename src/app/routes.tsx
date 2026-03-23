import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { ChapterView } from "./pages/ChapterView";
import { HomeView } from "./pages/HomeView";
import { FavoritesView } from "./pages/FavoritesView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomeView,
      },
      {
        path: "chapter/:genre",
        Component: ChapterView,
      },
      {
        path: "favorites",
        Component: FavoritesView,
      },
    ],
  },
]);
