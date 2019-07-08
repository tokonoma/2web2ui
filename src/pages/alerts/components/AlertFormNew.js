import React, { Component } from 'react';
import { Field, Form } from 'redux-form';

// Components
import { Panel, Grid, Button, Expandable } from '@sparkpost/matchbox';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import FilterFields from './fields/FilterFields';
import EvaluatorFields from './fields/EvaluatorFields';
import SubaccountField from './fields/SubaccountsField';
import getOptions from '../helpers/getOptions';
import { getFormSpec } from '../helpers/alertForm';
import { METRICS, REALTIME_FILTERS } from '../constants/formConstants';
import { Email } from '../constants/notificationChannelIcons';
import styles from './AlertForm.module.scss';
import withAlertForm from './AlertFormNew.container';

// Helpers & Validation
import { required, maxLength } from 'src/helpers/validation';
import validateEmailList from '../helpers/validateEmailList';

const metricsOptions = [{ value: '', label: 'Select Metric', disabled: true }, ...getOptions(METRICS)];

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

  render() {
    const {
      pristine,
      submitting,
      metric,
      handleSubmit,
      hasSubaccounts,
      invalid
    } = this.props;

    const submitText = submitting ? 'Submitting...' : 'Create Alert';
    const formSpec = getFormSpec(metric);

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
                    helpText={'This assignment is permanent.'}
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
                <Expandable
                  icon = {<Email/>}
                  title="Email"
                  id="email"
                  subtitle="You and your team can receive alerts through email">
                  <Field
                    name='email_addresses'
                    component={TextFieldWrapper}
                    disabled={submitting}
                    validate={[required, validateEmailList]}
                    placeholder='list of comma delimited emails'
                    multiline
                  />
                </Expandable>
                <br/>
                <Button submit primary disabled={pristine || submitting || invalid}>{submitText}</Button>
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
