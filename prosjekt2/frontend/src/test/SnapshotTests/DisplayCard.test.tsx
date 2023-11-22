import { render, screen, waitFor } from '@testing-library/react';
import { allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import DisplayCardComponents from '../../components/DisplayCardComponents';



describe('renders pokemon', () => {
    test('matches the snapshot', async () => {
        const { asFragment } = testPageRender(<DisplayCardComponents />, {mocks})
  
        await waitFor(() => {
            expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
            expect(screen.getByText(/Staraptor/i)).toBeInTheDocument();

        });
  
        expect(asFragment()).toMatchSnapshot();
    });
  }); 
