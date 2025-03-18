import React, { useState, useEffect } from 'react';
import './UserPage.scss';
import { useNavigate } from 'react-router-dom';
import backButton from '../../assets/back-button.png';
import { Link } from 'react-router-dom';

export const UserPage: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.name);

                    if (userData.img) {
                        setUserAvatar(`data:image/png;base64,${userData.img}`);
                    } else {
                        setUserAvatar('');
                    }
                } else {
                    localStorage.removeItem('token');
                    navigate('/auth');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setNewAvatar(event.target.files[0]);
            setUserAvatar(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleAvatarUpload = async () => {
        if (!newAvatar) return;

        const formData = new FormData();
        formData.append('avatar', newAvatar);

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/user/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('Аватар успешно обновлен!');
            } else {
                alert('Ошибка при загрузке аватара.');
            }
        } catch (error) {
            console.error('Ошибка при загрузке аватара:', error);
        }
    };

    return (
    <div className="user-page">
        <div className="user-container">
            <Link to="/">
                <img src={backButton} alt="Кнопка назад" className="user-back" />
            </Link>
            <h2>Страница пользователя</h2>
            <div className="user-info">
                <img src={userAvatar || 'default-avatar.png'} alt="Аватар пользователя" className="user-avatar" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <button onClick={handleAvatarUpload}>Загрузить аватар</button>
                <p>Имя пользователя: {userName}</p>
            </div>
        </div>
    </div>
    );
};

UserPage.displayName = 'UserPage';