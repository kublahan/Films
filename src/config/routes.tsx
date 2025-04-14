import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage';
import { MainLayout } from '@/layout/MainLayout/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { UserPage } from '@/pages/UserPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/user', element: <UserPage /> },
      
      
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);