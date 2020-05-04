import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Box, Button, Panel, Stack } from 'src/components/matchbox';
import { ButtonWrapper, TextFieldWrapper } from 'src/components';
import { required, domain } from 'src/helpers/validation';
import { SubaccountTypeaheadWrapper } from 'src/components/reduxFormWrappers';

const maxWidth = '860px'; //TODO: Remove max width on adding Hibana tokens
export class CreateForm extends Component {
  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <Panel sectioned>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Box maxWidth={maxWidth}>
              <Field
                component={TextFieldWrapper}
                label="Domain Name"
                name="domain"
                validate={[required, domain]}
                disabled={submitting}
              />
            </Box>
            <Box maxWidth={maxWidth}>
              <Field
                component={SubaccountTypeaheadWrapper}
                name="subaccount"
                helpText="Leaving this field blank will permanently assign the tracking domain to the master account."
                disabled={submitting}
              />
            </Box>
          </Stack>
          <ButtonWrapper>
            <Button submit variant="primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Tracking Domain'}
            </Button>
          </ButtonWrapper>
        </form>
      </Panel>
    );
  }
}

const formOptions = {
  form: 'createTrackingDomain',
};

export default reduxForm(formOptions)(CreateForm);
