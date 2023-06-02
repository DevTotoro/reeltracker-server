import { Router } from 'express';
import { popular_get } from '../controllers/movie.controller';

const router = Router();

router.get('/popular', popular_get);

export default router;
