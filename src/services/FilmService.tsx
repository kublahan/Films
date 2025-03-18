import { IFilmService } from '@/services/IFilmService';

const getRandomMovie = async (): Promise<IFilmService | null> => {
    try {
        const randomFilmId = Math.floor(Math.random() * 1000) + 1; // Генерируем случайный ID фильма

        const options: RequestInit = {
            method: 'GET',
            headers: {
                'X-API-KEY': 'ba3d78e1-8abc-45a1-8644-cd9abbc86c01',
                'Content-Type': 'application/json',
            },
        };

        const response: Response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${randomFilmId}`, options);

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