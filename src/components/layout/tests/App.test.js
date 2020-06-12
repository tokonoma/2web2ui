import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Component: App Layout', () => {
  it('should render correctly', () => {
    expect(
      shallow(
        <TestApp>
          <App>
            <h1>My cool af children</h1>
          </App>
        </TestApp>,
      ),
    ).toMatchSnapshot();
  });
});
