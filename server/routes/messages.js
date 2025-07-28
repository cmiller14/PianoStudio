import express from 'express';
import * as messagesController from '../controllers/messages.js';
import { requireAdmin, authenticateToken } from '../middleware/authMiddle.js';


const router = express.Router();

router.get('/', messagesController.getAllMessages);
router.get('/type/:type', messagesController.getMessageByType);
router.put('/edit/:name', authenticateToken, messagesController.updateMessage);
router.get('/:name', messagesController.getMessageByName);



export default router;
