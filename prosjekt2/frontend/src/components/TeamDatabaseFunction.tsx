import { gql, useMutation } from '@apollo/client';

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

interface TeamDatabaseFunctionProps {
  pokemon: Pokemon;
  buttonText: string;
  isButtonDisabled: boolean;
  changeTeam: Function;
}

  const CREATE_TEAM = gql`
  mutation CreateTeam($teamInput: TeamInput) {
    createTeam(teamInput: $teamInput)
  }
`;

const DELETE_FROM_TEAM = gql`
  mutation deletePokemon($name: String!, $teamId: ID!) {
    deletePokemonFromTeam(name: $name, teamId: $teamId)
  }
`;

function TeamDatabaseFunction({pokemon, buttonText, isButtonDisabled, changeTeam}: TeamDatabaseFunctionProps)  {
  const [createTeam] = useMutation(CREATE_TEAM);
  const [pokemonDeleteFromTeam] = useMutation(DELETE_FROM_TEAM);
  let teamId = localStorage.getItem('teamId');
  //localStorage.clear();


  function AddTeamToDatabase() {


    if (!teamId) {
      // Generate a random teamId
      teamId = Math.random().toString(36).slice(2, 11); // Using slice to get a substring of 9 characters
  
      // Set the new teamId in localStorage
      localStorage.setItem('teamId', teamId);
    }

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
        changeTeam(pokemon);
      }}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </button>
  );
}

export default TeamDatabaseFunction;
