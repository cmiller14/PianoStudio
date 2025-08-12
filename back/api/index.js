import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

// Import your routes
import messageRoutes from '../server/routes/messages.js';
import authRoutes from '../server/routes/auth.js';
import userRoutes from '../server/routes/users.js';
import scheduleRoutes from '../server/routes/schedule.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);

// Export for Vercel
export const handler = serverless(app);


