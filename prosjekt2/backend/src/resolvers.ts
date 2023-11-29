import { Pokemon, Team } from "../models/pokemonAndTeam.js";


interface pokemonFilters {
  name?: { $regex: RegExp };
  types?: { $in: string[] };
}

// GraphQL resolvers object
export const resolvers = {
  // Query resolvers
  Query: {
    // Resolver to fetch paginated Pokemon data with filtering, sorting, and searching
    async getPokemons(_, { offset, limit, search = "", type, sort, sortOrder }) {
      // Handling sorting by specific base stats
      if (sort == "attack" || sort == "defense" || sort == "hp" || sort == "specialattack" || sort == "specialdefense" || sort == "speed") {
        sort = "baseStats." + sort;
      }

      // Building filters object based on query parameters
      const filters: pokemonFilters = {};
      if (type) {
        filters.types = { $in: [type] };
      }
      filters.name = { $regex: new RegExp(search, "i") };

      // Building sort options object
      const sortOptions = {};
      sortOptions[sort] = sortOrder === "desc" ? -1 : 1;

      // Fetching paginated Pokemon data and total count
      const pokemons = await Pokemon.find(filters).sort(sortOptions).skip(offset).limit(limit);
      const count = await Pokemon.find(filters).countDocuments();

      // Returning the result
      return {
        pokemons,
        count,
      };
    },

    // Resolver to fetch a team by teamId
    async getTeam(_, { teamId }) {
      const team = await Team.findOne({ teamId: teamId });
      if (!team) {
        return new Team({ teamId, pokemons: [] });
      }
      return team;
    },

    // Resolver to fetch unique Pokemon types based on search
    async getTypes(_, { search = "" }) {
      const filters: pokemonFilters = {};
      filters.name = { $regex: new RegExp(search, "i") };

      // Fetching Pokemon data based on filters
      const pokemons = await Pokemon.find(filters);
      const uniqueTypesSet = new Set<string>();

      // Extracting unique types from Pokemon data
      pokemons.map((pokemon) => {
        pokemon.types.forEach((type) => uniqueTypesSet.add(type));
      });

      // Returning unique types
      return { types: Array.from(uniqueTypesSet) };
    },

    // Resolver to check if a Pokemon is in a team
    async checkPokemonInTeam(_, { teamId, name }) {
      const team = await Team.findOne({
        teamId: teamId,
        pokemon: { $elemMatch: { name: name } },
      });

      if (team) {
        return true;
      } else {
        return false;
      }
    },
  },

  // Mutation resolvers
  Mutation: {
    // Resolver to add a new Pokemon
    async addPokemon(_, { pokemonInput: { id, name, image, types, weight, height, baseStats } }) {
      const res = await new Pokemon({ id, name, image, types, weight, height, baseStats }).save();
      return res._id;
    },

    // Resolver to delete a Pokemon from a team
    async deletePokemonFromTeam(_, { name, teamId }) {
      try {
        const team = await Team.findOne({ teamId: teamId });
        if (!team) {
          throw new Error("Team not found.");
        }
        team.pokemon = team.pokemon.filter((pokemon) => pokemon.name != name);
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

    // Resolver to create a team
    async createTeam(_, { teamInput: { teamId, pokemon } }) {
      const existingTeam = await Team.findOne({ teamId: teamId });
      if (existingTeam && existingTeam.pokemon.length < 6) {
        existingTeam.pokemon.push(...pokemon);
        await existingTeam.save();
        return existingTeam.teamId;
      } else if (!existingTeam) {
        const newTeam = new Team({ teamId, pokemon });
        await newTeam.save();
        return newTeam.teamId;
      } else {
        return "Team is full";
      }
    },
  },
};
