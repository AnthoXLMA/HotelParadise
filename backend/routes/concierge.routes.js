import express from 'express';
import ConciergeRequest from '../models/ConciergeRequest.js';

const router = express.Router();

router.post("/request", async (req, res) => {
  const { service, details, clientId } = req.body;
  if (!service || !details || !clientId) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const newRequest = new ConciergeRequest({
    client: clientId,
    service,
    details,
    status: "En attente",
    createdAt: new Date(),
  });

  await newRequest.save();
  res.status(200).json({ message: "Demande enregistrée" });
});

router.get("/history/:clientId", async (req, res) => {
  try {
    const requests = await ConciergeRequest.find({ client: req.params.clientId })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Liste complète pour l'admin
router.get("/admin/requests", async (req, res) => {
  try {
    const requests = await ConciergeRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Mise à jour du statut
router.put("/admin/update/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const request = await ConciergeRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

export default router;
