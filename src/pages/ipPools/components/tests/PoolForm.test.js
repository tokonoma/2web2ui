import { shallow } from 'enzyme';
import React from 'react';
import { PoolForm } from '../PoolForm';
import config from 'src/config';
jest.mock('src/config');

describe('PoolForm tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      submitting: false,
      isNew: false,
      pools: [
        {
          id: 'my-pool',
          name: 'My Pool',
          ips: []
        },
        {
          id: 'pool-2',
          name: 'Another Pool',
          ips: [{
            external_ip: 'external',
            hostname: 'hostname'
          }, {
            external_ip: 'external-2',
            hostname: 'hostname-2'
          }]
        }
      ],
      pool: { id: 'my-pool', name: 'My Pool' },
      handleSubmit: jest.fn(),
      pristine: true
    };

    wrapper = shallow(<PoolForm {...props} />);
  });

  it('should render form', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show help text when editing default pool', () => {
    wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
    expect(wrapper.find('Field[name="name"]').prop('helpText')).toMatch('You cannot change the default IP pool\'s name');
  });

  it('should not render signing_domain if editing default pool', () => {
    wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
    expect(wrapper.find('Field[name="signing_domain"]')).not.toExist();
  });

  it('should render signing_domain for non-default pool and feature flag is enabled', () => {
    config.featureFlags.allow_default_signing_domains_for_ip_pools = true;
    wrapper.setProps({ pool: { id: 'test-pool', name: 'Test Pool' }});
    expect(wrapper.find('Field[name="signing_domain"]')).toExist();
  });

  it('should update button text to Saving and disable button when submitting form', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').shallow().text()).toEqual('Saving');
  });

  it('should not disable button if form is not pristine or not submitting', () => {
    wrapper.setProps({ submitting: false, pristine: false });
    expect(wrapper.find('Button').prop('disabled')).toBe(false);
  });

  it('renders correct button text when creating new pool', () => {
    wrapper.setProps({ isNew: true });
    expect(wrapper.find('Button').shallow().text()).toEqual('Create IP Pool');
  });

  it('renders correct button text when editing a pool', () => {
    wrapper.setProps({ isNew: false });
    expect(wrapper.find('Button').shallow().text()).toEqual('Update IP Pool');
  });

  describe('overflow pool', () => {
    it('renders with access control condition to be true', () => {
      config.featureFlags.ip_auto_warmup = true;
      expect(wrapper.find('AccessControl').at(1).prop('condition')()).toBe(true);
    });

    it('renders with access control condition to be false', () => {
      config.featureFlags.ip_auto_warmup = false;
      expect(wrapper.find('AccessControl').at(1).prop('condition')()).toBe(false);
    });

    it('does not render if editing default pool', () => {
      wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
      expect(wrapper.find('Field[name="auto_warmup_overflow_pool"]')).not.toExist();
    });

    it('renders pools with ip only', () => {
      expect(wrapper.find('Field[name="auto_warmup_overflow_pool"]').prop('options')).toEqual([{ label: 'Another Pool (pool-2)', value: 'pool-2' }]);
    });

    it('renders community pool if no pool with ip available on spc', () => {
      config.featureFlags.ip_auto_warmup_shared_pool_access = true;
      wrapper.setProps({ pools: props.pools.slice(0, 1) });
      expect(wrapper.find('Field[name="auto_warmup_overflow_pool"]').prop('options')).toEqual([{ label: 'Community Pool', value: 'sp_shared' }]);
    });
  });
});
