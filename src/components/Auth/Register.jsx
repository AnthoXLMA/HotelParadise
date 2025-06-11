// src/components/Auth/Register.jsx
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Inscription réussie 🎉');
    } else {
      setMessage(data.message || 'Erreur');
    }
  };

  return (
    <div className="p-4">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">S’inscrire</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
