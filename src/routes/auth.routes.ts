import { Router } from 'express';
import { login_post, register_post } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login_post);
router.post('/register', register_post);

export default router;
