import { useState, useEffect } from 'react';
import {
  addPokemonToTeam,
  checkIfTeamIsFull,
  checkPokemonInTeam,
  getTeamSize,
  removePokemonFromTeam,
} from '../utils/teamFunctions';
import TeamDatabaseFunction from './TeamDatabaseFunction';
import { useNavigate } from 'react-router-dom';

interface Pokemon {
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



function ChangeTeamComponent({pokemonTeam}: {pokemonTeam: Pokemon}) {
  const navigate = useNavigate()

  const [buttonText, setButtonText] = useState('Add to Team');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const teamSize = getTeamSize();
  useEffect(() => {
    const exists = checkPokemonInTeam(pokemonTeam.id);
    if (exists) {
      setButtonText('Remove from Team');
    } else if (!exists && checkIfTeamIsFull()) {
      setButtonText('Team is full');
      setIsButtonDisabled(true);
    } else {
      setButtonText('Add to Team');
      setIsButtonDisabled(false);
    }
  }, [teamSize, pokemonTeam.id]);

  function changeTeam(pokemon: Pokemon) {
    const exists = checkPokemonInTeam(pokemon.id);
    if (exists) {
      removePokemonFromTeam(pokemon.id);
      setButtonText('Add to Team');
      if (getTeamSize() == 5 && location.pathname == '/project2') {
        navigate('/');
      }
    } else if (!checkIfTeamIsFull()) {
      addPokemonToTeam(pokemon);
      setButtonText('Remove from Team');
      if (getTeamSize() == 6 && location.pathname == '/project2') {
        navigate('/');
      }
    }
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
