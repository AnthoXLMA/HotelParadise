const express = require('express');
const router = express.Router();
const ConciergeRequest = require('../models/ConciergeRequest');

router.post('/request', async (req, res) => {
  try {
    const { clientId, requestType, description } = req.body;

    const request = new ConciergeRequest({ clientId, requestType, description });
    await request.save();

    res.status(201).json({ message: 'Demande conciergerie créée', request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
