import React from 'react';
import ErrorBoundary from 'src/components/errorBoundaries/ErrorBoundary';
import { Provider } from 'react-redux';
import Poll from 'src/context/Poll';
import { HibanaProvider } from 'src/context/HibanaContext';
import { ThemeProvider } from 'src/components/matchbox';

const reloadApp = () => {
  window.location.reload(true);
};

const Providers = ({ store = {}, children }) => (
  <Provider store={store}>
    <HibanaProvider>
      <ThemeProvider target={document.querySelector('#styled-components-target')}>
        <ErrorBoundary onCtaClick={reloadApp} ctaLabel="Reload Page">
          <Poll>{children}</Poll>
        </ErrorBoundary>
      </ThemeProvider>
    </HibanaProvider>
  </Provider>
);

export default Providers;
