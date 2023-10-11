import CardComponent from "./CardComponent"
import { useEffect, useState } from "react"
import pokemonArray  from "../assets/PokemonList"
import { useLocation, useNavigate } from "react-router-dom";

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
  const itemsPerPage = 15;

  const [pageNumber, setPageNumber] = useState(1);
  const [searchedArray, setSearchedArray] = useState(pokemonArray);
  const [totalSearchedItems, setTotalSearchedItems] = useState(0)
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
    const filteredArray = pokemonArray.filter((pokemon) =>
      pokemon.key.includes(searchTerm)
    );
    setSearchedArray(filteredArray);
    setTotalSearchedItems(filteredArray.length)
  }, [searchTerm]);

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

  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.num}`, { state: { pokemon } });
  }

  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalSearchedItems);

  return (
    
    <>
      <div className="pokemonDisplayBox">
        {searchedArray.slice(startItem, endItem).map((pokemon) => (
          <div className="pokemonDisplayButton" key={pokemon.num} onClick={() => (changeToDetailPage(pokemon))}>
          <CardComponent
            pokemonObject={{id:pokemon.num, name:pokemon.key, image:pokemon.sprite, types:pokemon.types, key: pokemon.key, baseStats:pokemon.baseStats, weight:pokemon.weight, height: pokemon.height}}
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