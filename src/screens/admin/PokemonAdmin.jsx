import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PokemonAdmin.css';

const PokemonAdmin = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/pokemons');
            if (!response.ok) throw new Error('Failed to fetch Pokemon list');
            
            const data = await response.json();
            setPokemons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce Pokémon ?')) {
            return;
        }

        try {
            const response = await fetch(`/api/pokemons/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Échec de la suppression du Pokémon');
            
            await fetchPokemons();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="pokemon-admin">
            <header className="admin-header">
                <h1>Gestion des Pokémon</h1>
                <Link to="/admin/pokemon/new" className="button primary">
                    Créer un nouveau Pokémon
                </Link>
            </header>

            <div className="pokemon-list">
                {pokemons.map(pokemon => (
                    <div key={pokemon.id} className="pokemon-item">
                        <div className="pokemon-info">
                            <img 
                                src={pokemon.imageUrl} 
                                alt={pokemon.names?.fr || pokemon.names?.en || 'Pokémon'} 
                                className="pokemon-thumbnail"
                            />
                            <div className="pokemon-details">
                                <h3>{pokemon.names?.fr || pokemon.names?.en}</h3>
                                <div className="pokemon-types">
                                    {pokemon.types.map(type => (
                                        <span key={type} className={`type-badge ${type.toLowerCase()}`}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pokemon-actions">
                            <Link 
                                to={`/admin/pokemon/${pokemon.id}/edit`}
                                className="button secondary"
                            >
                                Modifier
                            </Link>
                            <button
                                onClick={() => handleDelete(pokemon.id)}
                                className="button danger"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonAdmin; 