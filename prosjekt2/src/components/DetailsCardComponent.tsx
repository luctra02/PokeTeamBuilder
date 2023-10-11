import TypeComponent from "./TypeComponent";
import ChangeTeamComponent from "./ChangeTeamComponent";

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
  function roundToFive(num: number) {
    num = num * 150
    num = num / 255
    return Math.round(num / 5) * 5;
  }

  return (
    <div className="pokemonInfo">
      <h1>#{pokemon.num} {pokemon.key}</h1>
      <div className="pokemonInfoWrapper">
        <div className="pokeImage">
          <img src={pokemon.sprite} alt="" />
        </div>
        <div className="pokeStats">

          <div className="bodyStats">
              <p>Weight: {pokemon.weight} kg</p>
              <p>Height: {pokemon.height} m</p>
            </div>
            <div className="pokeType">
            {pokemon.types.map((type, index) => (
              <TypeComponent key={index} pokemonType={type} />
            ))}
          </div>
            <div className="baseStats">
                  <h3>Base Stats</h3>
                  <div className="stat-container">
                    <div id="attackFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[0])}px` }}></div>
                    </div>
                    <label htmlFor="attackFill">attack</label>
                  </div>

                  <div className="stat-container">
                    <div id="defenseFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[1])}px` }}></div>
                    </div>
                    <label htmlFor="defenseFill">defense</label>
                  </div>

                  <div className="stat-container">
                    <div id="hpFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[2])}px` }}></div>
                    </div>
                    <label htmlFor="hpFill">hp</label>
                  </div>

                  <div className="stat-container">
                    <div id="speedFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[5])}px` }}></div>
                    </div>
                    <label htmlFor="speedFill">speed</label>
                  </div>

                  <div className="stat-container">
                    <div id="specialAttackFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[3])}px` }}></div>
                    </div>
                    <label htmlFor="specialAttackFill">special attack</label>
                  </div>

                  <div className="stat-container">
                    <div id="specialDefenseFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${roundToFive(pokemon.baseStats[4])}px` }}></div>
                    </div>
                    <label htmlFor="specialDefenseFill">special defense</label>
                  </div>

            </div>
          </div>
        </div>
        <ChangeTeamComponent pokemonTeam={{ num: pokemon.num, sprite: pokemon.sprite, types: pokemon.types, name: pokemon.key, key: pokemon.key, weight:pokemon.weight, height: pokemon.height, baseStats: pokemon.baseStats }}/>
    </div>
  );
}

export default DetailsCardComponent;