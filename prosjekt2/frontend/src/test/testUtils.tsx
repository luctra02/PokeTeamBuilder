import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';


// You can extend this to accept any additional props you might need
interface TestPageRenderOptions {
  mocks: any[];
  initialRoutes?: string[];
}

export function testPageRender(
  ui: React.ReactElement,
  options: TestPageRenderOptions
) {
  return render(
    <MockedProvider mocks={options.mocks} addTypename={false}>
        <MemoryRouter initialEntries={options.initialRoutes || ['/project2/']}>
            {ui}
        </MemoryRouter>
    </MockedProvider>
  );
}
