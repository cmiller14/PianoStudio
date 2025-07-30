import express from 'express';
import cors from 'cors';
import messageRoutes from './server/routes/messages.js';
import authRoutes from './server/routes/auth.js';
import userRoutes from './server/routes/users.js';
import scheduleRoutes from './server/routes/schedule.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

