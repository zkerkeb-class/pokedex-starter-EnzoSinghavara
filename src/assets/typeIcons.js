// Définition des types dans l'ordre
export const TYPE_ORDER = [
    'GRASS', 'POISON', 'FIRE', 'FLYING', 'WATER', 'BUG', 'NORMAL', 'ELECTRIC',
    'GROUND', 'FAIRY', 'FIGHTING', 'PSYCHIC', 'ROCK', 'STEEL', 'ICE', 'GHOST',
    'DRAGON', 'DARK'
];

// Import des icônes de type
import grassEN from './types/english/grass.png';
import poisonEN from './types/english/poison.png';
import fireEN from './types/english/fire.png';
import flyingEN from './types/english/flying.png';
import waterEN from './types/english/water.png';
import bugEN from './types/english/bug.png';
import normalEN from './types/english/normal.png';
import electricEN from './types/english/electric.png';
import groundEN from './types/english/ground.png';
import fairyEN from './types/english/fairy.png';
import fightingEN from './types/english/fighting.png';
import psychicEN from './types/english/psychic.png';
import rockEN from './types/english/rock.png';
import steelEN from './types/english/steel.png';
import iceEN from './types/english/ice.png';
import ghostEN from './types/english/ghost.png';
import dragonEN from './types/english/dragon.png';
import darkEN from './types/english/dark.png';

// Import des icônes de type en français
import grassFR from './types/french/grass.png';
import poisonFR from './types/french/poison.png';
import fireFR from './types/french/fire.png';
import flyingFR from './types/french/flying.png';
import waterFR from './types/french/water.png';
import bugFR from './types/french/bug.png';
import normalFR from './types/french/normal.png';
import electricFR from './types/french/electric.png';
import groundFR from './types/french/ground.png';
import fairyFR from './types/french/fairy.png';
import fightingFR from './types/french/fighting.png';
import psychicFR from './types/french/psychic.png';
import rockFR from './types/french/rock.png';
import steelFR from './types/french/steel.png';
import iceFR from './types/french/ice.png';
import ghostFR from './types/french/ghost.png';
import dragonFR from './types/french/dragon.png';
import darkFR from './types/french/dark.png';

// Import des icônes de type en japonais
import grassJP from './types/japanese/grass.png';
import poisonJP from './types/japanese/poison.png';
import fireJP from './types/japanese/fire.png';
import flyingJP from './types/japanese/flying.png';
import waterJP from './types/japanese/water.png';
import bugJP from './types/japanese/bug.png';
import normalJP from './types/japanese/normal.png';
import electricJP from './types/japanese/electric.png';
import groundJP from './types/japanese/ground.png';
import fairyJP from './types/japanese/fairy.png';
import fightingJP from './types/japanese/fighting.png';
import psychicJP from './types/japanese/psychic.png';
import rockJP from './types/japanese/rock.png';
import steelJP from './types/japanese/steel.png';
import iceJP from './types/japanese/ice.png';
import ghostJP from './types/japanese/ghost.png';
import dragonJP from './types/japanese/dragon.png';
import darkJP from './types/japanese/dark.png';

// Import des icônes de type en chinois
import grassZH from './types/chinese/grass.png';
import poisonZH from './types/chinese/poison.png';
import fireZH from './types/chinese/fire.png';
import flyingZH from './types/chinese/flying.png';
import waterZH from './types/chinese/water.png';
import bugZH from './types/chinese/bug.png';
import normalZH from './types/chinese/normal.png';
import electricZH from './types/chinese/electric.png';
import groundZH from './types/chinese/ground.png';
import fairyZH from './types/chinese/fairy.png';
import fightingZH from './types/chinese/fighting.png';
import psychicZH from './types/chinese/psychic.png';
import rockZH from './types/chinese/rock.png';
import steelZH from './types/chinese/steel.png';
import iceZH from './types/chinese/ice.png';
import ghostZH from './types/chinese/ghost.png';
import dragonZH from './types/chinese/dragon.png';
import darkZH from './types/chinese/dark.png';

// Mapping des icônes pour chaque langue
const typeIcons = {
    english: {
        GRASS: grassEN,
        POISON: poisonEN,
        FIRE: fireEN,
        FLYING: flyingEN,
        WATER: waterEN,
        BUG: bugEN,
        NORMAL: normalEN,
        ELECTRIC: electricEN,
        GROUND: groundEN,
        FAIRY: fairyEN,
        FIGHTING: fightingEN,
        PSYCHIC: psychicEN,
        ROCK: rockEN,
        STEEL: steelEN,
        ICE: iceEN,
        GHOST: ghostEN,
        DRAGON: dragonEN,
        DARK: darkEN
    },
    french: {
        PLANTE: grassFR,
        POISON: poisonFR,
        FEU: fireFR,
        VOL: flyingFR,
        EAU: waterFR,
        INSECTE: bugFR,
        NORMAL: normalFR,
        ÉLECTRIK: electricFR,
        SOL: groundFR,
        FÉE: fairyFR,
        COMBAT: fightingFR,
        PSY: psychicFR,
        ROCHE: rockFR,
        ACIER: steelFR,
        GLACE: iceFR,
        SPECTRE: ghostFR,
        DRAGON: dragonFR,
        TÉNÈBRES: darkFR
    },
    japanese: {
        くさ: grassJP,
        どく: poisonJP,
        ほのお: fireJP,
        ひこう: flyingJP,
        みず: waterJP,
        むし: bugJP,
        ノーマル: normalJP,
        でんき: electricJP,
        じめん: groundJP,
        フェアリー: fairyJP,
        かくとう: fightingJP,
        エスパー: psychicJP,
        いわ: rockJP,
        はがね: steelJP,
        こおり: iceJP,
        ゴースト: ghostJP,
        ドラゴン: dragonJP,
        あく: darkJP
    },
    chinese: {
        草: grassZH,
        毒: poisonZH,
        火: fireZH,
        飞行: flyingZH,
        水: waterZH,
        虫: bugZH,
        一般: normalZH,
        电: electricZH,
        地面: groundZH,
        妖精: fairyZH,
        格斗: fightingZH,
        超能力: psychicZH,
        岩石: rockZH,
        钢: steelZH,
        冰: iceZH,
        幽灵: ghostZH,
        龙: dragonZH,
        恶: darkZH
    }
};

// Mapping des noms de types pour chaque langue
export const typeNames = {
    english: {
      NORMAL: 'NORMAL',
      FIRE: 'FIRE',
      WATER: 'WATER',
      ELECTRIC: 'ELECTRIC',
      GRASS: 'GRASS',
      ICE: 'ICE',
      FIGHTING: 'FIGHTING',
      POISON: 'POISON',
      GROUND: 'GROUND',
      FLYING: 'FLYING',
      PSYCHIC: 'PSYCHIC',
      BUG: 'BUG',
      ROCK: 'ROCK',
      GHOST: 'GHOST',
      DRAGON: 'DRAGON',
      DARK: 'DARK',
      STEEL: 'STEEL',
      FAIRY: 'FAIRY'
    },
    french: {
      NORMAL: 'NORMAL',
      FIRE: 'FEU',
      WATER: 'EAU',
      ELECTRIC: 'ÉLECTRIK',
      GRASS: 'PLANTE',
      ICE: 'GLACE',
      FIGHTING: 'COMBAT',
      POISON: 'POISON',
      GROUND: 'SOL',
      FLYING: 'VOL',
      PSYCHIC: 'PSY',
      BUG: 'INSECTE',
      ROCK: 'ROCHE',
      GHOST: 'SPECTRE',
      DRAGON: 'DRAGON',
      DARK: 'TÉNÈBRES',
      STEEL: 'ACIER',
      FAIRY: 'FÉE'
    },
    japanese: {
      NORMAL: 'ノーマル',
      FIRE: 'ほのお',
      WATER: 'みず',
      ELECTRIC: 'でんき',
      GRASS: 'くさ',
      ICE: 'こおり',
      FIGHTING: 'かくとう',
      POISON: 'どく',
      GROUND: 'じめん',
      FLYING: 'ひこう',
      PSYCHIC: 'エスパー',
      BUG: 'むし',
      ROCK: 'いわ',
      GHOST: 'ゴースト',
      DRAGON: 'ドラゴン',
      DARK: 'あく',
      STEEL: 'はがね',
      FAIRY: 'フェアリー'
    },
    chinese: {
      NORMAL: '一般',
      FIRE: '火',
      WATER: '水',
      ELECTRIC: '电',
      GRASS: '草',
      ICE: '冰',
      FIGHTING: '格斗',
      POISON: '毒',
      GROUND: '地面',
      FLYING: '飞行',
      PSYCHIC: '超能力',
      BUG: '虫',
      ROCK: '岩石',
      GHOST: '幽灵',
      DRAGON: '龙',
      DARK: '恶',
      STEEL: '钢',
      FAIRY: '妖精'
    }
  };

// Fonction pour obtenir l'icône du type dans la langue souhaitée
export const getTypeIcon = (type, language = 'french') => {
    // Si le type est déjà dans la bonne langue, on le retourne directement
    if (typeIcons[language][type]) {
        return typeIcons[language][type];
    }

    // Sinon, on cherche la traduction du type dans la langue souhaitée
    const translatedType = typeNames[language][type] || type;
    return typeIcons[language][translatedType] || typeIcons.english[type];
};

export default typeIcons; 