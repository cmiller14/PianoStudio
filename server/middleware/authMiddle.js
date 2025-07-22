import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token required' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
