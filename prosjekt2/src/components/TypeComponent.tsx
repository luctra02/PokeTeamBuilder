
function TypeComponent({ pokemonType }: { pokemonType: string }) {
    let typeColor: string;

    switch (pokemonType) {
        case 'normal':
            typeColor = '#A8A878'; // Normal
            break;
        case 'fire':
            typeColor = '#F08030'; // Fire
            break;
        case 'water':
            typeColor = '#6890F0'; // Water
            break;
        case 'electric':
            typeColor = '#F8D030'; // Electric
            break;
        case 'grass':
            typeColor = '#78C850'; // Grass
            break;
        case 'ice':
            typeColor = '#98D8D8'; // Ice
            break;
        case 'fighting':
            typeColor = '#C03028'; // Fighting
            break;
        case 'poison':
            typeColor = '#A040A0'; // Poison
            break;
        case 'ground':
            typeColor = '#E0C068'; // Ground
            break;
        case 'flying':
            typeColor = '#A890F0'; // Flying
            break;
        case 'psychic':
            typeColor = '#F85888'; // Psychic
            break;
        case 'bug':
            typeColor = '#A8B820'; // Bug
            break;
        case 'rock':
            typeColor = '#B8A038'; // Rock
            break;
        case 'ghost':
            typeColor = '#705898'; // Ghost
            break;
        case 'dragon':
            typeColor = '#7038F8'; // Dragon
            break;
        case 'dark':
            typeColor = '#705848'; // Dark
            break;
        case 'steel':
            typeColor = '#B8B8D0'; // Steel
            break;
        case 'fairy':
            typeColor = '#EE99AC'; // Fairy
            break;
        default:
            typeColor = '#A8A8A8'; // Default to gray
    }
    return (
        <div>
          <div
            className="pokeType"
            style={{ backgroundColor: typeColor, padding: '10px', borderRadius: '5px' }}
          >
            {pokemonType}
          </div>
        </div>
      );
}

export default TypeComponent