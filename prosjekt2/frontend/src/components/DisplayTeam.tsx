import CardComponent from './CardComponent';
import { useNavigate } from 'react-router-dom';
import '../styles/PokemonTeam.css';
import { useQuery } from '@apollo/client';
import { GET_TEAM } from '../graphql/queries';
import { Pokemon } from '../utils/constants';

function DisplayTeam() {
  const navigate = useNavigate();
  const id = localStorage.getItem('teamId');
  const { loading, data } = useQuery(GET_TEAM, {
    variables: { teamId: id}
  });

  if (loading) {
      return <div>Loading...</div>;
  }

  function changeToDetailPage(pokemon: Pokemon) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  return (
    <div className="teamContainer"> 
      <section className="pokemonTeamDisplayBox">
        {data?.getTeam.pokemon.map((pokemon: Pokemon) => (
          <article className="pokemonDisplayButton" key={pokemon.id} onClick={() => changeToDetailPage(pokemon)}>
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
          </article>
        ))}
      </section>
    </div>
  );
}

export default DisplayTeam;
