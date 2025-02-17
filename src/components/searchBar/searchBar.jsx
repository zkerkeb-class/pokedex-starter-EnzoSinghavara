import { useState } from 'react';
import './searchBar.css';

const SearchBar = ({ pokemons, onFilteredPokemonsChange, currentLanguage }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");

    // Get unique types from all pokemons
    const allTypes = [...new Set(pokemons.flatMap(pokemon => pokemon.type))];

    // Filter pokemons based on search term and selected type
    const handleFilter = (search, type) => {
        const filteredPokemons = pokemons.filter(pokemon => {
            const matchesSearch = pokemon.name[currentLanguage].toLowerCase().includes(search.toLowerCase());
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
                placeholder={`Rechercher un Pokémon en ${currentLanguage}`}
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <select 
                value={selectedType} 
                onChange={handleTypeChange}
                className="type-select"
            >
                <option value="">Tous les types</option>
                {allTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    )
}

export default SearchBar;
