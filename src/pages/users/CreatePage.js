import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Page, Panel, Button } from '@sparkpost/matchbox';
import { TextFieldWrapper, SubaccountTypeaheadWrapper } from 'src/components';
import { required, email } from 'src/helpers/validation';
import { inviteUser } from 'src/actions/users';
import { showAlert } from 'src/actions/globalAlert';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { trimWhitespaces } from 'src/helpers/string';
import { FORMS, SUBACCOUNT_REPORTING_USER_ROLE } from 'src/constants';

import RoleRadioGroup from './components/RoleRadioGroup';

const breadcrumbAction = {
  content: 'Users',
  Component: Link,
  to: '/account/users'
};

export class CreatePage extends Component {
  handleSubmit = (values) => {
    const {
      inviteUser,
      showAlert,
      history
    } = this.props;
    const { email, access/*, subaccount*/ } = values;

    return inviteUser(email, access)
      .then(() => {
        showAlert({
          type: 'success',
          message: `Invitation sent to ${email}`
        });
        history.push('/account/users');
      });
  };

  render() {
    const {
      submitting,
      pristine,
      handleSubmit,
      hasSubaccounts,
      selectedRole
    } = this.props;

    const subaccountReportingRoleSelected = selectedRole === SUBACCOUNT_REPORTING_USER_ROLE;

    return (
      <Page title="Invite User" breadcrumbAction={breadcrumbAction}>
        <Panel>
          <Panel.Section>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <p>An invitation will be sent to the email address you supply</p>
              <Field
                name="email"
                validate={[required, email]}
                normalize={trimWhitespaces}
                label="Email address"
                component={TextFieldWrapper}
              />
              <Field
                name="access"
                flags={{ hasSubaccounts }}
                component={RoleRadioGroup}
              />
              {subaccountReportingRoleSelected && <Field name='subaccount' component={SubaccountTypeaheadWrapper} validate={required} />}
              <Button submit primary disabled={submitting || pristine}>
                {submitting ? 'Loading' : 'Add User'}
              </Button>
            </form>
          </Panel.Section>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    access: 'admin' // Sadly redux-form does not reflect a select's initial value
  },
  selectedRole: formValueSelector(FORMS.INVITE_USER)(state, 'access'),
  hasSubaccounts: hasSubaccounts(state)
});

const mapDispatchToProps = { inviteUser, showAlert };

const ReduxCreatePage = reduxForm({ form: FORMS.INVITE_USER })(CreatePage);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReduxCreatePage)
);
