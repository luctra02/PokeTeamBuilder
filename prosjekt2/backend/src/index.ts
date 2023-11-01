import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone';
import { connect } from 'mongoose';
import  Pokemon  from '../models/pokemon.js';


const MONGODB = "mongodb+srv://Team28:PokeTeamBuilder@poketeambuilder.ksuiabl.mongodb.net/PokeTeamBuilder?retryWrites=true&w=majority";


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

  type Query {
    getPokemon(name: String!): [Pokemon]
    getPokemons(limit: Int): [Pokemon]
  }

  type Mutation{
    addPokemon(pokemonInput: PokemonInput): String!
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