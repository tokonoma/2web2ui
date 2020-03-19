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
    <ErrorBoundary onCtaClick={reloadApp} ctaLabel="Reload Page">
      <HibanaProvider>
        <HibanaTheme>
          <Poll>{children}</Poll>
        </HibanaTheme>
      </HibanaProvider>
    </ErrorBoundary>
  </Provider>
);

export default Providers;
