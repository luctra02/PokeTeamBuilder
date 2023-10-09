import type { Query } from '@favware/graphql-pokemon';

interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

interface PokemonData {
  num: number;
  sprite: string;
  types: readonly PokemonType[];
  key: string;
  weight: number;
  height: number;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    specialattack: number;
    specialdefense: number;
  };
}

interface PokemonType {
  name: string;
}


let pokemonList: PokemonData[];

export async function fetchPokemonList(): Promise<PokemonData[]> {
  try {
    const res = await fetch('https://graphqlpokemon.favware.tech/v7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            getAllPokemon(offset: 89, take: 232) {
              num
              sprite
              types {
                name
              }
              key
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
          }
        `,
      }),
    });

    const json = await res.json() as GraphQLPokemonResponse<'getAllPokemon'>;
    const pokemonData = json.data.getAllPokemon;

    const uniqueNums = new Set<number>();
    pokemonList = pokemonData
      .filter((pokemon) => {
        if (!uniqueNums.has(pokemon.num)) {
          uniqueNums.add(pokemon.num);
          return true;
        }
        return false;
      })
      .map((pokemon) => pokemon);

    console.log("FETCHER HER: ", pokemonList)
    return pokemonList;
  } catch (error) {
    console.error('Error fetching or processing Pokemon data:', error);
    throw error;
  }
}

