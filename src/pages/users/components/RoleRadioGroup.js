import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, clearFields } from 'redux-form';
import { RadioGroup } from 'src/components/reduxFormWrappers';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { FORMS, ROLES } from 'src/constants';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import SubaccountAssignment from './SubaccountAssignment';

const ADMIN_ROLE = {
  label: <strong>Admin</strong>,
  value: ROLES.ADMIN,
  helpText:
    'All permissions. The only user that can manage users, security, and billing settings.'
};

const DEVELOPER_ROLE = {
  label: <strong>Developer</strong>,
  value: ROLES.DEVELOPER,
  helpText:
    'Setup and development user. Full access to API Keys, and all other email related setup, sending, and reporting features.'
};

const EMAIL_ROLE = {
  label: <strong>Email</strong>,
  value: ROLES.EMAIL,
  helpText:
    'Content and deliverability management user. Has access to Templates, Recipients Lists, Suppressions, AB Testing, and all reporting features.'
};

const REPORTING_ROLE = {
  label: <strong>Reporting</strong>,
  value: ROLES.REPORTING,
  helpText:
    'Data analytics user. Has access to all reporting features and can view templates. No access to any account or feature settings.'
};

const SUPERUSER_ROLE = {
  label: <strong>Super User</strong>,
  value: ROLES.SUPERUSER
};


export class RoleRadioGroup extends React.Component {
  componentDidUpdate(prevProps) {
    const { selectedRole: prevRole } = prevProps;
    const { clearFields, selectedRole } = this.props;

    // Reset subaccount assignment fields when selecting a non reporting role
    if (prevRole === ROLES.REPORTING && selectedRole !== ROLES.REPORTING) {
      clearFields(FORMS.INVITE_USER, false, false, 'useSubaccount', 'subaccount');
    }
  }

  renderRoles() {
    const {
      selectedRole,
      hasSubaccounts,
      useSubaccountChecked,
      showDeveloperRoles,
      allowSuperUser,
      allowSubaccountAssignment
    } = this.props;

    return [
      ADMIN_ROLE,
      showDeveloperRoles ? DEVELOPER_ROLE : null,
      showDeveloperRoles ? EMAIL_ROLE : null,
      {
        ...REPORTING_ROLE,
        children: allowSubaccountAssignment &&
          hasSubaccounts && (
          <SubaccountAssignment
            selectedRole={selectedRole}
            useSubaccountChecked={useSubaccountChecked}
          />
        )
      },
      allowSuperUser && SUPERUSER_ROLE
    ].filter(Boolean);
  }

  render() {
    const { disabled, ...rest } = this.props;

    const roles = this.renderRoles();
    const options = roles.map((role) => ({ ...role, disabled }));

    return <RadioGroup title="Role" options={options} {...rest} />;
  }
}

RoleRadioGroup.propTypes = {
  disabled: propTypes.bool.isRequired,
  allowSuperUser: propTypes.bool.isRequired,
  allowSubaccountAssignment: propTypes.bool.isRequired
};

RoleRadioGroup.defaultProps = {
  disabled: false,
  allowSuperUser: false
};

const mapStateToProps = (state) => ({
  selectedRole: formValueSelector(FORMS.INVITE_USER)(state, 'access'),
  hasSubaccounts: hasSubaccounts(state),
  useSubaccountChecked: formValueSelector(FORMS.INVITE_USER)(state, 'useSubaccount'),
  showDeveloperRoles: selectCondition(isAccountUiOptionSet('developer_and_email_roles', false))(state)
});

const mapDispatchToProps = { clearFields };

export default connect(mapStateToProps, mapDispatchToProps)(RoleRadioGroup);
