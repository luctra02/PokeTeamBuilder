import { Pokemon } from '../utils/constants';
import ChangeTeamComponent from './ChangeTeamComponent';
import TypeComponent from './TypeComponent';

function CardComponent({pokemonObject}: {pokemonObject: Pokemon}) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <article className="pokemonCard">
      <h2>
       {capitalizeFirstLetter(pokemonObject.name)}
      </h2>
      <img src={pokemonObject.image} alt="" />
      <div className='pokemonID'>#{`${"0".repeat(4 - String(pokemonObject.id).length)}${pokemonObject.id}`}</div>
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
    </article>
  );
}

export default CardComponent;
