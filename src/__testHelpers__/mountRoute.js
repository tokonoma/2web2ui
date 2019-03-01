import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import configureStore from 'src/store';

import AppRoutes from 'src/AppRoutes';
import { authenticate } from 'src/actions/auth';
import { initializeAccessControl } from 'src/actions/accessControl';

import asyncFlush from 'src/__testHelpers__/asyncFlush';

export default async function renderRoute(route, { authenticated = true } = {}) {
  const store = configureStore();
  const axiosMock = axios.create();

  if (authenticated) {
    await store.dispatch(authenticate('test-username', 'password'));
    await store.dispatch(initializeAccessControl());
  }

  const mounted = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );

  await asyncFlush();
  mounted.update();

  return {
    mounted,
    forceUpdate: async () => {
      await asyncFlush();
      mounted.update();
    },
    store,
    axiosMock
  };
}
