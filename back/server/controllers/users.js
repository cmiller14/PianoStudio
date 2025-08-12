import { db } from '../../firebase.js';

// Get all users (id, name, email only)
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => {
      const { name, email } = doc.data();
      return { id: doc.id, name, email };
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get current user by JWT's userId
export const getCurrentUser = async (req, res) => {
  const userId = req.user.userId; // from JWT middleware

  try {
    const doc = await db.collection('users').doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { email, name } = doc.data();
    res.json({ id: doc.id, email, name });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
