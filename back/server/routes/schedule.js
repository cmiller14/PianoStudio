import express from 'express';
import { addEvent, getEvents, deleteEvent, updateEvent } from '../controllers/schedule.js';
import { requireAdmin, authenticateToken } from '../middleware/authMiddle.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/add', authenticateToken, requireAdmin, addEvent);
router.delete('/delete/:id', authenticateToken, requireAdmin, deleteEvent);
router.patch('/update/:id', authenticateToken, requireAdmin, updateEvent);

export default router;