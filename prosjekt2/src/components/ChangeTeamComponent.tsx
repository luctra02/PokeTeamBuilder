import { useState, useEffect } from "react";
import { addPokemonToTeam, checkIfTeamIsFull, checkPokemonInTeam, getTeamSize, removePokemonFromTeam } from "../utils/teamFunctions";


interface Pokemon {
    num: number;
    sprite: string;
    types: string[];
    name: string;
  }
  
interface UpdateCountFunction {
  (newCount: number): void;
}
  
  function ChangeTeamComponent( { pokemonTeam, updateCount }: { pokemonTeam: Pokemon, updateCount?: UpdateCountFunction }) {
    const [buttonText, setButtonText] = useState('Add to Team');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const teamSize = getTeamSize()
    useEffect(() => {
      const exists = checkPokemonInTeam(pokemonTeam.num);
      if (exists) {
        setButtonText('Remove from Team');
      } else if(!exists && checkIfTeamIsFull()){
        setButtonText('Team is full')
        setIsButtonDisabled(true);
      } else {
        setButtonText('Add to Team')
        setIsButtonDisabled(false);
      }
      
    }, [teamSize, pokemonTeam.num]);

    function changeTeam(pokemon: Pokemon){
        const exists = checkPokemonInTeam(pokemon.num);
        if(exists) {
          removePokemonFromTeam(pokemon.num);
          setButtonText('Add to Team')
          if (getTeamSize() == 5 && updateCount) {
            updateCount(getTeamSize())
          } 
        } else if(!checkIfTeamIsFull()){
          addPokemonToTeam(pokemon)
          setButtonText('Remove from Team')
          if (getTeamSize() == 6 && updateCount) {
            updateCount(getTeamSize())
          } 
        }
      }  

      return (
        <button className="teamButton" onClick={(e) => { e.stopPropagation(); changeTeam(pokemonTeam);}} disabled={isButtonDisabled}> {buttonText}</button>
        );
  }
  
  export default ChangeTeamComponent