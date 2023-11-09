import ChangeTeamComponent from './ChangeTeamComponent';
import TypeComponent from './TypeComponent';

interface PokemonObjectType {
  id: number;
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    specialattack: number;
    specialdefense: number;
  };
}



function CardComponent({pokemonObject}: {pokemonObject: PokemonObjectType}) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="pokemonCard">
      <h2>
       {capitalizeFirstLetter(pokemonObject.name)}
      </h2>
      <img src={pokemonObject.image} alt="" />
      <div className='pokemonID'>#{pokemonObject.id + 1000}</div>
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
      <ChangeTeamComponent
        pokemonTeam={{
          id: pokemonObject.id,
          name: pokemonObject.name,
          image: pokemonObject.image,
          types: pokemonObject.types,
          weight: pokemonObject.weight,
          height: pokemonObject.height,
          baseStats: pokemonObject.baseStats
        }}
      />
    </div>
  );
}

export default CardComponent;
