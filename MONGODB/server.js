import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';

connectDb();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

dotenv.config();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});