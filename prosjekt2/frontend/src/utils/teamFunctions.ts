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

function addPokemonToTeam(pokemon: Pokemon) {
  //localStorage.clear(); //reset localStorage
  const teamJSON = localStorage.getItem('team');
  const myTeam = teamJSON ? JSON.parse(teamJSON) : [];
  const newPokemon = {
    id: pokemon.id,
    image: pokemon.image,
    types: pokemon.types,
    name: pokemon.name,
    baseStats: pokemon.baseStats,
    weight: pokemon.weight,
    height: pokemon.height,
  };
  myTeam.push(newPokemon);
  const updatedTeam = JSON.stringify(myTeam);
  localStorage.setItem('team', updatedTeam);

}

function removePokemonFromTeam(id: number) {
  const teamJSON = localStorage.getItem('team');
  const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
  const index = myTeam.findIndex((pokemon) => pokemon.id == id);
  if (index != -1) {
    myTeam.splice(index, 1);
    const updatedTeam = JSON.stringify(myTeam);
    localStorage.setItem('team', updatedTeam);
  }
}

function checkPokemonInTeam(id: number) {
  const teamJSON = localStorage.getItem('team');
  const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
  const index = myTeam.findIndex((pokemon) => pokemon.id == id);
  if (index != -1) {
    return true;
  } else {
    return false;
  }
}

function getTeamSize() {
  const teamJSON = localStorage.getItem('team');
  const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
  return myTeam.length;
}

function checkIfTeamIsFull() {
  if (getTeamSize() >= 6) {
    return true;
  }
  return false;
}

export { checkPokemonInTeam, addPokemonToTeam, removePokemonFromTeam, getTeamSize, checkIfTeamIsFull };
