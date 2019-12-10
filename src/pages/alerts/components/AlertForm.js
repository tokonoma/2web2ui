import React, { Component } from 'react';
import { Field, Form } from 'redux-form';
// Components
import { Panel, Grid, Button, Expandable, Error } from '@sparkpost/matchbox';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import FilterFields from './fields/FilterFields';
import EvaluatorFields from './fields/EvaluatorFields';
import SubaccountField from './fields/SubaccountsField';
import { getFormSpec, capitalizeFirstLetter } from '../helpers/alertForm';
import {
  METRICS,
  REALTIME_FILTERS,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_CHANNEL_DATA,
} from '../constants/formConstants';
import styles from './AlertForm.module.scss';
import withAlertForm from './AlertForm.container';
// Helpers & Validation
import { maxLength, required } from 'src/helpers/validation';

const metricOptions = [
  { value: '', label: 'Select Metric', disabled: true },
  ...Object.keys(METRICS).map(key => ({ label: METRICS[key], value: key })),
];

export class AlertForm extends Component {
  resetFormValues = event => {
    const { change, isNewAlert, isDuplicate } = this.props;
    const formSpec = getFormSpec(event.target.value);
    const { defaultFieldValues, defaultRecommendedValue } = formSpec;
    REALTIME_FILTERS.forEach(filter => {
      change(filter, []);
    });
    change('single_filter', { filter_type: 'none', filter_values: [] });
    defaultFieldValues.forEach(({ fieldName, fieldValue }) => {
      change(fieldName, fieldValue);
    });
    if (isNewAlert && !isDuplicate) {
      change('value', defaultRecommendedValue);
    }
  };

  renderNotificationChannels = () =>
    NOTIFICATION_CHANNELS.map(channel => (
      <Expandable
        icon={NOTIFICATION_CHANNEL_DATA[channel].icon}
        title={capitalizeFirstLetter(channel)}
        id={channel}
        subtitle={NOTIFICATION_CHANNEL_DATA[channel].subtitle}
        key={channel}
      >
        <Field
          name={channel}
          component={TextFieldWrapper}
          disabled={this.props.submitting}
          {...NOTIFICATION_CHANNEL_DATA[channel].fieldProps}
        />
      </Expandable>
    ));

  isNotificationChannelsEmpty = (formMeta, formErrors) =>
    NOTIFICATION_CHANNELS.some(
      channel =>
        formMeta[channel] &&
        formMeta[channel].touched &&
        formErrors[channel] === 'At least one notification channel must not be empty',
    );

  render() {
    const {
      allowInjectionAlerts,
      pristine,
      submitting,
      metric,
      handleSubmit,
      hasSubaccounts,
      formErrors,
      formMeta,
      isNewAlert,
      isDuplicate,
    } = this.props;

    const submitText = submitting ? 'Submitting...' : isNewAlert ? 'Create Alert' : 'Update Alert';
    const isSubmitDisabled = (pristine && !isDuplicate) || submitting; //Allows user to create the same alert if if's a duplicate
    const formSpec = getFormSpec(metric);
    const channelsError = this.isNotificationChannelsEmpty(formMeta, formErrors);

    const visibleMetricOptions = metricOptions.filter(option => {
      if (isNewAlert && option.value === 'injection_count' && !allowInjectionAlerts) {
        return false;
      }

      return true;
    });

    return (
      <Form onSubmit={handleSubmit}>
        <Panel className={styles.Form}>
          <Grid>
            <Grid.Column sm={12} md={11} lg={9}>
              <Panel.Section>
                <label>Alert Name</label>
                <Field
                  name="name"
                  component={TextFieldWrapper}
                  disabled={submitting}
                  validate={[required, maxLength(50)]}
                />
                <div className={styles.MetricSelector}>
                  <label>Alert Metric</label>
                  <Field
                    name="metric"
                    component={SelectWrapper}
                    options={visibleMetricOptions}
                    onChange={this.resetFormValues}
                    validate={required}
                  />
                </div>
                {metric !== '' && (
                  <div className={styles.Evaluator}>
                    <EvaluatorFields
                      key={metric}
                      disabled={submitting}
                      shouldUpdateRecommendation={isNewAlert && !isDuplicate}
                    />
                  </div>
                )}
                {formSpec.hasFilters && (
                  <div className={styles.Filters}>
                    <label>
                      <h5>
                        Filtered by{' '}
                        <small className={styles.OptionalText}>
                          Add up to 10 filters to your alert.
                        </small>
                      </h5>
                    </label>
                    {hasSubaccounts && <SubaccountField disabled={submitting} />}
                    <FilterFields disabled={submitting} />
                  </div>
                )}
                <div className={styles.Notifications}>
                  <label> Notify Me</label>
                  {channelsError && (
                    <Error
                      wrapper="div"
                      error="At least one notification channel must be not empty"
                    />
                  )}
                  {this.renderNotificationChannels()}
                </div>
                <Button submit primary disabled={isSubmitDisabled} className={styles.SubmitButton}>
                  {submitText}
                </Button>
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
