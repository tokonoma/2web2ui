/* eslint-disable */
import React from 'react';
import account from 'src/reducers/account';
import { HibanaProvider } from 'src/context/HibanaContext';
import renderWithRedux from 'src/__testHelpers__/renderWithRedux';
import { HibanaControls, HibanaToggle } from '..';

describe('HibanaControls', () => {
  const subject = () => {
    return renderWithRedux({
      reducer: account,
      initialState: {
        updateError: null,
        loading: false,
        subscription: {},
        updateLoading: false,
        createLoading: false,
        options: {},
      },
      component: (
        <HibanaProvider>
          <HibanaControls>
            <HibanaToggle />
          </HibanaControls>
        </HibanaProvider>
      ),
    });
  };

  it('does stuff', () => {
    const { debug } = subject();

    debug();
  });
});
