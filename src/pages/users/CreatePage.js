import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Page, Panel, Button } from '@sparkpost/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required, email } from 'src/helpers/validation';
import { inviteUser } from 'src/actions/users';
import { showAlert } from 'src/actions/globalAlert';
import { trimWhitespaces } from 'src/helpers/string';
import { FORMS, ROLES } from 'src/constants';
import { hasUiOption } from 'src/helpers/conditions/account';

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
    const { email, access, useSubaccount, subaccount } = values;

    const access_level = useSubaccount ? ROLES.SUBACCOUNT_REPORTING : access;

    return inviteUser(email, access_level, subaccount)
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
      isSubaccountReportingLive
    } = this.props;

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
                component={RoleRadioGroup}
                allowSubaccountAssignment={isSubaccountReportingLive}
              />
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
    access: ROLES.ADMIN // Sadly redux-form does not reflect a select's initial value
  },
  isSubaccountReportingLive: hasUiOption('subaccount_reporting')(state)
});

const mapDispatchToProps = { inviteUser, showAlert };

const ReduxCreatePage = reduxForm({ form: FORMS.INVITE_USER })(CreatePage);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReduxCreatePage)
);
