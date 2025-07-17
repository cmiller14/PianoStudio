import express from 'express';
import cors from 'cors';
import messageRoutes from './server/routes/messages.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use('/api/messages', messageRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

