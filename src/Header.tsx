import React from 'react';
import './Header.scss'; // Импортируйте стили

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
        
          <nav className="header__nav">
            <a href="#" className="header__link">Онлайн-кинотеатр</a>
            <a href="#" className="header__link">Билеты в кино</a>
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

export default Header;