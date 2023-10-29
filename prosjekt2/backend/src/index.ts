import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone';
import { connect } from 'mongoose';
import  Pokemon  from '../models/pokemon.js';


const MONGODB = "mongodb+srv://Team28:PokeTeamBuilder@poketeambuilder.ksuiabl.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = `#graphql
  type Pokemon{
    id: Int
    name: String
    image: String
    types: [String]
    weight: Int
    height: Int
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

  input PokemonInput{
    id: Int
    name: String
    image: String
    types: [String]
    weight: Int
    height: Int
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

  type Query {
    getPokemon(name: String!): Pokemon!
    getPokemons(limit: Int): [Pokemon]
  }

  type Mutation{
    addPokemon(pokemonInput: PokemonInput): String!
  }
`;

const resolvers = {
  Query:{
      async getPokemon(_, { name }){
          return await Pokemon.find({ name: name });
      },
      async getPokemons(_, { limit }){
        return await Pokemon.find().limit(limit);
      }
  },
  Mutation:{
    async addPokemon(_, {pokemonInput: {id, name, image, types, weight, height, baseStats}} ){
      const res = await new Pokemon({id, name, image, types, weight, height, baseStats}).save();

      return res._id;
    }
  }
}

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen : { port: 4000 }
});

console.log(`Server is ready at ${url}`);