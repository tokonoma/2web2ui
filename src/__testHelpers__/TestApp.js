import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Providers from 'src/Providers';
import getStore from 'src/store';

const store = getStore();

const TestApp = ({ children, history }) => (
  <Providers store={store}>
    <Router history={history}>{children}</Router>
  </Providers>
);

export default TestApp;
