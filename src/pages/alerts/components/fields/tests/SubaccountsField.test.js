import React from 'react';
import { shallow } from 'enzyme';
import { SubaccountsField } from '../SubaccountsField';

describe('Subaccount Field', () => {
  const subject = (props = {}) => shallow(
    <SubaccountsField
      disabled={false}
      listSubaccounts={() => {}}
      subaccounts={[
        { id: 1, name: 'My Subacount' }
      ]}
      subaccountsFieldValue={[]}
      {...props}
    />
  );

  it('renders combo box field', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls listSubaccounts on mount', () => {
    const listSubaccounts = jest.fn();
    subject({ listSubaccounts });
    expect(listSubaccounts).toHaveBeenCalled();
  });

  it('renders combo box field with mapped field values', () => {
    const wrapper = subject({ subaccountsFieldValue: [0, 1]});
    expect(wrapper).toHaveProp('defaultSelected', [
      { id: 0, name: 'Master account' },
      { id: 1, name: 'My Subacount' }
    ]);
  });

  it('renders combo box field with unknown field values', () => {
    const wrapper = subject({ subaccountsFieldValue: [999]});
    expect(wrapper).toHaveProp('defaultSelected', [{ id: 999, name: 'id:' }]);
  });

  it('renders disabled combo box field', () => {
    const wrapper = subject({ disabled: true });
    expect(wrapper).toHaveProp('disabled', true);
  });
});
