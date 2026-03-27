import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './app/routes';
import { BookProvider } from './app/contexts/BookContext';
import './styles/index.css';
import { GenreProvider } from './app/contexts/GenreContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GenreProvider>
      <BookProvider>
        <RouterProvider router={router} />
      </BookProvider>
    </GenreProvider>
  </StrictMode>
);
