import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './app/routes';
import { BookProvider } from './app/contexts/BookContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>
  </StrictMode>
);
