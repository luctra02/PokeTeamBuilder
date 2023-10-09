import CardComponent from "../components/CardComponent"
import pokemons from "../assets/PokemonList"
import { useState } from "react"

function HomePage() {
  
  const itemsPerPage = 15;
  const totalItems = pokemons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [pageNumber, setPageNumber] = useState(1)

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
        {pokemons.slice(startItem, endItem).map((pokemon) => (
          <CardComponent
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
        <button  onClick={() => changePage(pageNumber-1)}>Previous page</button>
        {generatePageButtons()}
        <button onClick={() => changePage(pageNumber+1)}>Next page</button>
      </div>
    </>
  )
}

export default HomePage
