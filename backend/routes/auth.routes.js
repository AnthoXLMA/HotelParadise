import express from 'express';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js'; // extension .js obligatoire en ESM

const router = express.Router();

// Middleware pour vérifier le token JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Accès refusé : token manquant' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Accès refusé : token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ajouter les infos du token à la requête
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

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

// PROFILE (exemple de route protégée)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-password');
    if (!client) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
