import CardComponent from "./CardComponent"
import { useEffect, useState } from "react"
import pokemonArray  from "../assets/PokemonList"
import { useLocation } from "react-router-dom";

function DisplayCardComponents() {
  const itemsPerPage = 15;

  const [pageNumber, setPageNumber] = useState(1);
  const [searchedArray, setSearchedArray] = useState(pokemonArray);
  const [totalSearchedItems, setTotalSearchedItems] = useState(0)
  const location = useLocation();
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

  const startItem = (pageNumber - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalSearchedItems);

  return (
    
    <>
      <div>
        {searchedArray.slice(startItem, endItem).map((pokemon) => (
          <CardComponent
            key={pokemon.num}
            id={pokemon.num}
            name={pokemon.key}
            image={pokemon.sprite}
            types={pokemon.types}
          />
        ))}
        <button onClick={() => changePage(pageNumber - 1)}>Previous page</button>
        {generatePageButtons()}
        <button onClick={() => changePage(pageNumber + 1)}>Next page</button>
      </div>
    </>
  );
}

export default DisplayCardComponents;