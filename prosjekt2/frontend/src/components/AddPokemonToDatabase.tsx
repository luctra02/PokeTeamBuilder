import { gql, useMutation } from '@apollo/client';
import pokemonArray from '../assets/PokemonList';
//To use this file you have to add it to <AddPokemonToDatabase /> in Homepage and the corresponding import.

// Define the structure of a Pokemon using TypeScript interface
interface Pokemon {
    num: number;
    sprite: string;
    types: string[];
    key: string;
    weight: number;
    height: number;
    baseStats: number[];
  }

// Define the GraphQL mutation for adding a Pokemon to the database
const ADD_POKEMON = gql`
    mutation AddPokemon($pokemonInput: PokemonInput) {
      addPokemon(pokemonInput: $pokemonInput)
    }
`;

function AddPokemonToDatabase() {
    const [addPokemons] = useMutation(ADD_POKEMON);
  
    // Function to add a single Pokemon to the database
    function addPokemon(pokemon : Pokemon) {
      // Call the addPokemon mutation with the necessary variables
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
    
    // Return a button that, when clicked, adds all Pokemon from the array to the database
    return (
      <button onClick={() => pokemonArray.map((pokemon) => {addPokemon(pokemon)})}>Add pokemons</button>
    );
  }

export default AddPokemonToDatabase