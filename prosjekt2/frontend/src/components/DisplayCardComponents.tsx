import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState,useEffect } from 'react';
import { Button, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/queries';
import { Pokemon } from '../utils/constants';

function DisplayCardComponents() {
  // State variables for pagination, type filtering, sorting, search, and sort order
  const [pageNumber, setPageNumber] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortPokemons, setSortPokemons] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 16;
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const pageStorage = sessionStorage.getItem('page')
  const typeStorage = sessionStorage.getItem('type')
  const sortStorage = sessionStorage.getItem('sort')
  const searchStorage = sessionStorage.getItem('searchValue')

  // Retrieve saved values from sessionStorage and update state accordingly
  useEffect(() => {
    const checkPage = pageStorage ? JSON.parse(pageStorage) : 1;
    if (checkPage === pageNumber) {
      setPageNumber(1);
      sessionStorage.setItem("page", JSON.stringify(1));
    } else {
      setPageNumber(checkPage);
    }
    setFilterType(typeStorage ? JSON.parse(typeStorage) : '');
    setSortPokemons(sortStorage ? JSON.parse(sortStorage) : 'id');
    setSearchValue(searchStorage ? JSON.parse(searchStorage) : '');
  }, [typeStorage, sortStorage, searchStorage, pageStorage]);

  // GraphQL query to get paginated Pokemon data
  const { loading, data, refetch: refetchPokemons } = useQuery(GET_POKEMONS, {
    variables: {
      limit: itemsPerPage,
      offset: (pageNumber - 1) * itemsPerPage,
      type: filterType,
      sort: sortPokemons,
      search: searchValue,
      sortOrder: sortOrder
    },
  });

  // Function to toggle between ascending and descending sort order
  const toggleSortOrder = async () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    await refetchPokemons({
      sortOrder: newSortOrder === "desc" ? "_desc" : "asc",
    });
  };

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Loading state check
  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract Pokemon array and total number of Pokemon
  const pokemonArray: Pokemon[] = data?.getPokemons.pokemons;
  const numberOfPokemons = data?.getPokemons.count;
  const totalPages = Math.ceil(numberOfPokemons / itemsPerPage);

  // Function to change the current page
  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      sessionStorage.setItem("page", JSON.stringify(newPage));
      navigate('/');
    }
  }

  // Function to navigate to the details page of a specific Pokemon
  function changeToDetailPage(pokemon: Pokemon) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  // Function to handle the 'Enter' key press on a Pokemon card
  const handleEnterPress = (event: KeyboardEvent, pokemon: Pokemon) => {
    if (event.key === 'Enter') {
      changeToDetailPage(pokemon);
    }
  };

  // Style for the pagination component
  const paginationStyle = {
    color: 'var(--text-color)',
  };

  // JSX structure for the component
  return (
    <section>
      {/* Section for sorting button */}
      <section className="sortButtonWrapper">
        <Button
          variant="outlined"
          className="sortButton"
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ? "Sort Order: Ascending" : "Sort Order: Descending"}
        </Button>
      </section>

      {/* Section for displaying Pokemon cards */}
      <section className="pokemonDisplayBox">
        {/* Conditional rendering based on the number of Pokemon */}
        {numberOfPokemons === 0 ? (
          <p id="noPokemonsFound">No Pokemons found</p>
        ) : (
          pokemonArray.map((pokemon) => (
            <article
              className="pokemonDisplayButton"
              tabIndex={0}
              key={pokemon.id}
              onClick={() => changeToDetailPage(pokemon)}
              onKeyDown={(event) => handleEnterPress(event, pokemon)}
            >
              <CardComponent
                pokemonObject={{
                  id: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.image,
                  types: pokemon.types,
                  weight: pokemon.weight,
                  height: pokemon.height,
                  baseStats: pokemon.baseStats,
                }}
              />
            </article>
          ))
        )}
      </section>

      {/* Section for pagination */}
      {numberOfPokemons > 0 && (
        <div className="pageSelector">
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={(_event, value) => changePage(value)}
            siblingCount={3}
            style={paginationStyle}
          />
        </div>
      )}
    </section>
  );
}

export default DisplayCardComponents;
