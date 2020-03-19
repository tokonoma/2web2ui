import React from 'react';
import { render } from 'react-dom';

import { unregister } from './helpers/registerServiceWorker';

import configureStore from './store';

import config from './config';
import ErrorTracker from './helpers/errorTracker';

import Providers from './Providers';

import './critical.scss';
import './index.scss';

import App from './App';

const defaultStore = configureStore();

const renderApp = () => {
  render(
    <Providers store={defaultStore}>
      <App />
    </Providers>,
    document.getElementById('root'),
  );
};

ErrorTracker.install(config, defaultStore);
unregister(); // Our bundle is currently too big to be added to SW cache, causing problems on every deploy
renderApp();
window.SPARKPOST_LOADED = true; // Indicates the app bundle has loaded successfully

// Hot module replacement
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      renderApp();
    });
  }
}
