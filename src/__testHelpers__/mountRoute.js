import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import configureStore from 'src/store';

import App from 'src/App';
import { authenticate } from 'src/actions/auth';
import { initializeAccessControl } from 'src/actions/accessControl';

import asyncFlush from 'src/__testHelpers__/asyncFlush';

const forceUpdate = async (wrapper) => {
  await asyncFlush();
  wrapper.update();
};

const simulate = async (wrapper, selector, eventName) => {
  wrapper.find(selector).simulate(eventName);
  await forceUpdate(wrapper);
};

const currentRoute = (wrapper) => wrapper.find('MemoryRouter Router').prop('history').location.pathname;

export default async function mountRoute(route, { authenticated = true } = {}) {
  const store = configureStore();

  // Note: axios#create() is mocked and now returns the same object on every call
  const axiosMock = axios.create();

  if (authenticated) {
    await store.dispatch(authenticate('test-username', 'password'));
    await store.dispatch(initializeAccessControl());
  }

  const Router = ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;

  const wrapper = mount(
    <Provider store={store}>
      <App RouterComponent={Router} />
    </Provider>
  );

  await asyncFlush();
  wrapper.update();

  return {
    wrapper,
    currentRoute: () => currentRoute(wrapper),
    find: wrapper.find.bind(wrapper),
    simulate: (...rest) => simulate(wrapper, ...rest),
    forceUpdate: (...rest) => forceUpdate(wrapper, ...rest),
    mockApiCalls: axiosMock.mock.calls,
    axiosMock,
    store
  };
}
