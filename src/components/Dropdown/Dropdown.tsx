import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';
import { useNavigate } from 'react-router-dom';

interface DropdownItem {
  label: string;
  link: string;
}

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const items: DropdownItem[] = [
    { label: 'Главная', link: '/' },
    { label: 'Онлайн-кинотеатр', link: '/online-cinema' },
    { label: 'Фильмы', link: '/movies' },
    { label: 'Сериалы', link: '/tv-series' },
    { label: 'Телеканалы', link: '/tv-channels' },
    { label: 'Спорт', link: '/sports' },
    { label: 'Игры', link: '/games' },
    { label: 'Билеты в кино', link: '/movie-tickets' },
    { label: 'Медиа', link: '/media' },
  ];

  const handleMouseEnter = () => {
    setIsOpen(true); // Открываем список при наведении
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Закрываем список при уходе мыши
  };

  const handleItemClick = (link: string) => {
    navigate(link);
    setIsOpen(false); // Закрываем список после клика
  };

  return (
    <div 
      className="dropdown" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter} // Добавляем обработчик наведения
      onMouseLeave={handleMouseLeave} // Добавляем обработчик ухода мыши
    >
      <button> {/* Кнопка остается для визуального отображения */}
        КИНОПОИСК
      </button>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        {items.map((item, index) => (
          <button 
            key={index} 
            className="dropdown-item" 
            onClick={() => handleItemClick(item.link)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};