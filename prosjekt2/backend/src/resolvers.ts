import { Pokemon, Team } from "../models/pokemonAndTeam.js";

interface pokemonFilters{
    name?: {$regex: RegExp},
    types?: {$in: String[]}
}

export const resolvers = {
    Query:{
        async getPokemon(_, { name }){
            const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
            return await Pokemon.find({ name: { $regex: regex } });
        },
        async getPokemons(_, { offset, limit, search="", type, sort }){
            if(sort == 'attack' || sort == 'defense' || sort == 'hp' || sort == 'specialattack' || sort == 'specialdefense' || sort == 'speed' ){
                sort = "baseStats."+sort
            }
            const filters: pokemonFilters = {}
            if (type){
                filters.types = { $in: [type] };
            }
            filters.name = {$regex: new RegExp(search, 'i')}
            
            const pokemons = await Pokemon.find(filters).sort({ [sort]: 1 }).skip(offset).limit(limit);
            const count = await Pokemon.find(filters).countDocuments();

            return {
                pokemons,
                count,
            };
        },
        async getTeam(_, { teamId}) {
          const team = await Team.findOne({ teamId: teamId });
          if (!team) {
            return new Team({ teamId, pokemons: [] });
          }
          return team
        },
        async getTypes(_, { search="" }) {
          const filters: pokemonFilters = {}
            filters.name = {$regex: new RegExp(search, 'i')}
            
            const pokemons = await Pokemon.find(filters);
            const uniqueTypesSet = new Set<string>();
            pokemons.map((pokemon) => {
                pokemon.types.forEach(type => uniqueTypesSet.add(type));
            })

          return {types: Array.from(uniqueTypesSet)}
        },
        async checkPokemonInTeam(_, {teamId, name}) {
          const team = await Team.findOne({
            teamId: teamId,
            pokemon: { $elemMatch: { name: name } }
          });
          

          if (team) {
            return true; 
          } else {
            return false; 
          }
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
        const existingTeam = await Team.findOne({ teamId: teamId });
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