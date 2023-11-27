import { screen } from '@testing-library/react';
import Details from '../../components/DetailsCardComponent';
import { allMocks as mocks} from '../mocks/mockQueries';
import { getPokemonsMock } from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';





describe('renders a pokemon', () => {
    it('displays correct information', async () => {
       testPageRender(<Details pokemon={getPokemonsMock.result.data.getPokemons.pokemons[0]} />, { mocks });  
        const pikachuImage = screen.getByRole('img', { name: "" });
        expect(screen.getByText(/pikachu/)).toBeInTheDocument();
        expect(screen.getByText(/#25/)).toBeInTheDocument();
        expect(pikachuImage).toBeInTheDocument();
        expect(screen.getByText(/Weight: 6 kg/)).toBeInTheDocument();
        expect(screen.getByText(/Height: 0.4 m/)).toBeInTheDocument();
        expect(screen.getByText(/Electric/)).toBeInTheDocument();
        expect(screen.getByText(/Base Stats/)).toBeInTheDocument();
        expect(screen.getByText("attack")).toBeInTheDocument();
        expect(screen.getByText("defense")).toBeInTheDocument();
        expect(screen.getByText(/hp/)).toBeInTheDocument();
        expect(screen.getByText(/speed/)).toBeInTheDocument();
        expect(screen.getByText("special attack")).toBeInTheDocument();
        expect(screen.getByText("special defense")).toBeInTheDocument();
    
    });

    it('displays correct information', async () => {
        testPageRender(<Details pokemon={getPokemonsMock.result.data.getPokemons.pokemons[1]} />, { mocks });  
        const staraptorImage = screen.getByRole('img', { name: "" });
        expect(screen.getByText(/staraptor/)).toBeInTheDocument();
        expect(screen.getByText(/#398/)).toBeInTheDocument();
        expect(staraptorImage).toBeInTheDocument();
        expect(screen.getByText(/Weight: 24.9 kg/)).toBeInTheDocument();
        expect(screen.getByText(/Height: 1.2 m/)).toBeInTheDocument();
        expect(screen.getByText(/Normal/)).toBeInTheDocument();
        expect(screen.getByText(/Flying/)).toBeInTheDocument();
        expect(screen.getByText(/Base Stats/)).toBeInTheDocument();
        expect(screen.getByText("attack")).toBeInTheDocument();
        expect(screen.getByText("defense")).toBeInTheDocument();
        expect(screen.getByText(/hp/)).toBeInTheDocument();
        expect(screen.getByText(/speed/)).toBeInTheDocument();
        expect(screen.getByText("special attack")).toBeInTheDocument();
        expect(screen.getByText("special defense")).toBeInTheDocument();
    
    });
  });

  