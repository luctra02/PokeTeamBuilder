import TypeComponent from "./TypeComponent";

interface pokemonObjectType {
  id: string;
  name: string;
  sprites: string
  types: {
    type: {
      name: string;
    };
  }[];

}

function CardComponent(pokemonObject: pokemonObjectType) {
  return (
    <div className="pokemonCard">
      <h1>{pokemonObject.name}</h1>
      <img src={pokemonObject.sprites} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type) => (
          <TypeComponent pokemonType={type.type.name} />
        ))}
      </div>
    </div>
  );
}

export default CardComponent