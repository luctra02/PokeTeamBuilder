import { render, screen, waitFor } from '@testing-library/react';
import { getPokemonsMock, allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import ChangeTeamComponent from '../../components/ChangeTeamComponent';




describe('renders a pokemon', () => {
    it('renders the correct ', async () => {
        testPageRender(<ChangeTeamComponent pokemonTeam={getPokemonsMock.result.data.getPokemons.pokemons[0]}/>, { mocks });
        
        await waitFor(() => {
          localStorage.setItem('teamId', "8fpgpxy2x")
          expect(screen.getByText(/Remove from Team/i)).toBeInTheDocument();
        });

        testPageRender(<ChangeTeamComponent pokemonTeam={getPokemonsMock.result.data.getPokemons.pokemons[1]}/>, { mocks });
        await waitFor(() => {
          localStorage.setItem('teamId', "8fpgpxy2x")
          expect(screen.getByText(/Add to Team/i)).toBeInTheDocument();
        });
    });
  }); 
