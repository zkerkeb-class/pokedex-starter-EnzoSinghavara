import { useState } from 'react';
import PropTypes from 'prop-types';
import './typesFilter.css';
import { getTypeIcon, typeNames } from '../../assets/typeIcons';

const typeKeys = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying',
  'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const typeLabels = {
  french: {
    normal: 'NORMAL', fire: 'FEU', water: 'EAU', electric: 'ÉLECTRIK', grass: 'PLANTE', ice: 'GLACE',
    fighting: 'COMBAT', poison: 'POISON', ground: 'SOL', flying: 'VOL', psychic: 'PSY', bug: 'INSECTE',
    rock: 'ROCHE', ghost: 'SPECTRE', dragon: 'DRAGON', dark: 'TÉNÈBRES', steel: 'ACIER', fairy: 'FÉE'
  },
  english: {
    normal: 'NORMAL', fire: 'FIRE', water: 'WATER', electric: 'ELECTRIC', grass: 'GRASS', ice: 'ICE',
    fighting: 'FIGHTING', poison: 'POISON', ground: 'GROUND', flying: 'FLYING', psychic: 'PSYCHIC', bug: 'BUG',
    rock: 'ROCK', ghost: 'GHOST', dragon: 'DRAGON', dark: 'DARK', steel: 'STEEL', fairy: 'FAIRY'
  },
  japanese: {
    normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき', grass: 'くさ', ice: 'こおり',
    fighting: 'かくとう', poison: 'どく', ground: 'じめん', flying: 'ひこう', psychic: 'エスパー', bug: 'むし',
    rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく', steel: 'はがね', fairy: 'フェアリー'
  },
  chinese: {
    normal: '一般', fire: '火', water: '水', electric: '电', grass: '草', ice: '冰',
    fighting: '格斗', poison: '毒', ground: '地面', flying: '飞行', psychic: '超能力', bug: '虫',
    rock: '岩石', ghost: '幽灵', dragon: '龙', dark: '恶', steel: '钢', fairy: '妖精'
  }
};

const TypeButtons = ({ currentLanguage, onTypesChange, availableTypes = [], selectedTypes = [] }) => {
    const [limitMsg, setLimitMsg] = useState('');
    // On utilise typeKeys comme source universelle
    let typesToUse = [...typeKeys];
    // Tri alphabétique selon le label affiché
    typesToUse.sort((a, b) => (typeLabels[currentLanguage][a] || '').localeCompare(typeLabels[currentLanguage][b] || '', currentLanguage));

    const limitMsgText = {
        'french': 'Vous ne pouvez sélectionner que 2 types maximum.',
        'english': 'You can select up to 2 types only.',
        'japanese': 'タイプは最大2つまで選択できます。',
        'chinese': '最多只能选择2种属性。'
    };

    const handleTypeClick = (typeKey) => {
        const newSelectedTypes = new Set(selectedTypes);
        if (newSelectedTypes.has(typeKey)) {
            newSelectedTypes.delete(typeKey);
            onTypesChange(Array.from(newSelectedTypes));
        } else {
            if (selectedTypes.length >= 2) {
                setLimitMsg(limitMsgText[currentLanguage] || limitMsgText['english']);
                setTimeout(() => setLimitMsg(''), 2000);
                return;
            }
            newSelectedTypes.add(typeKey);
            onTypesChange(Array.from(newSelectedTypes));
        }
    };

    return (
        <div className="type-filters-img-row">
            <div className="type-img-buttons-container">
                {typesToUse.map((typeKey) => (
                    <button
                        key={typeKey}
                        className={`type-img-filter-btn ${selectedTypes.includes(typeKey) ? 'selected' : ''}`}
                        onClick={() => handleTypeClick(typeKey)}
                        title={typeNames[currentLanguage][typeKey.toUpperCase()]}
                    >
                        <img
                            src={getTypeIcon(typeKey.toUpperCase(), currentLanguage)}
                            alt={typeNames[currentLanguage][typeKey.toUpperCase()]}
                            className="type-img-filter"
                        />
                    </button>
                ))}
            </div>
            {limitMsg && <div className="type-limit-msg">{limitMsg}</div>}
        </div>
    );
};

TypeButtons.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onTypesChange: PropTypes.func.isRequired,
    availableTypes: PropTypes.arrayOf(PropTypes.string),
    selectedTypes: PropTypes.arrayOf(PropTypes.string)
};

export default TypeButtons; 