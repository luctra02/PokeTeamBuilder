import { gql, useQuery } from "@apollo/client";

interface PokemonData {
    id: number;
    name:string;
    image: string;
    types: string[];
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

  

const GET_POKEMONS = gql`
query GetPokemons($limit: Int) {
    getPokemons(limit: $limit) {
      id
      image
      name
      types
      height
      weight
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
    }
  }`;

function FetchPokemonList(){
    const {loading, data} = useQuery(GET_POKEMONS, {
        variables: { limit: 896 },
      }
    );
    if(!loading){
        const pokemonList: PokemonData[] = data.getPokemons;
        const updatedPokemonList = JSON.stringify(pokemonList);
        localStorage.setItem('PokemonDatabase', updatedPokemonList);
        
        
    }

}


export default FetchPokemonList;
