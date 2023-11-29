import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

interface TestPageRenderOptions {
  mocks: MockedResponse[];
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
