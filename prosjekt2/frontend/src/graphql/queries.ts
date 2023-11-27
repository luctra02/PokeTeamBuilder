import { gql} from '@apollo/client';

export const GET_TEAM = gql`
query GetTeam($teamId: ID!) {
  getTeam(teamId: $teamId) {
    pokemon {
      id
      name
      image
      types
      weight
      height
      baseStats {
        attack
        defense
        hp
        speed
        specialattack
        specialdefense
      }
    }
    teamId
  }
}`;

export const CHECK_POKEMON_IN_TEAM = gql`
query Query($teamId: ID!, $name: String!) {
  checkPokemonInTeam(teamId: $teamId, name: $name)
}`;

export const GET_POKEMONS = gql`
query GetPokemons($offset: Int!, $limit: Int!, $search: String, $sort: String, $type: String, $sortOrder: String) {
  getPokemons(offset: $offset, limit: $limit, search: $search, sort: $sort, type: $type, sortOrder: $sortOrder) {
    count
    pokemons {
      name
      baseStats {
        attack
        defense
        hp
        speed
        specialattack
        specialdefense
      }
      height
      id
      image
      types
      weight
    }
  }
}`;

export const GET_TYPES = gql`query GetTypes($search: String, $type: String) {
  getTypes(search: $search, type: $type) {
    types
  }
}`