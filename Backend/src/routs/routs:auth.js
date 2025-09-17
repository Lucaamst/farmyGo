import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const router = express.Router();

// Login utente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Utente non trovato' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Password errata' });

    const token = jwt.sign(
      { id: user.id, ruolo: user.ruolo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, ruolo: user.ruolo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore login' });
  }
});

export default router;