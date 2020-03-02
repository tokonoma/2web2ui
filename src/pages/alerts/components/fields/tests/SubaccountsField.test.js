import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm } from 'redux-form';
import { SubaccountsField } from '../SubaccountsField';
import renderWithRedux from 'src/__testHelpers__/renderWithRedux';

describe('Subaccount Field', () => {
  const defaultProps = {
    disabled: false,
    listSubaccounts: () => {},
    subaccounts: [{ id: 1, name: 'My Subaccount' }],
  };

  const subject = (props = {}) => shallow(<SubaccountsField {...defaultProps} {...props} />);

  it('renders combo box field', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders disabled combo box field', () => {
    const wrapper = subject({ disabled: true });
    expect(wrapper).toHaveProp('disabled', true);
  });

  it('calls listSubaccounts on mount', () => {
    const listSubaccounts = jest.fn();
    const initialState = { form: { foo: { values: { subaccounts: [] } } } };
    const defaultReducer = () => initialState;
    const ReduxFormWrapper = reduxForm({
      form: 'foo',
    })(SubaccountsField);

    renderWithRedux({
      reducer: defaultReducer,
      initialState,
      component: <ReduxFormWrapper {...defaultProps} listSubaccounts={listSubaccounts} />,
    });
    expect(listSubaccounts).toHaveBeenCalled();
  });

  describe('isExclusiveItem function', () => {
    const wrapper = subject();
    const isExclusiveItem = wrapper.prop('isExclusiveItem');

    it('returns true for subaccount ids -1 and -2', () => {
      expect(isExclusiveItem(-1)).toEqual(true);
      expect(isExclusiveItem(-2)).toEqual(true);
    });

    it('returns false for subaccount ids > 0', () => {
      expect(isExclusiveItem(0)).toEqual(false);
      expect(isExclusiveItem(101)).toEqual(false);
    });
  });

  describe('itemToString function', () => {
    const wrapper = subject();
    const itemToString = wrapper.prop('itemToString');

    it('returns only the name for master, master&all, and any', () => {
      expect(itemToString(-1)).toEqual('Master and all subaccounts');
      expect(itemToString(-2)).toEqual('Any subaccount');
      expect(itemToString(0)).toEqual('Master account');
    });

    it('returns false for subaccount ids > 0', () => {
      expect(itemToString(1)).toEqual('My Subaccount (1)');
    });
  });
});
