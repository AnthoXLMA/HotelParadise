import { useEffect, useState } from "react";
import api from "../services/api";

export default function RequestHistory() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const client = JSON.parse(localStorage.getItem("client"));
        const res = await api.get(`/concierge/history/${client._id}`);
        setRequests(res.data);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">📜 Historique des demandes</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600 text-center">Aucune demande pour l’instant.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded bg-gray-50">
              <p className="font-medium">{req.service.toUpperCase()}</p>
              <p className="text-sm text-gray-700 mt-1">Détails : {req.details}</p>
              <p className="text-sm text-gray-500 mt-1">
                Statut :{" "}
                <span
                  className={
                    req.status === "En attente"
                      ? "text-yellow-600"
                      : req.status === "Validée"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {req.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
