import express from 'express';
import cors from 'cors';

// Import your routes
import messageRoutes from './server/routes/messages.js';
import authRoutes from './server/routes/auth.js';
import userRoutes from './server/routes/users.js';
import scheduleRoutes from './server/routes/schedule.js';
import newsRoutes from './server/routes/news.js';

const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/news', newsRoutes);

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




