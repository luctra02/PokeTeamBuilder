import ChangeTeamComponent from "./ChangeTeamComponent";
import TypeComponent from "./TypeComponent";

interface PokemonObjectType {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface UpdateCountFunction {
  (newCount: number): void;
}


function CardComponent({pokemonObject, updateCount} : {pokemonObject: PokemonObjectType, updateCount?: UpdateCountFunction}) {
  return (
    <div className="pokemonCard">
      <h2>#{pokemonObject.id} {pokemonObject.name}</h2>
      <img src={pokemonObject.image} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
        <ChangeTeamComponent updateCount={updateCount} pokemonTeam={{num: pokemonObject.id, sprite: pokemonObject.image, types: pokemonObject.types, name: pokemonObject.name}} />
    </div>
  );
}

export default CardComponent;
