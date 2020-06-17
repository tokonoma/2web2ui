import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextFieldWrapper } from 'src/components';
import { PageLink } from 'src/components/links';
import { Button, Page, Panel, Stack } from 'src/components/matchbox';
import { required, email } from 'src/helpers/validation';
import { inviteUser } from 'src/actions/users';
import { showAlert } from 'src/actions/globalAlert';
import { trimWhitespaces } from 'src/helpers/string';
import { FORMS, ROLES } from 'src/constants';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';

import RoleRadioGroup from './components/RoleRadioGroup';

const breadcrumbAction = {
  content: 'Users',
  Component: PageLink,
  to: '/account/users',
};

export class CreatePage extends Component {
  handleSubmit = values => {
    const { inviteUser, showAlert, history } = this.props;
    const { email, access, useSubaccount, subaccount } = values;

    const access_level = useSubaccount ? ROLES.SUBACCOUNT_REPORTING : access;

    return inviteUser(email, access_level, subaccount).then(() => {
      showAlert({
        type: 'success',
        message: `Invitation sent to ${email}`,
      });
      history.push('/account/users');
    });
  };

  render() {
    const { submitting, pristine, handleSubmit, isSubaccountReportingLive } = this.props;

    return (
      <Page title="Invite User" breadcrumbAction={breadcrumbAction}>
        <Panel>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <Panel.Section>
              <Stack>
                <Field
                  name="email"
                  validate={[required, email]}
                  normalize={trimWhitespaces}
                  label="Email address"
                  component={TextFieldWrapper}
                  helpText="An invitation will be sent to the email address you supply"
                />

                <Field
                  name="access"
                  component={RoleRadioGroup}
                  allowSubaccountAssignment={isSubaccountReportingLive}
                />
              </Stack>
            </Panel.Section>

            <Panel.Section>
              <Button variant="primary" submit disabled={submitting || pristine}>
                {submitting ? 'Loading' : 'Add User'}
              </Button>
            </Panel.Section>
          </form>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    access: ROLES.ADMIN, // Sadly redux-form does not reflect a select's initial value
  },
  isSubaccountReportingLive: isAccountUiOptionSet('subaccount_reporting')(state),
});

const mapDispatchToProps = { inviteUser, showAlert };

const ReduxCreatePage = reduxForm({ form: FORMS.INVITE_USER })(CreatePage);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReduxCreatePage));
