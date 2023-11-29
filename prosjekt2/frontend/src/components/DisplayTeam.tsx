import CardComponent from './CardComponent';
import { useNavigate } from 'react-router-dom';
import '../styles/PokemonTeam.css';
import { useQuery } from '@apollo/client';
import { GET_TEAM } from '../graphql/queries';
import { Pokemon } from '../utils/constants';

function DisplayTeam() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Retrieve the team ID from local storage
  const id = localStorage.getItem('teamId');

  // GraphQL query to get team information
  const { loading, data } = useQuery(GET_TEAM, {
    variables: { teamId: id }
  });

  // Loading state check
  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to navigate to the details page of a specific Pokemon
  function changeToDetailPage(pokemon: Pokemon) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  // JSX structure for displaying the team
  return (
    <div className="teamContainer"> 
      <section className="pokemonTeamDisplayBox">
        {/* Map through the team's Pokemon and display each in a card */}
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
