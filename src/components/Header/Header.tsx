import React from 'react';
import './Header.scss';
import logo from '../../assets/react.svg';
import { Dropdown } from '../Dropdown';
import { Link } from 'react-router-dom'; // Импортируем Link

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">

          <nav className="header__nav">
            <Link to="/" className="header__link"> {/* Заменяем <a> на <Link> */}
              <img src={logo} alt="Логотип компании" className="header__logo" />
            </Link>
            <Dropdown />
            <Link to="/reviews" className="header__link">Рецензии</Link> {/* Заменяем <a> на <Link> */}
            <Link to="/movies" className="header__link">Фильмы/сериалы</Link> {/* Заменяем <a> на <Link> */}
          </nav>
          <div className="header__search">
            <input type="text" placeholder="Поиск" />
            <button>Найти</button>
          </div>
          <div className="header__profile">
            <Link to="/auth"> {/* Заменяем <button> на <Link> */}
              <button>Войти</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};