import { useNavigate } from "react-router-dom";
import { sortPokemons } from "../utils/filterSortingPokemons";
import { sortBy } from "../utils/constants";
import { Attribute } from "../utils/constants";




function SortDropdown(){  
    const navigate = useNavigate();
    const sortBySelector =  document.getElementById("sortBySelector") as HTMLSelectElement

    if(!sessionStorage.getItem('SearchedPokemons') && sortBySelector){
        sortBySelector.value = "id";
    }

    function handleSort(attribute: string){
        sortPokemons(attribute as Attribute)
        navigate('/')
    }
    
    

    return(
        <>
            <p>Sort by: </p>
            <select id='sortBySelector' onChange={e => handleSort(e.target.value)}>
                <option value="id">ID</option>
                {sortBy.map(attribute => (
                <option value={attribute.toLowerCase().replace(" ", "")} key={attribute}>{attribute}</option>
            ))}
            </select>
        </>
    )
}
export default SortDropdown