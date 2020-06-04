import zuoraRequest from '../zuoraRequest';
import { createMockStore } from 'src/__testHelpers__/mockStore';
import * as axiosMocks from 'src/helpers/axiosInstances';
import ErrorTracker from 'src/helpers/errorTracker';

jest.mock('src/helpers/axiosInstances');
jest.mock('src/helpers/errorTracker');

ErrorTracker.addRequestContextAndThrow = jest.fn((type, response, err) => {
  throw err;
});

describe('Helper: Zuora API Request', () => {
  let mockStore;
  let action;
  let expectedResponse;

  beforeEach(() => {
    mockStore = createMockStore({});
    action = { type: 'ZUORA_REQUEST', meta: {} };
  });

  it('should make a successful call', async () => {
    expectedResponse = { data: { success: true } };
    axiosMocks.zuora.mockImplementation(() => Promise.resolve(expectedResponse));
    const results = await mockStore.dispatch(zuoraRequest(action));
    expect(results).toBe(expectedResponse);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should handle a zuora failure', async () => {
    expectedResponse = { data: { success: false } };
    axiosMocks.zuora.mockImplementation(() => Promise.resolve(expectedResponse));
    await expect(mockStore.dispatch(zuoraRequest(action))).rejects.toThrow();
    expect(mockStore.getActions()).toMatchSnapshot();
  });
});
