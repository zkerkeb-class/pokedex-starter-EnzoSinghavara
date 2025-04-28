import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardPokemonDetail.css';
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
    edit: 'Modifier',
    delete: 'Supprimer',
  },
  english: {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    spAttack: 'Sp. Attack',
    spDefense: 'Sp. Defense',
    edit: 'Edit',
    delete: 'Delete',
  },
  japanese: {
    hp: 'HP',
    attack: 'こうげき',
    defense: 'ぼうぎょ',
    speed: 'すばやさ',
    spAttack: 'とくこう',
    spDefense: 'とくぼう',
    edit: '編集',
    delete: '削除',
  },
  chinese: {
    hp: 'HP',
    attack: '攻击',
    defense: '防御',
    speed: '速度',
    spAttack: '特攻',
    spDefense: '特防',
    edit: '编辑',
    delete: '删除',
  },
};

const CardPokemonDetail = ({ id, name, image, imageShiny, types, base, currentLanguage = 'french', onEdit, onDelete }) => {
  const [isShiny, setIsShiny] = useState(false);
  const typeArray = Array.isArray(types) ? types : [types];
  const mainType = typeArray[0] ? typeArray[0].toLowerCase() : 'normal';
  const t = statLabels[currentLanguage] || statLabels.french;

  return (
    <div className="card-pokemon-detail-outer">
      <HoloCardWrapper>
        <div className={`card-pokemon-detail card-pokemon-detail--${mainType}`}>
          <img src={cardBg} alt="card background" className="card-pokemon-detail-bg" />
          <div className="card-pokemon-detail-content">
            <div className="card-pokemon-detail-header">
              <span className="card-pokemon-detail-id">#{id}</span>
              <span className="card-pokemon-detail-name">{name}</span>
              <div className="card-pokemon-detail-types">
                {typeArray.map((type, idx) => (
                  <img
                    key={idx}
                    src={typeSymbols[type.toUpperCase()]}
                    alt={type}
                    className="type-icon-visual"
                  />
                ))}
              </div>
            </div>
            <div className="card-pokemon-detail-image-wrapper">
              <img
                src={isShiny && imageShiny ? imageShiny : image}
                alt={name}
                className="card-pokemon-detail-image"
              />
              <button
                className={`shiny-toggle-btn${isShiny ? ' active' : ''}`}
                onClick={() => setIsShiny((prev) => !prev)}
                title={isShiny ? 'Afficher la version normale' : 'Afficher la version shiny'}
                aria-label="Basculer shiny"
              >
                <span className="star-icon" role="img" aria-label="shiny">★</span>
              </button>
            </div>
            <div className="card-pokemon-detail-stats">
              <div className="stat-line"><span>{t.hp}</span><span>{base.HP}</span></div>
              <div className="stat-line"><span>{t.attack}</span><span>{base.Attack}</span></div>
              <div className="stat-line"><span>{t.defense}</span><span>{base.Defense}</span></div>
              <div className="stat-line"><span>{t.speed}</span><span>{base.Speed}</span></div>
              <div className="stat-line"><span>{t.spAttack}</span><span>{base["Sp. Attack"] || base.Sp?.[" Attack"]}</span></div>
              <div className="stat-line"><span>{t.spDefense}</span><span>{base["Sp. Defense"] || base.Sp?.[" Defense"]}</span></div>
            </div>
            <div className="card-pokemon-detail-actions">
              <button className="edit-btn" onClick={onEdit}>{t.edit}</button>
              <button className="delete-btn" onClick={onDelete}>{t.delete}</button>
            </div>
          </div>
        </div>
      </HoloCardWrapper>
    </div>
  );
};

CardPokemonDetail.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageShiny: PropTypes.string,
  types: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  base: PropTypes.shape({
    HP: PropTypes.number,
    Attack: PropTypes.number,
    Defense: PropTypes.number,
    'Sp. Attack': PropTypes.number,
    'Sp. Defense': PropTypes.number,
    Speed: PropTypes.number,
  }),
  currentLanguage: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardPokemonDetail; 