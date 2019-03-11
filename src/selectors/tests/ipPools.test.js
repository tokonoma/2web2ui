import * as ipPoolSelectors from '../ipPools';
import * as accountBillingInfoSelectors from 'src/selectors/accountBillingInfo';

jest.mock('src/selectors/accountBillingInfo', () => ({
  currentPlanCodeSelector: jest.fn(() => 'ent1')
}));

jest.mock('src/constants', () => ({
  ENTERPRISE_PLAN_CODES: ['ent1']
}));

describe('Selector: ipPools', () => {

  let state;

  beforeEach(() => {
    state = {
      ipPools: {
        list: [
          { id: 'big', name: 'Big Pool', ips: [1, 2, 3, 4, 5, 6]},
          { id: 'none', name: 'None', ips: []},
          { id: 'default', name: 'Default', ips: [1, 2, 3]},
          { id: 'small', name: 'Small Pool', ips: [1, 2]}
        ],
        pool: {
          name: 'MY CURRENT POOL',
          id: 'my_current_pool',
          signing_domain: 'signing-domain.test',
          ips: [
            { external_ip: '1.1.1.1' },
            { external_ip: '2.2.2.2' },
            { external_ip: '3.3.3.3' }
          ]
        }
      },
      currentUser: { access_level: 'admin' }
    };
  });

  describe('getDefaultPool', () => {
    it('should return the default pool', () => {
      expect(ipPoolSelectors.getDefaultPool(state)).toEqual({ id: 'default', name: 'Default', ips: [1, 2, 3]});
    });
  });

  describe('getNonDefaultIpPools', () => {
    it('should return a list of non default IP pools', () => {
      expect(ipPoolSelectors.getNonDefaultIpPools(state)).toEqual([
        { id: 'big', name: 'Big Pool', ips: [1, 2, 3, 4, 5, 6]},
        { id: 'none', name: 'None', ips: []},
        { id: 'small', name: 'Small Pool', ips: [1, 2]}
      ]);
    });
  });

  describe('getOrderedIpPools', () => {
    it('should return a list pools (default first, then ordered by id ascending)', () => {
      expect(ipPoolSelectors.getOrderedIpPools(state).map((pool) => pool.id)).toEqual([
        'default', 'big', 'none', 'small'
      ]);
    });
  });


  describe('selectIpsForCurrentPool', () => {
    it('should select IPs for the current pool', () => {
      expect(ipPoolSelectors.selectIpsForCurrentPool(state)).toEqual([
        { external_ip: '1.1.1.1', id: '1_1_1_1' },
        { external_ip: '2.2.2.2', id: '2_2_2_2' },
        { external_ip: '3.3.3.3', id: '3_3_3_3' }
      ]);
    });
  });


  describe('selectIpPoolFormInitialValues', () => {
    it('should return an object of ips assigned to their current pool, for initial values', () => {
      expect(ipPoolSelectors.selectIpPoolFormInitialValues(state, { isNew: false })).toEqual({
        name: 'MY CURRENT POOL',
        signing_domain: 'signing-domain.test',
        '1_1_1_1': 'my_current_pool',
        '2_2_2_2': 'my_current_pool',
        '3_3_3_3': 'my_current_pool'
      });
    });

    it('should return empty init values in new mode', () => {
      expect(ipPoolSelectors.selectIpPoolFormInitialValues(state, { isNew: true })).toEqual({});
    });
  });

  describe('shouldShowIpPurchaseCTA', () => {
    it('returns false for enterprise plans', () => {
      expect(ipPoolSelectors.shouldShowIpPurchaseCTA(state)).toBe(false);
    });

    it('returns true for non-enterprise plans', () => {
      accountBillingInfoSelectors.currentPlanCodeSelector.mockReturnValue('ccfree1');
      expect(ipPoolSelectors.shouldShowIpPurchaseCTA(state)).toBe(true);
    });
    it('returns false for non-admins', () => {
      state.currentUser.access_level = 'developer';
      expect(shouldShowIpPurchaseCTA(state)).toBe(false);
    });

  });

  describe('selectFirstIpPoolId', () => {
    it('returns id of first ip pool', () => {
      expect(ipPoolSelectors.selectFirstIpPoolId(state)).toEqual('big');
    });

    it('returns undefined', () => {
      state.ipPools.list = [];
      expect(ipPoolSelectors.selectFirstIpPoolId(state)).toBeUndefined();
    });
  });

  describe('getReAssignPoolsOptions', () => {
    it('returns formatted pools list', () => {
      expect(ipPoolSelectors.getReAssignPoolsOptions(state)).toMatchSnapshot();
    });

    it('returns formatted pools list and renames label of current selected pool', () => {
      const newState = {
        ...state,
        ipPools: {
          ...state.ipPools,
          pool: {
            name: 'Small Pool',
            id: 'small'
          }
        }
      };
      expect(ipPoolSelectors.getReAssignPoolsOptions(newState)).toMatchSnapshot();
    });
  });

  describe('getIpFormInitialValues', () => {
    let props;
    beforeEach(() => {
      ipPoolSelectors.selectIpForCurrentPool = jest.fn(() => ([{ external_ip: '1.1.1.1' }]));
      ipPoolSelectors.selectCurrentPool = jest.fn(() => ({ name: 'MY CURRENT POOL', id: 'my_current_pool' }));
      props = {
        match: {
          params: {
            ip: '1.1.1.1'
          }
        }
      };
    });

    it('returns inital values for ip form', () => {
      expect(ipPoolSelectors.getIpFormInitialValues(state, props)).toEqual({ external_ip: '1.1.1.1', ip_pool: 'my_current_pool' });
    });
  });
});
