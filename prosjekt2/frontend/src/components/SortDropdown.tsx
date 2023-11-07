import { useNavigate } from "react-router-dom";
import { sortPokemons } from "../utils/filterSortingPokemons";
import { sortBy } from "../utils/constants";
import { Attribute } from "../utils/constants";




function SortDropdown(){  
    const navigate = useNavigate();
    const JSONAttribute = sessionStorage.getItem('attribute')
    const attribute: string = JSONAttribute ? JSON.parse(JSONAttribute) : 'id';

    if(!sessionStorage.getItem('SearchedPokemons')){
        sessionStorage.setItem('attribute', JSON.stringify('id'))
    }

    function handleSort(attribute: string){
        sortPokemons(attribute as Attribute)
        navigate('/')
        sessionStorage.setItem('attribute', JSON.stringify(attribute))
    }
    
    

    return(
        <>
            <p>Sort by: </p>
            <select value={attribute} onChange={e => handleSort(e.target.value)}>
                <option value="id">ID</option>
                {sortBy.map(attribute => (
                <option value={attribute.toLowerCase().replace(" ", "")} key={attribute}>{attribute}</option>
            ))}
            </select>
        </>
    )
}
export default SortDropdown