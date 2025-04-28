import './Header.css';
import PropTypes from 'prop-types';
import TypeButtons from '../TypesFilter/typesFilter';
// Import des drapeaux
import frFlag from '../../assets/flags/fr.png';
import enFlag from '../../assets/flags/en.png';
import jpFlag from '../../assets/flags/jp.png';
import cnFlag from '../../assets/flags/cn.png';
import { useState, useEffect } from 'react';

const imageSets = [
  { value: 'official', label: 'Officiel' },
  { value: 'g5', label: 'Animation Pixel' },
  { value: 'g7', label: 'Animation 3D' },
];

const Header = ({ currentLanguage, onLanguageChange, onSearch, onTypesChange, availableTypes = [], searchTerm = '', selectedTypes = [], onResetAll, imageSet = 'g7', onImageSetChange, showBottom = true }) => {
  const [selectedImageSet, setSelectedImageSet] = useState(() => localStorage.getItem('imageSet') || imageSet);
  useEffect(() => {
    localStorage.setItem('imageSet', selectedImageSet);
    if (onImageSetChange) onImageSetChange(selectedImageSet);
  }, [selectedImageSet, onImageSetChange]);

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
      <div className="header-top">
        <div className="title-section">
          <h1>{titleText}</h1>
        </div>
        <div className="user-section">
          <span className="user-name">User</span>
        </div>
        <div className="language-section">
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
        </div>
      )}
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
