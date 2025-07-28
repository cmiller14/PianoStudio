import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ENCRYPTION_KEY || 'supersecret';

export const getAllMessages = async (req, res) => {
    try {
    const messages = await prisma.text.findMany(); // fetch all messages
    res.json(messages); // send as JSON
    } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch mesages' });
    }
};

export const getMessageByType = async (req, res) => {
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
}

export const getMessageByName = async (req, res) => {
    const { name } = req.params;
    const text = await prisma.text.findUnique({ where: { name } });
    res.json(text);
};

export const updateMessage = async (req, res) => {
  const id = req.params;
  const {content} = req.body;

  try {
    const updatedMessage = await prisma.text.update({
      where: {id: Number(id.name)},
      data: { message: content },
    });

    res.json(updatedMessage);
  } catch (error) {
    console.log(error);
    // Handle case where message with given name doesn't exist
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(500).json({ error: 'Failed to update message' });
  }
};