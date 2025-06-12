import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
import hotelInfoRoutes from './routes/hotelInfo.routes.js';
import conciergeRoutes from './routes/concierge.routes.js';
import hotelierRoutes from './routes/hotelier.routes.js';


dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5001', 'https://app.hotel-conciergerie.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware pour attraper erreur CORS et répondre 403
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Accès refusé par la politique CORS' });
  }
  next(err);
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/hotel-info', hotelInfoRoutes);
app.use('/api/hotel', hotelInfoRoutes);
app.use('/api/concierge', conciergeRoutes);
app.use('/api/hotelier', hotelierRoutes);


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelparadise';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur de connexion à MongoDB:', err));

app.get('/', (req, res) => {
  res.send('HotelParadise API backend is running 🚀');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
