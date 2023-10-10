import TypeComponent from "./TypeComponent";


interface PokemonObject {
    num: number;
    sprite: string;
    types: string[];
    key: string;
    weight: number;
    height: number;
    baseStats: number[]
  }

function DetailsCardComponent(pokemonObject: PokemonObject ) {
  return (
    <div className="pokemonCard">
      <h1>#{pokemonObject.num} {pokemonObject.key}</h1>
      <img src={pokemonObject.sprite} alt="" />
      <div className="pokeType">
        {pokemonObject.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
      <div>
        <p>Weight: {pokemonObject.weight} kg</p>
        <p>Height: {pokemonObject.height} m</p>
      </div>
      <div className="baseStats">
            <h3>Base Stats</h3>
            <p>attack: {pokemonObject.baseStats[0]}</p>
            <p>defense: {pokemonObject.baseStats[1]}</p>
            <p>hp: {pokemonObject.baseStats[2]}</p>
            <p>speed: {pokemonObject.baseStats[5]}</p>
            <p>specialattack: {pokemonObject.baseStats[3]}</p>
            <p>specialdefense: {pokemonObject.baseStats[4]}</p>
      </div>
    </div>
  );
}

export default DetailsCardComponent;
