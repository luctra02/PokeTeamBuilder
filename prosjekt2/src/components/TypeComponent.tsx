interface TypeComponentProps {
  pokemonType: string;
}

function TypeComponent({ pokemonType }: TypeComponentProps) {
    let typeColor: string;

    switch (pokemonType) {
        case 'Normal':
        typeColor = '#A8A878'; // Normal
        break;
        case 'Fire':
        typeColor = '#F08030'; // Fire
        break;
        case 'Water':
        typeColor = '#6890F0'; // Water
        break;
        case 'Electric':
        typeColor = '#F8D030'; // Electric
        break;
        case 'Grass':
        typeColor = '#78C850'; // Grass
        break;
        case 'Ice':
        typeColor = '#98D8D8'; // Ice
        break;
        case 'Fighting':
        typeColor = '#C03028'; // Fighting
        break;
        case 'Poison':
        typeColor = '#A040A0'; // Poison
        break;
        case 'Ground':
        typeColor = '#E0C068'; // Ground
        break;
        case 'Flying':
        typeColor = '#A890F0'; // Flying
        break;
        case 'Psychic':
        typeColor = '#F85888'; // Psychic
        break;
        case 'Bug':
        typeColor = '#A8B820'; // Bug
        break;
        case 'Rock':
        typeColor = '#B8A038'; // Rock
        break;
        case 'Ghost':
        typeColor = '#705898'; // Ghost
        break;
        case 'Dragon':
        typeColor = '#7038F8'; // Dragon
        break;
        case 'Dark':
        typeColor = '#705848'; // Dark
        break;
        case 'Steel':
        typeColor = '#B8B8D0'; // Steel
        break;
        case 'Fairy':
        typeColor = '#EE99AC'; // Fairy
        break;
        default:
        typeColor = '#A8A8A8'; // Default to gray
    }
    return (
        <div>
          <div
            className="pokeType PokeTypeBox"
            style={{ backgroundColor: typeColor }}
          >
            {pokemonType}
          </div>
        </div>
      );
}

export default TypeComponent