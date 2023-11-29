import { useMutation } from '@apollo/client';
import { CREATE_TEAM, DELETE_FROM_TEAM } from '../graphql/mutations';
import { Pokemon, Team } from '../utils/constants';
import { GET_TEAM } from '../graphql/queries';


interface TeamDatabaseFunctionProps {
  pokemon: Pokemon; 
  buttonText: string; 
  isButtonDisabled: boolean; 
  changeTeam: () => void; 
}

function TeamDatabaseFunction({
  pokemon,
  buttonText,
  isButtonDisabled,
  changeTeam,
}: TeamDatabaseFunctionProps) {
  // Retrieving or generating a unique team ID from local storage
  let teamId = localStorage.getItem('teamId');
  if (!teamId) {
    teamId = Math.random().toString(36).slice(2, 11);
    localStorage.setItem('teamId', teamId);
  }

  // Mutation hook for adding a Pokemon to the team
  const [createTeam] = useMutation(CREATE_TEAM, {
    update: (cache, { data: { createTeam } }) => {
      if (createTeam !== 'Team is full') {
        // Reading the existing team data from the cache
        const existingData = cache.readQuery<{ getTeam: Team }>({
          query: GET_TEAM,
          variables: { teamId: teamId },
        });

        if (existingData?.getTeam) {
          const currentTeam = existingData.getTeam;

          // Updating the team with the new Pokemon
          const updatedTeam: Team = {
            ...currentTeam,
            pokemon: [...currentTeam.pokemon, createTeam],
          };

          // Writing the updated team data back to the cache
          cache.writeQuery<{ getTeam: Team }>({
            query: GET_TEAM,
            variables: { teamId: teamId },
            data: { getTeam: updatedTeam },
          });
        }
      }
    },
  });

  // Mutation hook for deleting a Pokemon from the team
  const [pokemonDeleteFromTeam] = useMutation(DELETE_FROM_TEAM, {
    update: (cache, { data: { deletePokemonFromTeam } }) => {
      // Reading the existing team data from the cache
      const existingData = cache.readQuery<{ getTeam: Team }>({
        query: GET_TEAM,
        variables: { teamId: teamId },
      });

      if (existingData?.getTeam) {
        const currentTeam = existingData.getTeam;

        // Updating the team by removing the specified Pokemon
        const updatedPokemon = currentTeam.pokemon.filter(
          (poke) => poke.name !== deletePokemonFromTeam
        );

        const updatedTeam: Team = {
          ...currentTeam,
          pokemon: updatedPokemon,
        };

        // Writing the updated team data back to the cache
        cache.writeQuery<{ getTeam: Team }>({
          query: GET_TEAM,
          variables: { teamId: teamId },
          data: { getTeam: updatedTeam },
        });
      }
    },
  });

  // Function to add the current Pokemon to the team
  function AddTeamToDatabase() {
    createTeam({
      variables: {
        teamInput: {
          teamId: teamId,
          pokemon: {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types: pokemon.types,
            weight: pokemon.weight,
            height: pokemon.height,
            baseStats: {
              attack: pokemon.baseStats.attack,
              defense: pokemon.baseStats.defense,
              hp: pokemon.baseStats.hp,
              specialattack: pokemon.baseStats.specialattack,
              specialdefense: pokemon.baseStats.specialdefense,
              speed: pokemon.baseStats.speed,
            },
          },
        },
      },
    });
  }

  // Function to delete the current Pokemon from the team
  function DeletePokemonFromTeam() {
    pokemonDeleteFromTeam({ variables: { name: pokemon.name, teamId: teamId } });
  }

  // Rendering the button with appropriate styles and event handling
  return (
    <button
      style={
        buttonText === 'Add to Team'
          ? { backgroundColor: 'rgba(0, 255, 0, 0.8)' }
          : buttonText === 'Remove from Team'
          ? { backgroundColor: 'rgba(255, 0, 0, 0.8)' }
          : { backgroundColor: 'rgba(255, 255, 0, 0.5)' }
      }
      className="teamButton"
      onClick={(e) => {
        e.stopPropagation();
        // Depending on the button text, either add or remove the Pokemon from the team
        if (buttonText === 'Add to Team') {
          AddTeamToDatabase();
        } else if (buttonText === 'Remove from Team') {
          DeletePokemonFromTeam();
        }
        changeTeam();
      }}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </button>
  );
}

export default TeamDatabaseFunction;
