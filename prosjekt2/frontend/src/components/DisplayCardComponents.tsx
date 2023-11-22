import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState,useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/queries';
import { Pokemon } from '../utils/constants';

function DisplayCardComponents() {
  const [pageNumber, setPageNumber] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortPokemons, setSortPokemons] = useState("id");
  const [searchValue, setSearchValue] = useState("")
  const itemsPerPage = 16;

  const pageStorage = sessionStorage.getItem('page')
  const typeStorage = sessionStorage.getItem('type')
  const sortStorage = sessionStorage.getItem('sort')
  const searchStorage = sessionStorage.getItem('searchValue')
  useEffect(() => {
    const checkPage = pageStorage ? JSON.parse(pageStorage) : 1
    if(checkPage == pageNumber){
      setPageNumber(1)
      sessionStorage.setItem("page", JSON.stringify(1));
    }else{
      setPageNumber(checkPage);
    }
    setFilterType(typeStorage ? JSON.parse(typeStorage) : '');
    setSortPokemons(sortStorage ? JSON.parse(sortStorage) : 'id');
    setSearchValue(searchStorage ? JSON.parse(searchStorage) : '');
  }, [typeStorage, sortStorage, searchStorage, pageStorage]);

  const {loading, data} = useQuery(GET_POKEMONS, {
    variables: { limit: itemsPerPage, offset: (pageNumber -1) * itemsPerPage, type: filterType, sort: sortPokemons, search: searchValue },
  }
) 
  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  const pokemonArray: Pokemon[] = data?.getPokemons.pokemons;
  const numberOfPokemons = data?.getPokemons.count
  const totalPages = Math.ceil(numberOfPokemons / itemsPerPage);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
        sessionStorage.setItem("page", JSON.stringify(newPage));
        navigate('/')
    }
  }

  function changeToDetailPage(pokemon: Pokemon) {
      navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  const handleEnterPress = (event : KeyboardEvent, pokemon: Pokemon) => {
    if (event.key === 'Enter') {
        changeToDetailPage(pokemon);
    }
};

  const paginationStyle = {
    color: 'var(--text-color)', 
  };

  return (
    <section>
      <section className="pokemonDisplayBox">
        {pokemonArray.map((pokemon) => (
          <article className="pokemonDisplayButton" tabIndex={0} key={pokemon.id} onClick={() => changeToDetailPage(pokemon)} onKeyDown={(event) => handleEnterPress(event, pokemon)}>
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
            />
          </article>
        ))}
      </section>
      <div className="pageSelector">
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(_event, value) => changePage(value)}
        siblingCount={3}
        style={paginationStyle}
    />
      </div>
    </section>
  );
}

export default DisplayCardComponents;
