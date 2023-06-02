import { Router } from 'express';
import { popular_get, top_rated_get } from '../controllers/movie.controller';

const router = Router();

router.get('/popular', popular_get);
router.get('/top_rated', top_rated_get);

export default router;
