const express = require('express');
const router = express.Router();
const HotelInfo = require('../models/HotelInfo');

router.get('/', async (req, res) => {
  try {
    const info = await HotelInfo.findOne();
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
