import { useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard/PokemonCard'
import Header from './components/header/header'
import './App.css'

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [currentLanguage, setCurrentLanguage] = useState('french');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterPokemons(term, selectedTypes);
  };

  const handleTypesChange = (types) => {
    setSelectedTypes(types);
    filterPokemons(searchTerm, types);
  };

  const filterPokemons = (search, types) => {
    const filtered = pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name[currentLanguage]
        .toLowerCase()
        .includes(search.toLowerCase());
      
      const matchesTypes = types.length === 0 || types.every(selectedType => {
        return pokemon.type[currentLanguage].includes(selectedType);
      });

      return matchesSearch && matchesTypes;
    });

    setFilteredPokemons(filtered);
  };

  return (
    <div className="app-container">
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange}
        onSearch={handleSearch}
        onTypesChange={handleTypesChange}
      />
      
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card-container">
            <PokemonCard
              name={pokemon.name[currentLanguage]} 
              types={pokemon.type}
              image={pokemon.image}
              imageShiny={pokemon.imageShiny}
              attack={pokemon.base.Attack}
              defense={pokemon.base.Defense}
              hp={pokemon.base.HP}
              currentLanguage={currentLanguage}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
