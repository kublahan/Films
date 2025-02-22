import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage';
import { MainLayout } from '@/layout/MainLayout/MainLayout';
import { MainPage } from '@/pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/', // <- Указываем path для родительского маршрута
    element: <MainLayout />, // Используйте MainLayout здесь
    children: [
      { path: '/', element: <MainPage /> },
      
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);