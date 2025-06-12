import { useEffect, useState } from "react";
import api from "../services/api";

export default function PracticalInfo() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await api.get("/hotel");
        setSections(res.data);
      } catch (err) {
        console.error("Erreur chargement infos pratiques", err);
      }
    };

    fetchInfo();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">ℹ️ Informations Pratiques</h1>

      <div className="space-y-6 text-gray-800">
        <section>
          <h2 className="text-xl font-semibold mb-2">🕒 Horaires</h2>
          <ul className="list-disc pl-6">
            <li>Check-in : à partir de 15h</li>
            <li>Check-out : avant 11h</li>
            <li>Réception ouverte 24h/24</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📶 Wi-Fi</h2>
          <ul className="list-disc pl-6">
            <li>Nom du réseau : <strong>HotelParadise</strong></li>
            <li>Mot de passe : <strong>paradise2025</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🛎️ Services</h2>
          <ul className="list-disc pl-6">
            <li>Room Service : disponible de 6h à 23h</li>
            <li>Spa & Sauna : 9h – 20h (réservation via la conciergerie)</li>
            <li>Navette aéroport gratuite sur demande</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📞 Numéros utiles</h2>
          <ul className="list-disc pl-6">
            <li>Réception : 9</li>
            <li>Conciergerie : 7</li>
            <li>Urgence médicale : 112</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
