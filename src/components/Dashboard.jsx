// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const stored = localStorage.getItem('client');
      if (stored) {
        setClient(JSON.parse(stored));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tableau de bord</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Déconnexion
        </button>
      </div>

      {client ? (
        <div>
          <p>Bienvenue, {client.name} 👋</p>
          <p>Email : {client.email}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
