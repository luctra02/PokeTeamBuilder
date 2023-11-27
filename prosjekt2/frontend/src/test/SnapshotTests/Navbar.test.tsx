import { screen } from '@testing-library/react';
import { allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import Navbar from '../../components/Navbar';




describe('renders a pokemon', () => {
    it('renders the correct ', async () => {
        const {asFragment} = testPageRender(<Navbar/>, { mocks });
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/My Team/i)).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });
  }); 
