import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!/^[A-Za-z]{1,12}$/.test(username)) {
      setError("Le pseudo doit contenir uniquement 12 lettres max, sans espaces ni symboles.");
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Compte créé ! Vous pouvez vous connecter.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Erreur lors de la création du compte');
      }
    } catch (err) {
      setError('Erreur serveur');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pseudo (12 lettres maximum)"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          maxLength={12}
          pattern="[A-Za-z]{1,12}"
        />
        {error && <div className="login-error">{error}</div>}
        {success && <div style={{color:'#43d13a',textAlign:'center'}}>{success}</div>}
        <button type="submit">Créer le compte</button>
        <div style={{textAlign:'center',marginTop:'0.7rem'}}>
          <a href="/login" style={{color:'#43d13a',textDecoration:'underline',fontSize:'0.98rem'}}>Se connecter</a>
        </div>
      </form>
    </div>
  );
} 