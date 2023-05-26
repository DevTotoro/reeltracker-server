import { TypedRequest } from '../types';
import { prisma } from '../api';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login_post = async (
  req: TypedRequest<{ username: string; password: string }>,
  res
) => {
  const { username, password } = req.body;

  // Validate credentials
  if (!username || !password) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { username: username } });

  if (!user) {
    return res.status(401).send({ error: 'Invalid username' });
  }

  // Check if password is correct
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: 'Invalid password' });
  }

  // Create and assign a token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

  return res.status(200).send({ token: token });
};

export const register_post = async (
  req: TypedRequest<{ email: string; username: string; password: string }>,
  res
) => {
  const { email, username, password } = req.body;

  // Validate credentials
  if (!email || !username || !password) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  // Check if email already exists
  if (await prisma.user.findUnique({ where: { email: email } })) {
    return res.status(409).send({ error: 'Email already exists' });
  }

  // Check if username already exists
  if (await prisma.user.findUnique({ where: { username: username } })) {
    return res.status(409).send({ error: 'Username already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword
      }
    });

    return res.status(201).send({ message: 'User created' });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ error: 'Internal server error' });
  }
};
