import CardComponent from './CardComponent';
import { useEffect, useState } from 'react';
import pokemonArray from '../assets/PokemonList';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

interface PokemonObject {
  num: number;
  sprite: string;
  types: string[];
  key: string;
  weight: number;
  height: number;
  baseStats: number[];
}

function DisplayCardComponents() {
  const itemsPerPage = 16;

  const [pageNumber, setPageNumber] = useState(1);
  const [searchedArray, setSearchedArray] = useState(pokemonArray);
  const [totalSearchedItems, setTotalSearchedItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state.searchTerm;
  const totalPages = Math.ceil(totalSearchedItems / itemsPerPage);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  }

  useEffect(() => {
    const filteredArray = pokemonArray.filter((pokemon) => pokemon.key.includes(searchTerm));
    setSearchedArray(filteredArray);
    setTotalSearchedItems(filteredArray.length);
  }, [searchTerm]);



  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.num}`, { state: { pokemon } });
  }

  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalSearchedItems);

  return (
    <>
      <div className="pokemonDisplayBox">
        {searchedArray.slice(startItem, endItem).map((pokemon) => (
          <div className="pokemonDisplayButton" key={pokemon.num} onClick={() => changeToDetailPage(pokemon)}>
            <CardComponent
              pokemonObject={{
                id: pokemon.num,
                name: pokemon.key,
                image: pokemon.sprite,
                types: pokemon.types,
                key: pokemon.key,
                baseStats: pokemon.baseStats,
                weight: pokemon.weight,
                height: pokemon.height,
              }}
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
