import { screen, waitFor } from '@testing-library/react';
import { getPokemonsMock, allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import CardComponent from '../../components/CardComponent';




describe('renders a pokemon', () => {
    it('matches the snapshot', async () => {
      testPageRender(<CardComponent pokemonObject= {getPokemonsMock.result.data.getPokemons.pokemons[0]}/>, { mocks });
  
       await waitFor(() => {
        localStorage.setItem('teamId', "8fpgpxy2x")
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/#0025/i)).toBeInTheDocument();
        expect(screen.getByText(/Electric/i)).toBeInTheDocument();
        expect(screen.getByText(/Remove from Team/i)).toBeInTheDocument();
      });
      
      testPageRender(<CardComponent pokemonObject= {getPokemonsMock.result.data.getPokemons.pokemons[1]}/>, { mocks });

      await waitFor(() => {
        expect(screen.getByText(/Staraptor/i)).toBeInTheDocument();
        expect(screen.getByText(/#0398/i)).toBeInTheDocument();
        expect(screen.getByText(/Flying/i)).toBeInTheDocument();
        expect(screen.getByText(/Normal/i)).toBeInTheDocument();
        expect(screen.getByText(/Add to Team/i)).toBeInTheDocument();
        
      });

    });
  }); 
