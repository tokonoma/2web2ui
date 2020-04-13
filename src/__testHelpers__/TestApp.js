import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Providers from 'src/Providers';
import store from 'src/store';

const TestApp = ({ children, history, initialState }) => (
  <Providers store={store(initialState)}>
    <Router history={history}>{children}</Router>
  </Providers>
);

export default TestApp;
