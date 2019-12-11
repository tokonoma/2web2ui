import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Panel, Button } from '@sparkpost/matchbox';
import { CheckboxWrapper, TextFieldWrapper } from 'src/components';
import { required, domain } from 'src/helpers/validation';
import { hasSubaccounts } from 'src/selectors/subaccounts';

import SubaccountForm from './SubaccountForm';

const FORM_NAME = 'createSendingDomain';

export class CreateForm extends Component {
  render() {
    const { submitting, handleSubmit, hasSubaccounts } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Panel.Section>
          <p>
            We recommend using a subdomain e.g. <em>mail.mydomain.com</em>. Depending on how you
            want to use your domain, you may not be able to completely configure your DNS records if
            you use your organizational domain.
          </p>
          <Field
            component={TextFieldWrapper}
            label="Domain Name"
            placeholder="email.example.com"
            name="domain"
            validate={[required, domain]}
            disabled={submitting}
          />
          {hasSubaccounts && <SubaccountForm formName={FORM_NAME} />}
        </Panel.Section>
        <Panel.Section>
          <Field
            component={CheckboxWrapper}
            label="Do you want us to be handle your DNS?"
            name="delegated"
          />
        </Panel.Section>
        <Panel.Section>
          <Button submit primary disabled={submitting}>
            {submitting ? 'Submitting...' : 'Add Domain'}
          </Button>
        </Panel.Section>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  hasSubaccounts: hasSubaccounts(state),
  initialValues: {
    assignTo: 'master',
    dedicated: false,
  },
});

const formOptions = { form: FORM_NAME };
export default connect(mapStateToProps, {})(reduxForm(formOptions)(CreateForm));
