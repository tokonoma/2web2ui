import { createMockStore } from 'src/__testHelpers__/mockStore';
import * as actions from '../customReports';

jest.mock('../helpers/sparkpostApiRequest', () => jest.fn((a) => a));

describe('Action Creator: Custom Reports', () => {
  let mockStore;

  describe('with existing reports', () => {
    beforeEach(() => {
      mockStore = createMockStore({
        currentUser: {
          username: 'testname',
          options: {
            ui: {
              customReports: [
                { name: 'report foo', url: 'test-url' },
                { name: 'report bar', url: 'test-url' }
              ]
            }
          }
        }
      });
    });

    it('should dispatch a save report action', () => {
      mockStore.dispatch(actions.saveReport({
        name: 'report bar',
        url: 'test-url-overwrite'
      }));
      expect(mockStore.getActions()).toMatchSnapshot();
    });

    it('should dispatch a delete report action', () => {
      mockStore.dispatch(actions.deleteReport('report foo'));
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('with no reports', () => {
    beforeEach(() => {
      mockStore = createMockStore({
        currentUser: { username: 'testname' }
      });
    });

    it('should dispatch a save report action', () => {
      mockStore.dispatch(actions.saveReport({
        name: 'report foo',
        url: 'test-url-baz'
      }));
      expect(mockStore.getActions()).toMatchSnapshot();
    });

    it('should dispatch a delete report action', () => {
      mockStore.dispatch(actions.deleteReport('report foo'));
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });
});
