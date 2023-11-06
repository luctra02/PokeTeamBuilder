import { useNavigate } from "react-router-dom";
import { filterPokemons } from "../utils/filterSortingPokemons";
import { types } from "../utils/typesAndColors";




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

function TypesDropdown(){  
    const typesStorage = sessionStorage.getItem("FilteredTypes")
    const filteredTypes: string[] = typesStorage ? JSON.parse(typesStorage) : types;
    const navigate = useNavigate();
    const typeSelector =  document.getElementById("typeSelector") as HTMLSelectElement

    if(!sessionStorage.getItem('FilteredPokemons')){
        typeSelector.value = "All";
    }

    function handleFilter(type: string){
        filterPokemons(type)
        navigate('/')
    }
    
    

    return(
        <select id='typeSelector' onChange={e => handleFilter(e.target.value)}>
            <option value="All">All</option>
            {filteredTypes.map(type => (
                <option value={type} key={type}>{type}</option>
            ))}
        </select>
    )
}
export default TypesDropdown