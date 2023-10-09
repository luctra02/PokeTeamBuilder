import TypeComponent from "./TypeComponent";

interface pokemonObjectType {
  id: number;
  name: string;
  image: string
  types: readonly PokemonType[];

}

interface PokemonType {
  name: string;
}

function CardComponent(pokemonObject: pokemonObjectType) {
  return (
    <div className="pokemonCard">
      <h1>#{pokemonObject.id} {pokemonObject.name}</h1>
      <img src={pokemonObject.image} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent  key={index} pokemonType={type} />
        ))}
      </div>
    </div>
  );
}

export default CardComponent