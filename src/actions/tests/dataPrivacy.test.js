import * as dataPrivacyRequests from '../dataPrivacy';
import { showAlert } from 'src/actions/globalAlert';
import { sparkpost as spReq } from 'src/helpers/axiosInstances';

jest.mock('src/helpers/axiosInstances');
jest.mock('src/actions/globalAlert');

describe('Action Creator: dataPrivacy', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn(a => Promise.resolve(a));
    spReq.mockImplementation = jest.fn(a => Promise.resolve(a));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('.submitRTBFRequest should show appropriate alert on success', async () => {
    const thunk = dataPrivacyRequests.submitRTBFRequest({
      subaccountId: 100,
      recipients: ['fakeAddress@email.com'],
      include_subaccounts: false,
    });
    await thunk(dispatchMock);
    expect(showAlert).toHaveBeenCalledWith({
      type: 'success',
      message: 'Request Saved',
    });
  });

  it('.deleteUser should show appropriate alert on success', async () => {
    const thunk = dataPrivacyRequests.submitOptOutRequest({
      subaccountId: 100,
      recipients: ['fakeAddress@email.com'],
      include_subaccounts: false,
    });
    await thunk(dispatchMock);
    expect(showAlert).toHaveBeenCalledWith({
      type: 'success',
      message: 'Request Saved',
    });
  });
});
