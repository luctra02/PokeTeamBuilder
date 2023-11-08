import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone';
import { connect } from 'mongoose';
import { Pokemon, Team }  from '../models/pokemonAndTeam.js';


const MONGODB = "mongodb://it2810-28.idi.ntnu.no:27017/PokeTeamBuilder";


const typeDefs = `#graphql
  type Pokemon{
    id: Int
    name: String
    image: String
    types: [String]
    weight: Float
    height: Float
    baseStats: BaseStats
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
    getPokemons(limit: Int): [Pokemon]
    getTeam(teamId: ID): Team
  }

  type Mutation{
    addPokemon(pokemonInput: PokemonInput): String!
    deletePokemonFromTeam(name: String!, teamId: ID!): String!
    createTeam(teamInput: TeamInput): String!
  }
`;

const resolvers = {
  Query:{
      async getPokemon(_, { name }){
        const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
        return await Pokemon.find({ name: { $regex: regex } });
      },
      async getPokemons(_, { limit }){
        return await Pokemon.find().sort({id:1}).limit(limit);
      },
      async getTeam(_, { teamId }) {
        const team = await Team.findOne({ teamId: teamId });
        if (!team) {
          throw new Error('Team not found.');
        }
        return team
      }
  },
  Mutation:{
    async addPokemon(_, {pokemonInput: {id, name, image, types, weight, height, baseStats}} ){
        const res = await new Pokemon({id, name, image, types, weight, height, baseStats}).save();
        return res._id;
    },
    async deletePokemonFromTeam(_, { name, teamId }) {
      try {
        const team = await Team.findOne({ teamId: teamId });
        if (!team) {
          throw new Error('Team not found.');
        }
        team.pokemon = team.pokemon.filter(pokemon => pokemon.name != name);
        if (team.pokemon.length == 0) {
          await Team.findOneAndDelete({ teamId: teamId });
        } else {
          await team.save();
        }
        return name;
      } catch (error) {
        throw new Error(`Failed to delete the Pokemon: ${error.message}`);
      }
    },
    
    async createTeam(_, { teamInput: { teamId, pokemon } }) {
      const existingTeam = await Team.findOne({ teamId });

      if (existingTeam) {
        existingTeam.pokemon.push(...pokemon);
        await existingTeam.save();
        return existingTeam.teamId;
      } else {
        const newTeam = new Team({ teamId, pokemon });
        await newTeam.save();
        return newTeam.teamId;
      }
    },
  }
}

async function main() {
  await connect(MONGODB);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen : { port: 4000 }
  });

  console.log(`Server is ready at ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});