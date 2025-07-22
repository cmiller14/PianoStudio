import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authMiddle.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
