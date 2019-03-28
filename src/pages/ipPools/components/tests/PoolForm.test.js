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
          auto_warmup_overflow_pool: 'pool-2',
          ips: []
        },
        {
          id: 'pool-2',
          name: 'Another Pool',
          auto_warmup_overflow_pool: '',
          ips: [{
            external_ip: 'external',
            hostname: 'hostname'
          }, {
            external_ip: 'external-2',
            hostname: 'hostname-2'
          }]
        }
      ],
      pool: { id: 'my-pool', name: 'My Pool', auto_warmup_overflow_pool: 'pool-2' },
      handleSubmit: jest.fn(),
      pristine: true,
      canEditOverflowPool: true
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
    const component = 'Field[name="auto_warmup_overflow_pool"]';

    it('return true for access control condition if ip auto warmup is enabled', () => {
      expect(wrapper.find('AccessControl').at(1).prop('condition')({ account: { options: { ui: { ip_auto_warmup: true }}}})).toBe(true);
    });

    it('return false for access control condition if ip auto warmup is not enabled', () => {
      expect(wrapper.find('AccessControl').at(1).prop('condition')({ account: { options: { ui: { ip_auto_warmup: false }}}})).toBe(false);
    });

    it('does not render if editing default pool', () => {
      wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
      expect(wrapper.find(component)).not.toExist();
    });

    it('shows default pool in overflow pool list', () => {
      wrapper.setProps({ pools: [{ name: 'Default', id: 'default', ips: [{ external_ip: '1.1.1.1' }]}, { name: 'My Pool', id: 'my-pool', ips: []}]});
      expect(wrapper.find(component).prop('options')[1]).toEqual({ label: 'Default (default)', value: 'default' });
    });

    it('shows placeholder pool in overflow pool list ', () => {
      wrapper.setProps({ pools: [{ name: 'Default', id: 'default', ips: [{ external_ip: '1.1.1.1' }]}, { name: 'My Pool', id: 'my-pool', ips: []}]});
      expect(wrapper.find(component).prop('options')[0]).toEqual({ label: 'None', value: '' });
    });

    it('renders field disabled when submitting', () => {
      wrapper.setProps({ submitting: true });
      expect(wrapper.find(component).prop('disabled')).toBe(true);
    });

    it('renders field disabled when canEditOverflowPool is false', () => {
      wrapper.setProps({ canEditOverflowPool: false });
      expect(wrapper.find(component).prop('disabled')).toBe(true);
    });

    it('does not disable field when form is new', () => {
      wrapper.setProps({ isNew: true });
      expect(wrapper.find(component).prop('disabled')).toBe(false);
    });

    it('does not disable field when canEditOverflowPool is true', () => {
      wrapper.setProps({ canEditOverflowPool: true });
      expect(wrapper.find(component).prop('disabled')).toBe(false);
    });
  });
});
