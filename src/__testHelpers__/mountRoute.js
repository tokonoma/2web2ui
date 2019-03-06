import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import configureStore from 'src/store';

import AppRoutes from 'src/components/appRoutes';
import { authenticate } from 'src/actions/auth';
import { initializeAccessControl } from 'src/actions/accessControl';

import asyncFlush from 'src/__testHelpers__/asyncFlush';

async function forceUpdate(wrapper) {
  await asyncFlush();
  wrapper.update();
}

async function simulate(wrapper, selector, eventName) {
  wrapper.find(selector).simulate(eventName);
  await forceUpdate(wrapper);
}

export default async function mountRoute(route, { authenticated = true } = {}) {
  const store = configureStore();
  const axiosMock = axios.create();

  if (authenticated) {
    await store.dispatch(authenticate('test-username', 'password'));
    await store.dispatch(initializeAccessControl());
  }

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );

  await asyncFlush();
  wrapper.update();

  return {
    wrapper,
    find: wrapper.find.bind(wrapper),
    simulate: (...rest) => simulate(wrapper, ...rest),
    forceUpdate: (...rest) => forceUpdate(wrapper, ...rest),
    axiosMock
  };
}
