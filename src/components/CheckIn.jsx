import React, { useState } from 'react';

function CheckIn() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reservationNumber: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/clients/checkin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if(response.ok) {
        setMessage('Check-in effectué avec succès !');
        setFormData({firstName: '', lastName: '', email: '', reservationNumber: ''});
      } else {
        setMessage(data.message || 'Erreur lors du check-in.');
      }
    } catch (error) {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div>
      <h2>Check-in à distance</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="reservationNumber"
          value={formData.reservationNumber}
          onChange={handleChange}
          placeholder="N° Réservation"
          required
        />
        <button type="submit">Valider</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckIn;
