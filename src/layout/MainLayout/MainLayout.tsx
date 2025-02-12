import React from 'react';
import './MainLayout.scss';
import { Header } from '../../components/Header'; // Correct the path to Header
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <div>
        <Header />  {/* This line is crucial - renders the Header */}
        <Outlet /> {/* Здесь будут отображаться дочерние маршруты */}
        {/* Остальной контент */}
      </div>
    </>
  );
}