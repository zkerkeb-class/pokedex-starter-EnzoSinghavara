import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardPokemon.css';
import cardBg from '../../assets/cards/background.png';
import typeSymbols from '../../assets/typeSymbols';
import HoloCardWrapper from './HoloCardWrapper';

const statLabels = {
  french: {
    hp: 'PV',
    attack: 'Attaque',
    defense: 'Défense',
    speed: 'Vitesse',
    spAttack: 'Sp. Attaque',
    spDefense: 'Sp. Défense',
    details: 'Détails',
    delete: 'Supprimer',
  },
  english: {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    spAttack: 'Sp. Attack',
    spDefense: 'Sp. Defense',
    details: 'Details',
    delete: 'Delete',
  },
  japanese: {
    hp: 'HP',
    attack: 'こうげき',
    defense: 'ぼうぎょ',
    speed: 'すばやさ',
    spAttack: 'とくこう',
    spDefense: 'とくぼう',
    details: '詳細',
    delete: '削除',
  },
  chinese: {
    hp: 'HP',
    attack: '攻击',
    defense: '防御',
    speed: '速度',
    spAttack: '特攻',
    spDefense: '特防',
    details: '详情',
    delete: '删除',
  },
};

const CardPokemon = ({ id, name, image, imageShiny, types, base, currentLanguage = 'french', onDetails, isDetailView, onDelete, onEdit }) => {
  const [isShiny, setIsShiny] = useState(false);
  const typeArray = Array.isArray(types) ? types : [types];
  const mainType = typeArray[0] ? typeArray[0].toLowerCase() : 'normal';

  const handleToggleShiny = () => {
    setIsShiny((prev) => !prev);
  };

  const t = statLabels[currentLanguage] || statLabels.french;

  // Fonction de suppression avec confirmation
  const handleDeleteClick = () => {
    if (isGuest) {
      alert("Action interdite pour l'invité");
      return;
    }
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce Pokémon ?')) {
      if (onDelete) onDelete(id);
    }
  };

  const isGuest = localStorage.getItem('guest') === '1';
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <HoloCardWrapper>
      <div className="card-pokemon-container">
        <div className={`card-pokemon-bg-gradient card-pokemon-bg-gradient--${mainType}`}></div>
        <img src={cardBg} alt="card background" className="card-pokemon-bg" />
        <div className="card-pokemon-content" style={{ pointerEvents: 'auto' }}>
          <div className="card-pokemon-name">{name}</div>
          <div className="card-pokemon-type-icons">
            {typeArray.map((type, idx) => (
              <img
                key={idx}
                src={typeSymbols[type.toUpperCase()]}
                alt={type}
                className="type-icon-visual"
              />
            ))}
          </div>
          <div className="card-pokemon-image-wrapper">
            <img src={isShiny && imageShiny ? imageShiny : image} alt={name} className="card-pokemon-image" />
          </div>
          {base ? (
            <div className="card-pokemon-stats">
              <div className="stat-line"><span>{t.hp}</span><span>{base.HP}</span></div>
              <div className="stat-line"><span>{t.attack}</span><span>{base.Attack}</span></div>
              <div className="stat-line"><span>{t.defense}</span><span>{base.Defense}</span></div>
              <div className="stat-line"><span>{t.speed}</span><span>{base.Speed}</span></div>
              <div className="stat-line"><span>{t.spAttack}</span><span>{base["Sp. Attack"] || base.Sp?.[" Attack"]}</span></div>
              <div className="stat-line"><span>{t.spDefense}</span><span>{base["Sp. Defense"] || base.Sp?.[" Defense"]}</span></div>
            </div>
          ) : (
            <div className="card-pokemon-stats">Aucune statistique</div>
          )}
          <div className="card-pokemon-bottom-right">
            <span className="pokedex-id">{id ? id : ''}</span>
            <button
              className={`shiny-toggle-btn${isShiny ? ' active' : ''}`}
              onClick={handleToggleShiny}
              title={isShiny ? 'Afficher la version normale' : 'Afficher la version shiny'}
              aria-label="Basculer shiny"
              style={{ width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="star-icon" role="img" aria-label="shiny">★</span>
            </button>
          </div>
          <div className="card-pokemon-action-buttons">
            <button className="details-btn" onClick={onDetails}>
              {t.details}
            </button>
            {isLoggedIn && !isGuest && (
              <button className="delete-btn" onClick={handleDeleteClick}>{t.delete}</button>
            )}
          </div>
        </div>
      </div>
    </HoloCardWrapper>
  );
};

CardPokemon.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageShiny: PropTypes.string,
  types: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  base: PropTypes.object,
  currentLanguage: PropTypes.string,
  onDetails: PropTypes.func.isRequired,
  isDetailView: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CardPokemon;