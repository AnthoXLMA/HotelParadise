import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.middleware.js';
import Hotelier from '../models/Hotelier.js';


const router = express.Router();

// REGISTER hotelier
router.post('/register', async (req, res) => {
  try {
    const { name, hotelName, email, password } = req.body;
    const existing = await Hotelier.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const newHotelier = new Hotelier({ name, hotelName, email, password });
    await newHotelier.save();

    res.status(201).json({ message: 'Compte hôtelier créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// LOGIN hotelier
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hotelier = await Hotelier.findOne({ email });
  if (!hotelier || !(await hotelier.comparePassword(password))) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = jwt.sign({ id: hotelier._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, hotelier: { id: hotelier._id, name: hotelier.name, email: hotelier.email } });
});


// Profil sécurisé de l’hôtelier connecté
router.get('/me', verifyToken, async (req, res) => {
  try {
    const hotelier = await Hotelier.findById(req.user.id).select('-password');
    if (!hotelier) return res.status(404).json({ message: 'Hôtelier non trouvé' });
    res.json(hotelier);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
