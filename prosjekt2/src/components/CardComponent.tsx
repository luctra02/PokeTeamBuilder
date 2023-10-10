import TypeComponent from "./TypeComponent";

interface PokemonObjectType {
  id: number;
  name: string;
  image: string;
  types: string[];
}

function CardComponent(pokemonObject: PokemonObjectType ) {
  return (
    <div className="pokemonCard">
      <h1>#{pokemonObject.id} {pokemonObject.name}</h1>
      <img src={pokemonObject.image} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
    </div>
  );
}

export default CardComponent;
