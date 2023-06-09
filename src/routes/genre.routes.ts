import { Router } from 'express';
import { movies_get, series_get } from '../controllers/genre.controller';

const router = Router();

router.get('/movies', movies_get);
router.get('/series', series_get);

export default router;
