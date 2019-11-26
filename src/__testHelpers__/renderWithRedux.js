import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// Lovingly adapted from:
// https://testing-library.com/docs/example-react-redux by @kentcdodds
const renderWithRedux = ({ component, reducer, initialState }) => {
  const store = createStore(reducer, initialState);

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
};

export default renderWithRedux;
