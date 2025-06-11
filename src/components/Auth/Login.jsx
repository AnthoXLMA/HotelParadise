// src/components/Auth/Login.jsx
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    // après res.ok
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('client', JSON.stringify(data.client));
      setMessage('Connexion réussie ✅');
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="p-4">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">Se connecter</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
