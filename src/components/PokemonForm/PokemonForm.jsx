import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getTypeIcon, typeNames } from '../../assets/typeIcons';
import { pokemonOfficialImages, pokemonOfficialShinyImages } from '../../assets/imageLibrary';
import pokemons from '../../assets/pokemons';
import './PokemonForm.css';

const PokemonForm = ({ pokemonId }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState('dark');
    const [formData, setFormData] = useState({
        id: '',
        name: {
            english: '',
            french: '',
            japanese: '',
            chinese: ''
        },
        type: [],
        base: {
            HP: 0,
            Attack: 0,
            Defense: 0,
            'Sp. Attack': 0,
            'Sp. Defense': 0,
            Speed: 0
        },
        image: '',
        imageShiny: ''
    });
    const [idError, setIdError] = useState('');
    const [typeLimitMsg, setTypeLimitMsg] = useState('');
    const [imageError, setImageError] = useState('');
    const [imageShinyError, setImageShinyError] = useState('');

    const [availableTypes] = useState([
        'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
        'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
        'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
    ]);

    const statList = [
        { key: 'HP', label: 'HP' },
        { key: 'Attack', label: 'Attaque' },
        { key: 'Defense', label: 'Défense' },
        { key: 'Speed', label: 'Vitesse' },
        { key: 'Sp. Attack', label: 'Sp. Attaque' },
        { key: 'Sp. Defense', label: 'Sp. Défense' },
    ];

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!pokemonId) return;
            
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/pokemons/${pokemonId}`);
                if (response.data && response.data.data) {
                    const pokemon = response.data.data;
                    // Conversion des types anglais (ex: 'Fire') en labels français (ex: 'FEU')
                    const typeFr = (pokemon.type || []).map(typeEn => {
                        const entry = Object.entries(typeNames.english).find(([, val]) => val === typeEn);
                        if (!entry) return typeEn;
                        const [key] = entry;
                        return typeNames.french[key] || typeEn;
                    });
                    // S'assurer que toutes les stats sont bien initialisées sans écraser les valeurs existantes
                    const base = pokemon.base || {};
                    const safeBase = {
                        HP: base.HP !== undefined ? base.HP : 0,
                        Attack: base.Attack !== undefined ? base.Attack : 0,
                        Defense: base.Defense !== undefined ? base.Defense : 0,
                        'Sp. Attack': base['Sp. Attack'] !== undefined ? base['Sp. Attack'] : (base.Sp && base.Sp.Attack !== undefined ? base.Sp.Attack : 0),
                        'Sp. Defense': base['Sp. Defense'] !== undefined ? base['Sp. Defense'] : (base.Sp && base.Sp.Defense !== undefined ? base.Sp.Defense : 0),
                        Speed: base.Speed !== undefined ? base.Speed : 0
                    };
                    setFormData({
                        id: pokemon.id,
                        name: {
                            english: pokemon.name.english || '',
                            french: pokemon.name.french || '',
                            japanese: pokemon.name.japanese || '',
                            chinese: pokemon.name.chinese || ''
                        },
                        type: typeFr,
                        base: safeBase,
                        image: pokemon.image || '',
                        imageShiny: pokemon.imageShiny || ''
                    });
                }
            } catch (err) {
                setError(err.message);
                console.error('Erreur lors de la récupération du Pokémon:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pokemonId]);

    const handleIdChange = async (value) => {
        setFormData(prev => ({ ...prev, id: value.replace(/\D/g, '') }));
        // Vérification côté BDD
        if (!value) {
            setIdError('');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/api/pokemons/${value}`);
            if (response.data && response.data.data) {
                setIdError('Cet ID est déjà pris dans le Pokédex.');
            } else {
                setIdError('');
            }
        } catch (err) {
            // Si 404, l'ID n'existe pas, donc pas d'erreur
            if (err.response && err.response.status === 404) {
                setIdError('');
            } else {
                setIdError('Erreur lors de la vérification de l\'ID.');
            }
        }
    };

    const handleNameChange = (lang, value) => {
        setFormData(prev => ({
            ...prev,
            name: {
                ...prev.name,
                [lang]: value
            }
        }));
    };

    const handleTypeToggle = (type) => {
        if (!formData.type.includes(type) && formData.type.length >= 2) {
            setTypeLimitMsg('Vous ne pouvez sélectionner que 2 types maximum.');
            clearTimeout(window.typeLimitTimeout);
            window.typeLimitTimeout = setTimeout(() => setTypeLimitMsg(''), 2000);
            return;
        }
        setFormData(prev => ({
            ...prev,
            type: prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
        }));
    };

    const handleStatChange = (stat, value) => {
        setFormData(prev => ({
            ...prev,
            base: {
                ...prev.base,
                [stat]: parseInt(value) || 0
            }
        }));
    };

    const handleStatStep = (stat, step) => {
        setFormData(prev => ({
            ...prev,
            base: {
                ...prev.base,
                [stat]: Math.max(0, Math.min(255, (prev.base[stat] || 0) + step))
            }
        }));
    };

    const handleStatQuick = (stat, value) => {
        setFormData(prev => ({
            ...prev,
            base: {
                ...prev.base,
                [stat]: value
            }
        }));
    };

    const validateUrl = (url) => {
        try {
            new URL(url, window.location.origin);
            return true;
        } catch {
            return false;
        }
    };

    const handleImageChange = (value) => {
        setFormData(prev => ({ ...prev, image: value }));
        setImageError('');
    };

    const handleImageShinyChange = (value) => {
        setFormData(prev => ({ ...prev, imageShiny: value }));
        setImageShinyError('');
    };

    const handleImageSelect = (imgPath) => {
        setFormData(prev => ({ ...prev, image: imgPath }));
        setImageError('');
    };

    const handleImageShinySelect = (imgPath) => {
        setFormData(prev => ({ ...prev, imageShiny: imgPath }));
        setImageShinyError('');
    };

    // Fonction utilitaire pour convertir un type français en anglais (première lettre majuscule)
    const frenchToEnglishType = (frenchType) => {
        const entry = Object.entries(typeNames.french).find(([, val]) => val === frenchType);
        if (!entry) return frenchType;
        const [key] = entry;
        // On récupère le type anglais, puis on met la première lettre en majuscule, le reste en minuscule
        const en = typeNames.english[key] || frenchType;
        return en.charAt(0).toUpperCase() + en.slice(1).toLowerCase();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        if (!formData.image || !validateUrl(formData.image)) {
            setImageError("Veuillez saisir une URL d'image normale valide ou sélectionner une image.");
            valid = false;
        }
        if (!formData.imageShiny || !validateUrl(formData.imageShiny)) {
            setImageShinyError("Veuillez saisir une URL d'image shiny valide ou sélectionner une image.");
            valid = false;
        }
        if (pokemons.some(p => String(p.id) === formData.id)) {
            setIdError('Cet ID est déjà pris dans le Pokédex.');
            setTimeout(() => setIdError(''), 2000);
            return;
        }
        if (!valid) return;
        
        try {
            setLoading(true);
            
            // Conversion des types français en anglais (première lettre majuscule) pour l'API
            const typeEnglish = formData.type.map(frenchToEnglishType);
            // Préparer les données pour l'API
            const pokemonData = {
                id: formData.id,
                name: formData.name,
                type: typeEnglish,
                base: formData.base,
                image: formData.image,
                imageShiny: formData.imageShiny
            };

            // Si c'est une création, l'API générera l'ID automatiquement
            const url = pokemonId 
                ? `http://localhost:3000/api/pokemons/${pokemonId}`
                : 'http://localhost:3000/api/pokemons';
                
            const method = pokemonId ? 'put' : 'post';
            
            const response = await axios[method](url, pokemonData);

            if (response.data) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
            console.error('Erreur lors de la sauvegarde:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const typeKeys = Object.keys(typeNames.french).sort((a, b) => typeNames.french[a].localeCompare(typeNames.french[b], 'fr'));

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <form className={`pokemon-form theme-${theme}`} onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>{pokemonId ? 'Modifier le Pokémon' : 'Créer un nouveau Pokémon'}</h2>
                <button type="button" className="theme-switcher" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
            <div className="pokemon-form-columns">
                {/* Colonne de gauche */}
                <div className="form-col form-col-left">
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="pokemon-id">ID</label>
                            <input
                                id="pokemon-id"
                                type="number"
                                min="1"
                                value={formData.id}
                                onChange={e => handleIdChange(e.target.value)}
                                required
                            />
                            {idError && <div className="id-error-msg">{idError}</div>}
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="section-title">Nom</div>
                        <div className="names-grid">
                            <div className="form-group">
                                <label htmlFor="name-en">Anglais</label>
                                <input
                                    id="name-en"
                                    type="text"
                                    value={formData.name.english}
                                    onChange={(e) => handleNameChange('english', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name-fr">Français</label>
                                <input
                                    id="name-fr"
                                    type="text"
                                    value={formData.name.french}
                                    onChange={(e) => handleNameChange('french', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name-ja">Japonais</label>
                                <input
                                    id="name-ja"
                                    type="text"
                                    value={formData.name.japanese}
                                    onChange={(e) => handleNameChange('japanese', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name-zh">Chinois</label>
                                <input
                                    id="name-zh"
                                    type="text"
                                    value={formData.name.chinese}
                                    onChange={(e) => handleNameChange('chinese', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="section-title">Statistiques</div>
                        <div className="stats-grid">
                            {[{ key: 'HP', label: 'HP' }, { key: 'Attack', label: 'Attaque' }, { key: 'Defense', label: 'Défense' }, { key: 'Speed', label: 'Vitesse' }, { key: 'Sp. Attack', label: 'Sp. Attaque' }, { key: 'Sp. Defense', label: 'Sp. Défense' }].map(stat => (
                                <div className="stat-row" key={stat.key}>
                                    <label htmlFor={`stat-${stat.key}`}>{stat.label}</label>
                                    <input
                                        id={`stat-${stat.key}`}
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={formData.base[stat.key]}
                                        onChange={(e) => handleStatChange(stat.key, e.target.value)}
                                        required
                                    />
                                    <div className="stat-step-btns">
                                        <button type="button" className="stat-btn step" onClick={() => handleStatStep(stat.key, 1)}>+</button>
                                        <button type="button" className="stat-btn step" onClick={() => handleStatStep(stat.key, -1)}>-</button>
                                    </div>
                                    <div className="stat-quick-btns">
                                        {[25, 50, 75, 100].map(val => (
                                            <button
                                                type="button"
                                                className="stat-btn quick"
                                                key={val}
                                                onClick={() => handleStatQuick(stat.key, val)}
                                            >{val}</button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Colonne de droite */}
                <div className="form-col form-col-right">
                    <div className="form-section">
                        <div className="section-title">Type(s)</div>
                        <div className="type-img-buttons-container">
                            {typeKeys.map(typeKey => {
                                const typeLabel = typeNames.french[typeKey];
                                return (
                                    <button
                                        key={typeKey}
                                        type="button"
                                        className={`type-img-filter-btn${formData.type.includes(typeLabel) ? ' selected' : ''}`}
                                        onClick={() => handleTypeToggle(typeLabel)}
                                        tabIndex={0}
                                        title={typeLabel}
                                    >
                                        <img
                                            src={getTypeIcon(typeKey, 'french')}
                                            alt={typeLabel}
                                            className="type-img-filter"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {typeLimitMsg && <div className="type-limit-msg">{typeLimitMsg}</div>}
                    </div>
                    <div className="form-section">
                        <div className="section-title">Images</div>
                        <div className="carousels-row">
                            <div className="carousel-col">
                                <div className="carousel-title">Normal</div>
                                <div className="vertical-carousel">
                                    {[...Array(151)].map((_, i) => {
                                        const idx = i + 1;
                                        const imgPath = pokemonOfficialImages[idx];
                                        return (
                                            <img
                                                key={idx}
                                                src={imgPath}
                                                alt={`Normal ${idx}`}
                                                className={`carousel-img${formData.image === imgPath ? ' selected' : ''}`}
                                                onClick={() => handleImageSelect(imgPath)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="carousel-col">
                                <div className="carousel-title">Shiny</div>
                                <div className="vertical-carousel">
                                    {[...Array(151)].map((_, i) => {
                                        const idx = i + 1;
                                        const imgPath = pokemonOfficialShinyImages[idx];
                                        return (
                                            <img
                                                key={idx}
                                                src={imgPath}
                                                alt={`Shiny ${idx}`}
                                                className={`carousel-img${formData.imageShiny === imgPath ? ' selected' : ''}`}
                                                onClick={() => handleImageShinySelect(imgPath)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image-url">URL de l'image Normal</label>
                            <input
                                id="image-url"
                                type="text"
                                value={formData.image}
                                onChange={e => handleImageChange(e.target.value)}
                            />
                            {imageError && <div className="id-error-msg">{imageError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="image-shiny-url">URL de l'image Shiny</label>
                            <input
                                id="image-shiny-url"
                                type="text"
                                value={formData.imageShiny}
                                onChange={e => handleImageShinyChange(e.target.value)}
                            />
                            {imageShinyError && <div className="id-error-msg">{imageShinyError}</div>}
                        </div>
                        <div className="image-preview-row">
                            {formData.image && (
                                <div className="image-preview">
                                    <img src={formData.image} alt="Aperçu du Pokémon" />
                                </div>
                            )}
                            {formData.imageShiny && (
                                <div className="image-preview">
                                    <img src={formData.imageShiny} alt="Aperçu Shiny" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="button secondary" onClick={() => navigate('/')}>Annuler</button>
                <button type="submit" className="button primary">{pokemonId ? 'Modifier le Pokémon' : 'Créer le Pokémon'}</button>
            </div>
        </form>
    );
};

PokemonForm.propTypes = {
    pokemonId: PropTypes.string,
};

export default PokemonForm; 