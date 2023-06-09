import { Router } from 'express';
import { search_get } from '../controllers/search.controller';

const router = Router();

router.get('/', search_get);

export default router;
