import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import FilmService from '@/services/FilmService';
import { IFilmService } from '@/services/IFilmService';

export const MainPage: React.FC = () => {
    const [movies, setMovies] = useState<IFilmService[]>([]);
    const filmService = new FilmService();

    useEffect(() => {
        const fetchMovies = async () => {
            const cachedMovies = localStorage.getItem('cachedMovies');
            if (cachedMovies) {
                setMovies(JSON.parse(cachedMovies));
                return;
            }

            const numberOfMovies = 5;
            const moviePromises: Promise<IFilmService | null>[] = [];

            for (let i = 0; i < numberOfMovies; i++) {
                moviePromises.push(filmService.getRandomMovie());
            }

            try {
                const results = await Promise.all(moviePromises);
                const validMovies = results.filter((movie): movie is IFilmService => movie !== null);
                setMovies(validMovies);
                localStorage.setItem('cachedMovies', JSON.stringify(validMovies));
            } catch (error) {
                console.error("Ошибка при получении фильмов:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="main-page">
            <h1>Главная страница</h1>
            <div className="movie-list">
                {movies.map((movie, index) => (
                    <div key={movie.name ? movie.name : `movie-${index}`} className="movie-item">
                        <img src={movie.poster.url} alt={movie.name} />
                        <h2>{movie.name}</h2>
                        <p>{movie.year}</p>
                        <p>{movie.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};