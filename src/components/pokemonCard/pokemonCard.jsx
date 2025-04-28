import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getTypeIcon } from '../../assets/typeIcons';
import './pokemonCard.css';

const PokemonCard = ({ id, name, types, image, imageShiny, attack, defense, hp }) => {
    const [currentHp, setCurrentHp] = useState(hp);
    const [isShiny, setIsShiny] = useState(false);
    const navigate = useNavigate();

    const handleAttack = () => {
        if (currentHp > 0) {
            setCurrentHp(prev => Math.max(0, prev - 10));
        }
    };

    const handleViewDetails = () => {
        navigate(`/pokemon/${id}`);
    };

    const toggleShiny = () => {
        setIsShiny(!isShiny);
    };

    const typeArray = Array.isArray(types) ? types : [types];
    const primaryType = typeArray[0];

    return (
        <div className="pokemon-card" data-type={primaryType}>
            <button 
                className={`shiny-toggle ${isShiny ? 'active' : ''}`}
                onClick={toggleShiny}
                title={isShiny ? "Version normale" : "Version chromatique"}
            >
                ✨
            </button>
            <div className="card-content">
                <div className="pokemon-name-container">
                    <h2 className="pokemon-name">{name}</h2>
                </div>
                <img 
                    className="pokemon-image" 
                    src={isShiny ? imageShiny : image} 
                    alt={name}
                />
                <div className="pokemon-types">
                    {typeArray.map((type, index) => (
                        <div key={index} className="type-badge">
                            <img 
                                className="type-icon" 
                                src={getTypeIcon(type)} 
                                alt={type}
                                title={type}
                            />
                        </div>
                    ))}
                </div>
                <div className="pokemon-stats-container">
                    <div className="stat-line">
                        <span className="stat-label">PV</span>
                        <span className="stat-value">{currentHp}/{hp}</span>
                    </div>
                    <div className="stat-line">
                        <span className="stat-label">Attaque</span>
                        <span className="stat-value">{attack}</span>
                    </div>
                    <div className="stat-line">
                        <span className="stat-label">Défense</span>
                        <span className="stat-value">{defense}</span>
                    </div>
                </div>
                <div className="buttons-container">
                    <button 
                        className="attack-button" 
                        onClick={handleAttack}
                        disabled={currentHp === 0}
                    >
                        Attaquer
                    </button>
                    <button 
                        className="view-details-button" 
                        onClick={handleViewDetails}
                    >
                        Détails
                    </button>
                </div>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    image: PropTypes.string.isRequired,
    imageShiny: PropTypes.string,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired
};

export default PokemonCard;
