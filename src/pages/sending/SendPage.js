import React, { useState } from 'react';
import { Page, Panel, Expandable, UnstyledLink } from '@sparkpost/matchbox';
import { Code } from '@sparkpost/matchbox-icons';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  TemplateTypeaheadWrapper,
  TextFieldWrapper,
  RecipientListTypeaheadWrapper,
  IpPoolTypeaheadWrapper,
  CheckboxWrapper,
} from 'src/components/reduxFormWrappers';

import CodeBlock from 'src/pages/recipientValidation/components/CodeBlock';

import { sendEmail } from 'src/actions/templates';
import { required } from 'src/helpers/validation';
import Fireworks from './components/Fireworks';
import ThatWasEasyButton from 'src/components/thatWasEasyButton/ThatWasEasyButton';
import SingleDatePicker from './components/SingleDatePicker';
import { showAlert } from 'src/actions/globalAlert';

const SendPage = ({ sendEmail, handleSubmit, loading, showAlert, sendLater }) => {
  const [start_time, setStartTime] = useState(null);
  const [hasFireworks, setHasFireworks] = useState(false);
  const [requestBody, setRequestBody] = useState();

  const onSubmit = ({ recipientList, template, campaignId, ippool }) => {
    const { id: templateID } = template;
    const options = {};

    const recipients = {
      list_id: recipientList.id,
    };

    setRequestBody();

    if (sendLater) {
      options.start_time = start_time;
    }
    if (ippool && ippool.id) {
      options.ip_pool = ippool.id;
    }
    return sendEmail({ id: templateID, recipients, campaignId, options }).then(() => {
      setRequestBody({
        campaign_id: campaignId,
        content: { template_id: templateID },
        options,
        recipients,
      });
      setHasFireworks(true);
      showAlert({
        type: 'success',
        message: 'EZSent!',
      });
    });
  };

  return (
    <Page title="Send an Email">
      {hasFireworks && <Fireworks size="400" repetitions={2} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel title="Configuration">
          <Panel.Section>
            <h6>Basic</h6>
            <div style={{ maxWidth: 600 }}>
              <Field
                name="campaignId"
                label="Campaign ID"
                component={TextFieldWrapper}
                validate={required}
                required
              />
              <Field
                name="recipientList"
                label="Recipient List"
                placeholder="Type to search"
                component={RecipientListTypeaheadWrapper}
                validate={required}
                required
              />
              <Field
                name="template"
                label="Template"
                placeholder="Type to search"
                component={TemplateTypeaheadWrapper}
                validate={required}
                required
              />
            </div>
          </Panel.Section>
          <Panel.Section>
            <h6>Advanced</h6>
            <div style={{ maxWidth: 600 }}>
              <Field
                name="ippool"
                label="IP Pool"
                component={IpPoolTypeaheadWrapper}
                helpText={'Uses default IP pool if none selected'}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Field
                name="sendLater"
                label="Send at a later time?"
                type="checkbox"
                component={CheckboxWrapper}
              />
              {sendLater ? (
                <SingleDatePicker
                  onChange={e => {
                    setStartTime(new Date(e.target.value));
                  }}
                />
              ) : null}
            </div>
          </Panel.Section>
          <Panel.Section>
            <ThatWasEasyButton style={{ margin: 20 }} isLoading={loading} />
          </Panel.Section>
        </Panel>
      </form>
      {requestBody && (
        <div style={{ backgroundColor: 'white' }}>
          <Expandable id="code-expandable" title="See how we did this" icon={<Code size={30} />}>
            <div style={{ marginBottom: 15 }}>
              We used the information you provided to send an email through our{' '}
              <UnstyledLink to={'https://developers.sparkpost.com/api/transmissions/'}>
                Transmissions API
              </UnstyledLink>
              . Here is the API call we put together:
            </div>

            <code>POST /api/v1/transmissions</code>
            <div style={{ marginTop: 15, maxHeight: 300, overflowY: 'auto' }}>
              <CodeBlock>{JSON.stringify(requestBody, null, 2)}</CodeBlock>
            </div>
          </Expandable>
        </div>
      )}
    </Page>
  );
};

const formOptions = { form: 'SEND_FORM', enableReinitialize: true };

const MSTP = state => ({
  loading: state.recipientLists.currentLoading || state.templates.sendPending,
  sendLater: formValueSelector('SEND_FORM')(state, 'sendLater'),
});
const MDTP = {
  sendEmail,
  showAlert,
};
export default connect(MSTP, MDTP)(reduxForm(formOptions)(SendPage));
