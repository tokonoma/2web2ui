import React from 'react';
import ErrorBoundary from 'src/components/errorBoundaries/ErrorBoundary';

import config from './config';
import ErrorTracker from './helpers/errorTracker';

import { Provider } from 'react-redux';

import Poll from 'src/context/Poll';

import configureStore from './store';

import { HibanaProvider } from 'src/context/HibanaContext';
import { HibanaTheme } from 'src/components/hibana';

const defaultStore = configureStore();

const reloadApp = () => {
  window.location.reload(true);
};

const Providers = ({ store = defaultStore, children }) => (
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

ErrorTracker.install(config, defaultStore);

export default Providers;
