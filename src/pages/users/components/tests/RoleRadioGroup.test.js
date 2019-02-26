import { shallow } from 'enzyme';
import cases from 'jest-in-case';
import React from 'react';
import { RoleRadioGroup } from '../RoleRadioGroup';
import { ROLES } from 'src/constants';

describe('Component: RoleRadioGroup', () => {
  let baseProps;

  beforeEach(() => {
    baseProps = {
      disabled: false,
      allowSuperUser: false,
      selectedRole: ROLES.ADMIN,
      allowSubaccountAssignment: false,
      hasSubaccounts: false,
      useSubaccountChecked: false,
      clearFields: jest.fn()
    };
  });

  const subject = (props) => shallow(<RoleRadioGroup {...baseProps} {...props} />);

  const options = (wrapper) => wrapper.find('RadioGroup').prop('options');
  const findOption = (wrapper, optName) => options(wrapper).find((opt) => opt.value === optName);

  it('should render the RadioGroup', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render disabled', () => {
    expect(options(subject({ disabled: true }))).toEqual(expect.arrayContaining([expect.objectContaining({ disabled: true })]));
  });

  it('should render super user', () => {
    expect(findOption(subject({ allowSuperUser: true }), ROLES.SUPERUSER)).not.toBeNull();
  });

  cases('subaccount assignment fields', ({ allowSubaccountAssignment, hasSubaccounts, result }) => {
    const reportingRoleKids = findOption(subject({ allowSubaccountAssignment, hasSubaccounts }), ROLES.REPORTING).children;
    if (result) {
      expect(reportingRoleKids).toBeTruthy();
    } else {
      expect(reportingRoleKids).toBeFalsy();
    }
  }, {
    'flag on, no subaccounts': { allowSubaccountAssignment: true, hasSubaccounts: false, result: false },
    'flag on, with subaccounts': { allowSubaccountAssignment: true, hasSubaccounts: true, result: true },
    'flag off, no subaccounts': { allowSubaccountAssignment: false, hasSubaccounts: false, result: false },
    'flag off, with subaccounts': { allowSubaccountAssignment: false, hasSubaccounts: true, result: false }
  });

  it('should clear subaccount checkbox when selecting admin role', () => {
    const wrapper = subject({ allowSubaccountAssignment: true, hasSubaccounts: true, selectedRole: ROLES.REPORTING });
    wrapper.setProps({ selectedRole: ROLES.ADMIN });
    wrapper.update();
    // https://redux-form.com/8.1.0/docs/api/actioncreators.md/#-code-clearfields-form-string-keeptouched-boolean-persistentsubmiterrors-boolean-fields-string-code-
    expect(baseProps.clearFields.mock.calls[0]).toMatchSnapshot();
  });
});
