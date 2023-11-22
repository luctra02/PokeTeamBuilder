import { MongoClient } from 'mongodb';

const uri = 'mongodb://it2810-28.idi.ntnu.no:27017/PokeTeamBuilder';
if (!uri) {
    throw new Error('Missing MONGODB_URI');
}

const client = new MongoClient(uri);
export async function connect() {
  await client.connect();
  return client.db('PokemonTeamBuilderTest');
}

export async function disconnect() {
  await client.close();
}

export default {connect, disconnect};
