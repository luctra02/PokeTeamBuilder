import CardComponent from '../components/CardComponent';
import { useState } from 'react';
import pokemonArray from '../assets/PokemonList';
import { useNavigate } from 'react-router-dom';
import { getTeamSize } from '../utils/teamFunctions';
import { Pagination } from '@mui/material';

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
  const [, setCount] = useState(getTeamSize());

  function updateCount(count: number) {
    setCount(count);
  }

  const itemsPerPage = 16;
  const totalItems = pokemonArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [pageNumber, setPageNumber] = useState(1);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  }

  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalItems);

  //navigate to detailspage for a selected pokemon
  const navigate = useNavigate();

  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.num}`, { state: { pokemon } });
  }

  return (
    <>
      <div className="pokemonDisplayBox">
        {pokemonArray.slice(startItem, endItem).map((pokemon) => (
          <div className="pokemonDisplayButton" key={pokemon.num} onClick={() => changeToDetailPage(pokemon)}>
            <CardComponent
              pokemonObject={{
                id: pokemon.num,
                name: pokemon.key,
                image: pokemon.sprite,
                types: pokemon.types,
                key: pokemon.key,
                weight: pokemon.weight,
                height: pokemon.height,
                baseStats: pokemon.baseStats,
              }}
              updateCount={updateCount}
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