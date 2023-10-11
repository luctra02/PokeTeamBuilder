import CardComponent from "../components/CardComponent"
import { useState } from "react"
import pokemonArray  from "../assets/PokemonList"
import { useNavigate } from "react-router-dom";
import { getTeamSize } from "../utils/teamFunctions";

interface PokemonObject {
  num: number;
  sprite: string;
  types: string[];
  key: string;
  weight: number;
  height: number;
  baseStats: number[]
}

function DisplayCardComponents() {
  const [_count, setCount] = useState(getTeamSize()); 

  function updateCount(count: number) {
    setCount(count);
  }

  const itemsPerPage = 15;
  const totalItems = pokemonArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [pageNumber, setPageNumber] = useState(1);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  }

  function generatePageButtons() {
    const pageButtons = [];
    const numToShow = 2;

    for (let i = pageNumber - numToShow; i <= pageNumber + numToShow; i++) {
      if (i >= 1 && i <= totalPages) {
        pageButtons.push(
          <button key={i} onClick={() => changePage(i)}>
            {i}
          </button>
        );
      }
    }

    return pageButtons;
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
          <div className="pokemonDisplayButton" key={pokemon.num} onClick={() => (changeToDetailPage(pokemon))}>
          <CardComponent
            pokemonObject={{id:pokemon.num, name:pokemon.key, image:pokemon.sprite, types:pokemon.types}}
            updateCount={updateCount}
          /></div>
        ))}
      </div>
      <div className="pageSelector">
        <button onClick={() => changePage(pageNumber - 1)}>Previous page</button>
          {generatePageButtons()}
          <button onClick={() => changePage(pageNumber + 1)}>Next page</button>
      </div>
    </>
  );
}

export default DisplayCardComponents;