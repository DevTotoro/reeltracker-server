import { Router } from 'express';
import { register_post } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register_post);

export default router;
