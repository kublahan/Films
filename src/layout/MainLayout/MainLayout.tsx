import React from 'react';
import './MainLayout.scss';
import { Header } from '../../components/Header'; // Correct the path to Header

export const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <Header />  {/* This line is crucial - renders the Header */}
        {/* Остальной контент */}
        {children}
      </div>
    </>
  );
}