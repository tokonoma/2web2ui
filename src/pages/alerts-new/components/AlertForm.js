/* eslint max-lines: ["error", 200] */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';

// Components
import { Panel, Grid, Button } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import ToggleBlock from 'src/components/toggleBlock/ToggleBlock';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import SubaccountSection from './SubaccountSection';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import formatEditValues from '../helpers/formatEditValues';
import { selectInitialSubaccountValue } from 'src/selectors/alerts';

// Helpers & Validation
import { required } from 'src/helpers/validation';

const formName = 'alertForm';
export class AlertForm extends Component {

  componentDidMount() {
  }


  // Prevents unchecked value from equaling ""
  parseToggle = (value) => !!value

  handleSubaccountSelect = (subaccount) => {
    this.setState({ subaccountId: subaccount.id });
  }

  render() {
    const { readOnly } = this.props;
    const {
      canModify,
      submitting,
      submitText
    } = this.props;

    const disabled = !canModify || submitting;
    let booleanValue = false;
    booleanValue = true;

    return (
      <Form onSubmit={this.submitAlert}>
        <Panel>
          <Panel.Section>
            <label>Name</label>
            <Field
              name='name'
              component={TextFieldWrapper}
              disabled={readOnly}
              validate={required}
            />
            <label>Account</label>
            {//hasSubaccounts
              (booleanValue) ? <SubaccountSection newAlert = {false} //{newAlert}
                formName={formName} /> : null}
            <label>Criteria</label>
            <Field
              name="type"
              component={SelectWrapper}
              options={[{ value: '1', label: 'Health score', pass: 'health_score' },{ value: '2', label: 'Recipient Cohort Engagement', pass: 'rcpt_cohort_engagement' },{ value: '3', label: 'Spam Hits', pass: 'spam_trap_hits' }]}
              disabled={readOnly}
              validate={required}
            />
            <label>Criteria</label>
            <Grid>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_comparator'
                    component={SelectWrapper}
                    options={[{ value: '1', label: 'Drops by more than', pass: 'perc_drop' },{ value: '2', label: 'Rises by more than', pass: 'perc_rise' },{ value: '3', label: 'Below', pass: 'below' },{ value: '4', label: 'Above', pass: 'above' }]}
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
                    options={[{ value: '1', label: 'Week over week', pass: 'wow' },{ value: '2', label: 'Day over day', pass: 'dod' },{ value: '3', label: 'Threshold', pass: 'threshold' }]}
                    disabled={readOnly}
                    validate={required}
                  />
                </div>
              </Grid.Column>
            </Grid>
            <br/>
            <label>Notify</label>
            <Field
              name='email_addresses'
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
            <Button submit primary disabled={disabled}>{submitText}</Button>
          </Panel.Section>
        </Panel>
      </Form>
    );
  }
}
const mapStateToProps = (state, props) => {
  const alertValues = props.newAlert ? {} : formatEditValues(state.alerts.alert);

  return {
    disabled: props.pristine || props.submitting,
    submitText: props.submitting ? 'Submitting...' : (props.newAlert ? 'Create Alert' : 'Update Alert'),
    hasSubaccounts: hasSubaccounts(state),
    initialValues: {
      assignTo: 'all',
      subaccount: !props.newAlert ? selectInitialSubaccountValue(state, props) : null,
      ...alertValues
    }
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

export default withRouter(connect(mapStateToProps, {})(reduxForm(formOptions)(AlertForm)));
