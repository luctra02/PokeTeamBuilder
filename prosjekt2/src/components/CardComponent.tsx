import TypeComponent from "./TypeComponent";

interface pokemonObjectType {
  id: string;
  name: string;
  image: string
  types: string[];

}

function CardComponent(pokemonObject: pokemonObjectType) {
  return (
    <div className="pokemonCard">
      <h1>#{pokemonObject.id} {pokemonObject.name}</h1>
      <img src={pokemonObject.image} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type) => (
          <TypeComponent pokemonType={type} />
        ))}
      </div>
    </div>
  );
}

export default CardComponent