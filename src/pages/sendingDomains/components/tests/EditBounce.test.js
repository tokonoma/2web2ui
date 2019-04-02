import React from 'react';
import { shallow } from 'enzyme';
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
      update={() => {}}
      reset={() => {}}
      allowDefault={true}
      allowSubaccountDefault={false}
      {...props}
    />
  );


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
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}, allowDefault: true, allowSubaccountDefault: true });
      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('renders correctly toggle when all conditions are true except allowSubaccount', () => {
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}, allowDefault: true, allowSubaccountDefault: false });
      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('does not render if config is false', () => {
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'valid' }}, allowDefault: false });
      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('does not render if not ownership verified', () => {
      const wrapper = subject({ domain: { status: { ownership_verified: false, cname_status: 'valid' }}, allowDefault: false });
      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('renders correctly if assigned to subaccount and feature flag is true', () => {
      const wrapper = subject({ domain: { subaccount_id: 101, status: { ownership_verified: true, cname_status: 'valid' }}, allowDefault: true, allowSubaccountDefault: true });
      expect(wrapper.find('Field')).toMatchSnapshot();
    });

    it('does not render if assigned to subaccount and feature flag is false', () => {
      const wrapper = subject({ domain: { subaccount_id: 101, status: { ownership_verified: true, cname_status: 'valid' }}, allowDefault: true, allowSubaccountDefault: false });
      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('does not render if not ready for bounce', () => {
      const wrapper = subject({ domain: { status: { ownership_verified: true, cname_status: 'invalid' }}, allowDefault: true });
      expect(wrapper.find('Field')).toHaveLength(0);
    });
  });

  describe('toggleDefaultBounce', () => {
    it('calls update to set domain as default', async () => {
      const update = jest.fn(() => Promise.resolve());
      const wrapper = subject({
        domain: { subaccount_id: 123, status: { cname_status: 'valid', ownership_verified: true }},
        update,
        allowSubaccountDefault: true
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
        update,
        allowSubaccountDefault: true
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
