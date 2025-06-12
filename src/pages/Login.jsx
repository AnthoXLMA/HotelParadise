// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ton instance axios

export default function Login() {
  const [email, setEmail] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/clients/login", {
        email,
        bookingNumber,
      });

      if (res.status === 200) {
        // Tu peux stocker les infos client en localStorage ou context
        localStorage.setItem("client", JSON.stringify(res.data));
        navigate("/home");
      } else {
        alert("🔒 Identifiants incorrects");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur ou réseau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Connexion client</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          placeholder="N° de réservation"
          value={bookingNumber}
          onChange={(e) => setBookingNumber(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          🔐 Se connecter
        </button>
      </form>
    </div>
  );
}
