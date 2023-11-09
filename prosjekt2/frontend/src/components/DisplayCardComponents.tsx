import CardComponent from '../components/CardComponent';
import { KeyboardEvent, useState,useEffect } from 'react';
import { Pagination } from '@mui/material';
import FetchPokemonList from '../assets/PokemonDatabase';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

const GET_POKEMONS = gql`query GetPokemons($offset: Int!, $limit: Int!, $search: String, $sort: String, $type: String) {
  getPokemons(offset: $offset, limit: $limit, search: $search, sort: $sort, type: $type) {
    count
    pokemons {
      name
      baseStats {
        attack
        defense
        hp
        speed
        specialattack
        specialdefense
      }
      height
      id
      image
      types
      weight
    }
  }
}`


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
    // Return loading indicator or do nothing until data is loaded
    return <div>Loading...</div>;
  }
  const pokemonArray: PokemonObject[] = data?.getPokemons.pokemons;
  const numberOfPokemons = data?.getPokemons.count
  const totalPages = Math.ceil(numberOfPokemons / itemsPerPage);

  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
        sessionStorage.setItem("page", JSON.stringify(newPage));
        navigate('/')
    }
  }

  function changeToDetailPage(pokemon: PokemonObject) {
    navigate(`/pokemonInfo/${pokemon.id}`, { state: { pokemon } });
  }

  const handleEnterPress = (event : KeyboardEvent, pokemon: PokemonObject) => {
    if (event.key === 'Enter') {
      changeToDetailPage(pokemon);
    }
};

  const paginationStyle = {
    color: 'var(--text-color)', // Use your CSS variable here
  };

  return (
    <>
      <div className="pokemonDisplayBox">
        {pokemonArray.map((pokemon) => (
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
            />
          </div>
        ))}
      </div>
      <div className="pageSelector">
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(_event, value) => changePage(value)}
        siblingCount={3}
        style={paginationStyle}
    />
      {!localStorage.getItem('PokemonDatabase') && <FetchPokemonList/>}
      </div>
    </>
  );
}

export default DisplayCardComponents;
