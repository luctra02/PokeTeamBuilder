import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState,useEffect } from 'react';
import { getTeamSize } from '../utils/teamFunctions';
import { Pagination } from '@mui/material';
import fetchPokemonList from '../assets/PokemonDatabase';
import { useLocation, useNavigate } from 'react-router-dom';

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


function DisplayCardComponents() {
  if(!localStorage.getItem("PokemonDatabase")){
    fetchPokemonList();
  }
  const pokemonDatabase = localStorage.getItem("PokemonDatabase")
  const pokemonArray: PokemonObject[] = pokemonDatabase ? JSON.parse(pokemonDatabase) : [];
  const [, setCount] = useState(getTeamSize());

  function updateCount(count: number) {
    setCount(count);
  }

  const itemsPerPage = 16;

  const [pageNumber, setPageNumber] = useState(1);
  const [searchedArray, setSearchedArray] = useState(pokemonArray);
  const [totalSearchedItems, setTotalSearchedItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalSearchedItems / itemsPerPage);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  }

  useEffect(() => {
    if (location.state?.searchTerm != null) {
      const searchTerm = location.state.searchTerm.toLowerCase();
      const filteredArray = pokemonArray.filter((pokemon) => pokemon.name.includes(searchTerm));
      setSearchedArray(filteredArray);
      setTotalSearchedItems(filteredArray.length);
      setPageNumber(1);
    } else {
      setSearchedArray(pokemonArray);
      setTotalSearchedItems(pokemonArray.length);
    }
  }, [location.state?.searchTerm]);


  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  const handleEnterPress = (event : KeyboardEvent, pokemon: PokemonObject) => {
    // Check if the key pressed is 'Enter'
    if (event.key === 'Enter') {
      changeToDetailPage(pokemon);
    }
};
  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalSearchedItems);

  return (
    <>
      <div className="pokemonDisplayBox">
        {searchedArray.slice(startItem, endItem).map((pokemon) => (
          <div className="pokemonDisplayButton" tabIndex={0} key={pokemon.id} onClick={() => changeToDetailPage(pokemon)} onKeyDown={(event) => handleEnterPress(event, pokemon)}>
            <CardComponent
              pokemonObject={{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
                weight: pokemon.weight,
                height: pokemon.height,
                baseStats: pokemon.baseStats
              }}
              updateCount = {updateCount}
            />
          </div>
        ))}
      </div>
      <div className="pageSelector">
        <Pagination count={totalPages} page={pageNumber} onChange={(_event, value) => changePage(value)} />
      </div>
    </>
  );
}

export default DisplayCardComponents;
