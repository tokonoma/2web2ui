/* eslint max-lines: ["error", 300] */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form, formValueSelector } from 'redux-form';

// Components
import { Panel, Grid, Button } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import ToggleBlock from 'src/components/toggleBlock/ToggleBlock';
import { TextFieldWrapper, SelectWrapper, RadioGroup, SubaccountTypeaheadWrapper } from 'src/components';
import formatEditValues from '../helpers/formatEditValues';
import getOptions from '../helpers/getOptions';
import { METRICS } from '../constants/metrics';
import { FACETS } from '../constants/facets';
import { COMPARATOR } from '../constants/comparator';
import { CRITERIA } from '../constants/criteria';
import _ from 'lodash';


// Helpers & Validation
import { required } from 'src/helpers/validation';

const formName = 'alertForm';

const createOptions = [
  { label: 'Master and all subaccounts', value: 'all' },
  { label: 'Master account only', value: 'master' },
  { label: 'Single Subaccount', value: 'subaccount' }
];

export class AlertForm extends Component {

  // Prevents unchecked value from equaling ""
  parseToggle = (value) => !!value

  render() {
    const {
      submitting,
      submitText,
      assignTo,
      alert_metric,
      facet_name,
      handleSubmit,
      enabled
    } = this.props;

    const isSignals = alert_metric.startsWith('signals_');

    return (
      <Form onSubmit={handleSubmit}>
        <Panel>
          <Panel.Section>
            <Field
              name='name'
              label='Name'
              component={TextFieldWrapper}
              disabled={submitting}
              validate={required}
            />
            <Field
              name='alert_metric'
              label='Alert Type'
              component={SelectWrapper}
              options={getOptions(METRICS)}
              disabled={true}
              validate={required}
            />
            {isSignals &&
            <Field
              component={RadioGroup}
              label='Account'
              name='assignTo'
              options={createOptions}
            />}
            {isSignals && assignTo === 'subaccount' &&
            <Field
              name='subaccount'
              component={SubaccountTypeaheadWrapper}
              validate={required}
            />}
            {isSignals &&
            <label>Facet</label>}
            {isSignals &&
            <Grid>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='facet_name'
                    component={SelectWrapper}
                    options={getOptions(FACETS)}
                    disabled={submitting}
                    validate={required}
                  />
                </div>
              </Grid.Column>
              {facet_name !== 'ALL' &&
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='facet_value'
                    component={TextFieldWrapper}
                    disabled={submitting}
                    validate={required}
                  />
                </div>
              </Grid.Column>}
            </Grid>}
            {isSignals && <br/>}
            <label>Criteria</label>
            <Grid>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_comparator'
                    component={SelectWrapper}
                    options={getOptions(COMPARATOR)}
                    disabled={submitting}
                    validate={required}
                  />
                </div>
              </Grid.Column>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_value'
                    component={TextFieldWrapper}
                    disabled={submitting}
                    validate={required}
                  />
                </div>
              </Grid.Column>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_metric'
                    component={SelectWrapper}
                    options={getOptions(CRITERIA)}
                    disabled={true}
                    validate={required}
                  />
                </div>
              </Grid.Column>
            </Grid>
            <br/>
            <Field
              name='email_addresses'
              label='Notify'
              component={TextFieldWrapper}
              disabled={submitting}
              validate={required}
              multiline
            />
            <Grid>
              <Grid.Column xs={1} md={1}>
                <label>Enabled</label>
              </Grid.Column>
              <Grid.Column xs={1} md={1}>
                <div>
                  <Field
                    name='enabled'
                    checked={enabled}
                    component={ToggleBlock}
                    parse={this.parseToggle}
                    disabled={submitting}
                  />
                </div>
              </Grid.Column>
            </Grid>
            <br/>
            <Button submit primary disabled={submitting}>{submitText}</Button>
          </Panel.Section>
        </Panel>
      </Form>
    );
  }
}
const mapStateToProps = (state, props) => {
  const alertValues = formatEditValues(state, state.alerts.get);
  const selector = formValueSelector(formName);

  return {
    disabled: props.pristine || props.submitting,
    submitText: props.submitting ? 'Submitting...' : (props.newAlert ? 'Create Alert' : 'Update Alert'),
    alert_metric: selector(state, 'alert_metric') || _.get(alertValues, 'alert_metric', 'monthly_sending_limit'),
    facet_name: selector(state, 'facet_name') || _.get(alertValues, 'facet_name', 'ALL'),
    assignTo: selector(state, 'assignTo') || _.get(alertValues, 'assignTo', 'all'),
    alert_subaccount: selector(state, 'alert_subaccount') || _.get(alertValues, 'alert_subaccount', -1),
    enabled: selector(state, 'enabled'),
    email_addresses: selector(state, 'email_addresses'),
    initialValues: alertValues
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

export default withRouter(connect(mapStateToProps, {})(reduxForm(formOptions)(AlertForm)));
