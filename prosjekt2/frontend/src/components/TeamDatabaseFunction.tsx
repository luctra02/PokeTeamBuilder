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

function TeamDatabaseFunction({pokemon, buttonText, isButtonDisabled, changeTeam}: TeamDatabaseFunctionProps)  {
  let teamId = localStorage.getItem('teamId');
  if (!teamId) {
    teamId = Math.random().toString(36).slice(2, 11); 
    localStorage.setItem('teamId', teamId);
  }

  const [createTeam] = useMutation(CREATE_TEAM, {
    update: (cache, { data: { createTeam } }) => {
      if (createTeam !== 'Team is full') {
        const existingData = cache.readQuery<{ getTeam: Team }>({
          query: GET_TEAM,
          variables: { teamId: teamId },
        });
  
        if (existingData?.getTeam) {
          const currentTeam = existingData.getTeam;
  
          const updatedTeam: Team = {
            ...currentTeam,
            pokemon: [...currentTeam.pokemon, createTeam],
          };
  
          cache.writeQuery<{ getTeam: Team }>({
            query: GET_TEAM,
            variables: { teamId: teamId },
            data: { getTeam: updatedTeam },
          });
        }
      }
    },
  });
  
  

  const [pokemonDeleteFromTeam] = useMutation(DELETE_FROM_TEAM, {
    update: (cache, { data: { deletePokemonFromTeam } }) => {
      const existingData = cache.readQuery<{ getTeam: Team }>({
        query: GET_TEAM,
        variables: { teamId: teamId },
      });
  
      if (existingData?.getTeam) {
        const currentTeam = existingData.getTeam;
  
        const updatedPokemon = currentTeam.pokemon.filter(
          (poke) => poke.name !== deletePokemonFromTeam
        );
        
        const updatedTeam: Team = {
          ...currentTeam,
          pokemon: updatedPokemon,
        };
        
        cache.writeQuery<{ getTeam: Team }>({
          query: GET_TEAM,
          variables: { teamId: teamId },
          data: { getTeam: updatedTeam },
        });
        
      }
    },
  });
  
  
  function AddTeamToDatabase() {
    createTeam({ 
      variables: { 
        teamInput: { 
          teamId: teamId, pokemon: { 
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
              speed: pokemon.baseStats.speed
            }, 
          }
        }
      }                               
    });
  }

  function DeletePokemonFromTeam() {
    pokemonDeleteFromTeam({ variables:  {
      name: pokemon.name,
      teamId: teamId
     } });
  }

  return (
    <button
      className="teamButton"
      onClick={(e) => {
        e.stopPropagation();
        if (buttonText == 'Add to Team') {
          AddTeamToDatabase();
        } else if (buttonText == 'Remove from Team') {
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
