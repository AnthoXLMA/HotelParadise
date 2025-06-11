// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Crée l'app en premier
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Connexion MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelparadise';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB:', err));

// Import des routes
const clientRoutes = require('./routes/client.routes');
const hotelInfoRoutes = require('./routes/hotelInfo.routes');
const conciergeRoutes = require('./routes/concierge.routes');

// Utilisation des routes
app.use('/api/clients', require('./routes/client.routes'));
app.use('/api/hotel-info', hotelInfoRoutes);
app.use('/api/concierge', conciergeRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('HotelParadise API backend is running 🚀');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
