import express from 'express';
import multer from "multer";
import { addEvent, getEvents, deleteEvent, uploadNewsImage } from '../controllers/news.js';
import { requireAdmin, authenticateToken } from '../middleware/authMiddle.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', getEvents);
router.post('/add', authenticateToken, requireAdmin, addEvent);
router.delete('/delete/:id', authenticateToken, requireAdmin, deleteEvent);
router.post('/upload-image', authenticateToken,requireAdmin, upload.single("image"), uploadNewsImage);

export default router;