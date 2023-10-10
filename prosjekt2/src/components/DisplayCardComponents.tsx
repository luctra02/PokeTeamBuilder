import CardComponent from "../components/CardComponent"
import { useState } from "react"
import pokemonArray  from "../assets/PokemonList"

function DisplayCardComponents() {
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

  return (
    
    <>
      <div>
        {pokemonArray.slice(startItem, endItem).map((pokemon) => (
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