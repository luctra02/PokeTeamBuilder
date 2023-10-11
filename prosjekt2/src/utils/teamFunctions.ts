interface Pokemon {
    num: number;
    sprite: string;
    types: string[];
    name: string;

  }

function addPokemonToTeam(pokemon: Pokemon){
    //localStorage.clear(); //reset localStorage
    const teamJSON = localStorage.getItem('team');
    const myTeam = teamJSON ? JSON.parse(teamJSON) : [];
    const newPokemon = {
        num: pokemon.num,
        sprite: pokemon.sprite,
        types: pokemon.types,
        name: pokemon.name,
      };
    
    myTeam.push(newPokemon)
    const updatedTeam = JSON.stringify(myTeam);
    localStorage.setItem('team', updatedTeam);

    console.log('Updated Team:', myTeam);

}

function removePokemonFromTeam(id: number) {
    const teamJSON = localStorage.getItem('team');
    const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
    const index = myTeam.findIndex((pokemon) => pokemon.num == id);
    if (index != -1) {
      myTeam.splice(index, 1);
      const updatedTeam = JSON.stringify(myTeam);
      localStorage.setItem('team', updatedTeam);
    }
    console.log('Updated Team:', myTeam);
  }

function checkPokemonInTeam(id:number) {
    const teamJSON = localStorage.getItem('team');
    const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
    const index = myTeam.findIndex((pokemon) => pokemon.num == id);
    if (index != -1) {
        return true;
    } else {
        return false;
    }
}

function getTeamSize(){
    const teamJSON = localStorage.getItem('team');
    const myTeam: Pokemon[] = teamJSON ? JSON.parse(teamJSON) : [];
    return myTeam.length;
}

function checkIfTeamIsFull(){
    if (getTeamSize() >= 6){
        return true
    }
    return false
}

export { checkPokemonInTeam, addPokemonToTeam, removePokemonFromTeam, getTeamSize, checkIfTeamIsFull };