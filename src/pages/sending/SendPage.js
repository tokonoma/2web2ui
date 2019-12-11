import React from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  TemplateTypeaheadWrapper,
  TextFieldWrapper,
  RecipientListTypeaheadWrapper,
  IpPoolTypeaheadWrapper,
} from 'src/components/reduxFormWrappers';

import { getRecipientList } from 'src/actions/recipientLists';
import { sendEmail } from 'src/actions/templates';
import { required } from 'src/helpers/validation';
import ThatWasEasyButton from 'src/components/thatWasEasyButton/ThatWasEasyButton';

const SendPage = ({ getRecipientList, sendEmail, handleSubmit, loading }) => {
  const onSubmit = ({ recipientList, template, campaignId, ippool }) => {
    const { id: ipPool } = ippool;
    const { id: rlID } = recipientList;
    const { id: templateID } = template;
    return getRecipientList(rlID, { show_recipients: true }).then(({ recipients }) => {
      //return sendEmail({ id: templateId, emails: recipients, campaignId, ipPool: });
    });
  };

  return (
    <Page title="Send an Email">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel>
          <Panel.Section>
            <h6>Configuration</h6>
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
          </Panel.Section>
          <Panel.Section>
            <h6>Options</h6>
            <div style={{ maxWidth: 600 }}>
              <Field
                name="ippool"
                label="IP Pool"
                component={IpPoolTypeaheadWrapper}
                helpText={'Uses default IP pool if none selected'}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <ThatWasEasyButton isLoading={loading} />
            </div>
          </Panel.Section>
        </Panel>
      </form>
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
