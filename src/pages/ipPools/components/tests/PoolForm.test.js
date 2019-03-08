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
      ips: [
        {
          external_ip: 'external',
          hostname: 'hostname'
        },
        {
          external_ip: 'external-2',
          hostname: 'hostname-2'
        }
      ],
      list: [
        {
          id: 'my-pool',
          name: 'My Pool'
        },
        {
          id: 'pool-2',
          name: 'Another Pool'
        }
      ],
      pool: { id: 'my-pool', name: 'My Pool' },
      handleSubmit: jest.fn(),
      pristine: true,
      showPurchaseCTA: true
    };

    wrapper = shallow(<PoolForm {...props} />);
  });

  it('should render form', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show help text when editing default pool', () => {
    wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
    expect(wrapper.find('Field').prop('helpText')).toMatch('You cannot change the default IP pool\'s name');
  });

  it('should not render signing_domain if editing default pool', () => {
    wrapper.setProps({ pool: { id: 'default', name: 'Default' }});
    expect(wrapper.exists('Field[name="signing_domain"]')).toBe(false);
  });

  it('should render signing_domain for non-default pool and feature flag is enabled', () => {
    config.featureFlags.allow_default_signing_domains_for_ip_pools = true;
    wrapper.setProps({ pool: { id: 'test-pool', name: 'Test Pool' }});
    expect(wrapper.exists('Field[name="signing_domain"]')).toBe(true);
  });

  it('should not render table if pool is new', () => {
    wrapper.setProps({ isNew: true });
    expect(wrapper.exists('Panel[title="Sending IPs"]')).toBe(false);
  });

  it('should not render table if no ips exist', () => {
    wrapper.setProps({ ips: []});
    expect(wrapper.exists('Panel[title="Sending IPs"]')).toBe(true);
    expect(wrapper.exists('IPList')).toBe(false);
  });

  it('should not show purchase cta if showPurchaseCTA is false', () => {
    wrapper.setProps({ showPurchaseCTA: false });
    expect(wrapper.find('Panel[title="Sending IPs"]').find('UnstyledLink').exists()).toBe(false);
  });

  it('should update button text to Saving and disable button when submitting form', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').shallow().text()).toEqual('Saving');
  });

  it('should not disable button if form is not pristine or not submitting', () => {
    wrapper.setProps({ submitting: false, pristine: false });
    expect(wrapper.find('Button').shallow().text()).toEqual('Update IP Pool');
    expect(wrapper.find('Button').prop('disabled')).toBe(false);
  });

  it('should render row properly', () => {
    const rows = wrapper.instance().getRowData('options', { id: '1_1_1_1', external_ip: 'ext-ip', hostname: 'host' });
    expect(rows).toMatchSnapshot();
  });
});
