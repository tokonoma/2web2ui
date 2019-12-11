import React from 'react';
import { Page, Panel, Button } from '@sparkpost/matchbox';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  TemplateTypeaheadWrapper,
  TextFieldWrapper,
  RecipientListTypeaheadWrapper,
} from 'src/components/reduxFormWrappers';

import { getRecipientList } from 'src/actions/recipientLists';
import { sendEmail } from 'src/actions/templates';
import { required } from 'src/helpers/validation';

const SendPage = ({ getRecipientList, sendEmail, handleSubmit, loading }) => {
  const onSubmit = ({ recipientList, template, campaignId }) => {
    const { id: rlID } = recipientList;
    const { id: templateID } = template;
    return getRecipientList(rlID, { show_recipients: true }).then(({ recipients }) => {
      //return sendEmail({ id: templateId, emails: recipients, campaignId});
    });
  };

  return (
    <Page title="Send an Email">
      <Panel>
        <Panel.Section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ maxWidth: 600 }}>
              <Field
                name="campaignId"
                label="Campaign ID"
                component={TextFieldWrapper}
                validate={required}
              />
              <Field
                name="recipientList"
                label="Recipient List"
                placeholder="Type to search"
                component={RecipientListTypeaheadWrapper}
                validate={required}
              />
              <Field
                name="template"
                label="Template"
                placeholder="Type to search"
                component={TemplateTypeaheadWrapper}
                validate={required}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button color="blue" disabled={loading} large={true} type="submit">
                {loading ? 'Sending...' : 'SEND!'}
              </Button>
            </div>
          </form>
        </Panel.Section>
      </Panel>
    </Page>
  );
};

const formOptions = { form: 'SEND_FORM', enableReinitialize: true };

const MSTP = state => ({
  loading: state.recipientLists.currentLoading || state.templates.sendPending,
});
const MDTP = {
  getRecipientList,
  sendEmail,
};
export default connect(MSTP, MDTP)(reduxForm(formOptions)(SendPage));
