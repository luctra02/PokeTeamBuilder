import { render, screen, waitFor } from '@testing-library/react';
import { allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import DisplayCardComponents from '../../components/DisplayCardComponents';
import { GET_POKEMONS } from '../../graphql/queries';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

const getPokemonsMock = [{
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 16,
        offset: 0,
        search: "",
        sort: "id",
        type: ""
      },
    },
    result: {
      data: {
        getPokemons: {
          count: 1,
          pokemons: [
            {
                id: 25,
                name: 'pikachu',
                image: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
                types: ['Electric'],
                weight: 6,
                height: 0.4,
                baseStats: {
                    attack: 55,
                    defense: 40,
                    hp: 35,
                    speed: 90,
                    specialattack: 50,
                    specialdefense: 50
                }
            },
          ],
        },
      },
    },
  }
];


describe('renders a pokemon', () => {
    test('matches the snapshot', async () => {
        console.log("HEEER:", mocks)
        const { asFragment } = render(
            
            <MockedProvider mocks={getPokemonsMock} addTypename={false}>
                <MemoryRouter>
                    <DisplayCardComponents />
                </MemoryRouter>
            </MockedProvider>
        
        )
  
        await waitFor(() => {
            expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
            expect(screen.getByText(/#0025/i)).toBeInTheDocument();
            expect(screen.getByText(/Electric/i)).toBeInTheDocument();
        });
  
        expect(asFragment()).toMatchSnapshot();
    });
  }); 
