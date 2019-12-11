import React from 'react';
import { Page, Panel, Button } from '@sparkpost/matchbox';
import { reduxForm, Field } from 'redux-form';
import {
  TemplateTypeaheadWrapper,
  TextFieldWrapper,
  RecipientListTypeaheadWrapper,
} from 'src/components/reduxFormWrappers';

const SendPage = () => {
  // const onSubmit = values => {};

  return (
    <Page title="Send an Email">
      <Panel>
        <Panel.Section>
          <form /**onSubmit={handleSubmit(onSubmit)}*/>
            <div style={{ maxWidth: 600 }}>
              <Field name="campaignid" label="Campaign ID" component={TextFieldWrapper} />
              <Field
                name="recipient-list"
                label="Recipient List"
                placeholder="Type to search"
                component={RecipientListTypeaheadWrapper}
              />
              <Field
                name="templates"
                label="Template"
                placeholder="Type to search"
                component={TemplateTypeaheadWrapper}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button color="blue" large>
                SEND!
              </Button>
            </div>
          </form>
        </Panel.Section>
      </Panel>
    </Page>
  );
};

const formOptions = { form: 'SEND_FORM', enableReinitialize: true };

export default reduxForm(formOptions)(SendPage);
