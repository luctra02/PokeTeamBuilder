import { useNavigate } from "react-router-dom";
import { sortPokemons } from "../utils/filterSortingPokemons";
import { sortBy } from "../utils/constants";
import { Attribute } from "../utils/constants";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function SortDropdown(){  
    const navigate = useNavigate();
    const JSONAttribute = sessionStorage.getItem('sort')
    const attribute: string = JSONAttribute ? JSON.parse(JSONAttribute) : 'id';

    if(!sessionStorage.getItem('SearchedPokemons')){
        sessionStorage.setItem('sort', JSON.stringify('id'))
    }

    function handleSort(attribute: string){
        sortPokemons(attribute as Attribute)
        navigate('/')
        sessionStorage.setItem('sort', JSON.stringify(attribute))
    }

    return(
        <FormControl fullWidth>
        <InputLabel id="sort-by" style={{ color: 'var(--text-color)' }}>Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={attribute}
          label="Sort by"
          onChange={(e) => handleSort(e.target.value)}
          style={{ color: 'var(--text-color)' }}
        >
          <MenuItem value="id">ID</MenuItem>
          {sortBy.map((attribute) => (
            <MenuItem
              value={attribute.toLowerCase().replace(' ', '')}
              key={attribute}
            >
              {attribute}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}
export default SortDropdown