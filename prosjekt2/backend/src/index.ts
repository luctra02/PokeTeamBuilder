import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone';
import { connect } from 'mongoose';
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";

//Create a connection to the database with an ApolloServer

const MONGODB = "mongodb://it2810-28.idi.ntnu.no:27017/PokeTeamBuilder";


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