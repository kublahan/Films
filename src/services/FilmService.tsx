const getRandomMovie = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': 'HNQQB1N-49KMVP4-GMJNAPD-AFR430K',
            },
        };

        const response = await fetch('https://api.kinopoisk.dev/v1.4/movie/random', options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные о случайном фильме:", data);
        return data;
    } catch (err) {
        console.error("Ошибка при получении данных:", err);
        return null;
    }
};

getRandomMovie(); // Вызываем функцию для получения случайного фильма

class FilmService {
    async getRandomMovie() {
        return getRandomMovie();
    }
}

export default FilmService;