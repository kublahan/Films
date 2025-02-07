import React from 'react';
import './Header.scss'; // Импортируйте стили
import logo from '../../assets/react.svg';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
        
          <nav className="header__nav">
            <a href="#" className="header__link">
              <img src={logo} alt="Логотип компании" className="header__logo" />
            </a>
            <a href="#" className="header__link">Отзывы</a>
            <a href="#" className="header__link">Рецензии</a>
            <a href="#" className="header__link">Фильмы/сериалы</a>
          </nav>
          <div className="header__search">
            <input type="text" placeholder="Поиск" />
            <button>Найти</button>
          </div>
          <div className="header__profile">
            <button>Войти</button>
          </div>
        </div>
      </div>
    </header>
  );
};