import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./pokemonCard.css";

const PokemonCard = ({ name, types, image, imageShiny, attack, defense, hp }) => {
    const [currentHP, setCurrentHP] = useState(hp);
    const [isShiny, setIsShiny] = useState(false);

    useEffect(() => {
    // alert("le combat commence")
    }, []);

    useEffect(() => {
    console.log("currentHP useEffect", currentHP);
    if (currentHP <= 0) {
        alert("bulbizarre est mort");
    }
    }, [currentHP]);

    const handleAttack = () => {
    console.log("bulbizarre ce mange une patate");
    setCurrentHP(currentHP - 10);
    };

    return (
    <div className="pokemon-card">
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
        <div className="pokemon-types-container">
        {types.map((type) => {
            return <span key={type} className={`type-badge ${type.toLowerCase()}`}>{type}</span>;
        })}
        </div>
        <div className="pokemon-stats-container">
            <span>Attack: {attack}</span>
            <span>Defense: {defense}</span>
            <span>HP: {currentHP}</span>
        </div>
      {/* <button onClick={handleAttack}>Attack</button> */}
    </div>
    );
};

PokemonCard.propTypes = {
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    imageShiny: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired
};

export default PokemonCard;
