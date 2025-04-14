import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage';
import { MainLayout } from '@/layout/MainLayout/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { UserPage } from '@/pages/UserPage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/user', element: <UserPage /> },
      { path: '/movie/:movieName', element: <MovieDetailPage  /> },
      
      
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);