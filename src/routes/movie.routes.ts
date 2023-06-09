import { Router } from 'express';
import {
  popular_get,
  top_rated_get,
  upcoming_get,
  genre_get
} from '../controllers/movie.controller';

const router = Router();

router.get('/popular', popular_get);
router.get('/top_rated', top_rated_get);
router.get('/upcoming', upcoming_get);
router.get('/genre', genre_get);

export default router;
