import { render, screen, waitFor } from '@testing-library/react';
import { allMocks as mocks} from '../mocks/mockQueries';
import { testPageRender } from '../testUtils';
import DisplayTeam from '../../pages/DisplayTeamPage';




describe('renders a team', () => {
    it('matches the snapshot', async () => {
      const { asFragment } = testPageRender(<DisplayTeam/>, { mocks });
        
       await waitFor(() => {
        localStorage.setItem('teamId', "8fpgpxy2x")
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/Remove from Team/i)).toBeInTheDocument();
      });
  
      expect(asFragment()).toMatchSnapshot();
    });
  }); 
