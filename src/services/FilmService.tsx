interface Movie {
    name: string;
    year: number;
    description: string;
}

const getRandomMovie = async (): Promise<Movie | null> => {
    try {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': 'HNQQB1N-49KMVP4-GMJNAPD-AFR430K',
            },
        };

        const response: Response = await fetch('https://api.kinopoisk.dev/v1.4/movie/random', options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Movie = await response.json();
        console.log("Данные о случайном фильме:", data);
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Ошибка при получении данных:", err.message);
        } else {
            console.error("Неизвестная ошибка при получении данных:", err);
        }
        return null;
    }
};

getRandomMovie(); // Вызываем функцию для получения случайного фильма

class FilmService {
    async getRandomMovie(): Promise<Movie | null> {
        return getRandomMovie();
    }
}

export default FilmService;