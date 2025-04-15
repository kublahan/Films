import React from 'react';
import './Header.scss';
import logo from '../../assets/react.svg';
import { Dropdown } from '../Dropdown';
import { Link } from 'react-router-dom';
import { ErrorComponent } from '../ErrorBoundary';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">

          <nav className="header__nav">
            <Link to="/" className="header__link">
              <img src={logo} alt="Логотип компании" className="header__logo" />
            </Link>
            <ErrorComponent>
                <Dropdown />
            </ErrorComponent>
            <Link to="/reviews" className="header__link">Рецензии</Link>
            <Link to="/movies" className="header__link">Фильмы/сериалы</Link>
          </nav>
          <div className="header__search">
            <input type="text" placeholder="Поиск" />
            <button>Найти</button>
          </div>
          <div className="header__profile">
            <Link to="/auth">
              <button>Войти</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};