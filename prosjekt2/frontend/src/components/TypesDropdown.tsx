import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_TYPES } from "../graphql/queries";

// Functional component representing a dropdown for filtering by types
function TypesDropdown() {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState("");
    const [searchValue, setSearchValue] = useState("");

    // Retrieve filter type and search value from session storage on component mount
    const searchStorage = sessionStorage.getItem('searchValue');
    const typeStorage = sessionStorage.getItem('type');
    
    useEffect(() => {
        // Set state variables based on session storage or default to empty string
        setFilterType(typeStorage ? JSON.parse(typeStorage) : '');
        setSearchValue(searchStorage ? JSON.parse(searchStorage) : '');
    }, [typeStorage, searchStorage]);

    // Fetch types data using Apollo Client's useQuery hook
    const { loading, data } = useQuery(GET_TYPES, {
        variables: { search: searchValue }
    });

    // Display a loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to handle filter selection and update session storage
    function handleFilter(type: string) {
        // Navigate to the root path when a filter is applied
        navigate('/');
        // Store the selected filter type in session storage
        sessionStorage.setItem('type', JSON.stringify(type));
    }

    return (
        <FormControl fullWidth>
            {/* Input label for the dropdown */}
            <InputLabel id="type" style={{ color: 'var(--text-color)' }}>Type</InputLabel>
            {/* Select component for the dropdown */}
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // Controlled component: value is determined by filterType state
                value={filterType}
                className="dropdown"
                label="Type"
                // Event handler to update filter type and session storage
                onChange={(e) => handleFilter(e.target.value)}
                style={{ color: 'var(--text-color)' }}
            >
                {/* Default option for displaying all types */}
                <MenuItem value="">All</MenuItem>
                {/* Mapping over types data to generate dropdown options */}
                {data?.getTypes.types.map((type: string) => (
                    <MenuItem value={type} key={type}>{type}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default TypesDropdown;
