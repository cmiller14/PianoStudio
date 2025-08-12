import { db } from '../../../firebase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

const JWT_SECRET = process.env.ENCRYPTION_KEY;
console.log(JWT_SECRET);

// REGISTER
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if email already exists
    const existingUser = await db.collection('users').where('email', '==', email).limit(1).get();
    if (!existingUser.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user doc
    const newUserRef = await db.collection('users').add({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: newUserRef.id,
        email,
        role,
        isAdmin: role === "admin",
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      user: { id: newUserRef.id, name, email, role },
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const doc = snapshot.docs[0];
    const user = { id: doc.id, ...doc.data() };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const doc = await db.collection('users').doc(userId).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = doc.data();
    res.json({ id: userId, email: user.email, name: user.name });
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


