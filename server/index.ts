import express, { Request, Response, NextFunction } from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import * as dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const { Pool } = pg;

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

// Конфигурация PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Films',
    password: 'Kerulen2',
    port: 5432,
});

// Секретный ключ для JWT из переменных окружения
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    console.error('Ошибка: Переменная окружения JWT_SECRET не определена.');
    process.exit(1); // Завершаем приложение, если ключ не найден
}

// Тип для тела запроса регистрации
interface RegisterRequestBody {
    email: string;
    password: string;
    name: string;
    img?: Buffer;
}

// Тип для тела запроса логина
interface LoginRequestBody {
    email: string;
    password: string;
}

// Тип для ответа аутентификации
interface AuthResponse {
    token: string;
    img?: Buffer;
}

// Промежуточное ПО для проверки токена
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
};

// Настройка multer для загрузки аватаров
const storage = multer.memoryStorage(); // Используем memoryStorage для хранения файла в памяти

const upload = multer({ storage: storage });

// Регистрация
app.post('/api/register', async (
    req: Request<{}, AuthResponse | { message: string }, RegisterRequestBody>,
    res: Response<AuthResponse | { message: string }>
) => {
    try {
        const { email, password, name, img } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password, name, img) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, name, img || null]
        );

        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, secretKey);

        res.json({ token, img: user.img });
    } catch (error) {
        console.error('Ошибка в /api/register:', error);
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
});

// Авторизация
app.post('/api/login', async (
    req: Request<{}, AuthResponse | { message: string }, LoginRequestBody>,
    res: Response<AuthResponse | { message: string }>
) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign({ userId: user.id }, secretKey);

        res.json({ token, img: user.img });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка авторизации' });
    }
});

// Получение информации о пользователе
app.get('/api/user', authenticateToken, async (req: Request, res: Response) => {
  try {
      const userId = (req as any).user.userId;
      const result = await pool.query('SELECT name, img FROM users WHERE id = $1', [userId]);
      const user = result.rows[0];

      if (user && user.img) {
          const base64Image = user.img.toString('base64');
          res.json({ name: user.name, img: base64Image });
      } else {
          res.json({ name: user.name, img: null });
      }
  } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Загрузка и обновление аватара пользователя
app.post('/api/user/avatar', authenticateToken, upload.single('avatar'), async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const img = req.file?.buffer;
        await pool.query('UPDATE users SET img = $1 WHERE id = $2', [img, userId]);
        res.json({ message: 'Аватар успешно обновлен!' });
    } catch (error) {
        console.error('Ошибка при загрузке аватара:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});