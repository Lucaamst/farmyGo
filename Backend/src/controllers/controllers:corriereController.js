import { Consegna } from '../models/index.js';
import { sendNotification } from '../services/notifier.js';

// Recupera tutte le consegne del corriere
export const getConsegne = async (req, res) => {
  try {
    const consegne = await Consegna.findAll();
    res.json(consegne);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nel recupero consegne' });
  }
};

// Segna una consegna come completata
export const segnaConsegnata = async (req, res) => {
  try {
    const { id } = req.params;
    const consegna = await Consegna.findByPk(id);
    if (!consegna) return res.status(404).json({ error: 'Consegna non trovata' });

    consegna.stato = 'consegnata';
    await consegna.save();

    // Notifica cliente
    await sendNotification('sms', 'Il tuo pacco è stato consegnato!');

    // Dopo 10 minuti cancelliamo dati sensibili
    setTimeout(async () => {
      consegna.indirizzo = 'Cancellato per privacy';
      await consegna.save();
    }, 10 * 60 * 1000);

    res.json({ message: 'Consegna aggiornata e cliente notificato' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore aggiornamento consegna' });
  }
};