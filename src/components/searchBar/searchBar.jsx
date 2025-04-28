import { useState } from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';

const typesByLanguage = {
    english: ['Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Steel', 'Ice', 'Ghost', 'Dragon', 'Dark'],
    japanese: ['くさ', 'どく', 'ほのお', 'ひこう', 'みず', 'むし', 'ノーマル', 'でんき', 'じめん', 'フェアリー', 'かくとう', 'エスパー', 'いわ', 'はがね', 'こおり', 'ゴースト', 'ドラゴン', 'あく'],
    chinese: ['草', '毒', '火', '飞行', '水', '虫', '一般', '电', '地面', '妖精', '格斗', '超能力', '岩石', '钢', '冰', '幽灵', '龙', '恶'],
    french: ['Plante', 'Poison', 'Feu', 'Vol', 'Eau', 'Insecte', 'Normal', 'Électrik', 'Sol', 'Fée', 'Combat', 'Psy', 'Roche', 'Acier', 'Glace', 'Spectre', 'Dragon', 'Ténèbres']
};

const searchPlaceholder = {
    english: 'Search a Pokemon',
    japanese: 'ポケモンを検索',
    chinese: '搜索宝可梦',
    french: 'Rechercher un Pokémon'
};

const allTypesText = {
    english: 'All types',
    japanese: 'すべてのタイプ',
    chinese: '所有属性',
    french: 'Tous les types'
};

const SearchBar = ({ pokemons, onFilteredPokemonsChange, currentLanguage }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const currentTypes = typesByLanguage[currentLanguage] || [];

    const handleFilter = (search, type) => {
        const filteredPokemons = pokemons.filter(pokemon => {
            const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = type === "" || pokemon.type.includes(type);
            return matchesSearch && matchesType;
        });
        onFilteredPokemonsChange(filteredPokemons);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        handleFilter(e.target.value, selectedType);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        handleFilter(searchTerm, e.target.value);
    };

    return (
        <div className="filters-container">
            <input 
                type="text" 
                placeholder={searchPlaceholder[currentLanguage]}
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <select 
                value={selectedType} 
                onChange={handleTypeChange}
                className="type-select"
            >
                <option value="">{allTypesText[currentLanguage]}</option>
                {currentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

SearchBar.propTypes = {
    pokemons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string)
            ]).isRequired
        })
    ).isRequired,
    onFilteredPokemonsChange: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default SearchBar; 