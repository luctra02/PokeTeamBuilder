import CardComponent from './CardComponent';
import updateCount from './DisplayCardComponents';
import { useNavigate } from 'react-router-dom';

interface PokemonObject {
  num: number;
  sprite: string;
  types: string[];
  key: string;
  weight: number;
  height: number;
  baseStats: number[];
}

function DisplayTeam() {
  const team = JSON.parse(localStorage.getItem('team') || '[]');
  const navigate = useNavigate();

  function changeToDetailPage(pokemon: PokemonObject) {
    navigate('/pokemonInfo/${pokemon.num}', { state: { pokemon } });
    console.log(team);
    console.log(pokemon.num);
  }

  return (
    <>
      <div className="pokemonDisplayBox">
        {team.map((pokemon: PokemonObject) => (
          <div className="pokemonDisplayButton" key={pokemon.num} onClick={() => changeToDetailPage(pokemon)}>
            <CardComponent
              pokemonObject={{
                id: pokemon.num,
                name: pokemon.key,
                image: pokemon.sprite,
                types: pokemon.types,
                baseStats: pokemon.baseStats,
                weight: pokemon.weight,
                height: pokemon.height,
                key: pokemon.key,
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
