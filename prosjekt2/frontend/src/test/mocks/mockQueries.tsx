import { CHECK_POKEMON_IN_TEAM, GET_TEAM, GET_POKEMONS } from '../../graphql/queries';
import { CREATE_TEAM } from '../../graphql/mutations';

const getPokemonsMock = {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 16,
        offset: 0,
        search: "",
        sort: "id",
        type: "",
        sortOrder: "asc"
      },
    },
    result: {
      data: {
        getPokemons: {
          count: 2,
          pokemons: [
            {
                id: 25,
                name: 'pikachu',
                image: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
                types: ['Electric'],
                weight: 6,
                height: 0.4,
                baseStats: {
                    attack: 55,
                    defense: 40,
                    hp: 35,
                    speed: 90,
                    specialattack: 50,
                    specialdefense: 50
                }
            },
            {
              id: 398,
              name: 'staraptor',
              image: 'https://play.pokemonshowdown.com/sprites/ani/staraptor.gif',
              types: ['Normal', 'Flying'],
              weight: 24.9,
              height: 1.2,
              baseStats: {
                  attack: 120,
                  defense: 70,
                  hp: 85,
                  speed: 100,
                  specialattack: 50,
                  specialdefense: 60
              }
          }
          ],
        },
      },
    },
  };

  const getTeamMock = 
  {
    request: {
      query: GET_TEAM,
      variables: {
        teamId: "8fpgpxy2x"
       },
    },
    result: {
      data: {
        getTeam:{
          pokemon: [
            {
                id: 25,
                name: 'pikachu',
                image: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
                types: ['Electric'],
                weight: 6,
                height: 0.4,
                baseStats: {
                    attack: 55,
                    defense: 40,
                    hp: 35,
                    speed: 90,
                    specialattack: 50,
                    specialdefense: 50
                }
            },
          ],
          teamId: "8fpgpxy2x",
        }
      },
    },
  };

  const createTeamMock = {
    request: {
      query: CREATE_TEAM,
      variables: {
        teamInput: {
          pokemon: [
            {
                id: 25,
                name: 'pikachu',
                image: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
                types: ['Electric'],
                weight: 6,
                height: 0.4,
                baseStats: {
                    attack: 55,
                    defense: 40,
                    hp: 35,
                    speed: 90,
                    specialattack: 50,
                    specialdefense: 50
                }
            },
          ],
          teamId: "8fpgpxy2x"
        },
      },
      result: {
        data: {
            getTeam: {
                teamId: "8fpgpxy2x"
            }
        }
    }
    },
  };

const checkPikachuTrueMock = {
    request: {
      query: CHECK_POKEMON_IN_TEAM,
      variables: {
        teamId: "8fpgpxy2x",
        name: 'pikachu'
      },
    },
    result: {
        data: {
            checkPokemonInTeam: {
                boolean: true
            }
        }
    }
}

const checkPikachuFalseMock = {
    request: {
      query: CHECK_POKEMON_IN_TEAM,
      variables: {
        teamId: "8fpgpxy2x",
        name: 'pikachu'
      },
    },
    result: {
        data: {
            checkPokemonInTeam: {
                boolean: false
            }
        }
    }
}

const checkStaraptorTrueMock = {
  request: {
    query: CHECK_POKEMON_IN_TEAM,
    variables: {
      teamId: "8fpgpxy2x",
      name: 'staraptor'
    },
  },
  result: {
      data: {
          checkPokemonInTeam: {
              boolean: true
          }
      }
  }
}

const checkStaraptorFalseMock = {
  request: {
    query: CHECK_POKEMON_IN_TEAM,
    variables: {
      teamId: "8fpgpxy2x",
      name: 'staraptor'
    },
  },
  result: {
      data: {
          checkPokemonInTeam: {
              boolean: false
          }
      }
  }
}




  
const allMocks = [getPokemonsMock, getTeamMock, createTeamMock, checkPikachuFalseMock, checkPikachuTrueMock, checkStaraptorFalseMock, checkStaraptorTrueMock]
export { allMocks, getPokemonsMock };