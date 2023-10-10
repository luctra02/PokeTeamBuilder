import TypeComponent from "./TypeComponent";

interface Pokemon {
  num: number;
  sprite: string;
  types: string[];
  key: string;
  weight: number;
  height: number;
  baseStats: number[];
}

function DetailsCardComponent({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="pokemonCard">
      <h1>#{pokemon.num} {pokemon.key}</h1>
      <img src={pokemon.sprite} alt="" />
      <div className="pokeType">
        {pokemon.types.map((type, index) => (
          <TypeComponent key={index} pokemonType={type} />
        ))}
      </div>
      <div>
        <p>Weight: {pokemon.weight} kg</p>
        <p>Height: {pokemon.height} m</p>
      </div>
      <div className="baseStats">
            <h3>Base Stats</h3>
            <p>attack: {pokemon.baseStats[0]}</p>
            <p>defense: {pokemon.baseStats[1]}</p>
            <p>hp: {pokemon.baseStats[2]}</p>
            <p>speed: {pokemon.baseStats[5]}</p>
            <p>specialattack: {pokemon.baseStats[3]}</p>
            <p>specialdefense: {pokemon.baseStats[4]}</p>
      </div>
    </div>
  );
}

export default DetailsCardComponent;