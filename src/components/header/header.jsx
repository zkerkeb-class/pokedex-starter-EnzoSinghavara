import './Header.css';
import PropTypes from 'prop-types';
import TypeButtons from '../TypesFilter/typesFilter';
// Import des drapeaux
import frFlag from '../../assets/flags/fr.png';
import enFlag from '../../assets/flags/en.png';
import jpFlag from '../../assets/flags/jp.png';
import cnFlag from '../../assets/flags/cn.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaPowerOff, FaCheck, FaTimes } from 'react-icons/fa';
import { MdPowerSettingsNew } from 'react-icons/md';
import { zarbiAlphabet } from '../../assets/zarbi.js';

const imageSets = [
  { value: 'official', label: 'Officiel' },
  { value: 'g5', label: 'Animation Pixel' },
  { value: 'g7', label: 'Animation 3D' },
];

// Nouveau PowerButton texte O/I
function PowerButton({ isLoggedIn, onClick }) {
  const [hover, setHover] = useState(false);
  const bg = isLoggedIn ? (hover ? '#e74c3c' : '#43d13a') : '#fff';
  const border = isLoggedIn ? (hover ? '#b93222' : '#228c1d') : '#bbb';
  const color = isLoggedIn ? '#fff' : '#444';
  const shadow = isLoggedIn ? '0 0 8px 2px #43d13a55' : '0 0 4px 1px #bbb';
  return (
    <button
      onClick={onClick}
      title={isLoggedIn ? 'Déconnexion' : 'Se connecter'}
      style={{
        background: bg,
        border: `3.5px solid ${border}`,
        borderRadius: '50%',
        width: 48,
        height: 48,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: 12,
        marginRight: 0,
        transition: 'background 0.2s, border 0.2s',
        outline: 'none',
        boxShadow: shadow,
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <span style={{
        fontWeight: 'bold',
        fontSize: '2.1rem',
        color,
        fontFamily: 'sans-serif',
        letterSpacing: '2px',
        userSelect: 'none',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>{isLoggedIn ? 'I' : 'O'}</span>
    </button>
  );
}

function ZarbiUsername({ username }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, overflow: 'visible' }}>
      {username.toLowerCase().split('').map((char, i) =>
        zarbiAlphabet[char]
          ? <img key={i} src={zarbiAlphabet[char]} alt={char} style={{ verticalAlign: 'middle', display: 'inline-block', height: 64 }} />
          : <span key={i} style={{ display: 'inline-block', textAlign: 'center', color: '#fff', fontSize: '2.3rem' }}>{char}</span>
      )}
    </span>
  );
}

const Header = ({ currentLanguage, onLanguageChange, onSearch, onTypesChange, availableTypes = [], searchTerm = '', selectedTypes = [], onResetAll, imageSet = 'g7', onImageSetChange, showBottom = true }) => {
  const [selectedImageSet, setSelectedImageSet] = useState(() => localStorage.getItem('imageSet') || imageSet);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
  const isGuest = localStorage.getItem('guest') === '1';
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const [zarbiMode, setZarbiMode] = useState(false);
  const handleLogout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setUsername('User');
      navigate('/login');
    }
  };
  const handleEditUsername = () => {
    setEditing(true);
    setNewUsername(username);
  };
  const handleSaveUsername = async () => {
    if (!/^[A-Za-z]{1,12}$/.test(newUsername)) {
      alert("Le pseudo doit contenir uniquement des lettres (a-z, A-Z), sans espaces ni symboles, 12 max.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/auth/me/username', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username: newUsername })
      });
      const data = await res.json();
      if (res.status === 401 || data.message === 'Token invalide') {
        // Déconnexion automatique
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('User');
        alert('Session expirée, veuillez vous reconnecter.');
        navigate('/login');
        return;
      }
      if (res.ok && data.username) {
        setUsername(data.username);
        localStorage.setItem('username', data.username);
        setEditing(false);
      } else {
        alert(data.message || 'Erreur lors du changement de pseudo');
      }
    } catch (err) {
      alert('Erreur serveur');
    }
  };
  useEffect(() => {
    localStorage.setItem('imageSet', selectedImageSet);
    if (onImageSetChange) onImageSetChange(selectedImageSet);
  }, [selectedImageSet, onImageSetChange]);
  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  const languages = [
    { code: 'english', label: 'EN', flag: enFlag },
    { code: 'japanese', label: 'JP', flag: jpFlag },
    { code: 'chinese', label: 'CN', flag: cnFlag },
    { code: 'french', label: 'FR', flag: frFlag }
  ];

  const searchPlaceholder = {
    'english': 'Search a Pokemon',
    'japanese': 'ポケモンを検索',
    'chinese': '搜索宝可梦',
    'french': 'Rechercher un Pokémon'
  };

  const titleText = {
    'french': 'Pokédex',
    'english': 'Pokedex',
    'japanese': 'ポケモン図鑑',
    'chinese': '宝可梦图鉴'
  }[currentLanguage] || 'Pokédex';

  return (
    <header className="header">
      <div className="header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div className="title-section" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: 8 }}>{titleText}</h1>
          <PowerButton isLoggedIn={isLoggedIn} onClick={handleLogout} />
        </div>
        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {editing ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="text"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                maxLength={12}
                pattern="[A-Za-z]{1,12}"
                style={{ fontSize: '2.3rem', color: '#fff', fontWeight: 'bold', width: '140px', marginRight: 8, background: 'transparent', border: '1.5px solid #43d13a', borderRadius: 6, padding: '2px 8px', textAlign: 'center' }}
              />
              <button onClick={handleSaveUsername} title="Valider" style={{ background: 'none', border: 'none', color: '#43d13a', fontSize: '1.7rem', marginRight: 2, cursor: 'pointer' }}>
                <FaCheck />
              </button>
              <button onClick={() => setEditing(false)} title="Annuler" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.7rem', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="user-section">
              <span className="user-name" style={{ fontSize: '2.3rem', color: '#fff', fontWeight: 'bold', fontFamily: 'inherit' }}>
                {zarbiMode ? <ZarbiUsername username={username} /> : username}
              </span>
            </div>
          )}
        </div>
        <div className="header-actions" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div className="language-section" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isLoggedIn && !editing && (
              <button onClick={handleEditUsername} title="Modifier le pseudo" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem', marginRight: 8 }}>
                <FaPencilAlt />
              </button>
            )}
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`language-button ${currentLanguage === lang.code ? 'active' : ''}`}
                title={lang.label}
              >
                <img 
                  src={lang.flag} 
                  alt={lang.label}
                  className="flag-icon"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {showBottom && (
        <div className="header-bottom">
          <div className="search-row-centered">
            <div className="search-center-group">
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  placeholder={searchPlaceholder[currentLanguage]}
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  className="search-input"
                  style={{ width: '350px' }}
                />
                {searchTerm && (
                  <button className="clear-search-btn" onClick={() => onSearch('')} title="Effacer la recherche">×</button>
                )}
              </div>
              <button 
                className={`reset-filters-btn ${selectedTypes.length > 0 ? 'active' : ''}`}
                onClick={() => onTypesChange([])}
                title="Réinitialiser les filtres de type"
                disabled={selectedTypes.length === 0}
              >
                ↺
              </button>
            </div>
          </div>
          <TypeButtons 
            currentLanguage={currentLanguage}
            onTypesChange={onTypesChange}
            availableTypes={availableTypes}
            selectedTypes={selectedTypes}
          />
          <div className="image-set-select-bottom-wrapper">
            <select
              className="image-set-select"
              value={selectedImageSet}
              onChange={e => setSelectedImageSet(e.target.value)}
              style={{ height: '32px', borderRadius: '6px', fontWeight: 'bold', minWidth: '160px' }}
              title="Choisir le style d'image des Pokémon"
            >
              {imageSets.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Bouton Gestion des Pokémon */}
          {isLoggedIn && !isGuest && (
            <button
              style={{
                position: 'absolute',
                right: 32,
                bottom: 18,
                zIndex: 100,
                background: '#232323',
                color: '#fff',
                border: '2px solid #43d13a',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                padding: '10px 22px',
                boxShadow: '0 2px 12px 2px #000a',
                cursor: 'pointer',
                transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
              }}
              onClick={() => navigate('/admin/pokemon')}
              onMouseOver={e => {
                e.currentTarget.style.background = '#181818';
                e.currentTarget.style.border = '2px solid #43d13a';
                e.currentTarget.style.boxShadow = '0 4px 24px 4px #43d13a33';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#232323';
                e.currentTarget.style.border = '2px solid #43d13a';
                e.currentTarget.style.boxShadow = '0 2px 12px 2px #000a';
              }}
            >
              Gestion des Pokémon
            </button>
          )}
        </div>
      )}
      <button
        className="zarbi-toggle-btn"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: 'rgba(30,30,30,0.92)',
          border: '2.5px solid #232323',
          borderRadius: '16px',
          boxShadow: '0 2px 16px 2px #000a',
          cursor: 'pointer',
          padding: 0,
          width: 72,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = '#181818';
          e.currentTarget.style.border = '2.5px solid #43d13a';
          e.currentTarget.style.boxShadow = '0 4px 24px 4px #43d13a33';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(30,30,30,0.92)';
          e.currentTarget.style.border = '2.5px solid #232323';
          e.currentTarget.style.boxShadow = '0 2px 16px 2px #000a';
        }}
        onClick={() => setZarbiMode(z => !z)}
        title="Afficher le pseudo en Zarbi !"
      >
        <img src={zarbiAlphabet['zarbi']} alt="Zarbi" style={{ width: 56, height: 56 }} />
      </button>
    </header>
  );
};

Header.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onTypesChange: PropTypes.func.isRequired,
  availableTypes: PropTypes.arrayOf(PropTypes.string),
  searchTerm: PropTypes.string,
  selectedTypes: PropTypes.arrayOf(PropTypes.string),
  onResetAll: PropTypes.func.isRequired,
  imageSet: PropTypes.string,
  onImageSetChange: PropTypes.func,
  showBottom: PropTypes.bool,
};

export default Header;
