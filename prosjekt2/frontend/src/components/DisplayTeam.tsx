import CardComponent from './CardComponent';
import updateCount from './DisplayCardComponents';
import { useNavigate } from 'react-router-dom';

interface PokemonObject {
  id: number;
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    specialattack: number;
    specialdefense: number;
  };
}

function DisplayTeam() {
  const team = JSON.parse(localStorage.getItem('team') || '[]');
  const navigate = useNavigate();

  function changeToDetailPage(pokemon: PokemonObject) {
    navigate('/pokemonInfo/${pokemon.num}', { state: { pokemon } });
  }

  return (
    <>
      <div className="pokemonDisplayBox">
        {team.map((pokemon: PokemonObject) => (
          <div className="pokemonDisplayButton" key={pokemon.id} onClick={() => changeToDetailPage(pokemon)}>
            <CardComponent
              pokemonObject={{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
                baseStats: pokemon.baseStats,
                weight: pokemon.weight,
                height: pokemon.height,

              }}
              updateCount={updateCount}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayTeam;
