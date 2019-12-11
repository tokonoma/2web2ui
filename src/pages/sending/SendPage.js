import React, { useState } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  TemplateTypeaheadWrapper,
  TextFieldWrapper,
  RecipientListTypeaheadWrapper,
  IpPoolTypeaheadWrapper,
  CheckboxWrapper,
} from 'src/components/reduxFormWrappers';

import { getRecipientList } from 'src/actions/recipientLists';
import { sendEmail } from 'src/actions/templates';
import { required } from 'src/helpers/validation';
import Fireworks from './components/Fireworks';
import ThatWasEasyButton from 'src/components/thatWasEasyButton/ThatWasEasyButton';
import SingleDatePicker from './components/SingleDatePicker';
import { showAlert } from 'src/actions/globalAlert';

const SendPage = ({ getRecipientList, sendEmail, handleSubmit, loading, showAlert, sendLater }) => {
  const [start_time, setStartTime] = useState(null);
  const [hasFireworks, setHasFireworks] = useState(false);
  const [requestBody, setRequestBody] = useState(null);

  const onSubmit = ({ recipientList, template, campaignId, ippool = {} }) => {
    const { id: ipPool } = ippool;
    const { id: rlID } = recipientList;
    const { id: templateID } = template;
    const options = {};

    setRequestBody();

    if (sendLater) {
      options.start_time = start_time;
    }
    if (ipPool) {
      options.ip_pool = ipPool;
    }
    return getRecipientList(rlID, { show_recipients: true }).then(({ recipients }) => {
      return sendEmail({ id: templateID, recipients, campaignId, options }).then(() => {
        setHasFireworks(true);
        showAlert({
          type: 'success',
          message: 'Big Send!',
        });
      });
    });
  };

  return (
    <Page title="Send an Email">
      {hasFireworks && <Fireworks size="400" repetitions={2} />}
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

            <div style={{ marginTop: 20 }}>
              <ThatWasEasyButton isLoading={loading} />
            </div>
          </Panel.Section>
        </Panel>
      </form>
      {requestBody && <div>Do you want to see how this was sent?</div>}
    </Page>
  );
};

const formOptions = { form: 'SEND_FORM', enableReinitialize: true };

const MSTP = state => ({
  loading: state.recipientLists.currentLoading || state.templates.sendPending,
  sendLater: formValueSelector('SEND_FORM')(state, 'sendLater'),
});
const MDTP = {
  getRecipientList,
  sendEmail,
  showAlert,
};
export default connect(MSTP, MDTP)(reduxForm(formOptions)(SendPage));
