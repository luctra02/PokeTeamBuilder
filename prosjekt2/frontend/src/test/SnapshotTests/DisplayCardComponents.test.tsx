import { screen, waitFor } from '@testing-library/react';
import { allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import DisplayCardComponents from '../../components/DisplayCardComponents';





describe('renders a pokemon', () => {
    test('matches the snapshot', async () => {
        console.log("HEEER:", mocks)
        const { asFragment } = testPageRender(<DisplayCardComponents />, {mocks})
        
        
  
        await waitFor(() => {
            expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
            expect(screen.getByText(/#0025/i)).toBeInTheDocument();
            expect(screen.getByText(/Electric/i)).toBeInTheDocument();
        });
  
        expect(asFragment()).toMatchSnapshot();
    });
  }); 
