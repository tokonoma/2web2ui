import * as scimTokenRequests from '../scimToken';
jest.mock('src/helpers/axiosInstances');
jest.mock('../helpers/sparkpostApiRequest', () => jest.fn(a => a));

describe('Action Creator: dataPrivacy', () => {
  it('submitRTBFRequest should make the appropriate request', () => {
    const thunk = scimTokenRequests.generateScimToken();
    expect(thunk).toMatchSnapshot();
  });

  it('submitOptOutRequest should make the appropriate request', () => {
    const thunk = scimTokenRequests.listScimToken();
    expect(thunk).toMatchSnapshot();
  });
});
