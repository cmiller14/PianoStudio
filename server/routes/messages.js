import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

// get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await prisma.text.findMany(); // fetch all messages
    res.json(messages); // send as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch messages' });
  }
});

// get messages by type
router.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const messages = await prisma.text.findMany({
      where: { type }
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch messages by type' });
  }
});

// get message by name
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const text = await prisma.text.findUnique({ where: { name } });
  res.json(text);
});



export default router;
