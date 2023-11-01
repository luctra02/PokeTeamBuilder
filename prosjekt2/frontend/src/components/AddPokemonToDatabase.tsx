import { gql, useMutation } from '@apollo/client';
import pokemonArray from '../assets/PokemonList';
//For å bruke denne filen må man legge inn <AddPokemonToDatabase /> i Homepage og importen som hører med.

interface Pokemon {
    num: number;
    sprite: string;
    types: string[];
    key: string;
    weight: number;
    height: number;
    baseStats: number[];
  }

const ADD_POKEMON = gql`
    mutation AddPokemon($pokemonInput: PokemonInput) {
      addPokemon(pokemonInput: $pokemonInput)
    }
`;

function AddPokemonToDatabase() {
    const [addPokemons] = useMutation(ADD_POKEMON);
  
    function addPokemon(pokemon : Pokemon) {
      addPokemons({
        variables: {
          pokemonInput: {
            id: pokemon.num,
            name: pokemon.key,
            image: pokemon.sprite,
            types: pokemon.types,
            weight: pokemon.weight,
            height: pokemon.height,
            baseStats: {
              attack: pokemon.baseStats[0],
              defense: pokemon.baseStats[1],
              hp: pokemon.baseStats[2],
              specialattack: pokemon.baseStats[3],
              specialdefense: pokemon.baseStats[4],
              speed: pokemon.baseStats[5],
            },
          },
        },
      });
    }
  
    return (
      <button onClick={() => pokemonArray.map((pokemon) => {addPokemon(pokemon)})}>Add pokemons</button>
    );
  }

export default AddPokemonToDatabase