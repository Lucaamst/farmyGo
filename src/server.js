import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('Backend consegne funzionante!');
});

// Modelli caricati
try {
  console.log("Modelli caricati:", db);
} catch (err) {
  console.error("Errore caricamento modelli:", err);
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});

export default app;
