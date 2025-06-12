import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const HotelierDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/hotelier/me");
        setProfile(response.data);
      } catch (err) {
        console.error(err);
        setError("Accès refusé. Veuillez vous reconnecter.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Chargement...</p>;

  return (
    <div className="container">
      <h1>Bienvenue {profile.name}</h1>
      <p><strong>Email :</strong> {profile.email}</p>
      <p><strong>Nom de l'hôtel :</strong> {profile.hotelName || "Non défini"}</p>
    </div>
  );
};

export default HotelierDashboard;
