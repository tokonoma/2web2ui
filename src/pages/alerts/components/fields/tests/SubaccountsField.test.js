import { shallow } from 'enzyme';
import React from 'react';
import { SubaccountsField } from '../SubaccountsField';
import cases from 'jest-in-case';

describe('Subaccount Field', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      hasSubaccounts: true,
      disabled: false,
      subaccounts: [{ id: 1, name: 'My Subacount' }],
      subaccountsFieldValue: [],
      listSubaccounts: jest.fn()
    };

    wrapper = shallow(<SubaccountsField {...props} />);
  });

  it('should render the Subaccounts Field component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('gets subaccounts when mounted', () => {
    wrapper = shallow(<SubaccountsField {...props}/>);
    expect(props.listSubaccounts).toHaveBeenCalled();
  });

  describe('correct options should show when', () => {
    const subaccountCases = {
      'no subaccounts are selected':
      {
        subaccountsFieldValue: [],
        expectedLength: 4
      },
      'Master and all subaccounts is selected': {
        subaccountsFieldValue: [-1],
        expectedLength: 0
      },
      'Any subaccount is selected': {
        subaccountsFieldValue: [-2],
        expectedLength: 0
      },
      'master account is selected': {
        subaccountsFieldValue: [0],
        expectedLength: 2
      },
      'multiple subaccounts are selected': {
        subaccountsFieldValue: [0,1],
        expectedLength: 2
      }
    };

    cases('options should be correct when', ({ subaccountsFieldValue, expectedLength }) => {
      wrapper.setProps({ subaccountsFieldValue });
      expect(wrapper.find({ name: 'subaccounts' }).prop('results')).toHaveLength(expectedLength);
    }, subaccountCases);
  });

});
