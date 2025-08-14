import express from 'express';
import cors from 'cors';

// Import your routes
import messageRoutes from './server/routes/messages.js';
import authRoutes from './server/routes/auth.js';
import userRoutes from './server/routes/users.js';
import scheduleRoutes from './server/routes/schedule.js';

const app = express();

app.set('trust proxy', 1);
app.use((req, res, next) => {
  console.log('Remote address:', req.connection.remoteAddress);
  console.log('X-Forwarded-For:', req.headers['x-forwarded-for']);
  next();
});

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);

export default async function handler(req, res) {
  // Use Express app to handle the request
  return new Promise((resolve) => {
    app(req, res, () => {
      // If no route matches, return 404
      res.statusCode = 404;
      res.end("Route not found");
      resolve();
    });
  });
}




