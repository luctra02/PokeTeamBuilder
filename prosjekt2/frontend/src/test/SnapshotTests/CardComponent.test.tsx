import { screen, waitFor } from '@testing-library/react';
import { getPokemonsMock, allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import CardComponent from '../../components/CardComponent';




describe('renders a pokemon', () => {
    it('matches the snapshot', async () => {
      const { asFragment } = testPageRender(<CardComponent pokemonObject= {getPokemonsMock.result.data.getPokemons.pokemons[0]}/>, { mocks });
  
       await waitFor(() => {
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/#0025/i)).toBeInTheDocument();
        expect(screen.getByText(/Electric/i)).toBeInTheDocument();
      });
  
      expect(asFragment()).toMatchSnapshot();
    });
  }); 
