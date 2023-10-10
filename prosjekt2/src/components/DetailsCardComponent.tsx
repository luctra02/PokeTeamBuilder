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
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[0] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="attackFill">attack</label>
                  </div>

                  <div className="stat-container">
                    <div id="defenseFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[1] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="defenseFill">defense</label>
                  </div>

                  <div className="stat-container">
                    <div id="hpFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[2] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="hpFill">hp</label>
                  </div>

                  <div className="stat-container">
                    <div id="speedFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[5] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="speedFill">speed</label>
                  </div>

                  <div className="stat-container">
                    <div id="specialAttackFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[3] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="specialAttackFill">special attack</label>
                  </div>

                  <div className="stat-container">
                    <div id="specialDefenseFill" className="fill-bar-container">
                      <div className="fill-bar" style={{ height: `${Math.round(pokemon.baseStats[4] / 255 * 255 / 10) * 5}px` }}></div>
                    </div>
                    <label htmlFor="specialDefenseFill">special defense</label>
                  </div>

            </div>
          </div>
        </div>
    </div>
  );
}

export default DetailsCardComponent;