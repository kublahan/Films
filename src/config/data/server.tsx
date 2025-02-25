import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(express.json());

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  users.push({ email, password });

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    const token = 'some-jwt-token';
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});