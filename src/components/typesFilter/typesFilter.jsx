import { useState } from 'react';
import PropTypes from 'prop-types';
import './typesFilter.css';
import { getTypeIcon } from '../../assets/imageLibrary';

const TypeButtons = ({ currentLanguage, onTypesChange }) => {
    const [selectedTypes, setSelectedTypes] = useState(new Set());

    // Types exactement comme dans pokemons.js
    const typesByLanguage = {
        'english': ['GRASS', 'POISON', 'FIRE', 'FLYING', 'WATER', 'BUG', 'NORMAL', 'ELECTRIC', 
                   'GROUND', 'FAIRY', 'FIGHTING', 'PSYCHIC', 'ROCK', 'STEEL', 'ICE', 'GHOST', 
                   'DRAGON', 'DARK'],
        'french': ['PLANTE', 'POISON', 'FEU', 'VOL', 'EAU', 'INSECTE', 'NORMAL', 'ÉLECTRIK',
                  'SOL', 'FÉE', 'COMBAT', 'PSY', 'ROCHE', 'ACIER', 'GLACE', 'SPECTRE',
                  'DRAGON', 'TÉNÈBRES'],
        'japanese': ['くさ', 'どく', 'ほのお', 'ひこう', 'みず', 'むし', 'ノーマル', 'でんき',
                    'じめん', 'フェアリー', 'かくとう', 'エスパー', 'いわ', 'はがね', 'こおり', 'ゴースト',
                    'ドラゴン', 'あく'],
        'chinese': ['草', '毒', '火', '飞行', '水', '虫', '一般', '电',
                   '地面', '妖精', '格斗', '超能力', '岩石', '钢', '冰', '幽灵',
                   '龙', '恶']
    };

    const handleTypeClick = (type) => {
        const newSelectedTypes = new Set(selectedTypes);
        if (newSelectedTypes.has(type)) {
            newSelectedTypes.delete(type);
        } else {
            newSelectedTypes.add(type);
        }
        setSelectedTypes(newSelectedTypes);
        onTypesChange(Array.from(newSelectedTypes));
    };

    return (
        <div className="type-filters">
            <div className="type-buttons-container">
                {typesByLanguage[currentLanguage].map((type) => (
                    <button
                        key={type}
                        className={`type-button ${selectedTypes.has(type) ? 'selected' : ''}`}
                        onClick={() => handleTypeClick(type)}
                        title={type}
                    >
                        <img 
                            src={getTypeIcon(type, currentLanguage)}
                            alt={type}
                            className="type-icon"
                        />
                    </button>
                ))}
            </div>
            <button 
                className={`reset-button ${selectedTypes.size > 0 ? 'active' : ''}`}
                onClick={() => {
                    setSelectedTypes(new Set());
                    onTypesChange([]);
                }}
            >
                ↺ Reset Filters
            </button>
        </div>
    );
};

TypeButtons.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onTypesChange: PropTypes.func.isRequired
};

export default TypeButtons; 