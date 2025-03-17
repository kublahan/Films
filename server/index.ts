import express, { Request, Response } from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

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

// Секретный ключ для JWT
const secretKey = 'your_secret_key';

// Тип для тела запроса регистрации
interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

// Тип для тела запроса логина
interface LoginRequestBody {
  email: string;
  password: string;
}

// Тип для ответа аутентификации
interface AuthResponse {
  token: string;
}

// Регистрация
app.post('/api/register', async (
  req: Request<{}, AuthResponse | { message: string }, RegisterRequestBody>,
  res: Response<AuthResponse | { message: string }>
) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, secretKey);

    console.log('Ответ бэкенда:', { token });
    res.json({ token });
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

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка авторизации' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});