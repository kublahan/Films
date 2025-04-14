import { IFilmService } from '@/services/IFilmService';

const getRandomMovie = async (): Promise<IFilmService | null> => {
    try {
        const randomFilmId = Math.floor(Math.random() * 1000) + 1; // Генерируем случайный ID фильма

        const options: RequestInit = {
            method: 'GET',
            headers: {
                'X-API-KEY': 'DNY2RWM-15QME6F-P5AKYEW-TS6XKAN',
                'Content-Type': 'application/json',
            },
        };

        const response: Response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=description&notNullFields=name&notNullFields=logo.url`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();

        const movie: IFilmService = {
            name: data.name,
            year: data.year,
            description: data.description,
            poster: data.poster && data.poster.url ? { url: data.poster.url } : { url: '' },
        };

        return movie;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Ошибка при получении данных:", err.message);
        } else {
            console.error("Неизвестная ошибка при получении данных:", err);
        }
        return null;
    }
};

class FilmService {
    async getRandomMovie(): Promise<IFilmService | null> {
        return getRandomMovie();
    }
}

export default FilmService;