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
import { Email, Webhook, Slack } from '../constants/notificationChannelIcons';
import styles from './AlertForm.module.scss';
import withAlertForm from './AlertFormNew.container';

// Helpers & Validation
import { required, maxLength } from 'src/helpers/validation';
import validateEmailList from '../helpers/validateEmailList';

const metricsOptions = [{ value: '', label: 'Select Metric', disabled: true }, ...getOptions(METRICS)];

const notificationChannelData = {
  emails: {
    icon: <Email/>,
    subtitle: 'You and your team can receive alerts through email',
    fieldProps: {
      validate: validateEmailList,
      placeholder: 'example@email.com',
      multiline: true,
      helpText: 'Max of 10 emails'
    }
  },
  slack: {
    icon: <Slack/>,
    subtitle: 'Integrate alerts into your Slack channel',
    fieldProps: {
      placeholder: 'https://hooks.slack.com/services/T00/B00/XX '
    }
  },
  webhook: {
    icon: <Webhook/>,
    subtitle: 'Create a webhook for your alerts',
    fieldProps: {
      placeholder: 'https://example.com/webhook-target'
    }
  }
};

export class AlertFormNew extends Component {

  resetFormValues = (event) => {
    const { change } = this.props;
    const formSpec = getFormSpec(event.target.value);
    const { defaultFieldValues } = formSpec;

    REALTIME_FILTERS.forEach((filter) => {
      change(filter, []);
    });
    change('single_filter', { filter_type: 'none', filter_values: []});
    defaultFieldValues.forEach(({ fieldName, fieldValue }) => {
      change(fieldName, fieldValue);
    });
    change('value', 0);
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
      isNewAlert
    } = this.props;

    const submitText = submitting ? 'Submitting...' : (isNewAlert ? 'Create Alert' : 'Update Alert');
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
                  validate={[required, maxLength(24)]}
                />
                <div className = {styles.MetricSelector}>
                  <label>Alert Metric</label>
                  <Field
                    name='metric'
                    component={SelectWrapper}
                    options={metricsOptions}
                    onChange={this.resetFormValues}
                    validate={required}
                  />
                </div>
                {formSpec.hasFilters &&
                  <>
                    <label><h5>Filtered by <span className={styles.OptionalText}>optional</span></h5></label>
                    {hasSubaccounts &&
                      <SubaccountField
                        disabled={submitting}
                      />
                    }
                    <FilterFields
                      disabled={submitting}
                    />
                </>}
                {metric !== '' &&
                  <div className={styles.Evaluator}>
                    <EvaluatorFields
                      disabled={submitting}
                    />
                  </div>
                }
                <label> Notify Me</label>
                {channelsError && <Error wrapper='div' error='At least one notification channel must be not empty'/>}
                {this.renderNotificationChannels()}
                <Button submit primary disabled={pristine || submitting} className={styles.SubmitButton}>{submitText}</Button>
              </Panel.Section>
            </Grid.Column>
          </Grid>
        </Panel>
      </Form>
    );
  }
}

AlertFormNew.defaultProps = { metric: '' };

export default withAlertForm(AlertFormNew);
