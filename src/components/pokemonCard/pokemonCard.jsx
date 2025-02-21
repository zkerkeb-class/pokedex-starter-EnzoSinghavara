import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./pokemonCard.css";
import { getTypeIcon } from '../../assets/imageLibrary';

const PokemonCard = ({ name, types, image, imageShiny, attack, defense, hp, currentLanguage }) => {
    const [currentHP, setCurrentHP] = useState(hp);
    const [isShiny, setIsShiny] = useState(false);

    const handleAttack = () => {
        setCurrentHP(prev => Math.max(0, prev - 10));
    };

    useEffect(() => {
        if (currentHP <= 0) {
            alert("Le pokémon est K.O.");
        }
    }, [currentHP]);

    return (
        <div className="pokemon-card" data-type={types[currentLanguage][0]?.toUpperCase()}>
            <div className="pokemon-name-container">
                <span className="pokemon-name">{name}</span>
                <button 
                    className="shiny-button" 
                    onClick={() => setIsShiny(!isShiny)}
                >
                    {isShiny ? "Normal" : "Shiny"}
                </button>
            </div>
            <img 
                className="pokemon-image" 
                src={isShiny ? imageShiny : image} 
                alt={name} 
            />
            <div className="pokemon-types">
                {types[currentLanguage].map((type) => (
                    <div key={type} className="type-badge">
                        <img 
                            src={getTypeIcon(type, currentLanguage)}
                            alt={type}
                            className="type-icon"
                        />
                    </div>
                ))}
            </div>
            <div className="pokemon-stats-container">
                <span>Attack: {attack}</span>
                <span>Defense: {defense}</span>
                <span>HP: {currentHP}</span>
                <button onClick={handleAttack}>Attack!</button>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    name: PropTypes.string.isRequired,
    types: PropTypes.shape({
        english: PropTypes.arrayOf(PropTypes.string),
        japanese: PropTypes.arrayOf(PropTypes.string),
        chinese: PropTypes.arrayOf(PropTypes.string),
        french: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    image: PropTypes.string.isRequired,
    imageShiny: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    currentLanguage: PropTypes.string.isRequired
};

export default PokemonCard;
