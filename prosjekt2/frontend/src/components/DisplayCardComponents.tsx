import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeamSize } from '../utils/teamFunctions';
import { Pagination } from '@mui/material';
import fetchPokemonList from '../assets/PokemonDatabase';


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
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  const handleEnterPress = (event : KeyboardEvent, pokemon: PokemonObject) => {
    // Check if the key pressed is 'Enter'
    if (event.key === 'Enter') {
      changeToDetailPage(pokemon);
    }
};

  return (
    <>
      <div className="pokemonDisplayBox">
        {pokemonArray.slice(startItem, endItem).map((pokemon) => (
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
