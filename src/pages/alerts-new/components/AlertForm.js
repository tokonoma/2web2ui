/* eslint max-lines: ["error", 200] */
import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';

// Components
import { Panel, Grid } from '@sparkpost/matchbox';
import ToggleBlock from 'src/components/toggleBlock/ToggleBlock';
import { TextFieldWrapper, SelectWrapper, SubaccountTypeaheadWrapper } from 'src/components';

// Helpers & Validation
import { required } from 'src/helpers/validation';

import styles from './AlertForm.module.scss';

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

    return (
      <Form onSubmit={this.submit}>
        <Panel className={styles.FormPanel}>
          <Panel.Section>
            <Field
              name='name'
              component={TextFieldWrapper}
              label='Name'
              disabled={readOnly}
              validate={required}
            />
            <Field
              name="account"
              component={SubaccountTypeaheadWrapper}
              label='Account'
              onChange={this.handleSubaccountSelect}
              disabled={readOnly}
              validate={required}
            />
            <Field
              name="type"
              component={SelectWrapper}
              label='Type'
              options={[{ value: '1', label: 'Health score', pass: 'health_score' },{ value: '2', label: 'Recipient Cohort Engagement', pass: 'rcpt_cohort_engagement' },{ value: '3', label: 'Spam Hits', pass: 'spam_trap_hits' }]}
              disabled={readOnly}
              validate={required}
            />
            <Grid>
              <Grid.Column xs={6} md={4}>
                <div>
                  <Field
                    name='criteria_comparator'
                    component={SelectWrapper}
                    label='Criteria'
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
                    label=''
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
                    label=''
                    options={[{ value: '1', label: 'Week over week', pass: 'wow' },{ value: '2', label: 'Day over day', pass: 'dod' },{ value: '3', label: 'Threshold', pass: 'threshold' }]}
                    disabled={readOnly}
                    validate={required}
                  />
                </div>
              </Grid.Column>
            </Grid>
            <Field
              name='email_addresses'
              component={TextFieldWrapper}
              label='Notify'
              disabled={readOnly}
              validate={required}
              multiline
            />
            <Field
              name='enabled'
              component={ToggleBlock}
              label='Enabled'
              parse={this.parseToggle}
              disabled={readOnly}
            />
          </Panel.Section>
        </Panel>
      </Form>
    );
  }
}

export default reduxForm({ form: 'alerts-form' })(AlertForm);
