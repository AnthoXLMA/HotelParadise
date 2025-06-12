import express from 'express';
import CheckIn from '../models/CheckIn.js';  // Note le .js et la casse exacte

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Client route is active ✅');
});

// POST /api/clients/checkin
router.post('/checkin', async (req, res) => {
  const { name, surname, email, bookingNumber } = req.body;

  if (!name || !surname || !email || !bookingNumber) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const newCheckIn = new CheckIn({ name, surname, email, bookingNumber });
    await newCheckIn.save();
    res.status(201).json({ message: 'Check-in enregistré avec succès ✅' });
  } catch (err) {
    console.error('Erreur lors du check-in :', err);
    res.status(500).json({ message: 'Erreur serveur lors du check-in.' });
  }
});

export default router;
