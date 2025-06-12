import express from 'express';
import HotelInfo from '../models/HotelInfo.js';

const router = express.Router();

// GET – récupérer toutes les infos
router.get("/", async (req, res) => {
  try {
    const infos = await HotelInfo.find();
    res.json(infos);
  } catch (err) {
    console.error("Erreur lors de la récupération des infos :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET – récupérer une info spécifique (par ID)
router.get("/:id", async (req, res) => {
  try {
    const info = await HotelInfo.findById(req.params.id);
    if (!info) return res.status(404).json({ message: "Info introuvable" });
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST – créer une nouvelle info (admin)
router.post("/", async (req, res) => {
  try {
    const newInfo = new HotelInfo(req.body);
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (err) {
    console.error("Erreur lors de la création :", err);
    res.status(400).json({ message: "Données invalides" });
  }
});

// PUT – mettre à jour une info existante
router.put("/:id", async (req, res) => {
  try {
    const updated = await HotelInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Info non trouvée" });
    res.json(updated);
  } catch (err) {
    console.error("Erreur de mise à jour :", err);
    res.status(400).json({ message: "Erreur de mise à jour" });
  }
});

// DELETE – supprimer une info
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await HotelInfo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Info non trouvée" });
    res.json({ message: "Supprimé" });
  } catch (err) {
    console.error("Erreur de suppression :", err);
    res.status(400).json({ message: "Erreur de suppression" });
  }
});

export default router;
