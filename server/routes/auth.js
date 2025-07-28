import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authMiddle.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
