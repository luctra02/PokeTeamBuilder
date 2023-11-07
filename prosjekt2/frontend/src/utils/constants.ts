
export const types: string[] = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy'
  ];

export const sortBy: string[] =[
  'Name',
  'Weight',
  'Height',
  'Attack',
  'Defense',
  'HP',
  'Speed',
  'Special Attack',
  'Special Defense'
  
]

export type Attribute = 'id' | 'name' | 'weight' | 'height' | 'attack' | 'defense' | 'hp' | 'speed' | 'specialattack' | 'specialdefense';


export const typeColors: Record<string, string> = {
    Normal: '#A8A878',
    Fire: '#F08030',
    Water: '#6890F0',
    Electric: '#F8D030',
    Grass: '#78C850',
    Ice: '#98D8D8',
    Fighting: '#C03028',
    Poison: '#A040A0',
    Ground: '#E0C068',
    Flying: '#A890F0',
    Psychic: '#F85888',
    Bug: '#A8B820',
    Rock: '#B8A038',
    Ghost: '#705898',
    Dragon: '#7038F8',
    Dark: '#705848',
    Steel: '#B8B8D0',
    Fairy: '#EE99AC',
    Default: '#A8A8A8'
  };
  
