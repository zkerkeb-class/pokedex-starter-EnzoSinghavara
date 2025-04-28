import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        if (data.username) localStorage.setItem('username', data.username);
        else localStorage.removeItem('username');
        localStorage.removeItem('guest');
        navigate('/');
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      setError('Erreur serveur');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="text"
          placeholder="Email ou pseudo"
          value={emailOrUsername}
          onChange={e => setEmailOrUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Se connecter</button>
        <div style={{textAlign:'center',marginTop:'0.7rem'}}>
          <a href="/register" style={{color:'#43d13a',textDecoration:'underline',fontSize:'0.98rem'}}>Créer un compte</a>
        </div>
        <button type="button" style={{marginTop:'1.2rem',background:'#23262b',color:'#43d13a',border:'1.5px solid #43d13a',borderRadius:'8px',padding:'0.7rem 0',fontWeight:'bold',fontSize:'1rem',width:'100%',cursor:'pointer'}} onClick={()=>{
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.setItem('guest', '1');
          window.location.href='/';
        }}>Continuer en tant qu'invité</button>
      </form>
    </div>
  );
} 