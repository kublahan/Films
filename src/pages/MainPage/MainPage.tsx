import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import  FilmService  from '@/services/FilmService';
import { IFilmService } from '@/services/IFilmService';

export const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<IFilmService[]>([]);
  const filmService = new FilmService();

  useEffect(() => {
    const fetchMovies = async () => {
      const numberOfMovies = 3;
      const moviesArray: IFilmService[] = [];

      for (let i = 0; i < numberOfMovies; i++) {
        const movie = await filmService.getRandomMovie();
        if (movie) {
          moviesArray.push(movie);
        }
      }

      setMovies(moviesArray);
    };

    fetchMovies();
  }, [filmService]);



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