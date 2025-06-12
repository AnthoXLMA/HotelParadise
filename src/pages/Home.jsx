import { useNavigate } from "react-router-dom";

export default function Home({ client }) {
  const navigate = useNavigate();

  const handleCheckIn = () => {
    navigate("/checkin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-2">Bienvenue à l’Hôtel Riviera</h1>
        {client ? (
          <>
            <p className="text-gray-600 mb-4">
              Bonjour {client.name} 👋<br />
              Votre séjour : <strong>{client.dates}</strong><br />
              Chambre : <strong>{client.room}</strong>
            </p>
          </>
        ) : (
          <p className="text-gray-600 mb-4">
            Veuillez vous identifier pour afficher votre réservation.
          </p>
        )}

        <div className="space-y-3">
          <button
            onClick={handleCheckIn}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            🛎️ Commencer le check-in
          </button>
          <button
            onClick={() => navigate("/services")}
            className="w-full bg-white border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-50"
          >
            📋 Faire une demande
          </button>
          <button
            onClick={() => navigate("/infos")}
            className="w-full bg-white border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-50"
          >
            ℹ️ Infos pratiques
          </button>
          <button
            onClick={() => navigate("/services/history")}
            className="w-full bg-white border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-50"
          >
            📜 Historique des demandes
          </button>
        </div>
      </div>
    </div>
  );
}
