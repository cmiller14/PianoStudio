import express from 'express';
import { getAllUsers } from '../controllers/users.js';
import { requireAdmin, authenticateToken } from '../middleware/authMiddle.js';

const router = express.Router();

router.get('/all', authenticateToken, requireAdmin, getAllUsers);

export default router;