import { createMockStore } from 'src/__testHelpers__/mockStore';
import * as alerts from '../alertsV1';

jest.mock('../helpers/sparkpostApiRequest', () => jest.fn((a) => a));

describe('Action Creator: Alerts', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore({});
  });

  it('should dispatch a list action', () => {
    mockStore.dispatch(alerts.listAlerts());
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a create action', () => {
    mockStore.dispatch(alerts.createAlert({ data: { name: 'Mock Name' }}));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a set muted status action', () => {
    mockStore.dispatch(alerts.setMutedStatus({ id: 'alert-id', muted: false }));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a delete action', () => {
    mockStore.dispatch(alerts.deleteAlert({ id: 'alert-id' }));
    expect(mockStore.getActions()).toMatchSnapshot();
  });
});
