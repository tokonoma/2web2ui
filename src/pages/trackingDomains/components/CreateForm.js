import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Panel, Stack } from 'src/components/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required } from 'src/helpers/validation';
import { SubaccountTypeaheadWrapper } from 'src/components/reduxFormWrappers';

export class CreateForm extends Component {
  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <Panel>
        <form onSubmit={handleSubmit}>
          <Panel.Section>
            <Stack>
              <Field
                component={TextFieldWrapper}
                label="Domain Name"
                name="domain"
                // Do not try to validate tracking domains, let our API make that decision
                validate={[required]}
                disabled={submitting}
              />
              <Field
                component={SubaccountTypeaheadWrapper}
                name="subaccount"
                helpText="Leaving this field blank will permanently assign the tracking domain to the master account."
                disabled={submitting}
              />
            </Stack>
          </Panel.Section>

          <Panel.Section>
            <Button submit variant="primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Tracking Domain'}
            </Button>
          </Panel.Section>
        </form>
      </Panel>
    );
  }
}

const formOptions = {
  form: 'createTrackingDomain',
};

export default reduxForm(formOptions)(CreateForm);
