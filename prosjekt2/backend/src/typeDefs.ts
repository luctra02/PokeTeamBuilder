export const typeDefs = `#graphql
  type Pokemon{
    id: Int
    name: String
    image: String
    types: [String]
    weight: Float
    height: Float
    baseStats: BaseStats
  }

  type PokemonResult {
    pokemons: [Pokemon]
    count: Int
}

  type BaseStats{
    attack: Int
    defense: Int
    hp: Int
    speed: Int
    specialattack: Int
    specialdefense: Int
  }

  type Team{
    teamId: String
    pokemon: [Pokemon]
  }

  type FilteredTypes {
    types: [String]
  }

  input PokemonInput{
    id: Int
    name: String
    image: String
    types: [String]
    weight: Float
    height: Float
    baseStats: BaseStatsInput
  }

  input BaseStatsInput{
    attack: Int
    defense: Int
    hp: Int
    speed: Int
    specialattack: Int
    specialdefense: Int
  }

  input TeamInput{
    teamId: String
    pokemon: [PokemonInput]
  }

  type Query {
    getPokemon(name: String!): [Pokemon]
    getPokemons(offset:Int!, limit: Int!, search: String, sort: String, type: String): PokemonResult
    getTeam(teamId: ID!): Team
    getTypes(search: String, type: String): FilteredTypes!
    checkPokemonInTeam(teamId: ID!, name: String!): Boolean
  }

  type Mutation{
    addPokemon(pokemonInput: PokemonInput): String!
    deletePokemonFromTeam(name: String!, teamId: ID!): String!
    createTeam(teamInput: TeamInput): String!
  }
`;