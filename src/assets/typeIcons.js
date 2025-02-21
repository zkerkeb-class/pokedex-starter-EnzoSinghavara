// Définition des types dans l'ordre
const TYPE_ORDER = [
    'GRASS', 'POISON', 'FIRE', 'FLYING', 'WATER', 'BUG', 'NORMAL', 'ELECTRIC',
    'GROUND', 'FAIRY', 'FIGHTING', 'PSYCHIC', 'ROCK', 'STEEL', 'ICE', 'GHOST',
    'DRAGON', 'DARK'
];

// Mapping des chemins d'images pour chaque langue
const typeIconPaths = {
    english: {},
    french: {},
    japanese: {},
    chinese: {}
};

// Initialisation des chemins pour chaque langue
TYPE_ORDER.forEach((type, index) => {
    const number = index + 1;
    typeIconPaths.english[type] = `./types/english/${number}.png`;
    typeIconPaths.french[type] = `/src/assets/types/french/${number}.png`;
    typeIconPaths.japanese[type] = `/src/assets/types/japanese/${number}.png`;
    typeIconPaths.chinese[type] = `/src/assets/types/chinese/${number}.png`;
});

// Mapping des noms de types pour chaque langue
export const typeNames = {
    english: {
        GRASS: 'GRASS', POISON: 'POISON', FIRE: 'FIRE', FLYING: 'FLYING', WATER: 'WATER', BUG: 'BUG', NORMAL: 'NORMAL', ELECTRIC: 'ELECTRIC',GROUND: 'GROUND', FAIRY: 'FAIRY', FIGHTING: 'FIGHTING', PSYCHIC: 'PSYCHIC', ROCK: 'ROCK', STEEL: 'STEEL', ICE: 'ICE', GHOST: 'GHOST', DRAGON: 'DRAGON', DARK: 'DARK'
    },
    french: {
        GRASS: 'PLANTE', POISON: 'POISON', FIRE: 'FEU', FLYING: 'VOL', WATER: 'EAU', BUG: 'INSECTE', NORMAL: 'NORMAL', ELECTRIC: 'ÉLECTRIK', GROUND: 'SOL', FAIRY: 'FÉE', FIGHTING: 'COMBAT', PSYCHIC: 'PSY', ROCK: 'ROCHE', STEEL: 'ACIER', ICE: 'GLACE', GHOST: 'SPECTRE', DRAGON: 'DRAGON', DARK: 'TÉNÈBRES'
    },
    japanese: {
        GRASS: 'くさ', POISON: 'どく', FIRE: 'ほのお', FLYING: 'ひこう', WATER: 'みず', BUG: 'むし', NORMAL: 'ノーマル', ELECTRIC: 'でんき', GROUND: 'じめん', FAIRY: 'フェアリー', FIGHTING: 'かくとう', PSYCHIC: 'エスパー', ROCK: 'いわ', STEEL: 'はがね', ICE: 'こおり', GHOST: 'ゴースト', DRAGON: 'ドラゴン', DARK: 'あく'
    },
    chinese: {
        GRASS: '草', POISON: '毒', FIRE: '火', FLYING: '飞行', WATER: '水', BUG: '虫', NORMAL: '一般', ELECTRIC: '电', GROUND: '地面', FAIRY: '妖精', FIGHTING: '格斗', PSYCHIC: '超能力', ROCK: '岩石', STEEL: '钢', ICE: '冰', GHOST: '幽灵', DRAGON: '龙', DARK: '恶'
    }
};

// Fonction pour obtenir l'icône du type dans la langue souhaitée
export const getTypeIcon = (type, language = 'english') => {
    const standardType = type.toUpperCase();
    return typeIconPaths[language][standardType] || typeIconPaths.english[standardType];
};

export default typeIconPaths; 