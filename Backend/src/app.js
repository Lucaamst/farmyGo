import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import corriereRoutes from './routes/corriere.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotte
app.use('/auth', authRoutes);
app.use('/corriere', corriereRoutes);

export default app;