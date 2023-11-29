import TypeComponent from './TypeComponent';
import ChangeTeamComponent from './ChangeTeamComponent';
import { Pokemon } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import StatComponent from './StatComponent';
import { IoArrowBackSharp } from "react-icons/io5";


function DetailsCardComponent({ pokemon }: { pokemon: Pokemon }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // JSX structure for the Pokemon details card
  return (
    <section className="pokemonInfo">
      {/* Button to navigate back to the previous page */}
      <button className="backButton" onClick={() => navigate(-1)}>
        <IoArrowBackSharp />
      </button>

      {/* Display Pokemon ID and name */}
      <h1>
        #{`${"0".repeat(4 - String(pokemon.id).length)}${pokemon.id}`} {capitalizeFirstLetter(pokemon.name)}
      </h1>

      {/* Wrapper for Pokemon information */}
      <div className="pokemonInfoWrapper">
        {/* Display Pokemon image */}
        <div className="pokeImage">
          <img src={pokemon.image} alt="" />
        </div>

        {/* Display Pokemon statistics */}
        <div className="pokeStats">
          {/* Display Pokemon weight and height */}
          <div className="bodyStats">
            <p>Weight: {pokemon.weight} kg</p>
            <p>Height: {pokemon.height} m</p>
          </div>

          {/* Display Pokemon types using TypeComponent */}
          <div className="pokeType">
            {pokemon.types.map((type, index) => (
              <TypeComponent key={index} pokemonType={type} />
            ))}
          </div>

          {/* Display Pokemon base stats using StatComponent */}
          <div className="baseStats">
            <StatComponent stats={pokemon.baseStats.attack} statName={"attack"} />
            <StatComponent stats={pokemon.baseStats.defense} statName={"defense"} />
            <StatComponent stats={pokemon.baseStats.hp} statName={"hp"} />
            <StatComponent stats={pokemon.baseStats.specialattack} statName={"special attack"} />
            <StatComponent stats={pokemon.baseStats.specialdefense} statName={"special defense"} />
            <StatComponent stats={pokemon.baseStats.speed} statName={"speed"} />
          </div>
        </div>
      </div>

      {/* Render the ChangeTeamComponent with Pokemon team information */}
      <ChangeTeamComponent
        pokemonTeam={{
          id: pokemon.id,
          image: pokemon.image,
          types: pokemon.types,
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height,
          baseStats: pokemon.baseStats,
        }}
      />
    </section>
  );
}

export default DetailsCardComponent;
