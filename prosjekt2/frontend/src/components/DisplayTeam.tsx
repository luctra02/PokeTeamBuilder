import { FetchTeam } from '../assets/TeamDatabase';
import CardComponent from './CardComponent';
import { useNavigate } from 'react-router-dom';
import '../styles/PokemonTeam.css';

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
  const navigate = useNavigate();
  const storedTeam = sessionStorage.getItem('team')
  const team: PokemonObject[] = storedTeam ? JSON.parse(storedTeam) : [];
  
  function changeToDetailPage(pokemon: PokemonObject) {
    navigate('/pokemonInfo/${pokemon.num}', { state: { pokemon } });
  }

  return (
    <div className="teamContainer"> 
    <div className="pokemonTeamDisplayBox">
      {!sessionStorage.getItem('team') && <FetchTeam/>}
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
          />
        </div>
      ))}
    </div>
    </div>
  );
}

export default DisplayTeam;
