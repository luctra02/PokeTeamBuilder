import ChangeTeamComponent from './ChangeTeamComponent';
import TypeComponent from './TypeComponent';

interface PokemonObjectType {
  id: number;
  name: string;
  image: string;
  types: string[];
  key: string;
  weight: number;
  height: number;
  baseStats: number[];
}

interface UpdateCountFunction {
  (newCount: number): void;
}

function CardComponent({
  pokemonObject,
  updateCount,
}: {
  pokemonObject: PokemonObjectType;
  updateCount?: UpdateCountFunction;
}) {
  return (
    <div className="pokemonCard">
      <h2>
        #{pokemonObject.id} {pokemonObject.name}
      </h2>
      <img src={pokemonObject.image} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
      <ChangeTeamComponent
        updateCount={updateCount}
        pokemonTeam={{
          num: pokemonObject.id,
          sprite: pokemonObject.image,
          types: pokemonObject.types,
          name: pokemonObject.name,
          baseStats: pokemonObject.baseStats,
          key: pokemonObject.key,
          weight: pokemonObject.weight,
          height: pokemonObject.height,
        }}
      />
    </div>
  );
}

export default CardComponent;
