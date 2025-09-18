import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './models/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('Backend consegne funzionante!');
});

// Sincronizza il DB (crea le tabelle dai modelli)
sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Database sincronizzato");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server avviato sulla porta ${PORT}`);
});

export default app;
