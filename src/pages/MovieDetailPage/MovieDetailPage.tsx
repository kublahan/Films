import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IFilmService } from '@/services/IFilmService';
import './MovieDetailPage.scss';

interface LocationState {
    movie: IFilmService;
}

export const MovieDetailPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie } = location.state as LocationState;

    if (!movie) {
        return <div className="movie-detail-page">Фильм не найден</div>;
    }

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="movie-detail-page">
            <button onClick={handleGoBack} className="back-button">
                Назад
            </button>
            <div className="movie-hero-kinopoisk">
                <div className="hero-left">
                    <h1 className="movie-title">{movie.name}</h1>
                    <p className="movie-year">Год: {movie.year}</p>
                    {movie.description && <p className="movie-description">{movie.description}</p>}
                    {!movie.description && <p className="movie-description">Краткое описание отсутствует.</p>}
                </div>
                <div className="hero-right">
                    <div className="hero-poster-container">
                        <img src={movie.poster.url} alt={movie.name} className="hero-poster" />
                    </div>
                </div>
            </div>
        </div>
    );
};