/* eslint-disable max-lines */
import React, { Component } from 'react';
import { Field, Form } from 'redux-form';
// Components
import { Panel, Grid, Button, Expandable, Error } from '@sparkpost/matchbox';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import FilterFields from './fields/FilterFields';
import EvaluatorFields from './fields/EvaluatorFields';
import SubaccountField from './fields/SubaccountsField';
import getOptions from '../helpers/getOptions';
import { getFormSpec, capitalizeFirstLetter } from '../helpers/alertForm';
import { METRICS, REALTIME_FILTERS, NOTIFICATION_CHANNELS } from '../constants/formConstants';
import { EmailIcon, SlackIcon, WebhookIcon } from 'src/components/icons';
import styles from './AlertForm.module.scss';
import withAlertForm from './AlertForm.container';

// Helpers & Validation
import { emails, ifStringPresent, maxLength, required } from 'src/helpers/validation';
const metricsOptions = [{ value: '', label: 'Select Metric', disabled: true }, ...getOptions(METRICS)];
const notificationChannelData = {
  emails: {
    icon: <EmailIcon />,
    subtitle: 'You and your team can receive alerts through email',
    fieldProps: {
      validate: ifStringPresent(emails),
      placeholder: 'example@email.com',
      multiline: true
    }
  },
  slack: {
    icon: <SlackIcon />,
    subtitle: 'Integrate this alert with Slack',
    fieldProps: {
      placeholder: 'https://hooks.slack.com/services/T00/B00/XX '
    }
  },
  webhook: {
    icon: <WebhookIcon />,
    subtitle: 'Create a webhook for this alert',
    fieldProps: {
      placeholder: 'https://example.com/webhook-target'
    }
  }
};

export class AlertForm extends Component {

  resetFormValues = (event, isNewAlert, isDuplicate) => {
    const { change } = this.props;
    const formSpec = getFormSpec(event.target.value);
    const { defaultFieldValues } = formSpec;
    REALTIME_FILTERS.forEach((filter) => {
      change(filter, []);
    });
    change('single_filter', { filter_type: 'none', filter_values: []});
    defaultFieldValues.forEach(({ fieldName, fieldValue }) => {
      if (fieldName === 'value') {
        if (isNewAlert && !isDuplicate) {
          change(fieldName, fieldValue);
        }
      } else {
        change(fieldName, fieldValue);
      }
    });
  };

  renderNotificationChannels = () => NOTIFICATION_CHANNELS.map((channel) =>
    (
      <Expandable
        icon={notificationChannelData[channel].icon}
        title={capitalizeFirstLetter(channel)}
        id={channel}
        subtitle={notificationChannelData[channel].subtitle}
        key={channel}>
        <Field
          name={channel}
          component={TextFieldWrapper}
          disabled={this.props.submitting}
          {...notificationChannelData[channel].fieldProps}
        />
      </Expandable>
    )
  );

  isNotificationChannelsEmpty = (formMeta, formErrors) =>
    NOTIFICATION_CHANNELS.some((channel) =>
      (formMeta[channel] && formMeta[channel].touched) && formErrors[channel] === 'At least one notification channel must not be empty');

  render() {
    const {
      pristine,
      submitting,
      metric,
      handleSubmit,
      hasSubaccounts,
      formErrors,
      formMeta,
      isNewAlert,
      isDuplicate
    } = this.props;

    const submitText = submitting ? 'Submitting...' : (isNewAlert ? 'Create Alert' : 'Update Alert');
    const isSubmitDisabled = (pristine && !isDuplicate) || submitting; //Allows user to create the same alert if if's a duplicate
    const formSpec = getFormSpec(metric);
    const channelsError = this.isNotificationChannelsEmpty(formMeta, formErrors);
    return (
      <Form onSubmit={handleSubmit}>
        <Panel className = {styles.Form}>
          <Grid>
            <Grid.Column sm={12} md={11} lg={9}>
              <Panel.Section>
                <label>Alert Name</label>
                <Field
                  name='name'
                  component={TextFieldWrapper}
                  disabled={submitting}
                  validate={[required, maxLength(50)]}
                />
                <div className={styles.MetricSelector}>
                  <label>Alert Metric</label>
                  <Field
                    name='metric'
                    component={SelectWrapper}
                    options={metricsOptions}
                    onChange={(event) => this.resetFormValues(event, isNewAlert, isDuplicate)}
                    validate={required}
                  />
                </div>
                {metric !== '' &&
                <div className={styles.Evaluator}>
                  <EvaluatorFields
                    key={isNewAlert && !isDuplicate ? metric : 'evaluator-field'}
                    disabled={submitting}
                    isNewAlert={isNewAlert}
                    isDuplicate={isDuplicate}
                  />
                </div>
                }
                {formSpec.hasFilters &&
                  <div className={styles.Filters}>
                    <label><h5>Filtered by <small className={styles.OptionalText}>optional</small></h5></label>
                    {hasSubaccounts &&
                      <SubaccountField
                        disabled={submitting}
                      />
                    }
                    <FilterFields
                      disabled={submitting}
                    />
                  </div>}
                <div className={styles.Notifications}>
                  <label> Notify Me</label>
                  {channelsError && <Error wrapper='div' error='At least one notification channel must be not empty'/>}
                  {this.renderNotificationChannels()}
                </div>
                <Button submit primary disabled={isSubmitDisabled} className={styles.SubmitButton}>{submitText}</Button>
              </Panel.Section>
            </Grid.Column>
          </Grid>
        </Panel>
      </Form>
    );
  }
}

AlertForm.defaultProps = { metric: '' };

export default withAlertForm(AlertForm);
