import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';
import { HibanaProvider } from 'src/context/HibanaContext';

describe('Component: App Layout', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <HibanaProvider>
          <App>
            <h1>My cool af children</h1>
          </App>
        </HibanaProvider>,
      ),
    ).toMatchSnapshot();
  });
});
