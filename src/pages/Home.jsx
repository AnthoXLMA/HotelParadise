import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home({ client }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleCheckIn = () => navigate("/checkin");
  const handleDashboard = () => navigate("/hotelier/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-2">Bienvenue à l’Hôtel Riviera</h1>

        {role === "client" && client ? (
          <>
            <p className="text-gray-600 mb-4">
              Bonjour {client.name} 👋<br />
              Votre séjour : <strong>{client.dates}</strong><br />
              Chambre : <strong>{client.room}</strong>
            </p>

            <div className="space-y-3">
              <button onClick={handleCheckIn} className="btn-primary">
                🛎️ Commencer le check-in
              </button>
              <button onClick={() => navigate("/services")} className="btn-secondary">
                📋 Faire une demande
              </button>
              <button onClick={() => navigate("/infos")} className="btn-secondary">
                ℹ️ Infos pratiques
              </button>
              <button onClick={() => navigate("/services/history")} className="btn-secondary">
                📜 Historique des demandes
              </button>
            </div>
          </>
        ) : role === "hotelier" ? (
          <>
            <p className="text-gray-600 mb-4">
              Connecté en tant qu’<strong>hôtelier</strong>.
            </p>
            <button onClick={handleDashboard} className="btn-primary">
              📊 Tableau de bord hôtelier
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Veuillez vous identifier pour continuer.
            </p>
            <div className="space-y-3">
              <button onClick={() => navigate("/login")} className="btn-primary">
                🔑 Connexion client
              </button>
              <button onClick={() => navigate("/hotelier/login")} className="btn-secondary">
                🧑‍💼 Connexion hôtelier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
