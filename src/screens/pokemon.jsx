import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pokemon.css';
import CardPokemonDetail from '../components/CardPokemon/CardPokemon';
import Header from '../components/Header/Header';
import {
  pokemonOfficialImages,
  pokemonG5AnimatedImages,
  pokemonG7AnimatedImages,
  pokemonOfficialShinyImages,
  pokemonG5AnimatedShinyImages,
  pokemonG7AnimatedShinyImages
} from '../assets/imageLibrary';
import { motion, AnimatePresence } from 'framer-motion';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem('currentLanguage') || 'french');
  const [imageSet, setImageSet] = useState(() => localStorage.getItem('imageSet') || 'g7');
  const [isDeleting, setIsDeleting] = useState(false);

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
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
        const { normal, shiny } = getImageSet();
        const data = response.data.data;
        data.image = normal[data.id] || data.image;
        data.imageShiny = shiny[data.id] || data.imageShiny;
        setPokemon(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération du Pokémon:', err);
        setError('Impossible de charger les détails du Pokémon');
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id, imageSet]);

  useEffect(() => {
    localStorage.setItem('currentLanguage', currentLanguage);
  }, [currentLanguage]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  const handleEdit = () => {
    navigate(`/admin/pokemon/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce Pokémon ?')) {
      setIsDeleting(true);
      setTimeout(async () => {
        try {
          await axios.delete(`http://localhost:3000/api/pokemons/${id}`);
          navigate('/');
        } catch (err) {
          console.error('Erreur lors de la suppression du Pokémon:', err);
          setError('Impossible de supprimer le Pokémon');
          setIsDeleting(false);
        }
      }, 350); // durée de l'animation
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleBack}>Retour à l&apos;accueil</button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="error-container">
        <p className="error-message">Pokémon non trouvé</p>
        <button onClick={handleBack}>Retour à l&apos;accueil</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onSearch={() => {}}
        onTypesChange={() => {}}
        selectedTypes={[]}
        searchTerm={''}
        onResetAll={() => {}}
        imageSet={imageSet}
        onImageSetChange={(newImageSet) => {
          setImageSet(newImageSet);
        }}
        showBottom={false}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <button className="back-button" onClick={handleBack} style={{ margin: '1.5rem auto 1.5rem auto', border: '2px solid #181818', borderRadius: '8px', background: 'transparent', color: '#fff', padding: '8px 24px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'border 0.2s, box-shadow 0.2s, background 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = '#232323'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
          Retour
        </button>
        <AnimatePresence>
          {!isDeleting && (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7, y: 40 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <CardPokemonDetail
                id={pokemon.id}
                name={pokemon.name[currentLanguage] || pokemon.name.french}
                image={pokemon.image}
                imageShiny={pokemon.imageShiny}
                types={pokemon.type}
                base={pokemon.base}
                currentLanguage={currentLanguage}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button className="edit-button" style={{ marginTop: '2rem', width: 220 }} onClick={handleEdit}>
                  Modifier ce Pokémon
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PokemonDetail;