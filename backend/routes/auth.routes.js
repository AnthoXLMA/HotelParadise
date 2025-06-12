import express from 'express';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js'; // extension .js obligatoire en ESM

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Client.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const newClient = new Client({ name, email, password });
    await newClient.save();

    res.status(201).json({ message: 'Compte créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ email });
    if (!client || !(await client.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      client: { id: client._id, name: client.name, email: client.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
