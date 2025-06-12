import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function RequestDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await api.get("/concierge/admin/requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Erreur de chargement des requêtes", err);
      }
    };

    fetchAllRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/concierge/admin/update/${id}`, { status: newStatus });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Erreur de mise à jour", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">📋 Demandes Client – Admin</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">Aucune demande enregistrée.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((r) => (
            <li key={r._id} className="p-4 border rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{r.service.toUpperCase()}</p>
                  <p className="text-sm text-gray-700 mt-1">Client ID : {r.client}</p>
                  <p className="text-sm mt-1">📝 {r.details}</p>
                </div>
                <div className="text-sm space-x-2">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="En attente">⏳ En attente</option>
                    <option value="Validée">✅ Validée</option>
                    <option value="Refusée">❌ Refusée</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
