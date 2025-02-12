import React from 'react';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <h1>Главная страница</h1>
      {/* Здесь может быть и другой контент главной страницы */}
    </div>
  );
};

MainPage.displayName = 'MainPage';