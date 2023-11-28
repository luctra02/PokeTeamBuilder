import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Details from '../../components/DetailsCardComponent';
import { allMocks as mocks} from '../mocks/mockQueries';
import { getPokemonsMock } from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';





describe('renders a pokemon', () => {
    it('matches the snapshot', async () => {
      const { asFragment } = testPageRender(<Details pokemon={getPokemonsMock.result.data.getPokemons.pokemons[0]} />, { mocks });  
      await waitFor(() => {
        const imageUrl = 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif';
        const pikachuImage = screen.getByRole('img', { name: "" });

        expect(screen.getByText(/pikachu/)).toBeInTheDocument();
        expect(screen.getByText(/#25/)).toBeInTheDocument();
        expect(pikachuImage).toBeInTheDocument();
        expect(screen.getByText(/Weight: 6 kg/)).toBeInTheDocument();
        expect(screen.getByText(/Height: 0.4 m/)).toBeInTheDocument();
        const electricButton = screen.getByText(/Electric/);
        expect(electricButton).toBeInTheDocument();
        expect(electricButton).toHaveStyle('background-color: #F8D030');



      });
      expect(asFragment()).toMatchSnapshot();
    });
  
    /* it('test add to team button', async () => {
      testPageRender(<Details pokemon={getPokemonsMock.result.data.getPokemons.pokemons[0]} />, { mocks });
      const addToTeamButton = await screen.findByText(/Add to Team/);
      userEvent.click(addToTeamButton);
  
      await waitFor(() => {
        expect(screen.getByText(/Remove from Team/)).toBeInTheDocument();
      });
    }); */
  });
