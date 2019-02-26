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
import getSubaccountFromId from '../helpers/getSubaccountFromId';
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
      canModify,
      submitting,
      submitText,
      readOnly,
      // newAlert,
      // deletePending,
      // error,
      // enabled,
      assignTo,
      alert_metric,
      facet_name
      // subaccount,
      // alert_subaccount,
      // criteria_comparator,
      // criteria_value,
      // criteria_metric
    } = this.props;
    //console.log('alert_metric', alert_metric);



    const disabled = !canModify || submitting;
    //const booleanValue = true;
    const isSignals = alert_metric.startsWith('signals_');

    return (
      <Form onSubmit={this.submitAlert}>
        <Panel>
          <Panel.Section>
            <Field
              name='name'
              label='Name'
              component={TextFieldWrapper}
              disabled={readOnly}
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
              name='alert_subaccount'
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
                    disabled={readOnly}
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
                    disabled={readOnly}
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
                    disabled={readOnly}
                    validate={required}
                  />
                </div>
              </Grid.Column>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_value'
                    component={TextFieldWrapper}
                    disabled={readOnly}
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
                    disabled={readOnly}
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
              disabled={readOnly}
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
                    component={ToggleBlock}
                    parse={this.parseToggle}
                    disabled={readOnly}
                  />
                </div>
              </Grid.Column>
            </Grid>
            <br/>
            <Button submit primary disabled={disabled}>{submitText}</Button>
          </Panel.Section>
        </Panel>
      </Form>
    );
  }
}
const mapStateToProps = (state, props) => {
  //console.log('state', state.alerts.get);
  //console.log('props.newAlert', props.newAlert);
  const alertValues = formatEditValues(state, state.alerts.get);
  alertValues.criteria_metric = 'threshold';
  alertValues.facet_name = 'sending_domain';
  //console.log('alertValues', alertValues);
  const selector = formValueSelector(formName);
  //console.log('enabled', selector(state, 'enabled'));
  //console.log('assignTo', selector(state, 'assignTo'));
  //console.log('subaccount', selector(state, 'subaccount'));

  return {
    disabled: props.pristine || props.submitting,
    submitText: props.submitting ? 'Submitting...' : (props.newAlert ? 'Create Alert' : 'Update Alert'),
    alert_metric: selector(state, 'alert_metric') || _.get(alertValues, 'alert_metric', 'monthly_sending_limit'),
    facet_name: selector(state, 'facet_name') || _.get(alertValues, 'facet_name', 'ALL'),
    assignTo: selector(state, 'assignTo'),
    alert_subaccount: selector(state, 'alert_subaccount'),
    subaccount: getSubaccountFromId(state, selector(state, 'alert_subaccount')),
    initialValues: alertValues
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

export default withRouter(connect(mapStateToProps, {})(reduxForm(formOptions)(AlertForm)));
