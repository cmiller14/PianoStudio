import express from 'express';
import { addEvent, getEvents, deleteEvent } from '../controllers/news.js';
import { requireAdmin, authenticateToken } from '../middleware/authMiddle.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/add', authenticateToken, requireAdmin, addEvent);
router.delete('/delete/:id', authenticateToken, requireAdmin, deleteEvent);

export default router;