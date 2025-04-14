import React, { useState, useEffect, useCallback, useRef } from 'react';
import './MainPage.scss';
import FilmService from '@/services/FilmService';
import { IFilmService } from '@/services/IFilmService';
import { useNavigate } from 'react-router-dom';

export const MainPage: React.FC = () => {
    const [movies, setMovies] = useState<IFilmService[]>([]);
    const [loading, setLoading] = useState(false);
    const filmService = new FilmService();
    const moviesPerPage = 12;
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isInitialLoad = useRef(true);

    const fetchMoreMovies = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        console.log("fetchMoreMovies вызывается");

        const moviePromises: Promise<IFilmService | null>[] = [];
        for (let i = 0; i < moviesPerPage; i++) {
            moviePromises.push(filmService.getRandomMovie());
        }

        try {
            const results = await Promise.all(moviePromises);
            const newMovies = results.filter((movie): movie is IFilmService => movie !== null);

            if (newMovies.length < moviesPerPage) {
                setHasMore(false);
                console.log("hasMore установлено в false");
            }
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
            setPage((prevPage) => prevPage + 1);
            console.log("Загружено фильмов:", movies.length + newMovies.length);
        } catch (error) {
            console.error("Ошибка при получении дополнительных фильмов:", error);
        } finally {
            setLoading(false);
            console.log("loading установлено в false");
        }
    }, [loading, hasMore, filmService, moviesPerPage]);

    useEffect(() => {
        if (isInitialLoad.current) {
            fetchMoreMovies();
            isInitialLoad.current = false;
        }
    }, [fetchMoreMovies]);

    const handleLoadMoreClick = () => {
        fetchMoreMovies();
    };

    const navigate = useNavigate();

    const handleMovieClick = (movie: IFilmService) => {
        navigate(`/movie/${movie.name}`, { state: { movie } });
    };

    return (
        <div className="main-page">
            <div className="movie-grid">
                {movies.map((movie, index) => (
                    <div key={movie.name ? movie.name : `movie-${index}`} className="movie-card"
                    onClick={() => handleMovieClick(movie)}
                    style={{ cursor: 'pointer' }}>
                        <div className="movie-poster">
                            <img src={movie.poster.url} alt={movie.name} />
                        </div>
                        <div className="movie-info">
                            <h3>{movie.name}</h3>
                            <p className="movie-year">{movie.year}</p>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button onClick={handleLoadMoreClick} className="load-more-button" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Ещё'}
                </button>
            )}
            {!hasMore && movies.length > 0 && (
                <p className="no-more-movies">Больше фильмов нет.</p>
            )}
        </div>
    );
};