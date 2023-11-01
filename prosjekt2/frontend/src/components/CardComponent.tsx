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
