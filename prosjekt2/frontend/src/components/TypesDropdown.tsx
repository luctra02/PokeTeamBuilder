import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_TYPES } from "../graphql/queries";


function TypesDropdown(){  
    const navigate = useNavigate()
    const [filterType, setFilterType] = useState("");
    const [searchValue, setSearchValue] = useState("")

    const searchStorage = sessionStorage.getItem('searchValue')
    const typeStorage = sessionStorage.getItem('type')
    
    useEffect(() => {
        setFilterType(typeStorage ? JSON.parse(typeStorage) : '');
        setSearchValue(searchStorage ? JSON.parse(searchStorage) : '');
    }, [typeStorage, searchStorage]);

    const {loading, data} = useQuery(GET_TYPES, {
      variables: { search: searchValue}
    })

    if (loading) {
      return <div>Loading...</div>;
    }

    function handleFilter(type: string){
        navigate('/')
        sessionStorage.setItem('type', JSON.stringify(type))
    }

    return(
        <FormControl fullWidth>
          <InputLabel id="type" style={{ color: 'var(--text-color)' }}>Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterType}
            label="Type"
            onChange={(e) => handleFilter(e.target.value)}
            style={{ color: 'var(--text-color)' }}
          >
              <MenuItem value="">All</MenuItem>
              {data?.getTypes.types.map((type: string) => (
                  <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
          </Select>
        </FormControl>
    )
}

export default TypesDropdown