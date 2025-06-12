import { useState } from "react";
import api from "../services/api";

const serviceOptions = [
  { value: "taxi", label: "🚖 Commande de taxi" },
  { value: "restaurant", label: "🍽️ Réservation de restaurant" },
  { value: "room", label: "🛏️ Demande en chambre" },
  { value: "wake", label: "⏰ Réveil matin" },
  { value: "flowers", label: "💐 Bouquet de fleurs" },
  { value: "bien-être", label: "Soins & Massages" },
];

export default function ConciergeServices() {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const client = JSON.parse(localStorage.getItem("client")); // ou via contexte
      const res = await api.post("/concierge/request", {
        service: selectedService,
        details,
        clientId: client._id,
      });

      if (res.status === 200) {
        setSuccess("✅ Demande envoyée à la conciergerie !");
        setDetails("");
        setSelectedService("");
      }
    } catch (err) {
      console.error(err);
      setSuccess("❌ Une erreur est survenue");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">🛎️ Services de Conciergerie</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">-- Choisissez un service --</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <textarea
          className="w-full border p-2 rounded"
          rows="4"
          placeholder="Détails de la demande (heure, préférences, etc.)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Envoyer la demande
        </button>
      </form>

      {success && (
        <div className="mt-4 text-center text-green-600 font-medium">{success}</div>
      )}
    </div>
  );
}
