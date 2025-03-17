import React, { useState } from 'react';
import './AuthPage.scss';
import {AuthForm} from './AuthForm';
import { Link } from 'react-router-dom';
import backButton from '../../assets/back-button.png';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSubmit = async(data: any) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);

        <Link to="/"> { }</Link>;
      } else {
        console.error(result.message);
        alert(result.message)
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
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