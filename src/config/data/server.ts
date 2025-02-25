import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3001;

interface User {
  id: number;
  email: string;
  passwordHash: string;
}

const users: User[] = [];
let nextUserId = 1;

app.use(express.json());

app.post('/api/auth/register', (req: Request<{}, {}, { email: string; password: string }>, res: Response) => { // Убрали async
  try {
    const { email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, passwordHash) => { // Используем колбэк для bcrypt.hash
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const newUser: User = {
        id: nextUserId++,
        email,
        passwordHash: passwordHash!, // passwordHash точно не null/undefined здесь
      };
      users.push(newUser);

      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ... (Остальные маршруты)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});