import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

// Routes
import authRouter from './routes/auth.routes';
api.use('/auth', authRouter);

import movieRouter from './routes/movie.routes';
api.use('/movie', movieRouter);

// Version the api
app.use('/api/v1', api);
