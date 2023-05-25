import { TypedRequest } from '../types';
import { prisma } from '../api';
import bcrypt from 'bcrypt';

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
    return res.status(400).send({ error: 'Email already exists' });
  }

  // Check if username already exists
  if (await prisma.user.findUnique({ where: { username: username } })) {
    return res.status(400).send({ error: 'Username already exists' });
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
