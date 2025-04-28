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
            const response = await fetch('http://localhost:3000/api/pokemons');
            if (!response.ok) throw new Error('Failed to fetch Pokemon list');
            const data = await response.json();
            setPokemons(data.pokemons);
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
            const token = localStorage.getItem('token');
            const config = {
                method: 'DELETE',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            };
            const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, config);

            if (!response.ok) throw new Error('Échec de la suppression du Pokémon');
            
            await fetchPokemons();
        } catch (err) {
            setError(err.message);
        }
    };

    const isLoggedIn = !!localStorage.getItem('token');

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
                                src={pokemon.image} 
                                alt={pokemon.name?.french || pokemon.name?.english || 'Pokémon'} 
                                className="pokemon-thumbnail"
                            />
                            <div className="pokemon-details">
                                <h3>{pokemon.name?.french || pokemon.name?.english}</h3>
                                <div className="pokemon-types">
                                    {pokemon.type.map(type => (
                                        <span key={type} className={`type-badge ${type.toLowerCase()}`}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pokemon-actions">
                            {isLoggedIn && (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonAdmin; 