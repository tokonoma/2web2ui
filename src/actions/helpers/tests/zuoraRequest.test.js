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
    expectedResponse = { data: { success: true } };
    axiosMocks.zuora.mockImplementation(() => Promise.resolve(expectedResponse));
  });

  it('should make a successful call', async () => {
    const results = await mockStore.dispatch(zuoraRequest(action));
    expect(results).toBe(expectedResponse);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should handle a zuora failure', async () => {
    axiosMocks.zuora.mockImplementation(() =>
      Promise.resolve({
        data: {
          success: false,
          reasons: [{ message: 'The credit card is bad and wrong' }],
        },
      }),
    );

    await expect(mockStore.dispatch(zuoraRequest(action))).rejects.toThrow();
  });
});
