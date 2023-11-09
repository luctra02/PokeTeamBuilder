import { useNavigate } from "react-router-dom";
import { filterPokemons } from "../utils/filterSortingPokemons";
import { types } from "../utils/constants";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function TypesDropdown(){  
    const typesStorage = sessionStorage.getItem("FilteredTypes")
    const filteredTypes: string[] = typesStorage ? JSON.parse(typesStorage) : types;
    const navigate = useNavigate();
    const JSONType = sessionStorage.getItem('type')
    const type: string = JSONType ? JSON.parse(JSONType) : '';
    

    function handleFilter(type: string){
        filterPokemons(type)
        navigate('/')
        sessionStorage.setItem('type', JSON.stringify(type))
    }

    return(
        <FormControl fullWidth>
        <InputLabel id="type" style={{ color: 'var(--text-color)' }}>Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => handleFilter(e.target.value)}
          style={{ color: 'var(--text-color)' }}
        >
          <MenuItem value="All">All</MenuItem>
          {filteredTypes.map((type) => (
            <MenuItem
              value={type}
              key={type}
            >
                <MenuItem value="">All</MenuItem>
            {filteredTypes.map((type) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
            ))}
            </Select>

        </FormControl>
    )
}
export default TypesDropdown