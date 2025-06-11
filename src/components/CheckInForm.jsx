// src/components/CheckInForm.jsx
import { useState } from 'react';

export default function CheckInForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    bookingNumber: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remplace l'URL par l'endpoint réel côté backend si dispo
    try {
      const res = await fetch('http://localhost:5000/api/clients/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Check-in effectué !');
        setFormData({ name: '', surname: '', email: '', bookingNumber: '' });
      } else {
        alert('❌ Erreur : ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Erreur réseau');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Check-in en ligne</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Prénom"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Nom"
          value={formData.surname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="bookingNumber"
          placeholder="N° de réservation"
          value={formData.bookingNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Valider le check-in
        </button>
      </form>
    </div>
  );
}
