import { render, screen } from '@testing-library/react';
import { getPokemonsMock} from '../mocks/mockQueries';
import Type from '../../components/TypeComponent';




describe('renders a pokemon', () => {
    it('renders the correct ', async () => {
        render(<Type pokemonType={getPokemonsMock.result.data.getPokemons.pokemons[0].types[0]}/>);
        const electricButton = screen.getByText(/Electric/);
        expect(electricButton).toBeInTheDocument();
        expect(electricButton).toHaveStyle('background-color: #F8D030');
        

        render(<Type pokemonType={getPokemonsMock.result.data.getPokemons.pokemons[1].types[0]}/>);
        const normalButton = screen.getByText(/Normal/);
        expect(normalButton).toBeInTheDocument();
        expect(normalButton).toHaveStyle('background-color: #A8A878');
    });
  }); 






        
