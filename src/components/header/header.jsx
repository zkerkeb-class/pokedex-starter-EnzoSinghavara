import './header.css';
import PropTypes from 'prop-types';

const Header = ({ currentLanguage, onLanguageChange }) => {
    const languages = [
        { code: 'english', label: 'English' },
        { code: 'japanese', label: '日本語' },
        { code: 'chinese', label: '中文' },
        { code: 'french', label: 'Français' }
    ];

    return (
        <header className="header">
            <div className="header-content">
                <h1>Pokédex</h1>
                <div className="language-selector">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => onLanguageChange(lang.code)}
                            className={`language-button ${currentLanguage === lang.code ? 'active' : ''}`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired
};

export default Header;