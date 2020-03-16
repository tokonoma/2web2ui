import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { HibanaProvider } from 'src/context/HibanaContext';

const TestApp = ({ history, children }) => (
  <HibanaProvider>
    <Router history={history}>{children}</Router>
  </HibanaProvider>
);

export default TestApp;
