import React, { useState } from 'react';
import { Page, Panel, Expandable, UnstyledLink, Button } from '@sparkpost/matchbox';
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

const SendPage = ({ sendEmail, handleSubmit, loading, showAlert, sendLater, doesntLikeFun }) => {
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
    return sendEmail({ id: templateID, recipients, campaignId, options }).then(res => {
      const request = {
        campaign_id: campaignId,
        content: { template_id: templateID },
        options,
        recipients,
      };
      setRequestBody(request);

      const outbox = localStorage.getItem('outbox');
      const fullOutbox = outbox ? JSON.parse(outbox) : [];
      localStorage.setItem(
        'outbox',
        JSON.stringify(
          fullOutbox.concat([
            {
              id: res.id,
              sendTime: start_time || new Date(),
              template,
              recipientList,
              ipPool: ippool,
            },
          ]),
        ),
      );

      if (!doesntLikeFun) {
        setHasFireworks(true);
      }
      showAlert({
        type: 'success',
        message: doesntLikeFun ? 'Sent I guess.' : 'EZSent!',
      });
    });
  };

  return (
    <Page title="Send an Email">
      {hasFireworks && !doesntLikeFun && <Fireworks size="400" repetitions={2} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="doesntLikeFun"
          label="I don't like fun."
          type="checkbox"
          component={CheckboxWrapper}
        />
        <Panel
          title="Configuration"
          style={{
            backgroundImage:
              doesntLikeFun &&
              requestBody &&
              'url("https://blackxknite.files.wordpress.com/2017/03/lameasaurus.jpg?w=552")',
          }}
        >
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
            <div style={{ marginTop: 20, maxWidth: 600 }}>
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
            {doesntLikeFun ? (
              <Button type="submit">Boring Send</Button>
            ) : (
              <ThatWasEasyButton style={{ margin: 20 }} isLoading={loading} />
            )}
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
  doesntLikeFun: formValueSelector('SEND_FORM')(state, 'doesntLikeFun'),
});
const MDTP = {
  sendEmail,
  showAlert,
};
export default connect(MSTP, MDTP)(reduxForm(formOptions)(SendPage));
