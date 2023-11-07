import { useNavigate } from "react-router-dom";
import { filterPokemons } from "../utils/filterSortingPokemons";
import { types } from "../utils/constants";

function TypesDropdown(){  
    const typesStorage = sessionStorage.getItem("FilteredTypes")
    const filteredTypes: string[] = typesStorage ? JSON.parse(typesStorage) : types;
    const navigate = useNavigate();
    const JSONType = sessionStorage.getItem('type')
    const type: string = JSONType ? JSON.parse(JSONType) : 'All';
    
    if(!sessionStorage.getItem('FilteredPokemons')){
        sessionStorage.setItem('type', JSON.stringify('All'))
    }

    function handleFilter(type: string){
        filterPokemons(type)
        navigate('/')
        sessionStorage.setItem('type', JSON.stringify(type))
    }

    return(
        <>
            <p>Type: </p>
            <select value={type} onChange={e => handleFilter(e.target.value)}>
                <option value="All">All</option>
                {filteredTypes.map(type => (
                    <option value={type} key={type}>{type}</option>
                ))}
            </select>
        </>
    )
}
export default TypesDropdown