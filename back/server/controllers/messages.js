import { db } from '../../../firebase.js';

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const snapshot = await db.collection('text').get();
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Get messages by type
export const getMessageByType = async (req, res) => {
  const { type } = req.params;
  try {
    const snapshot = await db.collection('text').where('type', '==', type).get();
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages by type:', error);
    res.status(500).json({ error: 'Could not fetch messages by type' });
  }
};

// Get message by name
export const getMessageByName = async (req, res) => {
  const { name } = req.params;
  try {
    const snapshot = await db.collection('text').where('name', '==', name).limit(1).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: 'Message not found' });
    }
    const doc = snapshot.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching message by name:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

// Update a message by ID
export const updateMessage = async (req, res) => {
  const { name } = req.params; // Firestore uses string IDs, not numbers
  const { content } = req.body;

  try {
    const docRef = db.collection('text').doc(name);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await docRef.update({ message: content });
    res.json({ name, ...doc.data(), message: content });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
};
