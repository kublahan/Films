import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage';
import { MainLayout } from '@/layout/MainLayout/MainLayout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />, // Используйте MainLayout здесь
    children: [
      { path: '/auth', element: <AuthPage /> },
    ],
  },
]);