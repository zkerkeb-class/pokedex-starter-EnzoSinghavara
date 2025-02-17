import { useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard/PokemonCard'
import SearchBar from './components/searchBar/searchBar'
import Header from './components/header/header'
import './App.css'

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [currentLanguage, setCurrentLanguage] = useState('french');

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <div>
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange}
      />
      <div className="app-container">
        <SearchBar 
          pokemons={pokemons}
          onFilteredPokemonsChange={setFilteredPokemons}
          currentLanguage={currentLanguage}
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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
