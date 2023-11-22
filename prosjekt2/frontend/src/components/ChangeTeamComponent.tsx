import { useState, useEffect } from 'react';
import TeamDatabaseFunction from './TeamDatabaseFunction';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  GET_TEAM,
  CHECK_POKEMON_IN_TEAM
} from '../graphql/queries';
import { Pokemon} from '../utils/constants';

function ChangeTeamComponent({pokemonTeam}: {pokemonTeam: Pokemon}) {
  const navigate = useNavigate()

  const [buttonText, setButtonText] = useState('Add to Team');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [teamSize, setTeamSize] = useState(0)
  const [check, setCheck] = useState(false)
  const [isUpdatingCheck, setIsUpdatingCheck] = useState(false);
  const id = localStorage.getItem('teamId');

  useEffect(() => {
    if (check) {
      setButtonText('Remove from Team');
    } else if (!check && teamSize == 6) {
      setButtonText('Team is full');
      setIsButtonDisabled(true);
    } else {
      setButtonText('Add to Team');
      setIsButtonDisabled(false);
    }
  }, [teamSize, check]);

  const { loading: loadingTeam, data: team, refetch: refetchTeam} = useQuery(GET_TEAM, {
    variables: { teamId: id},
  });
  
  const { loading: loadingCheck, data: checkData, refetch: refetchCheck} = useQuery(CHECK_POKEMON_IN_TEAM, {
    variables: { teamId: id, name: pokemonTeam.name},
  });

  if (loadingTeam || loadingCheck) {
      return <div>Loading...</div>;
  } 
  
  if (team && team.getTeam.pokemon.length != teamSize ) {
      setTeamSize(team.getTeam.pokemon.length)
      if (!isUpdatingCheck){
          setCheck(checkData.checkPokemonInTeam)
          setIsUpdatingCheck(true);
      }
  }

  async function changeTeam() {
      await refetchTeam({
        teamId: id,
      });

      await refetchCheck({
        teamId: id, 
        name: pokemonTeam.name,
      });
      setCheck(!check)

      navigate(`${location.pathname.replace('/project2', '')}`, { state: { pokemon: pokemonTeam } } );
  }

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
