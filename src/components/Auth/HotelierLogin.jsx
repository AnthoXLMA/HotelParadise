import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

export default function HotelierLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("/hotelier/login", { email, password });
      const { token, hotelier } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", "hotelier");
      localStorage.setItem("hotelierName", hotelier.name);

      navigate("/hotelier/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion Hôtelier</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
