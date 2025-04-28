import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import CardPokemon from '../components/CardPokemon/CardPokemon'
import './home.css'
import {
  pokemonOfficialImages,
  pokemonG5AnimatedImages,
  pokemonG7AnimatedImages,
  pokemonOfficialShinyImages,
  pokemonG5AnimatedShinyImages,
  pokemonG7AnimatedShinyImages
} from '../assets/imageLibrary'
import HoloCardModalWrapper from '../components/CardPokemon/modal/HoloCardModalWrapper'
import { AnimatePresence, motion } from 'framer-motion'

// Mapping des types de l'API vers les types localisés
const typeMapping = {
  'english': {
    'Grass': 'GRASS',
    'Poison': 'POISON',
    'Fire': 'FIRE',
    'Flying': 'FLYING',
    'Water': 'WATER',
    'Bug': 'BUG',
    'Normal': 'NORMAL',
    'Electric': 'ELECTRIC',
    'Ground': 'GROUND',
    'Fairy': 'FAIRY',
    'Fighting': 'FIGHTING',
    'Psychic': 'PSYCHIC',
    'Rock': 'ROCK',
    'Steel': 'STEEL',
    'Ice': 'ICE',
    'Ghost': 'GHOST',
    'Dragon': 'DRAGON',
    'Dark': 'DARK',
    // Mapping inverse
    'GRASS': 'Grass',
    'POISON': 'Poison',
    'FIRE': 'Fire',
    'FLYING': 'Flying',
    'WATER': 'Water',
    'BUG': 'Bug',
    'NORMAL': 'Normal',
    'ELECTRIC': 'Electric',
    'GROUND': 'Ground',
    'FAIRY': 'Fairy',
    'FIGHTING': 'Fighting',
    'PSYCHIC': 'Psychic',
    'ROCK': 'Rock',
    'STEEL': 'Steel',
    'ICE': 'Ice',
    'GHOST': 'Ghost',
    'DRAGON': 'Dragon',
    'DARK': 'Dark'
  },
  'french': {
    'Grass': 'PLANTE',
    'Poison': 'POISON',
    'Fire': 'FEU',
    'Flying': 'VOL',
    'Water': 'EAU',
    'Bug': 'INSECTE',
    'Normal': 'NORMAL',
    'Electric': 'ÉLECTRIK',
    'Ground': 'SOL',
    'Fairy': 'FÉE',
    'Fighting': 'COMBAT',
    'Psychic': 'PSY',
    'Rock': 'ROCHE',
    'Steel': 'ACIER',
    'Ice': 'GLACE',
    'Ghost': 'SPECTRE',
    'Dragon': 'DRAGON',
    'Dark': 'TÉNÈBRES',
    // Mapping inverse
    'PLANTE': 'Grass',
    'POISON': 'Poison',
    'FEU': 'Fire',
    'VOL': 'Flying',
    'EAU': 'Water',
    'INSECTE': 'Bug',
    'NORMAL': 'Normal',
    'ÉLECTRIK': 'Electric',
    'SOL': 'Ground',
    'FÉE': 'Fairy',
    'COMBAT': 'Fighting',
    'PSY': 'Psychic',
    'ROCHE': 'Rock',
    'ACIER': 'Steel',
    'GLACE': 'Ice',
    'SPECTRE': 'Ghost',
    'DRAGON': 'Dragon',
    'TÉNÈBRES': 'Dark'
  },
  'japanese': {
    'Grass': 'くさ',
    'Poison': 'どく',
    'Fire': 'ほのお',
    'Flying': 'ひこう',
    'Water': 'みず',
    'Bug': 'むし',
    'Normal': 'ノーマル',
    'Electric': 'でんき',
    'Ground': 'じめん',
    'Fairy': 'フェアリー',
    'Fighting': 'かくとう',
    'Psychic': 'エスパー',
    'Rock': 'いわ',
    'Steel': 'はがね',
    'Ice': 'こおり',
    'Ghost': 'ゴースト',
    'Dragon': 'ドラゴン',
    'Dark': 'あく'
  },
  'chinese': {
    'Grass': '草',
    'Poison': '毒',
    'Fire': '火',
    'Flying': '飞行',
    'Water': '水',
    'Bug': '虫',
    'Normal': '一般',
    'Electric': '电',
    'Ground': '地面',
    'Fairy': '妖精',
    'Fighting': '格斗',
    'Psychic': '超能力',
    'Rock': '岩石',
    'Steel': '钢',
    'Ice': '冰',
    'Ghost': '幽灵',
    'Dragon': '龙',
    'Dark': '恶'
  }
};

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = /\/pokemon\/(\d+)/.exec(location.pathname);
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('french');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSet, setImageSet] = useState(() => localStorage.getItem('imageSet') || 'g7');
  const [selectedCard, setSelectedCard] = useState(null);
  const isGuest = localStorage.getItem('guest') === '1';
  const isLoggedIn = !!localStorage.getItem('token');

  // Fonction pour convertir les types de l'API au format localisé
  const convertTypes = (types, language) => {
    return types.map(type => {
      // Si le type est déjà dans le format attendu, on le retourne tel quel
      if (typeMapping[language][type]) {
        return typeMapping[language][type];
      }
      // Sinon, on essaie de le convertir en majuscules
      const upperType = type.toUpperCase();
      return typeMapping[language][upperType] || upperType;
    });
  };

  // Fonction utilitaire pour choisir le set d'images
  const getImageSet = () => {
    switch (imageSet) {
      case 'official':
        return { normal: pokemonOfficialImages, shiny: pokemonOfficialShinyImages };
      case 'g5':
        return { normal: pokemonG5AnimatedImages, shiny: pokemonG5AnimatedShinyImages };
      case 'g7':
      default:
        return { normal: pokemonG7AnimatedImages, shiny: pokemonG7AnimatedShinyImages };
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/pokemons');
        const { normal, shiny } = getImageSet();
        // Enrichir les données des Pokémon avec le set d'images sélectionné
        const enrichedPokemons = response.data.pokemons.map(pokemon => ({
          ...pokemon,
          image: normal[pokemon.id] || pokemon.image,
          imageShiny: shiny[pokemon.id] || pokemon.imageShiny
        }));
        setPokemons(enrichedPokemons);
        setFilteredPokemons(enrichedPokemons);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des Pokémon:', err);
        setError('Impossible de charger les Pokémon');
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [imageSet]);

  useEffect(() => {
    filterPokemons();
  }, [searchTerm, selectedTypes, currentLanguage, pokemons]);

  useEffect(() => {
    if (params && pokemons.length > 0) {
      const pokeId = parseInt(params[1], 10);
      const found = pokemons.find(p => p.id === pokeId);
      if (found) setSelectedCard(found);
    } else if (!params) {
      setSelectedCard(null);
    }
  }, [params, pokemons]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypesChange = (types) => {
    setSelectedTypes(types);
  };

  const filterPokemons = () => {
    let filtered = [...pokemons];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par types (universal keys, minuscule)
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        selectedTypes.every(selectedType =>
          pokemon.type.map(t => t.toLowerCase()).includes(selectedType)
        )
      );
    }

    setFilteredPokemons(filtered);
  };

  const handleCreatePokemon = () => {
    navigate('/admin/pokemon/new');
  };

  const handleResetFiltersAndSearch = () => {
    setSearchTerm('');
    setSelectedTypes([]);
  };

  // Handler pour afficher la carte détaillée
  const handleShowDetails = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`, { state: { currentLanguage } });
    setSelectedCard(pokemon);
  };

  // Handler pour fermer la vue détaillée
  const handleCloseDetails = () => {
    navigate('/');
    setSelectedCard(null);
  };

  // Handler pour supprimer un Pokémon
  const handleDeletePokemon = async (id) => {
    if (isGuest) {
      alert("Action interdite pour l'invité");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/pokemons/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
      // Met à jour la liste locale après suppression
      const updatedPokemons = pokemons.filter(p => p.id !== id);
      setPokemons(updatedPokemons);
      setFilteredPokemons(updatedPokemons);
    } catch (err) {
      alert('Erreur lors de la suppression du Pokémon');
    }
  };

  const handleEditPokemon = (id) => {
    if (isGuest) {
      alert("Action interdite pour l'invité");
      return;
    }
    navigate(`/admin/pokemon/${id}/edit`);
  };

  if (loading) {
    return <div className="loading">Chargement des Pokémon...</div>;
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        background: 'transparent',
      }}>
        {error}
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange}
        onSearch={handleSearch}
        onTypesChange={handleTypesChange}
        selectedTypes={selectedTypes}
        searchTerm={searchTerm}
        onResetAll={handleResetFiltersAndSearch}
        imageSet={imageSet}
        onImageSetChange={setImageSet}
      />
      
      <div className="pokemon-list">
        <AnimatePresence>
          {filteredPokemons
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((pokemon) => (
              <motion.div
                key={pokemon.id}
                className="pokemon-card-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, y: 40 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <CardPokemon
                  id={pokemon.id}
                  name={pokemon.name[currentLanguage]}
                  image={pokemon.image}
                  imageShiny={pokemon.imageShiny}
                  types={pokemon.type}
                  base={pokemon.base}
                  currentLanguage={currentLanguage}
                  onDetails={() => handleShowDetails(pokemon)}
                  onDelete={handleDeletePokemon}
                  onEdit={isLoggedIn && !isGuest ? handleEditPokemon : undefined}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {isLoggedIn && !isGuest && (
        <button 
          className="create-pokemon-button" 
          onClick={handleCreatePokemon}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '120px',
            zIndex: 1000,
            width: '72px',
            height: '72px',
            borderRadius: '16px',
            background: '#43d13a',
            border: '2.5px solid #228c1d',
            boxShadow: '0 2px 16px 2px #000a',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#2fa32a';
            e.currentTarget.style.border = '2.5px solid #43d13a';
            e.currentTarget.style.boxShadow = '0 4px 24px 4px #43d13a33';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#43d13a';
            e.currentTarget.style.border = '2.5px solid #228c1d';
            e.currentTarget.style.boxShadow = '0 2px 16px 2px #000a';
          }}
        >
          Créer
        </button>
      )}
    </div>
  );
}

export default Home;
