import { useState, useEffect } from 'react';
import TeamDatabaseFunction from './TeamDatabaseFunction';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  GET_TEAM,
  CHECK_POKEMON_IN_TEAM
} from '../graphql/queries';
import { Pokemon} from '../utils/constants';

function ChangeTeamComponent({ pokemonTeam }: { pokemonTeam: Pokemon }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State variables for button text, button disabled state, team size, check status, and update check status
  const [buttonText, setButtonText] = useState('Add to Team');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [teamSize, setTeamSize] = useState(0);
  const [check, setCheck] = useState(false);
  const [isUpdatingCheck, setIsUpdatingCheck] = useState(false);

  // Retrieve team ID from local storage
  const id = localStorage.getItem('teamId');

  // Effect hook to update button text and disabled state based on team size and check status
  useEffect(() => {
    if (check) {
      setButtonText('Remove from Team');
    } else if (!check && teamSize === 6) {
      setButtonText('Team is full');
      setIsButtonDisabled(true);
    } else {
      setButtonText('Add to Team');
      setIsButtonDisabled(false);
    }
  }, [teamSize, check]);

  // GraphQL query to get team information
  const { loading: loadingTeam, data: team, refetch: refetchTeam } = useQuery(GET_TEAM, {
    variables: { teamId: id },
  });

  // GraphQL query to check if the Pokemon is in the team
  const { loading: loadingCheck, data: checkData, refetch: refetchCheck } = useQuery(CHECK_POKEMON_IN_TEAM, {
    variables: { teamId: id, name: pokemonTeam.name },
  });

  // Loading state check
  if (loadingTeam || loadingCheck) {
    return <div>Loading...</div>;
  }

  // If team information is available and team size is not updated, update the team size and check status
  if (team && team.getTeam.pokemon.length !== teamSize) {
    setTeamSize(team.getTeam.pokemon.length);
    if (!isUpdatingCheck) {
      setCheck(checkData.checkPokemonInTeam);
      setIsUpdatingCheck(true);
    }
  }

  // Function to handle changes to the team (add/remove Pokemon)
  async function changeTeam() {
    // Refetch team information
    await refetchTeam({
      teamId: id,
    });

    // Refetch check status for the Pokemon in the team
    await refetchCheck({
      teamId: id,
      name: pokemonTeam.name,
    });

    // Toggle the check status
    setCheck(!check);

    // Navigate to the previous location with the updated Pokemon information
    navigate(`${location.pathname.replace('/project2', '')}`, { state: { pokemon: pokemonTeam } });
  }

  // Render the TeamDatabaseFunction component with the necessary props
  return (
    <TeamDatabaseFunction
      pokemon={pokemonTeam}
      buttonText={buttonText}
      isButtonDisabled={isButtonDisabled}
      changeTeam={changeTeam}
    />
  );
}

export default ChangeTeamComponent;
