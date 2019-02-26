import React from 'react';
import { shallow } from 'enzyme';
import SubaccountAssignment from '../SubaccountAssignment';
import { ROLES } from 'src/constants';

describe('Component: SubaccountAssignment', () => {
  const subject = (props) => shallow(<SubaccountAssignment selectedRole={ROLES.ADMIN} useSubaccountChecked={false} {...props} />);

  it('should render just the checkbox by default', () => {
    expect(subject().find('Field')).toHaveLength(1);
  });

  it('should enable the checkbox unless the correct role is selected', () => {
    expect(subject().find('Field[name="useSubaccount"]').prop('disabled')).toBeTruthy();
  });

  it('should render the typeahead if the checkbox is checked', () => {
    expect(subject({ selectedRole: ROLES.REPORTING, useSubaccountChecked: true }).find('Field[name="subaccount"]')).toExist();
  });
});
