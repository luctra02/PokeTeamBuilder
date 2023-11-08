import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState,useEffect } from 'react';
import { getTeamSize } from '../utils/teamFunctions';
import { Pagination } from '@mui/material';
import FetchPokemonList from '../assets/PokemonDatabase';
import { useNavigate } from 'react-router-dom';

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
    FetchPokemonList();
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
  const [numberOfPokemons, setNumberOfPokemons] = useState(0);
  const navigate = useNavigate();
  const totalPages = Math.ceil(numberOfPokemons / itemsPerPage);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  }


  useEffect(() => {
    const filteredStorage = sessionStorage.getItem("FilteredPokemons")
    const searchedStorage = sessionStorage.getItem("SearchedPokemons")
    const searchedPokemons: PokemonObject[] = filteredStorage ? JSON.parse(filteredStorage) : searchedStorage ? JSON.parse(searchedStorage) : pokemonArray;
    setSearchedArray(searchedPokemons)
    setNumberOfPokemons(searchedPokemons.length)
  }, [sessionStorage.getItem("FilteredPokemons"), sessionStorage.getItem("SearchedPokemons")]);


  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  const handleEnterPress = (event : KeyboardEvent, pokemon: PokemonObject) => {
    if (event.key === 'Enter') {
      changeToDetailPage(pokemon);
    }
};
  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, numberOfPokemons);

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
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(_event, value) => changePage(value)}
        siblingCount={3} 
      />
      </div>
    </>
  );
}

export default DisplayCardComponents;
