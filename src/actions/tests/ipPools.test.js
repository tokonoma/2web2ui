import { createMockStore } from 'src/__testHelpers__/mockStore';
import * as ipPools from '../ipPools';

jest.mock('../helpers/sparkpostApiRequest', () => jest.fn((a) => a));

describe('Action Creator: IP Pools', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore({});
  });

  describe('listPools', () => {
    it('dispatches list action', async () => {
      await mockStore.dispatch(ipPools.listPools());
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('createPool', () => {
    it('dispatches create action', async () => {
      await mockStore.dispatch(ipPools.createPool({ name: 'pool 1', signing_domain: '', auto_warmup_overflow_pool: 'overflow' }));
      expect(mockStore.getActions()).toMatchSnapshot();
    });

    it('dispatches create action with whitelisted keys', async () => {
      await mockStore.dispatch(ipPools.createPool({ name: 'pool 1', signing_domain: '', auto_warmup_overflow_pool: 'overflow', foo: 'bar' }));
      expect(Object.keys(mockStore.getActions()[0].meta.data)).toEqual(['name', 'signing_domain', 'auto_warmup_overflow_pool']);
    });
  });

});
