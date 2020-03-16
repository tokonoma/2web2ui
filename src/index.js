import React from 'react';
import { render } from 'react-dom';

import config from './config';
import { unregister } from './helpers/registerServiceWorker';
import ErrorTracker from './helpers/errorTracker';

import configureStore from './store';
import Providers from './providers';

import './critical.scss';
import './index.scss';

import App from './App';

const store = configureStore();

const renderApp = () => {
  render(
    <Providers store={store}>
      <App />
    </Providers>,
    document.getElementById('root'),
  );
};

ErrorTracker.install(config, store);
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
