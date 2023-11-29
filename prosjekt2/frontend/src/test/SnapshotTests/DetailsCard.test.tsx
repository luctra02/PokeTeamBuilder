import { screen, waitFor } from '@testing-library/react';
import Details from '../../components/DetailsCardComponent';
import { allMocks as mocks} from '../mocks/mockQueries';
import { getPokemonsMock } from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';





describe('renders a pokemon', () => {
    it('matches the snapshot', async () => {
      const { asFragment } = testPageRender(<Details pokemon={getPokemonsMock.result.data.getPokemons.pokemons[0]} />, { mocks });  
      await waitFor(() => {
        const pikachuImage = screen.getByRole('img', { name: "" });

        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
        expect(screen.getByText(/#0025/)).toBeInTheDocument();
        expect(pikachuImage).toBeInTheDocument();
        expect(screen.getByText(/Weight: 6 kg/)).toBeInTheDocument();
        expect(screen.getByText(/Height: 0.4 m/)).toBeInTheDocument();
        const electricButton = screen.getByText(/Electric/);
        expect(electricButton).toBeInTheDocument();
        expect(electricButton).toHaveStyle('background-color: #F8D030');



      });
      expect(asFragment()).toMatchSnapshot();
    });
  });
