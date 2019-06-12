import React from 'react';
import { shallow } from 'enzyme';
import { CreateForm } from '../CreateForm';


describe('CreateForm', () => {
  const subject = (props = {}) => shallow(
    <CreateForm
      domainsLoading={false}
      domains={[]}
      fromEmail={''}
      subaccountId={null}
      hasSubaccounts={false}
      canViewSubaccount={false}
      formName={'templateCreate'}
      autofill={jest.fn()}
      {...props}
    />
  );

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  describe('id field', () => {
    it('gets slugified value autofill from name', () => {
      const mockAutofill = jest.fn();
      const wrapper = subject({ autofill: mockAutofill });
      wrapper.find('[name="name"]').simulate('change', { target: { value: 'Hello There' }});
      wrapper.update();
      expect(mockAutofill).toHaveBeenCalledWith('templateCreate', 'id', 'hello-there');
    });
  });

  describe('Subaccount assignment', () => {
    it('renders subaccount panel', () => {
      expect(subject({ hasSubaccounts: true, canViewSubaccount: true }).find('SubaccountSection')).toExist();
    });

    it('does not render subaccount panel if without subaccounts', () => {
      expect(subject({ hasSubaccounts: false, canViewSubaccount: true }).find('SubaccountSection')).not.toExist();
    });

    it('does not render subaccount panel if canViewSubaccount is false', () => {
      expect(subject({ hasSubaccounts: true, canViewSubaccount: false }).find('SubaccountSection')).not.toExist();
    });
  });

  describe('From Email', () => {
    it('renders correctly with available verified domain', () => {
      const domains = [{
        domain: 'foo.com',
        status: { ownership_verified: true, compliance_status: 'valid' }
      }];
      const wrapper = subject({ domains });
      const fromEmail = wrapper.find('[name="content.from.email"]');
      expect(fromEmail.prop('domains')).toEqual(domains);
      expect(fromEmail.prop('helpText')).toBeNull();
    });

    it('renders correct helptext with sandbox domain', () => {
      const wrapper = subject({ fromEmail: 'foo@sparkpostbox.com' });
      const fromEmail = wrapper.find('[name="content.from.email"]');
      expect(fromEmail.prop('helpText')).toEqual('You are using sandbox domain which has certain restrictions!');
    });

    it('renders no help text when domains loading', () => {
      const wrapper = subject({ fromEmail: 'foo@sparkpostbox.com', domainsLoading: true });
      const fromEmail = wrapper.find('[name="content.from.email"]');
      expect(fromEmail.prop('helpText')).toBeNull();
    });

    it('renders correctly for subaccount with no verified domains', () => {
      const wrapper = subject({ subaccountId: 'foo' });
      const fromEmail = wrapper.find('[name="content.from.email"]');
      expect(fromEmail.prop('helpText')).toEqual('The selected subaccount does not have any verified sending domains.');
      expect(fromEmail.prop('domains')).toEqual([]);
    });
  });
});
