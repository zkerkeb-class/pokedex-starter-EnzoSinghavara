import './header.css';
import PropTypes from 'prop-types';
import TypeButtons from '../typesFilter/typesFilter';
// Import des drapeaux
import frFlag from '../../assets/flags/fr.png';
import enFlag from '../../assets/flags/en.png';
import jpFlag from '../../assets/flags/jp.png';
import cnFlag from '../../assets/flags/cn.png';
import { useState } from 'react';

const Header = ({ currentLanguage, onLanguageChange, onSearch, onTypesChange }) => {
    const [showBorders, setShowBorders] = useState(false);

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

    return (
        <header className={`header ${showBorders ? 'show-borders' : ''}`}>
            <div className="debug-button-container">
                <button 
                    className="debug-button"
                    onClick={() => setShowBorders(!showBorders)}
                >
                    {showBorders ? '🔴' : '🟢'}
                </button>
            </div>
            
            {/* Section supérieure du header divisée en 3 colonnes */}
            <div className="header-top">
                {/* Colonne 1: Titre (ratio 1) */}
                <div className="title-section">
                    <h1>Pokédex</h1>
                </div>
                
                {/* Colonne 2: Barre de recherche (ratio 2) */}
                <div className="search-section">
                    <input 
                        type="text" 
                        placeholder={searchPlaceholder[currentLanguage]}
                        onChange={(e) => onSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Colonne 3: Boutons de langue (ratio 1) */}
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

            {/* Section inférieure pour les boutons de type */}
            <div className="header-bottom">
                <TypeButtons 
                    currentLanguage={currentLanguage}
                    onTypesChange={onTypesChange}
                />
            </div>
        </header>
    );
};

Header.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onTypesChange: PropTypes.func.isRequired
};

export default Header;