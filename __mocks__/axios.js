import { lookupResponse } from 'src/__testHelpers__/mockApi';

// lookup() returns an API response body object or throws on error to simulate axios exception behaviour
export const singleton = jest.fn((request) => new Promise((resolve) => resolve(lookupResponse(request))));

singleton.interceptors = {
  response: {
    use: jest.fn()
  }
};

const mock = {
  create: () => singleton
};

export default mock;
