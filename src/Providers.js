import React from 'react';
import ErrorBoundary from 'src/components/errorBoundaries/ErrorBoundary';

import { Provider } from 'react-redux';

import Poll from 'src/context/Poll';

import { HibanaProvider } from 'src/context/HibanaContext';
import { HibanaTheme } from 'src/components/hibana';

const reloadApp = () => {
  window.location.reload(true);
};

const Providers = ({ store = {}, children }) => (
  <Provider store={store}>
    <HibanaProvider>
      <HibanaTheme>
        <ErrorBoundary onCtaClick={reloadApp} ctaLabel="Reload Page">
          <Poll>{children}</Poll>
        </ErrorBoundary>
      </HibanaTheme>
    </HibanaProvider>
  </Provider>
);

export default Providers;
