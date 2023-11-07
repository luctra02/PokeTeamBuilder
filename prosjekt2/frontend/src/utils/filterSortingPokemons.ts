import { Attribute } from "./constants";

interface PokemonObject {
    id: number;
    name: string;
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


const pokemonDatabase = localStorage.getItem("PokemonDatabase");
const pokemonArray: PokemonObject[] = pokemonDatabase ? JSON.parse(pokemonDatabase) : [];


export function searchPokemons(searchTerm: string) { 
    const uniqueTypesSet = new Set<string>();
    const searchedArray = pokemonArray.filter((pokemon) => {
        const matchesName = pokemon.name.includes(searchTerm);
        if(matchesName){
            pokemon.types.forEach(type => uniqueTypesSet.add(type));
        }
        return matchesName;
    });
    sessionStorage.setItem('SearchedPokemons', JSON.stringify(searchedArray));
    const uniqueTypesArray = Array.from(uniqueTypesSet);
    sessionStorage.setItem('FilteredTypes', JSON.stringify(uniqueTypesArray))
}

export function filterPokemons(type: string){
    if(type == 'All'){
        sessionStorage.removeItem('FilteredPokemons')
        return
    }
    const searchedStorage = sessionStorage.getItem("SearchedPokemons")
    const searchedPokemons: PokemonObject[] = searchedStorage ? JSON.parse(searchedStorage) : pokemonArray;
    const filteredPokemons = searchedPokemons.filter(pokemon => pokemon.types.includes(type));
    sessionStorage.setItem('FilteredPokemons', JSON.stringify(filteredPokemons));

}

export function sortPokemons(attribute: Attribute){
    
    console.log(attribute)
    const sortFunction = (a: PokemonObject, b: PokemonObject) => {
        if (attribute == 'name') {
          return String(a[attribute]).localeCompare(String(b[attribute]));
        }else if(attribute == 'attack' || attribute == 'defense' || attribute == 'hp' || attribute == 'specialattack' || attribute == 'specialdefense' || attribute == 'speed' ){
            return a.baseStats[attribute] - b.baseStats[attribute]
        }else {
          return a[attribute] - b[attribute];
        }
      };
    const searchedStorage = sessionStorage.getItem("SearchedPokemons")
    const searchedPokemons: PokemonObject[] = searchedStorage ? JSON.parse(searchedStorage) : pokemonArray;
    const filteredStorage = sessionStorage.getItem("FilteredPokemons")
    const filteredPokemons: PokemonObject[] = filteredStorage ? JSON.parse(filteredStorage) : null;

    const sortedSearchedPokemons = searchedPokemons.sort(sortFunction);
    sessionStorage.setItem('SearchedPokemons', JSON.stringify(sortedSearchedPokemons));
    if(filteredPokemons){
        const sortedFilteredPokemons = filteredPokemons.sort(sortFunction);
        sessionStorage.setItem('FilteredPokemons', JSON.stringify(sortedFilteredPokemons));
    }
    

}
  
  