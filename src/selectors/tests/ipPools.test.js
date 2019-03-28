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
  let props;
  let ips;

  beforeEach(() => {
    ips = [
      { external_ip: '1.1.1.1' },
      { external_ip: '2.2.2.2' },
      { external_ip: '3.3.3.3' }
    ];

    state = {
      ipPools: {
        list: [
          { id: 'big', name: 'Big Pool', signing_domain: 'sign.test', ips },
          { id: 'none', name: 'None', ips: [], auto_warmup_overflow_pool: '' },
          { id: 'default', name: 'Default', ips: ips.slice(0,2) },
          { id: 'small', name: 'Small Pool', ips: ips.slice(0,1), auto_warmup_overflow_pool: '' }
        ]
      },
      currentUser: { access_level: 'admin' }
    };

    props = {
      match: { params: { poolId: 'big' }}
    };
  });

  describe('getDefaultPool', () => {
    it('should return the default pool', () => {
      expect(ipPoolSelectors.getDefaultPool(state)).toEqual({ id: 'default', name: 'Default', ips: ips.slice(0, 2) });
    });
  });

  describe('getNonDefaultIpPools', () => {
    it('should return a list of non default IP pools', () => {
      const ipPools = state.ipPools.list;
      ipPools.splice(2, 1);
      expect(ipPoolSelectors.getNonDefaultIpPools(state)).toEqual(ipPools);
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
      expect(ipPoolSelectors.selectIpsForCurrentPool(state, props)).toEqual(ips);
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
      expect(ipPoolSelectors.shouldShowIpPurchaseCTA(state)).toBe(false);
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

  describe('selectIpFormInitialValues', () => {
    let props;
    beforeEach(() => {
      props = {
        match: {
          params: {
            poolId: 'small',
            ip: '1.1.1.1'
          }
        }
      };
    });

    it('returns inital values for ip form', () => {
      expect(ipPoolSelectors.selectIpFormInitialValues(state, props)).toEqual({ external_ip: '1.1.1.1', ip_pool: 'small', 'auto_warmup_stage': 1 });
    });
  });

  describe('canEditOverflowPool', () => {
    it('returns false if current pool is an overflow pool for another pool', () => {
      state.ipPools.list[0].auto_warmup_overflow_pool = 'big';
      expect(ipPoolSelectors.canEditOverflowPool(state, props)).toBe(false);
    });

    it('returns true if current pool is not an overflow pool for any other pool', () => {
      expect(ipPoolSelectors.canEditOverflowPool(state, props)).toBe(true);
    });
  });
});
