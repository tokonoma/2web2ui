import React from 'react';
import { shallow } from 'enzyme';
import getConfig from 'src/helpers/getConfig';
import { EditBounce } from '../EditBounce';

jest.mock('src/helpers/getConfig');

describe('Component: EditBounce', () => {
  const subject = (props = {}) => shallow(
    <EditBounce
      id="xyz.com"
      domain={{
        status: {
          ownership_verified: null,
          cname_status: null,
          dkim_status: null,
          mx_status: null
        },
        is_default_bounce_domain: false,
        subaccount_id: 100
      }}
      verifyCname={() => {}}
      update={() => {}}
      showAlert={() => {}}
      reset={() => {}}
      verifyCnameLoading={false}
      {...props}
    />
  );

  beforeEach(() => {
    getConfig.mockImplementation((path) => ({
      allowDefault: true,
      allowSubaccountDefault: true,
      cnameValue: 'sparkpostmail.com'
    }));
  });

  it('renders ready correctly', () => {
    const wrapper = subject({ domain: { status: { cname_status: 'valid' }}});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders not ready correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('does not show root domain warning for 3rd level domain', () => {
    const wrapper = subject({ id: 'c.b.a.com' });
    expect(wrapper).toMatchSnapshot();
  });

  describe('default bounce toggle', () => {
    it('renders correctly toggle when all conditions are true', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: true, allowSubaccountDefault: true }));
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('renders correctly toggle when all conditions are true except allowSubaccount', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: true, allowSubaccountDefault: false }));
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('does not render if config is false', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: false }));
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('does not render if not ownership verified', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: false }));
      const wrapper = subject({ domain: { status: { ownership_verified: false, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('renders correctly if assigned to subaccount and feature flag is true', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: true, allowSubaccountDefault: true }));
      const wrapper = subject({ domain: { subaccount_id: 101, status: { ownership_verified: true, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('does not render if assigned to subaccount and feature flag is false', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: true, allowSubaccountDefault: false }));
      const wrapper = subject({ domain: { subaccount_id: 101, status: { ownership_verified: true, cname_status: 'valid' }}});

      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('does not render if not ready for bounce', () => {
      getConfig.mockImplementation((path) => ({ allowDefault: true }));
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'invalid' }}});

      expect(wrapper.find('Field')).toHaveLength(0);
    });
  });

  describe('verifyDomain', () => {
    it('renders loading state correctly', async () => {
      const wrapper = subject({ verifyCnameLoading: true });
      expect(wrapper.find('BounceSetupInstructionPanel')).toHaveProp('verifyCnameLoading', true);
    });

    it('verifies domain and alerts when verification successful', async () => {
      const showAlert = jest.fn();
      const verifyCname = jest.fn(() => Promise.resolve({ cname_status: 'valid' }));
      const wrapper = subject({ showAlert, verifyCname });

      await wrapper.find('BounceSetupInstructionPanel').simulate('verify');

      expect(verifyCname).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 100 });
      expect(showAlert).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
    });

    it('alerts error when verification req is successful but verification is failed', async () => {
      const showAlert = jest.fn();
      const verifyCname = jest.fn(() => Promise.resolve({
        cname_status: 'invalid',
        dns: { cname_error: 'Oh no!' }
      }));
      const wrapper = subject({ showAlert, verifyCname });

      await wrapper.find('BounceSetupInstructionPanel').simulate('verify');

      expect(verifyCname).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 100 });
      expect(showAlert).toHaveBeenCalledWith({ type: 'error', message: expect.stringContaining('Oh no!') });
    });
  });

  describe('toggleDefaultBounce', () => {
    it('calls update to set domain as default', async () => {
      const update = jest.fn(() => Promise.resolve());
      const wrapper = subject({
        domain: { subaccount_id: 123, status: { cname_status: 'valid', ownership_verified: true }},
        update
      });

      wrapper.find('Field[name="is_default_bounce_domain"]').simulate('change');

      expect(update).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 123, is_default_bounce_domain: true });
    });

    it('calls update to unset domain as default', () => {
      const update = jest.fn(() => Promise.resolve());
      const wrapper = subject({
        domain: {
          is_default_bounce_domain: true,
          subaccount_id: 234,
          status: { cname_status: 'valid', ownership_verified: true }
        },
        update
      });

      wrapper.find('Field[name="is_default_bounce_domain"]').simulate('change');

      expect(update).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 234, is_default_bounce_domain: false });
    });

    it('on error reset form and rethrow the error', async () => {
      const reset = jest.fn();
      const update = jest.fn(() => Promise.reject(new Error('Oh no!')));
      const wrapper = subject({
        domain: {
          is_default_bounce_domain: true,
          subaccount_id: 234,
          status: { cname_status: 'valid', ownership_verified: true }
        },
        reset,
        update
      });

      // no easy way to catch rethrown error with simulate
      await expect(wrapper.instance().toggleDefaultBounce()).rejects.toThrow('Oh no!');
      expect(reset).toHaveBeenCalled();
    });
  });
});
