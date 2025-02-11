import React, { useState } from 'react';

interface AuthFormData {
  email?: string;
  password?: string;
  name?: string; // Для регистрации
}

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: AuthFormData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState<AuthFormData>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email || ''} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        value={formData.password || ''} 
        onChange={handleChange} 
        required 
      />
      {!isLogin && ( // Поле "Имя" только для регистрации
        <input 
          type="text" 
          name="name" 
          placeholder="Имя" 
          value={formData.name || ''} 
          onChange={handleChange} 
          required 
        />
      )}
      <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
    </form>
  );
};