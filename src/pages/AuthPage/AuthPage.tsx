import React, { useState } from 'react';
import './AuthPage.scss';
import {AuthForm} from './AuthForm'; // Импортируем компонент формы
import { Link } from 'react-router-dom';
import backButton from '../../assets/back-button.png';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между регистрацией и логином

  const handleFormSubmit = (data: any) => {
    // Обработка данных формы (логин или регистрация)
    console.log(data);

    // Здесь можно отправить запрос на сервер для аутентификации
    // и обработать ответ (например, сохранить токен в localStorage)

    if (isLogin) {
      // Действия после успешного логина
    } else {
      // Действия после успешной регистрации
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/"> {}
            <img src={backButton} alt="Кнопка назад" className="auth-back" />
         </Link>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        <AuthForm 
          isLogin={isLogin} 
          onSubmit={handleFormSubmit} 
        />

        <div className="auth-toggle">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

AuthPage.displayName = 'AuthPage';